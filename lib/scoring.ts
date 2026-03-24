import { NEIGHBORHOODS, Neighborhood } from "./neighborhoods";

export interface Weights {
  quiet: number;
  food: number;
  nl: number;
  transit: number;
  green: number;
  safe: number;
  val: number;
}

export interface RankItem {
  key: string;
  label: string;
  icon: string;
}

export interface QuizAnswers {
  friday?: { val: string; w: Partial<Weights> };
  budget?: number;
  binary?: Array<Partial<Weights> | null>;
  rank?: RankItem[];
  sunday?: { val: string; w: Partial<Weights> };
  noise?: number;
  vibe?: { val: string; w: Partial<Weights> };
}

export interface ScoredNeighborhood extends Neighborhood {
  score: number;
  raw: number;
}

export function scoreAll(ans: QuizAnswers): ScoredNeighborhood[] {
  const w: Weights = { quiet: 0, food: 0, nl: 0, transit: 0, green: 0, safe: 0, val: 0 };
  const dims = ["quiet", "food", "nl", "transit", "green", "safe", "val"] as const;

  // Friday + Sunday scenario weights
  ["friday", "sunday"].forEach((k) => {
    const a = ans[k as "friday" | "sunday"];
    if (a?.w) {
      Object.entries(a.w).forEach(([d, v]) => {
        if (d in w) w[d as keyof Weights] += v as number;
      });
    }
  });

  // Budget: slider 0-4 (under $1.5K / $2K / $3.5K / $5K / $10K+)
  // Lower budget = stronger preference for high-value neighborhoods
  const budget = ans.budget ?? 2;
  w.val += [16, 10, 4, 0, -2][budget];

  // Binary rapid fire
  if (ans.binary) {
    ans.binary.forEach((p) => {
      if (p) {
        Object.entries(p).forEach(([d, v]) => {
          if (d in w) w[d as keyof Weights] += v as number;
        });
      }
    });
  }

  // Drag to rank: position boosts
  if (ans.rank) {
    ans.rank.forEach((it, i) => {
      const boost = [7, 4, 1, 0, -1][i] || 0;
      if (it.key in w) w[it.key as keyof Weights] += boost;
    });
  }

  // Noise slider 0-4: higher = more noise tolerance = less quiet preference
  const noise = ans.noise ?? 2;
  w.quiet += (noise - 2) * 3;

  // Vibe grid
  if (ans.vibe?.w) {
    Object.entries(ans.vibe.w).forEach(([d, v]) => {
      if (d in w) w[d as keyof Weights] += v as number;
    });
  }

  const raw = NEIGHBORHOODS.map((h) => {
    let s = 0;

    // Positive alignment: pref matches hood strength
    dims.forEach((d) => {
      const pref = w[d];
      if (pref > 0) s += (h[d] / 10) * pref;
      else if (pref < 0) s += ((10 - h[d]) / 10) * Math.abs(pref);
    });

    // Budget penalties — wider range: 0=under $1.5K, 1=$2K, 2=$3.5K, 3=$5K, 4=$10K+
    if (budget === 0) {
      // Tightest budget: expensive hoods are a dealbreaker
      if (h.val <= 3) s -= 16;
      else if (h.val <= 5) s -= 8;
      else if (h.val >= 8) s += 10;
      else if (h.val >= 10) s += 14;
    } else if (budget === 1) {
      // Still price-sensitive
      if (h.val <= 3) s -= 10;
      else if (h.val <= 5) s -= 4;
      else if (h.val >= 8) s += 6;
    } else if (budget === 2) {
      // Mid-range: slight value preference, no harsh penalties
      if (h.val <= 2) s -= 4;
      else if (h.val >= 8) s += 3;
    } else if (budget === 3) {
      // Comfortable: quality matters more than price
      if (h.val <= 3 && h.safe >= 8) s += 4;
      if (h.food >= 8 && h.nl >= 7) s += 4;
    } else {
      // $10K+: money is no object, prioritize quality of life
      if (h.safe >= 8) s += 4;
      if (h.food >= 8) s += 3;
      if (h.quiet >= 7 && h.green >= 7) s += 3;
      if (h.nl >= 8 && h.food >= 8) s += 3;
    }

    // Mismatch penalties — only trigger on strong preferences vs very low scores
    if (w.quiet > 5 && h.quiet <= 3) s -= 5;
    if (w.nl > 5 && h.nl <= 3) s -= 5;
    if (w.safe > 5 && h.safe <= 3) s -= 4;
    if (w.green > 5 && h.green <= 3) s -= 4;

    return { ...h, raw: s };
  });

  const scores = raw.map((r) => r.raw);
  const mn = Math.min(...scores);
  const mx = Math.max(...scores);
  const rng = mx - mn || 1;

  return raw
    .map((r) => {
      const normalized = (r.raw - mn) / rng;
      const curved = Math.pow(normalized, 0.7);
      const score = Math.round(28 + curved * 68);
      return { ...r, score: Math.min(score, 96) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

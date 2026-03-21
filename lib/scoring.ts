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

  // Budget: slider 0-4, higher budget = less need for value
  const budget = ans.budget ?? 2;
  w.val += (4 - budget) * 4;

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

    // Budget penalties
    if (budget <= 1) {
      if (h.val <= 3) s -= 12;
      else if (h.val <= 5) s -= 5;
      else if (h.val >= 8) s += 8;
      else if (h.val >= 10) s += 12;
    } else if (budget === 2) {
      if (h.val <= 2) s -= 6;
      else if (h.val >= 8) s += 3;
    } else if (budget >= 3) {
      if (h.val >= 9) s -= 4;
      if (h.val <= 3 && h.safe >= 8) s += 4;
      if (h.food >= 8 && h.nl >= 7) s += 3;
    }

    // Mismatch penalties
    if (w.quiet > 3 && h.quiet <= 3) s -= 6;
    if (w.nl > 3 && h.nl <= 3) s -= 6;
    if (w.safe > 3 && h.safe <= 4) s -= 5;
    if (w.green > 3 && h.green <= 3) s -= 5;

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

import { QuizAnswers } from "./scoring";
import { ScoredNeighborhood } from "./scoring";

const BUDGET_LABELS = ["under $1,500", "around $2,000", "around $3,500", "around $4,500", "$5,000+"];

const RANK_LABELS: Record<string, string> = {
  food: "food scene",
  green: "green space",
  nl: "nightlife",
  safe: "safety",
  val: "value for money",
  transit: "transit access",
  quiet: "quiet streets",
};

const FRIDAY_LABELS: Record<string, string> = {
  home: "a night in",
  out: "going out",
  walk: "wandering the streets",
  eat: "late-night food runs",
};

const SUNDAY_LABELS: Record<string, string> = {
  cook: "farmers markets and slow mornings",
  marathon: "brunch-to-dinner marathon sessions",
  run: "running and outdoor time",
  explore: "exploring new corners of the city",
};

export function generateMatchReason(
  answers: QuizAnswers,
  match: ScoredNeighborhood
): string {
  const budget = answers.budget ?? 2;
  const noise = answers.noise ?? 2;
  const topPriority = answers.rank?.[0];
  const secondPriority = answers.rank?.[1];
  const fridayVal = answers.friday?.val;
  const sundayVal = answers.sunday?.val;

  const sentences: string[] = [];

  // --- Paragraph 1: budget + value + top priority ---
  const budgetStr = BUDGET_LABELS[budget];

  if (budget <= 1) {
    if (match.val >= 8) {
      sentences.push(
        `At ${budgetStr}/month, ${match.n} is one of the better deals left in the city — rent hasn't caught up to how good it actually is here.`
      );
    } else {
      sentences.push(
        `${budgetStr}/month means being picky, but ${match.n} makes the trade-offs worth it — you're paying for location and access that pull their weight.`
      );
    }
  } else if (budget === 2) {
    sentences.push(
      `At ${budgetStr}/month, ${match.n} doesn't ask you to compromise on what matters.`
    );
  } else if (budget === 3) {
    if (match.val <= 3) {
      sentences.push(
        `At ${budgetStr}/month, ${match.n} earns the price tag — the restaurants, safety, and walkability are some of the best in the five boroughs.`
      );
    } else {
      sentences.push(
        `${budgetStr}/month in ${match.n} gets you more than you'd expect — the quality of life here hasn't been priced in yet.`
      );
    }
  } else {
    // $10K+
    if (match.val <= 3) {
      sentences.push(
        `At ${budgetStr}/month, you're getting exactly what you'd expect from ${match.n} — top-tier food, safety, and the kind of block where everything just works.`
      );
    } else {
      sentences.push(
        `With a ${budgetStr} budget, you could live anywhere — and ${match.n} still came out on top because the lifestyle fit is that strong.`
      );
    }
  }

  // Top priority match
  if (topPriority) {
    const dimVal = match[topPriority.key as keyof ScoredNeighborhood] as number;
    const label = RANK_LABELS[topPriority.key] || topPriority.key;
    if (dimVal >= 8) {
      sentences.push(
        `You put ${label} first, and ${match.n} hits ${dimVal}/10 there — not just decent, actually strong.`
      );
    } else if (dimVal >= 6) {
      sentences.push(
        `${match.n} does solid on ${label} (${dimVal}/10), your top priority, while still covering the rest of what you care about.`
      );
    }
  }

  // Second priority
  if (secondPriority) {
    const dimVal = match[secondPriority.key as keyof ScoredNeighborhood] as number;
    const label = RANK_LABELS[secondPriority.key] || secondPriority.key;
    if (dimVal >= 7) {
      sentences.push(`${match.n} also delivers on your #2 — ${label} at ${dimVal}/10.`);
    }
  }

  const para1 = sentences.join(" ");
  sentences.length = 0;

  // --- Paragraph 2: lifestyle fit ---
  if (noise <= 1 && match.quiet >= 7) {
    sentences.push(
      `You want quiet, and ${match.n} actually delivers — midnight here sounds like midnight, not like a crosstown bus route.`
    );
  } else if (noise >= 3 && match.nl >= 7) {
    sentences.push(
      `Noise doesn't bother you, and ${match.n} has plenty of it — nightlife at ${match.nl}/10 and the sidewalk energy people move to New York for.`
    );
  } else if (noise === 2) {
    if (match.quiet >= 6 && match.nl >= 5) {
      sentences.push(
        `${match.n} splits the difference well: lively enough to feel like the city, calm enough to sleep with the window open.`
      );
    }
  }

  if (fridayVal && FRIDAY_LABELS[fridayVal]) {
    const fridayLabel = FRIDAY_LABELS[fridayVal];
    if (fridayVal === "home" && match.green >= 7) {
      sentences.push(
        `When Friday plans fall through, you'd rather stay in — ${match.n} has the parks and quiet corners that make a night at home feel like a choice, not a consolation prize.`
      );
    } else if (fridayVal === "eat" && match.food >= 8) {
      sentences.push(
        `Your move when plans fall apart is ${fridayLabel}, and ${match.n} (food: ${match.food}/10) has spots open at every hour.`
      );
    } else if (fridayVal === "out" && match.nl >= 7) {
      sentences.push(
        `When the night opens up, you go out — and in ${match.n}, there's always something happening within a few blocks.`
      );
    } else if (fridayVal === "walk" && match.green >= 7) {
      sentences.push(
        `You'd rather wander than plan, and ${match.n} is built for that — good blocks, parks nearby, and enough going on that you'll find something.`
      );
    }
  }

  if (sundayVal && SUNDAY_LABELS[sundayVal]) {
    if (sundayVal === "cook" && match.food >= 7 && match.green >= 6) {
      sentences.push(
        `Your Sunday — ${SUNDAY_LABELS[sundayVal]} — works here. Good markets, park access, the whole setup.`
      );
    } else if (sundayVal === "run" && match.green >= 8) {
      sentences.push(
        `For ${SUNDAY_LABELS[sundayVal]}, ${match.n} has real green space — not just a patch of grass next to a highway.`
      );
    } else if (sundayVal === "marathon" && match.nl >= 6 && match.food >= 7) {
      sentences.push(
        `That ${SUNDAY_LABELS[sundayVal]} Sunday? ${match.n}'s bar and restaurant scene was made for it.`
      );
    }
  }

  // Fallback if para2 is empty
  if (sentences.length === 0) {
    sentences.push(
      `The way you balanced quiet, access, food, and value all pointed here. ${match.n} isn't a compromise — it's the answer.`
    );
  }

  const para2 = sentences.join(" ");

  return `${para1}\n\n${para2}`;
}

import { QuizAnswers } from "./scoring";
import { ScoredNeighborhood } from "./scoring";

const BUDGET_LABELS = ["$1,500", "$2,000", "$2,500", "$3,000", "$3,500+"];

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
        `You're working with a budget around ${budgetStr}/month, and ${match.n} is one of the honest deals left in the city — the kind of neighborhood where the rent hasn't fully caught up to the quality of life.`
      );
    } else {
      sentences.push(
        `At ${budgetStr}/month you'll need to be selective, but ${match.n} offers the right trade-offs: you're paying for access, culture, and a location that justifies every dollar.`
      );
    }
  } else if (budget >= 3) {
    if (match.val <= 3) {
      sentences.push(
        `You're investing at the ${budgetStr} level, and ${match.n} earns it — the safety scores, restaurant quality, and walkability are among the best in the five boroughs, and it shows.`
      );
    } else {
      sentences.push(
        `At ${budgetStr}/month, ${match.n} gives you more than your money's worth — the pricing hasn't caught up to what the neighborhood actually offers, which is increasingly rare.`
      );
    }
  } else {
    sentences.push(
      `${match.n} fits cleanly in the ${budgetStr} range without asking you to compromise on the things that matter.`
    );
  }

  // Top priority match
  if (topPriority) {
    const dimVal = match[topPriority.key as keyof ScoredNeighborhood] as number;
    const label = RANK_LABELS[topPriority.key] || topPriority.key;
    if (dimVal >= 8) {
      sentences.push(
        `Your top priority was ${label}, and ${match.n} scores ${dimVal}/10 there — that's genuinely strong, not just adequate.`
      );
    } else if (dimVal >= 6) {
      sentences.push(
        `${match.n} holds its own on ${label} (${dimVal}/10), your stated top priority, while covering the other things you flagged too.`
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
      `You want actual quiet, and ${match.n} is one of the few places in NYC where midnight on a Tuesday actually sounds like midnight on a Tuesday.`
    );
  } else if (noise >= 3 && match.nl >= 7) {
    sentences.push(
      `Street noise doesn't bother you — and ${match.n} obliges, with a nightlife score of ${match.nl}/10 and the kind of sidewalk energy that some people move to New York specifically for.`
    );
  } else if (noise === 2) {
    if (match.quiet >= 6 && match.nl >= 5) {
      sentences.push(
        `${match.n} sits in a useful middle ground: active enough to feel alive, calm enough that you can actually sleep.`
      );
    }
  }

  if (fridayVal && FRIDAY_LABELS[fridayVal]) {
    const fridayLabel = FRIDAY_LABELS[fridayVal];
    if (fridayVal === "home" && match.green >= 7) {
      sentences.push(
        `When plans fall through on a Friday, you prefer ${fridayLabel} — ${match.n} has the parks and the quiet pockets that make that genuinely restorative rather than just default.`
      );
    } else if (fridayVal === "eat" && match.food >= 8) {
      sentences.push(
        `Your instinct when plans fall through is ${fridayLabel}, and with a food score of ${match.food}/10, ${match.n} has options at every hour and every price point.`
      );
    } else if (fridayVal === "out" && match.nl >= 7) {
      sentences.push(
        `You default to going out when the night opens up, and ${match.n} rewards that instinct — there's always something happening within a short walk.`
      );
    } else if (fridayVal === "walk" && match.green >= 7) {
      sentences.push(
        `You like to wander when the night is open, and ${match.n} is the kind of neighborhood that rewards that — interesting blocks, good parks, and enough variety to discover something new.`
      );
    }
  }

  if (sundayVal && SUNDAY_LABELS[sundayVal]) {
    if (sundayVal === "cook" && match.food >= 7 && match.green >= 6) {
      sentences.push(
        `Sundays built around ${SUNDAY_LABELS[sundayVal]} fit well here — the local market and park access make it easy.`
      );
    } else if (sundayVal === "run" && match.green >= 8) {
      sentences.push(
        `For ${SUNDAY_LABELS[sundayVal]}, ${match.n} has the green space to make Sunday mornings genuinely good.`
      );
    } else if (sundayVal === "marathon" && match.nl >= 6 && match.food >= 7) {
      sentences.push(
        `The ${SUNDAY_LABELS[sundayVal]} Sunday you described has a natural home in ${match.n}'s restaurant and bar scene.`
      );
    }
  }

  // Fallback if para2 is empty
  if (sentences.length === 0) {
    sentences.push(
      `The combination of your priorities — the way you weight quietness, access, food, and value — points consistently toward ${match.n}. It's not a compromise; it's a fit.`
    );
  }

  const para2 = sentences.join(" ");

  return `${para1}\n\n${para2}`;
}

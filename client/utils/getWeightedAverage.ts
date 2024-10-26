import { fetchy } from "./fetchy";

export async function weightedAverage(weighting: Record<string, string>, reviews: Record<string, string>[]) {
  const foodScore = Number(weighting.food);
  const serviceScore = Number(weighting.service);
  const ambienceScore = Number(weighting.ambience);
  const priceScore = Number(weighting.price);
  const noveltyScore = Number(weighting.novelty);

  const weightingSum = foodScore + serviceScore + ambienceScore + priceScore + noveltyScore;

  let query: Record<string, string>;
  let reviewScoreSum = 0;
  let numReviews = 0;
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    query = { review: review._id };
    let preference;
    try {
      preference = await fetchy("/api/review/preference", "GET", { query });
    } catch (_) {
      preference = { food: "5", service: "5", ambience: "5", price: "5", novelty: "5" };
    }

    const reviewFoodScore = Number(preference.food);
    const reviewServiceScore = Number(preference.service);
    const reviewAmbienceScore = Number(preference.ambience);
    const reviewPriceScore = Number(preference.price);
    const reviewNoveltyScore = Number(preference.novelty);

    reviewScoreSum =
      reviewScoreSum +
      (1 / weightingSum) * (foodScore * reviewFoodScore + serviceScore * reviewServiceScore + ambienceScore * reviewAmbienceScore + priceScore * reviewPriceScore + noveltyScore * reviewNoveltyScore);
    numReviews = numReviews + 1;
  }
  return reviewScoreSum / numReviews;
}

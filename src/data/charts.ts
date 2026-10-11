import type { ChartGroup } from "./types";

/**
 * Chart data — every number is copied from a verified source named in
 * `source`. Emphasis marks the entity the story is about and stays the same
 * across a group's small multiples (color follows the entity, not its rank).
 */
export const projectCharts = {
  atlas: [
    {
      id: "atlas-latency",
      title: "Where the time goes",
      description:
        "Running research branches concurrently costs the slowest branch, not the sum; a concision rule cut synthesis time by a third.",
      source: "Atlas README, “Measured” (local runs against live providers)",
      charts: [
        {
          kind: "bars",
          title: "Five research branches",
          subtitle: "Wall-clock seconds · lower is better",
          data: [
            { label: "Run in parallel", value: 23.3, display: "23.3 s", emphasis: true, note: "Slowest branch" },
            { label: "Back to back", value: 93.4, display: "93.4 s", note: "Sum of all five branches" },
          ],
        },
        {
          kind: "bars",
          title: "Synthesis step",
          subtitle: "Seconds · lower is better",
          data: [
            { label: "Before concision rule", value: 40.5, display: "40.5 s", note: "4,392 output tokens" },
            { label: "After concision rule", value: 27.1, display: "27.1 s", emphasis: true, note: "2,752 output tokens" },
          ],
        },
      ],
    },
  ],

  "fraud-detection": [
    {
      id: "fraud-detection-profile",
      title: "Detection on the held-out test set",
      description:
        "84 of 98 frauds caught while flagging 93 of 56,864 legitimate transactions — the trade-off behind 85.7% recall and 47.5% precision.",
      source: "Notebook confusion matrix and README results table",
      charts: [
        {
          kind: "confusion",
          title: "Confusion matrix",
          subtitle: "Test-set transactions",
          labels: ["Legitimate", "Fraud"],
          cells: { tn: 56771, fp: 93, fn: 14, tp: 84 },
        },
        {
          kind: "bars",
          title: "Model scores",
          subtitle: "0 – 1 · higher is better",
          max: 1,
          data: [
            { label: "ROC-AUC", value: 0.9834, display: "0.983" },
            { label: "Recall", value: 0.8571, display: "0.857" },
            { label: "F1 score", value: 0.6109, display: "0.611" },
            { label: "Precision", value: 0.4746, display: "0.475" },
          ],
        },
      ],
    },
  ],

  "recommendation-engine": [
    {
      id: "recsys-ranking",
      title: "Ranking quality and popularity bias by system",
      description:
        "User-based CF leads every ranking metric and is the second-fairest system; the hybrid concentrates exposure on popular items.",
      source: "Repository README results table (leave-one-out, 500 users)",
      charts: [
        {
          kind: "bars",
          title: "HR@10",
          subtitle: "Higher is better",
          reference: { value: 0.002, label: "Random" },
          data: [
            { label: "User-based CF", value: 0.026, display: "0.026", emphasis: true },
            { label: "Hybrid", value: 0.018, display: "0.018" },
            { label: "SVD", value: 0.012, display: "0.012" },
            { label: "Popularity", value: 0.002, display: "0.002" },
          ],
        },
        {
          kind: "bars",
          title: "NDCG@10",
          subtitle: "Higher is better",
          data: [
            { label: "User-based CF", value: 0.0141, display: "0.0141", emphasis: true },
            { label: "Hybrid", value: 0.0095, display: "0.0095" },
            { label: "SVD", value: 0.006, display: "0.0060" },
            { label: "Popularity", value: 0.0006, display: "0.0006" },
          ],
        },
        {
          kind: "bars",
          title: "MRR",
          subtitle: "Higher is better",
          data: [
            { label: "User-based CF", value: 0.0106, display: "0.0106", emphasis: true },
            { label: "Hybrid", value: 0.0069, display: "0.0069" },
            { label: "SVD", value: 0.0042, display: "0.0042" },
            { label: "Popularity", value: 0.0002, display: "0.0002" },
          ],
        },
        {
          kind: "bars",
          title: "Popularity bias score",
          subtitle: "Lower is fairer",
          data: [
            { label: "User-based CF", value: 110.3, display: "110.3", emphasis: true },
            { label: "Hybrid", value: 145.9, display: "145.9" },
            { label: "SVD", value: 100.8, display: "100.8" },
            { label: "Popularity", value: 130.2, display: "130.2" },
          ],
        },
      ],
    },
  ],

  "ecommerce-churn-clv": [
    {
      id: "churn-drivers",
      title: "What separates churned customers",
      description:
        "Churned customers waited 62% longer for delivery and left more bad reviews — delivery is the clearest operational lever.",
      source: "Executive dashboard figure and repository README",
      charts: [
        {
          kind: "paired",
          title: "Active vs churned customers",
          series: ["Active", "Churned"],
          groups: [
            { label: "Delivery time (days)", values: [8, 13], display: ["8 days", "13 days"], max: 14 },
            { label: "Bad-review rate", values: [9.8, 13.4], display: ["9.8%", "13.4%"], max: 15 },
            { label: "Average review score (of 5)", values: [4.3, 4.11], display: ["4.30", "4.11"], max: 5 },
          ],
        },
      ],
    },
  ],

  "stock-forecasting": [
    {
      id: "stock-models",
      title: "The metric picks the winner",
      description:
        "ARIMA has the lowest price error; the LSTM is the only model that beats a coin flip on direction. Averages across five stocks, 2024 test period.",
      source: "Repository README results table",
      charts: [
        {
          kind: "bars",
          title: "Mean absolute percentage error",
          subtitle: "Lower is better",
          data: [
            { label: "LSTM", value: 1.9, display: "1.90%", emphasis: true },
            { label: "ARIMA", value: 1.5, display: "1.50%" },
            { label: "MA7 baseline", value: 2.62, display: "2.62%" },
          ],
        },
        {
          kind: "bars",
          title: "Directional accuracy",
          subtitle: "Higher is better",
          max: 60,
          reference: { value: 50, label: "Coin flip" },
          data: [
            { label: "LSTM", value: 55.5, display: "55.5%", emphasis: true },
            { label: "ARIMA", value: 45.8, display: "45.8%" },
            { label: "MA7 baseline", value: 48.6, display: "48.6%" },
          ],
        },
      ],
    },
  ],

  "data-mining-mastery": [
    {
      id: "pareto",
      title: "Revenue concentration",
      description: "The Pareto check: the top fifth of customers generate more than half of revenue.",
      source: "Project notebook (Kaggle)",
      charts: [
        {
          kind: "share",
          title: "Customers vs revenue",
          segments: ["Top 20% of customers", "Remaining 80%"],
          rows: [
            { label: "Share of customers", values: [20, 80] },
            { label: "Share of revenue", values: [54.4, 45.6] },
          ],
        },
      ],
    },
  ],

  "insurance-premium": [
    {
      id: "insurance-r2",
      title: "Accuracy vs explainability",
      description:
        "The production pick gives up 1.4 points of R² for coefficients a pricing reviewer can read.",
      source: "Project notebook (Kaggle)",
      charts: [
        {
          kind: "bars",
          title: "Test R²",
          subtitle: "Higher is better",
          max: 1,
          data: [
            { label: "Lasso (production)", value: 0.868, display: "0.868", emphasis: true },
            { label: "CatBoost (best score)", value: 0.882, display: "0.882" },
          ],
        },
      ],
    },
  ],
} satisfies Record<string, ChartGroup[]>;

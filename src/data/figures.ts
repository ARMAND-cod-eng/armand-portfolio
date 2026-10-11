import type { Figure } from "./types";

/**
 * Real figures from the project notebooks, copied from the public repositories
 * (converted to WebP). Alt text and captions describe what each figure shows.
 */
const CHURN_REPO = "https://github.com/ARMAND-cod-eng/ecommerce-churn-prediction-clv-analysis/blob/HEAD/images";
const STOCK_REPO = "https://github.com/ARMAND-cod-eng/stock-price-forecasting-lstm-2026/blob/HEAD/images";
const FRAUD_NOTEBOOK =
  "https://github.com/ARMAND-cod-eng/fraud-detection-ensemble/blob/HEAD/notebooks/01_fraud_detection_complete.ipynb";

const SEPARATE_RUN =
  "From a separate training run — LSTM averages differ slightly from the README table (56.4% vs 55.5% directional accuracy).";

export const projectFigures = {
  "ecommerce-churn-clv": [
    {
      src: "/projects/ecommerce-churn-clv/executive-dashboard.webp",
      width: 1747,
      height: 1278,
      alt: "Executive dashboard: churn rate 89.8%, R$13.8M of historical revenue from churned customers, R$5.3M from high-value churned customers, a 3.0% repeat rate, revenue by customer segment and key churn drivers.",
      caption: "Executive dashboard",
      sourceUrl: `${CHURN_REPO}/executive_dashboard.png`,
    },
    {
      src: "/projects/ecommerce-churn-clv/churn-drivers.webp",
      width: 1784,
      height: 1124,
      alt: "Six charts on churn drivers: review-score and delivery-time distributions for active and churned customers, and churn rate by delivery timeliness, review score, payment method and installments.",
      caption: "Churn drivers",
      sourceUrl: `${CHURN_REPO}/churn_drivers.png`,
    },
    {
      src: "/projects/ecommerce-churn-clv/rfm-segmentation.webp",
      width: 1786,
      height: 614,
      alt: "Customers, revenue and churn rate for each of eight RFM segments, from Champions to Loyal / High Value.",
      caption: "RFM segmentation",
      sourceUrl: `${CHURN_REPO}/rfm_segmentation.png`,
    },
    {
      src: "/projects/ecommerce-churn-clv/revenue-at-risk.webp",
      width: 1780,
      height: 1315,
      alt: "Revenue per customer for active and churned customers, the ten states with the most revenue lost to churn, churn rate by state, and revenue at risk for high-value versus other customers.",
      caption: "Revenue at risk and geography",
      sourceUrl: `${CHURN_REPO}/revenue_at_risk.png`,
    },
  ],

  "recommendation-engine": [
    {
      src: "/projects/recommendation-engine/recsys-dashboard-2026.webp",
      width: 1800,
      height: 1444,
      alt: "Dashboard comparing four recommenders on HR@10, NDCG@10 and MRR, an A/B test of popularity versus user-based CF (p = 0.0225, d = 0.180), bias score, long-tail exposure and a capability matrix.",
      caption: "Ranking, A/B test and fairness dashboard",
      sourceUrl:
        "https://github.com/ARMAND-cod-eng/recommendation-engine-from-scratch-2026/blob/HEAD/recsys_dashboard_2026.png",
    },
  ],

  "stock-forecasting": [
    {
      src: "/projects/stock-forecasting/block12-dashboard.webp",
      width: 1800,
      height: 2124,
      alt: "Final dashboard: Tesla 2024 forecasts against actual prices, MAPE and directional accuracy for each model and stock, LSTM accuracy per stock, LSTM error versus volatility, and key findings.",
      caption: `Final dashboard. ${SEPARATE_RUN}`,
      sourceUrl: `${STOCK_REPO}/block12_dashboard.png`,
    },
    {
      src: "/projects/stock-forecasting/block11-multistocks.webp",
      width: 1800,
      height: 1336,
      alt: "MAPE and directional accuracy for the moving average, ARIMA and LSTM on each of five stocks, LSTM error versus volatility, and LSTM directional accuracy per stock against a 50% random line.",
      caption: `Multi-stock comparison. ${SEPARATE_RUN}`,
      sourceUrl: `${STOCK_REPO}/block11_multistocks.png`,
    },
    {
      src: "/projects/stock-forecasting/block2-eda.webp",
      width: 1800,
      height: 1559,
      alt: "Exploratory analysis: Tesla daily returns, return distributions for five stocks, 30-day rolling volatility, return correlations, Tesla return autocorrelation and trading volume.",
      caption: "Exploratory data analysis",
      sourceUrl: `${STOCK_REPO}/block2_eda.png`,
    },
    {
      src: "/projects/stock-forecasting/block8-architecture.webp",
      width: 1417,
      height: 1150,
      alt: "StockLSTM architecture: a 20-day by 15-feature input, LSTM layers of 128 and 64 units, a 32-unit dense layer, and separate return and direction heads; 126,050 trainable parameters.",
      caption: "LSTM architecture",
      sourceUrl: `${STOCK_REPO}/block8_architecture.png`,
    },
  ],

  "fraud-detection": [
    {
      src: "/projects/fraud-detection/notebook-figure-4.webp",
      width: 1489,
      height: 1190,
      alt: "Confusion matrix (56,771 true negatives, 93 false positives, 14 false negatives, 84 true positives), ROC curve with AUC 0.983, precision-recall curve and a metric comparison for the XGBoost ensemble.",
      caption: "Confusion matrix, ROC and precision-recall curves",
      sourceUrl: FRAUD_NOTEBOOK,
    },
    {
      src: "/projects/fraud-detection/notebook-figure-5.webp",
      width: 989,
      height: 790,
      alt: "Top 20 features by importance in the final XGBoost model; the Isolation Forest score ranks second, behind V14.",
      caption: "Top 20 features — the Isolation Forest score ranks second",
      sourceUrl: FRAUD_NOTEBOOK,
    },
    {
      src: "/projects/fraud-detection/notebook-figure-2.webp",
      width: 1389,
      height: 989,
      alt: "Transaction amount distributions and box plots by class, transaction time distribution, and correlations of the first ten PCA components.",
      caption: "Exploratory analysis",
      sourceUrl: FRAUD_NOTEBOOK,
    },
    {
      src: "/projects/fraud-detection/notebook-figure-3.webp",
      width: 838,
      height: 464,
      alt: "Autoencoder training loss over epochs.",
      caption: "Autoencoder training loss",
      sourceUrl: FRAUD_NOTEBOOK,
    },
  ],
} satisfies Record<string, Figure[]>;

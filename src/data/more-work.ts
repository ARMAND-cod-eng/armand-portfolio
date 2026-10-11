import { projectCharts } from "./charts";
import { projectFigures } from "./figures";
import type { Project } from "./types";

const STATS_REPO = "https://github.com/ARMAND-cod-eng/Advanced-Probability-and-Statistics/tree/main";

/**
 * Smaller projects and work in progress, each with its own detail page.
 *
 * Sources (verified October 2026):
 * - Stock forecasting: repository README and notebook figures.
 * - RAG: repository source (requirements, config and services; the API routes
 *   and Dockerfile are still empty, so it is labeled in progress).
 * - Data mining & insurance: Kaggle notebooks, summarized in Armand's master profile.
 * - Probability & statistics: repository folder structure and notebooks.
 */
export const moreProjects: Project[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "stock-forecasting",
    tier: "more",
    charts: projectCharts["stock-forecasting"],
    figures: projectFigures["stock-forecasting"],
    title: "Stock Forecasting: LSTM vs ARIMA",
    subtitle: "Deep learning against classical baselines",
    category: "Machine Learning · Time Series · Deep Learning",
    filters: ["ml"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "A leakage-free comparison of an LSTM, ARIMA and a moving-average baseline on five years of five large-cap stocks — showing that the “best” model depends on the metric.",
    problem:
      "Forecasting demos often report impressive accuracy from leaky pipelines. The honest question is narrower: does a deep model add anything over classical baselines when evaluation is strictly out-of-sample?",
    approach:
      "Built 15 technical indicators, split strictly by time (2020–2023 train, 2024 test), and compared a 7-day moving average, auto-ARIMA and a dual-head PyTorch LSTM on price error and directional accuracy.",
    highlights: [
      "Strict temporal split — no future data in training",
      "Dual-head LSTM: next-day return and direction",
      "Honest result: ARIMA wins on error, LSTM on direction",
    ],
    stack: ["Python", "PyTorch", "statsmodels", "pandas", "NumPy", "yfinance"],
    tags: ["PyTorch", "LSTM", "ARIMA", "Time series"],
    metrics: [
      { value: "55.5%", label: "LSTM directional accuracy", note: "vs 45.8% ARIMA" },
      { value: "1.50%", label: "ARIMA MAPE — lowest price error" },
      { value: "126K", label: "LSTM parameters, trained in 3.4 s on a T4" },
    ],
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/ARMAND-cod-eng/stock-price-forecasting-lstm-2026" },
      {
        kind: "kaggle",
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/armandjunior/stock-price-forecasting-lstm-vs-classical-models",
      },
    ],
    seoDescription:
      "Case study: LSTM vs ARIMA vs moving-average forecasting on five stocks with a strict temporal split — ARIMA wins on MAPE, the LSTM on directional accuracy.",
    caseStudy: {
      overview:
        "A forecasting study on real market data for Tesla, Apple, Amazon, Google and Microsoft (2020–2024, via the Yahoo Finance API), comparing a deep sequence model against classical baselines under a strictly temporal evaluation.",
      motivation:
        "Most stock-prediction notebooks leak the future into training and report numbers nobody could trade on. This project does the boring part properly — and then asks which model actually wins, on which metric.",
      role: ["Independent project — data pipeline, feature engineering, modeling and evaluation."],
      architecture: {
        caption: "One pipeline, three models, two metrics, five stocks.",
        stages: [
          { label: "Data", nodes: [{ title: "5 tickers · 5 years", detail: "Adjusted daily prices and volume via yfinance" }] },
          {
            label: "Features",
            nodes: [{ title: "15 indicators", detail: "Moving averages, RSI, MACD, volatility, lagged returns" }],
          },
          { label: "Split", nodes: [{ title: "Temporal split", detail: "Train 2020–2023 · test 2024, no shuffling" }] },
          {
            label: "Models",
            nodes: [
              { title: "MA7 baseline", detail: "7-day moving average" },
              { title: "ARIMA", detail: "Order chosen by auto-ARIMA" },
              { title: "LSTM", detail: "2 stacked layers, 126,050 parameters, dual heads" },
            ],
          },
          {
            label: "Evaluate",
            nodes: [
              { title: "MAPE", detail: "Price error" },
              { title: "Directional accuracy", detail: "Up / down, per stock and on average" },
            ],
          },
        ],
      },
      implementation: [
        {
          title: "A zero-leakage pipeline",
          body: "Every feature uses only information available at prediction time, and the split is strictly by date — the models never train on the period they are tested on.",
        },
        {
          title: "A dual-head LSTM",
          body: "A 20-day window of 15 features feeds LSTM layers of 128 and 64 units and a 32-unit dense layer, then two heads: one regresses the next-day return, one classifies its direction. Trained with early stopping on a Kaggle T4 GPU in 3.4 seconds.",
        },
        {
          title: "Baselines that are hard to beat",
          body: "A 7-day moving average and auto-ARIMA give the LSTM something real to beat. Auto-ARIMA selected order (0,0,0) on Tesla — the signature of a random walk in daily returns.",
        },
      ],
      decisions: [
        {
          title: "Report both metrics",
          body: "MAPE and directional accuracy tell different stories. Publishing only one would have crowned a different winner.",
        },
        {
          title: "Per-stock evaluation",
          body: "Averages hide volatility. Tesla's daily volatility (4.2%) is more than twice that of the other stocks, and it is the hardest to forecast.",
        },
      ],
      evaluation: {
        intro: "Averages across the five stocks on the 2024 test period, from the repository README.",
        metrics: [
          { value: "55.5%", label: "LSTM directional accuracy", note: "+5.5 points over a coin flip" },
          { value: "1.50%", label: "ARIMA MAPE", note: "Lowest price error" },
          { value: "1.90%", label: "LSTM MAPE", note: "Second on price error" },
        ],
        notes: [
          "Educational project — not financial advice.",
          "Honest evaluation produces modest but trustworthy numbers: the LSTM's directional edge is real across stocks, but small.",
        ],
      },
      lessons: [
        {
          title: "The metric determines the winner",
          body: "Decide what question the model must answer before comparing models.",
        },
        {
          title: "Leakage is the biggest risk",
          body: "A strict temporal split costs impressive-looking numbers and buys trustworthy ones.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "rag-document-intelligence",
    tier: "more",
    title: "RAG Document Intelligence API",
    subtitle: "Grounded answers over your own documents",
    category: "RAG · Information Retrieval · LLM Applications",
    filters: ["retrieval"],
    status: { kind: "building", label: "In progress" },
    tagline:
      "A document question-answering service — ingestion, chunking, vector retrieval and grounded generation — being built evaluation-first. Early stage.",
    problem:
      "Teams need answers from their own PDFs and pages, with sources — not a model's best guess. That makes retrieval quality the part that has to be measured.",
    approach:
      "A FastAPI service that loads documents, chunks and embeds them into ChromaDB, retrieves the closest passages for each question and asks an LLM to answer from them. Reranking and RAGAS evaluation come next.",
    highlights: [
      "Ingestion, retrieval and generation services in place",
      "Answers generated only from retrieved passages",
      "Evaluation planned before new features",
    ],
    stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "sentence-transformers", "Together AI"],
    tags: ["RAG", "FastAPI", "LangChain", "ChromaDB"],
    metrics: [],
    links: [{ kind: "github", label: "GitHub", href: "https://github.com/ARMAND-cod-eng/rag-document-intelligence" }],
    seoDescription:
      "In-progress project: a FastAPI RAG service with LangChain, ChromaDB and MiniLM embeddings — reranking and RAGAS evaluation planned.",
    caseStudy: {
      statusNote:
        "Early stage. The ingestion, retrieval and LLM services are in the repository; the HTTP routes, Docker setup and evaluation are not built yet, so no quality metrics are reported.",
      overview:
        "A retrieval-augmented generation service for question answering over private documents. Documents are split into overlapping chunks, embedded, stored in a vector database, and retrieved at question time so the model answers from the source text.",
      motivation:
        "RAG demos are easy; trustworthy RAG is an evaluation problem. The plan is to measure retrieval and answer quality before adding features like reranking, so every change can be justified with numbers.",
      role: ["Independent project — design and implementation."],
      architecture: {
        caption: "Current pipeline, with the planned stage marked.",
        stages: [
          { label: "Ingest", nodes: [{ title: "PDF loading", detail: "PyPDF document loader" }] },
          { label: "Chunk", nodes: [{ title: "Text splitting", detail: "Chunks of 500 with 50 overlap" }] },
          {
            label: "Embed & store",
            nodes: [
              { title: "all-MiniLM-L6-v2", detail: "Sentence-transformer embeddings" },
              { title: "ChromaDB", detail: "Vector store" },
            ],
          },
          { label: "Retrieve", nodes: [{ title: "Top-5 search", detail: "Similarity with relevance scores" }] },
          { label: "Generate", nodes: [{ title: "Llama 3 70B", detail: "Via Together AI, answering from retrieved passages" }] },
          {
            label: "Planned",
            planned: true,
            nodes: [
              { title: "Reranking", detail: "BGE reranker on retrieved passages" },
              { title: "Evaluation", detail: "RAGAS on a fixed question set" },
              { title: "API & streaming", detail: "FastAPI routes with SSE responses" },
            ],
          },
        ],
      },
      implementation: [
        {
          title: "Configuration first",
          body: "Models, chunking and retrieval depth live in one typed settings module, so experiments change configuration rather than code.",
        },
        {
          title: "Services, not scripts",
          body: "Ingestion, retrieval and generation are separate services behind a FastAPI app with a health endpoint, ready for routes to be added on top.",
        },
      ],
      evaluation: {
        intro: "No metrics yet — by design. Results will be published here once they are measured.",
        metrics: [],
        notes: ["Planned: BGE reranking and RAGAS evaluation, compared on the same question set."],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "data-mining-mastery",
    tier: "more",
    charts: projectCharts["data-mining-mastery"],
    title: "Data Mining Mastery",
    subtitle: "Classic algorithms, built from scratch",
    category: "Data Mining · Unsupervised Learning · Analytics",
    filters: ["data-science", "ml"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "Apriori, K-Means, RFM and anomaly detection implemented from scratch and applied to more than a million real online-retail transactions.",
    problem:
      "Library calls hide how association rules and clustering actually work — and whether their output is useful to a business.",
    approach:
      "Implemented each algorithm from first principles in Python, applied them to 1,067,371 retail transactions, and translated the patterns into merchandising and customer insights.",
    highlights: [
      "Four algorithms implemented without ML libraries",
      "Over a million real transactions",
      "Pareto principle checked against real revenue",
    ],
    stack: ["Python", "NumPy", "pandas", "Matplotlib"],
    tags: ["Apriori", "K-Means", "Anomaly detection", "NumPy"],
    metrics: [
      { value: "1.07M", label: "retail transactions" },
      { value: "54.4%", label: "of revenue from the top 20% of customers" },
      { value: "4", label: "algorithms built from scratch" },
    ],
    links: [
      { kind: "kaggle", label: "Kaggle notebook", href: "https://www.kaggle.com/code/armandjunior/data-mining-mastery" },
    ],
    seoDescription:
      "Apriori, K-Means, RFM and anomaly detection implemented from scratch on 1,067,371 online-retail transactions.",
    caseStudy: {
      overview:
        "A hands-on data-mining project: four classic algorithms written from first principles and run on a real online-retail dataset of 1,067,371 transactions.",
      motivation:
        "Implementing an algorithm is the fastest way to understand its assumptions. Applying it to real transactions is the fastest way to see whether its output matters.",
      role: ["Independent project — implementation, analysis and write-up."],
      architecture: {
        caption: "One dataset, four algorithms, three kinds of insight.",
        stages: [
          { label: "Data", nodes: [{ title: "1,067,371 transactions", detail: "Real online-retail invoices" }] },
          {
            label: "Algorithms",
            nodes: [
              { title: "Apriori", detail: "Frequent itemsets and association rules" },
              { title: "K-Means", detail: "Customer clustering" },
              { title: "RFM", detail: "Recency, frequency, monetary scoring" },
              { title: "Anomaly detection", detail: "Unusual transactions and customers" },
            ],
          },
          {
            label: "Insights",
            nodes: [
              { title: "Product bundles", detail: "Items frequently bought together" },
              { title: "Customer segments", detail: "Who to retain, who to grow" },
              { title: "Pareto check", detail: "How concentrated revenue is" },
            ],
          },
        ],
      },
      implementation: [
        {
          title: "Association rules",
          body: "Apriori finds sets of products bought together often enough to matter and turns them into association rules — the basis for bundle recommendations.",
        },
        {
          title: "Clustering and segmentation",
          body: "K-Means and RFM scoring group customers by purchasing behavior and value.",
        },
        {
          title: "Anomaly detection",
          body: "Anomaly detection flags transactions and customers that behave unlike the rest.",
        },
      ],
      evaluation: {
        intro: "Key findings from the notebook.",
        metrics: [
          { value: "1,067,371", label: "transactions analyzed" },
          { value: "54.4%", label: "of revenue from the top 20% of customers", note: "Pareto principle confirmed" },
          { value: "~$124K", label: "estimated annual bundle impact", note: "Modeled estimate, not a realized result" },
        ],
        notes: ["The bundle figure is a modeled estimate from the notebook, not a measured business outcome."],
      },
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "insurance-premium",
    tier: "more",
    charts: projectCharts["insurance-premium"],
    title: "Medical Insurance Premium Prediction",
    subtitle: "Choosing the model you can explain",
    category: "Data Science · Regression · Explainable ML",
    filters: ["data-science", "ml"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "Predicting medical insurance charges with 19 models — and choosing the slightly less accurate one because it can be explained.",
    problem:
      "Insurance pricing has to be accurate and explainable: a reviewer or a customer needs to understand why a premium is what it is.",
    approach:
      "Engineered 26 features on 1,338 policyholder records, compared 19 regression models, used SHAP to explain predictions, and weighed accuracy against interpretability.",
    highlights: [
      "19 regression models compared",
      "Smoker × BMI interaction as the key engineered feature",
      "Interpretable model chosen for production",
    ],
    stack: ["Python", "scikit-learn", "CatBoost", "SHAP", "pandas"],
    tags: ["Regression", "CatBoost", "SHAP", "Feature engineering"],
    metrics: [
      { value: "0.882", label: "R², CatBoost (best score)" },
      { value: "0.868", label: "R², Lasso (chosen for production)" },
      { value: "19", label: "models compared" },
    ],
    links: [
      {
        kind: "kaggle",
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/armandjunior/insurance-premium-a-complete-data-science-journey",
      },
    ],
    seoDescription:
      "Insurance premium regression: 19 models compared, CatBoost R² 0.882, Lasso R² 0.868 chosen for interpretability, with SHAP explanations.",
    caseStudy: {
      overview:
        "An end-to-end regression study on the public medical-insurance dataset (1,338 policyholders): feature engineering, a wide model comparison, SHAP explanations, and a deliberate production choice.",
      motivation:
        "Leaderboards reward the highest score. Real pricing decisions also need models that can be audited — this project makes that trade-off explicit.",
      role: ["Independent project — analysis, modeling and write-up."],
      architecture: {
        caption: "From raw records to an explainable production choice.",
        stages: [
          { label: "Data", nodes: [{ title: "1,338 records", detail: "Age, sex, BMI, children, smoker, region, charges" }] },
          { label: "Features", nodes: [{ title: "26 engineered features", detail: "Including a smoker × BMI interaction" }] },
          { label: "Models", nodes: [{ title: "19 regression models", detail: "From regularized linear models to gradient boosting" }] },
          { label: "Explain", nodes: [{ title: "SHAP", detail: "Which features drive each prediction" }] },
          { label: "Decide", nodes: [{ title: "Lasso for production", detail: "Readable coefficients, near-best accuracy" }] },
        ],
      },
      implementation: [
        {
          title: "Interaction features",
          body: "Smoking and BMI matter most together: the engineered smoker × BMI interaction correlates 0.84 with charges.",
        },
        {
          title: "A wide model comparison",
          body: "Nineteen models evaluated, from regularized linear models to gradient boosting; CatBoost scored highest (R² 0.882).",
        },
        {
          title: "Explanations, not just scores",
          body: "SHAP values show which features push each prediction up or down, so the model's behavior can be checked against domain sense.",
        },
      ],
      decisions: [
        {
          title: "Interpretable beats marginally accurate",
          body: "Lasso scored R² 0.868 against CatBoost's 0.882 — 1.4 points lower — but its coefficients can be read and audited, which matters for pricing. Inference takes under a millisecond.",
        },
      ],
      evaluation: {
        intro: "Test-set results from the notebook.",
        metrics: [
          { value: "0.882", label: "R², CatBoost", note: "Best score of 19 models" },
          { value: "0.868", label: "R², Lasso", note: "Chosen for production" },
          { value: "0.84", label: "smoker × BMI correlation with charges" },
        ],
        notes: [],
      },
      lessons: [
        {
          title: "Choose the model for the decision",
          body: "The best model is the one that fits how its predictions will be used — here, a priced product that has to be explained.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "probability-statistics",
    tier: "more",
    title: "Advanced Probability & Statistics",
    subtitle: "The foundation under the ML work",
    category: "Statistics · Probability · Coursework",
    filters: ["data-science"],
    status: { kind: "complete", label: "Coursework" },
    tagline:
      "Graduate coursework notebooks on descriptive statistics, probability, visualization, hypothesis testing, ANOVA and statistical modeling in Python.",
    problem: "Machine-learning results are only as trustworthy as the statistics used to evaluate them.",
    approach:
      "A structured collection of Python notebooks organized by topic, each pairing statistical theory with worked analysis on real data.",
    highlights: ["Eight topic areas", "Worked analyses in Python", "Hypothesis testing and ANOVA"],
    stack: ["Python", "pandas", "NumPy", "SciPy", "Matplotlib", "seaborn"],
    tags: ["Statistics", "Probability", "Hypothesis testing", "Python"],
    metrics: [],
    links: [
      { kind: "github", label: "GitHub", href: "https://github.com/ARMAND-cod-eng/Advanced-Probability-and-Statistics" },
    ],
    seoDescription:
      "Graduate statistics coursework in Python: descriptive statistics, probability, visualization, hypothesis testing, ANOVA and linear models.",
    caseStudy: {
      overview:
        "Notebooks from graduate coursework in the M.S. Data Science program, organized by topic. They are the statistical toolkit behind the evaluation choices in the other projects — significance tests, effect sizes and honest baselines.",
      motivation:
        "Strong ML evaluation needs strong statistics: knowing when a difference is real, when it is noise, and when a test's assumptions don't hold.",
      role: ["Coursework — analyses written and run in Python."],
      implementationTitle: "What's inside",
      implementation: [
        {
          title: "Introduction to statistics and Python",
          body: "Python for statistical work, and how misleading data presentations can be detected and corrected.",
          href: `${STATS_REPO}/Introduction%20to%20Statistics%20and%20Python`,
        },
        {
          title: "Descriptive statistics",
          body: "Central tendency, spread and outliers on real datasets.",
          href: `${STATS_REPO}/2%20Descriptive%20Statistics`,
        },
        {
          title: "Probability",
          body: "Probability theory, bias, and a worked lottery-odds problem.",
          href: `${STATS_REPO}/3%20Probability`,
        },
        {
          title: "Data visualization",
          body: "Choosing charts for multiple variables, and the ethics of visual presentation.",
          href: `${STATS_REPO}/4%20Data%20Visualization%20and%20Charts`,
        },
        {
          title: "Statistical modeling",
          body: "Regression modeling, its limitations, and correlation versus causation.",
          href: `${STATS_REPO}/Statistical%20Modeling%20%20`,
        },
        {
          title: "Hypothesis testing",
          body: "Choosing the appropriate test and checking its assumptions, with SciPy.",
          href: `${STATS_REPO}/Advanced%20Hypothesis%20Testing`,
        },
        {
          title: "ANOVA and linear models",
          body: "When to use ANOVA versus regression, and the assumptions behind both.",
          href: `${STATS_REPO}/7%20Analysis%20of%20Variance%20and%20Linear%20Models`,
        },
        {
          title: "Exploratory data analysis",
          body: "End-to-end EDA, including housing prices and online-retail customers.",
          href: `${STATS_REPO}/Exploratory%20Data%20Analysis`,
        },
      ],
    },
  },
];

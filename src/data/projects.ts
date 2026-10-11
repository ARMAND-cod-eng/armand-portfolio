import { projectCharts } from "./charts";
import { projectFigures } from "./figures";
import { moreProjects } from "./more-work";
import type { Project } from "./types";

/**
 * Featured projects, in display order.
 *
 * Sources (verified October 2026):
 * - IntelliCast: the production codebase and its system blueprint (repo is private).
 * - Atlas: github.com/ARMAND-cod-eng/Atlas README + docs/PHASE-0..4.md.
 * - Fraud: fraud-detection-ensemble README + notebooks/01_fraud_detection_complete.ipynb.
 * - Recommendation engine: recommendation-engine-from-scratch-2026 README.
 * - Churn & CLV: ecommerce-churn-prediction-clv-analysis README + Kaggle notebook.
 */
export const featuredProjects: Project[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "intellicast-ai",
    tier: "featured",
    title: "IntelliCast AI",
    subtitle: "Personal news agent",
    category: "Agentic AI · LLM Applications · Full-Stack AI",
    filters: ["agentic", "retrieval"],
    status: { kind: "live", label: "Live · Early access" },
    tagline:
      "A personal news agent that follows the world for you, checks claims across sources, and briefs you by voice.",
    problem:
      "News products hand people more to read. Following the few stories that matter — and knowing which claims are actually confirmed — still takes time and judgment.",
    approach:
      "An agent cycle clusters articles into evolving stories, verifies claims across outlets, ranks stories against each listener's goals, and turns the result into a fact-checked, two-host audio briefing you can question.",
    highlights: [
      "Articles grouped into evolving stories with local embeddings and pgvector",
      "Claims marked confirmed, single-source or disputed before anything is voiced",
      "Grounded follow-up answers with citations, in English or French",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Llama 3.3 70B",
      "Cartesia",
      "Docker",
      "AWS EC2",
      "Terraform",
      "GitHub Actions",
    ],
    metrics: [
      { value: "14", label: "outlets on a 30-minute agent cycle" },
      { value: "~15 s", label: "tap to first audio", note: "internal testing" },
      { value: "180", label: "offline backend tests in CI" },
    ],
    links: [{ kind: "live", label: "intellicast.news", href: "https://intellicast.news" }],
    linkNote: "Source is private — happy to walk through the architecture.",
    visual: "intellicast",
    seoDescription:
      "Case study: IntelliCast, a personal news agent with story clustering, cross-outlet claim verification, goal-based ranking and fact-checked two-host voice briefings.",
    caseStudy: {
      overview:
        "IntelliCast is an independent AI product I design, build and operate. It reads the news continuously, groups articles into evolving stories, checks claims across outlets, and ranks what matters against each listener's goals. Then it delivers a short two-host audio briefing that can be paused and questioned.",
      motivation:
        "Most news products compete for more reading time. I wanted the opposite: an agent that decides what deserves attention, says why, and is honest about what is confirmed versus reported by a single outlet. That framing turns a podcast generator into an engineering problem about clustering, verification, ranking, grounding and latency.",
      role: [
        "Founder and sole engineer — product, architecture, backend, frontend and infrastructure.",
        "Designed the agent cycle, the trust layer and the streaming audio pipeline.",
        "Own deployment, CI and production operations on AWS.",
      ],
      availability: {
        live: [
          "Account sign-up with personal goals instead of topic categories",
          "Two-host voice briefings ranked against those goals",
          "A fact-check pass on every script before it is voiced",
          "Follow-up questions answered from verified claims, with citations",
          "English and French voices",
        ],
        rollingOut: [
          "Calendar meeting prep and newsletter digests (Gmail access is limited to test users until Google's verification completes)",
          "Plan-gated features — daily briefings, spoken answers, “both sides” episodes, a private podcast feed and alerts — arrive with paid plans; billing is not enabled yet",
        ],
        next: [
          "Separate staging and production environments",
          "A broader public launch after early access",
          "Languages beyond English and French",
        ],
      },
      architecture: {
        caption:
          "Simplified from the system design. Shared work (ingest → verify) runs once per cycle; personal work (rank → deliver) runs per listener.",
        stages: [
          {
            label: "Ingest",
            nodes: [{ title: "14 RSS outlets", detail: "Refreshed every 30 min; only unseen links stored" }],
          },
          {
            label: "Understand",
            nodes: [
              { title: "Local embeddings", detail: "bge-small, 384-d, on the server" },
              { title: "Story clustering", detail: "pgvector similarity; a model settles close calls" },
            ],
          },
          {
            label: "Verify",
            nodes: [
              { title: "Claim extraction", detail: "Per story, across every outlet covering it" },
              { title: "Cross-outlet status", detail: "Confirmed · single-source · disputed" },
            ],
          },
          {
            label: "Personalize",
            nodes: [
              { title: "Goal-based ranking", detail: "Tier plus one sentence on why it matters" },
              { title: "Listener memory", detail: "Visible, and every item can be forgotten" },
            ],
          },
          {
            label: "Produce",
            nodes: [
              { title: "Script generation", detail: "Llama 3.3 70B, streamed turn by turn" },
              { title: "Sentinel fact-check", detail: "Every line checked against claim status" },
            ],
          },
          {
            label: "Deliver",
            nodes: [
              { title: "Two-host voices", detail: "Cartesia Sonic-2, English and French" },
              { title: "Grounded Ask", detail: "Answers only from the story graph, cited" },
            ],
          },
        ],
      },
      implementation: [
        {
          title: "Stories, not articles",
          body: "Articles are embedded on the server with a small 384-dimension model and attached to stories by pgvector similarity; a language model only settles the close calls. A story's version moves only on a material change, which is what “since you last listened” counts.",
        },
        {
          title: "A trust layer that is computed, not asserted",
          body: "Claims are extracted per story and matched across the outlets covering it. Each claim's status — confirmed by two or more outlets, single-source, or disputed — is derived from the evidence and shown with a word and an icon, never color alone.",
        },
        {
          title: "Fact-check before voice",
          body: "Every script passes a Sentinel check before it is voiced: confirmed lines stay, single-source lines are attributed, disputed lines are framed with both sides, and unsupported lines are removed or generalized. The result travels with the episode.",
        },
        {
          title: "Playing while still recording",
          body: "The script streams from the model turn by turn, small batches are fact-checked and voiced in parallel, and the player stitches parts onto one timeline. A stream parser releases a line only once it is complete, so a cut-off sentence is never voiced.",
        },
        {
          title: "Grounded conversation",
          body: "Ask answers only from the story graph and its claims, labels whether an answer comes from confirmed reporting, cites its sources, and can speak the answer in the host's voice before the episode resumes.",
        },
      ],
      decisions: [
        {
          title: "One deployable unit",
          body: "A single Docker image runs nginx, the FastAPI backend and the agent's background loop under supervisord. Deploys stay atomic and rollback is pointing at the previous commit-tagged image.",
        },
        {
          title: "Embeddings run locally",
          body: "Clustering needs many embeddings. A small local model costs nothing per call and keeps article text on the server, so the large models are reserved for judgment.",
        },
        {
          title: "A model per task",
          body: "A router sends each task to the right model: Llama 3.3 70B for writing (with a fallback model), a separate reasoning model for judgments, and deterministic settings for verification so the same input gets the same verdict.",
        },
        {
          title: "Degrade visibly",
          body: "If the fact-check step cannot run, the episode ships with an explicit “not fact-checked” label instead of silently passing as verified.",
        },
        {
          title: "Private by default",
          body: "Row-level security on every table, and episode audio in private storage served through short-lived signed links, with a private per-listener feed.",
        },
      ],
      evaluation: {
        intro:
          "IntelliCast is in early access, so this section reports engineering measurements rather than adoption numbers.",
        metrics: [
          { value: "~15 s", label: "tap to first audio", note: "Streaming pipeline, internal testing" },
          { value: "180", label: "offline backend tests", note: "Run in CI before every image build" },
          { value: "14", label: "outlets per agent cycle", note: "One cycle every 30 minutes" },
        ],
        notes: [
          "No user counts, revenue or growth figures are shown — the product is in early access and billing is not enabled.",
          "CI runs type checks, linting and the offline backend suite, then publishes a commit-tagged image. Production deploys are a deliberate, manual Terraform step.",
        ],
      },
      lessons: [
        {
          title: "Reserve large models for judgment",
          body: "Cheap local embeddings do the bulk work of clustering; the LLM only settles close calls. That split keeps cost and latency predictable.",
        },
        {
          title: "Make uncertainty part of the interface",
          body: "Computing claim status from evidence — and saying it out loud — matters more to trust than a more fluent script.",
        },
        {
          title: "Degrade visibly",
          body: "When a safety step can't run, label the output instead of letting it pass as checked.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "atlas",
    tier: "featured",
    charts: projectCharts.atlas,
    title: "Atlas",
    subtitle: "Autonomous multi-agent research platform",
    category: "Agentic AI · LangGraph · Grounded critique",
    filters: ["agentic"],
    status: { kind: "building", label: "Core complete · Evals in progress" },
    tagline:
      "A multi-agent research platform: parallel researchers, a critic grounded in the sources it retrieved, and a live view of the agent graph as it runs.",
    problem:
      "Single-pass LLM research is slow when sequential and unreliable when unchecked — and a minute-long agent run shouldn't die with the browser connection.",
    approach:
      "A LangGraph planner fans out parallel researchers; a critic checks the answer against retrieved sources and sends back only the faulty branches; runs execute on a worker and stream to the UI over resumable SSE.",
    highlights: [
      "Critic re-runs only the faulted branches, preserving subtask identity",
      "Runs belong to a worker, not the connection — reconnect replays what was missed",
      "UI draws topology from the compiled graph, so it can't drift from what runs",
    ],
    stack: [
      "LangGraph",
      "Claude Sonnet 5",
      "GPT-4o (failover)",
      "FastAPI",
      "arq",
      "Redis",
      "PostgreSQL",
      "Next.js",
      "React Flow",
      "Tavily",
      "Docker Compose",
    ],
    metrics: [
      { value: "23.3 s", label: "5 parallel branches", note: "93.4 s if run back to back" },
      { value: "1.14 s", label: "submit to first visual feedback" },
      { value: "168 · 34", label: "backend · frontend tests, no network" },
    ],
    links: [{ kind: "github", label: "GitHub", href: "https://github.com/ARMAND-cod-eng/Atlas" }],
    visual: "atlas",
    seoDescription:
      "Case study: Atlas, a LangGraph multi-agent research platform with parallel researchers, a grounded critic with targeted retry, enforced token budgets and resumable SSE streaming.",
    caseStudy: {
      overview:
        "Atlas is a multi-agent research platform. A planner decomposes a question into independent subtasks, researcher agents investigate them in parallel against live web search, a critic reviews the findings against the sources actually retrieved and can send specific branches back, and a synthesizer writes a cited answer. The whole run streams to the browser as it happens.",
      motivation:
        "I built Atlas to practice the engineering that separates an agent demo from an agent system: concurrency that is genuinely concurrent, a quality gate that can reject work, cost limits that are enforced rather than hoped for, and runs that survive a dropped connection.",
      role: [
        "Sole engineer — architecture, backend, frontend and verification.",
        "Documented every phase: design decisions, defects found, and how each fix was verified against live providers.",
      ],
      statusNote:
        "Built and verified against live providers through Phase 4. A graded regression eval suite (Phase 5) is in progress and Langfuse tracing (Phase 6) comes next, so no quality scores are reported yet. Atlas runs locally, with Postgres and Redis in Docker Compose.",
      architecture: {
        caption:
          "The API enqueues and relays; an arq worker executes the LangGraph run and writes events to a Redis Stream that the UI follows over SSE.",
        stages: [
          {
            label: "Plan",
            nodes: [{ title: "Planner", detail: "Splits the question into up to five self-contained subtasks" }],
          },
          {
            label: "Research",
            nodes: [
              { title: "Researcher × N", detail: "Parallel branches via LangGraph Send, Tavily search" },
              { title: "Grounded citations", detail: "Sources kept per subtask id" },
            ],
          },
          {
            label: "Synthesize",
            nodes: [{ title: "Synthesizer", detail: "Cited answer, with a concision rule and token backstop" }],
          },
          {
            label: "Critique",
            nodes: [
              { title: "Critic", detail: "Structured verdict per subtask, judged against retrieved sources" },
              { title: "Budget checkpoint", detail: "Max 2 rounds within a 100k-token budget" },
            ],
          },
          {
            label: "Runtime",
            nodes: [
              { title: "FastAPI + arq worker", detail: "Runs belong to the worker, not the request" },
              { title: "Redis Stream → SSE", detail: "Last-Event-ID replay after reconnect" },
              { title: "Postgres checkpointer", detail: "LangGraph state persisted per thread" },
            ],
          },
        ],
        loop: {
          from: 3,
          to: 1,
          label: "Faulted branches go back to their researchers; a write-up-only fault goes back to the synthesizer.",
        },
      },
      implementation: [
        {
          title: "Fan-out that is genuinely concurrent",
          body: "The planner emits self-contained subtasks and LangGraph's Send dispatches one researcher per subtask. On a live five-branch run the slowest branch took 23.3 s against 93.4 s summed — the fan-out costs the slowest branch, not the sum.",
        },
        {
          title: "A critic that can say no",
          body: "The critic returns a structured verdict per subtask, judged against the sources actually retrieved rather than the model's own knowledge. Routing is derived from the verdict: accept, re-research only the faulted branches, or rewrite the synthesis alone.",
        },
        {
          title: "Cost enforced, not hoped for",
          body: "A per-run token counter in Redis is checked at the critic — the only node from which a new iteration can begin. If the budget runs out, the answer ships with an explicit “unverified” note instead of silently looping.",
        },
        {
          title: "Runs that outlive the connection",
          body: "The API enqueues and relays; an arq worker executes. Nine typed event kinds go to a Redis Stream and an SSE endpoint relays them with Last-Event-ID replay. Killing the API mid-run was tested: the run completed with nothing listening, and the UI converged to the identical final state on restart.",
        },
        {
          title: "A graph view that cannot drift",
          body: "The frontend draws topology from an endpoint derived from the compiled LangGraph. The critic → researcher retry edge is declared, so it is drawn dormant from the first frame and lights up when it fires. A test pins the node and edge sets.",
        },
      ],
      decisions: [
        {
          title: "Targeted retry over full re-runs",
          body: "Re-running the whole graph would cost ~72 s and ~31k tokens per iteration, and re-planning produces a different decomposition, so per-subtask feedback has nothing to attach to. Targeted retry costs the slowest faulted branch plus one synthesis.",
        },
        {
          title: "Upsert results, don't append them",
          body: "Once a branch can be retried, appending produces two contradictory results for one subtask. Results are upserted by subtask id — proven with a negative-control test that fails under the old reducer.",
        },
        {
          title: "arq over Celery",
          body: "Atlas is async end to end. Celery would mean a synchronous worker spinning up an event loop to call an async graph, plus a second broker; arq is async-native and uses the Redis already in the stack.",
        },
        {
          title: "A fixed pipeline before ReAct",
          body: "Each subtask arrives self-contained, so researchers use bounded search rather than an open-ended tool loop. Swapping in a ReAct researcher changes nothing about the graph shape or the tests — a decision to make with eval data, not speculation.",
        },
      ],
      evaluation: {
        intro:
          "Measured on local runs against live providers, as documented in the repository. These are latency and cost measurements, not answer-quality scores.",
        metrics: [
          { value: "23.3 s", label: "five parallel branches", note: "93.4 s if run back to back" },
          { value: "67–92 s", label: "typical full run", note: "Dominated by provider token throughput" },
          { value: "0.18 s", label: "SSE relay overhead", note: "Queue pickup ~1.0 s" },
          { value: "1.14 s", label: "submit to graph on screen", note: "Time to first visual feedback" },
          { value: "40.5 → 27.1 s", label: "synthesis after a concision rule", note: "4,392 → 2,752 output tokens" },
          { value: "168 · 34", label: "backend · frontend tests", note: "No network calls, no spend" },
        ],
        notes: [
          "In progress: a graded question set with regression runs against known-good answers. Langfuse tracing follows. Quality numbers will be published once a baseline exists.",
        ],
      },
      lessons: [
        {
          title: "A fallback that always fires looks like a working system",
          body: "An explicit temperature the primary model rejected sent every call to the fallback while every answer still looked fine. A regression test now asserts the primary path works, not just the fallback.",
        },
        {
          title: "Live verification finds what unit tests can't",
          body: "Every Phase 1 defect — including a search tool that reported 401 errors in-band as “no results” — was a failure wearing the costume of success, and none was caught by tests.",
        },
        {
          title: "Declare structure instead of inferring it",
          body: "On a clean run the critic never retries, so a graph inferred from events would hide the most interesting edge exactly when the system works well.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "fraud-detection",
    tier: "featured",
    charts: projectCharts["fraud-detection"],
    figures: projectFigures["fraud-detection"],
    title: "Real-Time Fraud Detection Ensemble",
    category: "Machine Learning · Deep Learning · Anomaly Detection",
    filters: ["ml"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "A stacked ensemble where autoencoder and Isolation Forest anomaly scores feed an XGBoost decision — tuned to catch fraud at a very low false-alarm rate.",
    problem:
      "Card fraud is rare — under 0.2% of transactions in the benchmark data — so accuracy is meaningless, and every false alarm is friction for a real customer.",
    approach:
      "An autoencoder trained only on legitimate transactions and an Isolation Forest each produce an anomaly score; XGBoost makes the final call over 44 engineered features plus both scores.",
    highlights: [
      "Autoencoder learns normal behavior only; reconstruction error flags the unusual",
      "Two unsupervised signals stacked into a supervised XGBoost decision",
      "Precision reported alongside recall, not hidden behind it",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "XGBoost", "pandas", "NumPy"],
    metrics: [
      { value: "0.9834", label: "ROC-AUC" },
      { value: "85.71%", label: "recall" },
      { value: "0.16%", label: "false-positive rate" },
    ],
    links: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/ARMAND-cod-eng/fraud-detection-ensemble",
      },
      {
        kind: "kaggle",
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/armandjunior/real-time-fraud-detection-system-using-autoencoder",
      },
    ],
    visual: "fraud",
    seoDescription:
      "Case study: a fraud detection ensemble combining a PyTorch autoencoder, Isolation Forest and XGBoost — ROC-AUC 0.9834, 85.71% recall at a 0.16% false-positive rate.",
    caseStudy: {
      overview:
        "An independent project on the public ULB credit-card dataset (284,807 transactions): three complementary detectors combined into one decision, evaluated on a held-out test split.",
      motivation:
        "Different fraud patterns need different detectors. Unsupervised anomaly scores can flag unusual behavior without depending on labels; a supervised model can learn which anomalies actually matter.",
      role: ["Independent project — feature engineering, modeling, evaluation and write-up."],
      architecture: {
        caption: "Stacking: anomaly scores become features for the final classifier.",
        stages: [
          {
            label: "Input",
            nodes: [{ title: "Transaction", detail: "30 anonymized PCA components, amount and time" }],
          },
          {
            label: "Features",
            nodes: [{ title: "44 engineered features", detail: "Amount transforms, cyclical time, PCA summary stats, z-scores" }],
          },
          {
            label: "Detectors",
            nodes: [
              { title: "Autoencoder", detail: "PyTorch, trained on legitimate transactions; reconstruction error" },
              { title: "Isolation Forest", detail: "Independent tree-based anomaly score" },
              { title: "Scaled features", detail: "Passed through with RobustScaler" },
            ],
          },
          {
            label: "Decision",
            nodes: [{ title: "XGBoost", detail: "Final classifier with class weighting for the imbalance" }],
          },
          {
            label: "Output",
            nodes: [{ title: "Fraud probability", detail: "Compared against a decision threshold" }],
          },
        ],
      },
      implementation: [
        {
          title: "Feature engineering",
          body: "Amount transforms (log, square root, z-score), a cyclical encoding of time of day (sine and cosine), summary statistics across the PCA components, and z-scores for selected components — 44 features in total, scaled with a RobustScaler.",
        },
        {
          title: "An autoencoder that only knows “normal”",
          body: "A PyTorch autoencoder with a 14-dimension bottleneck is trained on legitimate transactions only. Its reconstruction error becomes an anomaly score for anything it hasn't learned to reproduce.",
        },
        {
          title: "Isolation Forest",
          body: "A tree-based outlier detector contributes a second anomaly signal that doesn't share the autoencoder's assumptions.",
        },
        {
          title: "Stacking with XGBoost",
          body: "Scaled features plus both anomaly scores feed an XGBoost classifier with class weighting for the extreme imbalance, so the supervised model learns which kinds of “unusual” are actually fraud.",
        },
      ],
      decisions: [
        {
          title: "Optimize for false alarms, not accuracy",
          body: "With fraud under 0.2% of transactions, a model that flags nothing is over 99.8% accurate. Evaluation centers on recall, false-positive rate, precision and ROC-AUC instead.",
        },
        {
          title: "Report precision honestly",
          body: "At a 0.16% false-positive rate, precision is 47.46% — roughly one in two alerts is real fraud. Where to set that trade-off is a business decision, so it is shown rather than hidden.",
        },
        {
          title: "Ensemble over a single model",
          body: "Reconstruction error, isolation depth and raw features fail in different ways; stacking lets each cover the others' blind spots.",
        },
      ],
      evaluation: {
        intro: "Held-out test split of the public benchmark dataset.",
        metrics: [
          { value: "0.9834", label: "ROC-AUC" },
          { value: "85.71%", label: "recall", note: "Share of fraud caught" },
          { value: "0.16%", label: "false-positive rate", note: "About 1 in 625 legitimate transactions flagged" },
          { value: "47.46%", label: "precision" },
          { value: "0.611", label: "F1 score" },
          { value: "86 ms", label: "mean scoring latency", note: "101 ms max, notebook benchmark" },
        ],
        notes: [
          "Results come from a public benchmark dataset, not a live payment system.",
          "The notebook also includes a simple cost model (assuming a $500 average fraud, $10 per investigation and $5 of customer friction per false alarm). Under those assumptions it estimates about $32.8K net benefit per 100K transactions — a modeled scenario, not realized savings.",
          "A packaged serving layer is planned; the repository's src/ module is marked “coming soon”.",
        ],
      },
      lessons: [
        {
          title: "On imbalanced problems, the metric is the model",
          body: "Choosing recall at a low false-positive rate over accuracy shaped every downstream decision, from features to thresholds.",
        },
        {
          title: "Unsupervised signals make strong features",
          body: "Anomaly scores give a supervised model a view of “unusual” that labels alone don't provide — in the final model, the Isolation Forest score is the second most important feature, behind only one PCA component.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "recommendation-engine",
    tier: "featured",
    charts: projectCharts["recommendation-engine"],
    figures: projectFigures["recommendation-engine"],
    title: "Recommendation Engine from Scratch",
    category: "Recommender Systems · Machine Learning · Evaluation",
    filters: ["ml"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "Five recommenders built from first principles on 568,454 Amazon reviews, compared with ranking metrics, significance tests and a popularity-bias audit.",
    problem:
      "Recommender comparisons often stop at a single accuracy number. On extremely sparse data, which method actually ranks best — and at what cost to fairness?",
    approach:
      "Implemented popularity, user-based CF, SVD, TF-IDF content-based and a hybrid ensemble with NumPy and SciPy, then evaluated with leave-one-out HR@10, NDCG@10 and MRR, statistical tests and a bias audit.",
    highlights: [
      "Leave-one-out ranking evaluation over 500 users",
      "Effect sizes reported next to p-values",
      "Popularity-bias audit across all systems",
    ],
    stack: ["Python", "NumPy", "SciPy", "scikit-learn", "pandas", "Matplotlib"],
    metrics: [
      { value: "0.026", label: "HR@10 — user-based CF, best of five" },
      { value: "12.8×", label: "better than random selection" },
      { value: "d = 0.18", label: "effect size behind p = 0.022" },
    ],
    links: [
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/ARMAND-cod-eng/recommendation-engine-from-scratch-2026",
      },
      {
        kind: "kaggle",
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/armandjunior/recommendation-engine-from-scratch-amazon-fine-f",
      },
    ],
    visual: "recsys",
    seoDescription:
      "Case study: five recommender systems built from scratch on 568K Amazon reviews, evaluated with HR@10, NDCG and MRR, significance tests and a popularity-bias audit.",
    caseStudy: {
      overview:
        "Five recommendation systems implemented from first principles on the Amazon Fine Food Reviews dataset (568,454 reviews), then compared with a ranking-focused evaluation framework, statistical testing and a fairness audit.",
      motivation:
        "Library recommenders hide the decisions that matter. Building each approach by hand made it possible to see why one wins on sparse data — and to measure what each one costs in popularity bias.",
      role: ["Independent project — implementation, evaluation design, statistical analysis and write-up."],
      architecture: {
        caption: "One data pipeline, five recommenders, one shared evaluation harness.",
        stages: [
          {
            label: "Data",
            nodes: [{ title: "Pipeline", detail: "EDA, k-core filtering, sparse user × item matrix (0.195% dense)" }],
          },
          {
            label: "Recommenders",
            nodes: [
              { title: "Popularity baseline", detail: "Bayesian average" },
              { title: "User-based CF", detail: "Cosine similarity, k = 30" },
              { title: "SVD", detail: "Sparse matrix factorization, k = 50" },
              { title: "Content-based", detail: "TF-IDF, 8K features + bigrams" },
              { title: "Hybrid ensemble", detail: "Weighted blend of all four" },
            ],
          },
          {
            label: "Evaluation",
            nodes: [
              { title: "Ranking", detail: "HR@K, NDCG, MRR — leave-one-out, 500 users" },
              { title: "Rating error", detail: "RMSE / MAE" },
            ],
          },
          {
            label: "Analysis",
            nodes: [
              { title: "Significance", detail: "t-test, Mann-Whitney U and Cohen's d" },
              { title: "Bias audit", detail: "Four-tier popularity exposure framework" },
            ],
          },
        ],
      },
      implementation: [
        {
          title: "Neighborhoods vs. latent factors",
          body: "User-based CF uses cosine similarity over the 30 nearest neighbors; SVD factorizes the sparse matrix with SciPy's svds at 50 latent factors. Both run on the same k-core-filtered matrix.",
        },
        {
          title: "Content signal",
          body: "A TF-IDF model over review text (8K features with bigrams) gives a recommender that doesn't depend on co-ratings at all.",
        },
        {
          title: "A hybrid, measured honestly",
          body: "The hybrid blends SVD (0.40), CF (0.25), content (0.20) and popularity (0.15). It was evaluated like every other system rather than assumed to be best.",
        },
      ],
      decisions: [
        {
          title: "User-CF beats SVD on very sparse data",
          body: "At 0.195% density, neighborhood signal is stronger than weak latent factors. Algorithm sophistication is not a substitute for data density.",
        },
        {
          title: "The hybrid is not automatically better",
          body: "Giving SVD the highest weight, when it is the weakest personalized system, pulls the hybrid away from its strongest signal (CF).",
        },
        {
          title: "Combining systems amplifies bias",
          body: "The hybrid's exposure to the most popular items (56.3%) exceeds every individual system — three signals independently favor popular products.",
        },
        {
          title: "Effect size with every p-value",
          body: "p = 0.022 with Cohen's d = 0.18 means the difference is statistically real but practically small.",
        },
      ],
      evaluation: {
        intro:
          "Leave-one-out ranking evaluation over 500 users. Absolute hit rates are low because the matrix is extremely sparse — the comparison between systems is the point.",
        metrics: [
          { value: "0.026", label: "HR@10, user-based CF", note: "Best of the ranked systems" },
          { value: "12.8×", label: "better than random selection" },
          { value: "110.3", label: "bias score, user-based CF", note: "Second-fairest system (lower is better)" },
        ],
        table: {
          caption: "Ranking results (from the repository).",
          columns: ["System", "HR@10", "NDCG@10", "MRR", "Bias ↓"],
          rows: [
            ["Popularity baseline", "0.0020", "0.0006", "0.0002", "130.2"],
            ["SVD", "0.0120", "0.0060", "0.0042", "100.8"],
            ["Hybrid ensemble", "0.0180", "0.0095", "0.0069", "145.9"],
            ["User-based CF", "0.0260", "0.0141", "0.0106", "110.3"],
          ],
          highlightRow: 3,
        },
        notes: [
          "Dataset: Amazon Fine Food Reviews (SNAP). Results are offline evaluation, not online A/B tests with live users.",
        ],
      },
      lessons: [
        {
          title: "Data density beats model sophistication",
          body: "The simplest personalized method won because the data was sparse — a reminder to diagnose the data before reaching for a bigger model.",
        },
        {
          title: "Accuracy and fairness can coexist",
          body: "User-based CF was both the most accurate and the second-fairest system; the trade-off isn't always a trade-off.",
        },
      ],
    },
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "ecommerce-churn-clv",
    tier: "featured",
    charts: projectCharts["ecommerce-churn-clv"],
    figures: projectFigures["ecommerce-churn-clv"],
    title: "Full-Cycle E-Commerce Churn & CLV",
    category: "Data Science · Predictive Analytics · Business Intelligence",
    filters: ["data-science"],
    status: { kind: "complete", label: "Complete" },
    tagline:
      "An end-to-end churn and customer-value analysis of a Brazilian marketplace, from SQL engineering to an executive-ready retention plan.",
    problem:
      "Which customers are about to leave, how much revenue is at risk, and what should the marketing team do about it?",
    approach:
      "Built an analytical base table in SQL across nine relational tables, modeled churn with a temporal split, segmented customers with RFM, estimated CLV with BG/NBD and Gamma-Gamma, and turned the findings into five prioritized recommendations.",
    highlights: [
      "Caught a leakage bug behind a perfect ROC-AUC and rebuilt with a temporal split",
      "Pivoted from CLV to RFM when the model was right but unhelpful",
      "Delivery time identified as the leading churn driver",
    ],
    stack: ["Python", "SQL", "pandas", "scikit-learn", "XGBoost", "LightGBM", "Lifetimes", "Plotly"],
    metrics: [
      { value: "96,096", label: "customers" },
      { value: "1.55M", label: "records across 9 tables" },
      { value: "8", label: "actionable RFM segments" },
    ],
    links: [
      {
        kind: "kaggle",
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/armandjunior/full-cycle-analysis-e-commerce-churn-prediction",
      },
      {
        kind: "github",
        label: "GitHub",
        href: "https://github.com/ARMAND-cod-eng/ecommerce-churn-prediction-clv-analysis",
      },
    ],
    visual: "churn",
    seoDescription:
      "Case study: full-cycle churn prediction and customer lifetime value analysis on the Olist marketplace — SQL engineering, leakage detection, RFM segmentation and BG/NBD CLV.",
    caseStudy: {
      overview:
        "A full-cycle data science project on the public Olist marketplace dataset — 96,096 customers and about 1.55M records across nine relational tables — covering SQL engineering, cleaning, EDA, modeling, segmentation, CLV estimation and executive recommendations.",
      motivation:
        "Churn models are easy to build and easy to get wrong. The goal was to answer a business question end to end, and to be rigorous about the parts that usually go unchecked: leakage, model fit and whether a result is actually actionable.",
      role: ["Independent project — SQL, analysis, modeling, segmentation and executive write-up."],
      architecture: {
        caption: "From relational tables to a prioritized retention plan.",
        stages: [
          { label: "Data", nodes: [{ title: "9 relational tables", detail: "~1.55M records" }] },
          {
            label: "SQL",
            nodes: [{ title: "Analytical base table", detail: "JOINs, CTEs and window functions" }],
          },
          {
            label: "Explore",
            nodes: [{ title: "28 features · 20+ charts", detail: "Cleaning, feature engineering, annotated EDA" }],
          },
          {
            label: "Model",
            nodes: [{ title: "4 churn models", detail: "Rebuilt on a temporal train/test split" }],
          },
          {
            label: "Segment",
            nodes: [
              { title: "RFM segmentation", detail: "8 actionable segments" },
              { title: "CLV", detail: "BG/NBD + Gamma-Gamma" },
            ],
          },
          {
            label: "Act",
            nodes: [{ title: "5 recommendations", detail: "Prioritized for the marketing team" }],
          },
        ],
      },
      implementation: [
        {
          title: "SQL first",
          body: "The analytical base table is assembled in SQL — joins across the marketplace's relational tables, CTEs for intermediate aggregates and window functions for per-customer history.",
        },
        {
          title: "Modeling",
          body: "Four classifiers (including XGBoost and LightGBM) compared on 28 engineered features, evaluated on a temporal split so the model never sees the future.",
        },
        {
          title: "Segmentation and value",
          body: "RFM scoring groups customers into eight segments with a clear action for each; a BG/NBD + Gamma-Gamma model estimates lifetime value.",
        },
      ],
      decisions: [
        {
          title: "A perfect score is a bug report",
          body: "The first models scored ROC-AUC = 1.0. The cause: recency_days directly encoded the churn label. The pipeline was rebuilt with a temporal train/test split and the fix documented.",
        },
        {
          title: "A correct model can still be the wrong tool",
          body: "BG/NBD correctly predicted near-zero CLV because about 98% of customers never purchase again. RFM segmentation was the more actionable framework for a single-purchase marketplace.",
        },
      ],
      evaluation: {
        intro: "Key findings from the analysis.",
        metrics: [
          { value: "89.8%", label: "churn rate", note: "83,789 of 93,358 customers in the modeling set" },
          { value: "3.0%", label: "repeat purchase rate", note: "The root cause behind churn" },
          { value: "8 vs 13 days", label: "delivery time, active vs churned", note: "The leading churn driver" },
        ],
        notes: [
          "Revenue figures in the notebook are historical totals or projections. The five recommendations carry a projected recovery of R$1M+ — a modeled estimate, not a realized result.",
        ],
      },
      lessons: [
        {
          title: "Distrust perfect metrics",
          body: "Leakage hides in features that look reasonable. A temporal split is the default for anything that predicts the future.",
        },
        {
          title: "Actionability is part of correctness",
          body: "Choosing the framework the business can act on is as important as choosing the most sophisticated one.",
        },
      ],
    },
  },
];

export { moreProjects };

/** Every project with a detail page, featured first. */
export const allProjects: Project[] = [...featuredProjects, ...moreProjects];

export function getProject(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = allProjects.findIndex((project) => project.slug === slug);
  const count = allProjects.length;
  return {
    previous: allProjects[(index - 1 + count) % count],
    next: allProjects[(index + 1) % count],
  };
}

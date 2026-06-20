const writingCategories = {
  "econometrics": "Econometrics",
  "r-programming": "R Programming",
  "data-structures-algorithms": "Data Structures/Algorithms",
  "ml-ds": "Data Science",
  "others": "Others"
};

const writings = [
  {
    "slug": "cs-61b-week-1",
    "title": "Object Instantiation",
    "date": "2025-09-01",
    "summary": "Classes contain not just methods but also data. We instantiate them as objects, distinguish static from instance methods, and meet Java's Lists, Maps, and fixed-size Arrays.",
    "file": "posts/CS 61B/week 1.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-2",
    "title": "Java Collections and Linked Lists",
    "date": "2025-09-08",
    "summary": "Java arrays are fixed-size, but Lists, Sets, and Maps are resizable. We also explore primitive vs. reference types and build a singly linked list with a sentinel node.",
    "file": "posts/CS 61B/week 2.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-2",
    "title": "Pandas",
    "date": "2025-09-08",
    "summary": "An introduction to pandas: Series as 1-D labeled arrays, DataFrames as 2-D tables, and the basics of indexing and selection.",
    "file": "posts/DATA 100/Week 2.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-3",
    "title": "Doubly Linked List",
    "date": "2025-09-15",
    "summary": "Adding a .last pointer speeds up .addLast and .getLast, but not .removeLast. The doubly linked list with backward links solves this.",
    "file": "posts/CS 61B/week 3.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-3",
    "title": "Grouping",
    "date": "2025-09-15",
    "summary": "The split-apply-combine paradigm in pandas: groupby() splits a DataFrame into subframes, and agg() applies aggregations to each group.",
    "file": "posts/DATA 100/Week 3.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-4",
    "title": "Method Overloading in Java",
    "date": "2025-09-22",
    "summary": "Java allows multiple methods with same name, but different parameters.",
    "file": "posts/CS 61B/week 4.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-4",
    "title": "Regular Expressions (Regex)",
    "date": "2025-09-22",
    "summary": "Canonicalization converts data into a standard form, often using regex (regular expressions) to match patterns within strings.",
    "file": "posts/DATA 100/Week 4.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-5",
    "title": "Asymptotic I",
    "date": "2025-09-29",
    "summary": "Characterizing the runtimes of functions with Big-Theta notation — a first look at asymptotic analysis.",
    "file": "posts/CS 61B/week 5.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-5",
    "title": "Visualization II",
    "date": "2025-09-29",
    "summary": "Moving from univariate to bivariate and multivariate visualizations: scatter plots, hex plots, and techniques for handling overplotting.",
    "file": "posts/DATA 100/Week 5.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-6",
    "title": "Asymptotic II | Asymptotic III | Extends, Sets, Maps, and BSTs",
    "date": "2025-10-06",
    "summary": "Big-O as 'less than or equal' (vs. Big-Theta's 'equals'), recursive runtime analysis, and an introduction to inheritance, Sets, Maps, and BSTs.",
    "file": "posts/CS 61B/week 6.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-6",
    "title": "Simple Linear Regression",
    "date": "2025-10-06",
    "summary": "The regression line is the unique straight line that minimizes the mean squared error of estimation among all straight lines.",
    "file": "posts/DATA 100/Week 6.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-7",
    "title": "Binary Search Tree | B-Trees | Left Leaning Red-Black Trees (LLRBs) | Priority Queues and Heaps",
    "date": "2025-10-13",
    "summary": "From BSTs to self-balancing B-trees and left-leaning red-black trees, plus priority queues backed by heaps.",
    "file": "posts/CS 61B/week 7.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-7",
    "title": "Ordinary Least Squares (OLS)",
    "date": "2025-10-13",
    "summary": "OLS combines multiple linear regression with mean squared error. We derive the closed-form solution by projecting Y onto the column space of the design matrix X.",
    "file": "posts/DATA 100/Week 7.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-8",
    "title": "Trees and Traversals | Graph Traversals and Implementations",
    "date": "2025-10-20",
    "summary": "Tree traversals (level, pre, in, post-order), then graph traversals (BFS, DFS) and common adjacency representations.",
    "file": "posts/CS 61B/week 8.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-8",
    "title": "`sklearn` and Gradient Descent",
    "date": "2025-10-20",
    "summary": "Fitting linear regression with sklearn, then learning gradient descent: from intuition (path of least resistance) to learning rates, convexity, and high-dimensional gradients.",
    "file": "posts/DATA 100/Week 8.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-9",
    "title": "Spanning Trees | Directed Acyclic Graphs",
    "date": "2025-10-27",
    "summary": "A spanning tree of an undirected graph connects all vertices with no cycles. We cover MSTs with Prim's algorithm and explore DAGs and topological sort.",
    "file": "posts/CS 61B/week 9.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-9",
    "title": "Batch, mini-batch, and stochastic gradient descent | Feature Engineering | Defining Distributions",
    "date": "2025-10-27",
    "summary": "Mini-batch and stochastic gradient descent approximate the full gradient using random samples, trading exactness for faster, cheaper updates per epoch.",
    "file": "posts/DATA 100/Week 9.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-10",
    "title": "Hash Tables",
    "date": "2025-11-03",
    "summary": "Hash tables convert data into a hash code, reduce it to an index, and store items in buckets — yielding θ(1) average-case lookups when items are well-spread.",
    "file": "posts/CS 61B/week 10.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-10",
    "title": "Random Variables",
    "date": "2025-11-03",
    "summary": "A random variable represents the outcome of a random event. We cover discrete vs. continuous RVs, expectation, variance, and how they connect to statistical inference.",
    "file": "posts/DATA 100/Week 10.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-11",
    "title": "Tries | Basic Sorts (Sorting I)",
    "date": "2025-11-10",
    "summary": "When keys are strings, tries store each letter as a node in a tree for fast lookups. We also begin sorting with selection sort, heapsort, and merge sort.",
    "file": "posts/CS 61B/week 11.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-11",
    "title": "Parameter Inference and the Bootstrap | SQL",
    "date": "2025-11-10",
    "summary": "The bootstrap resamples our data with replacement to quantify uncertainty around an estimate, enabling confidence intervals and hypothesis testing. We also introduce SQL for working with databases.",
    "file": "posts/DATA 100/Week 11.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-12",
    "title": "Insertion Sort (In-place) | Quicksort",
    "date": "2025-11-17",
    "summary": "Insertion sort is extremely fast on nearly-sorted arrays (few inversions). Quicksort partitions around a pivot for an expected O(N log N) sort.",
    "file": "posts/CS 61B/week 12.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-12",
    "title": "SQL II",
    "date": "2025-11-17",
    "summary": "Continuing SQL with GROUP BY, aggregate functions, primary and foreign keys, and a deeper look at SQL's declarative style.",
    "file": "posts/DATA 100/Week 12.md",
    "category": "ml-ds"
  },
  {
    "slug": "cs-61b-week-13",
    "title": "Radix Sort",
    "date": "2025-11-24",
    "summary": "Sorting stability preserves the order of equivalent items. Radix sort exploits this — sorting digit by digit with a stable subroutine — to beat the O(N log N) comparison lower bound.",
    "file": "posts/CS 61B/week 13.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-13",
    "title": "Logistic Regression I",
    "date": "2025-11-24",
    "summary": "Moving from linear regression to classification: logistic regression models the probability of a binary outcome with the sigmoid function.",
    "file": "posts/DATA 100/Week 13.md",
    "category": "ml-ds"
  },
  {
    "slug": "data-100-week-14",
    "title": "Logistic Regression II",
    "date": "2025-12-01",
    "summary": "Turning logistic regression's probabilities into class predictions via a decision boundary, and evaluating classifiers with accuracy, precision, recall, and ROC curves.",
    "file": "posts/DATA 100/Week 14.md",
    "category": "ml-ds"
  },
  {
    "slug": "data-100-week-15",
    "title": "Clustering | Principal Component Analysis (PCA) | Singular Value Decomposition (SVD)",
    "date": "2025-12-08",
    "summary": "K-Means is the most popular clustering approach. We also cover PCA and SVD for dimensionality reduction and uncovering structure in high-dimensional data.",
    "file": "posts/DATA 100/Week 15.md",
    "category": "ml-ds"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-20",
    "title": "What is Econometrics?",
    "date": "2026-01-20",
    "summary": "Econometric questions come in three flavors: descriptive, causal, and forecasting. The hardest are causal — because we only ever observe a sample, and selection bias can distort what we infer.",
    "file": "posts/ENVECON C118/ENVECON C118 1.20.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-22",
    "title": "Random Variables and Distributions",
    "date": "2026-01-22",
    "summary": "A random variable is a numerical summary of a random process. We define CDFs, PMFs, PDFs, and distinguish empirical from true distributions.",
    "file": "posts/ENVECON C118/ENVECON C118 1.22.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-1-26",
    "title": "Getting Started with R",
    "date": "2026-01-26",
    "summary": "Why R? An introduction to R for statistical computing and data analysis.",
    "file": "posts/STAT 33B/STAT 33B 1.26.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-27",
    "title": "Joint and Conditional Distributions",
    "date": "2026-01-27",
    "summary": "Many interesting economic questions involve features of the joint distribution of two or more random variables, along with conditional distributions and independence.",
    "file": "posts/ENVECON C118/ENVECON C118 1.27.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-29",
    "title": "Parameters, Estimands, and Estimators",
    "date": "2026-01-29",
    "summary": "Distinguishing inference (learning estimands from estimators) from identification (learning parameters from estimands) — two separate steps in econometric reasoning.",
    "file": "posts/ENVECON C118/ENVECON C118 1.29.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-2",
    "title": "Vectors | Factors",
    "date": "2026-02-02",
    "summary": "Vectors are the most basic data structure in R — atomic and list flavors. Factors store categorical data with predefined levels.",
    "file": "posts/STAT 33B/STAT 33B 2.2.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-3",
    "title": "Parameter, Estimator, Estimand, Estimate",
    "date": "2026-02-03",
    "summary": "Defining the four key concepts — parameter, estimand, estimator, and estimate — and how identification differs from inference.",
    "file": "posts/ENVECON C118/ENVECON C118 2.3.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-5",
    "title": "Regression Model",
    "date": "2026-02-05",
    "summary": "The simple linear regression model y = β₀ + β₁x + u — its components, assumptions, and what the coefficients mean.",
    "file": "posts/ENVECON C118/ENVECON C118 2.5.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-9",
    "title": "Matrices | Lists",
    "date": "2026-02-09",
    "summary": "Matrices are vectors with a dim attribute, and lists can hold mixed types — two foundational containers in R.",
    "file": "posts/STAT 33B/STAT 33B 2.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-10",
    "title": "Regression Recap",
    "date": "2026-02-10",
    "summary": "A recap of simple linear regression, goodness-of-fit (R²), log/linear transformations, and the assumptions underlying OLS.",
    "file": "posts/ENVECON C118/ENVECON C118 2.10.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-12",
    "title": "The Limits of Simple Linear Regression | Multiple Regression | Choosing what goes into the regression",
    "date": "2026-02-12",
    "summary": "Simple linear regression struggles to draw ceteris paribus conclusions. Multiple regression adds controls — but which variables should we include?",
    "file": "posts/ENVECON C118/ENVECON C118 2.12.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-17",
    "title": "Adding Variables to Regression",
    "date": "2026-02-17",
    "summary": "Three cases when adding a regressor: an irrelevant variable, a relevant but uncorrelated variable, and a relevant variable correlated with existing regressors — each with different implications for bias and variance.",
    "file": "posts/ENVECON C118/ENVECON C118 2.17.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-19",
    "title": "Confidence Intervals",
    "date": "2026-02-19",
    "summary": "When omitted variable bias is unavoidable, signing the bias can still give useful upper or lower bounds. We also build confidence intervals around our coefficient estimates.",
    "file": "posts/ENVECON C118/ENVECON C118 2.19.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-23",
    "title": "Importing Tables | Data Frames",
    "date": "2026-02-23",
    "summary": "Reading plain-text tables (delimited and fixed-width) into R, and working with the resulting data frames.",
    "file": "posts/STAT 33B/STAT 33B 2.23.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-24",
    "title": "RCT | Sample Means | Hypothesis Testing | Sampling Distributions of beta hat",
    "date": "2026-02-24",
    "summary": "Randomized controlled trials solve the omitted-variable bias problem. We also introduce hypothesis testing and the sampling distribution of β̂.",
    "file": "posts/ENVECON C118/ENVECON C118 2.24.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-26",
    "title": "Inference",
    "date": "2026-02-26",
    "summary": "An estimate by itself doesn't tell us much. Statistical inference — t-statistics, p-values, and confidence intervals — lets us ask whether a result could have arisen by chance.",
    "file": "posts/ENVECON C118/ENVECON C118 2.26.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-3-3",
    "title": "`tidyverse`",
    "date": "2026-03-03",
    "summary": "An overview of the tidyverse ecosystem (readr, dplyr, tidyr, ggplot2, etc.) and tibbles — an enhanced, safer version of the data frame.",
    "file": "posts/STAT 33B/STAT 33B 3.3.md",
    "category": "r-programming"
  },
  {
    "slug": "stat-33b-stat-33b-3-9",
    "title": "`ggplot2`",
    "date": "2026-03-09",
    "summary": "An introduction to ggplot2 in R: geoms, aesthetics, mappings, and scales for layered, declarative data visualization.",
    "file": "posts/STAT 33B/STAT 33B 3.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-10",
    "title": "F-Test | Hedonic Regression | Adjusted R^2",
    "date": "2026-03-10",
    "summary": "F-tests check whether a group of variables jointly affects the outcome. We also cover hedonic regression and why adjusted R² is preferred for comparing models.",
    "file": "posts/ENVECON C118/ENVECON C118 3.10.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-12",
    "title": "Natural Experiments: Difference-in-Differences",
    "date": "2026-03-12",
    "summary": "When randomization isn't possible, natural experiments exploit real-world events that assign treatment 'as if' randomly. Difference-in-differences uses changes over time in a control group to construct the counterfactual.",
    "file": "posts/ENVECON C118/ENVECON C118 3.12.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-17",
    "title": "Difference-in-Differences",
    "date": "2026-03-17",
    "summary": "The DiD estimator is the difference between the treatment group's pre/post change and the control group's pre/post change — valid under the parallel trends assumption.",
    "file": "posts/ENVECON C118/ENVECON C118 3.17.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-19",
    "title": "DiD in Practice: Currie and Walker (2011)",
    "date": "2026-03-19",
    "summary": "Applying the DiD framework to study the effect of E-ZPass adoption on infant health near toll plazas, with fixed effects to control for unobserved confounders.",
    "file": "posts/ENVECON C118/ENVECON C118 3.19.md",
    "category": "econometrics"
  },
  {
    "slug": "data-science-machine-learning-ensemble-regression",
    "title": "Types of Ensemble Regression",
    "date": "2026-03-22",
    "summary": "Ensemble methods combine multiple base learners — bagging, random forests, and boosting — to reduce variance or bias and improve predictive accuracy.",
    "file": "posts/Data Science/Machine Learning/Ensemble Regression.md",
    "category": "ml-ds"
  },
  {
    "slug": "data-science-machine-learning-ml-fundamentals",
    "title": "ML/DS Fundamentals",
    "date": "2026-03-22",
    "summary": "ML/DS 면접 대비 핵심 개념 정리 — 확률·통계 기본, bias-variance tradeoff, 손실 함수와 평가 지표, gradient descent, 회귀 모델, 트리 계열 모델, PCA까지.",
    "file": "posts/Data Science/Machine Learning/ML Fundamentals.md",
    "category": "ml-ds"
  },
  {
    "slug": "stat-33b-stat-33b-3-30",
    "title": "Expressions and Conditionals",
    "date": "2026-03-30",
    "summary": "R code is composed of a series of expressions, which can be grouped and controlled with conditionals like if/else.",
    "file": "posts/STAT 33B/STAT 33B 3.30.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-31",
    "title": "DiD with Multiple Time Periods",
    "date": "2026-03-31",
    "summary": "Extending DiD beyond simple before/after with longer panel data — testing pre-trends, estimating dynamic effects, and handling staggered treatment timing.",
    "file": "posts/ENVECON C118/ENVECON C118 3.31.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-2",
    "title": "The Parallel Trends Assumption (Revisited)",
    "date": "2026-04-02",
    "summary": "Revisiting the parallel trends assumption that underpins DiD, how to test it with pre-trends, and why panel regressions need clustered standard errors.",
    "file": "posts/ENVECON C118/ENVECON C118 4.2.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-4-6",
    "title": "Iterations and Loops",
    "date": "2026-04-06",
    "summary": "Three iterative paradigms in R — for, while, and repeat — for performing a procedure multiple times.",
    "file": "posts/STAT 33B/STAT 33B 4.6.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-7",
    "title": "Instrumental Variables",
    "date": "2026-04-07",
    "summary": "When treatment isn't as-good-as random and DiD's parallel trends fails, instrumental variables offer another path: find a Z that exogenously shocks the confounded X.",
    "file": "posts/ENVECON C118/ENVECON C118 4.7.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-9",
    "title": "IV and Regression | From One Instrument to Many",
    "date": "2026-04-09",
    "summary": "Estimating the IV coefficient as the ratio of the reduced form to the first stage, and generalizing from a single instrument to multiple instruments via 2SLS.",
    "file": "posts/ENVECON C118/ENVECON C118 4.9.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-4-13",
    "title": "Intro to Functions",
    "date": "2026-04-13",
    "summary": "Writing functions in R — the function() syntax, the parts of a function, and how to work with their arguments.",
    "file": "posts/STAT 33B/STAT 33B 4.13.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-14",
    "title": "LATE ≠ ATE",
    "date": "2026-04-14",
    "summary": "Even with a valid instrument, IV recovers the LATE — the average effect for compliers — not the ATE for the whole population.",
    "file": "posts/ENVECON C118/ENVECON C118 4.14.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-16",
    "title": "Regression Discontinuity",
    "date": "2026-04-16",
    "summary": "Regression discontinuity exploits sharp cutoffs in a running variable to identify causal effects — units just above and below the threshold are comparable in everything except treatment.",
    "file": "posts/ENVECON C118/ENVECON C118 4.16.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-23",
    "title": "Estimating RD in Practice",
    "date": "2026-04-23",
    "summary": "How RD can fail (a second policy at the cutoff, or unit manipulation of the running variable), and how to estimate RD with local polynomial regression and bandwidth choice.",
    "file": "posts/ENVECON C118/ENVECON C118 4.23.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-4-28",
    "title": "Fuzzy RD",
    "date": "2026-04-28",
    "summary": "When crossing the cutoff only changes the probability of treatment rather than fully determining it, fuzzy RD combines the RD design with an IV-style adjustment.",
    "file": "posts/ENVECON C118/ENVECON C118 4.28.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-final-exam",
    "title": "Econometrics Overview",
    "date": "2026-05-05",
    "summary": "A capstone review of ENVECON C118: how causal economic questions are answered with potential outcomes, RCTs, OLS, DiD, IV, and RD — and the assumptions each design relies on.",
    "file": "posts/ENVECON C118/Final Exam.md",
    "category": "econometrics"
  },
  {
    "slug": "others-반도체-산업-동향의-이해",
    "title": "반도체 산업 동향의 이해",
    "date": "2026-06-20",
    "summary": "반도체의 정의, 제품의 종류와 특징, 반도체 산업의 구조와 글로벌 반도체 시장",
    "file": "posts/Others/반도체 산업 동향의 이해.md",
    "category": "others"
  },
  {
    "slug": "data-science-deep-learning-introduction-to-deep-learning-and-neural-networks",
    "title": "DL 1 - Introduction",
    "date": "2026-06-20",
    "summary": "What is Deep Learning? Layer, Activation Function, Loss Function",
    "file": "posts/Data Science/Deep Learning/Introduction to Deep Learning and Neural Networks.md",
    "category": "ml-ds"
  }
];

const writingCategories = {
  "econometrics": "Econometrics",
  "r-programming": "R Programming",
  "data-structures-algorithms": "Data Structures/Algorithms",
  "data-science": "Data Science"
};

const writings = [
  {
    "slug": "envecon-c118-envecon-c118-1-20",
    "title": "What is Econometrics?",
    "date": "2026-01-20",
    "summary": "We often only observe a sample from the population we want to describe.",
    "file": "posts/ENVECON C118/ENVECON C118 1.20.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-22",
    "title": "DA 2",
    "date": "2026-01-22",
    "summary": "A random variable is a numerical summary of a random process.",
    "file": "posts/ENVECON C118/ENVECON C118 1.22.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-1-26",
    "title": "Getting Started with R",
    "date": "2026-01-26",
    "summary": "",
    "file": "posts/STAT 33B/STAT 33B 1.26.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-27",
    "title": "DA 3",
    "date": "2026-01-27",
    "summary": "Many interesting economic questions involve features of the joint distribution of two or more random variables.",
    "file": "posts/ENVECON C118/ENVECON C118 1.27.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-1-29",
    "title": "Parameters, Estimands, and Estimators",
    "date": "2026-01-29",
    "summary": "In econometrics we often separate the process of learning about the estimand from the estimator (statistical inference) from the process of learnin...",
    "file": "posts/ENVECON C118/ENVECON C118 1.29.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-2",
    "title": "Vectors | Factors",
    "date": "2026-02-02",
    "summary": "A vector is the most basic data structure in R.",
    "file": "posts/STAT 33B/STAT 33B 2.2.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-3",
    "title": "Parameter, Estimator, Estimand, Estimate",
    "date": "2026-02-03",
    "summary": "For each individual  we imagine two potential outcomes:",
    "file": "posts/ENVECON C118/ENVECON C118 2.3.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-5",
    "title": "Regression Model",
    "date": "2026-02-05",
    "summary": "Much of applied econometric analysis starts from the following premise:",
    "file": "posts/ENVECON C118/ENVECON C118 2.5.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-9",
    "title": "Matrices | Lists",
    "date": "2026-02-09",
    "summary": "We can transform a vector into an n-dimensional array by assigning it a dimensions attribute via dim().",
    "file": "posts/STAT 33B/STAT 33B 2.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-10",
    "title": "Regression Recap",
    "date": "2026-02-10",
    "summary": "( on the denominator)",
    "file": "posts/ENVECON C118/ENVECON C118 2.10.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-12",
    "title": "The Limits of Simple Linear Regression | Multiple Regression | Choosing what goes into the regression",
    "date": "2026-02-12",
    "summary": "We know how to use simple regression analysis to explain a dependent variable  as a function of a single independent variable .",
    "file": "posts/ENVECON C118/ENVECON C118 2.12.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-17",
    "title": "Adding Variables to Regression",
    "date": "2026-02-17",
    "summary": "There can be three cases of adding a new variable.",
    "file": "posts/ENVECON C118/ENVECON C118 2.17.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-19",
    "title": "Confidence Intervals",
    "date": "2026-02-19",
    "summary": "Sometimes we can sign the bias and give the lower/upper bounds, and that's enough.",
    "file": "posts/ENVECON C118/ENVECON C118 2.19.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-2-23",
    "title": "Importing Tables | Data Frames",
    "date": "2026-02-23",
    "summary": "There are two subtypes of plain text tabular formats, depending on how values within a row are separated:",
    "file": "posts/STAT 33B/STAT 33B 2.23.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-24",
    "title": "RCT | Sample Means | Hypothesis Testing | Sampling Distributions of \\hat\\beta",
    "date": "2026-02-24",
    "summary": "Recall our potential outcomes framework:",
    "file": "posts/ENVECON C118/ENVECON C118 2.24.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-envecon-c118-2-26",
    "title": "Inference",
    "date": "2026-02-26",
    "summary": "An estimate by itself doesn't tell us much.",
    "file": "posts/ENVECON C118/ENVECON C118 2.26.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-stat-33b-3-3",
    "title": "`tidyverse`",
    "date": "2026-03-03",
    "summary": "A tibble is an enhanced version of the data frame, provided by the tibble package in tidyverse.",
    "file": "posts/STAT 33B/STAT 33B 3.3.md",
    "category": "r-programming"
  },
  {
    "slug": "stat-33b-stat-33b-3-9",
    "title": "`ggplot2`",
    "date": "2026-03-09",
    "summary": "name = c('Leia', 'Luke', 'Han'),",
    "file": "posts/STAT 33B/STAT 33B 3.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-envecon-c118-3-10",
    "title": "F-Test | Hedonic Regression | Adjusted R^2",
    "date": "2026-03-10",
    "summary": "We already know how to test whether a particular variable has no partial effect on the dependent variable.",
    "file": "posts/ENVECON C118/ENVECON C118 3.10.md",
    "category": "econometrics"
  },
  {
    "slug": "cs-61b-week-1",
    "title": "Object Instantiation",
    "date": "2026-03-11",
    "summary": "Classes contain not just functions (a.k.a. methods), but also data.",
    "file": "posts/CS 61B/week 1.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-10",
    "title": "Hash Tables",
    "date": "2026-03-11",
    "summary": "We've now seen several implementations of the Set (or Map) ADT.",
    "file": "posts/CS 61B/week 10.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-11",
    "title": "Tries | Basic Sorts (Sorting I)",
    "date": "2026-03-11",
    "summary": "Suppose we know that our keys are always strings.",
    "file": "posts/CS 61B/week 11.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-12",
    "title": "Insertion Sort (In-place) | Quicksort",
    "date": "2026-03-11",
    "summary": "On arrays with small number of inversions, insertion sort is extremely fast.",
    "file": "posts/CS 61B/week 12.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-13",
    "title": "Radix Sort",
    "date": "2026-03-11",
    "summary": "A sort is said to be stable if order of equivalent items is preserved.",
    "file": "posts/CS 61B/week 13.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-2",
    "title": "Sep 1",
    "date": "2026-03-11",
    "summary": "Java arrays are fixed-size, so we can't add or remove elements.",
    "file": "posts/CS 61B/week 2.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-3",
    "title": "Doubly Linked List",
    "date": "2026-03-11",
    "summary": "Keeping .last indeed makes .addLast and .getLast operations faster. However, it does NOT make .removeLast faster, because we can't update the .last...",
    "file": "posts/CS 61B/week 3.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-4",
    "title": "Method Overloading in Java",
    "date": "2026-03-11",
    "summary": "Java allows multiple methods with same name, but different parameters.",
    "file": "posts/CS 61B/week 4.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-5",
    "title": "Asymptotic I",
    "date": "2026-03-11",
    "summary": "Our goal is to somehow characterize the runtimes of the functions.",
    "file": "posts/CS 61B/week 5.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-6",
    "title": "Asymptotic II | Asymptotic III | Extends, Sets, Maps, and BSTs",
    "date": "2026-03-11",
    "summary": "Given a code snippet, we can express its runtime as a function R(N), where N is some property of the input of the function (often the size of the i...",
    "file": "posts/CS 61B/week 6.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-7",
    "title": "Binary Search Tree | B-Trees | Left Leaning Red-Black Trees (LLRBs) | Priority Queues and Heaps",
    "date": "2026-03-11",
    "summary": "BST height is all four of these:",
    "file": "posts/CS 61B/week 7.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-8",
    "title": "Trees and Traversals | Graph Traversals and Implementations",
    "date": "2026-03-11",
    "summary": "Trees are a more general concept.",
    "file": "posts/CS 61B/week 8.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "cs-61b-week-9",
    "title": "Spanning Trees | Directed Acyclic Graphs",
    "date": "2026-03-11",
    "summary": "Given an undirected graph, a spanning tree T is a subgraph of G, where T:",
    "file": "posts/CS 61B/week 9.md",
    "category": "data-structures-algorithms"
  },
  {
    "slug": "data-100-week-10",
    "title": "Random Variables",
    "date": "2026-03-11",
    "summary": "A random variable (RV or r.v.) represents the outcome of a random event.",
    "file": "posts/DATA 100/Week 10.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-11",
    "title": "Parameter Inference and the Bootstrap | SQL",
    "date": "2026-03-11",
    "summary": "It's easy to get the best guess. (ex. taking average – average height)",
    "file": "posts/DATA 100/Week 11.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-12",
    "title": "SQL II",
    "date": "2026-03-11",
    "summary": "Notice the repeated dish types. What are the trends across each type?",
    "file": "posts/DATA 100/Week 12.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-13",
    "title": "Logistic Regression I",
    "date": "2026-03-11",
    "summary": "Up until this point, we have been working exclusively with linear regression.",
    "file": "posts/DATA 100/Week 13.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-14",
    "title": "Logistic Regression II",
    "date": "2026-03-11",
    "summary": "A decision boundary splits the data into predicted classes based on features.",
    "file": "posts/DATA 100/Week 14.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-15",
    "title": "Clustering | Principal Component Analysis (PCA) | Singular Value Decomposition (SVD)",
    "date": "2026-03-11",
    "summary": "Most popular clustering approach. The algorithm:",
    "file": "posts/DATA 100/Week 15.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-2",
    "title": "Pandas",
    "date": "2026-03-11",
    "summary": "A Series is a 1-D labeled array of Data. We can think of it as a columnar data.",
    "file": "posts/DATA 100/Week 2.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-3",
    "title": "Grouping",
    "date": "2026-03-11",
    "summary": "If there are 'Unnamed' column names after import, we can specify the header to skip first few rows.",
    "file": "posts/DATA 100/Week 3.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-4",
    "title": "Lecture Notes | Discussion",
    "date": "2026-03-11",
    "summary": "Ex.) Join tables with mismatched labels",
    "file": "posts/DATA 100/Week 4.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-5",
    "title": "Visualization II",
    "date": "2026-03-11",
    "summary": "Last time, we focused on visualizing distributions of one variable (i.e., univariate distributions)",
    "file": "posts/DATA 100/Week 5.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-6",
    "title": "Simple Linear Regression",
    "date": "2026-03-11",
    "summary": "The regression line is the unique straight line that minimizes the mean squared error of estimation among all straight lines.",
    "file": "posts/DATA 100/Week 6.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-7",
    "title": "Ordinary Least Squares (OLS) | Discussion",
    "date": "2026-03-11",
    "summary": "The dot product is a vector operation that",
    "file": "posts/DATA 100/Week 7.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-8",
    "title": "`sklearn` and Gradient Descent",
    "date": "2026-03-11",
    "summary": "1. Initialize a new model interface",
    "file": "posts/DATA 100/Week 8.md",
    "category": "data-science"
  },
  {
    "slug": "data-100-week-9",
    "title": "Batch, mini-batch, and stochastic gradient descent | Feature Engineering | Defining Distributions",
    "date": "2026-03-11",
    "summary": "For example: we can calculate the exact gradient with all n data points (i.e., 1 epoch), as before:",
    "file": "posts/DATA 100/Week 9.md",
    "category": "data-science"
  }
];

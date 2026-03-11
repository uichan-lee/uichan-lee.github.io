const writingCategories = {
  "econometrics": "Econometrics",
  "r-programming": "R Programming"
};

const writings = [
  {
    "slug": "envecon-c118-1-20",
    "title": "What is Econometrics?",
    "date": "2026-01-20",
    "summary": "We often only observe a sample from the population we want to describe.",
    "file": "posts/ENVECON C118/ENVECON C118 1.20.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-1-22",
    "title": "DA 2",
    "date": "2026-01-22",
    "summary": "A random variable is a numerical summary of a random process.",
    "file": "posts/ENVECON C118/ENVECON C118 1.22.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-1-26",
    "title": "Getting Started with R",
    "date": "2026-01-26",
    "summary": "",
    "file": "posts/STAT 33B/STAT 33B 1.26.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-1-27",
    "title": "DA 3",
    "date": "2026-01-27",
    "summary": "Many interesting economic questions involve features of the joint distribution of two or more random variables.",
    "file": "posts/ENVECON C118/ENVECON C118 1.27.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-discussion-1",
    "title": "Economic Model",
    "date": "2026-01-28",
    "summary": "An economic model is an equation that describes relationships. For example, we can try to model participation in crime:",
    "file": "posts/ENVECON C118/ENVECON C118 Discussion 1.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-1-29",
    "title": "Parameters Estimands and Estimators",
    "date": "2026-01-29",
    "summary": "In econometrics we often separate the process of learning about the estimand from the estimator (statistical inference) from the process of learnin...",
    "file": "posts/ENVECON C118/ENVECON C118 1.29.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-2-2",
    "title": "Vectors | Factors",
    "date": "2026-02-02",
    "summary": "A vector is the most basic data structure in R.",
    "file": "posts/STAT 33B/STAT 33B 2.2.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-2-3",
    "title": "Parameter, Estimator, Estimand, Estimate",
    "date": "2026-02-03",
    "summary": "For each individual  we imagine two potential outcomes:",
    "file": "posts/ENVECON C118/ENVECON C118 2.3.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-2-5",
    "title": "Regression Model",
    "date": "2026-02-05",
    "summary": "Much of applied econometric analysis starts from the following premise:",
    "file": "posts/ENVECON C118/ENVECON C118 2.5.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-2-9",
    "title": "Matrices | Lists",
    "date": "2026-02-09",
    "summary": "We can transform a vector in an n-dimensional array by giving it a dimensions attribute dim.",
    "file": "posts/STAT 33B/STAT 33B 2.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-2-10",
    "title": "Regression Recap",
    "date": "2026-02-10",
    "summary": "( on the denominator)",
    "file": "posts/ENVECON C118/ENVECON C118 2.10.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-2-12",
    "title": "The Limits of Simple Linear Regression | Multiple Regression | Choosing what goes into the regression",
    "date": "2026-02-12",
    "summary": "We know how to use simple regression analysis to explain a dependent variable  as a function of a single independent variable .",
    "file": "posts/ENVECON C118/ENVECON C118 2.12.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-2-17",
    "title": "Adding Variables to Regression",
    "date": "2026-02-17",
    "summary": "There can be three cases of adding a new variable.",
    "file": "posts/ENVECON C118/ENVECON C118 2.17.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-2-19",
    "title": "Confidence Intervals",
    "date": "2026-02-19",
    "summary": "Sometimes we can sign the bias and give the lower/upper bounds, and that's enough.",
    "file": "posts/ENVECON C118/ENVECON C118 2.19.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-2-23",
    "title": "Importing Tables | Data Frames",
    "date": "2026-02-23",
    "summary": "There are two subtypes of plain text format, depending on how the separated values are identified in a row",
    "file": "posts/STAT 33B/STAT 33B 2.23.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-2-24",
    "title": "RCT | Sample Means | Hypothesis Testing | Sampling Distributions of \\hat\\beta",
    "date": "2026-02-24",
    "summary": "Recall out potential outcomes framework:",
    "file": "posts/ENVECON C118/ENVECON C118 2.24.md",
    "category": "econometrics"
  },
  {
    "slug": "envecon-c118-2-26",
    "title": "Inference",
    "date": "2026-02-26",
    "summary": "Estimate itself doesn't tell us much.",
    "file": "posts/ENVECON C118/ENVECON C118 2.26.md",
    "category": "econometrics"
  },
  {
    "slug": "stat-33b-3-3",
    "title": "`tidyverse`",
    "date": "2026-03-03",
    "summary": "Enhanced data frame in tidyverse",
    "file": "posts/STAT 33B/STAT 33B 3.3.md",
    "category": "r-programming"
  },
  {
    "slug": "stat-33b-3-9",
    "title": "`ggplot2`",
    "date": "2026-03-09",
    "summary": "The starting point is the Data that we want to visualize. The convention is to have data in a table object (e.g. data.frame, tibble) in which varia...",
    "file": "posts/STAT 33B/STAT 33B 3.9.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-3-10",
    "title": "F-Test | Hedonic Regression | Adjusted R^2",
    "date": "2026-03-10",
    "summary": "We already know how to test whether a particular variable has no partial effect on the dependent variable.",
    "file": "posts/ENVECON C118/ENVECON C118 3.10.md",
    "category": "econometrics"
  },
  {
    "slug": "stat33b-midterm",
    "title": "Atomic vs. Non-Atomic Objects",
    "date": "2026-03-10",
    "summary": "All elements are the same data type.",
    "file": "posts/STAT 33B/STAT33B Midterm.md",
    "category": "r-programming"
  }
];

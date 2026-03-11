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
    "title": "DA 3 | If not installed, install.packages(\"tidyverse\") | Flights that departed on January 1 | Flights that departed in January or February | A shorter way to select flights that departed in January or February | Remove duplicate rows, if any | Find all unique origin and destination pairs | Find all unqiue origin and destination pairs, | while keeping all other columns too | You can use .after and .before like `mutate`",
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
    "title": "Vectors | atomic vector | list (non-atomic vector) | logical | integer | double (real) | character | [1] 1 0 3 | Warning message: | imaginary parts discarded in coercion | [1] 3 6 9 | addition | [1] 4 4 4 | multiplication | [1] 3 4 3 | power | [1] 1 4 3 | [1] 0.0000000 0.6931472 1.0986123 | [1]  0.5403023 -0.4161468 -0.9899925 | [1] 1.000000 1.414214 1.732051 | [1] 4 5 6 7 | 데이터 정의 | 1. typeof(ages): 데이터의 물리적 저장 타입 (숫자는 기본적으로 double) | [1] \"double\" | 2. str(ages): 구조 확인 (타입, 인덱스 범위, 값 요약) | num [1:9] 20 15 43 22 54 92 54 33 28 | 3. class(ages): 객체의 지향적 클래스 (숫자 벡터는 numeric) | [1] \"numeric\" | 4. length(ages): 원소의 개수 | [1] 9 | 5. head(ages): 앞부분 6개 데이터 확인 | [1] 20 15 43 22 54 92 | 6. tail(ages): 뒷부분 6개 데이터 확인 | [1] 22 54 92 54 33 28 | 7. summary(ages): 기술 통계량 (최솟값, 사분위수, 평균, 최댓값 등) | Min. 1st Qu.  Median    Mean 3rd Qu.    Max. | 15.00   22.00   33.00   44.56   54.00   92.00 | positive integers: from 1 to 5 | negative integers: from -7 to -2 | decreasing integers: from 3 to -3 | non-integers | sequences | some flavors | sequence of integers from flavors | [1] 1 2 3 | sequence from 1 to 5 | [1] 1 2 3 4 5 | shuffle | sample with replacement | [1] 8 | [1] 1 1 4 4 4 5 7 9 | [1] 9 7 5 4 4 4 1 1 | [1] 7 4 1 4 1 5 4 9 | [1] 4 6 2 5 7 3 8 1 | [1] 1 8 3 2 5 7 4 6 | [1] 9 4 5 1 7 | [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE FALSE | [1] 4 1 4 | [1] 1.0 0.5 3 0.5 | [1] -1 -1 1 1 | [1] 3.14 | [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE | [1] TRUE TRUE TRUE FALSE FALSE FALSE FALSE | [1] FALSE FALSE FALSE TRUE FALSE FALSE FALSE | [1] FALSE FALSE TRUE TRUE TRUE | [1] FALSE TRUE TRUE TRUE TRUE | [1] TRUE FALSE FALSE FALSE FALSE | And more (e.g., <=, ==, !=) | [1] TRUE | [1] TRUE | [1] TRUE | [1] -3 -2 -1 0 1 2 3 | logical comparison | [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE | positions (i.e. indices) of positive values | [1] 5 6 7 | indices of various comparisons | [1] 1 2 3 | [1] 4 | [1] 1 2 3 | [1] 7 | [1] 7 | [1] 1 | [1] 1 | adding names | a b c d | 2 4 6 8 | a | 2 | b | 4 | d | 8 | named numeric(0) | index starts at 1 | a b c | 2 4 6 | a c | 2 6 | c b d a | 6 4 8 2 | c b d a a a | 6 4 8 2 2 2 | a c d | 2 6 8 | b d | 4 8 | a | 2 | b c d | 4 6 8 | a | 2 | b c d | 4 6 8 | You can use a character index vector as long as x has named elements: | a | 2 | b d | 4 8 | a a a a | 2 2 2 2 | a b c d | 2 4 6 8 | [1] 4 | [1] 2 | Factors | numeric vector | creating a factor from num_vector | [1] 1 2 3 7 9 | Levels: 1 2 3 7 9 | string vector | [1] \"a\" \"b\" \"c\" \"d\" \"c\" \"a\" \"b\" | [1] a b c d c a b | Levels: a b c d | storage of factor | [1] \"integer\" | [1] 5 | Levels: 1 3 5 7 9 | [1] 1 3 9 | Levels: 1 2 3 7 9 | a b c d e | 1 2 3 7 9 | Levels: 1 2 3 7 9 | b e d | 2 9 7 | Levels: 1 2 3 7 9 | attributes of a factor | $levels | [1] \"1\" \"2\" \"3\" \"7\" \"9\" | $class | [1] \"factor\" | $names | [1] \"a\" \"b\" \"c\" \"d\" \"e\" | [1] sm md lg sm md | Levels: sm < md < lg | [1] 1 2 3 1 2 3 2 | Levels: 1 < 2 < 3 | [1] 1 2 3 1 2 3 2 | Levels: 1 < 2 < 3",
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
    "title": "Matrices | positive: from 1 to 8 | adding `dim` | dim attribute with 3 dimensions | vector to matrix | [,1] [,2] [,3] [,4] | [1,]    1    3    5    7 | [2,]    2    4    6    8 | matrix filled up by columns | [,1]       [,2] | [1,] \"Harry\"    \"Potter\" | [2,] \"Ron\"      \"Weasley\" | [3,] \"Hermione\" \"Granger\" | vector of names | matrix filled up by rows | [,1]       [,2] | [1,] \"Harry\"    \"Potter\" | [2,] \"Ron\"      \"Weasley\" | [3,] \"Hermione\" \"Granger\" | [,1]      [,2]      [,3]      [,4] | row1 0.9350425 0.9935303 0.6562896 0.8411784 | row2 0.1776413 0.4607735 0.6352256 0.4632204 | row3 0.7971414 0.4552023 0.2446020 0.2763164 | \"row1\" \"row2\" \"row3\" | col1      col2      col3      col4 | row1 0.9350425 0.9935303 0.6562896 0.8411784 | row2 0.1776413 0.4607735 0.6352256 0.4632204 | row3 0.7971414 0.4552023 0.2446020 0.2763164 | [1] | [1] \"row1\" \"row2\" \"row3\" | [2] | [1] \"col1\" \"col2\" \"col3\" \"col4\" | col1      col2       col3       col4 | row1 0.8724660 0.3997758 0.03666098 0.77132468 | row2 0.9109457 0.4466267 0.73974498 0.97545818 | row3 0.7012174 0.6134672 0.12402886 0.07455895 | [,1] [,2] [,3] | [1,] \"a\"  \"a\"  \"a\" | [2,] \"b\"  \"b\"  \"b\" | [3,] \"c\"  \"c\"  \"c\" | [4,] \"d\"  \"d\"  \"d\" | \"empty\" matrices | [,1] [,2] [,3] | [1,]    1    2    3 | [2,]    1    2    3 | [3,]    1    2    3 | [4,]    1    2    3 | [5,]    1    2    3 | [1] 6 6 6 6 6 | [1]  5 10 15 | [,1] [,2] [,3] | [1,]    1    6   11 | [2,]    2    7   12 | [3,]    3    8   13 | [4,]    4    9   14 | [5,]    5   10   15 | [1]  6  7  8  9 10 | descriptive stats of elements in each row (MARGIN = 1) | [,1] [,2] [,3] [,4] [,5] | Min.     1.0  2.0  3.0  4.0  5.0 | 1st Qu.  3.5  4.5  5.5  6.5  7.5 | Median   6.0  7.0  8.0  9.0 10.0 | Mean     6.0  7.0  8.0  9.0 10.0 | 3rd Qu.  8.5  9.5 10.5 11.5 12.5 | Max.    11.0 12.0 13.0 14.0 15.0 | Lists",
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
    "title": "Importing Tables | Using read.table | Using read.csv | Data Frames",
    "date": "2026-02-23",
    "summary": "There are two subtypes of plain text format, depending on how the separated values are identified in a row",
    "file": "posts/STAT 33B/STAT 33B 2.23.md",
    "category": "r-programming"
  },
  {
    "slug": "envecon-c118-2-24",
    "title": "RCT | Sample Means | Hypothesis Testing | Sampling Distributions of $\\hat\\beta$",
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
    "title": "F-Test | Hedonic Regression | Adjusted $R^2$",
    "date": "2026-03-10",
    "summary": "We already know how to test whether a particular variable has no partial effect on the dependent variable.",
    "file": "posts/ENVECON C118/ENVECON C118 3.10.md",
    "category": "econometrics"
  },
  {
    "slug": "stat33b-midterm",
    "title": "The 6 atomic types in R | Check with is.atomic() | [,1] [,2] [,3] | [1,]    1    4    7 | [2,]    2    5    8 | [3,]    3    6    9 | Check | [[1]]  42 | [[2]]  \"hello\" | [[3]]  TRUE | name  age  pass | 1  Alice  25  TRUE | 2  Bob    30  FALSE | 3  Carol  28  TRUE | Integer vectors | Logical vectors | [1] TRUE TRUE TRUE TRUE TRUE | Convert double vector to character | [1] \"1\" \"2\" \"3\" | Convert character vector to integer | [1] 1 2 3 | Convert double vector to logical | [1] TRUE FALSE TRUE | Blair's score | Alex and Drew's scores | Exclude Casey's score | Extract all scores >= 85 | [1] 31 | $Age | [1] 31 | [1] \"list\" | [1] 31 | [1] \"double",
    "date": "2026-03-10",
    "summary": "All elements are the same data type.",
    "file": "posts/STAT 33B/STAT33B Midterm.md",
    "category": "r-programming"
  }
];

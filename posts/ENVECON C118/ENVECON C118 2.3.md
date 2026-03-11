
> [!QUIZ] Warm Up
> ![[image-67.png]]
> 
> ---
> Answer: **3**
> Identification is the ability to uniquely determine the parameters of a model, such as <u>causal effects</u>, from observed data and assumptions. Randomization is key for identification.

### Parameter, Estimator, Estimand, Estimate
![[image-68.png]]

> [!QUIZ] Terms in Practice
> ![[image-69.png]]
> 
> ---
> Answer:
> A. Parameter: 2 
> B. Estimand: 3
> C. Estimator: 4
> D. Estimate: 1

### Inference vs. Identification
- **Identification**: What could we learn about the *parameters* we care about if we had observable data for the *entire population*?
	- requires assumptions about how observed outcomes relate to potential outcomes under different treatments
	- does our estimand equal our parameter?
- **Statistical Inference**: What can we learn about the *population* from the finite *sample* we observe?
	- requires understanding how our sample was generated from the population
	- does our estimator approximate our estimand?

![[IMG_1126.jpeg]]


### Potential Outcomes Framework
For each individual $i$ we imagine two potential outcomes:
- $Y_i(1)$ = outcome if treated (e.g., earnings if attended college)
- $Y_i(0)$ = outcome if not treated (e.g., earnings if didn't attend)

**The fundamental problem of causal inference**: We only observe one!
$$Y_i = D_i \cdot Y_i(1) + (1 - D_i) \cdot Y_i (0) $$

**Target Parameter**: Average Treatment Effect
$$ATE = E[Y_i(1) - Y_i(0)] $$

![[image-70.png]]
![[image-71.png]]

![[image-72.png]]

> [!EXAMPLE] Vouchers for Private Schooling in Columbia: Evidence from a Randomized Natural Experiment
> ![[image-73.png]]
> 
> ---
> 1. What is the **parameter** of interest? Define $D_i, Y_i(1), \text{and } Y_i(0)$
> $D_i = 1$: won lottery
> $D_i = 0$: did not win
> $Y_i(1)$: finish 8th grade / test score / repeat grade / married as teen


## Statistical Inference


#### Sample
- Baseline case: we observe an *independent and identically distributed (i.i.d.)* and *representative* sample of size $N$: e.g. $Y_1, Y_2, ..., Y_N$
	- **independent**: $Y_i$ is independent of $Y_j$ for all $i \neq j$
	- **identically distributed**: $Y_i$ and $Y_j$ have the same distribution for all $i, j$
	- **representative**: the distribution of $Y_i$ is the same as the distribution from the population we care about


> [!NOTE] iid in Practice
> - *iid* and *representative data* is a useful baseline that's relatively easy to analyze
> - **BUT** it's important to realize it might not hold in practice
> 	- if we sample people in the same household, not independent!
> 	- if we stratify sampling by state, not identical

Suppose we are interested in learning the population mean $\mu = E[Y_i]$ from an iid representative sample $Y$ of size $N$
- a natural estimator of the **population mean** is the **sample mean**
  $$\hat{\mu} = \frac{1}{N}\sum_i{Y_i} $$
- $\hat{\mu}$ is a function of the random data $Y$
- it is therefore a **random variable** with a distribution

![[image-74.png]]

## Regression
The idea of **regression** is to formalize the process of estimating the *conditional expectation function* (CEF) by extrapolating across units using a particular functional form (e.g. linear, quadratic, etc.)

### The "Least Squares" Problem

Suppose $X_i$ is a scalar and the CEF is linear:
$$ E[Y_i|X_i = x] = \alpha + x\beta $$

A useful fact: when the CEF is linear, $\alpha$ and $\beta$ solve the "least squares" problem:
$$(\alpha, \beta) = \min \limits_{a, b} E[(Y_i - (a+bX_i))^2] $$


#### Starting with a Simpler Problem
To show that $(\alpha, \beta)$ solve a "least-squares" problem let's first consider a simpler, related problem.

Suppose we want to find a <u>constant</u> $u$ to minimize the mean squared error:
$$\min\limits_{u}E[(Y_i-u)^2] $$

What constant $u$ should we choose? The population mean: $\mu = E[Y_i]$

$$\beta = \frac{Cov(X_i,Y_i)}{Var(X_i)} $$
$$ \alpha = E[Y_i] - \beta E[X_i] $$

#### Slightly Harder Problem

Now suppose we want to choose the function $u(x)$ to minimize:
$$\min \limits_{u(\cdot)}E[(Y_i - u(X_i))^2] $$

For function $u(x)$, we should choose the *conditional expectation function* $\mu(x) = E[Y_i|X_i = x]$

If $E[Y_i|X_i = x] = \alpha + \beta x$ then:
$u(x) = \alpha + \beta x$ minimizes sum of squared errors

#### Least Squares Solutions

$$\hat{\beta} = \frac{\frac{1}{N}\sum_i(X_i-\bar{X})(Y_i-\bar{Y})}{\frac{1}{N}\sum_i(X_i-\bar{X})^2}=\frac{\hat{Cov}(X_i, Y_i)}{\hat{Var}(X_i)} $$
$$\hat{\alpha} = \bar{Y} - \hat{\beta}\bar{X}$$

We want to estimate the **Conditional Average Treatment Effect (CATE)**: $E[Y(1) - Y(0) | X=x]$




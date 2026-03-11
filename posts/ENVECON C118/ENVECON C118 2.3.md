---
title: "ENVECON C118 - Average Treatment Effect and Regression"
date: 2026-02-03
course: ENVECON C118
---

> **🧪 Quiz:**
>
> A researcher wants to estimate the effect of class size on test scores. Which scenario provides the best identification of the causal effect?
>
> 1. Comparing test scores across schools with different class sizes
> 2. Comparing test scores before and after a school voluntarily reduced class sizes
> 3. Comparing test scores in schools where class size was determined by random lottery
> 4. Comparing test scores across schools where students with self-selected into smaller classes
>
> ---
> Answer: **3**
> Identification is the ability to uniquely determine the parameters of a model, such as <u>causal effects</u>, from observed data and assumptions. Randomization is key for identification.

### Parameter, Estimator, Estimand, Estimate

| | |
|---|---|
| **Parameter** | What we want to know about the population (e.g., $E[Y_i(1) - Y_i(0)]$) |
| **Estimand** | A function of the population distribution of observables (e.g., $E[Y_i \mid D_i = 1] - E[Y_i \mid D_i = 0]$) |
| **Estimator** | A function of the sample data (e.g., $\frac{1}{N} \sum_{D_i=1} Y_i - \frac{1}{N_0} \sum_{D_i=0} Y_i$) |
| **Estimate** | The number we get when we apply the estimator to our data (e.g., $5,000) |

> **🧪 Quiz:**
>
> A hospital wants to know if a new surgery technique reduces recovery time. They randomize 100 patients to the new technique ($D_i = 1$) or standard technique ($D_i = 0$) and measure days to recovery.
>
> | Concept | Definition |
> |---|---|
> | A. Parameter | 1. 2.3 days |
> | B. Estimand | 2. $E[Y_i(1) - Y_i(0)]$ for all patients who could receive surgery |
> | C. Estimator | 3. $E[Y_i \mid D_i = 1] - E[Y_i \mid D_i = 0]$ in the population |
> | D. Estimate | 4. $\frac{1}{N_1} \sum_{D_i=1} Y_i - \frac{1}{N_0} \sum_{D_i=0} Y_i$ |
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

**Diagram showing the relationship between population parameters and sample data:** Inference flows from sample estimator to estimand (population), while identification asks whether the estimand equals the parameter of interest.


### Potential Outcomes Framework
For each individual $i$ we imagine two potential outcomes:
- $Y_i(1)$ = outcome if treated (e.g., earning if attended college)
- $Y_i(0)$ = outcome if not treated (e.g., earning if didn't attend)

**The fundamental problem of causal inference**: We only observe one!
$$Y_i = D_i \cdot Y_i(1) + (1 - D_i) \cdot Y_i (0) $$

**Target Parameter**: Average Treatment Effect
$$ATE = E[Y_i(1) - Y_i(0)] $$

**Step 1: Why Does $E[Y_i|D_i = 1] = E[Y_i(1)|D_i = 1] = E[Y_i(1)]$?**
- Recall our model: $Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0)$
- When $D_i = 1$: $Y_i = (1) \cdot Y_i(1) + (0) \cdot Y_i(0) = Y_i(1)$
- So among treated individuals ($D_i = 1$), the **observed outcome $Y_i$ literally is their potential outcome under treatment $Y_i(1)$
- Therefore: $E[Y_i|D_i = 1] = E[Y_i(1)|D_i = 1]$

**Step 2: $E[Y_i(1)|D_i = 1] = E[Y_i(1)]$ from randomization**
- Randomization means $D_i \perp Y_i(1), Y_i(0)$ (independence)
- Independence implies: $E[Y_i(1)|D_i = d] = E[Y_i(1)]$ for any $d$
- In an experiment, who gets treated is determined by a coin flip completely unrelated to what their potential outcomes would be
- Average $Y_i(1)$ among people assigned to treatment equals the average $Y_i(1)$ in the whole population
- Therefore: $E[Y_i(1)|D_i = 1] = E[Y_i(1)]$

**Combining Steps 1 and 2:**
$$E[Y_i|D_i = 1] = E[Y_i(1)]$$

And similarly: $E[Y_i|D_i = 0] = E[Y_i(0)]$

**Average Treatment Effect:**
$$ATE = E[Y_i(1)] - E[Y_i(0)] = E[Y_i|D_i = 1] - E[Y_i|D_i = 0]$$

> **📝 Example: Vouchers for Private Schooling in Colombia**
>
> By Joshua Angrist, Eric Bettinger, Erik Bloom, Elizabeth King, and Michael Kremer
>
> Colombia aimed to increase attendance and reduce the cost of private secondary school fees for students who maintained satisfactory academic performance. Since students could not choose their assigned schools, and vouchers were allocated by lottery, this voucher program provides compelling evidence that vouchers worked for those given them. Students with vouchers were less likely to repeat grades and less likely to drop out of school.
>
> ---
> 1. What is the **parameter** of interest? Define $D_i, Y_i(1), \text{and } Y_i(0)$
>    - $D_i = 1$: won lottery
>    - $D_i = 0$: did not win
>    - $Y_i(1)$: finish 8th grade / test score / repeat grade / married as teen (outcomes if won voucher)
>    - $Y_i(0)$: same outcomes if did not win voucher


## Statistical Inference


#### Sample
- Baseline case: we observe an *independent and identically distributed (i.i.d.)* and *representative* sample of size $N$: e.g. $Y_1, Y_2, ..., Y_N$
	- **independent**: $Y_i$ is independent of $Y_j$ for all $i \neq j$
	- **identically distributed**: $Y_i$ and $Y_j$ have the same distribution for all $i, j$
	- **representative**: the distribution of $Y_i$ is the same as the distribution from the population we care about


> [!NOTE]
> - *iid* and *representative data* is a useful baseline that's relatively easy to analyze
> - **BUT** it's important to realize it might not hold in practice
> 	- if we sample people in the same household, not independent!
> 	- if we stratify sampling by state, not identical

Suppose we are interested in learning the population mean $\mu = E[Y_i]$ from an iid representative sample $Y$ of size $N$
- a natural estimator of the **population mean** is the **sample mean**
  $$\hat{\mu} = \frac{1}{N}\sum_i{Y_i} $$
- $\hat{\mu}$ is a function of the random data $Y$
- it is therefore a **random variable** with a distribution

**Distribution of the Sample Mean $\hat{\mu}$:**

We can use what we've learned to derive the mean and variance of $\hat{\mu}$:

$$E[\hat{\mu}] = E\left[\frac{1}{N}\sum_i Y_i\right] = \frac{1}{N}\sum_i E[Y_i] = \mu$$

$$Var(\hat{\mu}) = Var\left(\frac{1}{N}\sum_i Y_i\right) = \frac{1}{N^2}\sum_i Var(Y_i) = \frac{\sigma^2}{N}$$

- Equation (1) says that $\hat{\mu}$ is **unbiased:** its average value is $\mu$
- Equation (2) says that the standard deviation of $\hat{\mu}$ from its mean (i.e. $\mu$) shrinks with the sample size $N$ (≈ consistency)

## Regression
The idea of **regression** is to formalize the process of estimating the *conditional expectation function* (CEF) by extrapolating across units using a particular functional form (e.g. linear, quadratic, etc.)

### The "Least Squares" Problem

Suppose $X_i$ is a scalar and the CEF is linear:
$$ E[Y_i|X_i = x] = \alpha + x\beta $$

A useful fact that we will exploit is that when this is true $\alpha$ and $\beta$ solve the "least squares" problem:
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




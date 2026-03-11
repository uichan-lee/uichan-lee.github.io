---
title: "ENVECON C118 - Omitted Variable Bias and Hypothesis Testing"
date: 2026-02-17
course: ENVECON C118
---
# Lecture

## Adding Variables to Regression

There can be three cases of adding a new variable. 
1. Irrelevant variable
2. $Cor(y,x_2)$ not any $Cor(x_i, x_2)$
3. $Cor(y,x_2)$ and $Cor(x_1,x_2)$

ex 1 ) $\text{birth\_w}_i = \beta_0 + \beta_1 \text{pollution} + \beta_2 \text{shoesize} + u$ 
$\beta_2$ should be 0, because shoe size($x_2$) is (1) irrelevant to birth weight ($y$). 
The estimator $\hat\beta_2 \approx 0$ .
$E[\hat\beta_2]=\beta_2$ (unbiased estimator)

$Var(\hat\beta_1)=\frac{\sigma_u^2}{SST_1(1-R_1^2)}$

ex 2) $\text{birth\_w}_i = \beta_0 + \beta_1 \text{pollution} + \beta_2 \text{income} + u$ 
$\text{birth\_w}_i = \tilde\beta_0 + \tilde\beta_1 \text{pollution} + u$ 
$\beta_2 > 0$ 
Income *does affect* birth weight and *is correlated* with pollution. 
**Omitted Variable Bias**!


Recall that our assumption that $E[u|x_1, x_2, \dots, x_k] = 0$ is necessary to obtain an unbiased estimate of $\beta$ ($E[\hat\beta_1] = \beta_1$)
As we have seen this assumption can fail in many ways
- one way it can fail is if we fail to include a relevant variable (i.e. that explains $y$) that is also correlated with the included $x$.
- consequence is biased estimates of regression coefficients $E[\hat\beta_1] \neq \beta_1$
- referred to as **omitted variable bias**

## Omitted Variable Bias
The bias can go either direction.
- If omitted variable has same-sign effects on $Y$ and correlation with $X_1$, bias away from zero
- If opposite signs, bias towards zero (or wrong sign)

**Always include** variables that are correlated with $X_1$ and affect $Y$

**Omitted Variable Bias - Technical Explanation:**

Let's examine more technically what is happening "under the hood"

Recall our assumption that $E[u|x_1, \ldots, x_k] = 0$
- necessary to obtain an unbiased estimate of $\beta$ ($E[\hat{\beta}_1] = \beta_1$)

As we have seen this assumption can fail:
- one way it can fail is if we fail to include a relevant variable (i.e. that explains $y$) that is also correlated with the included $x$
- consequence is biased estimates of regression coefficients $E[\hat{\beta}_1] \neq \beta_1$
- referred to as **omitted variable bias**

### Omitted Variable Bias: Summary

$$\text{Bias} = E[\hat{\beta}_1] - \beta_1 = \beta_2 \times \rho_{1,2}$$

- $\beta_2 \propto Cov(Y, X_{\text{omit}})$ = sign of relationship between $X_{\text{omitted}}$ and $Y$
- $\rho_{1,2} \propto Cov(X_1, X_{\text{omit}})$ = sign of relationship between $X_1$ and $X_{\text{omitted}}$

| | $Cov(Y, X_{\text{omit}}) > 0$ | $Cov(Y, X_{\text{omit}}) < 0$ |
|---|---|---|
| $Cov(X_1, X_{\text{omit}}) > 0$ | **Positive bias** (overestimate) | **Negative bias** (underestimate) |
| $Cov(X_1, X_{\text{omit}}) < 0$ | **Negative bias** (underestimate) | **Positive bias** (overestimate) |


## Hypothesis Testing

When $N$ gets large, 
- the sample mean gets close to the population mean
- OLS estimators get close to population coefficients

If the sample mean of income in our data is $50,000 is it reasonable to think that the population mean could be $55,000? What about $75,000? $10 million? 

**Hypothesis testing** formulates the notion of "close"
- It tells us: how likely it is to see a sample mean of $50,000 if the truth is $55,000? 

### Overview of Hypothesis Testing

1. Specify a **null hypothesis** about the **population** that we want to test.
2. Calculate how likely it would be to observe data this extreme if $H_0$ were true. This is called a **p-value**.
3. **Reject** the null hypothesis if the p-value is small.
4. Form a **confidence interval** - all values of $\mu_0$ that we can't reject. 

> We never "prove" $H_0$ true, only fail to reject it ("not guilty")

> [!NOTE]
> **The CLT says**: No matter what distribution $Y_i$ comes from, the sample mean $\hat\mu$ is approximately normal for large $n$
> $$ 
> \hat\mu \approx N(\mu, \frac{\sigma^2}{n})
> $$
> 
> Why this is amazing:
> - We don't need to know the distribution of $Y_i$
> - Works for any population with five variance
> - Subtract population mean and divide population variance then $~N(0,1)$
> - Lets us do hypothesis tests even when errors aren't normal
> 
> **Central Limit Theorem - Distribution of Sample Means:**
>
> Draw 200 samples of size $n$ from a Uniform(0,1) population and plot the distribution of sample means $\hat{\mu}$. As sample size increases (n=1 → n=10 → n=100), the distribution of sample means becomes increasingly concentrated and normal-shaped, even though the underlying population is uniform. This demonstrates that sample means are approximately normal for large $n$, regardless of the underlying distribution.


### The Test Statistic

Key insight from CLT: If $H_0$ is true, we know the distribution of $\hat\mu$ 
$$ 
\hat\mu \sim N(\mu_0, \frac{\sigma^2}{n})
$$
"How likely is our observed $\hat\mu$ under this distribution?"

To make thing simple, we **standardize**:
$$
\hat{t} = \frac{\hat\mu - \mu_0}{\hat\sigma / \sqrt n}
$$
Under the null hypothesis: $\hat{t} \sim N(0, 1)$
Why standardize?
- Now $\hat{t}$ doesn't depend on the scale of the data
- We can use the same values for any problem
- It measures "how many standard errors away from $\mu_0$"

**Standardized Test Statistic:**

$$\hat{t} = \frac{\hat{\mu} - \mu_0}{\hat{\sigma}/\sqrt{n}} = \frac{\text{How far is our estimate from the null?}}{\text{How much variability do we expect?}}$$

- $|\hat{t}| = 1$ → We're 1 standard error away (not unusual)
- $|\hat{t}| = 2$ → We're 2 standard errors away (getting unlikely)
- $|\hat{t}| = 3$ → We're 3 standard errors away (very unlikely if null is true!)

> [!NOTE]
> **Two-Tailed Test:**
> We care about being far from the null in **either direction**
> - Example: Testing $H_0 : \mu = 55,000$ (average income)
> 	- We observe $\hat{\mu} = 45,000 \rightarrow \hat{t} = -2 \rightarrow$ evidence against $H_0$
> 	- We observe $\hat{\mu} = 65,000 \rightarrow \hat{t} = +2 \rightarrow$ evidence against $H_0$
> 	- Both are "2 standard errors away" – both are equally surprising under the null.
>
> Standard normal distribution with shaded area in both tails beyond ±2, showing the regions of extreme values that would indicate evidence against the null hypothesis.

### The P-Value

*If the null were true, how often would I see results this extreme?*

**We Observe $\hat{t} = 2$: How Extreme Is This?**

Standard normal distribution showing a t-statistic of 2 on the horizontal axis. The shaded red areas represent the probability of observing a test statistic as extreme as $|\hat{t}| = 2$ in either tail (the p-value). This visualization helps understand how rare an observed result is under the null hypothesis.

**P-Value Interpretation:**
- p = 0.50, happens all the time, no evidence against $H_0$
- p = 0.10, somewhat unusual, weak evidence against $H_0$
- p = 0.01, very rare, stronger evidence against $H_0$

Small p-value = surprising data = evidence against null


### When do we Reject the Null?

**P-Value Calculation:**

$$p = P(|\hat{t}| \geq |\hat{t}_{\text{obs}}|) = 2 \times (1 - \Phi(|\hat{t}_{\text{obs}}|))$$

Where $\Phi$ is the CDF of the standard normal distribution.

It turns out that $\Phi(1.96) - \Phi(-1.96) \approx 0.95$. Thus $p < 0.05$ if and only if $|\hat{t}| < 1.96$. We reject at the 5% level if $|\hat{t}| > 1.96$.

**Confidence Interval (95%):**

What does this imply about the value of $\mu_0$ we reject/don't reject?
- we don't reject if $|\hat{\mu} - \mu_0| \leq 1.96\sigma/\sqrt{n}$
- $\mu_0 \in [\hat{\mu} - 1.96\sigma/\sqrt{n}, \hat{\mu} + 1.96\sigma/\sqrt{n}]$

The interval $\hat{\mu} \pm 1.96\sigma/\sqrt{n}$ is thus the **95% confidence interval (CI)**

This means $P(\mu_0 \in CI) = 0.05$ when $H_0 : \mu = \mu_0$ true

The **significance** level of a test is a pre-specified probability of incorrectly rejecting the null when it is true (type-I error rate)
- e.g. a 5% level test rejects when p < 0.05

The **power** of a test is the probability of correctly rejecting the null when it is false (type-II error rate)
- the power is a function of the alternative hypothesis is the probability that we reject $H_0 : \mu = \mu_0$ when in fact $\mu = \mu_A$


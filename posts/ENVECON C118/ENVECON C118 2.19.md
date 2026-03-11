---
title: "ENVECON C118 - t-Distribution and Hypothesis Testing"
date: 2026-02-19
course: ENVECON C118
---

> [!NOTE]
> We've seen how omitting variables can lead to biased estimates of $\beta$
> - This is a very common problem
> - We almost never have enough data to control for everything important
> - How could we ever hope to measure (without bias) things like ability, commitment, family connections? 

If we can't solve OVB in most cases, why do we even do regression? 

### Why Regression? – Bounds

Sometimes we can sign the bias and give the lower/upper bounds, and that's enough.
- If we know direction of bias may have a useful **bound** on the true effect
- Example: `Returns` to `education`, omitting `ability`
$$\tilde\beta_1 = \beta_1 + \underbrace{(+)\times (+)}_{\text{positive bias}} $$
- We know $\tilde\beta_1$ *overstates* the return to education.
- So the true return is *at most* $\tilde\beta_1$ we have an *upper bound*

You don't always need the exact causal effect to make a good policy argument.

An *upper bound* can be useful when you want to argue a policy isn't too <u>costly</u> (worth doing)

> **📝 Example:**
> We think OVB is <u>positive</u>: immigrants move to booming cities where wages are already rising.
> If we still find only a *small negative effect* on native wages:
> - Even this overstates the wage decline
> - The true effect on immigration on wages is at most this small

> **📝 Example:**
> We think OVB is <u>negative</u>
> - Kids in Head Start come from more disadvantaged backgrounds
> - OVB makes the program look less effective
> 
> If we still find <u>positive effects</u> on outcomes
> - The true benefit is at least this big
> - The program likely works even better than our estimates suggest

The bounds fail when the *bias* and the *estimate* point is the same direction.
- **Example**: We estimate the pollution **lowers** `birth weight` by 0.03kg
	- `income` has positive correlation with `birth weight`, and negative correlation with `pollution`
	- bias is negative and our estimate is negative
	- how much of that is really pollution vs. the fact that polluted areas are also poorer? 
	- We can't rule out that pollution has no effect! 

# Confidence Intervals

**Sample Standard Deviation ($\hat\sigma$)**
$$\hat{\sigma} = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n-1}}$$

**Standard Error**
$$SE = \frac{\hat{\sigma}}{\sqrt{n}}$$

By CLT, $\hat\mu$ is approximately normal distributed for large $n$
- $\hat\mu \sim N(\mu, \sigma^2/n)$

We can rescale so that $\frac{\hat\mu - \mu}{\sigma / \sqrt n} \sim N(0,1)$

The 95% confidence interval for $\mu$:
"Probability that the random confidence interval includes the true value of $\mu$ is 95%"

Building the 95% CI:
- $P(|\frac{\hat\mu - \mu}{\sigma / \sqrt n}| < c) = 0.95$
- just so happens for standard normal **c = 1.96**

A 95% confidence interval for the mean is constructed by identifying the critical value where 2.5% of the distribution lies in each tail. For a standard normal distribution, this critical value is 1.96. The confidence interval extends from $\hat\mu - 1.96 \times SE$ to $\hat\mu + 1.96 \times SE$, creating a symmetric interval around the sample mean. This interval has the property that if we repeated our sampling procedure many times, approximately 95% of the resulting intervals would contain the true population mean $\mu$.

For example, if $\hat\mu = 100$, $SE = 5$, then the 95% CI is $[100 - 1.96(5), 100 + 1.96(5)] = [90.2, 109.8]$.

Recall we defined our 95% CI in terms of **population** standard deviation ($\sigma$).
But we don't know $\sigma$! We only have the **sample** standard deviation $\hat\sigma$.

## The t-distribution
When we replace $sigma$ with $\hat\sigma$:
$$
\frac{\hat\mu - \mu}{\hat\sigma / \sqrt n} \sim t_{n-1}
$$
The **t-distribution** is like the normal but with **heavier tails** (more probability in the extremes)

The t-distribution has a similar bell shape to the standard normal distribution but with heavier tails, meaning it has greater probability density in the extreme values. The thickness of the tails depends on the degrees of freedom (n-1): with fewer observations, the tails are heavier, reflecting greater uncertainty about the true population standard deviation. As the degrees of freedom increase, the t-distribution approaches the normal distribution.


### Confidence Intervals with the t-Distribution

Fortunately the t-distribution is easy to work with
$$
\frac{\hat\mu - \mu}{\hat\sigma / \sqrt n} \sim t_{n-1}
$$

The $n-1$ is called the "degrees of freedom" this affects how wide the t-distribution is (fewer observations $\rightarrow$ more uncertainty $\rightarrow$ wider distribution)

The critical value $t^*$ such that $P(-t^* \leq t_{n-1} \leq t^*) = 0.95$ <u>NOT</u> 1.96. It is always **greater** than 1.96 for finite $n$, and depends on **degrees of freedom** (n - 1).

> When $n$ is large, the t-distribution is **practically** indistinguishable from the normal distribution (roughly $n$ > 200)
>
> | Degrees of Freedom | $t^*$ (95% CI) | $z^*$ (Normal) |
> |---|---|---|
> | 10 | 2.228 | 1.960 |
> | 30 | 2.042 | 1.960 |
> | 100 | 1.984 | 1.960 |
> | 1000 | 1.962 | 1.960 |
>
> As $n \to \infty$, the t-critical value converges to the normal critical value of 1.960.



#### Constructing Confidence Intervals

1. Determine the confidence level - standard is 95%, but 99% and 90% are also used
2. Compute $\hat\mu$ and $\hat\sigma^2$
3. Find the critical value $c$ from the **t-table**. $c$ will depend on sample size and confidence level.

*t-table*

| Degrees of Freedom | 90% CI ($\alpha/2 = 0.05$) | 95% CI ($\alpha/2 = 0.025$) | 99% CI ($\alpha/2 = 0.005$) |
|---|---|---|---|
| 1 | 6.314 | 12.706 | 63.657 |
| 5 | 2.015 | 2.571 | 4.032 |
| 10 | 1.812 | 2.228 | 3.169 |
| 20 | 1.725 | 2.086 | 2.845 |
| 30 | 1.697 | 2.042 | 2.750 |
| 60 | 1.671 | 2.000 | 2.660 |
| $\infty$ (normal) | 1.645 | 1.960 | 2.576 |

> [!IMPORTANT]
> Why $\alpha / 2$?
> For a two-sided test at significance level $\alpha = 0.05$, we place equal probability in both tails. We look up $\alpha/2 = 0.025$ in the t-table to find the critical value where 2.5% of the distribution lies above it (and 2.5% below). This ensures 95% of the distribution falls within $\pm t^*$.

4. Plug everything into the confidence interval formula:
$$
[\hat\mu - c \times \frac{\hat\sigma}{\sqrt n}, \hat\mu + c \times \frac{\hat\sigma}{\sqrt n}]
$$
	- Remember c is found by looking at the *t-table* for n-1 degrees of freedom for the desired confidence level (n - 1 = 40, for 95% CI $\alpha = 0.05$ so look up $\alpha / 2 = 0.025$)
5. Interpret: there is a 95% probability that this interval covers our true value

> It is not that there is a 95% probability that the true mean is in our confidence interval. 


**Key Insight**: A 95% CI collects all null hypotheses you *can't reject* at $\alpha = 0.05$.
- If $\mu_0$ is inside the CI $\rightarrow$ fail to reject $H_0$
- If $\mu_0$ is outside the CI $\rightarrow$ reject $H_0$

**Example**: Our CI for average rent is \[$2,610, $2,989]
- $H_0:\mu = 2800 \rightarrow$ inside CI $\rightarrow$ don't reject
- $H_0:\mu = 3000 \rightarrow$ outside CI $\rightarrow$ reject


## One-Sided vs Two-Sided Hypothesis Tests

In **two-sided** hypotheses:
$H_0:\mu = \mu_0$ vs $H_1: \mu \neq \mu_0$ 

We reject when $\hat\mu$ is too far from $\mu_0$ in **either** direction
But sometimes theory tells us the effect can only go **one way**

**Right-sided test:** $H_0: \mu \leq \mu_0 \quad \text{vs} \quad H_1: \mu > \mu_0$

**Left-sided test:** $H_0: \mu \geq \mu_0 \quad \text{vs} \quad H_1: \mu < \mu_0$

**When to use:** When you have strong prior reason to believe the effect goes in a specific direction.

For a one-sided right test at $\alpha = 0.05$: reject when $\hat{t} > 1.645$ (all 5% in right tail).
For a two-sided test at $\alpha = 0.05$: reject when $|\hat{t}| > 1.96$ (2.5% in each tail).


When to Use Which?
- **Two-sided** (default in most empirical work):
	- Does this policy have any effect?
	- Is this coefficient different from zero? 
- **One-sided** (only when theory is clear)
	- Does this drug improve outcomes? 
	- Does pollution reduce health? 

**In Practice**: Most published research in economics uses two-sided tests

### Testing Equality of Means of Two Populations

A very common question: **Do two groups have the same mean?**
- Do treated patients recover faster than control patients?
- Do students in small classes score higher than students in larger classes? 

We have two populations:
- Population 1 (e.g., treatment): mean $\mu_1$, observed $\hat\mu_1$ from $n_1$ observations
- Population 2 (e.g., treatment): mean $\mu_2$, observed $\hat\mu_2$ from $n_2$ observations

**Null hypothesis**: $H_0: \mu_1 = mu_2$ or equivalently $H_0: \mu_1 - \mu_2 = 0$

Our estimate of the difference: $\hat\mu_1 - \hat\mu_2$

Standardize it: $\hat{t} = \frac{(\hat\mu_1 - \hat\mu_2)-0}{SE(\hat\mu_1-\hat\mu_2)}$

where: $SE(\hat\mu_1 - \hat\mu_2) = \sqrt{\frac{\hat\sigma_1^2}{n_1} + \frac{\hat\sigma_2^2}{n_2}}$

> **Example: Does Health Insurance Improve Mental Health?**
>
> A study compares mental health outcomes between individuals who gained health insurance (treatment group) and a control group without insurance.
>
> **Treatment Group (Medicaid Coverage):**
> - Sample size: $n_1 = 125$
> - Mean depression score: $\hat\mu_1 = 15.4$
> - Standard deviation: $\hat\sigma_1 = 8.2$
>
> **Control Group (No Insurance):**
> - Sample size: $n_2 = 125$
> - Mean depression score: $\hat\mu_2 = 17.8$
> - Standard deviation: $\hat\sigma_2 = 9.1$
>
> **Testing whether means are equal:**
>
> Standard error of difference:
> $$SE(\hat\mu_1 - \hat\mu_2) = \sqrt{\frac{8.2^2}{125} + \frac{9.1^2}{125}} = \sqrt{0.538 + 0.663} = \sqrt{1.201} = 1.095$$
>
> Difference in means: $\hat\mu_1 - \hat\mu_2 = 15.4 - 17.8 = -2.4$
>
> Test statistic: $\hat{t} = \frac{-2.4}{1.095} = -2.19$
>
> With $n_1 + n_2 - 2 = 248$ degrees of freedom, the critical value for 95% confidence is approximately 1.96. Since $|-2.19| > 1.96$, we reject $H_0: \mu_1 = \mu_2$. Health insurance appears to improve mental health (lower depression scores), with the difference being statistically significant at the 5% level.


---
title: "ENVECON C118 - RCTs, Sample Means, and Confidence Intervals"
date: 2026-02-24
course: ENVECON C118
---
# RCT 

## Why does an RCT solve the OVB problem? 

Recall out potential outcomes framework:
- For each individual $i$, define two **potential outcomes**:
	- $Y_i(1)$ = outcome if individual $i$ receives treatment
	- $Y_i(0)$ = outcome if individual $i$ does *not* receive treatment
	- *individual treatment effect*: $Y_i(1) - Y_i(0)$
- Fundamental problem - only ever observe **one** outcome
	- can estimate *ATE* = $E[Y_i(1) - Y_i(0)] = E[Y_i(1)] - E[Y_i(0)]$
	- with random assignment: $\hat{ATE} = \bar{Y}_{treatment} - \bar{Y}_{control}$

We want the **average treatment effect**: $ATE = E[Y_i(1)] - E[Y_i(0)]$
- Write regression, where $D_i = 1$ if treated:
$$ Y_i = \beta_0 + \beta_1 D_i + u_i $$
	- $\beta_0 = E[Y_i|D_i=0] = E[Y_i(0)]$
	- $\beta_1 = E[Y_i|D_i = 1] - E[Y_i|D_i=0]$
- $\beta_1$ equals the ATE only if $E[u_i|D_i] = 0$

> **OVB Without Randomization:**
> When treatment is not randomly assigned, treated individuals may differ systematically from untreated individuals in ways that affect outcomes. For example, wealthier individuals may be more likely to seek health insurance AND have better health outcomes due to their income, creating confounding. The regression coefficient picks up both the treatment effect and the effect of the omitted variable (wealth).
>
> **With Randomization (RCT):**
> Random assignment ensures that treatment groups are comparable on average. Treatment is independent of all pre-treatment characteristics, observed and unobserved. Since treatment assignment is random, $E[u_i|D_i] = 0$, the error term is uncorrelated with the treatment indicator, and OVB is eliminated. The regression coefficient $\beta_1$ identifies the true ATE without bias from confounding variables.


## A subtlety: Compliance

In practice, not everyone follows their **assignment** (treatment/control)
- Example: Oregon Health Insurance Experiment
	- most who won the lottery (treatment) did *not* enroll in Medicaid
	- people who didn't win the lottery found other health insurance
	- what does this mean for the authors estimated? 

Assignment Treament! 

### ITT: Intent-to-Treat

The ITT compares outcomes by **assignment** regardless of whether people actually took the treatment.
- ITT (Oregon Health Insurance Experiment): $\bar{Y}_{\text{won lottery}} - \bar{Y}_{\text{didn't win lottery}}$
- Easy to compute. No selection bias (groups still random)
- Estimates understate the effect due to "non-compliers"
	- If only 30% enroll in Medicaid, the ITT understates the effect of health insurance
	- 70% effect 0 + 30% effect X $\rightarrow ITT \neq ATE$

## ATT and LATE

**Average Treatment Effect on the Treated (ATT)**
- effect on those who actually **take** the treatment
- but might be *different* in systematic ways correlated with outcomes
- how could this bias the results of the Oregon Health Insurance Experiment? 

**Local Average Treament Effect (LATE)**
- Effect on **compliers** (those who take treatment if and only if assigned)
- ITT too small because of non-compliers: LATE = ITT / share who comply
- But hwo to estimate compliance? 

> **❓ Question:**
> The LATE tells us the effect on **compliers**... but who are they? 
> 
> We can't identify individual complier only see what each person did under their *actual* assigment.
> 
> - Example: a student was offered tutoring and went
> 	- are they a complier (would skip if not offered)
> 	- or an always-taker (would find tutoring no matter what)?
> 
> We can't tell! The LATE is the effect on a group we *can characterize but can't identify*.


> **INFO:**
> $$ ITT = ATT = LATE = ATE $$
> *When does this happen?* treatment applied without choice by subject
> - Examples:
> 	- Audit studies: Researcher puts name/characteristics on resume employer can't opt out of seeing it
> 	- Ad pricing experiments: platform randomly shows different prices
> 	- Double-blind drug trials: Neither patient nor doctor knows which pill was given can't choose to switch 



---
# Sample Means

The sample mean $\bar{Y} = \frac{1}{n}\sum_{i=1}^{n} Y_i$ is an unbiased estimator of the population mean $\mu$: $E[\bar{Y}] = \mu$. Its variance is $Var(\bar{Y}) = \sigma^2/n$, decreasing with sample size. By the Central Limit Theorem, for large $n$, the sample mean is approximately normally distributed: $\bar{Y} \sim N(\mu, \sigma^2/n)$. This allows us to construct confidence intervals and perform hypothesis tests on the population mean.

## Sample Means: Binary Variables

When $Y_i$ is binary (0 or 1), the sample mean equals the sample proportion: $\bar{Y} = p$ (fraction of 1s). For a Bernoulli outcome, the population mean is $\mu = P(Y=1)$ and the variance is $\sigma^2 = p(1-p)$. The standard error of the sample proportion is $SE(\bar{p}) = \sqrt{p(1-p)/n}$.

## Comparing Two Groups

To test whether two groups have equal means:
$$\hat{t} = \frac{(\bar{Y}_1 - \bar{Y}_2) - 0}{SE(\bar{Y}_1 - \bar{Y}_2)}$$

where the standard error is:
$$SE(\bar{Y}_1 - \bar{Y}_2) = \sqrt{\frac{\hat{\sigma}_1^2}{n_1} + \frac{\hat{\sigma}_2^2}{n_2}}$$

A 95% confidence interval for the difference in means is:
$$(\bar{Y}_1 - \bar{Y}_2) \pm t^* \cdot SE(\bar{Y}_1 - \bar{Y}_2)$$

where $t^*$ is the critical value from the t-distribution with $n_1 + n_2 - 2$ degrees of freedom.
## Z-Distribution and t-Distribution

Under the CLT, for large n (z-distribution):
$$ 
\frac{\bar{Y} - \mu}{\sigma / \sqrt n} \sim N(0, 1)
$$

But we don't know $\sigma$! When we plug in $\hat\sigma$:
$$
\hat t = \frac{\bar{Y}-\mu_0}{\hat{SE}(\bar Y)} \sim t_{n-1}
$$

- t-distribution has *heavier tails* than the standard normal distributions
- Accounts for extra uncertainty for estimating $\sigma$
- For large $n$ (say $n > 200$) nearly identical, so using $z^* = 1.96$ is fine


# Hypothesis Testing

## 5 Steps

1. **State the hypotheses**: Specify $H_0$ and $H_1$, and choose significance level $\alpha$ (usually 0.05).
   - $H_0: \beta_j = \beta_{j0}$ (null hypothesis: coefficient equals some value)
   - $H_1: \beta_j \neq \beta_{j0}$ (two-sided) or $\beta_j > \beta_{j0}$ or $\beta_j < \beta_{j0}$ (one-sided)

2. **Calculate the test statistic**:
   $$\hat{t} = \frac{\hat{\beta}_j - \beta_{j0}}{SE(\hat{\beta}_j)}$$
   This follows a t-distribution with $n - k - 1$ degrees of freedom under the null hypothesis.

3. **Find the critical value** $t^*$ from the t-table based on:
   - Significance level $\alpha$ (or $\alpha/2$ for two-sided tests)
   - Degrees of freedom $n - k - 1$

4. **Make a decision**:
   - **Reject $H_0$** if $|\hat{t}| > t^*$ (or $\hat{t} > t^*$ for right-tailed, $\hat{t} < -t^*$ for left-tailed)
   - **Fail to reject $H_0$** if $|\hat{t}| \leq t^*$

5. **Interpret the results**: State the conclusion in the context of the problem. Example: "At the 5% significance level, we reject the null hypothesis that education has no effect on earnings. The estimated return to one year of education is [amount] and is statistically significant."

# Sampling Distributions of $\hat\beta$

So far we've been doing hypothesis tests and CIs for *sample means* and *differences in means*
In practice often want to test hypotheses about **regression coefficients** $\beta_j$

Good news: the same machinery applies!
- already know mean and variance of $\hat\beta$
- just need to know the *sampling distribution* of $\hat\beta$

**OLS Assumptions for Unbiasedness:**
1. Linear model: $Y_i = \beta_0 + \beta_1X_{1i} + \beta_2X_{2i} + \cdots + \beta_kX_{ki} + u_i$
2. Random sample of observations from the population
3. No perfect multicollinearity among regressors
4. Zero conditional mean of errors: $E[u_i|X_1, X_2, \ldots, X_k] = 0$

These assumptions ensure that OLS estimates are unbiased: $E[\hat{\beta}_j] = \beta_j$ for all coefficients.

Assumptions 1-4 guarantee that $E[\hat\beta_j] = \beta_j$ for all $j$
OLS is **unbiased**: on average, across repeated samples, our estimate equals the truth

But unbiased doesn't mean precise! 
- also want to know how much does $\hat\beta_j$ vary from sample to sample
- how to improve precision of estimates

## Variance of $\hat\beta$

Under assumptions 1-4 plus:
5. **Homoskedasticity**: $Var(u|x_1, x_2, \dots , x_k) = \sigma^2$

We get:
$$
Var(\hat\beta_j) = \frac{\sigma_u^2}{SST_j(1-R_j^2)}
$$
- $\sigma_u^2$ = variance of the error term (SSR)
- $SST_j$ = total variation in $x_j$, $\sum(x_{j, i} - \bar{x_j})$
- $R_j^2 = R^2$ from regressing $x_j$ on all other $x$'s

## Distribution of $\hat\beta$

To do hypothesis testing, we need to know its **distribution**

Two options:
- **Large sample**: By the CLT, $\hat\beta_j$ is approximately normal (just like $\hat\mu$)
- **Any sample size**: Add a normality assumption on the errors

6. **Normality**: $u \sim N(0, \sigma ^2)$ conditional on $x_1, \dots , x_k$
$$
u|x \sim Normal(\beta_0 + \beta_1x_1 + \dots + \beta_kx_k, \sigma^2)
$$
Strong assumption: unobserved factors affecting $y$ are normally distributed. 


### Distribution of $\hat\beta$ is normal

Under assumptions 1-6 (or 1-5 with large n):
$$
\hat\beta_j \sim N(\beta_j, \frac{\sigma^2}{SST_j(1-R_j^2)})
$$

Standardizing:
$$
\frac{\hat\beta_j-\beta_j}{SD(\hat\beta_j)}\sim N(0,1)
$$

And since we estimate $\sigma$ with $\hat\sigma$:
$$
\frac{\hat\beta_j-\beta_j}{SE(\hat\beta_j)} \sim t_{n-k-1}
$$
where $k$ is the number of regressors 

**Example: Testing the Return to Education**

Suppose we estimate $\log(Wage_i) = 2.5 + 0.08 \times Education_i + u_i$ with $SE(\hat{\beta}_1) = 0.01$ and $n = 500$.

Test $H_0: \beta_1 = 0$ vs $H_1: \beta_1 \neq 0$ at $\alpha = 0.05$:
- Test statistic: $\hat{t} = \frac{0.08 - 0}{0.01} = 8$
- Degrees of freedom: $n - k - 1 = 500 - 1 - 1 = 498$
- Critical value from t-table: $t^* \approx 1.96$ (with large df, approximately normal)
- Decision: $|8| > 1.96$, so reject $H_0$

**Conclusion:** One additional year of education is associated with an 8% increase in wages, and this effect is statistically significant at the 5% level.

## Economic vs. Statistical Significance
- **Statistical Significance** tells us: is there effect different from zero? 
- **Economic Significance** tells us: is the effect *large enough to matter?*

- A study with 1 million observations might find a statistically significant effect of 0.001 percentage points
	- but who cares?
- A study with 50 observations might find a large effect that isn't significant 
	- we just can't tell



## Testing a Single Linear Combination

Sometimes we want to test whether a linear combination of coefficients equals a value. For example, if we have a model with interaction terms, we might test whether the sum of two coefficients is zero.

**General form:** Test $H_0: c_1\beta_1 + c_2\beta_2 + \cdots + c_k\beta_k = r$ where $c_j$ are weights and $r$ is the hypothesized value.

**Test statistic:**
$$\hat{t} = \frac{c_1\hat{\beta}_1 + c_2\hat{\beta}_2 + \cdots + c_k\hat{\beta}_k - r}{SE(c_1\hat{\beta}_1 + c_2\hat{\beta}_2 + \cdots + c_k\hat{\beta}_k)}$$

**Example:** With $Y = \beta_0 + \beta_1X + \beta_2Z + u$, test whether the effect of $X$ conditional on $Z$ equals the unconditional effect.

The t-statistic follows a t-distribution with $n - k - 1$ degrees of freedom.


## Testing Multiple Linear Restrictions: The F Test

The F test evaluates whether a group of variables jointly affects the outcome. For example, we might test whether demographics (age, gender, race) jointly matter for earnings.

**Null hypothesis:** $H_0: \beta_1 = 0, \beta_2 = 0, \ldots, \beta_r = 0$ (the first $r$ coefficients are all zero)

**Test procedure:**
1. Estimate the restricted model (without those $r$ variables): $SSR_r$
2. Estimate the unrestricted model (with all variables): $SSR_u$
3. Calculate the F-statistic

### The F-Statistic

$$F = \frac{(SSR_r - SSR_u)/r}{SSR_u/(n-k-1)}$$

where:
- $SSR_r - SSR_u$ = sum of squared residuals from restricted minus unrestricted model
- $r$ = number of restrictions (variables being tested)
- $n - k - 1$ = degrees of freedom in unrestricted model

**Decision rule:** Reject $H_0$ if $F > F^*$ where $F^*$ is the critical value from the F-distribution with $r$ and $n-k-1$ degrees of freedom.

**The F-Distribution:** The F-distribution depends on two degrees of freedom: numerator df ($r$) and denominator df ($n-k-1$). It is always positive (right-tailed) and becomes more concentrated near 1 as degrees of freedom increase.

#### F-Test Using $R^2$

An equivalent formula using the model's $R^2$ values:

$$F = \frac{(R^2_u - R^2_r)/r}{(1-R^2_u)/(n-k-1)}$$

where $R^2_u$ and $R^2_r$ are from the unrestricted and restricted models respectively.

**Example:** Test whether a set of demographic variables (age, gender, education) jointly affect log wages.
- Restricted model: $\log(Wage) = \beta_0 + u$
- Unrestricted model: $\log(Wage) = \beta_0 + \beta_1Age + \beta_2Female + \beta_3Education + u$
- If $F$ is large and exceeds the critical value, we conclude that these demographics jointly matter for wages.

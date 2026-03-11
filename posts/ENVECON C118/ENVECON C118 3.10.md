---
title: "ENVECON C118 - F-test, Hedonic Regression, Adjusted R-squared"
date: 2026-03-10
course: ENVECON C118
---
# F-Test

So far...
- Mostly focused on the **t-statistic** associated with any OLS coefficient
- Useful for testing whether the unkown parameter in the population is equal to any given constant (often 0)
- We can also test hypotheses about a single *linear combination* of the $\beta_j$ by rearranging the equation and using a t-test. 

We already know how to test whether a *particular* variable has no partial effect on the dependent variable.
Now, we want to test whether a **group** of variables has no effect on the dependent variable. 

- More precisely, the *null hypothesis* is that a set of variables has no effect on $y$ once another set of variables has been controlled for
	- $H_0: \beta_{educ}=0, \beta_{exp}=0$

> **📝 Example:**
> Full Model:
> $$
> log(salary) = \beta_0 + \beta_1 years + \beta_2 gamesyr + \beta_3 ppg + \beta_4 rpg + \beta_5 apg + u
> $$
> - Suppose we want to test: *once seniority and games per year have been controlled, do performance affect salary?*
> 
> Restricted Model:
> $$
> log(salary) = \beta_0 + \beta_1 years + \beta_2 gamesyr + u
> $$
> 
> $R^2$ dropped from 0.6278 to 0.5971, performance stats were adding explanatory power. 
> Is this drop *large enough* to reject $H_0$ or just due to sample variability? 

The F-statistic measures the *relative increase in SSR* when we move from the unrestricted to the restricted model, scaled by degrees of freedom.
$$
F = \frac{(SSR_r - SSR_{ur})/q}{SSR_{ur}/(n-k-1)}
$$
- $SSR_r$: SSR from the *reduced* model (restricted model)
- $SSR_{ur}$: SSR from the *full* model (unrestricted model)
- $q$: number of restrictions (variables dropped)
- $n-k-1$: degrees of freedom in the full model
- F is *always negative* (since $SSR_r \le SSR_{ur}$)

If the null is true, dropping variables shouldn't increase $SSR_r$ by much so F-stat is small.
If at least one dropped variable matters, $SSR_r$ should increase substantially so F stat is large.
<br>

*Unrestricted model*:
$$
score = \beta_0 + \beta_1 classize + \beta_2 expend + \beta_3 tchcomp + \beta_4 enroll + \beta_5 faminc + \beta_6 motheduc + \beta_7 fatheduc + \beta_8 siblings + u
$$
*Restriced Model*: $score = \beta_0 + \beta_1 classize + \beta_2 expend + \beta_3 tchcomp + \beta_4 enroll$

$H_0: \beta_5, \beta_6, \beta_7, \beta_8 = 0$
$q = 4, k = 8$

<br>

**F-stat $R^2$ version**:
$$
F = \frac{(R^2_{ur}-R^2_r)/q}{(1-R_{ur}^2)/(n-k-1)}
$$

Under $H_0$, the F-statistic follows an **F-distribution**

## F-Distribution

$$
F \sim F_{q, n-k-1}
$$

- More restrictions: distribution shifts right, tightens > easier to reject
- More data: distribution tightens > easier to reject

The rejection rule is simple, we reject if $F > c$.
If rejected, we say the variables are <u>jointly statistically significant</u>.

- With a 5% significance level, q = 3 and n - k - 1 = 60, the critical value is c = 2.76. We would reject $H_0$ at 5% level if the computed value of the F statistic exceeds 2.76. 

The F-distribution is always positive (right-skewed) and depends on two degrees of freedom: numerator df ($q$) and denominator df ($n-k-1$). For a 5% significance level with $q=3$ and $n-k-1=60$, the critical value is $c=2.76$. We reject $H_0$ if the calculated F-statistic exceeds 2.76. The distribution becomes more concentrated around its mean as degrees of freedom increase, making it easier to detect true effects with larger samples.

p-value = $P(f > F)$
$f \sim F_{q, n-k-1}$ and $F$ is our computed test statistic

> Jointly Significant $\neq$ Individually Significant


# Hedonic Regression

- **Key Idea**: When you buy a house, you're really buying a bundle of attributes.
	- *physical house*: square footage, bedrooms, bathrooms, pool
	- *neighborhood*: school quality, crime rate, distance to downtown
	- *environment*: air quality, noise, proximity to parks...
- The price reflects what buyers are willing to pay for each attribute


$$
Price_i = \beta_0 +\beta_1 \cdot Sqft_i + \beta_2 \cdot Bedrooms_i + \beta_3 \cdot Pollution_i + \dots + u_i
$$

- Each $\hat\beta_j$ estimated the *marginal willingness to pay* for one more unit of that attribute, holding else equal.

# Adjusted $R^2$

$$
\bar{R^2}=1-(1-R^2)\frac{n-1}{n-k-1}
$$


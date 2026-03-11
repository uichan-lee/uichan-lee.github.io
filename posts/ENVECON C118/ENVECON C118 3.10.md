# F-Test

So far...
- Mostly focused on the **t-statistic** associated with any OLS coefficient
- Useful for testing whether the unkown parameter in the population is equal to any given constant (often 0)
- We can also test hypotheses about a single *linear combination* of the $\beta_j$ by rearranging the equation and using a t-test. 

> What if we want to test a hypothesis about **multiple** parameters at once? 

We already know how to test whether a *particular* variable has no partial effect on the dependent variable.
Now, we want to test whether a **group** of variables has no effect on the dependent variable. 

- More precisely, the *null hypothesis* is that a set of variables has no effect on $y$ once another set of variables has been controlled for
	- $H_0: \beta_{educ}=0, \beta_{exp}=0$

> [! EXAMPLE] WNBA Salary Model
> Full Model:
> $$
> log(salary) = \beta_0 + \beta_1 years + \beta_2 gamesyr + \beta_3 ppg + \beta_4 rpg + \beta_5 apg + u
> $$
> - Suppose we want to test: *once seniority and games per year have been controlled, do performance statistics have any effect on salary?*
> 
> - What is the null hypothesis in terms of model parameters?
>   $$
>   H_0: \beta_{ppg} = 0, \ \beta_{rpg}=0, \ \beta_{apg}=0
>   $$
> 
> What would it mean *economically* if $H_0$ were true?
> - If $H_0$ is true, then ppg, rpg, and apg have no partial effect on $log(salary)$ once we control for years and gamesyr
> - Would mean CBA's seniority-based fully explains salary variation
> - Performance adds nothing beyond what experience already captures
>   
>   $$
>   H_1: H_0 \text{ is false}
>   $$
> 
> Restricted Model:
> $$
> log(salary) = \beta_0 + \beta_1 years + \beta_2 gamesyr + u
> $$
> 
> $R^2$ dropped from 0.6278 to 0.5971, performance stats were adding explanatory power. 
> 
> Is this drop *large enough* to reject $H_0$ or just due to sample variability? 

> [!CAUTION] Why Not Just Use Three t-Tests? 
> ![[image-143.png]]
> <u>None</u> of `ppg`, `rpg`, or `apg` is individually significant at the 5% level.
> Based on the three t-statistics looks like we cannot reject $H_0$
> 
> Rejecting $H_0$ turns out to be <u>wrong</u> in this example. There are several problems with using separate t-tests:
> 1. t-test on $\beta_{ppg}$ tests whether `ppg` matters holding all other variables fixed but $H_0$ restricts all three simultaneously
> 2. what constitutes rejection at 5%? all three statistically significant? one? 
> 3. running three tests at 5% each *inflates the overall Type I error rate* probability of at least one false rejection is higher than 5%
> 4. performance variables are *correlated* with each other; multicollinearity inflates individual standard errors, making each t-test weak even when variables *jointly* have substantial explanatory power

## Key Insight: Compare Model Fit

OLS estimates are chosen to minimize the sum of squared residuals (SSR)
- The SSR *always increases* when we drop variables
- Does the SSR increase *more than we'd expect from chance alone* when we drop the performance variables?

The F-statistic measures the *relative increase in SSR* when we move from the unrestricted to the restricted model, scaled by degrees of freedom.
$$
F = \frac{(SSR_r - SSR_{ur})/q}{SSR_{ur}/(n-k-1)}
$$
- $SSR_r$: SSR from the *reduced* model (restricted model)
- $SSR_{ur}$: SSR from the *full* model (unrestricted model)
- $q$: number of restrictions (variables dropped)
- $n-k-1$: degrees of freedom in the full model
- F is *always negative* (since $SSR_r \le SSR_{ur}$)

The *numerator* measures how much explanatory power we *lose* by dropping the performance variables, scaled by the number of restrictions.
The *denominator* is the unexplained variance per degree of freedom in the unrestricted model. 

If the null is true, dropping variables shouldn't increase $SSR_r$ by much so F-stat is small.
If at least one dropped variable matters, $SSR_r$ should increase substantially so F stat is large.
<br>
- We **reject** $H_0$ when $F > c$, the critical value from the $F_{q,\ n-k-1}$ distribution

> [!EXAMPLE] Example Model
> 
> *Unrestricted model*:
> $$
> score = \beta_0 + \beta_1 classize + \beta_2 expend + \beta_3 tchcomp + \beta_4 enroll + \beta_5 faminc + \beta_6 motheduc + \beta_7 fatheduc + \beta_8 siblings + u
> $$
> *Restriced Model*: 
> $score = \beta_0 + \beta_1 classize + \beta_2 expend + \beta_3 tchcomp + \beta_4 enroll$
> 
> $H_0: \beta_5, \beta_6, \beta_7, \beta_8 = 0$
> $q = 4, k = 8$
> 

<br>

**F-stat $R^2$ form**:
$$
F = \frac{(R^2_{ur}-R^2_r)/q}{(1-R_{ur}^2)/(n-k-1)}
$$
- Often more convenient because $R^2$ is always between 0 and 1 (wherease SSR can be very large depending on units)
- Both formulas give identical results
	- *Numerator*: How much $R^2$ improves when we add the performance variables, per restriction
	- *Denominator*: How much variation is still unexplained in the full model, per degree of freedom



Under $H_0$, the F-statistic follows an **F-distribution**

## F-Distribution

$$
F \sim F_{q, n-k-1}
$$
The F distribution has *two* degree-of-freedom parameters:
- Numerator df = q (number of restrictions)
- Denominator df = n - k - 1 (df in the full model)

We **reject** $H_0$ when $F > c$, where $c$ is the critical value from the $F_{q, n-k-1}$ distribution at our chosen significance level. 
![[image-144.png]]

- More restrictions ➡️ distribution shifts right, tightens ➡️ easier to reject
- More data ➡️ distribution tightens ➡️ easier to reject

### Rejecting the Null

The rejection rule is simple, we reject if $F > c$.
- If rejected, we say that $x_{k-q+1}, \dots, x_k$ are <u>jointly statistically significant</u>.
- If $H_0$ not rejected say that the varaibles are *jointly insignificant* which often justifies dropping them for the model.


With a 5% significance level, q = 3 and n - k - 1 = 60, the critical value is c = 2.76. We would reject $H_0$ at 5% level if the computed value of the F statistic exceeds 2.76. 

![[image-142.png]]

### p-Values for the F-Test

Just as with t-tests, we can compute **p-values** for F-tests:
$$\text{p-value} = P(\mathscr{F} > F)$$
- where $\mathscr{F} \sim F_{q,\ n-k-1}$ and $F$ is our computed test statistic
- p-value = probability of seeing an F-statistic *at least as large as ours* if $H_0$ were true
- Small p-value ➡️ strong evidence against $H_0$
- With $F$ = 3.8 and $F_{3,138}$ p-value $\approx .012$

### Interpreting the Result

Rejecting $H_0$ tells us that performance stats *jointly add explanatory power* beyond years and games alone.

If anything, the true relationship between performance and salary may be *stronger* than what OLS estimates. 


> [! NOTE] Overall Significance of a Regression
> A special but very common case: test whether **any** of the independent variables help explain $y$:
> $$
> H_0: \beta_1 = 0, \beta_2 = 0, \dots, \beta_k = 0
> $$
> 
> Here $q = k$ (we're dropping all $k$ variables), and the reduced model is just $y = \beta_0 + u$, which has $R^2=0$ by definition.
> 
> The F-statistic simplifies to:
> $$
> F = \frac{R^2/k}{(1-R^2)/(n-k-1)}
> $$
> 
> This is the <u>F-statistic for overall significance</u> what R reports by default.
> It tests whether the model as a whole explains anything at all.

> Jointly Significant $\neq$ Individually Significant
> The t-test is always the *best* test for a <u>single coefficient</u>
> The F-test is desinged for testing multiple restrictions simultaneously

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


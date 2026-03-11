
> [! NOTE] Final Thoughts on Omitted Variable Bias
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

> [! EXAMPLE] Example: Immigration and Wages
> We think OVB is <u>positive</u>: immigrants move to booming cities where wages are already rising.
> If we still find only a *small negative effect* on native wages:
> - Even this overstates the wage decline
> - The true effect on immigration on wages is at most this small

> [!EXAMPLE] Example: Early Childhood Education
> We think OVB is <u>negative</u>
> - Kids in Head Start come from more disadvantaged backgrounds
> - OVB makes the program look less effective
> 
> If we still find <u>positive effects</u> on outcomes
> - The true benefit is at least this big
> - The program likely works even better than our estimates suggest

The bounds fail when the *bias* and the *estimate* point in the same direction.
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

By CLT, $\hat\mu$ is approximately normally distributed for large $n$:
- $\hat\mu \sim N(\mu, \sigma^2/n)$

We can rescale so that $\frac{\hat\mu - \mu}{\sigma / \sqrt n} \sim N(0,1)$

The 95% confidence interval for $\mu$:
"Probability that the random confidence interval includes the true value of $\mu$ is 95%"

Building the 95% CI:
- $P(|\frac{\hat\mu - \mu}{\sigma / \sqrt n}| < c) = 0.95$
- just so happens for standard normal **c = 1.96**

![[image-109.png]]

![[image-110.png]]

Recall we defined our 95% CI in terms of **population** standard deviation ($\sigma$).
But we don't know $\sigma$! We only have the **sample** standard deviation $\hat\sigma$.

## The t-distribution
When we replace $\sigma$ with $\hat\sigma$:
$$
\frac{\hat\mu - \mu}{\hat\sigma / \sqrt n} \sim t_{n-1}
$$
The **t-distribution** is like the normal but with **heavier tails** (more probability in the extremes)

![[image-111.png]]


### Confidence Intervals with the t-Distribution

Fortunately the t-distribution is easy to work with
$$
\frac{\hat\mu - \mu}{\hat\sigma / \sqrt n} \sim t_{n-1}
$$

The $n-1$ is called the "degrees of freedom" — this affects how wide the t-distribution is (fewer observations $\rightarrow$ more uncertainty $\rightarrow$ wider distribution)

The critical value $t^*$ such that $P(-t^* \leq t_{n-1} \leq t^*) = 0.95$ <u>NOT</u> 1.96. It is always **greater** than 1.96 for finite $n$, and depends on **degrees of freedom** (n - 1).

> When $n$ is large, the t-distribution is **practically** indistinguishable from the normal distribution (roughly $n$ > 200)
> ![[image-112.png]]



#### Constructing Confidence Intervals

1. Determine the confidence level - standard is 95%, but 99% and 90% are also used
2. Compute $\hat\mu$ and $\hat\sigma^2$
3. Find the critical value $c$ from the **t-table**. $c$ will depend on sample size and confidence level.

*t-table*
![[image-113.png]]


> [! IMPORTANT] Why $\alpha / 2$?
> Useful for one-sided hypothesis testing
> ![[image-114.png]]

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

![[image-115.png]]

![[image-116.png]]


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
- Population 2 (e.g., control): mean $\mu_2$, observed $\hat\mu_2$ from $n_2$ observations

**Null hypothesis**: $H_0: \mu_1 = \mu_2$ or equivalently $H_0: \mu_1 - \mu_2 = 0$

Our estimate of the difference: $\hat\mu_1 - \hat\mu_2$

Standardize it: $\hat{t} = \frac{(\hat\mu_1 - \hat\mu_2)-0}{SE(\hat\mu_1-\hat\mu_2)}$

where: $SE(\hat\mu_1 - \hat\mu_2) = \sqrt{\frac{\hat\sigma_1^2}{n_1} + \frac{\hat\sigma_2^2}{n_2}}$

> [! EXAMPLE] Does Health Insurance Improve Mental Health? 
> ![[image-117.png]]
> ![[image-118.png]]
> ![[image-119.png]]


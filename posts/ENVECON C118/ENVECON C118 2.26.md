# Inference

An estimate by itself doesn't tell us much.
**Statistical inference** is the process of using *sample* data to draw conclusions about *population parameters*

Tools: *t-statistics*, *p-values*, and *confidence intervals*

> [!question] Why Do We Need Inference?
> - We can never observe the whole population only have a *sample*
> - A different sample would give a different $\hat\beta$
> - How do we know if our particular estimate reflects something real or is just due to sampling variation?
> - Inference gives us a framework to answer: **"Could this result have arisen by chance alone?"**

- Most of our tools for inference start from *one formula*
$$
\hat t = \frac{\hat\beta_j - \beta_{j, 0}}{SE(\hat\beta_j)}
$$

## z- and t- Statistics

![[image-139.png]]

- We almost never know $\sigma$, so in practice we use the *t-statistic*
- The t-distribution has <u>heavier tails</u> than $N(0,1)$
	- accounts for extra uncertainty from estimating $\sigma$
- But for large $n$, $\hat\sigma \approx \sigma$ and the two are nearly identical

> <u>Exception</u>: You can use *z-test* for **binary variables**, because the variance of the binary variable solely depends on the mean (proportion, $p$)

### t-Statistic

![[image-140.png]]

$$ 
\hat t = \frac{\text{what we measured - what we hypothesized}}{\text{how uncertain we are}}
$$
- What does a **large** t-statistic mean?
	- big difference between what we measured and what we hypothesized, relative to how uncertain we are
	- our estimate is far from the null we hypothesized
	- evidence against $H_0$

You can think of the t-statistic as the <u>number of standard errors away from the null</u>



---

## p-Value

The p-value answers: **if** $H_0$ is true, what fraction of time would we get a $|\hat t|$ this large or larger?

![[image-141.png]]

- Shaded area is *tiny* (p < 0.001)
	- would almost never happen by chance
- So we reject $H_0$ at 95%, 99%, ... significance level
	- very low probability we see $\hat t$ this *extreme* given $H_0$
- p-value and $\hat t$
	- $\hat t$ - measure of distance in units of SE
	- p - measure of probability 
		- what is the probability we observe a test statistic (t-value, $\hat t$) as extreme or more extreme than the one calculated from our sample data assuming the null hypothesis is true


> [!NOTE] Interpreting the p-value
> - **Key:** The p-value is *not* the probability that $H_0$ is true!
> 	- it's the probability of <u>getting data this extreme</u> if $H_0$ were true
> 	- those are VERY different things
> - We reject $H_0$ when $p < \alpha$ (typically $\alpha$ = 0.05)


## Confidence Interval

The confidence interval asks: *what range of values for $\beta_j$* are consistent with our data?

$$
\hat \beta_j \pm t^*_{n-k-1} \times SE(\hat \beta_j)
$$
- If a value is *inside* the CI, we can't reject it as a null hypothesis
- If a value is *outside* the CI, we reject it
- The CI collects *all values of* $\beta_{j, 0}$ that we would fail to reject at the $\alpha$ level


## Common Mistakes

- **We accept** $H_0$
	- No! We only *fail to reject*
	- $p = 0.06$, so there is no effect
	- a p-value just above 0.05 not meaningfully different from one just below
- **Ignoring magnitude**
	- $\hat\beta$ significant doesn't mean $\hat\beta$ is large
	- always ask: is this economically meaningful?
- **The p-value is the probability** $H_0$ is true
	- No! it's $P(\text{data this extreme} | H_0)$, not $P(H_0|data)$


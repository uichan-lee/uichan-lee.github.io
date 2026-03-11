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

![[image-101.png]]

### Omitted Variable Bias: Summary
![[image-102.png]]


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

> [! NOTE] The Central Limit Theorem (CLT)
> **The CLT says**: No matter what distribution $Y_i$ comes from, the sample mean $\hat\mu$ is approximately normal for large $n$
> $$ 
> \hat\mu \approx N(\mu, \frac{\sigma^2}{n})
> $$
> 
> Why this is amazing:
> - We don't need to know the distribution of $Y_i$
> - Works for any population with finite variance
> - Subtract population mean and divide population variance then $~N(0,1)$
> - Lets us do hypothesis tests even when errors aren't normal
> 
> ![[image-103.png]]


### The Test Statistic

Key insight from CLT: If $H_0$ is true, we know the distribution of $\hat\mu$ 
$$ 
\hat\mu \sim N(\mu_0, \frac{\sigma^2}{n})
$$
"How likely is our observed $\hat\mu$ under this distribution?"

To make things simple, we **standardize**:
$$
\hat{t} = \frac{\hat\mu - \mu_0}{\hat\sigma / \sqrt n}
$$
Under the null hypothesis: $\hat{t} \sim N(0, 1)$
Why standardize?
- Now $\hat{t}$ doesn't depend on the scale of the data
- We can use the same values for any problem
- It measures "how many standard errors away from $\mu_0$"

![[image-104.png]]

> [! NOTE] Why Absolute Value $|\hat{t}|$
> - We care about being far from the null in <u>either direction</u>
> - Example: Testing $H_0 : \mu = 55,000$ (average income)
> 	- We observe $\hat\mu = 45,000 \rightarrow \hat{t} = -2 \rightarrow$ evidence against $H_0$
> 	- We observe $\hat\mu = 65,000 \rightarrow \hat{t} = +2 \rightarrow$ evidence against $H_0$
> 	- Both are "2 standard errors away" – both are equally surprising under the null.
> 
> ![[image-105.png]]

### The P-Value

*If the null were true, how often would I see results this extreme?*

![[image-106.png]]
Some intuition
- p = 0.50, happens all the time, no evidence against $H_0$
- p = 0.10, somewhat unusual, weak evidence against $H_0$
- p = 0.01, very rare, stronger evidence against $H_0$

> Small p-value = surprising data = evidence against null


### When do we Reject the Null?

- **P-value** = probability of observing a test statistic at least as extreme as ours, if the null is true
![[image-107.png]]

![[image-108.png]]

The **significance** level of a test is a pre-specified probability of incorrectly rejecting the null when it is true (type-I error rate)
- e.g. a 5% level test rejects when p < 0.05

The **power** of a test is the probability of correctly rejecting the null when it is false (type-II error rate)
- the power is a function of the alternative hypothesis is the probability that we reject $H_0 : \mu = \mu_0$ when in fact $\mu = \mu_A$


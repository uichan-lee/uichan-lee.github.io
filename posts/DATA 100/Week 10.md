# Random Variables 

> [!Question] An Investing Conundrum 
> Imagine you are an analyst at a small-but-mighty venture capital firm.
> You identify a hot new start-up and are considering an investment of $1 million.
> Your analysis estimates a 90% chance that the start-up fails and you lose your $1 million.
> But, there's a 10% chance the start-up succeeds and your investment grows to $11 million.
> You can only invest the $1 million, or do nothing. Do you invest?

A **random variable (RV or r.v.)** represents the *outcome of a random event*. 

For example, a fair coin land either heads (H) or tails (T).
Let the random variable (RV) $X_i$ represent the outcome of the $i^{th}$ coin flip in a series of flips:
![[image-9.png]]

Suppose we repeatedly flip a coin.
- The first flip is heads $\rightarrow X_1 = 1$
- The second flip is tails$\rightarrow X_2 = 0$
- The third flip is tails $\rightarrow X_3 = 1$
- And so on.


Random variables (RVs) are either **discrete** or **continuous**. 

<u>Discrete</u>: **Finite** # of possible outcomes. For example, coin flips (head or tails).  $X_i \in \{0, 1\}$
<u>Continuous</u>: **Infinite** # of possible outcomes. For example, let $Y_i$ be an RV representing the number of seconds a coin is in the air during the $i^\text{th}$ coin flip. 

The outcomes of RVs have corresponding **probabilities**.

<u>Discrete RV</u>: Each possible outcome has an associated probability.
For coin flips, $P(X = 1) = 0.5$ and $P(X = 0) = 0.5$
<u>Continuous RV</u>: Individual outcomes have probability 0. No single event is "special"!
For example, if Y represents airtime of coin flips, P(Y = 2.62183 sec) = 0
But **ranges** of outcomes have probability $\ge 0$.
For example, we could have a situation where **P(0 seconds < Y < 2 seconds) = 0.8**.


The **probability distribution** of a <u>discrete</u> RV provides the probability associated with each possible outcome. 

> We typically use **capital letters (X)** as a placeholder for the outcome of a random variable. 
> 
> We typically use **lower letters (x)** to denote possible values that an RV can take on. 
![[image-10.png|327x335]]

The probabilities associated with each outcome of a <u>discrete</u> RV **sum to 1**.
![[image-11.png]]

Probability tables don't work for continuous RVs! 
Let Y be an RV that represents the seconds of airtime for a coin flip. 
![[image-12.png|583x221]]

> For continuous random variables, probability comes from area

![[image-13.png]]
The **total area** under the **density** curve of the RV Y is 1. 
Continuous RVs work a little differently than discrete RVs. (Take #DATA140 to learn more about continuous distributions.)

## Named Distributions

- **Bernoulli(p)**$\rightarrow$ Discrete
**Binary random variable** that takes on **two values** 0 or 1.
![[image-14.png|548x93]]

The Bernoulli distribution is **parameterized** by *p*, the probability that $P(X_i=1)$.

|  x  | $P(X_i=x)$ |
| :-: | :--------: |
|  1  |     p      |
|  0  |   1 - p    |
Suppose as RV $X_i$ follows a Bernoulli distribution with p = 0.5
Then, we can write $X_i$ ~ Bernoulli(0.5) or $X_i$ ~ Bern(0.5).

- **Binomial(n, p)** $\rightarrow$ DIscrete
	- Probability of 0 heads, 1 heads, ... or n heads out of **n** coin flips, where P(Heads) = **p**.
- Categorical($p_1, \dots, p_k$)$\rightarrow$ Discrete
	- Probability that an RV takes on the value of each possible category labeled 1,2,...,**k**
- Uniform(a, b) $\rightarrow$ Continuous
	- All values between **a** and **b** have the same *density*. 
- Normal(mean=$\mu$, variance=$\sigma^2$) $\rightarrow$ Continuous

A **probability distribution** fully defines a RV. With the distribution of a RV, you can:
- Compute **properties** of the RV (e.g., mean, median, variance, ...)
- **Simulate** random *draws* of the RV (e.g., flip 100 coins, what happens?)

> Very often, we don't know the true distribution. We can only observe a sample drawn from it. 

The **true** distribution of X:

|  x  | P(X=x) |
|:---:| ------ |
|  1  | 0.5    |
|  0  | 0.5    |

Suppose I flip 100 coins using Python. 57 are heads. 
The **empirical** distribution of X, for this sample:

|  x  | P(X=x) |
|:---:| ------ |
|  1  | 0.57   |
|  0  | 0.43   |

Let $X_i$ ~ Bernoulli(0.5), coin flipping. 
If I were to flip <u>many</u> coins, I **expect** the average of those 0/1 flips to be **0.5**.
If I flip 100 coins and 57 are heads, the average of this **sample** of 0/1 flips is **0.57**.

0.5 is the **expected value** (i.e., true average) of the RV $X_i$. 
- The expected value is a fixed property of $X_i$ (i.e., a property of the **coin flipping process**)
0.57 is the **sample** average, or **empirical** average, of $X_1,\dots,X_{100}$
- The sample average can change from sample to sample. The expected value does not. 

> [!Note] Expected Value
> The **expected value** (i.e., the expectation) of any discrete RV X:
> $$\mathbb{E}(X) = \sum_{x}{x\cdot P(X=x)}$$
> 
> Example: 
> ![[image-15.png]]

> [!question]
> Q: Suppose *X ~ Bernoulli(p)*. 
> What is E(X)? 
> A: E(X) = $1\cdot p + 0 \cdot (1-p) = p$

### Variance of a Random Variable
Variance is the expected **squared** deviation from the mean of X (i.e., E(X))

![[image-17.png]]

To get back to the natural scale, take the square root to get the **standard deviation** of X:
$$SD(X) = \sqrt{Var(X)}$$

What is the variance of the investment? Recall that E(X) = $100,000. 

|     $x$      | $P(X = x)$ | $x - E(X)$     | $(x - E(X))^2$ |
|:------------:| ---------- | -------------- | -------------- |
| - $1 million | 0.9        | - $1.1 million | $1.21 trillion |
| $10 million  | 0.1        | $9.9 million   | $98 trillion   |
Var(X) = $E[(X-E(X))^2]$ = (1.21 trillion)(0.9) + (98 trillion)(0.1) ≅ 10.89 trillion dollars²
SD(X) ≅ $3.3 million.
Typically, our actual outcome deviates from our average outcome by about $3.3 million. 

Variance is more conveniently calculated with this formula:
$$ Var(X) = E[X^2] - (E[X])^2 $$
What is the variance of the investment? Recall that E(X) = $100,000
![[image-18.png]]

## Sums of Random Variables

### Properties of Expected Values
Let X be an RV denoting the number facing up on the roll of a die. 
What is E(X)? All sides are equally likely.
$$ 1(1/6)+ 2(1/6)+ 3(1/6)+ 4(1/6)+ 5(1/6)+ 6(1/6) = 3.5$$ 
Now, roll two dice.
- What is $E(2X_1)$? 
- What is $E(X_1+X_2)$? 

![[image-19.png]]

So if we roll two dice, 
- $E(2X_1) = 2E(X_1)=2(3.5)=7$ 
- What is $E(X_1+X_2)=E(X_1)+E(X_2)=3.5+3.5=7$ 

How much the variance differ for each roll? 
- $Var(2X_1)$
- $Var(X_1+X_2)$

We can check the distribution of each roll
![[image-20.png]]

Mass is more spread out for $2X_1 \rightarrow$ Larger variance! 

### Properties of Variance
Recall definition of variance: ![[image-21.png|342x71]]

<u>Properties</u>:
1. **Variance is non-linear** 
   Shifting (b) doesn't change variance, scaling (a) does.
![[image-22.png|357x169]]
![[image-23.png]]

2. Variance of sums of RVs is affected by the **independence** of the RVs:
   $Var(X + Y) = Var(X) + Var(Y) + 2Cov(X, Y)$

Example calculation:
![[image-24.png]]


> [!important] New Terminology: Data-Generating Process (DGP)
> Underlying (often unknown) probabilistic mechanism that produces the data we observe.

What if we don't know the structure of the population? (more common) 

> [!Question]
> Q. Randomly sampling with replacement from a warehouse with all **32,000 heights** of Berkeley undergrads on slips of paper (a **population** of heights)
> - $E(X_i)$: What is the expected value ? 
> 	  - We don't know!
> - $Var(X_i)$: How spread out are the $X_i$'s around their average?
> 	- We don't know!

> [!Information] Central Limit Theorem (CLT)
> ![[image-26.png]]
> 
> For i.i.d. samples of $X_i$'s of size n $(X_1, \dots, X_n)$,
> Where n is "big enough",
> **and $X_i$ ~ Unknown, where $E(X_i)=\mu$ and $SD(X_i)=\sigma$**,
> the distribution of $\bar{X_n}$, the *sample mean* of $X_i$'s, 
> is **roughly normal with mean $\mu$ and SD $\sigma/\sqrt{n}$**. 

> [!NOTE] CLT Proof 
> This is the proof why the sample mean of $X_i$'s is roughly normal with mean $\mu$ and SD $\sigma / \sqrt{n}$.
> 
> ![[image-27.png]]

**Properties of the estimator $\bar{X}_n$**
There are (almost) infinite possible samples of size **n** we could have drawn! But, we ovserve just one sample. 

- **Bias** of $\bar{X_n}$: On average, how close are the $\bar{X_n}$'s to $\mu$? 
- **Variance** of $\bar{X_n}$: How spread out are the $\bar{X_n}$'s from each other? 
- **MSE** of $\bar{X_n}$: What's the expected squared difference between $\bar{X_n}$ and $\mu$? 

We have more than mean and variance, so we can expand the definition of DGP.
![[image-29.png|436x273]]

$\hat{\theta}_n$ is an **estimator** of $\theta$ calculated with a sample of $X_i$'s of size _n_. 
For example, $\bar{X_n}$ is an estimator of $\mu$. 
Same as before, the $\hat{\theta}$ differ across sample. 

### What is a good estimator? 
To evaluate the quality of an **estimator** $\hat{\theta}$, we can think about its behavior across parallel sampling universes:

- On average, how close is the estimator to $\theta$, the true parameter? 
$$Bias(\hat{\theta}_n)=E[\hat{\theta}-\theta]=E[\hat{\theta}]-\theta$$
- How variable is the estimator across different random samples?
$$Var(\hat{\theta}_n)=E[(\hat{\theta}-E[\hat{\theta}])^2]$$

- What's the average squared difference between the estimator and $\theta$? 
$$MSE(\hat{\theta}_n)=E[(\hat{\theta}-\theta)^2]$$

**Archery Analogy:**
- Center of the target is **true $\theta$**
- Each arrow corresponds to a separate **parameter estimate** $\hat{\theta}$ obtained from a different random sample. 
![[image-31.png|451x436]]

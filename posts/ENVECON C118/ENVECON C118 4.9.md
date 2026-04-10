>[!QUESTION] Warm-Up
>![[image-218.png]]
>Answer: **3. Relevance ($Cov(Z_i,X_i)\neq 0$)**


# IV and Regression

## Estimating IV
We've shown the IV **estimand** (population quantity):
$$
\beta = \frac{Cov(Z_i, Y_i)}{Cov(Z_i, X_i)}
$$
The IV **estimator** replace population moments with sample means.
With binary $Z$, this simplifies to: 
$$
\hat \beta_{IV} = \frac{\hat Y_{Z=1} - \hat Y_{Z=0}}{\hat X_{Z=1} - \hat X_{Z=0}}
$$


More generally, $\hat \beta_{IV}$ ratio of reduced-form and first-stage OLS coefficients:
$$
\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi}
$$
where:
- $\hat \rho$: OLS slope from $Y_i = \kappa + \rho Z_i + v_i$
- $\hat \pi$: OLS slope from $X_i = \mu + \pi Z_i + u_i$

![[image-219.png]]

> [!EXAMPLE] OHIE (By Regression)
> ![[image-220.png]]
> 
> ![[image-221.png]]
> 
> ![[image-222.png]]

![[image-225.png]]

---
## IV Conditional on Covariates

- Often the instrument is only as-good-as-randmly assigned <u>conditional on observable characteristics</u>
- In OHIE: the probability of winning the lottery depended on *family size*
- Lottery is random conditional on family size, but not unconditionally
- Assume $Cov(Z_i, \epsilon_i | W_i) = 0$ for some observed $W_i$ (e.g., family size)
- By similar arguments as before, we have conditional IV identification:

$$
\beta = \frac{Cov(Z_i, Y_i | W_i)}{Cov(Z_i, X_i|W_i)}
$$


- With covariates $W_i$ can't just take differences in means
- We need to **partial out** the effect of $W_i$ first
- Strategy: run regressions that control for set of controls $W_i$

![[image-223.png]]

---
## IV Standard Errors

Recall that $\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi}$ (a ratio of two estimated quantities)
- both $\hat \rho$ and $\hat \pi$ are OLS estimates,
- each has a known asymptotic distribution
- but $\hat \beta_{IV}$ is a *nonlinear function* of these estimates

We can't just divide the standard errors! 
$SE(\hat \rho) / SE(\hat \pi)$ is **not** the correct SE for $\hat \beta_{IV}$

### The Delta Method

**Goal**: asymptotic distribution of $g(\hat \theta)$ when we know the distribution of $\hat \theta$ 
- Suppose $\sqrt{N}(\hat \theta - \theta) \rightarrow N(0, \Sigma)$
- Let $g(\cdot)$ be a smooth function (e.g., g(a,b) = a/b)
- **Taylor expansion** around the true value:
  $$g(\hat \theta) \approx \nabla g(\theta)^{'}(\hat \theta - \theta)  $$
- This is a **linear approximation**: the deviation of $g(\hat \theta)$ from $g(\theta)$ is approximately a linear function of $\hat \theta - \theta)$

![[image-226.png]]

![[image-227.png]]

![[image-228.png]]

![[image-229.png]]

#### IV Standard Errors Intuition

IV standard errors should be larger than OLS standard errors
- Why? Two sources of uncertainty:
	1. Sampling error in the **reduced form** $(\hat \rho)$
	2. Sampling erorr in the **first stage** $(\hat \pi)$
- OLS only has source 1 (uncertainty about $\hat \beta$)
- IV has *both*, because we also estimate the first stage

When the first stage is **weak** ($\hat \pi$ close to zero), problems multiply:
- standard errors blow up (dividing by something close to zero)
- The asymptotic approximation becomes unreliable
- IV estimates can be *more biased* than OLS

<u>Rule of thumb</u>:
- First-stage F-statistic should be **at least 10**
- Below 10, the instruments are "weak" and inference is unreliable


---
# From One Instrument to Many

So far one instrument $Z_i$ for one endogenous variable $X_i$
In some cases, we may have more than one instrument that we think satisfies as-good-as-random assignemnt and exclusion

![[image-230.png]]
- In practice, researchers combine multiple instruments using **Two-Stage Least Squares** (2SLS)

## Two-Stage Least Squares (2SLS)

> [!NOTE] Example: Multiple Instruments
> 
> - Setting: returns to schooling (*Angrist and Krueger, 1991*)
> - $Y_i$: log earnings, $X_i$: years of schooling
> - Schooling is endogenous (correlation with ability)
> - **Instrument Idea**: quarter of birth interacts with compulsory schooling laws to create exogenous variation in years of schooling
> - Born in Q1 can drop out with *less* schooling than students born in Q4
> - But we actually have **three instruments**: dummies for Q1, Q2, and Q3 (with Q4 as the omitted category)


**The Solution: Two Stage Least Squares (2SLS)**
- The problem: we want to regress $Y_i$ on $X_i$, but $X_i$ is endogenous
- The solution: replace $X_i$ with its predicted value from the instruments 
- Only use the part of $X_i$ that is driven by the instruments
- Discard the part of $X_i$ that is correlated with the error
- Given us variation in $X_i$ that is (by construction) uncorrelated with $\epsilon_i$

![[image-231.png]]

![[image-232.png]]

> [!NOTE] Running IV in R
> The `AER` package provides `ivreg()` for IV/2SLS estimation:
> ```r
> library(AER)
> 
> iv_model <- ivreg(Y ~ X | Z, data = my_data)
> 
> summary(iv_model)
> ```
# RCT 

## Why does an RCT solve the OVB problem? 

Recall our potential outcomes framework:
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

> [!note] With vs. Without Randomization (OVB)
> ![[image-120.png]]
> 
> ![[image-121.png]]


## A subtlety: Compliance

In practice, not everyone follows their **assignment** (treatment/control)
- Example: Oregon Health Insurance Experiment
	- most who won the lottery (treatment) did *not* enroll in Medicaid
	- people who didn't win the lottery found other health insurance
	- what does this mean for the authors' estimates? 

Assignment ≠ Treatment! 

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

**Local Average Treatment Effect (LATE)**
- Effect on **compliers** (those who take treatment if and only if assigned)
- ITT too small because of non-compliers: LATE = ITT / share who comply
- But how to estimate compliance? 

> [! Question] Who Are the Compliers? 
> The LATE tells us the effect on **compliers**... but who are they? 
> 
> We can't identify individual compliers — we only see what each person did under their *actual* assignment.
> 
> - Example: a student was offered tutoring and went
> 	- are they a complier (would skip if not offered)
> 	- or an always-taker (would find tutoring no matter what)?
> 
> We can't tell! The LATE is the effect on a group we *can characterize but can't identify*.


> [! INFO] When Does This All Simplify? If Everyone Complies
> $$ ITT = ATT = LATE = ATE $$
> *When does this happen?* When treatment is applied without choice by the subject
> - Examples:
> 	- Audit studies: Researcher puts name/characteristics on resume employer can't opt out of seeing it
> 	- Ad pricing experiments: platform randomly shows different prices
> 	- Double-blind drug trials: Neither patient nor doctor knows which pill was given can't choose to switch 



---
# Sample Means

![[image-122.png]]

## Sample Means: Binary Variables

![[image-123.png]]
## Comparing Two Groups
![[image-124.png]]
![[image-125.png]]
## Z-Distribution and t-Distribution

Under the CLT, for large n (z-distribution):
$$ 
\frac{\bar{Y} - \mu}{\sigma / \sqrt n} \sim N(0, 1)
$$

But we don't know $\sigma$! When we plug in $\hat\sigma$:
$$
\hat t = \frac{\bar{Y}-\mu_0}{\hat{SE}(\bar Y)} \sim t_{n-1}
$$

- t-distribution has *heavier tails* than the standard normal distribution
- Accounts for extra uncertainty for estimating $\sigma$
- For large $n$ (say $n > 200$) nearly identical, so using $z^* = 1.96$ is fine


# Hypothesis Testing

## 5 Steps

![[image-126.png]]
![[image-127.png]]
![[image-128.png|578x283]]

# Sampling Distributions of $\hat\beta$

So far we've been doing hypothesis tests and CIs for *sample means* and *differences in means*
In practice often want to test hypotheses about **regression coefficients** $\beta_j$

Good news: the same machinery applies!
- already know mean and variance of $\hat\beta$
- just need to know the *sampling distribution* of $\hat\beta$

![[image-129.png]]

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

![[image-130.png]]

## Economic vs. Statistical Significance
- **Statistical Significance** tells us: is there effect different from zero? 
- **Economic Significance** tells us: is the effect *large enough to matter?*

- A study with 1 million observations might find a statistically significant effect of 0.001 percentage points
	- but who cares?
- A study with 50 observations might find a large effect that isn't significant 
	- we just can't tell



## Testing a Single Linear Combination

![[image-131.png]]

![[image-132.png]]


## Testing Multiple Linear Restrictions: The F Test

![[image-133.png]]

### The F-Statistic
![[image-134.png]]
![[image-135.png]]
**The F-Distribution**
![[image-136.png]]

#### F-Test Using $R^2$
![[image-137.png]]

![[image-138.png]]

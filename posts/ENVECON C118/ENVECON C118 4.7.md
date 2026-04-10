# Instrumental Variables

So far we've estimated causal effects when "treatment" is as-good-as randomly assigned conditional on observable characteristics (experiments, natural experiments)
Or when selection bias is constant over time (DiD)

But sometimes these assumptions won't be plausible:
- Unobserverd confounding variables
- No panel data available
- Confounders are time-varying (so parallel trends fails)

**Instrumental Variables (IV)** offer another way
- Basic idea: if $X$ is confounded, find a $Z$ that "exogenously" shocks $X$

![[image-201.png]]

![[image-202.png]]

![[image-203.png]]
![[image-204.png]]

![[image-205.png]]

---
## What is IV Actually Doing?

Thnk of the variation in $X$ as having two parts:
1. A "good" part driven by the instrument $Z$ (exogenous)
2. A "bad" part correlated with $\epsilon$ (endogenous)
- OLS uses all variation in $X$ to estimate $\beta$, including the bad part.
- IV uses *only* the variation in $X$ that comes from $Z$

OLS is more precise (uses all variation) but potentially biased
IV is consistent (uses only exogenous variation) but in practice less precise (larger standard errors)

---
## IV Mechanics

![[image-206.png]]

Two Regressions:
![[image-207.png]]
When $Z_i$ is binary (0 or 1), OLS slopes simplify to differences in means
- $\hat \rho = E[Y_i|Z_i=1] - E[Y_i|Z_i=0]$ (the **ITT** on the outcome)
- $\hat \pi = E[X_i|Z_i=1] - E[X_i|Z_i=0]$ (the **first stage**)

So the IV estimator is: 
$$
\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi} = \frac{E[Y_i|Z_i=1] - E[Y_i|Z_i=0]}{E[X_i|Z_i=1] - E[X_i|Z_i=0]}
$$

Recall the **Intent-to-Treat (ITT)**: the effect of being **assigned** to treatment regardless of take up. The ITT ($\hat \rho$) averages over two groups:
![[image-208.png]]

So $\hat \rho = \hat \pi \times \beta_{treatment}$.
Dividing both sides by $\hat \pi$:
$$
\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi} = \frac{\hat \pi \times \beta_{treatment}}{\hat \pi} = \beta_{treatment}
$$
The IV estimator *scales up* the diluted ITT to recover the effect for people whose behavior actually changed. 
This is the **Local Average Treatment Effect (LATE)**
### Continuous Z: Example
![[image-209.png]]
Only the moderate-district farmer changes behavior when $Z$ shifts. The dry and wet farmers are "non-compliers" for that part of the rainfall distribution. But a different shift in $Z$ might move a different set of farmers. 
With continuous $Z$, every part of the distribution has its own compliers.

IV gives a **weighted avarerage of LATEs** across these groups. More weight on values of $Z$ where treatmnet is most responsive (the "marginal" farmerss)
Same coreprinciples as binary $Z$: IV estimated the effect for people the instrument actually moves.
But "who gets moved" depends on *where in the distribution* of $Z$ you are 


---
## Oregon Health Insurance Experiment Revisited

Previously we estimated "reduced-form" eligibility effects:
![[image-210.png]]
Getting a Medicaid **offer** reduces symptioms by 0.023

Now the "first stage" for actually enrolling in Medicaid:
![[image-211.png]]
Getting a Medicaid **offer** increases enrollment by 0.256
Using offers as an instrument ($Z_i$) for enrollment ($X_i$):
$$
\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi} = \frac{-0.023}{0.256}=-0.09
$$
Medicaid reduces the probability of depression symptoms by 9pp.


### Four Types of People

Each person has two *potential treatment statues*:
- $X_i(1)$: enrollment status if **won** the lottery
- $X_i(0)$: enrollment status if **lost** the lottery

![[image-212.png]]

Only **compliers** have $X_i(1) - X_i(0) = 1$
They are the only group whose treatment the instrument moves

## The Local Average Treatment Effect (LATE)

IV only uses variation from *compliers*, so it estimate the treatment effect for compliers:
$$
\hat \beta_{IV} = E[\beta_i | complier]
$$
This is the **Local Average Treatment Effect (LATE)**


![[image-213.png]]

## Three Assumptions for IV

1. **Relevance**: $Cov(Z_i, X_i) \neq 0$
	- The instrument must actually affect treatment
	- This is *testable* (check the first stage regression)
2. **Exclusion Restriction**: $Cov(Z_i, \epsilon_i) = 0$
	- $Z$ affects $Y$ <u>only through</u> $X$
	- This is *not testable* it's an assumption
3. **Monotonicity**: $X_i(1) \le X_i(0)\quad \forall i$
	- No defiers: the instrument shifts treatment in *one direction*
	- Also *not testable*
	- Ex) OHIE does anyone <u>refuse</u> Medicaid because they won the lottery?
		- Unlikely! Winning can only make you *more* likely to enroll
		- Monotonicity is easy to argue in this setting
	- Ex) Scholarship lottery for schooling: does anyone *drop out* because they won a scholarship?
		- Maybe: a student wins a scholarship to a harder school, struggles, and ends up with <u>less</u> schooling
		- These "defiers" would violate monotonicity

> [!QUESTION] IV: Factories → Air Pollution → Test Scores
> ![[image-214.png]]
> 
> **1. Relevance** ✓ Plausible. More factories → more emissions → higher pollution. Testable via first stage (F-stat).
>
> **2. Exclusion Restriction** ✗ Weak. Factory count affects test scores through other channels: city income → school quality, urbanization, migration of low-income workers. Cov(Z, ε) ≠ 0 is hard to rule out.
>
> **3. Better Instrument: Wind Direction**
> Prevailing winds blowing pollution toward the city from upwind industrial zones.
> - Relevance: upwind pollution raises local PM2.5 ✓
> - Exclusion: meteorological variable, no direct path to test scores ✓
> - Monotonicity: more upwind pollution → more local pollution, no defiers ✓


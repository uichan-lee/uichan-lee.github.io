# Overview

In this class we focused on how we answer **causal economic questions** with data:
- What is the effect of pollution on health?
- What is the effect of education on earnings?
- What is the effect of a minimum-wage increase on employment? 

The focus was **causal**, not just descriptive. 

We formalized the idea of a causal effect with **potential outcomes**
- each unit has a potential outcome under treatment and control, $Y_i(1)$ and $Y_i(0)$
- e.g. $Y_i(1)$ = earnings if you take this class, $Y_i(0)$ = earnings if you don't 

> We only **observe** $Y_i(1)$ for treated units and $Y_i(0)$ for control units


We **want** the causal effect $Y_i(1) - Y_i(0)$ (or averages of this over the population)


## Two Key Challanges
1. **Missing Counterfactuals.** We never observe both potential outcomes for the same unit
	- e.g. we observe earnings for C118 students ($Y_i(1)$) but not their earnings if they hadn't taken the class $Y_i(0)$
2. **Sample, not population.** We typically only observe a sample of the population we care about
	- e.g. we only have data from a survey of a small fraction of recent Berkeley graduates

> [!important] Identification vs Statistical Inference
> We typically tackle these two problems separately:
> - **Identification**: what could we learn about the causal effect if we have the observable data from the full population
> 	- typically start with some assumption about how treatment is assigned
> 	- show that under these assumptions the causal effect is a function of *observable* population means 
> - **Statistical Inference:** what can we learn about those observable population features given our *sample*?
> 	- typically estimate population means by plugging in sample means
> 	- use **regression** to approximate conditional expectation functions
> 	- use **standard errors, hypothesis tests, and confidence intervals** to quantify uncertainty 

---

## Statistical Tools

- **Sample Means** as estimators of population means
	- unbiased, consistent, asymptotically normal under mild conditions
	- build SEs from the sampling distribution
- **OLS Regression** as our workhorse
	- estimates the *best linear approximation* to the conditional expectation function $E[Y|X]$
	- same machineary whether the goal is prediction or causal estimation – what changes is the *identification argument*
	- Picks the slope coefficients that *minimize the sum of squared residuals*
	- <u>Sample mean is just OLS</u> with no covariates: $Y_i = \alpha + \epsilon_i$ gives $\hat \alpha = \bar Y$
	- Everything we did with regression is a generalization of estimating means 
- **Standard Errors:** quantify how much our estimate would jump around across samples
- For a **sample mean:** $SE(\bar X) = \frac{\hat \sigma}{\sqrt{n}}$
	- more data $\Rightarrow$ tighter estimate
- For a **regression coefficient:** classical formula assumes errors are homoskedastic[^1] and independent
	- in practice this is rarely exactly right
- **Heteroskedasticity-robust SEs**: don't require equal error variances
- **Clustered SEs**: required when observations are correlated within groups[^2] (panels, schools, villages, states)
- **Hypothesis testing:** is the estimate reliably different from a benchmark?
	- **Null Hypothesis** $H_0$: usually $\beta = 0$ (no effect)
	- **Test statistic**: $t = \frac{\hat \beta}{SE(\hat \beta)}$
	- Reject $H_0$ if $|t|$ is "big" - typically larger than 1.96 at the 5% level
	- t-tests for single coefficients
	- F-tests for joint hypotheses (e.g. first-stage $F > 10$ in IV)
	- The **p-value** is the probability of seeing $|t|$ this large if $H_0$ were really true
		- $p < 0.05 \Leftrightarrow$ reject at the 5% level
- **Confidence Intervals:** $\hat \beta \pm 1.96 \cdot SE(\hat \beta)$ is a 95% CI for $\beta$ 
	- Interpretation: "If I repeated this study many times and built such an interval every time, 95% of the intervals would cover the true paramter"
	- Tempting WRONG Interpretation: "There's a 95% chance the parameter is in *this* interval"


[^1]: The error is independent of $X$ 
[^2]: i.e., independence assumption fails

---
## 5 Different Types of Identification Arguments

1. **Experiments**: If treated is *randomized*, we can just compare the outcomes for treated vs. control
2. **Conditional Unconfoundedness:** assume treatment is like an experiment <u>conditional on observable characteristics</u> - compare treated/control units with the same $X_i$
3. **Difference-in-differences:** allow selection into treatment, but assume selection bias is *constant over time* - compare changes for treated vs. control 
4. **Instrumental Variables:** find an as-good-as-randomly assigned $Z_i$ that affects $Y_i$ *only through* $D_i$ - compare populations with different $Z$ 
5. **Regression Discontinuity:** confounders evolve *continuously* at the cutoff - compare units just below and just above $c$

### 1. Experiments

Example: *Miguel & Kremer (2004)* randomized deworming pills across schools in western Kenya

![[Pasted image 20260504234659.png]]

- **Identification:** with random assignment, $Y_i(1), Y_i(0) \perp D_i$ ("treatment assignment is independent of potential outcomes")
ex) $Y_i(1)$: the potential attendance rate of the school that got the deworming treatment
$$\tau_{ATE} = E[Y_i|D_i=1] - E[Y_i|D_i=0] $$

- **Estimation:** plug in *sample means* for population means:
$$ \hat \tau = \bar Y_{\tau} - \bar Y_{C} = 0.74 - 0.66 = 0.08 $$
- **Estimation 2:** OLS gives same number $Y_i = \alpha + \tau D_i + \epsilon_i$ 

> [!IMPORTANT] What $\hat \tau$ identifies
> $$ \hat \tau \xrightarrow{p} \tau_{ATE} = E[Y_i(1) - Y_i(0)] $$
> - **Interpretation:** ATE — the average treatment effect for the **entire population**.
> - **Why ATE?** Random assignment makes treated and control groups exchangeable, so the population mean difference equals the causal effect.
> ---
> e.g., "On average, deworming raised school attendance by 8 percentage points across the population of schools in western Kenya."
### 2. Conditional Unconfoundedness

- **Example:** Effect of pollution exposure on respiratory hospitalizations - high and low pollution counties differ on income, age structure, industry mix
	- Conditional on those, residual pollution variation is *plausibly* as-good-as-random
- **Identification:** $Y_i(1), Y_i(0) \perp D_i | X_i$ ("Conditional on X, treatment is as-good-as-random")
$$CATE(x) = E[Y_i|D_i=1, X_i=x] - E[Y_i|D_i=0, X_i=x]$$
- The ATE averages $CATE(x)$ over the distribution of $X_i$ 

![[Pasted image 20260505001503.png]]
Pooled OLS (black) understates the pollution effect 
Within-income OLS (colored) recovers a steeper, more plausible slope 


- Recall: OLS estimates the **best linear approximation** to the conditional expectation function:
$$ Y_i = \alpha + \tau D_i + X_i^{'} \beta + \epsilon_i $$
- Under *conditional unconfoundedness*, $\hat \tau$ has a causal interpretation: it's a weighted average of treatment effects across cells of $X$ 
- <u>Without it</u>, $\hat \tau$ is still the best linear approximation - but it's no longer the ATE

> [!NOTE] Conditional Unconfoundedness - The Big Caveat
> - The assumption is **strong**: every confounder must be observed *and* included in $X_i$
> - What happens if we omit a confounder $X_i$? The classic *two-equations OVB story*
> 	- **Long regression** (the truth): $Y_i = \beta_0 + \tau D_i + \gamma X_i + \epsilon_i$
> 	- **Short regression** (drops $X_i$)

> [!success] OVB Formula and Direction of Bias
> Let $\delta$ be the slope from regression the omitted $X_i$ on $D_i$ (an "auxillary regression"):
> $$ X_i = \delta_0 + \delta D_i + v_i $$
> The **OVB formula** says the short regression gives:
> $$ \tilde \tau = \tau + \underbrace{\gamma \cdot \delta}_{\text{OVB}} $$
> - $\gamma$: how the omitted variables affects $Y$
> - $\delta$: how the omitted variables correlates with $D$ 
> ---
> For Example:
> - $D_i$ = pollution exposure, $Y_i$ = bad health outcome, omitted $X_i$ = income
> - $\gamma$: income $\rightarrow$ better health $\Rightarrow \gamma < 0$ (more income, *less* bad health)
> - $\delta$: higher income $\rightarrow$ less pollution $\Rightarrow \delta < 0$
> 	- **OVB** $= \gamma \cdot \delta = (-)(-) = (+) \rightarrow$ **upward** bias
> - The short regression *overstates* how harmful pollution looks
> - That's exactly the *black dashed pooled OLS line* being too flat above

> [!IMPORTANT] What $\hat \tau$ identifies
> $$ \hat \tau \xrightarrow{p} \tau_{ATE} = E_X[CATE(X_i)], \quad CATE(x) = E[Y_i(1) - Y_i(0) | X_i = x] $$
> - **Interpretation:** ATE — averaged across the population, computed by first estimating the effect within each $X$-cell ($CATE$), then averaging over the distribution of $X$.
> - **Why ATE?** Within each $X$-cell, treatment is as-good-as-random, so the within-cell mean difference identifies $CATE(x)$. Averaging gives the population ATE.
> - **Caveat:** Only valid if **all** confounders are in $X$.
> ---
> e.g., "The average effect of pollution on hospitalization, comparing similar counties (same income, age structure, industry) and averaging across the population's distribution of these covariates."
### 3-1. Difference-in-Differences I

- **Example:** *Currie & Walker (2011)* - E-ZPass cut idling at toll plazas, dropping local air pollution
- **Identification:** the **parallel trends** assumption:
$$ \tau_{ATT} = 
\underbrace{\mu_{\text{post}}^{\text{near}}-\mu_{\text{pre}}^{\text{near}}}_{\text{change for treated}} - \underbrace{\mu_{\text{post}}^{\text{far}}-\mu_{\text{pre}}^{\text{far}}}_{\text{change for control}} $$
	- Identifies the **ATT** - the effect on the *treated* (near-plaza births, post-period)

<br>
- **Estimation 1**: use sample means:
$$\hat \tau_{DiD} = 
(\bar Y_{\text{post}}^{\text{treated}} - 
\bar Y_{\text{pre}}^{\text{treated}}) - 
(\bar Y_{\text{post}}^{\text{control}} - 
\bar Y_{\text{pre}}^{\text{control}}) $$

- **Estimation 2**: OLS with **two-way fixed effects** gives the same nunmber - plus standard errors:
$$ Y_{it} = \alpha_i + \lambda_t + \tau D_{it} + \epsilon_{it} $$
	- $\alpha_i$: unit fixed effects (absorb time-invariant differences across moms / locations)
	- $\lambda_t$: time fixed effects (absorb common shocks like national air-quality trends)
	- $D_{it} = \mathbf{1}[near \times post]$ - the treatment indicator
	- $\tau$: the DiD estimand - the ATT

> [!IMPORTANT] What $\hat \tau_{DiD}$ identifies
> $$ \hat \tau_{DiD} \xrightarrow{p} \tau_{ATT} = E[Y_i(1) - Y_i(0) | D_i = 1, t = \text{post}] $$
> - **Interpretation:** ATT — the average treatment effect for **treated units only**, in the post-period.
> - **Why ATT, not ATE?** Parallel trends only fills in $Y(0)$ for the treated. We have no way to fill in $Y(1)$ for the control group.
> ---
> e.g., "The reduction in air pollution from E-ZPass for mothers who actually lived near a toll plaza — says nothing about what would have happened to far-from-plaza mothers if they had been treated."
### 3-2. Difference-in-Differences II: Event Studies

When treatment is **staggered** (different units treated at different times), the simple 2 X 2 doesn't quite work

- **Event-study specification**:
$$Y_{it} = \alpha_i + \lambda_t + \sum_{k\neq-1}\beta_k \mathbf{1}[t-T_i=k] + \epsilon_{it}$$
	- $\beta_k$: effect $k$ periods after (or before) the treatment
	- Omit $k = -1$ as the reference

![[Pasted image 20260505004026.png]]
> [!IMPORTANT] What $\hat \beta_k$ identifies
> $$ \hat \beta_k \xrightarrow{p} E[Y_{it}(1) - Y_{it}(0) | D_i = 1, t - T_i = k] $$
> - **Interpretation:** Dynamic ATT — the average treatment effect on the treated, **$k$ periods after treatment**, relative to $k = -1$ (the omitted reference period).
> - **Two roles:**
> 	- $k < -1$: pre-trend / placebo check — should be ≈ 0 if parallel trends holds
> 	- $k \geq 0$: traces out how the treatment effect evolves over time
> ---
> e.g., "$\hat \beta_2$ = average effect on treated units 2 periods after treatment, relative to 1 period before treatment."

### 4. Instrumental Variables 

- **Example:** *Deryugina et al (2019)* - wind direction shifts pollution exposure randomly across days
- **Three key assumptions** (IMPORTANT):
	- **Relevance:** $Cov(Z_i, D_i) \neq 0$ - instrument moves treatment
	- **Exogeneity:** $Cov(Z_i, \epsilon_i) = 0$ - this single condition delivers *two* things:
		- *Independence*: $Z_i$ is as-good-as-randomly assigned
		- *Exclusion*: $Z_i$ affects $Y_i$ <u>only through $D_i$</u>
	- **Monotonicity:** no defiers (for *LATE*)

- **Estimation 1**: for binary instrument plug sample analogs into the formula:
$$\hat \tau_{IV} = \frac{\bar{Y}_{Z=1}-\bar{Y}_{Z=0}}{\bar{D}_{Z=1} - \bar{D}_{Z=0}}$$
- **Estimation 2**: *two-stage least squares (2SLS)* - same answer, allows multiple instruments and controls
	- Regress $D_i$ on $Z_i$ (and controls) $\rightarrow$ get $\hat D_i$
	- Regress $Y_i$ on $\hat D_i$ (and controls)

> [!CAUTION]  IV - What to Watch For
> - **Weak Instruments**: if the first-stage F is small (< 10), the IV estimate is biased and SEs are unreliable
> - **Exclusion Violations**: the instrument might affect $Y$ through some other channel - this is *untestable* and where most of the debate happens
> - **LATE $\neq$ ATE**: even with a valid instrument, you only learn about compliers - and they may not be the population you care about 

> [!IMPORTANT] What $\hat \tau_{IV}$ identifies
> $$ \hat \tau_{IV} \xrightarrow{p} \tau_{LATE} = E[Y_i(1) - Y_i(0) | \text{complier}] $$
> - **Interpretation:** LATE — the average treatment effect for **compliers only**: units whose treatment status moves when the instrument $Z$ moves.
> - **Why LATE, not ATE?** The instrument only moves treatment for some units. Always-takers and never-takers contribute no information about their treatment effect.
> ---
> e.g., "The effect of pollution on mortality only for people whose pollution exposure is shifted by wind direction — not for people who are always or never exposed regardless of wind."
### 5. Regression Discontinuity

- **Example:** *Asher & Novosad (2020)* - population-threshold rural roads program in India
![[Pasted image 20260505010035.png]]
- **Identification:** potential outcomes are *continuous* at the cutoff
$$ E[Y_i(d) | R_i = r] \text{ continuous at } r = c $$
	- Any jump in observed $Y$ at $c$ must therefore be the **treatment effect**
	- Identifies the effect at $R_i = c$ - the narrowest estimand we've seen, but very credibly identified
- **Estimation:** estimate the CEF at the cutoff using the **stacked regression**:
$$ Y_i = \gamma_0 + \tau D_i + \delta D_i \cdot R_i + \epsilon_i $$
- $\hat \tau$ = the jump at the cutoff = the RD estimand
- In practice, fit it with *local linear regression* around $c$
- **Sharp RD:** $D_i = \mathbf{1}[R_i \ge c]$
- **Fuzzy RD**: $D_i$ is partially determined by the cutoff $\rightarrow$ IV with $Z_i = \mathbf{1}[R_i \ge c]$

> [!IMPORTANT] What $\hat \tau$ identifies (Sharp RD)
> $$ \hat \tau \xrightarrow{p} E[Y_i(1) - Y_i(0) | R_i = c] $$
> - **Interpretation:** LATE at the cutoff — the average treatment effect for units **exactly at $R_i = c$**.
> - **Trade-off:** Most credibly identified, but the narrowest estimand. Cannot extrapolate to units far from the cutoff.
> ---
> e.g., "The effect of the rural roads program on villages with population right at the threshold — says nothing about much larger or smaller villages."

> [!IMPORTANT] What $\hat \tau$ identifies (Fuzzy RD)
> $$ \hat \tau \xrightarrow{p} E[Y_i(1) - Y_i(0) | R_i = c, \text{complier}] $$
> - **Interpretation:** LATE at the cutoff, **for compliers only** — units near $c$ whose treatment status flips because they cross the threshold.
> - **Two restrictions stacked:**
> 	1. Near the cutoff (RD)
> 	2. Compliers only (IV)
> - **vs Sharp RD:** In Sharp RD, crossing the cutoff *deterministically* assigns treatment, so everyone at $c$ is a complier. In Fuzzy RD, only some flip — so we estimate the effect for that subset.
> ---
> e.g., "The effect of a scholarship on students near the GPA cutoff who actually take up the scholarship because they cleared it — not on students who would have always or never taken it up."
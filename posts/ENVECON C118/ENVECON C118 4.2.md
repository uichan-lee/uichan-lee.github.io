> [!NOTE] **"As good as random" assumption in Barwick et al. (2024)**
> 
> The key parameter β captures how much the pollution→outcome gradient changes after information disclosure. Since treatment is staggered across cities, estimating β requires comparing cities across different waves.
> 
> If there is any systematic pattern in pollution levels at the time of treatment (e.g., more polluted cities get treated first), then β picks up two things at once:
> 
> - The pure information disclosure effect ✅
> - The fact that higher-pollution cities have structurally higher pollution-outcome sensitivity ❌
> 
> These two are inseparable within a single β, making causal interpretation invalid. This is why pollution exposure across waves must be **"as good as random"** — not perfect randomization, but no systematic pattern between wave assignment and pollution level at the time of treatment, conditional on observables.


### The Parallel Trends Assumption (Revisited)

With 2 periods:
$$
E[Y_t(0)|D=1] - E[Y_{t-1}(0)|D=1] = E[Y_t(0)|D=0] - E[Y_t(0)|D=0]
$$
- the *change in potential untreated outcomes* is the same for treated and control units
- Treated units can have higher or lower levels, that's fine
- What matters is that they would have **changed by the same amount** in the absence of treatment
- Notice: the left side involves $Y_t(0)$ for $D = 1$
	- This is the treated group's outcome *if they had not been treated*
	- We never observe this! That's why it's an assumption.
- With $T$ periods: this must hold for <u>every pair of consecutive periods</u> in the pre-treatment window
- In the absence of treatment, treated and control units would have followed the *same time path*
$$
E[Y_t(0)-Y_{t-1}(0)|D=1] = E[Y_t(0)-Y_{t-1}(0)|D=0]\ \ \forall t
$$


## Tetsing Parallel Pre-Trends

Two approaches:
1. Visual: Plot group means over time. Do they track each other before treatment? 
2. Statistical: Estimate an event study and check whether pre-treatment coefficients are near zero (F-test)

![[image-194.png]]

![[image-195.png]]

- Pre-treatment coefficients are *trending upwards*
- The treatment group was already increasing relative to the control group before treatmen
- The post-treatment "effect" may just be a **continuation** of this pre-existing trend, not a causal effect of treatment 

> [!NOTE] Limitations of Pre-Trends Tests
> Flat pre-trends don't prove parallel trends holds
> - maybe the violation only starts at treatment
> - test how *low power* with few pre-treatment periods or noisy data, so many fail to detect violation
> 
> Roth (2022) shows that conditioning on passing a pre-trends test can actually *bias* your estimates.
> **Bottom Line**: Pre-trends are helpful but not dispositive
> Best defense is a compelling research design



Change in Avoidance - DiD:

![[image-196.png]]
We can verify that Chinese people became aware of the air pollution, respond by changing their behavior accordingly. 
- Deferrable spendings: statistically *significant* reduction in spending (z-score > 3)
- Nondeferrable spendings: statistically *insignificant* reduction in spending (z-score < 1.645)

There are some behaviors that people can change (entertainment, dining, etc.) while there are that people can't (insurance, housing, mobile fee, etc.)

### Policy Evaluation

Change in Mortality - Event Study
![[image-197.png]]

- Costs of pollution monitoring approximately <u>$164 million</u>
- Estimate benefits through the mortality channel:
	- reduced mortality-pollution elasticity by <u>1.3 - 2.3 percentage points</u>
	- concentrated among 60+ driven by cardiovascular respiratory deaths
	- *No effect* on injury-related mortality (placebo check; good sign)
- Conservative estimate: health benefits outweigh costs by roughly **10:1**
- Counts <u>only mortality</u>, not avoidance behavior, defensive spending, or housing market effects


---
## Standard Errors in Panel Regressions


### Standard Errors: Cross-Section vs Panel

We know how to get standard errors for OLS estimates of 
$$
Y_i = X_i^{'}\beta +e_i
$$

When $(Y_i, X_i)$ are drawn iid, the usual OLS variance formula works fine.

Now we have panel data:
$$
Y_{it} = X_{it}^{'}\beta + e_{it}
$$

Is it reasonable to assume $(Y_{it}, X_{it})$ are iid across $i$ and $t$? 

**No!** Two problems:
1. We expect $Y_{i1}$ to be correlated with $Y_{i2}$
	- People with high earnings in 2010 tend to have high earnings in 2011
	- This is **serial autocorrelation**
2. If treatment is assigned at the state level, all people in a given state have the same value of $D_{it}$
	- So $X_{it}$ is mechanically correlated within states
	- This makes the problem even worse


Getting $\hat \beta$ right is only half the battle
We also need to know how *precise* the estimate is
- Standard Errors ➡️ Confidence Intervals ➡️ Hypothesis Tests
### The Problem: Serial Correlation

- Panel data: same unit observed over time
	- outcomes for the same city/state/firm in adjacent years are **correlated**
	- city with high pollution in 2005 probably has high pollution in 2006 too
- OLS treat each city-year as an independent observation
- But 10 years of data from one city are <u>not</u> 10 independent data points
- Result: OLS standard errors are **too small**, confidence intervals are too narrow, and we reject the null hypothesis too often

### The Solution: Clustered Standard Errors

**Clustered Standard Errors** extend the OLS variance forumla to allow $(Y_{it}, X_{it})$ to be *correlated across observations* in the same "cluster".

- The assumption: each **cluster** is sampled independently
- For example, clustering at the individual level ($i$): we allow $Y_{i1}$ and $Y_{i2}$ to be dependent
- But assume $(Y_{i1}, Y_{i2})$ is independent of $(Y_{j1}, Y_{j2})$ for $j \neq i$
- We don't need to model the exact correlation structure
- Clustering just says "within a cluster, anything goes"

#### Where to Cluster?

In *panel analyses*, you should <u>at minimum</u> cluster at the individual level to allow for autocorrelation.
If treatment is assigned at a more aggregate level, cluster at the level where *treatment is assigned*.
- Treatment varies by city ➡️ cluster by city
- Treatmnet varies by state ➡️ cluster by state
- In *Currie & Walker*: treatment varies by toll plaza ➡️ cluster by toll plaza

#### How Clustering Works (Intuition)

- OLS standard errors: effectively count each observation as one independent data point. 
- Cluster SEs: recognize that observations within a cluster provide **less independent information** than observations across clusters
- Analogy: Surveying 100 people from 50 families (2 per family) gives you less information than surveying 100 unrelated people
	- Family members' responses are correlated
- **Effective sample size** with clustering is closer to the **number of clusters** than the number of observations

#### Implementing in R

```r
library(fixest)

model <- feols(
	outcome ~ treat:post | city + year,
	data = panel_data,
	cluster = ~city    # cluster at the unit level
)

summary(model)

```

Comapring Standard Errors:
```r
library(fixest)

model <- feols(
	outcome ~ treat:post | city + year,
	data = panel_data)
	
m_ols <- summary(model, vcov = "iid")
m_robust <- summary(model, vcov = "hetero")
m_cluster <- summary(model, vcov = ~city)

etable(m_ols, m_robust, m_cluster,
    headers = c("OLS", "Robust", "Clustered"))
```

![[image-198.png]]

> [!QUESTION] How Many Clusters Do You Need?
> Clustered SEs rely on **asymptotic theory**.
> They work well when the number of clusters is large.
> With *few clusters* clustered SEs can be unreliable.
> - Currie & Walker: 98 toll plazas ➡️ probably fine
> - A study comparing 5 states? Clustering by state is *risky*
> - SEs may still be too small
> - Still very much an active area of research

---

> [!QUESTION]
> ![[image-200.png]]
> 1. State level. The treatment (increase in state minimum level wage) is applied at the state level. 
> 2. As we clustered the standard errors, it will become larger. So the t-statistic will become smaller.


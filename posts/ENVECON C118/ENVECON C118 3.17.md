# Difference-in-Differences

### Warm-Up Questions

> [!QUIZ] Warm-Up
> **Q1**
> ![[image-162.png]]
> 
> Q. What is the DiD estimate of the regulation's effect? 
> A. (60 - 85) - (35 - 40) = (-25) - (-5) = <u>-20</u>
> 
> City-wide, something is happening in asthma rate went down (trend) without intervention of the regulation. 
>
>---
>**Q2** 
>![[image-163.png]]
>A. <u>False</u>
>
>The parallel **trend**s assumption is about trend, not the initial *level* of different groups. Two groups can have different initial values, but we are assuming that the background trend is the same across the groups, such that the control group have the same trend with the counterfactual of the treatment group if the treatment group didn't receive the treatment. 
>
>Ex. In Snow's data, S&V-only districts had 135 deaths per 10,000 and jointly supplied districts had 130-different levels, but DiD is still valid. 
>
>---
>**Q3**
>![[image-164.png]]
>A. <u>2</u>
>The apartment complex brings new residents who might be more likely to bike *independently* of the bike lane. This **confounding event** means the treatment street would have seen more cycling even without the bike lane – violating *parallel trends*.


## Recap: DiD Estimator & Parallel Trends

### The DiD Estimator

$$
\hat\delta_{DiD} = (\bar Y_{T, after}-\bar Y_{T, before}) - (\bar Y_{C, after} - \bar Y_(C, before))
$$
- First difference (within treatment group): how did the treatment group's outcome change over time?
- Second difference (within control group): how did the control group's outcome change over the same period?
- **Difference-in-differences**: the treatment group's change *minus* the control group's change

A *simple before/after* comaprison for the treatment group conflates the treatment effect with time trends.
- maybe mortality was falling everywhere due to improvements in sanitation

A *simple treatment/control* comparison at one point in time conflates the treatment effect with pre-existing differences
- maybe Lambeth neighborhoods were always healthier

**DiD** uses *both* differences to isolate the treatment effect! 

![[image-158.png]]


### The Key Assumption: Parallel Trends

DiD requires one critical assumption: 
> In the absence of treatment, the treatment and control groups would have followed the same trend.

This is called the **parallel trands assumption**. In Snow's case: if Lambeth had *not* moved its water intake, its cholera mortality would have changed by the same amount as S&V's. 

This is *not* the same as saying the two groups have the same levels; they can start at different places. It says they would have *changed* by the same amount. 

#### Is Parallel Trends Testable? 
- We can *never directly test* the parallel trends assumption since it's about what <u>would have happened</u> (a counterfactual)
- But we can look for *supporting evidence*:
	- check whether pre-treatment trends are similar
	- if the groups were trending together before the intervention, it's more plausible they would have continued to do so. 

---

## Formalizing DiD

**Setup**
- Assume there are *2 periods*, $t = 1, 2$
- Treated units ($D_i=1$) are treated in period 2; control units ($D_i=0$) are *never* treated
- Each units hs two *potential outcomes*:
	- $Y_{i,t}(1)$: outcome if treated
	- $Y_{i,t}(0)$: outcome if not treated
- The *observed outcome* is:
$$
Y_{i, t} = D_i \cdot Y_{i, t}(1) + (1-D_i) \cdot Y_{i, t}(0)
$$


**No Anticipation Assumpton** 
Treatment happens in *period 2* $\rightarrow$ shouldn't affect outcome in *period 1*.

Knowing you **will be** treated in the future doesn't change your potential outcome today. We as econometricians can observe which units get treatment, but units can't *anticipate* and change their behavior before treatment actually arrives. 

- **Snow's context**: Need to assume healthier people aren't moving to different neighborhood in anticipation that Lambeth will move it's water itnake. 


**Parallel Trends in Potential Outcomes**
- How do we write the parallel trends assumption in this framework? 
- **Parallel trends assumption**:
$$
\underbrace{E[Y_{i, 2}(0) - Y_{i, 1}(0)|D_i=1]}_{\text{change in Y(0) for treated}} = \underbrace{E[Y_{i, 2}(0) - Y_{i, 1}(0)|D_i=0]}_{\text{change in Y(0) for control}}
$$
- In words: the *average change in untreated potential outcomes* is the same for both groups

### Parallel Trends in Potential Outcomes

Equivalently, we can rearrange this to say:
$$
\underbrace{E[Y_{i,2}(0)|D_i=1] - E[Y_{i,2}(0)|D_i=0]}_{\text{selection bias in period 2}} = 
\underbrace{E[Y_{i,1}(0)|D_i=1] - E[Y_{i,1}(0)|D_i=0]}_{\text{selection bias in period 1}}
$$

> [!NOTE] Selection Bias
> Recall that in any period $t$:
> $$
> \bar Y_{treated} - \bar Y_{control} = \text{caual effect} + \underbrace{E[Y_{i, t}(0)|D_i=1] - E[Y_{i, t}(0)|D_i=0]}_{\text{selection bias}}
> $$
> - Selection bias is the difference in *untreated* potential outcomes between groups
> - Captures all the reasons the groups would differ even *without* treatment (e.g., S&V neighborhoods might be poorer, more crowded, etc.)

![[image-165.png]]

### Getting to the ATT 
We want the **Average Treatment Effect on the Treated** (ATT) in period 2:
$$
ATT = E[Y_{i,2}(1) - Y_{i, 2}(0)|D_i=1]
$$

- The problem: we observe $Y_{i, 2}(1)$ for the treated, but we *never observe* $Y_{i, 2}(0)$ what would have happened without treatment
- Start with what we can compute from the data = the difference in observed changes

![[image-167.png]]

(using *no anticipation*: $Y_{i, 1}(1) = Y_{i, 1}(0)$ for everyone in period 1)

![[image-168.png]]

![[image-169.png]]

#### Why ATT and Not ATE?

For the *control* group, we observe $Y_{i, 2}(0)$ but we *never observe* $E[Y_{i,2}(1)|D_i=0]$ – what would have happened to them *if they had been treated*.

Parallel trends is a statement about $Y(0)$, how untreated outcomes evolve. It tells us nothing about $Y(1)$ for the control group. 

**When does ATT $\neq$ ATE?**: When the treatment and control groups are systematically different in ways that affect the treatment response. 
- e.g., if a job training program targets the least-skilled workers, the effect on them (ATT) may differ from effect on average workers (ATE) 


> [! NOTE] John Snow's Assumptions
> ![[image-170.png]]
---

---
## DiD as a Regression

The DiD estimator can be written as an OLS regression:

$$
Y_{it} = \alpha + \beta \cdot \text{Treated}_i + \gamma \cdot \text{Post}_t + \delta \cdot (\text{Treated}_i \times \text{Post}_t) + \epsilon_{it}
$$

**Variable Definitions:**
- $\text{Treated}_i = 1$ if unit $i$ is in the treatment group, $0$ otherwise *(time-invariant)*
- $\text{Post}_t = 1$ if post-treatment period, $0$ if pre-treatment period *(unit-invariant)*
- $\text{Treated}_i \times \text{Post}_t$: the DiD interaction term

**What each coefficient captures:**

| | Pre ($\text{Post}=0$) | Post ($\text{Post}=1$) | Change |
|---|---|---|---|
| **Control** ($\text{Treated}=0$) | $\alpha$ | $\alpha + \gamma$ | $\gamma$ |
| **Treated** ($\text{Treated}=1$) | $\alpha + \beta$ | $\alpha + \beta + \gamma + \delta$ | $\gamma + \delta$ |

- $\alpha$: baseline mean of control group in pre-period
- $\beta$: pre-existing level difference between groups *(absorbs time-invariant selection bias)*
- $\gamma$: common time trend — how much control group changed on its own
- $\delta$: **the DiD estimator** = ATT

$$\hat\delta = \underbrace{[(\alpha+\beta+\gamma+\delta) - (\alpha+\beta)]}_{\text{treated group's change}} - \underbrace{[(\alpha + \gamma) - \alpha]}_{\text{control group's change}}$$

OLS estimates $\delta$ by finding the coefficient on the interaction term — this is numerically identical to the manual 2x2 DiD calculation.

**Why regression?**
- Allows adding **control variables** $X_i$ to improve precision and partially address parallel trends concerns
- Generalizes naturally to **multiple periods** and **multiple treatment groups**
- Gives us standard errors for hypothesis testing directly

![[image-171.png]]


## Example

> [!NOTE]
> ## Setup
> A state raises its gas tax by $0.20/gallon on Jan 1, 2025. A neighboring state does not change its tax. Monthly gasoline consumption (gallons per capita) data available for both states for 2024 and 2025.

---

> [!TIP]
> ## 1. DiD Regression Equation
>
> $$Y_{it} = \alpha + \beta \cdot \text{Treated}_i + \gamma \cdot \text{Post}_t + \delta \cdot (\text{Treated}_i \times \text{Post}_t) + \epsilon_{it}$$
>
> **Variable Definitions:**
> - $Y_{it}$: per capita monthly gasoline consumption (gallons) in state $i$ at time $t$
> - $\text{Treated}_i = 1$ if tax-raising state, $0$ if neighboring state *(time-invariant)*
> - $\text{Post}_t = 1$ if 2025, $0$ if 2024 *(individual-invariant)*
> - $\text{Treated}_i \times \text{Post}_t$: DiD interaction term
> - $\delta$: treatment effect estimator (ATT)

---

> [!TIP]
> ## 2. Coefficient Interpretation
>
> | | Pre (2024) | Post (2025) |
> |---|---|---|
> | **Control** | $\alpha$ | $\alpha + \gamma$ |
> | **Treated** | $\alpha + \beta$ | $\alpha + \beta + \gamma + \delta$ |
>
> - $\alpha$: baseline consumption of control group in pre-period
> - $\beta$: pre-period level difference between treated and control *(absorbs selection bias)*
> - $\gamma$: common time trend (control group's change from 2024 → 2025)
> - $\delta$: **DiD estimator** — additional change in treated group post-intervention = ATT
>
> $$\delta = \underbrace{[(\alpha+\beta+\gamma+\delta)-(\alpha+\beta)]}_{\text{treated group's change}} - \underbrace{[(\alpha+\gamma)-\alpha]}_{\text{control group's change}}$$

---

> [!TIP]
> ## 3. Hypothesis Test ($\hat{\delta} = -2.3$, $SE = 0.8$)
>
> **Hypotheses** (one-sided — testing whether tax *reduced* consumption):
>
> $$H_0: \delta = 0 \qquad H_1: \delta < 0$$
>
> **t-statistic:**
>
> $$t = \frac{\hat{\delta}}{SE} = \frac{-2.3}{0.8} = -2.875$$
>
> **Rejection region at 5%:** $t < -1.645$
>
> Since $-2.875 < -1.645$, **reject $H_0$**.
>
> → The gas tax significantly reduced consumption. Estimated effect: **−2.3 gallons/capita/month** relative to control.

---

> [!WARNING]
> ## 4. Parallel Trends Assumption
>
> **The assumption:** *"Absent the tax increase, the two neighboring states would have had parallel trends in gasoline consumption in 2025."*
>
> **Plausible because:**
> - The two states are neighboring → similar economic structure, income levels, seasonal patterns
> - Both subject to the same common shocks (oil price fluctuations, macroeconomic conditions)
>
> **Threats:**
> - Differential industry composition (e.g., one state has far more trucking) → different elasticities
> - Simultaneous confounding policy in treated state (e.g., transit subsidies introduced at the same time)
> - Pre-existing diverging trends before 2025
>
> **Best practice:** Verify parallel trends visually using pre-period data before 2024.
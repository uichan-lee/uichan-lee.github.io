> [!NOTE] Instrumental Variable (IV) Recap
> A valid instrument variable $Z$ must satisfy all three assumptions: 
> 1. **Relevance**: $\text{Cov}(Z_i, X_i) \neq 0$. The instrument actually shifts $X$. Testable via the first stage. (Check the first stage coefficient $\neq 0$)
> 2. **Exclusion**: $Z$ affects $Y$ only through $X$, with no back-door channels, <u>Not Testable</u>; requires an argument. 
> 3. **Monotonicity**: $Z$ pushes everyone in the same direction (or leaves them unchanged)*no defiers*. Needed to interpret the estimand as a **LATE**. <u>Also Not Testable</u>.

> [!Question] Warm-up
> **Q1.** A researcher uses a randomized lottery offer fo Medicaid as an instrument for actual Medicaid enrollment. The first-stage regression of enrollment on the lottery offer yields a coefficient of $\hat \pi = 0.25$ with a first-stage F-statistic of $F = 85$. The reduced-form regression of an outcome $Y$ on the lottery offer yields a coefficient of $-0.10$. What is the Wald / 2SLS estimate of the effect of enrollment of $Y$? 
> 1. -0.025
> 2. -0.10
> 3. -0.25
> 4. -0.40
> 5. Not enough information 
> ---
> Answer: **4. -0.40**
> The F-stat is used to check the effect (*relevance*) of the instrument variable on the treatment. Traditionally, $F > 10$ is the rule of thumb for checking relevance. It's well above 10, so this is a strong instrument. 
> We compute the IV estimator by taking the ratio of the **reduced form** to the **first stage**: $\hat \beta_{IV} = \frac{\hat \rho}{\hat \pi}=\frac{-0.10}{0.25}=-0.40$
> 
> "The lotery shifts $Y$ by 0.10. It shifts enrollment by 0.25. So the implied effect of enrollment on $Y$ is $-0.10/0.25 = -0.40$"
> 
> ---
> **Q2.** The 2SLS estimator using a valid instrument $Z$ recovers:
> 1. The average treatment effect (ATE) for the whole population
> 2. The average treatment effect on the treated (ATT) 
> 3. The local average treatment effect (LATE) for **compliers**
> 4. The intent-to-treat effect (ITT) 
> 5. The effect of $Z$ on $Y$ 
> ---
> Answer: **3. LATE for compliers**
> Under monotonicity and exclusion, IV identifies the LATE, the average treatment effect for *compliers*. 
> - **Compliers** are units who take up treatment <u>because</u> of the instrument (and would not otherwise).
> - We learn nothign about *always-takers* (take up regardless) or *never-takers* (refuse regardless)
> - This is why two different valid instruments can produce different 2SLS estimates: they shift different compliers. 

Let's recap what problem is IV trying to solve. 

In the usual regression setup: $Y_i = \alpha + \beta X_i + \epsilon_i$
- OLS is **biased** whenver $\text{Cov}(X_i, \epsilon_i) \neq 0$.
- This happens with:
	- Omitted variables correlated with both $X$ and $Y$
	- Reverse causality ($Y$ affects $X$)
	- Measurement error in $X$

**IV Uses only Z-driven variation**

![[image-233.png]]
With binary $Z$:
- $\hat X$ takes just *two values*: $\bar X_{Z=0}$ and $\bar X_{Z=1}$ 
- All the within-group variation is gone
The slope through those two stripes **is** the IV estimate.

![[image-234.png]]

With continuous $Z$:
- $\hat X$ now takes a *continuous range* of values, not just two
- The right-panel cloud is thinner than the left: first-stage $R^2$ is less than one, so a lot of the horizontal spread in $X$ is thrown away
- The orange slope on the right is still the IV estimate, $\approx 0.5$ 

## LATE $\neq$ ATE
- Does IV exactly identify the causal effect that we are interested in?
- Not quite. The slice of variation $Z$ induces is not a random sample of all variation in $X$
- $\hat \beta_{IV}$ is the causal effect of $X$ on $Y$ *for the compliers*, i.e. the subpopulation whose $X$ moves with $Z$
- This is the **LATE**
	- It may or may not equal the population ATE, the ATT, or the effect for any *other* subgroup

![[image-235.png]]
- Now individual treatment effects vary with unobservable "ability":
	- $\beta_i = 2 - \text{ability}$ varies across population
- Only the high-ability slice has $X$ that responds to $Z$ 
	- complier population has lower than population average $\beta_i$
- **ATE** $\approx 2$ averages $\beta_i$ across everyone
- **LATE** $\approx 0.9$ averages $\beta_i$ only over compliers
- IV still recovers a causal effects
- Whether that is the object you care about depends on the policy question


---
## External Validity and Policy Relevance 

Three reminders when reading an IV paper:
1. The LATE is **local** to the instrument. A clever IV gives you a clean estimate, but for a potentially narrow group.
2. That group may or may not be the **policy-relevant** group. For example, a quarter-of-birth instrument recovers the return to schooling for kids at the margin of dropping out at 16, not the average student.
3.  **One paper** $\neq$ a settled question. We build evidence across contexts, instruments, and methods. A convergent body of work (RCTs, DiD + IV + RD) is more persuasive than any single clean design. 

---

## Application: Wind Direction as an Instrument for Air Pollution (Deryugina et al.)

**Paper**: Deryugina, Heutel, Miller, Molitor & Reif — estimates the causal effects of acute fine particulate matter (PM2.5) exposure on mortality, healthcare use, and medical costs among U.S. elderly using Medicare data.

**Setup:**

- **Y**: Three-day mortality rates (deaths per million Medicare beneficiaries, by county-day)
- **X**: Daily PM2.5 concentration (from EPA monitors)
- **Z**: Local wind direction (which 90° interval the daily average wind direction falls in)

The key insight: wind direction is plausibly exogenous — we don't think human behavior meaningfully affects wind direction — and different wind directions carry pollution from different sources.

### Checking the IV Assumptions

**1. Relevance: Does wind direction actually shift PM2.5?**
- Testable via the first stage (F-test)
- The paper reports a very large F-stat → strong instrument
- Visually: they plot PM2.5 by wind direction for each city
    - In San Francisco, wind from the southeast → dirtier air; wind from the west (ocean) → cleaner air
    - In Boston, it's the opposite: wind from the east (ocean) → clean; wind from the southwest → dirty
- Crucially, we need **variation** in wind direction _and_ **spatial variation** in pollution sources
    - If a county is surrounded by coal plants in every direction, wind direction doesn't generate variation in PM2.5

**2. Exclusion: Does wind affect mortality _only_ through PM2.5?**
- **Not testable**; requires argumentation
- Potential violations:
    - Wind carries **other pollutants** too (NOx, ozone, pollen) — what we attribute to PM2.5 might partly be these
    - On very windy days, elderly people might **fall over** (hip fractures → mortality)
    - Windy days might change **behavior** — elderly staying indoors, reducing exposure to other hazards, or changing access to healthcare
- Authors argue that high-frequency (daily) identification makes many of these channels less plausible

**3. Monotonicity: Does a dirtier wind direction weakly raise PM2.5 for everyone?**
- We need no defiers — no one for whom a dirtier wind direction _lowers_ their PM2.5 exposure
- Potential violation: someone who monitors air quality (e.g. Purple Air) and **turns on an indoor air purifier** only on high-pollution days → a dirtier wind day could actually lead to _cleaner_ air for them
- Plausible that this applies to very few individuals, not the population on average

### Specification

Their first-stage regression instruments PM2.5 with a set of dummy variables indicating which 90° wind direction interval the daily average falls in — effectively multiple instruments, estimated via 2SLS. They also include extensive fixed effects:

- Time-of-year effects (seasonal pollution variation)
- Day-of-week effects (weekday vs. weekend driving patterns)
- County-level controls

### Main Results

|Age Group|OLS|IV (2SLS)|
|---|---|---|
|65+ (all)|≈ 0 or imprecise|Large, significant increase in mortality|
|65–69|Small|Moderate|
|70–74|Small|Moderate|
|85+|Largest|**Much** larger — effects concentrated here|

- IV estimates are **much larger** than OLS, with larger standard errors (as expected — we're throwing away a lot of variation)
- The mortality effect of a bad pollution day is concentrated among the **85+** population
- Estimated **extra ~$19,000 per beneficiary** in healthcare spending from a high-pollution event
- This is a **short-run LATE**: the effect of acute PM2.5 spikes on 3-day outcomes for compliers

### External Validity Concerns

- This paper identifies the **short-run marginal cost** of a high-pollution day
- It does **not** directly tell us about **long-run costs** of sustained pollution exposure
- Short-run costs are likely an **underestimate** of true long-run costs
- Nonlinearities and threshold effects in pollution-health relationships make it hard to map this estimate into a long-term policy discussion (e.g., evaluating the Clean Air Act)
- The LATE is local to wind-driven variation — this is a specific type of pollution shock, not a general pollution level change

---

## Preview: Regression Discontinuity (RD)

### The Causal Inference Toolkit So Far

|Method|Key Assumption|
|---|---|
|**RCT**|Treatment is literally randomly assigned|
|**Natural Experiment**|Treatment is _as good as_ randomly assigned|
|**Difference-in-Differences**|Selection bias is constant over time (parallel trends)|
|**Instrumental Variables**|As-good-as-random assignment of an excludable instrument|
|**Regression Discontinuity**|← next tool|

### Basic Idea

Sometimes treatment status is determined partially by an **arbitrary threshold** — whether a running variable is above or below a cutoff.

**Examples:**

- Medical school admission based on whether test score is above/below a cutoff (Deryugina, 의사 부모 논문)
- Unemployment benefits: duration depends on how long someone has been unemployed, which varies by state
- Tax brackets: firms/individuals with income above a cutoff face a higher marginal tax rate

The intuition: people just above and just below the threshold are very similar — the threshold assignment is **quasi-random** near the cutoff. We can compare outcomes on either side to get a causal effect.

### Motivating Example: Legal Drinking Age and Mortality

- In the U.S., the legal drinking age is **21** — an arbitrary threshold
- Plot: mortality rates by **days from 21st birthday** (30 days before to 30 days after)
- There is a visible, statistically significant **jump in mortality** right at day 0 (the 21st birthday)
- **Control group**: the same individuals just before the threshold, or people around their 20th and 22nd birthdays (where no discontinuity appears)
- This provides a natural comparison — people who suddenly gain legal access to alcohol vs. the same people moments before

> [!NOTE] Key Takeaway RD exploits the idea that near a threshold, assignment to treatment is essentially random. We'll dig into the assumptions, estimation, and potential pitfalls next class.
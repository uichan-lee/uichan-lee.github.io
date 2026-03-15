> [!QUESTION] Warm-Up
> **Warm-up 1**
> ![[image-146.png]]
> 
> Answer: 
> Model B. $\bar R^2$ peaks at B and falls at C, so the 8 extra variables aren't pulling their weight. 
> $R^2$ increases from A to B to C. But $R^2$ *never* decreases. 
> $\bar R^2$ *penalizes* each added regressor: does fit improvement justify lost df? 
> - $A \rightarrow B: \bar R^2$ rises $(0.31 \rightarrow 0.37)$: two new variables help
> - $B \rightarrow C: \bar R^2$ falls $(0.37 \rightarrow 0.35)$: 8 demographic controls don't improve fit *enough* to justify the extra parameters
> 
> ---
> **Warm-up 2**
> ![[image-147.png]]
> 1. What are $q$, $k$, and $n-k-1$ here? 
> 	- $q = 2,\ k = 3,\ n - k - 1 = 116$
> 2. Compute the F-statistic
> 	- $F = \frac{(0.58 - 0.42) / 2}{(1 - 0.58) / 116}=22.1$
> 3. Test at the 5% level ($F^*_{2,116}\approx 3.07$)
> 	- $22.1 > 3.07$, *reject $H_0$*
> 	- Teacher experience and spending are **jointly significant** (we don't know about individual significance!)
> 
> ---
> **Warm-up 3**
> ![[image-148.png]]
> Answer: **2**
> Try calculating the F-statistic. You will notice that its proportional to $n$, so even a small drop in $R^2$ can be statistically significant when $n$ is large. 


# Natural Experiments: Difference-in-Differences

The challange with observational data is that 
- we can't always randomize
- adding control variables helps, but we can never be sure we've controlled for *everything* (unobserved confounders remain)

A **natural experiment** is a real-world event that assigns treatment *as if* it were random
- not designed by the researcher, but by circumstances/policy/accident
- then we can recover the ATE without having to control for everything (no OVB)

The key question is always: can we find a **control group** whose outcomes tell us what $E[Y(0)]$ would have been for the treated group? 

> When we are doing an RCT, we make a key assumption that without the treatment, the treated group would look the same as control group.


**Differnce-in-differences** is a startegy that constructs the counterfactual using *changes over time* in a control group. One of the most widely used tools in applied economics. 

- Basic idea: even if groups differ in *levels*, if they share the same *trend*, we can difference out the selection bias

---
### Case Study: John Snow's "Grand Experiment"

#### Background
![[image-149.png]]

Eventually the *miasma theory* was abandoned after 1880 and replaced by the *germ theory* of disease.
- specific germs not miasma cause specific diseases
- evidence from a natural experiment in 1854 in London was part of a set of evidence that eventual lead to replacement by germ theory 

#### John Snow
![[image-150.png]]

#### The 1854 Broad Street Outbreak
![[image-151.png]]

It was a brilliant detective work, but is it a *causal evidence* (proof) that water transmitted cholera? 
- **Not quite**. The miasma camp could arge:
	- The pump was near the same foul-smelling sewers that produced "bad air"
	- Maybe the neighborhood just had worse living conditions
	- Correlation between proximity to the pump and death doesn't prove the *water* was the cause
- Snow needed a comparison where people were exposed to <u>different water</u> but <u>the same air, the same streets, the same living conditions</u>.

#### London's Private Water Companies 💧

In the 1800s, London had no public water system.
Instead, *private companies* competed to supply water to households.

South London was served by two main companies:
- **Southwark & Vauxhall (S&V)**
- **Lambeth Company**

Both companies piped water from the **Thames** directly into people's homes. 

![[image-152.png]]

#### A "Grand Experiment"

**Same Street, Different Water**: 
![[image-153.png]]

Snow recognized something extraordinary: this was like a **natural randomized trial**.
Households were assigned to clean vs. polluted water **not** by choice, income, or neighborhood but by the accident of which company had laid pipes first. 

Snow called this "a grand experiment... on the grandest scale"

Snow collected mortality data by water soource during the 1854 epidemic:
![[image-154.png]]

- S&V customers died at **8.5 times** the rate of Lambeth customers.
- Is this convincing evidence that contaminated water causes cholera? 

> [!important] A Simple Comparison Isn't Enough
> It is a strong evidence, but a skeptic might worry:
> - what if S&V households were poorer? 
> - what if they lived in more crowded conditions?
> - what if there were other differences we can't observe? 
> 
> In our potential outcomes language this simple comparison gives us:
> $$
> \bar Y_{S\&V} - \bar Y_{Lambeth} = \underbrace{\text{Effect of water}}_{\text{what we want}} + \underbrace{\text{selection bias}}_{\text{pre-existing differences}}
> $$
> 
> - Even though households were interspersed, a **cross-sectional comparison** is vulnerable to OVB.
> - Nobody randomly assigned households to water companies.
> - Snow needed a way to *difference out* whatever pre-existing differences there might be between the two groups.

#### Snow's Key Insight: Use Change Over Time

Snow's deeper insight was that something had **changed** that would allow him to isolate the effect of water. 

Before 1852, *both* companies drew water from the same polluted stretch of the Thames. In 1852, the Lambeth Compnay moved its intake *upstream* and away from the sewage, but S&V *didn't* move. So Snow could comapre the **change** in mortality across the two groups. 

![[image-155.png]]

![[image-156.png]]

#### Snow's Treatment and Control

This gives us a **before/after** comparison with a **treatment/control** structure:
- **Treatment group**: Lambeth customers (got cleaner water after 1852)
- **Control group**: S&V customers (water unchanged)

![[image-157.png]]

Q. How much did Lambeth's mortality fall *relative to* S&V's?

- **First difference** $(\Delta L = L_{1854} - L_{1850})$: Lambeth's mortality dropped. But was that because of cleaner water or because cholera was less severe citywide in 1854? 
- **Second difference** $(\Delta SV = SV_{1854} - SV_{1850})$: S&V tells us how much mortality changed for reasons *unrelated to water quality*
- **Difference-in-differences** $(\Delta L - \Delta SV)$: subtracting the control group's change removes these common factors what's left is the effect of *clean water alone*

---
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

> [!QUESTION] Is Parallel Trends Testable?
> We can **never directly test** the parallel trends assumption since it's about what *would have happened* (a counterfactual)
> 
> But we can look for **supporting evidence**:
> - check whether pre-treatment trends are similar
> - if the groups were trending together before the intervention, it's more plausible they would have continued to do so
> 
> If pre-treatment trends diverge, we should be skeptical of the DiD estimate.


#### Parallel Trends: Examples

![[image-159.png]]

1. Minimum wage — NJ vs PA
**Likely holds (reasonably).** This is actually the famous Card & Krueger (1994) study. NJ and PA are neighboring states with highly integrated economies — similar industries, similar labor market trends, similar exposure to national economic shocks. The intuition is that if no policy change had happened, fast food employment in both states would have moved similarly. The geographic adjacency is key here — it makes the "same time trend" assumption credible.

The main threat is if NJ was already on a different economic trajectory before the wage hike, which is why pre-trend checks matter.

2. Pollution regulation — counties above vs. just below threshold
**Plausible**. Counties near the threshold are similar in pollution levels and likely on similar trajectories. This is the logic behind Chay & Greenstone's identification strategy.

That said, the "just below threshold" counties are a much better control than counties far below — closeness to the cutoff is what makes this credible, which is exactly the RDD logic.

3. New highway — nearby vs. 50 miles away in a different city
**Likely fails.** This is the weakest of the three. Neighborhoods 50 miles away in a different city are subject to completely different local economic conditions, zoning policies, school districts, and urban development trends. Property values in two different cities can diverge for countless reasons unrelated to the highway. There's no strong reason to believe their pre-treatment trends were parallel, and post-treatment divergence could easily reflect city-level differences rather than the highway effect.

A much better control would be similar neighborhoods in the **same city** that didn't get the highway, since they'd share the same local economy and trend.


### DiD with Regression

#### From Intuition to Regression

We have intuition: compare changes across groups
But how do we actually **estimate** $\hat \delta _{DiD}$ and do **inference** (SEs, t-stats, CIs)?

Answer: run a regression!
To write down a DiD regression, we need two tools:
1. **Dummy variables** - to encode group membership and time periods
2. **Interaction terms** - to capture the DiD effect

#### Dummy Variables

A **dummy variable** (also called an *indicator* or *binary variable*) takes on only two variables: **0 or 1**

It encodes membership in a **category**:
- $Female_i = 1$ if person $i$ is female, 0 otherwise
- $Lambeth_i = 1$ if household $i$ is served by Lambeth, 0 if by S&V

Consider a simple wage regression:
$$
Wage_i = \beta_0 + \beta_1 \cdot Female_i + u_i
$$

What does this model predict?
- For men (Female = 0): $E[Wage] = \beta_0$
- For women (Female = 1): $E[Wage] = \beta_0 + \beta_1$

$\beta_0$ = average wage for men (the **reference group**)
$\beta_1$ = **difference** in average wages between women and men


![[image-160.png]]

$\hat \beta_1$ is simply the **difference in means** between the two groups


We can include dummy variables alongside continuous variables:
$$
Wage_i = \beta_0 + \beta_1 \cdot Female_i + \beta_2 \cdot Educ_i + u_i
$$

Now $\beta_1$ = difference in wages between women and men *holding education constant*
Graphically: two parallel regression lines, one for each group, separated by $\beta_1$

![[image-161.png]]

> [!NOTE] Multiple Categories
> 
> What if a variable has **more than two categories?** (e.g., region: North, South, East, West)
> Create $k-1$ dummy variables for $k$ categories:
> - $South_i = 1$ if in South
> - $East_i = 1$ if in East
> - $West_i = 1$ if in West
> - $North =$ reference group (when all dummies = 0) 
>   
>   Why $k-1$ not $k$? Including all $k$ creates perfect multicollinearity since the dummies sum to 1, which is the intercept (the **dummy variable trap**)


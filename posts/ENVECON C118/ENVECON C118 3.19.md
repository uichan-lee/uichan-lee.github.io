> [!Question]
> **Q1**
> ![[image-172.png]]
> Answer: 3
> - $\beta_0$: y-intercept of the control group
> - $\beta_1$: y-intercept difference between control and treatment group
> - $\beta_2$: The change in $Y$ in the control group after treatment 
> - $\delta$: The extra change in the treatment group after treatment, on top of β₂
> 
> ![[image-173.png]]
> 
> ---
> **Q2**
> ![[image-174.png]]
> The parallel trends assumption assumes that the selection bias in the sample are the same before and after the treatment. 
> DiD eliminates bias from *time-invariant* differences between groups (e.g., one group is always poorer) and from *common time trends*
> But it never eliminate bias from *time-varying confounders*.
> 
> ---
> **Q3**
> ![[image-176.png]]
> Answer: 2
> This is the example of *time-varying confounder*. 
> 

---
# DiD in Practice: Currie and Walker (2011)

![[image-177.png]]

![[image-178.png]]
![[image-179.png]]

## The DiD Setup

- **Treatment Group**: Mothers within 2 km of a toll plaza
- **Control Group**: Mothers 2-10 km from a toll plaza (still near a highway, but farther from the plaza)
- **Before/After**: Years before vs. after E-ZPass adoption at nearest toll plaza
- **Outcomes**: Prematurity (gestation < 38 weeks) and low birth weight (< 2,500 grams)

> <u>Why This Control Group? </u>
> - Mothers 2-10 km away live near the *same highway* – similar neighborhoods, traffic exposure, socioeconomic characteristics
> - But far enough from the toll plaza that they don't benefit from reducing idling/stop-and-go emissions
> - Mothers > 10 km from a toll plaza are dropped – too different (less urban, different demographics)

**Connecting to the DiD Framework**
![[image-180.png]]
1. $E[Y|Close = 0, E-ZPass=0] = \beta_0$
2. $E[Y|Close = 0, E-ZPass=1] = \beta_0+\beta_2$
3. $E[Y|Close = 1, E-ZPass=0] = \beta_0 + \beta_1$
4. $E[Y|Close = 1, E-ZPass=1] = \beta_0 + \beta_1 + \beta_2 + \delta$

> - $\hat \delta = [(4) - (3)] - [(2) - (1)] = (\beta_2 + \delta) - \beta_2 = \delta$ 
> - $\hat \delta < 0$  means prematurity/LBW fell **more** near toll plazas (wehre pollution dropped) than farther away


![[image-187.png]]

---

## Interpreting the Regression & Results

### Equation 1: Testing the Research Design

- Before estimating the effect, test whether the *design is valid*
- Run DiD with *maternal characteristics* not health outcomes as the outcome variable:
![[image-181.png]]
- **WHY?** If E-ZPass changed *who lives* near toll plazas (e.g., richer families moved in), then health improvements could reflect *composition* not pollution 

Variables:
![[image-182.png]]

> [!NOTE] What Are Fixed Effects? 
> - A **fixed effect** is a seperate *intercept* for each unit in a group (each toll plaza, each year, etc.)
> - E.g., with 98 toll plazas, $Plaza_{it}$ is really 97 dummy variables (one for each plaza minus the reference group)
>   
> - Consider two toll plazas: one on the George Washington Bridge (urban, high pollution) and one in rural PA (low pollution)
> - Without plaza FEs: difference in birth outcomes across plazas could reflect *location*, not E-ZPass
> - With plaza FEs: we're comparing *within the same plaza* before vs. after
> - Similarly, $Year$ and $Month$ fixed effects absorb **national time trends**
> 	- e.g., if prematurify was falling nationwide due to medical advantages, year FEs soak that up
> ---
> **Key intuition**: Fixed effects control for *all* characteristics of a group (observed and unobserved) that don't change over the relevant dimension
> - $Plaza$ FEs: everything about a location that is constant over time
> - $Year$ FEs: everything about a year that is constant across locations
> 
> Much more powerful than adding lot's of control variables
> - don't need to observe or measure the confounders
> - just need them to be fixed within the group


![[image-183.png]]
- Each column is a *separater regression* with a different maternal characteristics as $Y$
- If E-ZPass *changed the composition* of mothers near toll plazas, we'd expect $\hat b_4$ to be significant
- For almost every characteristic, $\hat b_4 \approx 0$ and insignificant
	- composition of mothers near toll plazas didn't change after E-ZPass
	- evidence to support the **parallel trends assumption**
- <u>One exception</u>: "Mother smoked" is positive and significant $\rightarrow$ sightly more smokers near toll plazas after E-ZPass



### Equation 2: The Main DiD Regression

![[image-185.png]]
- Same structure as Eq.(1) but dependent variable is now **health outcome** (prematurity or low birht weight)
- $X_{it}$ = maternal characteristics (race, education, age, smoking, etc.)
- **Coefficient of interest**: $b_4$
- If E-ZPass improved infant health near toll plazas, expect $\hat b_4 < 0$

![[image-186.png]]

**Interpreting the Coefficient**:
- $\hat b_4 = -0.0086$ for prematurity (column 2)
	- prematurity is *binary* (0/1) effect on the *probability*:
	- "E-ZPass reduced premature births by 0.86 percentage points"
- How big is this effect? Is it *economically significant*?
	- baseline prematurity rate $\approx 0.095$ (9.5%)
	- so this is about a 9% reduction (0.0086/0.095)
	- $\approx 29,677$ births within 2km after E-ZPass:
	  $29,677 \times 0.0086 \approx 255$ preterm births averted


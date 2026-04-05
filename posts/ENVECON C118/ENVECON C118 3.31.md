
# DiD with Multiple Time Periods

So far simple before/after DiD
In practice, we usually have longer *panel data* (many units observed over many time periods)
With more data, we can:
- *test* for parallel pre-trends
- estimate *dynamic treatment effects*
- does the effect grow, shrink, or stay constant over time?
- handle treatment that starts at different times for different units


## Case Study: Barwick, Li, Lin & Zou (2024)

![[image-188.png]]

- **Question**: Does giving people real-time pollution data change their behavior and improve health? 
- **Challange**: Pollution levels, economic conditions & government regulations all change at the same time, making it hard to isolate the effect of <u>information alone</u>,
- **Stategy**: Exploit the staggered rollout of China's monitoring program
	- cities got pollution data at different times = <u>natural experiment</u>

### The Natural Experiment

- **Setting**: China, 2013-2014
- Before 2013: $PM_{2.5}$ levels in China were **5x** the WHO guideline, but most cities had no public pollution data
- Government agencies often characterized severe pollution epsidoes as "fog" rather than [^1]smog
- In 2013, China launched a nationwide monitoring program
- Real-time readings on $PM_{2.5}$, $SO_2$, $NO_2$, etc. posted online

Policy reform:
- Pollution monitoring part of a larger policy reform in China.
	- 2012 first national standards for $PM_{2.5}$ to be met by 2016
	- 2013 Action Plan on Air Pollution Prevention and Control
	- Set specific targets for reduction starting in 2013
	- Established a monitoring and warning system
	- 2014 Premier Li Keqiang declared a "war on smog" at the People's Cognress

[^1]: Smoke + Fog

### The Data

Public Awareness of Pollution:
- frequency of air pollution-related articles in People's Daily
- surveys about level of concern about environmental issues

Behavioral Responses:
- outdoor acticity patterns (e.g., relationship between shopping and pollution from credit card data)
- defensive purchases (e.g., air purifiers)

Health Outcomes:
- mortality datra from the Chiense CDC

![[image-189.png]]

### Staggerd Roll-out

The program rolled out in **three waves** across 367 cities.
Schedule uncorrelated with the day-to-day variation of local pollution levels.
Each wave provide a *different treatment date*.
Cities treated later serve as controls for earlier waves. 

![[image-190.png|519x439]]

## DiD with Multiple Periods

Suppose we have periods $t = -3, -2, -1, 0, 1, 2, 3$
Treated units begin getting treatment in period 1.

For each period $s \neq 0$ we can estimate a 2-period DiD between period $s$ and period 0:
$$
\hat \beta_s = \underbrace{(\bar Y_{T,s} - \bar Y_{C, s})}_{\text{Diff in period s}}-\underbrace{(\bar Y_{T, 0} - \bar Y_{C, 0}}_{\text{Diff in period 0}})
$$

Gives a series of estimates $\hat \beta_{-3}, \hat \beta_{-2}, \hat \beta_{-1}, \hat \beta_1, \hat \beta_2, \hat \beta_3$ trace out dynamic treatment effect


> If parallel trends holds, what do we expect $\hat \beta_{-3}, \hat \beta_{-2}, \hat \beta_{-1}$ to be?
> ▶ Hopefully all *close to zero*! 
> - These are pre-treatment periods, so there is no treatment effect yet.
> - If trends are parallel, the DiD between any pre-period and period 0 should just reflect noise.
> 
> If the effect of treatment is positive, significant, and strengthening over time, what would a plot of $\hat \beta_{-3}, \hat \beta_{-2}, \hat \beta_{-1}, \hat \beta_1, \hat \beta_2, \hat \beta_3$ with time on the x-axis look like? 
> - *Flat near zero* for $s < 0$ (pre-treatment coefficients)
> - A *jump up* at $s = 1$ when treatment begins
> - *Positive and significant* coefficients for $s = 1, 2, 3$ (possibly growing if effects accumulate)

Conveniently, the $\hat \beta_s$ are equal to the OLS estimates of the regression
$$
Y_{i, t} = \phi_t + D_i\gamma + \sum_{s\neq 0}D_i\times 1[t=s]\times \beta_s+\epsilon_{i, t}
$$
- $\phi_t$: time fixed effects (one intercept per period)
- $D_i$: treatment group indicator (1 if unit is ever treated)
- $D_i\times 1[t=s]$: interaction of treatment group with each period indicator
- $\beta_s$: the DiD estiamte for period $s$ relative to period 0

Connecting to simple DiD:
![[image-191.png|433x192]]

![[image-192.png]]

![[image-193.png]]
### What's Different About These Equations?

The *treatment* here is information: does your city publish pollution data in period t?
But the *outcome of interest* is not pollution levels or even health directly. It's how senstivie shopping, mortality, etc. are to pollution.

Think about it: if you don't know the air is bad, you go shopping whether pollution is 30 or 100.
Your behavior is *insensitive* to pollution.

Once you can check an app and see $PM_{2.5} = 150$, you stay home. 
Now your behavior *responds* to pollution.

- $Pollution_{ct} \times Post_{ct}$ captures exactly this.
- It asks: after cities start publishing data, do outcomes become *more responsive* to pollution? 
- Pollution here is not the treatment, it's a *continuous variable* that interacts with treatment
- The coefficient $\beta$ measures the change in the $\frac{\partial Outcome}{\partial Pollution}$ gradient after monitoring begins

### Policy Reform and the Pollution Gradient

- **Problem for identification**:
	- if monitoring coincides with pollution *reduction policies* how do we separate information effects from actual air quality improvements? 
- **Solution**:
	- don't estimate the effect of monitoring directly
	- estimate how the **pollution gradient** chagnes after monitoring ($\frac{\partial\text{Outcome}}{\partial\text{Pollution}}$)
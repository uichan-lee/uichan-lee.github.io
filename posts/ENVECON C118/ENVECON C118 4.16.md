> [!QUESTION] Warm-Ups
> ### Question 1. 
> ![[image-236.png]]
> Answer: **3**. The right coefficient but standard errors that are **too small**. 
> - The second-stage OLS treats $\hat X_i$ as *data*, not as an estimate.
> - It doesn't know that $\hat X_i$ was predicted with noise in the first stage.
> - So it *understates* the total uncertainty.
> - This means confidence intervals would be too narrow and you would reject the null too often.
> - Software like `ivreg` accounts for both stages automatically
> - **Takeaway**: never report standard errors from a manual second-stage regression. 
> ---
> ### Question 2.
> ![[image-237.png]]
> Answer: **2**
> - Even with a randomized instrument, the *exclusion restriction* still requires an argument. 
> - The main concern: winning the lottery ➡️ becoming a doctor ➡️ higher *income*
> 	- Higher family income could improve helath <u>independently</u> of medical knowledge
> 	- That would be a direct effect of $Z$ on $Y$ that bypasses the treatment channel
> - The authors address this by controlling for income and comparing doctors to other high-earning professionals (lawyers, engineers)

---

# Regression Discontinuity

The key challange in causal inference is finding a control group that is comparable to the treated group in all ways except for treatment status. 

We've seen so far how to estimate causal effect when:
- the treatment is literally randomly assigned 
- the treatment is as-good-as-randomly assigned
- selection bias is constant over time (parallel trends)
- we have an as-good-as-random and excludable instrument

Today we will see another strategy: **regression discontinuity** (RD)

The idea behind RD is that sometimes treatment status is partially determined by whether a score is above/below a threshold. For example:
- Students with test scores above a cutoff get admitted to a program
- Unemployed workers with unemployment duration above a cutoff get extended benefits
- Firms with profits above a cutoff get taxed at a higher rate

In some of these cases, we can compare units just above and just below the cutoff to estimate the causal effect of treatment

---
## Case Study: Carpenter & Dobkin

![[image-238.png]]

**Question**: does alcohol consumption by young adults increase mortality? 
Why might this be relevant for policy makers? What sort of policies might it reform?

Simple linear regression after collecting observational data on young adults would have *selection bias* problem. Heavy drinkers likely differ from non-drinkers in many ways:
- Risk-taking preferences
- Mental health
- Social networks
- Access to other substances

> [!NOTE] What About Policy Variation?
> - Several studies use state-level MLDA (Minimum Legal Drinking Age) changes in 1970s and 1980s as "natural experiments"
> - Higher drinking age reduces alcohol consumption and motor vehicle fatalities (Wagenaar & Toomey, 2002)
> - **But**: the states that changed their MLDA are different from those that didn't
> - States forced to raise MLDA by the 1984 federal law may have had different *anti-drinking sentiment* or other unobservables correlated with mortality
> 
> This means difference-in-difference design fails. 
> - A DiD design across states needs the **parallel trends** assumption to hold.
> - What explicitly is the parallel trends assumption in this type of study? 
> 	- In the absence of the MLDA change, youth mortality in treated and control states would have evolved the same way (same trend)
> 
> But states that changed their MLDA differ from states that didn't in systematic ways:
> - Anti-drinking sentiment and cultural norms
> - Shifting enforcement of existing alcohol laws
> - Public health investments targeting youth
> - Road safety campaigns and seat-belt laws

### The RD Idea

The MLDA creates a **discontinuity in alcohol access at age 21**. People just under 21 and people just over 21 are nearly identical in every other way. 

- Key assumption: other determinants of mortality trend *smoothly* across age 21
- Under this assumption, any <u>jump in mortality at exactly age 21</u> must be due to the change in alcohol access
- This is a **regression discontinuity (RD)** design

### Why RD Solves the Problem

- **Selection bias:** people just below 21 and just above 21 have the same prefernces, backgrounds, and social networks (on average)
	- So if we see a jump in mortality exactly at 21, it's not selection
- **Policy endogeneity:** the federal MLDA has been set at 21 for decades
	- We're not comparing states that chose different policies, so no concerns about state-level unobservables (but we will have other worries about unobservables)
- The RD design addresses both problems that plague that alternative strategies

Before formalizing, let's think about the assumptions we need to make for the RD design to work:
1. **Sharp change in treatment at the cutoff**: alcohol access really does jump at age 21 (not at 20 or 22)
2. **Other factors are smooth across the cutoff:** nothing else changes exactly at age 21 that could affect mortality
3. **We can actually learn about the jump:** we need enough data near the cutoff to estimate what's happening on either side


---

## Formalizing RD

Let $D_i$ be a binary indicator for treatment
- In our example: $D_i = 1$ if individual $i$ is age 21 or older, $D_i = 0$ otherwise

Let $R_i$ be the **running variable** (also called the **forcing variable**)
- The score or measurement that determines treatment
- In our example: age (measured in days from 21st birthday)

Let $c$ be the **cutoff**: the value of $R_i$ where treatment assignment swithces
- In our example: $c = \text{age }21$

In a <u>sharp</u> regression discontinuity design, unit $i$ receives treatment if and only if $R_i$ is above the threshold:
$$
D_i = 1[R_i \ge c]
$$
- Reading this aloud: "$D_i$ equals 1 if $R_i$ is at least $c$, and 0 otherwise"\
- $1[\cdot]$ is the **indicator function**: it turns a true/false statement into a 1/0 variable

> [!NOTE] Sharp vs. Fuzzy RD
> What happens to the *probability of treatment* as $R_i$ crosses $c$?
> - In a **sharp** RD, the probability jumps from 0 to 1 exactly at the cutoff:
> $$\Pr(D_i = 1 \mid R_i = r) = \begin{cases} 0 & r < c \\ 1 & r \geq c \end{cases}$$
> - In a **fuzzy** RD, the probability still jumps at $c$, but doesn't reach 0 and 1

### $D_i$ is Deterministic in $R_i$ 

The rule $D_i = 1[R_i \ge c]$ has a powerful implication:
- Knowing $R_i$ tells you $D_i$ with *certainty*
- *No randomness* in treatment assignment once you know $R_i$
- Contrast with an RCT: treatment is random *given* everything observable
- Contrast with OLS: treatment depends on lots of observables *and* unobservables
- Here: treatment is a **pure function** of one observed variable, $R_i$

With selection on observables, we worry that unobservable $U_i$ also predicts $D_i$ (on top of $X_i$)
That's a "selection" story: people with certain unobservables select into treatment
In sharp RD, *nothing besides* $R_i$ determines $D_i$
Unobservables can affect $Y_i$, but they can't affect $D_i$ beyond their inlfuence on $R_i$


### The RD Estimand

The idea of RD is to compare the **limits** of the conditional expectation function $E[Y_i|R_i = r]$ from just above and just below the cutoff:
$$
\tau_{RD} = \underbrace{\lim_{r\downarrow c}E[Y_i|R_i=r]}_{\text{limit from above}} - \underbrace{\lim_{r\uparrow c}E[Y_i|R_i=r]}_{\text{limit from below}}
$$
- Differnce is the **jump** at the cutoff
- But: when does $\tau_{RD}$ corespond to a causal effect? 

![[image-239.png]]

> [!IMPORTANT] Why Limits (Not Just Averages)?
> Why not just compare $E[Y_i|R_i \ge c]$ to $E[Y_i|R_i \le c]$?
> - THis would average outcomes for *everyone* above vs. below the cutoff
> - But 25-year-olds differ from 21-year-olds for many reasons beyond alcohol access! 
> - By taking **limits** at the cutoff, we compare people who are essentially identical in $R_i$
> - The only thing that differs at the cutoff is **treatment status**

By definition, people with $R_i < c$ get $D_i = 0$ (they are untreated). So for any $r < c$, the observed outcome equals the untreated potential outcome:
$$
Y_i = Y_i(0) \text{   when } R_i = r < c
$$
![[image-240.png]]

Plugging both limits into the RD estimand:
![[image-241.png]]
### Continuity Assumption

**Key Assumption (Continuity)**: the potential outcome functions
$$
f_d(r) = E[Y_i(d) | R_i = r]
$$
are **continuous** at $r= c$ for $d = 0,1$
- In words: the expected potential outcomes don't *jump* at the cutoff on their own
- They may trend, curve, or vary in any smooth way through $c$, but no discrete jumps


---

## Interpreting the RD Estimand

It does **not** tell us the effect for:
- people far from the cutoff (e.g., 30-year-olds)
- People who would drink regardless of the law
- People who would never drink
External validity requires additional arguments 

$$
\tau_{RD} = E[Y_i(1) - Y_i(0)|R_i=c]
$$
It tells us the effect of treatment for people **at the cutoff**
- e.g. the causal effect of alcohol access on mortality for *people right at age 21*


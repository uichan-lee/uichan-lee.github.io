> [! QUIZ] Warm-Up
> ![[image-96.png]]
> **Answer: 2. It becomes 8.0**
> Original equation was saying that if height increases by *1cm*, weight increases by *0.08kg*. Since the unit of the dependent variable becomes 100 times larger, $\hat\beta_1$ must also become 100 times larger = *8.0kg*.
> ---
> ![[image-97.png]]
> **Answer: 2. One more year of education increases wages by approximately 9%**
> The interpretation of *Log-Level* model is: 
> $$\%\Delta y = (100\beta_1)\Delta x$$


# The Limits of Simple Linear Regression

We know how to use simple regression analysis to explain a dependent variable $y$ as a function of a single independent variable $x$.
$$ y = \beta_0 + \beta_1x + u$$
- Very difficult to draw *ceteris paribus*[^1] conclusions about how $x$ affects $y$. 
- Assumption that all other factors affecting $y$ are uncorrelated with $x$ is often unrealistic.
	- Key assumption for OLS simple linear regression $E[u|x]=0$

## Why Multiple Regression?

- Multiple regression analysis allows us to explicitly control for many other factors that simultaneously affect the dependent variable. 
$$y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_kx_k + u $$

This approach will let us:
- better infer causality
- build better models for predicting $y$
- explain more of the variation in the data
- get closer to the ceteris paribus[^1] (all else equal) effect that we want

---
# Multiple Regression

> [! EXAMPLE] Example: Air Pollution and Infant Health
> ![[image-98.png]]
> Key concept: **dose response function**
> Why infants? Because they are more fragile; easy to observe the effects. Possibility of longitudinal research. California has rich data at birth (not so much after birth).
> 
> Janet Currie and Matthew Niedell studied this using California birth records and individual level data. 
> - **Outcome ($Y$)**: Infant mortality, birth weight
> - **Key Variable of Interest ($X_1$)**: Air pollution (CO, PM10)
> 
> But what else affects infant health? Could it be correlated with air pollution? 
> A lot! (Mother's smoking behavior, access to prenatal care, wealth, neighbor, etc.)
> $\Rightarrow E[u|x]\neq 0$ 
> 
> The Solution: Multiple Regression
> - Allows us to include the **confounding variable** explicitly.
> $$\text{infant\_health} = \beta_0 + \beta_1 \cdot \text{pollution} + \beta_2 \cdot \text{income} + u $$
> - $\beta_1$ measures the effect of pollution **holding income fixed**
> - $\beta_2$ measures the effect of income **holding pollution fixed**
> - $u$ contains factors **other than** pollution and income

![[image-99.png]]

The researchers estimated models like:
$$\text{birth\_weight}_{izt} = \beta_0 + \beta_1 \cdot CO_{zt} + \beta_2 \cdot X_i + \gamma_z + \delta_t + u_{izt} $$
where:
- $i$ = individual infant, $z$ = zip code, $t$ = time
- $CO_{zt}$ = carbon monoxide in zip code $z$ at time $t$
- $X_i$ = maternal characteristics (age, education, smoking, prenatal care)
- $\gamma _z$ = zip code fixed effects (control for all fixed characteristics of areas)
- $\delta_t$ = time fixed effects

> [! LIST] Currie & Neidell (2005)
> - "Our framework allows us to control for a wide array of potential **confounders** in an effort to identify causal effects".
> - "In our richest specification, the effects of pollution are identified using only variation within cells defined at the zip code, month, and year level."

The data they had:
- Daily data on air pollution from EPA air monitoring stations
	- pollution levels correlated with weather
	- weather could also have indep. effects on infant health so also include
- Data on births from State of California records
	- rich detail on mothers including age, race, ethnicity, education, marital status, zip code, 
	- info on prenatal care, medicaid

What other data would you want them to have to rule out important **confounders**?

**What They Found**
- Reductions in CO in California during the 1990s saved roughly 1,000-2,000 infant lives
- High levels of postnatal exposure to CO have a significant effect on infant mortality
- Very relevant to policy debate at the time EPA regulation around cleaner diesel fuels
	- Q: what would increasing pollution from low-baseline do? 
	- towards cost-benefit analysis

---
## Interpreting Coefficients: Ceteris Paribus

$$ \text{birth\_weight} = \beta_0 + \beta_1 \cdot \text{pollution} + \beta_2 \cdot \text{income} + u $$
- $\beta_1$: Holding $income$ constant, a one-unit increase in pollution is associated with $\beta_1$ change in birth weight.
- $\beta_2$: Holding $pollution$ constant, a one-unit increase in income is associated with a $\beta_2$ change in birth weight. 

> [! EXAMPLE] Offsetting effects?
> ![[image-100.png]]
>
> ---
> Answer: 
> A: $3.0 - 0.02 \times 30 + 0.01 \times 50 = 3.0 - 0.6 + 0.5 = 2.9 kg$
> B: $3.0 - 0.02 \times 50 + 0.01 \times 90 = 3.0 - 1.0 + 0.9 = 2.9 kg$
> They have the <u>same predicted birth weight</u>. The effects exactly offset.
> 
> True

---
## Simple vs Multiple Regression
**Simple regression** puts all other factors in $u$:
$$ y = \beta_0 + \beta_1 x_1 + u$$
- If those factors are correlated with $x_1$, we have bias.

**Multiple regression** takes some factors out of $u$ and includes them explicitly:
$$y = \beta_0 + \beta_1x_1 + \beta_2x_2 +u$$
- Only need the **remaining** factors in $u$ to be uncorrelated with $x_1$ and $x_2$.

---
## Multiple Linear Regression: Interpretation

How do we think about $\beta_j$ now that there are multiple $x$? 
$$ y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_kx_k + u$$

If we assume $E[u|x_1, x_2, \dots, x_k] = 0$ , we can write the conditional expectation function:
$$E[y|x_1, x_2, \dots, x_k] = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_kx_k$$

Now $\beta_1$ measures the partial effect of increasing $x_1$ on $E[y]$, holding $x_2, x_3, \dots, x_k$ constant (i.e. we are controlling for $x_2, \dots x_k$)

> Ex. "holding experience and industry fixed, a one year increase in education leads to a 11.7% increase in income"

*OLS estimator* chooses estimates to minimize
$$ \sum(y_i - \hat\beta_0 - \hat\beta_1x_1 -\hat\beta_2x_2 - \dots - \hat\beta_kx_k)^2$$

---
## Assumptions for Multiple Linear Regression

1. **Linear in Parameters**
   The population model relationship is:
   $$y = \beta_0 + \beta_1x_1 + \dots + \beta_k x_k + u$$

2. **Random Sampling**
   We observe a random sample of size $N$ from the population.

3. **No Perfect Collinearity**
   There is no *perfect collinearity* among observed variables and no $x_j$ is constant:
   $$Var(x_j) \neq 0$$

4. **Zero Conditional Mean**
   The error term has an expected value of zero given any values of the independent variables:
   $$E[u|x_1, \dots, x_k] = 0$$

5. **Homoskedasticity**
   The error term has the same variance given any values of the explanatory variables:
   $$Var(u|x_1, \dots, x_k) = \sigma^2$$

With these assumptions, we can prove $E[\hat\beta_j]=\beta_j$ 

Adding assumption 5 can also show $Var(\hat\beta_j) = \frac{\sigma_u^2}{SST_j(1-R_j^2)}$
- $SST = \sum(x_{i, j} - \bar{x_j})$ is the total sample variation in $x_j$
- $R_j^2$ from regressing $x_j$ on all other independent variables[^2]
- $\hat\sigma_u^2 = \sum \frac{\hat{u_i^2}}{N-k-1} = \frac{SSR}{N - k - 1}$ 
- where $N - k - 1 =$ *degrees of freedom* for the OLS problem with $N$ observations and $k$ independent variables.


> [! NOTE] Assumption 3: Multicollinearity
> - **Definition**: Two variables are said to be perfectly multicollinear if one variable is a linear combination of the other variable (e.g. $x_2 = ax_1 + b$)
> - **Intuition**: Think about including two variables in your regression (took `ENVECON C118` and didn't take `ENVECON C118`) and remember in the multiple linear regression framework we want to "hold all else constant".
> - **Note**: some correlation between $X$ variables is normal
> 	- only a problem when there is a perfect or near perfect (very high) correlation between $X$ variables
> 	- with near multicollinearity, variance of our estimator $\hat\beta$ blows up
> 	  
> - If we have perfect multicollinearity, OLS algorithm fails
> 	- under the hood with multiple variables doing things in matrices
> 	- $\hat\beta = (X'X)^{-1}X'Y$
> 	- multicollinearity $\rightarrow X'X$ doesn't have full rank $\rightarrow$ not invertible


---
## How to reduce $Var(\hat\beta_j)$?

1. Add more explanatory variables that explain variation in $y$
	- $\sigma_u^2 \downarrow$ more explained variation $\rightarrow$ smaller error variance
	- also changes $N - k - 1$
2. Avoid multicollinearity
	- $R^2_j \downarrow$ less overlap between $X_j$ and other $X$'s $\rightarrow (1-R_j^2) \uparrow$
3. Increase sample size
	- $SST_j \uparrow$  more observations $\rightarrow \sum(X_{ji} -\bar{X_j})^2$ has more terms
	- $\sigma_u^2 \downarrow$, changes $N - k - 1$
4. Consider $x$ with a larger variance
	- $SST_j \uparrow$ More spread in $X_j \rightarrow$ each $(X_{ji} - \bar{X_j})^2$ is larger

---
# Choosing what goes into the regression

- How do we decide which variables to include?
- There are three cases to consider:

1. Adding/omitting an irrelevant variable


[^1]: "with other conditions remaining the same"

[^2]: This is NOT the $R^2$ from the regression line $\hat y$

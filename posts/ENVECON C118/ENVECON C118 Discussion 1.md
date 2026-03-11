---
title: "ENVECON C118 - Discussion: Regression"
date: 2026-01-28
course: ENVECON C118
---
## Economic Model
An economic model is an equation that describes relationships. For example, we can try to model participation in crime:
$$ y = f(x_1,x_2,x_3,\dots,x_6) $$
where $y$ = hours spent in criminal activity, $x_1$ = police enforcement, $x_2$ = hourly wage in legal employment, ..., $x_6$ = age. 

We turn this economic model into an **econometric model** by assigning a functional form (linear):
$$ crime = \beta_0 + \beta_1\text{ enforcement} +\beta_2\text{ wage} +\dots + \beta_{12}\text{ age} + u$$

- $u$ (also written as $\epsilon$, noise) is **error term** or **disturbance**, containing all the unobserved variables (e.g., family background, earnings from crime) that we cannot explicitly control for in the model. 

The crime participation model can be written as:
$$crime_i = \beta_0 + \beta_1 enforcement_i + \beta_2 wage_i + \beta_3 unemployment_i + \beta_4 inequality_i + \beta_5 income_i + \beta_6 age_i + u_i$$

where:
- $\beta_1 < 0$ (more enforcement → less crime)
- $\beta_2 > 0$ (higher legal wages → less crime since opportunity cost increases)
- $\beta_3 > 0$ (higher unemployment → more crime)
- $u_i$ represents unobserved factors like family background, risk preferences, criminal connections

### OLS
How do we actually go about estimating the model? **Ordinary Least Squares (OLS)**.

**Ordinary Least Squares**: goal is to choose the $\hat{\beta_j}$ that accomplishes:
$$\min_{\hat{\beta}_0,\ \hat{\beta}_1} \sum_i{(y_i-\hat{y_i})^2}$$

OLS chooses the regression line to minimize the sum of squared vertical distances from each data point to the line. These vertical distances are the residuals $\hat{u}_i = y_i - \hat{y}_i$. The regression line passes through the data cloud and balances observations above and below the line. Mathematically, we solve:
$$\min_{\hat{\beta}_0, \hat{\beta}_1} \sum_{i=1}^{n} (y_i - \hat{\beta}_0 - \hat{\beta}_1 x_i)^2$$

Taking derivatives and setting them to zero gives the OLS solution:
$$\hat{\beta}_1 = \frac{Cov(x,y)}{Var(x)} = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2}$$
$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}$$

- $\hat{\beta}_0$: the **intercept**, predicted value of $y$ when $x = 0$
- $\hat{\beta}_1$: the **slope**, the marginal effect—predicted change in $y$ for one-unit increase in $x$

## Proportion, Percentages, Elasticity
- Proportional change: $\frac{x_1-x_0}{x_0}=\frac{\Delta x}{x_0}$
- Percentage change: $\frac{x_1-x_0}{x_0} \times 100 = \frac{\Delta x}{x_0} \times 100$
- Elasticity: $\frac{\Delta z / z}{\Delta x / x} = \frac{\partial z}{\partial x} \frac{x}{z}$

> Elasticity $\eta$ is the "percent change in one variable in response to a given (one) percent change in another variable"

- If $0 < |\eta| < 1$ then the elasticity is inelastic. If $|\eta| > 1$ then it's elastic.

## Functional Forms and Marginal Effects

| Model | Equation | Marginal Effect | Interpretation |
|---|---|---|---|
| **Linear** | $y = \beta_0 + \beta_1 x$ | $\frac{\partial y}{\partial x} = \beta_1$ | One-unit increase in $x$ → $\beta_1$ unit change in $y$ |
| **Log-Linear** | $\ln(y) = \beta_0 + \beta_1 x$ | $\frac{\partial \ln y}{\partial x} = \beta_1$ | One-unit increase in $x$ → $100\beta_1\%$ change in $y$ |
| **Linear-Log** | $y = \beta_0 + \beta_1 \ln(x)$ | $\frac{\partial y}{\partial \ln x} = \beta_1$ | 1% increase in $x$ → $\beta_1/100$ unit change in $y$ |
| **Log-Log** | $\ln(y) = \beta_0 + \beta_1 \ln(x)$ | $\frac{\partial \ln y}{\partial \ln x} = \beta_1$ | 1% increase in $x$ → $\beta_1\%$ change in $y$ (elasticity) |


> [!NOTE]
> **General Rules for Interpreting Regression Coefficients:**
>
> For **linear models**: $\hat{\beta}_j$ represents the unit change in $y$ for a one-unit increase in $x_j$, holding other variables constant.
>
> For **log-linear models** ($\ln y$ is outcome): multiply $\hat{\beta}_j$ by 100 to get percentage change in $y$.
>
> For **linear-log models** ($\ln x$ is regressor): divide $\hat{\beta}_j$ by 100 to convert to percentage changes.
>
> For **log-log models** ($\ln y$ and $\ln x$): $\hat{\beta}_j$ is the elasticity—the percentage change in $y$ for a 1% increase in $x_j$.


> **Example: Birth Weight and Maternal Smoking (Linear Model)**
>
> Model: $weight_i = \beta_0 + \beta_1 cigs_i + u_i$
>
> Estimated coefficient: $\hat{\beta}_1 = -0.514$
>
> Interpretation: A one cigarette increase in daily maternal smoking is associated with a 0.514-unit decrease in baby birth weight. If units are ounces, this means each cigarette is associated with about 0.5 ounces less weight (approximately 14 grams). For a pack of 20 cigarettes per day, the associated decrease would be 10.3 ounces or about 292 grams—a substantial effect on newborn health.


> **Example: Wage and Education (Linear-Log Model)**
>
> Model: $wage_i = \beta_0 + \beta_1 \ln(education_i) + u_i$
>
> Suppose $\hat{\beta}_1 = 500$
>
> Interpretation: A 1% increase in years of education is associated with a $500/100 = \$5$ increase in hourly wages. Alternatively, going from 10 to 12 years of education (a 20% increase) is associated with a $20 \times 5 = \$100$ increase in hourly wages. This functional form captures diminishing returns to education—each additional year of schooling matters less as you accumulate more education.


> **Example: Gas Consumption and Price (Log-Linear Model)**
>
> Model: $\ln(quantity_i) = \beta_0 + \beta_1 price_i + u_i$
>
> Estimated coefficient: $\hat{\beta}_1 = -0.21$
>
> Interpretation: A one-unit (say \$1) increase in gas price is associated with a $100 \times (-0.21) = -21\%$ decrease in gas consumption. Equivalently:
> - \$1 price increase → 21% decrease in quantity purchased
> - If someone bought 10 gallons at \$2/gallon, a price increase to \$3/gallon would reduce purchases to approximately 7.9 gallons (a 21% reduction)
>
> This captures the price elasticity of demand for gas in a simple functional form.

> **Example: Star Price and Basket Share (Log-Log Model)**
>
> Model: $\ln(basketshare_i) = \beta_0 + \beta_1 \ln(starprice_i) + u_i$
>
> Estimated coefficient: $\hat{\beta}_1 = 0.491$
>
> Interpretation: The elasticity of basket share with respect to star price is 0.491. This means:
> - A 1% increase in the price of a featured star product → 0.491% increase in its share of the shopping basket
> - A 2% price increase → $0.491 \times 2 = 0.982\%$ increase in basket share
> - A 10% price increase → approximately 4.91% increase in basket share
>
> The elasticity less than 1 indicates inelastic demand—consumers buy more of the featured product when it becomes relatively more expensive, perhaps because the promotion makes it more salient and attracts store traffic.


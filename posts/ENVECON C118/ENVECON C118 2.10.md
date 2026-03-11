---
title: "ENVECON C118 - Regression Transformations"
date: 2026-02-10
course: ENVECON C118
---
> **🧪 Quiz:**
> **Warm-up 1**
> A researcher estimates: $\widehat{yield} = 2.1 + 0.035 \cdot fertilizer$
> using country level data where yield is in tonnes/hectare and fertilizer is in kg/hectare.
>
> Which is the most precisely correct interpretation?
> 1. Increasing fertilizer by 1 kg/ha causes yield to increase by 0.035 tonnes/ha
> 2. Countries using 1 kg/ha more fertilizer have, on average, 0.035 tonnes/ha higher yields
> 3. A 1% increase in fertilizer leads to a 0.035% increase in yield
> 4. The regression explains 3.5% of the variation in yields
>
> Answer: 2
> ---
> **Warm-up 2**
> A study finds that regressing test scores on class size gives $R^2 = 0.05$.
>
> Which conclusion is justified?
> 1. Class size has no effect on test scores
> 2. The estimate $\hat{\beta}_1$ must be biased
> 3. Class size explains 5% of the variation in test scores across schools
> 4. We should not report these results because $R^2$ is too low
>
> Answer: 3
> 
> $R^2$ (Coefficient of Determination) is a measure used in regression analysis to determine how well the statistical model predicts an outcome. 
> **Mathematical Meaning**: It represents the <u>proportion of the variance</u> for a dependent variable (test scores) that's explained by an independent variable (class size) in a regression model.

## Regression Recap

**Want to estimate the coefficients of our simple linear regression model given data $(x_i, y_i)$:**

$$y_i = \beta_0 + \beta_1 x_i + u_i$$

Two key assumptions $E[u] = 0$ and $Cov(x, u) = E[xu] = 0$ gives us:

$$\hat{\beta}_1 = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} = \hat{\rho}_{x,y}\frac{\hat{\sigma}_y}{\hat{\sigma}_x}$$

$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}$$

**Interpretation of coefficients:**

- $\hat{\beta}_1$ is the slope of the regression line
  - measures the change in $y$ associated with a one unit change in $x$
  - if the correlation of $x$ and $y$ is positive, $\hat{\beta}_1 > 0$
- $\hat{\beta}_0$ is the intercept of the regression line
- We define the **fitted value** for $y$ when $x = x_i$ as: $\hat{y}_i = \hat{\beta}_0 + \hat{\beta}_1 x_i$
- We define the **residual** as: $\hat{u}_i = y_i - \hat{y}_i$

### Goodness of fit: $R^2$

**Three terms to define to understand and calculate $R^2$:**

1. Sum of squared total (SST) = $\sum(y_i - \bar{y})^2$
   - measure of the total variability of $y$ in our sample data

2. Sum of squares explained (SSE) = $\sum(\hat{y}_i - \bar{y})^2$
   - measure of the total variability of the predicted $\hat{y}_i$ from OLS model

3. Sum of squared residuals (SSR) = $\sum(y_i - \hat{y}_i)^2$
   - measure of the total variability of the error term $\hat{u}_i$

Note: SST = SSE + SSR

**Formula:**
$$R^2 = 1 - \frac{SSR}{SST} = 1 - \frac{\sum_i(y_i - \hat{y}_i)^2}{\sum_i(y_i - \bar{y})^2}$$

- **1 - Variation NOT explained by X / Total variation in Y**
- **$R^2$: Fraction of variation in Y explained by X (ranges from 0 to 1)**

**Caution: A high $R^2$ does NOT mean the regression is causal!**

> **📝 Example: Real Estate**
>
> A real estate analyst collects data on recent home sales in two very different markets:
> - **Berkeley:** 150 single-family homes sold in 2024
> - **Manhattan:** 200 condos/apartments sold in 2024
>
> She regresses sale price (in thousands of dollars) on square footage and obtains the following results:
> - **Berkeley:** $\widehat{price} = 200 + 0.5 \cdot sq.ft$, $n = 150$, $R^2 = 0.72$
> - **Manhattan:** $\widehat{price} = 300 + 1.5 \cdot sq.ft$, $n = 200$, $R^2 = 0.55$
>
> **Interpreting the Slope**
> - $\hat{\beta}_0 = 200$ for Berkeley. What does this number literally represent? Does this interpretation make practical sense for houses?
>   - The intercept predicts price when square footage is 0, which doesn't make sense for real houses
> - $\hat{\beta}_0 = 300$ for Manhattan. Why might the intercept be higher in Manhattan than Berkeley?
>   - The intercept captures baseline value/location premium; Manhattan's real estate premium is higher 


**Unit Changes and Effects:**

| Change | Effect on $\hat{\beta}_0$ | Effect on $\hat{\beta}_1$ |
|---|---|---|
| Multiply Y by c | Multiply by c | Multiply by c |
| Multiply X by c | No change | Divide by c |

## Transformations

**Common Functional Forms:**

| Model | Equation |
|---|---|
| Log-linear | $\ln(Y) = \beta_0 + \beta_1 X$ |
| Linear-log | $Y = \beta_0 + \beta_1 \ln(X)$ |
| Log-log | $\ln(Y) = \beta_0 + \beta_1 \ln(X)$ |

**Why use logarithmic transformations of variables?**
- Very common way to handle non-linear relationship between independent and dependent variables
- Convenient means of transforming a highly skewed variable into approximately normal

### Log-Linear Model
$$\ln(Y_i) = \beta_0 + \beta_1 X_i + \epsilon_i$$

**How do we interpret $\hat{\beta}_1$?**
- 1-unit increase in X → $\hat{\beta}_1$ unit increase in log Y
- 1-unit increase in X → $e^{\hat{\beta}_1}$ unit increase in Y
- For **small values of $\hat{\beta}_1$:** $e^{\hat{\beta}_1} \approx 1 + \hat{\beta}_1$
  - $Y_i = e^{\beta_0 + \beta_1 X_i + \epsilon_i} = e^{\beta_0} e^{\beta_1 X_i} e^{\epsilon_i} \approx (1 + \hat{\beta}_1 X_i) e^{\beta_0} e^{\epsilon_i}$
  - so a 1-unit change in X corresponds to a $\hat{\beta}_1$ % change in Y

### Linear-Log Model
$$Y_i = \beta_0 + \beta_1 \ln(X_i) + \epsilon_i$$

**Linear-Log Model interpretation of $\hat{\beta}_1$:**
- 1-unit increase in log X → $\hat{\beta}_1$ unit increase in Y
- 1-unit increase in log X means multiplying X by (100 + p)/100
- e.g., a 1% increase in X means a $\beta_1 / 100$ units increase in Y
- small log(1 + p/100) ≈ p/100 ≈ (log(101) - 1)e = % (2.72)
- $\beta_1/(100)$ approximately expected increase in Y from a 1% increase in X

> [!NOTE]
> **Summary Table of Regression Functional Forms:**
>
> | Model | Equation | Interpretation of $\hat{\beta}_1$ |
> |---|---|---|
> | Level-level | $Y = \beta_0 + \beta_1 X$ | 1 unit ↑ in X → $\beta_1$ units ↑ in Y |
> | Log-level | $\ln(Y) = \beta_0 + \beta_1 X$ | 1 unit ↑ in X → $(100 \times \beta_1)\%$ ↑ in Y |
> | Level-log | $Y = \beta_0 + \beta_1 \ln(X)$ | 1% ↑ in X → $\beta_1/100$ units ↑ in Y |
> | Log-log | $\ln(Y) = \beta_0 + \beta_1 \ln(X)$ | 1% ↑ in X → $\beta_1\%$ ↑ in Y (elasticity) |


## Assumptions of Linear Regression

1. **Linear in parameters:** population model relationship is $y = \beta_0 + \beta_1 x + u$

2. **Random sampling:** we observe a random sample of size N from the population

3. **Sample Variation in the Explanatory Variable:** $x$ is not constant ($Var(x) \neq 0$)

4. **Zero conditional mean:** $E[u|x] = 0$
   - The error term is mean independent of the explanatory variable

5. **Homoskedasticity:** $Var(u|x) = \sigma^2$
   - The variance of the error term is constant across all values of x


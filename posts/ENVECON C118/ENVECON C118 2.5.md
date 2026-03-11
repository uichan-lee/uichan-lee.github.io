---
title: "ENVECON C118 - Regression"
date: 2026-02-05
course: ENVECON C118
---
# Regression Model

Much of applied econometric analysis starts from the following premise:
- $y$ and $x$ are two variables
- how does $y$ vary with changes in $x$?
- e.g. $y$ = crop yield, $x$ = fertilizer intensity

## Simple Linear Regression Model

The **linear** regression model is
$$
y = \beta_0 + \beta_1 x + u
$$
where:
- $y$ is the **dependent** variable
- $x$ is the **independent** variable
- $\beta_0$ is the **intercept**
- $\beta_1$ is the **slope**
- $u$ is the **error term**

> *Linearity Assumption*
> - a one-unit change in $x$ has the same effect on $y$

> [!NOTE]
> 1. As long as we include intercept $\beta_0$ we can assume without loss of generality $E[u] = 0$.
> 	- lose nothing by normalizing the unobserved factors
> 	- redefine $\tilde{u} = u - E[u]$ and $\tilde{\beta_0} = \beta_0 + E[u]$
> 	- Nothing about relationship between $u$ and $x$
> 2. Need to assume that $u$ is mean independent of $x$.
> 	- in math: $E[u|x] = E[u] = 0$
> 	- in English: knowing $x$ doesn't give us any information about $u$
> 	- stronger than $u$ independent of $x$ $\rightarrow Cov(x,y)=0$ 

> **📝 Example:**
 > Suppose crop yield is determined by the model
> - $yield = \beta_0 + \beta_1 \cdot fetilizer + u$
> 
> What term captures the effect of fertilizer on yield? (holding all other factors fixed)
> - coefficient $\beta_1$ measures the effect of fertilizer on yield
> - key assumption is ceteris paribus (all else equal)
> 
> What term contains these other factors? (e.g. lan quality, rainfall, etc)
> - error term $u$ contains other factors such as land quality, etc.

**Conditional Expectation and Population Regression:**

Start with the population model and take conditional expectations:
- $Y = \beta_0 + \beta_1 X + u$
- $E[Y|X] = E[\beta_0 + \beta_1 X + u|X]$
- $E[Y|X] = E[\beta_0|X] + \beta_1 E[X|X] + E[u|X]$ (beta_0 is a constant)
- $E[Y|X] = \beta_0 + \beta_1 X + E[u|X]$ (given X, the beta_1 X is just a number)
- $E[Y|X] = \beta_0 + \beta_1 X$ (This is the assumption! $E[u|X] = 0$)

If $E[u|X] = 0$, the population regression IS the CEF!

Solving parameters:

**First-Order Condition for minimizing sum of squared residuals:**

$$\frac{1}{N}\sum_{i=1}^N(y_i - \hat{\beta}_0 - \hat{\beta}_1 x_i) = 0$$

Expanding and simplifying:
$$\frac{1}{N}\sum_{i=1}^N y_i - \frac{1}{N}\sum_{i=1}^N \hat{\beta}_0 - \frac{1}{N}\sum_{i=1}^N \hat{\beta}_1 x_i = 0$$

$$\bar{y} - \hat{\beta}_0 - \hat{\beta}_1\frac{1}{N}\sum_{i=1}^N x_i = 0$$

$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}$$

**Second condition using the x residuals:**

$$\frac{1}{N}\sum_{i=1}^N x_i(y_i - \hat{\beta}_0 - \hat{\beta}_1 x_i) = 0$$

$$\frac{1}{N}\sum_{i=1}^N x_i(y_i - \bar{y} + \hat{\beta}_1\bar{x} - \hat{\beta}_1 x_i) = 0$$

$$\frac{1}{N}\sum_{i=1}^N (x_i - \bar{x})(y_i - \bar{y}) = \hat{\beta}_1 \frac{1}{N}\sum_{i=1}^N (x_i - \bar{x})^2$$

$$\frac{1}{N}\sum_{i=1}^N (x_i - \bar{x})(y_i - \bar{y}) = \hat{\beta}_1 \frac{1}{N}\sum_{i=1}^N (x_i - \bar{x})^2$$

### **Resulting Parameters:**

**The estimated slope is:**
$$\hat{\beta}_1 = \frac{\sum_{i=1}^N (x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^N (x_i - \bar{x})^2} = \hat{\rho}_{x,y}\frac{\hat{\sigma}_y}{\hat{\sigma}_x}$$

Without experimental data (randomization) regression is an analysis of **correlation** between two variables.

Must be very careful about inferring **causality**.

**The estimated intercept is:**
$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}$$
OLS chooses $\hat{\beta_0}$ and $\hat{\beta_1}$ to minimize the **sum of squared residuals**
$$\min_{\beta_0, \beta_1}\sum_{i=1}^N{(y_i-\beta_0-\beta_1x_i)^2} $$
Residual is the difference between the actual $y_i$ and the fitted value $\hat{y_i}$
$$\hat{u_i} = y_i - \hat{y_i}=y_i-\hat{\beta_0}-\hat{\beta_1}x_i $$


### Goodness of fit: $R^2$

**Three terms to define to understand and calculate $R^2$:**

1. **Sum of squared total (SST)** = $\sum_i(y_i - \bar{y})^2$
   - measure of the total variability of $y$ in our sample data

2. **Sum of squares explained (SSE)** = $\sum_i(\hat{y}_i - \bar{y})^2$
   - measure of the total variability of the predicted $\hat{y}_i$ from OLS model

3. **Sum of squared residuals (SSR)** = $\sum_i(y_i - \hat{y}_i)^2$
   - measure of the total variability of the error term $\hat{u}_i$

Note: SST = SSE + SSR

**$R^2$ Formula:**
$$R^2 = 1 - \frac{SSR}{SST} = 1 - \frac{\sum_i(y_i - \hat{y}_i)^2}{\sum_i(y_i - \bar{y})^2}$$

- **SST (Total Sum of Squares):** Total variation in Y
- **SSR (Sum of Squared Residuals):** Variation NOT explained by X
- **$R^2$:** Fraction of variation in Y explained by X

| $R^2$ | Interpretation |
|---|---|
| 0 | X explains none of the variation in Y |
| 0.3 | X explains 30% of the variation in Y |
| 1 | X explains all of the variation in Y (perfect fit) |

**Caution: A high $R^2$ does NOT mean the regression is causal!**
- Correlation ≠ causation
- You can have a biased estimate with $R^2 = 0.99$
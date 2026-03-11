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

> [!NOTE] Assumptions about $u$
> 1. As long as we include intercept $\beta_0$ we can assume without loss of generality $E[u] = 0$.
> 	- lose nothing by normalizing the unobserved factors
> 	- redefine $\tilde{u} = u - E[u]$ and $\tilde{\beta_0} = \beta_0 + E[u]$
> 	- Nothing about relationship between $u$ and $x$
> 2. Need to assume that $u$ is mean independent of $x$.
> 	- in math: $E[u|x] = E[u] = 0$
> 	- in English: knowing $x$ doesn't give us any information about $u$
> 	- stronger than just $Cov(x, u) = 0$ (mean independence implies zero covariance, but not vice versa)

> [!EXAMPLE] Crop Yields and Fertilizer
 > Suppose crop yield is determined by the model
> - $yield = \beta_0 + \beta_1 \cdot fertilizer + u$
> 
> What term captures the effect of fertilizer on yield? (holding all other factors fixed)
> - coefficient $\beta_1$ measures the effect of fertilizer on yield
> - key assumption is ceteris paribus (all else equal)
> 
> What term contains these other factors? (e.g. land quality, rainfall, etc.)
> - error term $u$ contains other factors such as land quality, etc.

![[image-75.png]]

Solving parameters:
![[image-76.png]]

![[image-77.png]]

### **Resulting Parameters:**
![[image-78.png]]
OLS chooses $\hat{\beta_0}$ and $\hat{\beta_1}$ to minimize the **sum of squared residuals**
$$\min_{\beta_0, \beta_1}\sum_{i=1}^N{(y_i-\beta_0-\beta_1x_i)^2} $$
The **residual** is the difference between the actual $y_i$ and the fitted value $\hat{y_i}$:
$$\hat{u_i} = y_i - \hat{y_i}=y_i-\hat{\beta_0}-\hat{\beta_1}x_i $$


### Goodness of fit: $R^2$
![[image-80.png]]

![[image-79.png]]

![[image-81.png]]
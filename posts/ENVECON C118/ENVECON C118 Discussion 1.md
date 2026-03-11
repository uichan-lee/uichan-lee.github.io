## Economic Model
An economic model is an equation that describes relationships. For example, we can try to model participation in crime:
$$ y = f(x_1,x_2,x_3,\dots,x_6) $$
where $y$ = hours spent in criminal activity, $x_1$ = police enforcement, $x_2$ = hourly wage in legal employment, ..., $x_6$ = age. 

We turn this economic model into an **econometric model** by assigning a functional form (linear):
$$ crime = \beta_0 + \beta_1\text{ enforcement} +\beta_2\text{ wage} +\dots + \beta_{12}\text{ age} + u$$

- $u$ (also written as $\epsilon$, noise) is **error term** or **disturbance**, containing all the unobserved variables (e.g., family background, earnings from crime) that we cannot explicitly control for in the model. 

![[image-48.png]]

### OLS
How do we actually go about estimating the model? **Ordinary Least Squares (OLS)**.

**Ordinary Least Squares**: goal is to choose the $\hat{\beta_j}$ that accomplishes:
$$\min_{\hat{\beta}_0,\ \hat{\beta}_1} \sum_i{(y_i-\hat{y_i})^2}$$

![[image-49.png|400]]

- $\hat{\beta}_0$: the **intercept**, tells us the predicted value of $y$ when $x = 0$
- $\hat{\beta}_1$: the **slope**, tells us the marginal effect of our $x$ variable on the **predicted** $y$.

![[image-50.png|400]]

## Proportion, Percentages, Elasticity
- Proportional change: $\frac{x_1-x_0}{x_0}=\frac{\Delta x}{x_0}$
- Percentage change: $\frac{x_1-x_0}{x_0} \times 100 = \frac{\Delta x}{x_0} \times 100$
- Elasticity: $\frac{\Delta z / z}{\Delta x / x} = \frac{\partial z}{\partial x} \frac{x}{z}$

> Elasticity $\eta$ is the "percent change in one variable in response to a given (one) percent change in another variable"

- If $0 < |\eta| < 1$ then the elasticity is inelastic. If $|\eta| > 1$ then it's elastic.

## Functional Forms and Marginal Effects
![[image-51.png]]


> [! NOTE] General Rules: Interpreting ME
> ![[image-52.png]]


> [! EXAMPLE] Linear Marginal Effects
> ![[image-53.png]]
> A one cigarette increase in daily consumption by mother is associated with 0.514 unit decrease of baby weight.


> [! EXAMPLE] Linear-Log Marginal Effects
> ![[image-54.png]]
> ![[image-55.png|450]]


> [! EXAMPLE] Log-Linear (= Exponential) Marginal Effects
> ![[image-56.png]]
> $\Delta x$ in 1 unit  $\rightarrow 100\cdot \beta_1 \% \Delta y$
> $100 \cdot (-0.21) = -21$
> Gas consumption increase by 1 gallon is related to $21/gallon drop on gas prices.

> [! EXAMPLE] Log-Log Marginal Effects
> ![[image-57.png]]
> `starprice` increase in 2% gives $0.491 \times 2 = 0.982\%$ increase of basketshare.


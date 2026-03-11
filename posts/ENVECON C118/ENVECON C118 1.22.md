# Lecture
## Random Variables
A **random variable** is a numerical summary of a random process.

<br>

- **Outcomes** are mutually exclusive results of a random process
- The **probability** of an outcome captures its likelihood of occurring
- The **sample space** is the set of all possible outcomes
- An **event** is a subset of the sample space (e.g. event = roll of a die will be less than 3, event = {roll = 1, roll = 2})

> [!Example] Air Quality
> ![[image-6.png]]
> - $X$ is continuous, $Y$ is discrete
> - $X$ outcomes: 0, 10, 100, 305, etc.
> - $Y$ outcomes: good, moderate, unhealthy, etc.
> - $X$ sample space: [0, $\infty$]
> - $Y$ sample space: all AQI categories above

---
A random variable is characterized by its **cumulative distribution function** (CDF).
$$F(x) = P(X \le x)$$
which tells us the probability that $X$ takes a value of $x$ or below.
- $P(X\le 5)$ = probability that we see $X$ equal to 5 or lower.

If our random variable $X$ is discrete we define the **probability mass function** (PMF) as the probability that $X$ takes on each value in the support:
- $p(x) = P(X=x)$
- e.g. $X$ = daily AQI category in SF-Oakland-Hayward
- $p(Good) = P(X = Good) \approx \frac{\text{\# days with Good AQI}}{\text{\# days in sample}}$
![[image-7.png]]


You can read the **median** from the CDF chart where y = 0.50.
![[image-8.png]]


> [!NOTE] Empirical vs True Distribution
> 
> We know the true probability of getting N heads in 10 flips of a fair coin is given by the binomial distribution:
> ![[image-9.png]]
> How many samples of 10 flips do we need to take to get the distribution approximately right? 
> ![[image-10.png]]
> We will return to this idea. 


> [!Question] PDFs and CDFs for Continuous Rvs
> Let $X$ be the the daily average PM$_2.5$ concentration in San Francisco on a random day. Assume $X$ is continuous with PDF $f(x)$ and CDF $F(x)$.
> ![[image-11.png]]


### Joint Distribution

- Many interesting economic questions involve features of the **joint distribution** of two or more random variables
	- e.g. how do earnings $Y$ and schooling levels $X$ vary together?
	- e.g. how do pollutants such as NO and Ozone vary together?
- The CDF for the joint distribution is defined by:
  $$F(x, y)= P(X\le x, Y\le y)$$
![[image-12.png]]

### Conditional Distributions
- Combining joint and marginal distributions gives us conditional distributions of one random variable given another.
- ![[image-13.png]]

---
# DA 2

## Math & Probability
> more in GoodNotes
### Descriptive Statistics
- **Average** by adding them up and dividing by n:
$$\bar{x} = (1/n)\sum_{i=1}^nx_i$$

- Sum of **deviation** is always zero:
$$\sum_{i=1}^nd_i=\sum_{i=1}^n(x_i-\bar{x})=0$$


- Sum of squared deviation:
$$\sum_{i=1}^n(x_i-\bar{x})^2=\sum_{i=1}^nx_i^2-n(\bar{x})^2$$
Derivation:
![[image-14.png]]


Generalization of Sum of squared deviation:
$$\begin{align}
\sum_{i=1}^n(x_i-\bar{x})(y_i-\bar{y})
&=\sum_{i=1}^n{x_i(y_i-\bar{y})}\\
&=\sum_{i=1}^n{(x_i-\bar{x})y_i}\\
&=x_iy_i-n(\bar{x}\cdot\bar{y})
\end{align}$$

### Linear Functions

$$y=\beta_0 + \beta_1 x$$
We say that y is a **linear function** of x, and $\beta_0$ and $\beta_1$ are two parameters (numbers) describing this relationship. The **intercept** is $\beta_0$, and the **slope** is $\beta_1$.

The change in y is always $\beta_1$ times the change in $x$:
$$\Delta y=\beta_1\Delta x$$
where $\Delta$ denotes "change". In other words, the **marginal effect** of x on y is constant and equal to $\beta_1$. 

Linear functions are easily defined for more than two variables:
$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 $$
$$\beta_1=\frac{\Delta y}{\Delta x_1} \text{ if } \Delta x_2 = 0$$
Because it measures how $y$ changes with $x_1$, holding $x_2$ fixed, $\beta_1$ is often called the **partial effect** of $x_1$ on $y$. Because the partial effect involves holding other factors fixed, it is closely linked to the notion of **ceteris paribus**[^1]. $\beta_2$ has a similar interpretation. 

[^1]: with other conditions remaining the same


### Special Functions

#### Quadratic Function

The **turning point** of a quadratic function is at $x^*=\frac{-\beta_1}{2\beta_2}$, when the function is given as:
$$y=\beta_0 + \beta_1x+\beta_2x^2 $$

Approximating of the slope:
$$\text{slope} = \frac{\Delta y}{\Delta x} \approx \beta_1 + 2\beta_2 x,$$
for <u>small</u> changes in $x$. (The RHS is the derivative of the function above.)

#### Natural Logarithm
We often refer to it simply as the **log function**, defined as:
$$ y = log(x) $$
It's the most important non-linear function in econometrics.

Using approximation: $$log(1 + x) \approx x$$ for $x \approx 0$, it can be shown (using calculus) that:
$$ log(x_1) - log(x_0) \approx (x_1 - x_0)/x_0 = \Delta x/x_0 $$

for small changes in $x$. If we multiply by 100 and write $\Delta log(x) = log(x_1) - log(x_0)$, then

$$100 \cdot \Delta log(x)\approx \%\Delta x $$

We define the **elasticity** of $y$ with respect to $x$ as 
$$\frac{\Delta y}{\Delta x}\cdot \frac{x}{y}= \frac{\%\Delta y}{\%\Delta x}$$

A *constant elasticity model* is approximated by the equation
$$ log(y) = \beta_0 + \beta_1 log(x)$$
and $\beta_1$ is the elasticity of $y$ with respect to $x$ (assuming that x, y > 0)

---

## r4ds

### Visualizing Distributions

#### A categorical variable (Bar Chart)
Use `geom_bar()` with `ggplot`.

Reorder the bars based on their frequencies: `fct_infreq()`
![[image-15.png]]

#### A numerical variable 

##### Histogram
Use `geom_histogram()` with appropriate `bin_width` argument
![[image-16.png]]

##### Density Plot
A **density plot** is a smoothed-out version of a histogram and a practical alternative, particularly for *continuous data* that comes from an underlying smooth distribution. 
Use `geom_density()`.
![[image-17.png]]


> [!NOTE] `fill` vs. `color`
> ```r
> ggplot(data=penguins, mapping=aes(y=fct_infreq(species))) +
> geom_bar(fill="cyan")
> ```
> ![[image-18.png]]
> 
> ```r
> ggplot(data=penguins, mapping=aes(x=fct_infreq(species))) +
> geom_bar(color="red")
> ```
> ![[image-19.png]]


### Visualizing Relationships

We need to have at least two variables mapped to aesthetics of a plot.

#### A numerical and a categorical variable
##### Boxplot
A **boxplot** is a type of visual shorthand for measures of position (percentiles) that describe a distribution. It is also useful for identifying potential outliers. 

Use `geom_boxplot()`
![[image-20.png]]

Alternatively, you can use density plot (`geom_density`) with `color` and `fill` both map to categorical variable in aesthetics, with `alpha` argument in `geom_density`. 
```r
ggplot(data=penguins, mapping=aes(x=body_mass_g, fill=species, color=species)) +
  geom_density(alpha=0.5)
```
![[image-21.png]]

> - We *map* variables to aesthetics if we want the visual attribute represented by that aesthetic to vary based on the values of that variable.
> - Otherwise, we *set* the value of an aesthetic. 

#### Two categorical variables

We can use **stacked bar plots** to visualize the relationships between two categorical variables. (`island` and `species` in the example)
```r
ggplot(data=penguins, mapping=aes(x=island, fill=species)) +
	geom_bar()
```
![[image-23.png]]

A **relative frequency plot** is created by setting `position = "fill"` in the geom. 
Additional `labs(y="proportion")` sets y label as "proportion".
```r
ggplot(data=penguins, mapping=aes(x=island, fill=species)) +
	geom_bar(position="fill") +
	labs(y="proportion")
```
![[image-27.png]]

#### Two numerical variables

So far you've learned **scatter plot** `geom_point()` and **smooth curves** `geom_smooth()` for visualizing the relationship between two numerical variables.

```r
ggplot(penguins, aes(x = flipper_length_mm, y = body_mass_g)) +
	geom_point()
```

![[image-28.png]]

#### Three or more variables
We can incorporate more variables into a plot by mapping them to additional aesthetics.
For example, we can use the colors and shapes to represent species and islands respectively.

```r
ggplot(penguins, aes(x=flipper_length_mm, y=body_mass_g)) + 
	geom_point(aes(color=species, shape=island))
```

However, adding too many aesthetic mappings to a plot makes it cluttered and difficult to make sense of. Another way is to split your plot into **facets**, subplots that each display one subset of the data.

To facet, use `facet_wrap()`. The first argument of `facet_wrap()` is a *formula*, which you create with `~` followed by a variable name, which MUST be a categorical variable.
```r
ggplot(penguins, aes(x= flipper_length_mm, y = body_mass_g)) +
	geom_point(aes(color = species, shape = species)) +
	facet_wrap(~island)
```
![[image-29.png]]

### Saving Plots
`ggsave()` will save the plot most recently created to disk to your working directory.
```r
ggplot(data = penguins, mapping = aes(x = flipper_length_mm, y = body_mass_g)) + 
	geom_point()
ggsave(filename = "penguin-plot.png")
```
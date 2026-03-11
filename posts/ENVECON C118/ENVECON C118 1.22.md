---
title: "ENVECON C118 - Random Variables"
date: 2026-01-22
course: ENVECON C118
---
# Lecture
## Random Variables
A **random variable** is a numerical summary of a random process.

<br>

- **Outcomes** are mutually exclusive results of a random processes
- The **probability** of an outcome captures its likelihood of occurring
- The **sample space** is the set of all possible outcomes
- An **event** is a subset of the sample space (e.g. event = roll of a die will be less than 3, event = {roll = 1, roll = 2})

> **📝 Example:**
> For this example let:
> - $X$ = SF-Oakland-Hayward Air Quality Index
> - $Y$ = SF-Oakland-Hayward Air Quality Category
>
> Is $X$ continuous or discrete? $Y$?
> What are **outcomes** for $X$? $Y$?
> What is the sample space for $X$? $Y$?
> What is an example of an event for $X$? $Y$?
>
> - $X$ is continuous, $Y$ is discrete
> - $X$ outcomes: 0, 10, 100, 305, etc.
> - $Y$ outcomes: good, moderate, unhealthy, etc.
> - $X$ sample space: [0, $\infty$]
> - $Y$ sample space: all AQI categories above

---
A random variable is characterized by its **cumulative distribution function** (CDF).
$$F(x) = P(X \le x)$$
which tells us the probability that $X$ is some value $x$ or below
- $P(X\le 5)$ = probability that we see 5 of lower $X$. 

If our random variable $X$ is discrete we define the **probability mass function** (PMF) as the probability that $X$ takes on each value in the support:
- $p(x) = P(X=x)$
- e.g. $X$ = daily AQI category in SF-Oakland-Hayward
- $p(Good) = P(X = Good) \approx \frac{\text{\# days with Good AQI}}{\text{\# days in sample}}$

**CDF of a discrete random variable:**
$$F(X) = \sum_{x' \le x} p(x')$$

**Example:** $X$ has an ordering Good < Moderate < Unhealthy < ...
- $F(\text{Unhealthy}) = P(X \le \text{Unhealthy})$
- $P(X \le \text{Unhealthy}) = p(\text{Good}) + p(\text{Moderate}) + p(\text{Unhealthy})$


You can read the **median** from the CDF chart where y = 0.50.

CDF curve showing cumulative probability for coin flips: The y-axis represents P(X ≤ x) ranging from 0.00 to 1.00, and the x-axis shows the number of heads in 10 flips (0-10). An orange dashed line at y = 0.50 indicates the median, illustrating the point where cumulative probability reaches 50%.


> [!NOTE]
> 
> We know the true probability of getting N heads in 10 flips of a fair coin is given by the binomial distribution:
> $$P(X = N) = \binom{10}{N}\left(\frac{1}{2}\right)^N\left(\frac{1}{2}\right)^{10-N} = \binom{10}{N}\left(\frac{1}{2}\right)^{10}$$
> How many samples of 10 flips do we need to take to get the distribution approximately right?
>
> PMF plot comparing empirical distributions (from 100, 1000, and 100,000 samples) to the theoretical binomial distribution. The x-axis shows the number of heads in 10 flips (0-10), and the y-axis shows P(X=x). The plot demonstrates that as sample size increases, the empirical distribution (shown in red for 100 samples, orange for 1000) converges toward the theoretical distribution (shown in black for 100,000 samples), illustrating the law of large numbers.
> We will return to this idea. 


> **❓ Question:**
> Let $X$ be the the daily average PM$_2.5$ concentration in San Francisco on a random day. Assume $X$ is continuous with PDF $f(x)$ and CDF $F(x)$.
>
> 1. In words, what does $F(12)$ represent?
>    - the probability that a randomly chosen day has PM2.5 at or below 12
> 2. Write an expression (using $f$ or $F$) for $P(12 \le X \le 35)$
>    - $P(12 \le X \le 35) = \int_{12}^{35} f(x)dx = P(12 \le X \le 35) = F(35) - F(12)$
> 3. Write an expression (using $F$) for $P(X > 35)$
>    - $P(X > 35) = 1 - F(35)$
> 4. What is $P(X = 35)$ for a continuous random variable?
>    - $P(X = 35) = 0$ because for a continuous random variable, probability is assigned to intervals, not exact points.


### Joint Distribution

- Many interesting economic questions involve features of the **joint distribution** of two or more random variables
	- e.g. how do earning Y and schooling levels X vary together?
	- e.g. how do pollutants such as NO and Ozone vary together?
- The CDF for the joint distribution is defined by:
  $$F(x, y)= P(X\le x, Y\le y)$$

For discrete (X, Y) we define joint PMF $p(x, y) = P(X = x, Y = y)$

For continuous (X, Y) we define the joint PDF $f(x, y) = \frac{\partial^2}{\partial x \partial y} F(x, y)$

### Conditional Distributions
- Combining joint and marginal distributions gives us conditional distributions of one random variable given another.

**Conditional probability mass function (PMF)**
$$p(y|x) = P(Y = y|X = x) = \frac{P(Y = y|X = x)}{P(X = x)}$$

- e.g. the distribution of earnings given college completion
- e.g. the distribution of PM2.5 on very hot days

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
$$\sum_{i=1}^n(x_i-\bar{x})^2 = \sum_{i=1}^n(x_i^2 - 2x_i\bar{x} + \bar{x}^2)$$
$$= \sum_{i=1}^n x_i^2 - 2\bar{x}\sum_{i=1}^n x_i + n(\bar{x})^2$$
$$= \sum_{i=1}^n x_i^2 - 2n(\bar{x})^2 + n(\bar{x})^2 = \sum_{i=1}^n x_i^2 - n(\bar{x})^2$$


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
for a <u>small</u> changes in x. (RHS is the derivative of function above.)

#### Natural Logarithm
We often refer simply as the **log function**, as
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

```r
ggplot(penguins, aes(x = fct_infreq(species))) +
  geom_bar()
```

Bar chart showing penguin species counts reordered by frequency with Adelie having the highest count (~150), Gentoo intermediate (~120), and Chinstrap lowest (~70).

#### A numerical variable 

##### Histogram
Use `geom_histogram()` with appropriate `bin_width` argument

```r
ggplot(penguins, aes(x = body_mass_g)) +
  geom_histogram(binwidth = 20)
ggplot(penguins, aes(x = body_mass_g)) +
  geom_histogram(binwidth = 2000)
```

Histograms showing penguin body mass distribution with two different bin widths: a granular histogram (binwidth=20) showing detailed frequency distribution across the 3000-6500g range, and a smoother histogram (binwidth=2000) showing three main mass categories with peak frequency around 4000g.

##### Density Plot
A **density plot** is a smoothed-out version of a histogram and a practical alternative, particularly for *continuous data* that comes from an underlying smooth distribution.
Use `geom_density()`.

```r
ggplot(penguins, aes(x = body_mass_g)) +
  geom_density()
```

Smooth density plot showing the distribution of penguin body mass as a continuous curve with a peak around 4000g, clearly visualizing the underlying distribution pattern more intuitively than a histogram.


> [!NOTE]
> ```r
> ggplot(data=penguins, mapping=aes(y=fct_infreq(species))) +
> geom_bar(fill="cyan")
> ```
> Bar chart with cyan-colored filled bars showing species counts: Adelie (~150), Gentoo (~120), Chinstrap (~70).
> 
> ```r
> ggplot(data=penguins, mapping=aes(x=fct_infreq(species))) +
> geom_bar(color="red")
> ```
> Bar chart with red-outlined (not filled) bars showing species counts, demonstrating the difference between fill (interior color) and color (outline/border).


### Visualizing Relationships

We need to have at least two variables mapped to aesthetics of a plot.

#### A numerical and a categorical variable
##### Boxplot
A **boxplot** is a type of visual shorthand for measures of position (percentiles) that describe a distribution. It is also useful for identifying potential outliers. 

Use `geom_boxplot()`

```r
ggplot(penguins, aes(x = species, y = body_mass_g)) +
  geom_boxplot()
```

Boxplot visualization showing body mass distribution by penguin species: boxes represent the interquartile range (IQR) with a line marking the median; whiskers extend to extreme non-outlier values. Adelie (median ~3700g) and Chinstrap (median ~3700g) have similar distributions, while Gentoo shows higher body mass (median ~5000g) with some outliers below the lower whisker.

Alternatively, you can use density plot (`geom_density`) with `color` and `fill` both map to categorical variable in aesthetics, with `alpha` argument in `geom_density`. 
```r
ggplot(data=penguins, mapping=aes(x=body_mass_g, fill=species, color=species)) +
  geom_density(alpha=0.5)
```

Overlaid density plots for penguin body mass by species with 50% transparency (alpha=0.5): Adelie (pink) peaks around 3700g, Chinstrap (green) also peaks around 3700g, and Gentoo (blue) peaks around 5000g, showing clear separation between Gentoo and the other two species in terms of body mass distribution.

> - We *map* variables to aesthetics if we want the visual attribute represented by that aesthetic to vary based on the values of that variable.
> - Otherwise, we *set* the value of an aesthetic. 

#### Two categorical variables

We can use **stacked bar plots** to visualize the relationships between two categorical variables. (`island` and `species` in the example)
```r
ggplot(data=penguins, mapping=aes(x=island, fill=species)) +
	geom_bar()
```

Stacked bar plot showing penguin species composition by island: Biscoe island has all three species with Adelie and Gentoo as major components; Dream island has mostly Adelie and Chinstrap; Torgersen island is dominated by Adelie. Bar heights represent total penguin counts per island, with colors indicating species breakdown.

A **relative frequency plot** is created by setting `position = "fill"` in the geom. 
Additional `labs(y="proportion")` sets y label as "proportion".
```r
ggplot(data=penguins, mapping=aes(x=island, fill=species)) +
	geom_bar(position="fill") +
	labs(y="proportion")
```

Relative frequency plot showing the proportion of each species per island (all bars have equal height representing 100% of penguins on each island): Biscoe has diverse species composition, Dream is split between Adelie and Chinstrap, and Torgersen is almost entirely Adelie, enabling direct comparison of species proportions across islands.

#### Two numerical variables

So far you've learned **scatter plot** `geom_point()` and **smooth curves** `geom_smooth()` for visualizing the relationship between two numerical variables.

```r
ggplot(penguins, aes(x = flipper_length_mm, y = body_mass_g)) +
	geom_point()
```

Scatter plot showing the positive linear relationship between flipper length (x-axis, 170-230mm) and body mass (y-axis, 2500-6500g): penguins with longer flippers tend to have greater body mass, demonstrating a clear correlation between these two physical characteristics.

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

Faceted scatter plots showing flipper length vs body mass relationship for each island separately (Biscoe, Dream, Torgersen), with species distinguished by color and shape. This allows examination of whether the flipper-mass relationship varies by island and provides visual separation of species patterns across geographic locations.

### Saving Plots
`ggsave()` will save the plot most recently created to disk to your working directory.
```r
ggplot(data = penguins, mapping = aes(x = flipper_length_mm, y = body_mass_g)) + 
	geom_point()
ggsave(filename = "penguin-plot.png")
```
# Lecture

> [!Quiz]
> ![[image-30.png]]
> **c. 0.99**
> 
> ![[image-31.png]]
> **c. 0.60**
> $$
> P(S = 1 | E = 1) = \frac{P(E=1|S=1)\cdot P(S=1)}{P(E=1)}
> $$
> 
> $$
> \begin{align}
> P(E = 1) &= P(E=1|S=1)\cdot P(S=1) + P(E=1|S=0)\cdot P(S=0) \\
> &= 0.60 * 0.20 + 0.10 * (1- 0.20) \\
> &= 0.20 
> \end{align}
> $$
> 
> $$
> P(S = 1 | E = 1) = \frac{(0.6)(0.2)}{0.2}=0.6
> $$
> 


## Joint Distributions
Many interesting economic questions involve features of the **joint distribution** of two or more random variables.

- The **joint CDF** is $F_{X, Y}(x, y) = P(X\le x, Y \le y)$
- Joint PMF (**discrete** variables) $p_{X, Y}(x, y) = P(X=x, Y=y)$
- Joint PDF (**continuous** variables) $f_{X, Y}(x,y)=\frac{\partial^2}{\partial x \partial y}F_{X, Y}(x, y)$

## Conditional Distributions
The conditional distribution of $Y|X=x$ is the distribution of $Y$ within the sub-population where $X = x$ 
- e.g. earnings **given** college completion
- e.g. PM$_{2.5}$ **given** very hot day
Update beliefs about $Y$ after observing $X$

## Independence
![[image-32.png]]

> [!Quiz] Independence Quiz
> ![[image-33.png]]
> ![[image-34.png]]
> 
> 1. Exposure to wildfire smoke during pregnancy doesn't affect the risk of preterm birth. When $P(E|S) = P(E)$.
> 2. $P(E=1|S=1)=\frac{20}{100}=0.2$, $P(E=1|S=0)=\frac{30}{900}=0.033$. They are <u>not</u> independent.
> 3. $P(S=1|E=1)=\frac{20}{50}=0.4$. This is the probability of a mother getting exposed to wildfire smoke, given it was a preterm birth. 40% of preterm births were associated with wildfire smoke exposure. 
> 4. No. More wildfires would be from rural areas, and they might have less access to preterm medical care.

## Conditional Independence
![[image-35.png]]
- Let $X$ = temperature, $Y$ = ozone level, and $Z$ = solar radiation
- Looking only at $X$, $Y$ we may see a relationship
- ... but once we condition on sunlight we might find
	- $Y$ is related to $Z$ (sunlight drives ozone formation)
	- $Y$ is independent of $X$ conditioning on $Z$
- What does this suggest about the relationship between $X$ and $Z$? 
- When a third variable explains away an $X - Y$ relationship, $X$ and $Z$ are often correlated (hotter days tend to be sunnier).

> [!Example] Netflix and Conditional Independence
> ![[image-36.png]]
> ![[image-37.png]] 
> ![[image-38.png]]
> ![[image-39.png]]
> ![[image-40.png]]


## Means and Variances
### Means
- The **mean/expectation** is its probability-weighted typical value
- For discrete random variables:
  $$E[X]=\sum_xp(x)x=P(X=x_1)x_1+\dots P(X=x_N)x_N$$
- For continuous random variables:
  $$ E[X] = \int_xf(x)xdx$$
- Other names: mean, expected value, weighted average, center of mass, first moment
- *Important fact*: The expectation operator is <u>linear</u>
  $$E[a+bX] = a+bE[X] $$for constants a, b

> [!QUIZ]
> ![[image-41.png]]
> If we take simple mean by $E[X] = \frac{5+10+150}{3}=55$
> 
> Second interpretation:
> Randomly choose a **student** with equal probability
> X = size of class chosen
> $E[X] = 5 \times \frac{5}{165} + 10 \times \frac{10}{165} + 150 \times \frac{150}{165}\approx137$


## Variances 
![[image-42.png]]
## Covariances
![[image-43.png]]

## Correlation
![[image-44.png]]

> Never trust summary statistics alone; always visualize your data. 
> ![[image-47.png]]

## Means/Variances of Linear Combinations
![[image-45.png]]

## Conditional Expectations
- In economics we are especially interested in **conditional expectations**
- What is the average of $Y$ when $X = x$ (e.g. what are the average earnings among people who went to UCB)?
- Conditional expectation function:
	- $E[Y|X=x]=\sum_y y \times p(y|x)$ if discrete
	- $E[Y|X=x]=\int_y y \times f(y|x)dy$ if continuous


## The Law of Iterated Expectations (LIE)
- A very important result for us: the Law of Iterated Expectations (LIE)
- Suppose we want the average **fuel economy** of the cars people drive
- The LIE says I can:
	1. Compute the average MPG for Cars
	2. Compute the average MPG for SUVs/Trucks
	3. Average the average MPGS (proportional to the fraction of vehicles)

$$ 
\begin{align}
E[MPG] &= E[MPG | Car]P(Car) + E[MPG | SUV/Truck]P(SUV/Truck) \\
&=E[E[MPG|Type]]
\end{align}
$$

![[image-46.png]]

## Mean Independence vs. Uncorrelatedness
- Two random variables $A$ and $B$ are **mean-independent** if $E[A|B=b]=E[A]$ for all $b$.
	- Knowing $B$ doesn't change the average of $A$. 
- If $A$ and $B$ are mean-independent then they are uncorrelated (converse doesn't hold true!)
- independent ➡️ mean independent (but not ⬅️)


---
# DA 3

## R - Data Transformation

Key tools for transforming a data frame.

### Introduction
We'll focus on the `dplyr` package, another core member of the `tidyverse`.
```r
library(tidyverse)

# If not installed, install.packages("tidyverse")
```

The dataset we will be using is from `nycflights13` package, and plotting will be done with `ggplot2`. 

The primary `dplyr` functions mostly have in common:
1. The first argument is always a `data frame`.
2. The subsequent arguments typically describe which columns to operate on using the variable names (without quotes).
3. The output is always a new data frame.

We commonly will combine multiple verbs using the pipe `|>` operator. (pronounce as "then")

`dplyr`'s functions are organized into four groups based on what they operate on: **rows**, **columns**, **groups**, or **tables**.

### Rows

- `filter()`
- `arrange()`
- `distinct()`

#### `filter()`

`filter()` allows you to keep rows based on the values of the columns. 

For example, selecting all flights that departed more than 2 hours late:
```r
flights |> 
  filter(dep_delay > 120)
#> # A tibble: 9,723 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      848           1835       853     1001           1950
#> 2  2013     1     1      957            733       144     1056            853
#> 3  2013     1     1     1114            900       134     1447           1222
#> 4  2013     1     1     1540           1338       122     2020           1825
#> 5  2013     1     1     1815           1325       290     2120           1542
#> 6  2013     1     1     1842           1422       260     1958           1535
#> # ℹ 9,717 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

You can also combine conditions with `&` or `,` to indicate "and" (both are and) or with `|` to indicate "or":

```r
# Flights that departed on January 1
flights |> 
  filter(month == 1 & day == 1)
#> # A tibble: 842 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 836 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …

# Flights that departed in January or February
flights |> 
  filter(month == 1 | month == 2)
#> # A tibble: 51,955 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 51,949 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

There's a useful shortcut similar to Python's `in` operator: `%in%`. It keeps rows where the variable equals one of the values on the right:
```r
# A shorter way to select flights that departed in January or February
flights |> 
  filter(month %in% c(1, 2))
#> # A tibble: 51,955 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 51,949 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```


When you run `filter()` function, new data frame is generated, but not saved.
If you want to save the created data frame, use `<-` operator:
```r
jan1 <- flights |> 
  filter(month == 1 & day == 1)
```


#### `arrange()`

`arrange()` changes the order of the rows based on the value of the columns.

```r
flights |> 
  arrange(year, month, day, dep_time)
#> # A tibble: 336,776 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

```r
flights |> 
  arrange(desc(dep_delay))
#> # A tibble: 336,776 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     9      641            900      1301     1242           1530
#> 2  2013     6    15     1432           1935      1137     1607           2120
#> 3  2013     1    10     1121           1635      1126     1239           1810
#> 4  2013     9    20     1139           1845      1014     1457           2210
#> 5  2013     7    22      845           1600      1005     1044           1815
#> 6  2013     4    10     1100           1900       960     1342           2211
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

#### `distinct()`

Finds all unique rows, for the column combination if specified. 

```r
# Remove duplicate rows, if any
flights |> 
  distinct()
#> # A tibble: 336,776 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …

# Find all unique origin and destination pairs
flights |> 
  distinct(origin, dest)
#> # A tibble: 224 × 2
#>   origin dest 
#>   <chr>  <chr>
#> 1 EWR    IAH  
#> 2 LGA    IAH  
#> 3 JFK    MIA  
#> 4 JFK    BQN  
#> 5 LGA    ATL  
#> 6 EWR    ORD  
#> # ℹ 218 more rows


# Find all unique origin and destination pairs,
#    while keeping all other columns too
flights |> 
  distinct(origin, dest, .keep_all = TRUE)
#> # A tibble: 224 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 218 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

> [!NOTE] `count()`
> If you want to find the number of occurrences instead, you need to use `count()` function. With the `sort = TRUE`, you can arrange them in descending order of the number of occurrences. 
> ```r
> flights |>
  count(origin, dest, sort = TRUE)
#> # A tibble: 224 × 3
#>   origin dest      n
#>   <chr>  <chr> <int>
#> 1 JFK    LAX   11262
#> 2 LGA    ATL   10263
#> 3 LGA    ORD    8857
#> 4 JFK    SFO    8204
#> 5 LGA    CLT    6168
#> 6 EWR    ORD    6100
#> # ℹ 218 more rows
> ```


---
### Columns

#### `mutate()`

To add new columns that are calculated from the existing columns, use `mutate()`.

```r
flights |> 
  mutate(
    gain = dep_delay - arr_delay,
    speed = distance / air_time * 60
  )
#> # A tibble: 336,776 × 21
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 13 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

For specifying where to add new columns, use `.before` or `.after`
```r
flights |> 
  mutate(
    gain = dep_delay - arr_delay,
    speed = distance / air_time * 60,
    .before = 1
  )
#> # A tibble: 336,776 × 21
#>    gain speed  year month   day dep_time sched_dep_time dep_delay arr_time
#>   <dbl> <dbl> <int> <int> <int>    <int>          <int>     <dbl>    <int>
#> 1    -9  370.  2013     1     1      517            515         2      830
#> 2   -16  374.  2013     1     1      533            529         4      850
#> 3   -31  408.  2013     1     1      542            540         2      923
#> 4    17  517.  2013     1     1      544            545        -1     1004
#> 5    19  394.  2013     1     1      554            600        -6      812
#> 6   -16  288.  2013     1     1      554            558        -4      740
#> # ℹ 336,770 more rows
#> # ℹ 12 more variables: sched_arr_time <int>, arr_delay <dbl>, …

flights |> 
  mutate(
    gain = dep_delay - arr_delay,
    speed = distance / air_time * 60,
    .after = day
  )
```

You can also control which variables are kept with the `.keep` argument. A particularly useful argument is `.keep = "used"` which specifies that we only keep the columns that were involved or created in the `mutate()` step. For example, the following output will contain only the variables `dep_delay`, `arr_delay`, `air_time`, `gain`, `hours`, and `gain_per_hour`. 

```r
flights |> 
  mutate(
    gain = dep_delay - arr_delay,
    hours = air_time / 60,
    gain_per_hour = gain / hours,
    .keep = "used"
  )
```

#### `select()`

- Select columns by name:
```r
flights |>
    select(year, month, day)
```

- Select all columns between year and day (inclusive):
```r
flights |>
    select(year:day)
```

- Select all columns except those from year to day (inclusive):
```r
flights |>
    select(!year:day)
```

- Select all columns that are characters:
```r
flights |>
    select(where(is.character))
```

There are a number of helper functions you can use within `select()`:
- `starts_with("abc")`: matches names that begin with "abc".
- `ends_with("xyz")`: matches names that end with "xyz".
- `contains("ijk")`: matches names that contain "ijk".
- `num_range("x", 1:3)`: matches `x1`, `x2` and `x3`.
- `any_of(c("year", "month", "day", "dep_delay"))`

You can rename variables as you `select()` them by using `=`. The new name appears on the LHS. 
```r
flights |> 
  select(tail_num = tailnum)
#> # A tibble: 336,776 × 1
#>   tail_num
#>   <chr>   
#> 1 N14228  
#> 2 N24211  
#> 3 N619AA  
#> 4 N804JB  
#> 5 N668DN  
#> 6 N39463  
#> # ℹ 336,770 more rows
```


#### `rename()`
If you want to keep all the existing variables and just want to rename a few, you can use `rename()` instead of `select()`: 
```r
flights |> 
  rename(tail_num = tailnum)
#> # A tibble: 336,776 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

> If you have a lot of columns to rename, check out `janitor::clean_names()` which provides some useful automated cleaning.


#### `relocate()`

By default, `relocate()` moves variables to the front:
```r
flights |> 
  relocate(time_hour, air_time)
#> # A tibble: 336,776 × 19
#>   time_hour           air_time  year month   day dep_time sched_dep_time
#>   <dttm>                 <dbl> <int> <int> <int>    <int>          <int>
#> 1 2013-01-01 05:00:00      227  2013     1     1      517            515
#> 2 2013-01-01 05:00:00      227  2013     1     1      533            529
#> 3 2013-01-01 05:00:00      160  2013     1     1      542            540
#> 4 2013-01-01 05:00:00      183  2013     1     1      544            545
#> 5 2013-01-01 06:00:00      116  2013     1     1      554            600
#> 6 2013-01-01 05:00:00      150  2013     1     1      554            558
#> # ℹ 336,770 more rows
#> # ℹ 12 more variables: dep_delay <dbl>, arr_time <int>, …

# You can use .after and .before like `mutate`
flights |> 
  relocate(year:dep_time, .after = time_hour)
flights |> 
  relocate(starts_with("arr"), .before = dep_time)
```


### The Pipe

You can start combining multiple functions with pipe (`|>`)
For example, imagine that you want to find the fastest flights to Houston's `IAH` airport: you need to combine `filter()`, `mutate()`, `select()`, and `arrange()`:
```r
flights |> 
  filter(dest == "IAH") |> 
  mutate(speed = distance / air_time * 60) |> 
  select(year:day, dep_time, carrier, flight, speed) |> 
  arrange(desc(speed))
#> # A tibble: 7,198 × 7
#>    year month   day dep_time carrier flight speed
#>   <int> <int> <int>    <int> <chr>    <int> <dbl>
#> 1  2013     7     9      707 UA         226  522.
#> 2  2013     8    27     1850 UA        1128  521.
#> 3  2013     8    28      902 UA        1711  519.
#> 4  2013     8    28     2122 UA        1022  519.
#> 5  2013     6    11     1628 UA        1178  515.
#> 6  2013     8    27     1017 UA         333  515.
#> # ℹ 7,192 more rows
```

### Groups

#### `group_by()`

Use `group_by()` to divide your dataset into groups meaningful for your analysis:
```r
flights |> 
  group_by(month)
#> # A tibble: 336,776 × 19
#> # Groups:   month [12]
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

`group_by()` doesn't change the data but, you'll notice that the output indicates that it is "grouped by" month (`Groups: month [12]`). This means subsequent operations will now work "by month". 

#### `summarize()`
The most important grouped operation is a summary, used to calculate a single summary statistic. 

You must specify `na.rm = TRUE` in order to ignore all missing (`NA`) values.
```r
flights |> 
  group_by(month) |> 
  summarize(
    avg_delay = mean(dep_delay, na.rm = TRUE)
  )
#> # A tibble: 12 × 2
#>   month avg_delay
#>   <int>     <dbl>
#> 1     1      10.0
#> 2     2      10.8
#> 3     3      13.2
#> 4     4      13.9
#> 5     5      13.0
#> 6     6      20.8
#> # ℹ 6 more rows
```

There are many useful summaries to call in `summarize()`. One very useful summary is `n()`, which returns the number of rows in each group:
```r
flights |> 
  group_by(month) |> 
  summarize(
    avg_delay = mean(dep_delay, na.rm = TRUE), 
    n = n()
  )
#> # A tibble: 12 × 3
#>   month avg_delay     n
#>   <int>     <dbl> <int>
#> 1     1      10.0 27004
#> 2     2      10.8 24951
#> 3     3      13.2 28834
#> 4     4      13.9 28330
#> 5     5      13.0 28796
#> 6     6      20.8 28243
#> # ℹ 6 more rows
```


#### `slice_` functions
- `df |> slice_head(n = 1)`: takes the first row from each group.
- `df |> slice_tail(n = 1)`: takes the last row from each group.
- `df |> slice_min(x, n = 1)`: takes the row with the smallest value of column `x`.
- `df |> slice_max(x, n = 1)`: takes the row with the largest value of column `x`.
- `df |> slice_sample(n = 1)`: takes one random row.

You can vary `n` to select more than one row, or instead of `n =`, you can use `prop = 0.1` to select (e.g.) 10% of the rows in each group. 

```r
flights |> 
  group_by(dest) |> 
  slice_max(arr_delay, n = 1) |>
  relocate(dest)
#> # A tibble: 108 × 19
#> # Groups:   dest [105]
#>   dest   year month   day dep_time sched_dep_time dep_delay arr_time
#>   <chr> <int> <int> <int>    <int>          <int>     <dbl>    <int>
#> 1 ABQ    2013     7    22     2145           2007        98      132
#> 2 ACK    2013     7    23     1139            800       219     1250
#> 3 ALB    2013     1    25      123           2000       323      229
#> 4 ANC    2013     8    17     1740           1625        75     2042
#> 5 ATL    2013     7    22     2257            759       898      121
#> 6 AUS    2013     7    10     2056           1505       351     2347
#> # ℹ 102 more rows
#> # ℹ 11 more variables: sched_arr_time <int>, arr_delay <dbl>, …
```

Note that there are 105 destinations but we got 108 rows here. `slice_min()` and `slice_max()` keep tied values so `n=1` means give us all rows with the largest value. If you want exactly one row per group you can set `with_ties = FALSE`.

#### Grouping by Multiple Variables

You can create groups using more than one variable.
```r
daily <- flights |>  
  group_by(year, month, day)
daily
#> # A tibble: 336,776 × 19
#> # Groups:   year, month, day [365]
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```

After using `summarize()`, each summary peels off the last group (`day` in our example). 
```r
daily_flights <- daily |> 
  summarize(n = n())
#> `summarise()` has grouped output by 'year', 'month'. You can override using
#> the `.groups` argument.
```

You can explicitly request it in order to suppress the message:
```r
daily_flights <- daily |> 
  summarize(
    n = n(), 
    .groups = "drop_last"
  )
```

Alternatively, change the default behavior by setting a different value, e.g., `"drop"` to drop all grouping or `"keep"` to preserve the same groups.

#### Ungrouping

```r
daily |> 
  ungroup()
#> # A tibble: 336,776 × 19
#>    year month   day dep_time sched_dep_time dep_delay arr_time sched_arr_time
#>   <int> <int> <int>    <int>          <int>     <dbl>    <int>          <int>
#> 1  2013     1     1      517            515         2      830            819
#> 2  2013     1     1      533            529         4      850            830
#> 3  2013     1     1      542            540         2      923            850
#> 4  2013     1     1      544            545        -1     1004           1022
#> 5  2013     1     1      554            600        -6      812            837
#> 6  2013     1     1      554            558        -4      740            728
#> # ℹ 336,770 more rows
#> # ℹ 11 more variables: arr_delay <dbl>, carrier <chr>, flight <int>, …
```


#### `.by`

`dplyr` 1.1.0 includes a new syntax for per-operation grouping, the `.by` argument. 
```r
flights |> 
  summarize(
    delay = mean(dep_delay, na.rm = TRUE), 
    n = n(),
    .by = month
  )
  
  flights |> 
  summarize(
    delay = mean(dep_delay, na.rm = TRUE), 
    n = n(),
    .by = c(origin, dest)
  )
```


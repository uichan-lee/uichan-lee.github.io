# Expressions and Contitionals 

## R Expressions

R Code is composed of a series of *expressions*. So far, we've been using **simple expressions** like the following ones:
```r
# assignment statement
a <- 12345

# arithmetic expression
525 + 34 - 280

# function call
median(1:10)
```


It is also possible to group several simple expressions using `;` and `{}` in R:
```r
a <- 10; b <- 20; c <- 30
```
Although this is a perfectly valid expression, we recommend avoiding semicolons since they make code harder to review

Another way to group expressions is by wrapping them within braces:
```r
{
	a <- 10
	b <- 20
	c <- 30
}
```
R will treat this as one "unit" or "block" of code

## Compound Expressions

- Compound expressions consist of multiple simple expressions
- Compound expressions require braces `{}`
- Simple expressions in a compound expression can be separated by semicolons or newlines

> [!IMPORTANT] Every expression has a value
> The value of an expression is the <u>last evaluated statement</u>.
> ```r
> {5 + 3; 4 * 2; 1 + 1}
> # [1] 2
> ```

![[image-34.png]]


When do we use (compound) expressions?
- conditionals (if-else)
- iterations
- functions

---
## Conditionals

**If-else** or **if-then-else**

Conditionals make it possible to choose between two (possibly compound) expressions depending on the value of a **logical condition**.

> ### Toy Example
> 
> ```r
> x <- rnorm(1) # random number from normal distribution
> 
> if (x > 0) {
> 	print("negative")
> } else if (x > 0) {
> 	print("positive")
> } else (x == 0) {
> 	print("zero")
> }
> ```


- `if()` takes a *logical* condition
- the condition must be a logical value *of length one*
- it executes the next statement if the condition is `TRUE`
- if the condition is `FALSE`, then it executes the expressions in the `else` clause

When you don't care about the `else` clause, R is actually *nullifyling* the else clause:
```r
x <- norm(1)

if (x < 0) {
	print("negative")
} else NULL
```

![[image-35.png]]

### `switch()` function

Working with multiple chained if's becomes cumbersome, for example:
```r
# Convert the day of the week into a number
day <- "Tuesday" # Change this value!

if (day == 'Sunday') {
  num_day <- 1
} else if (day == "Monday") {
  num_day <- 2
} else if (day == "Tuesday") {
  num_day <- 3
} else if (day == "Wednesday") {
  num_day <- 4
} else if (day == "Thursday") {
  num_day <- 5
} else if (day == "Friday") {
  num_day <- 6
} else if (day == "Saturday") {
  num_day <- 7
}
```

If you find yourself using many if-else statements with identical structure for slightly different cases, you may want to consider a **switch** statement instead:

```r
# Convert the day of the week into a number
day <- "Tuesday" # Change this value!

switch(
  day, # The expression to be evaluated
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7,
  NA) # an (optional) default value if there are no matches
```

### Congruent Vectors Strategy

As we saw it, if-statements don't work well with vectors. 
For example, suppose we want to transform a vector `x` so that:
- Negative elements are set to 0.
- Non-negative elements are squared.

![[image-36.png]]

Instead, use the so-called **congruent vectors** strategy which involves:
1. An input vector (or vectors) to use in conditions.
2. An output vector to store the results. 

Use the input vector to conditionally assign elements to the output vector. 
```r
x <- c(-4, 5, 10, -3, 2, 1)
output <- x
output[x < 0] <- 0
output[x > 0] <- x[x > 0]^2
output
# [1] 0 25 100 0 4 1
```

### `ifelse()` function

- R also has a vectorized `ifelse()` function.
- `ifelse()` can be useful when the "condition" evaluates into a logical vector that doesn't have just one element

```r
x <- c(-1, 10, 20, -3)
ifelse(x < 0, 0, x)
# [1] 0 10 20 0
```

> The `ifelse()` function is not the panacea; it is less efficient than the congruent vectors strategy.

### `dplyr`'s `case_when()`

Interestingly, the package "dplyr" provides its general vectorized `if-else` function called `case_when()`
- This function allows you to vectorize multiple `if-else` statements
- Each case is evaluated sequentially
- The first match for each element determines the corresponding value in the output vector
- The tilde `~` operator is used to determine the assigned value in each case

```r
x <- c(-1, 10, 20, -3) 

case_when(
	x >= 0 ~ x^2,
	x < 0 ~ 0,
	.default = NA
)
```
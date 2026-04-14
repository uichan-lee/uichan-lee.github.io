# Intro to Functions

In this part, we describe:
- the syntax for creating functions in R
- the parts of an R function
- various aspects about the arguments of functions

## Functions

- You can create functions with the function `function()`
- The arguments (inputs) go inside paranthesis, separated by commas
- The code of the function is surrounded by braces (i.e. an R *expression*)

### Writing functions

```r
square <- function(x) {
	x^2
}

# Curly braces are optional if the body is a single expression.
square <- function(x) x^2
```

If the body of a function is a compound expression, we have to use braces:
```r
sum_sqr <- function(x, y) {
	xy_sum <- x + y
	xy_ssqr <- (xy_sum)^2
	list(sum = xy_sum,
	     sumsqr = xy_ssqr)
}

sum_sqr(3, 5)

# $sum
# [1] 8

# $sumsqr
# [1] 64
```

Once defined, functions can be used in other function definitions:
```r
sum_of_squares <- function(x) {
	sum(square(x))
}

sum_of_squares(1:5)
# [1] 55
```

> [!NOTE] Nested Functions
> We can also define a function inside another function:
> ```r
> sum_of_squares <- function(x) {
> 	square <- function(x) {
> 		x^2
> 	}
> 	sum(square(x))
> }
> 
> sum_of_squares(1:5)
> # [1] 55
> ```

---

### Anatomy of a function

Conceptual structure of a function:
```r
function_name <- function(arg1, arg2, etc) {
	expression_1
	expression_2
	...
	expression_n
}
```

- Generally we will assign the function to a name
- A function takes one or more inputs (or none), known as **arguments**
- The expressions forming the operations comprise the **body** of the funtion
- A function made of a simple expression doesn't require braces
- Functions return a <u>single value</u>

```r
square <- function(x) x^2
```
- the function's name is `square`
- it has one argument `x`
- the function's body consists of one simple expression
- it returns the value `x^2`

> [!IMPORTANT] Function Names
> Different ways to name functions:
> - `square()`
> - `squ_are()`
> - `s.quare()`
> - `Square()`
> - `.square()`: a function starts with a dot is a valid name, but the function will be a *hidden function*
> 
> Invalid names:
> - `5quare()`: cannot begin with a number
> - `_square()`: cannot begin with an underscore
> - `squ-are()`: cannot use hyphenated names


---

## Output of a Function

The value (i.e. output) of a function can be established in two ways:
- As the last evaluated simple expression (in the body)
- An explicitly **returned** value via `return()`

Recall that:
- The body of a function is an expression
- Remember that every expression has a value
- Hence every function has a value

Every function has a value (i.e. output)
```r
cm2in <- function(x) {
	x * 0.3937     # processing and output
}
```
Recall that every expression has a value: the value of the last statement that is evaluated; in this case is x * 0.3937

Many users prefer to explicitly use a **return()** statement
```r
cm2in <- function(x) {
	y <- x * 0.3937 # processing
	return(y)       # output
}
```

Avoid using `print()` statement for for `return()` value! 

> [!EXAMPLE] `return()` versus `print()`
> - The function `print()` is a **generic** method in R.
> - This means that `print()` has a different behavior depending on its input.
> - Unless you want to print intermediate results while the function is being executed, there is no need to return the output via `print()`

Keep in mind that depending on what's returned or what's the last evaluated expression, just calling a function might not print anything:
```r
cm2in <- function(x) {
	y <- x * 0.3937    # processing
}

cm2in(5)
```
In this case, the function works and the function has a value, which is the *assignment expression* `y <- x * 0.3937`. If the returned value is *assignment expression*, R does return the value (5 * 0.3937 = 1.9685), but **invisibly**. 

```r
cm2in <- function(x) {
	y <- x * 0.3937    # processing
}

z = cm2in(5)
z
# [1] 1.9685
```
In this case, since we assigned the invisible returned value 1.9685, we can check by printing z. 

---

### The `return()` command

`return()` can be useful when the output may be obtained in the middle of the function's body.
```r
plus_minus <- function(x, y, add = TRUE) {
	if (add) {
		return(x + y)
	} else {
		return(x - y)
	}
}

plus_minus(2, 3, add = TRUE)
# [1] 5

plus_minus(2, 3, add = FALSE)
# [1] -1
```


Likewise, to exit the function and return a result early, use `return()`:
```r
square <- function(x) {
	if (!is.numeric(x)) {
		return(NA)
	}
	x^2
}

square(6)
# [1] 36

square("hi")
# [1] NA
```

---

### Function Arguments

Functions can have any number of arguments (even zero)
```r
# 2 arguments
add <- function(x, y) x + y

# no arguments
hi <- function() print("Hi There!")

hi()
# "Hi There!"
```

Arguments can have default values (highly recommended!)
```r
hey <- function(x = "") {
	cat("Hey", x, "\nHow is it going?")
}

hey()
# Hey
# How is it going?

hey("Mike")
# Hey Mike
# How is it going? 
```

If you specify an argument with no default value, you must give it a value everytime you call the function, otherwise you'll get an error:
![[image-38.png]]

Sometimes we don't want to give default values, but we also don't want to cause an error. We can use `missing()` to see if an argument is missing:
```r
abc <- function(a , b, c = 3) {
	if (missing(b)) {
		return ((a * 2) + c)
	} else {
		return((a * b) + c)
	}
}

abc(1)
# [1] 5

abc(1, 4)
# [1] 7
```

You can also set an argument value to `NULL` if you don't want to specify a default value:
```r
abc <- function(a, b, c = 3, d = NULL) {
	if (is.null(d)) {
		return((a * b) + c)
	} else {
		return((a * b) + (c * d))
	}
}

abc(1, 2)
# [1] 5

abc(1, 2, 3, 4)
# [1] 14
```

Arguments of functions can be:
- positional
```r
plus <- function(x, y) x + y
```
- named
```r
plus <- function(x = 1, y = 1) x + y
```

For named arguments, you can mix the order:
```r
normal_distrib <- function(x, mu = 0, sigma = 1) {...}

normal_distrib(2)
normal_distrib(2, sigma = 3, mu = 1)
normal_distrib(mu = 1, sigma = 3, 2)
normal_distrib(mu = 1, 2, sigma = 3)
```

R is "smart" enough in doing pattern matching with arguments' names (not recommended though)
```r
normal_distrib(2)
# [1] 0.05399097

normal_distrib(2, m = 0, s = 1)
# [1] 0.05399097

normal_distrib(2, sig = 1, m = 0)
# [1] 0.05399097
```

> [!NOTE] Lazy Evaluation
> In R, function arguments are **lazily evaluated**: they're only evaluated if needed.
> For example, this code doesn't cause any problems because `x` is never used:
> ```r
> toss <- function(x) {
> 	sample(c("heads", "tails"), size = 1)
> }
> 
> toss()
> ```

---
### The dots parameter

The **dots** parameter `...` accepts any number of arguments, and it is often used to forward arguments to another function.

For example:
```r
# Mean function with tolerance:
mean_tol <- function(x, tol, ...) {
	mean(x[x > tol], ...)
}

mean_tol(c(1, 3, 5, 0.01, 0.2, NA), 0.5)
# [1] NA

mean_tol(c(1, 3, 5, 0.01, 0.2, NA), 0.5, na.rm = TRUE)
# [1] 3

mean(c(1, 3, 5))
# [1] 3
```

You can access elements of `...` with the `...elt()` function:
```r
hey <- function(x, ...) {
	...elt(2)
	x + ...elt(1)
}

hey(3, 5, message("hi"))
# hi
# [1] 8
```

You can convert `...` to a list with the `list()` function:
```r
hey <- function(...) list(...)

hey(hi = 1, 3, 4)
# $hi
# [1] 1

# [ [2]]
# [1] 3

# [ [3]]
# [1] 4
```

---

## Conditions

There are three main functions for generating warnings and errors:
- `message()`: to print an informative message
- `warning()`: to raise a warning message (without stopping execution)
- `stop()`: to stop execution raising an error


---
### Stop Execution
Use `stop()` to stop execution of a function (raising an error)
```r
meansd <- function(x, na.rm = FALSE) {
	if (!is.numeric(x)) {
		stop("input must be numeric")
	}
	
	# output
	c(mean = mean(x, na.rm = na.rm),
	  sd = sd(x, na.rm = na.rm))
}
```

```r
# ok 
meansd(c(4, 5, 3, 1, 2))
#     mean       sd
# 3.000000 1.581139

# this causes an error
meansd(c('a', 'b', 'c'))
# Error in meansd(c("a", "b", "c")) : input must be numeric
```

---
### Warning Messages
A `warning()` is useful when we don't want to stop the execution, but we still want to show potential problems
```r
meansd <- function(x, na.rm = FALSE) {
	if (!is.numeric(x)) {
		warning("non-numeric input coerced to numeric")
		x <- as.numeric(x)
	}
	# output
	c(mean = mean(x, na.rm = na.rm),
	  sd = sd(x, na.rm = na.rm))
}
```

---

### Generic Messages
Use `message()` to display a generic message that is not an error or warning.
```r
meansd <- function(x, na.rm = FALSE) {
	if (!is.numeric(x)) {
		message("non-nuemric input detected")
		return(NA)
	}
	# output
	c(mean = mean(x, na.rm = na.rm),
	  sd = sd(x, na.rm = na.rm))
}
```

```r
# no message
meansd(c(4, 5, 3, 1, 2))
#     mean       sd
# 3.000000 1.581139

# message
meansd(c(TRUE, FALSE, TRUE, FALSE))
# non-numeric input detected
# [1] NA
```

---

## Documenting Functions

Documenting a function involves adding descriptions for what the purpose of a function is, the inputs it accepts, and the output it produces.
- Description: what the function does
- Input(s): what are the inputs or arguments
- Output: what is the output (returned value)

There are several approaches for writing documentation of a function. One option to document a function is by simply adding a short description of what the arguments should be like. In this case, the description is outside the function. 

```r
# function for addign two numbers
# x: number
# y: number
add <- function(x, y) {
	x + y
}
```

In this case, the description is between `<-` and `function()`
```r
add <- 
	# function for addign two numbers
	# x: number
	# y: number
	function(x, y) {
	x + y
}
```

In this case, the description is inside the function
```r
add <- function(x, y) {
	# function for addign two numbers
	# x: number
	# y: number
	x + y
}
```

In this case, the description is inside the function
```r
# description of arguments
compound_interest <- function(principal = 1, rate = 0.01,
							  periods = 1, time = 1)
{
	# principal = Principal Amount
	# rate = Annual Nominal Interest Rate as a decimal
	# time = Time Involved in years
	# periods = number of compounding periods per unit time
	principal * (1 + rate / periods) ^ (time * periods)
}
```

> [!NOTE] Roxygen Comments
> One interesting option to document functions is by using **roxygen comments**
> 
> ```r
> #` @tilde Standardize
> #` @description Transforms values in standard units
> #` @param x numeric vector
> #` @param na.rm whether to remove missing values
> #` @return standardized values
> #` @examples
> #`   standardize(runif(10))
> standardize <- function(x, na.rm = FALSE) {
> 	z <- (x - mean(x, na.rm = na.rm)) / sd(x, na.rm = na.rm)
> 	return(z)
> }
> ```
> 
> Roxygen comments are R comments formed by the hash symbol immediately followed by an apostrophe: **#\`**
> You specify the label of a field with `@` and a keyword: e.g. `@title`.
> The syntax highlighting of RStudio recognizes this type of comments and labels. 
> 
> ![[image-39.png]]


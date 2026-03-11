
![[image.png]]

R provides several data structures, each suited for different kinds of data:
- `vector`s and `factor`s
- `matrix` (2-D array)
- `array` (n-dimensional generalization of a matrix)
- `list` (can hold mixed types)
- `data.frame` (tabular data, like a spreadsheet)

---
# Vectors
A **vector** is the most basic data structure in R.
So we can say that R is a *vector-based* language.
There are two flavors of vectors: **atomic** and **list**.
![[image-1.png]]

```r
# atomic vector
a = c(1, 2, 3)
a

# list (non-atomic vector)
b = list(1, "two", TRUE)
b
```

## Atomic Vectors
The simplest atomic vectors are single values (also called *scalars*, though R treats them as length-1 vectors).
```r
# logical
a <- TRUE

# integer
x <- 10L

# double (real)
y <- 5

# character
b <- "yosemite"
```

An atomic vector with more than one element can be created with the function `c()`, short for **catenate** (or **combine**):
```r
x <- c(1, 2, 3, 4, 5)

y <- c("one", "two", "three")

z <- c(TRUE, FALSE, TRUE)
```

Other than the four types above (logical, integer, double, and character), there are two more (less used) data types: `complex` and `raw`. 


> [!NOTE] Data Types
> - A **logical** vector holds `TRUE`, `FALSE` values.
> - An **integer** vector holds integers (no decimal component)
> - A **double** vector holds double precision ("real") numbers
> - A **character** vector holds character strings
> - A **complex** vector holds complex numbers (not in course material)
> - A **raw** vector holds raw bytes (not in course material)


Atomic vectors are contiguous cells of data with the following properties:
- Can be of any length (including zero) — check with `length()`
- Have a single, specific data type — check with `typeof()`
- Optionally, elements can be named — get/set with `names()`
- Can carry additional metadata — inspect with `attributes()`

Use `typeof()` to find the data-type of an atomic vector:
```r
a <- TRUE
typeof(a) # logical

b <- 1L
typeof(b) # integer

x <- 5
typeof(x) # double

y <- "chicken"
typeof(y) # character
```

Both integer and double are grouped together under the numeric category:
```r
x <- 1L
is.numeric(x) # TRUE

y <- 5
is.numeric(y) # TRUE

z <- "go"
is.numeric(z) # FALSE
```

Among R users, it is common to refer to the **mode** of a vector, and to use the `mode()` function as a pseudo-equivalent of data-type:
![[image-2.png]]


---
## Coercion

> [! Question] 
> What happens if you mix different data types in a vector?
> ```r
> x <- c(1, 2, 3, "four", "five")
> y <- c(TRUE, FALSE, 3, 4)
> z <- c(TRUE, 1L, 2 + 3i, pi)
> ```
> ---
> If you mix different data values, R will **implicitly coerce** them so they are all of the same type.
> 
> ```r
> # mixing numbers and characters
> x <- c(1, 2, 3, "four", "five")
> x
> # [1] "1" "2" "3" "four" "five"
> 
> # mixing numbers and logical values
> y <- c(TRUE, FALSE, 3, 4)
> y
> # [1] 1 0 3 4
> 
> # mixing characters and logical values
> z <- c(TRUE, FALSE, "TRUE", "FALSE")
> z
> # [1] "TRUE" "FALSE" "TRUE" "FALSE"
> 
> # mixing integer, real, and complex numbers
> w <- c(1L, -0.5, 3 + 5i)
> w
> # [1] 1.0+0i -0.5+0i 3.0+5i
> ```

R follows a hierarchy of data types when applying implicit coercion — values are always promoted to the *most general* type present:
$$logical < integer < double < character$$


### Explicit Coercion Functions
R provides a set of **explicit** coercion functions that allow us to manually convert one type of data into another:
- `as.character()` — convert to character strings
- `as.integer()` — convert to integers
- `as.double()` — convert to double-precision numbers
- `as.numeric()` — convert to numeric (equivalent to `as.double()`)
- `as.logical()` — convert to logical values

Note: Depending on the input, explicit coercion may produce warnings or `NA` values if the conversion is not meaningful.

```r
x <- c(1L, -0.5, 3 + 5i)
as.integer(x)
# [1] 1 0 3
# Warning message:
# imaginary parts discarded in coercion
```


---
## Vectorization and Recycling

Example of a **vectorized code**:
```r
vec1 <- c(1, 2, 3)
vec2 <- c(2, 4, 6)

vec1 + vec2
# [1] 3 6 9
```

![[image-3.png]]
Vectorized code refers to operations that are performed on the contents of `vec1` and `vec2`, **element-by-element** at the same time.

```r
# addition
c(1, 2, 3) + c(3, 2, 1)
# [1] 4 4 4

# multiplication
c(1, 2, 3) * c(3, 2, 1)
# [1] 3 4 3

# power
c(1, 2, 3) ^ c(3, 2, 1)
# [1] 1 4 3
```

All arithmetic, trigonometric, math and other vector functions are vectorized:
```r
log(c(1, 2, 3))
# [1] 0.0000000 0.6931472 1.0986123

cos(seq(1, 3))
# [1]  0.5403023 -0.4161468 -0.9899925

sqrt(1:3)
# [1] 1.000000 1.414214 1.732051
```

### Recycling

What happens if you operate on two vectors of different length, in which one of them is a one element ("scalar") vector?
```r
vec <- c(1, 2, 3, 4)
vec + 3
# [1] 4 5 6 7
```

This is an example of **recycling** and vectorization. The value 3 gets <u>recycled</u> as many times as the length of longer vector `vec`, and then vectorization applies. 

![[image-4.png]]


> [! QUESTION] Recycling
> What happens if you operate on two vectors (of length > 1) that have different lengths?
> ```r
> c(1, 3, 5, 7) + c(2, 4)
> # [1] 3 7 7 11
> ```
> The same **recycling rule** applies: the shorter vector is replicated enough times so that the result has the length of the longer vector.
> 
> What if the length of the longer vector is <u>not</u> a multiple of the shorter vector?
> ```r
> c(1, 3, 5, 7, 9) + c(2, 4)
> # [1] 3 7 7 11 11
> # Warning mesage:
> # In c(1, 3, 5, 7, 9) + c(2, 4) :
> #    longer object length is not a multiple of shorter object length
> ```
> We can get the result as expected, but with a warning message. 

## General Functions
- `typeof(x)`
- `str(x)`
- `class(x)`
- `length(x)`
- `head(x)`
- `tail(x)`
- `summary(x)`

```r
# 데이터 정의
ages <- c(20, 15, 43, 22, 54, 92, 54, 33, 28)

# 1. typeof(ages): 데이터의 물리적 저장 타입 (숫자는 기본적으로 double)
typeof(ages)
# [1] "double"

# 2. str(ages): 구조 확인 (타입, 인덱스 범위, 값 요약)
str(ages)
#  num [1:9] 20 15 43 22 54 92 54 33 28

# 3. class(ages): 객체의 지향적 클래스 (숫자 벡터는 numeric)
class(ages)
# [1] "numeric"

# 4. length(ages): 원소의 개수
length(ages)
# [1] 9

# 5. head(ages): 앞부분 6개 데이터 확인
head(ages)
# [1] 20 15 43 22 54 92

# 6. tail(ages): 뒷부분 6개 데이터 확인
tail(ages)
# [1] 22 54 92 54 33 28

# 7. summary(ages): 기술 통계량 (최솟값, 사분위수, 평균, 최댓값 등)
summary(ages)
#    Min. 1st Qu.  Median    Mean 3rd Qu.    Max. 
#   15.00   22.00   33.00   44.56   54.00   92.00
```

---
## Numeric Vectors 

```r
# positive integers: from 1 to 5
1:5

# negative integers: from -7 to -2
-7:-2

# decreasing integers: from 3 to -3
3:-3

# non-integers
-2.5:2.5
```

### `seq()`
For more flexible numeric sequences (with custom step sizes), use the function `seq()`:

```r
# sequences
seq(from = 1, to = 5)
seq(from = -3, to = 9)
seq(from = -3, to = 9, by = 0.5)
seq(from = 1, to = 20, length.out = 5)
```

- `seq_along()` returns a sequence of integers of the same length as its argument (useful for safe loop indexing)
- `seq_len()` generates a sequence from 1 to the specified length

```r
# some flavors
flavors <- c("chocolate", "vanilla", "lemon")

# sequence of integers from flavors
seq_along(flavors)
# [1] 1 2 3

# sequence from 1 to 5
seq_len(5)
# [1] 1 2 3 4 5
```

### `rep()`
Another way to create vectors is with the replicating function `rep()` that allows you to create several repetition patterns.

```r
rep(1, times = 5)
rep(c(2, 4, 6), times = 2)
rep(1:3, each = 2)
rep(c(2, 4, 6), length.out = 5)
rep(c(2, 4, 6), each = 2, times = 2)
```


### Random Vectors

R provides a series of random number generation functions:

![[image-5.png]]

```r
runif(n = 5, min = 0, max = 1)
rnorm(n = 5, mean = 0, sd = 1)
rbinom(n = 5, size = 1, prob = 0.5)
rbeta(n = 5, shape1 = 0.5, shape2 = 0.5)
```

### Sampled Vectors
There's also the function `sample()` that generates random samples (with and without replacement)
```r
# shuffle
sample(1:10, size = 10)

# sample with replacement
values <- c(2, 3, 6, 7, 9)
sample(values, size = 20, replace = TRUE)
```

### Basic Vector Functions

- `length()`: number of elements in a vector
- `sort()`: returns elements in sorted order (does *not* modify the original)
- `rev()`: reverses the order of elements
- `order()`: returns the *indices* that would sort the vector
- `unique()`: returns only the distinct elements
- `duplicated()`: returns a logical vector indicating which elements are duplicates

```r
num <- c(9, 4, 5, 1, 4, 1, 4, 7)
length(num)
# [1] 8

sort(num)
# [1] 1 1 4 4 4 5 7 9

sort(num, decreasing = TRUE)
# [1] 9 7 5 4 4 4 1 1

rev(num)
# [1] 7 4 1 4 1 5 4 9

order(num)
# [1] 4 6 2 5 7 3 8 1

order(num, decreasing = TRUE)
# [1] 1 8 3 2 5 7 4 6

unique(num)
# [1] 9 4 5 1 7

duplicated(num)
# [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE FALSE

num[duplicated(num)]
# [1] 4 1 4 
```

---
## Math Operations

![[image-6.png]]

![[image-7.png]]

```r
abs(c(-1, -0.5, 3, 0.5))
# [1] 1.0 0.5 3 0.5

sign(c(-1, -0.5, 3, 0.5))
# [1] -1 -1 1 1

round(3.141592, 2)
# [1] 3.14

```

## Comparison Operator

```r
values <- -3:3

values > 0
# [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE

values < 0
# [1] TRUE TRUE TRUE FALSE FALSE FALSE FALSE

values == 0
# [1] FALSE FALSE FALSE TRUE FALSE FALSE FALSE

c(1, 2, 3, 4, 5) > 2
# [1] FALSE FALSE TRUE TRUE TRUE

c(1, 2, 3, 4, 5) >= 2
# [1] FALSE TRUE TRUE TRUE TRUE

c(1, 2, 3, 4, 5) < 2
# [1] TRUE FALSE FALSE FALSE FALSE

# And more (e.g., <=, ==, !=)
```

When comparing vectors of different types, R coerces one to the type of the other. The order of precedence (from highest to lowest) is: character > complex > numeric > integer > logical.
```r
'5' == 5
# [1] TRUE

5L == 5
# [1] TRUE

5 + 0i == 5
# [1] TRUE
```

In addition to comparison operators, we have the functions `all()` and `any()`

```r
all(c(1, 2, 3, 4, 5) > 0)

all(c(1, 2, 3, 4, 5) > 1)

all(c(1, 2, 3, 4, 5) < 0)

all(c(1, 2, 3, 4, 5) > 4)
```


## Summary Statistics

- `max(x)`: maximum
- `min(x)`: minimum
- `range(x)`: range values
- `mean(x)`: mean
- `median(x)`: median
- `var(x)`: variance
- `sd(x)`: standard deviation
- `IQR(x)`: interquartile range

```r
x <- 1:7
max(x)
min(x)
range(x)
mean(x)
var(x)
sd(x)
prod(x)
sum(x)
```

## `which()` functions

- `which()`: returns the indices where a logical condition is `TRUE`
- `which.min()`: returns the index of the first minimum value
- `which.max()`: returns the index of the first maximum value

```r
(values <- -3:3)
# [1] -3 -2 -1 0 1 2 3

# logical comparison
values > 0
# [1] FALSE FALSE FALSE FALSE TRUE TRUE TRUE

# positions (i.e. indices) of positive values
which(values > 0)
# [1] 5 6 7

# indices of various comparisons
which(values < 0)
# [1] 1 2 3

which(values == 0)
# [1] 4

values[which(values > 0)]
# [1] 1 2 3

which.max(values)
# [1] 7

which(values = max(values))
# [1] 7

which.min(values)
# [1] 1

which(values == min(values))
# [1] 1
```

## Set Operations

- `union(x, y)`
- `intersect(x, y)`
- `setdiff(x, y)`
- `setequal(x, y)`
- `is.element(el, set)`
- `%in%` operator

## Vector Manipulation
![[image-8.png]]

### Indexing
`vec[index]`
- To extract values from R objects use brackets: `[ ]`
- Inside the brackets specify a vector of indices
- Vector of indices can be of type numeric (integer or double), logical, and sometimes character

```r
x <- c(2, 4, 6, 8)

# adding names
names(x) <- letters[1:4]

x
# a b c d
# 2 4 6 8

x[1]
# a
# 2

x[2]
# b
# 4

x[length(x)]
# d
# 8

x[0]
# named numeric(0)
# index starts at 1

x[1:3]
# a b c
# 2 4 6

x[c(1, 3)]
# a c
# 2 6

x[c(3, 2, 4, 1)]
# c b d a
# 6 4 8 2

x[c(3, 2, 4, 1, 1, 1)]
# c b d a a a 
# 6 4 8 2 2 2

x[-2]
# a c d
# 2 6 8

x[-c(1, 3)]
# b d
# 4 8

x[c(TRUE, FALSE, FALSE, FALSE)]
# a
# 2

x[c(FALSE, TRUE, TRUE, TRUE)]
# b c d
# 4 6 8

x[x == 2]
# a
# 2

x[x != 2]
# b c d
# 4 6 8

# You can use a character index vector as long as x has named elements:
x["a"]
# a
# 2

x[c("b", "d")]
# b d
# 4 8

x[rep("a", 4)]
# a a a a
# 2 2 2 2


```

### Double Brackets `[[ ]]`
![[image-9.png]]

You can also use double brackets `[[ ]]` to extract a **single element**. Unlike single brackets, double brackets strip the name and return just the value:

```r
x <- c(a = 2, b = 4, c = 6, d = 8)
x
# a b c d
# 2 4 6 8

x[[2]]
# [1] 4

x[["a"]]
# [1] 2
```

With double brackets, you **cannot** pass an index vector of length greater than one
```r
x[[1:2]]
```
![[image-10.png]]

# Factors

One of the nicest features about R is that it provides a data structure exclusively designed to handle categorical data: **factors**.

- `factor()`: create a factor, takes vector as input
- `levels()`: provides access to the levels attribute of a factor
- `nlevels()`: gives the number of levels (i.e. categories)
- `length()`: gives the number of elements
- `is.factor()`: tells if an object is of class "factor"
- `as.factor()`: coerces an object into a factor
- `is.ordered()`: checks if an object is an *ordered* factor

```r
# numeric vector
num_vector <- c(1, 2, 3, 7, 9)

# creating a factor from num_vector
first_factor <- factor(num_vector)
first_factor
# [1] 1 2 3 7 9
# Levels: 1 2 3 7 9


# string vector
str_vector <- c('a', 'b', 'c', 'd', 'c', 'a', 'b')
str_vector
# [1] "a" "b" "c" "d" "c" "a" "b"

second_factor <- factor(str_vector)
second_factor
# [1] a b c d c a b
# Levels: a b c d
```

Under the hood, the way R stores factors is as vectors of integer values. 
```r
# storage of factor
storage.mode(first_factor)
# [1] "integer"

first_factor[3]
# [1] 5
# Levels: 1 3 5 7 9

first_factor[rep(c(TRUE, FALSE), length.out = 5)]
# [1] 1 3 9
# Levels: 1 2 3 7 9
```

If you have a factor with named elements, you can also specify the names of the elements within the brackets:

```r
names(first_factor) <- letters[1:length(first_factor)]
first_factor
# a b c d e 
# 1 2 3 7 9
# Levels: 1 2 3 7 9

first_factor[c('b', 'e', 'd')]
# b e d
# 2 9 7
# Levels: 1 2 3 7 9
```

Factors have an additional attribute that vectors don't: `levels`. And as you can expect, the class of a factor is indeed `"factor"` (not "vector")

```r
# attributes of a factor
attributes(first_factor)

attributes(first_factor)
# $levels
# [1] "1" "2" "3" "7" "9"

# $class
# [1] "factor"

# $names
# [1] "a" "b" "c" "d" "e"
```


Factors can also encode **ordinal** variables — categorical data with a meaningful order. While nominal variables (e.g., colors, countries) work fine as character vectors, <u>ordinal variables</u> like sizes ("small", "medium", "large") or college years ("freshman", "sophomore", "junior", "senior") have an inherent ranking that character vectors cannot represent.

R's solution is to use **ordered factors**, which preserve both the categories and their ordering:
```r
sizes <- factor(
	x = c('sm', 'md', 'lg', 'sm', 'md'),
	levels = c('sm', 'md', 'lg'),
	ordered = TRUE)
	
sizes
# [1] sm md lg sm md
# Levels: sm < md < lg
```

> [! NOTE] Function `factor()`
> The usage of the function `factor()` is:
> ```r
> factor(x, levels, labels = levels, exclude = NA,
>     ordered = is.ordered(x), nmax = NA)
> ```
> 
> - `x` a vector of data
> - `levels` an optional vector for the categories
> - `labels` an optional character vector of labels for the levels
> - `exclude` a vector of values to be excluded when forming the set of levels
> - `ordered` logical value to indicate if the levels should be regarded as ordered
> - `nmax` an upper bound on the number of levels

> [! NOTE] Merging Levels
> Sometimes we may need to **merge** or collapse two or more different levels into one single level. We can achieve this with `levels()` by assigning a new vector of levels containing repeated values for those categories that we wish to merge.
> 
> ```r
> first_factor_merged <- first_factor_copy
> first_factor_merged
> # [1] I II III I II III II
> # Levels: I II III
> 
> levels(first_factor_merged) <- c("I+III", "II", "I+III")
> first_fector_merged
> # [1] I+III II I+III I+III II I+III II
> # Levels: I+III II
> ```


### Ordinal Factors
```r
ordered(num_vector)
# [1] 1 2 3 1 2 3 2
# Levels: 1 < 2 < 3

factor(num_vector, ordered = TRUE)
# [1] 1 2 3 1 2 3 2
# Levels: 1 < 2 < 3
```
# Matrices
![[image-11.png]]

We can transform a vector into an **n-dimensional array** by assigning it a dimensions attribute via `dim()`.
```r
# positive: from 1 to 8
x <- 1:8

# adding `dim`
dim(x) <- c(2, 4)
x

##      [,1] [,2] [,3] [,4]
## [1,]    1    3    5    7
## [2,]    2    4    6    8
```

- A vector can be given a `dim` attribute
- The `dim` attribute is a numeric vector of length *n* (one value per dimension)
- R reorganizes the elements of the vector into *n* dimensions
- Each dimension will have as many rows (or columns, etc.) as the corresponding value in the `dim` vector
- **Important**: R fills dimensions in **column-major** order (fills down columns first)

```r
# dim attribute with 3 dimensions
dim(x) <- c(2, 2, 2)
x

## , , 1 
## 
##      [,1]  [,2] 
## [1,]    1     3 
## [2,]    2     4 
## 
## , , 2 
## 
##      [,1]  [,2] 
## [1,]    5     7 
## [2,]    6     8
```


A `dim` attribute of length 2 will convert a vector into a **matrix**.
```r
A <- 1:8
class(A)
## [1] "integer"

dim(A) <- c(2, 4)
class(A)
## [1] "matrix" "array"
```

When using `dim()`, R always fills by columns (column-major order).
To control how a matrix is filled (by rows or by columns), use the `matrix()` function with the `byrow` argument:

```r
# vector to matrix
A <- 1:8

matrix(A, nrow = 2, ncol = 4)
#      [,1] [,2] [,3] [,4]
# [1,]    1    3    5    7
# [2,]    2    4    6    8
```
- An R matrix is a *rectangular* 2D data structure
- Create one by passing a vector to `matrix()` with `nrow` and `ncol` arguments
- Row and column names can be assigned for readability
- Internally, matrices are stored as vectors — so they are also **atomic** (all elements must be the same type)
- Storage order is **column-major** (elements fill down each column before moving to the next)

## Creating a Matrix
```r
hp <- c("Harry", "Ron", "Hermione", "Potter", "Weasley", "Granger") 
# matrix filled up by columns 
matrix(hp, nrow = 3)
#      [,1]       [,2]     
# [1,] "Harry"    "Potter" 
# [2,] "Ron"      "Weasley"
# [3,] "Hermione" "Granger"
```

Here's another way to create the same matrix
```r
# vector of names 
hp <- c("Harry", "Potter", "Ron", "Weasley", "Hermione", "Granger") 
# matrix filled up by rows 
matrix(hp, nrow = 3, byrow = TRUE)
#      [,1]       [,2]     
# [1,] "Harry"    "Potter" 
# [2,] "Ron"      "Weasley"
# [3,] "Hermione" "Granger"
```

## Row and Column Names

R provides functions that let you set / get the names for either the rows or the columns (or both) of a matrix:
- `rownames()`
- `colnames()`
- `dimnames()`

```r
A <- matrix(runif(12), nrow = 3, ncol = 4)
rownames(A) <- paste0("row", 1:nrow(A))
A
#           [,1]      [,2]      [,3]      [,4]
# row1 0.9350425 0.9935303 0.6562896 0.8411784
# row2 0.1776413 0.4607735 0.6352256 0.4632204
# row3 0.7971414 0.4552023 0.2446020 0.2763164

rownames(A)
# "row1" "row2" "row3"

colnames(A) <- paste0("col", 1:ncol(A))
A
#           col1      col2      col3      col4
# row1 0.9350425 0.9935303 0.6562896 0.8411784
# row2 0.1776413 0.4607735 0.6352256 0.4632204
# row3 0.7971414 0.4552023 0.2446020 0.2763164

dimnames(A)
# [1]
# [1] "row1" "row2" "row3"

# [2]
# [1] "col1" "col2" "col3" "col4"
```

```r
D <- matrix(runif(12), nrow = 3, ncol = 4)
dimnames(D) <- list(
	paste0("row", 1:nrow(D)),
	paste0("col", 1:ncol(D))
)
D
#           col1      col2       col3       col4
# row1 0.8724660 0.3997758 0.03666098 0.77132468
# row2 0.9109457 0.4466267 0.73974498 0.97545818
# row3 0.7012174 0.6134672 0.12402886 0.07455895
```


## Recycling 

Recycling rules also apply to matrices
```r
x <- letters[1:4]
X <- matrix(x, nrow = 4, ncol = 3)
X
#      [,1] [,2] [,3]
# [1,] "a"  "a"  "a" 
# [2,] "b"  "b"  "b" 
# [3,] "c"  "c"  "c" 
# [4,] "d"  "d"  "d"
```

```r
# "empty" matrices
mat_chr <- matrix("", nrow = 4, ncol = 3)

mat_num <- matrix(0, nrow = 4, ncol = 3)

mat_lgl <- matrix(NA, nrow = 4, ncol = 3)
```

## Matrix Manipulation

### Subsetting Cells
![[image-12.png]]

![[image-13.png]]
![[image-14.png]]
![[image-15.png]]
![[image-16.png]]

### `apply()` Function

The `apply()` function lets you apply a function across rows or columns of a matrix without writing explicit loops.

```r
X = matrix(rep(1:3, each = 5), nrow = 5, ncol = 3)
X
#      [,1] [,2] [,3]
# [1,]    1    2    3
# [2,]    1    2    3
# [3,]    1    2    3
# [4,]    1    2    3
# [5,]    1    2    3
```

`MARGIN = 1` applies the function across each **row**:
```r
apply(X, MARGIN = 1, FUN = sum)
# [1] 6 6 6 6 6
```

`MARGIN = 2` applies the function across each **column**:
```r
apply(X, MARGIN = 2, FUN = sum)
# [1]  5 10 15
```

```r
Y = matrix(1:15, nrow = 5, ncol = 3)
Y
#      [,1] [,2] [,3]
# [1,]    1    6   11
# [2,]    2    7   12
# [3,]    3    8   13
# [4,]    4    9   14
# [5,]    5   10   15

apply(Y, MARGIN = 1, FUN = mean)
# [1]  6  7  8  9 10

# descriptive stats of elements in each row (MARGIN = 1)
apply(Y, MARGIN = 1, FUN = summary)
#         [,1] [,2] [,3] [,4] [,5]
# Min.     1.0  2.0  3.0  4.0  5.0
# 1st Qu.  3.5  4.5  5.5  6.5  7.5
# Median   6.0  7.0  8.0  9.0 10.0
# Mean     6.0  7.0  8.0  9.0 10.0
# 3rd Qu.  8.5  9.5 10.5 11.5 12.5
# Max.    11.0 12.0 13.0 14.0 15.0
```


## Matrix Algebra
### Operators and Functions

![[image-17.png]]

> **Key rule**: Make sure the dimensions of matrices are *conformable* (compatible) when performing matrix operations. For example, matrix multiplication `A %*% B` requires that `ncol(A) == nrow(B)`.

![[image-18.png]]

---
# Lists 

![[image-19.png]]

- A `list` is the most general and flexible data structure in R
- It is a **generic (non-atomic) vector** — unlike atomic vectors, elements can be of different types
- Lists can contain any other data structure: vectors, matrices, data frames, functions, and even other lists
- This flexibility makes lists ideal for storing complex, heterogeneous data

> [!EXAMPLE] Creating a `list` of `vector`s
> To create a list we use the function `list()`
> ```r
> # list of vectors (of equal length)
> list1 <- list(
> 	1:3,
> 	c(TRUE, FALSE, TRUE),
> 	c("a", "b", "c")
> )
> 
> # list of vectors (of different length)
> list2 <- list(
> 	1:3,
> 	c(TRUE, FALSE),
> 	c("a", "b", "c", "d")
> )
> ```

> [!IMPORTANT] No vectorization with R lists
> Lists are very convenient because they allow you to store multiple kinds of objects in a single place. This power of lists comes with a price: you lose *vectorization*.
> ```r
> vec = c(2, 4, 6, 8)
> sqrt(vec)
> ## [1] 1.414214 2.000000 2.449490 2.828427
> 
> # no vectorization with lists
> lst = list(2, 4, 6, 8)
> sqrt(lst)
> ## Error in sqrt(lst): non-numeric argument to mathematical function
> ```

## `List` indexing

![[image-20.png]]

### Dollar Operator
![[image-21.png]]

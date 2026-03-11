---
title: "STAT 33B - Week 4: Matrices and Lists"
date: Feb 9
course: STAT 33B
---

# Matrices

R data structures overview showing atomic vs non-atomic structures across dimensions:

| Dimensions | Single Data Type (Atomic) | Multiple Data Types (Non-Atomic) |
|---|---|---|
| 1D | Vector | List |
| 2D | **Matrix** | Data Frame |
| nD | Array | - |

We can transform a vector in an **n-dimensional array** by giving it a dimensions attribute `dim`.

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

- a vector can be given a `dim` attribute
- a `dim` attribute is a numeric vector of length *n*
- R will reorganize the elements of the vector into *n* dimensions
- each dimension will have as many rows (or columns, etc.) as the *n*-th value of the `dim` vector.

```r
# dim attribute with 3 dimensions
dim(x) <- c(2, 2, 2)
x

## , , 1

##      [,1]  [,2]
## [1,]    1     3
## [2,]    2     4

## , , 2

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

When using `dim()`, R always fills up each matrix by columns. To have more control about how a matrix is filled, (by rows or columns) we use the `matrix()` function:

```r
# vector to matrix
A <- 1:8

matrix(A, nrow = 2, ncol = 4)
#      [,1] [,2] [,3] [,4]
# [1,]    1    3    5    7
# [2,]    2    4    6    8
```

- An R matrix provides a *rectangular* data object; i.e. to handle data in a two-dimensional array
- To create a matrix, give a vector to `matrix()` and specify number of rows and columns
- You can also assign row and column names to a matrix
- R internally stores matrices as vectors.
- Which means that matrices are also atomic.
- Matrices in R are stored **column-major** (i.e. by columns).

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

Matrix indexing uses the format `mat[row_index, column_index]`:

**Single Cell Access:**
- `mat[2,2]` - Extract element at row 2, column 2

**Row Slicing:**
- `mat[2, ]` - Extract entire row 2 (all columns)
- `mat[2:3, ]` - Extract rows 2-3 (all columns)
- `mat[c(1,3,5), ]` - Extract rows 1, 3, 5 with specific indices
- `mat[-2, ]` - Exclude row 2 (all other rows)
- `mat[-c(2:3), ]` - Exclude rows 2-3

**Column Slicing:**
- `mat[ ,2]` - Extract entire column 2 (all rows)
- `mat[ ,2:3]` - Extract columns 2-3 (all rows)
- `mat[ ,c(1,3,5)]` - Extract columns 1, 3, 5 with specific indices
- `mat[ ,-2]` - Exclude column 2 (all other columns)
- `mat[ ,-(2:3)]` - Exclude columns 2-3

**Combined Row and Column Selection:**
- `mat[c(1,3,5), c(2,4)]` - Extract rows 1, 3, 5 AND columns 2, 4

### `apply()` function

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

Sum of elements in each row `MARGIN = 1`

```r
apply(X, MARGIN = 1, FUN = sum)
# [1] 6 6 6 6 6
```

Sum of elements in each column `MARGIN = 2`

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

| Operator | Description | Example |
|---|---|---|
| `+` | Addition | A + B |
| `-` | Subtraction | A - B |
| `*` | Element-wise product | A * B |
| `%*%` | Matrix product | A %*% B |
| `t()` | Transpose | t(A) |
| `det()` | Determinant | det(A) |
| `diag()` | Extract diagonal | diag(A) |
| `solve()` | Inverse | solve(A) |

Additional matrix functions for decompositions and advanced operations:

| Function | Description |
|---|---|
| `upper.tri()` | Upper triangular part of a matrix |
| `lower.tri()` | Lower triangular part of a matrix |
| `eigen()` | Eigenvalue decomposition |
| `svd()` | Singular value decomposition |
| `lu()` | Triangular decomposition |
| `qr()` | QR decomposition |
| `chol()` | Cholesky decomposition |

Make sure the dimensions of matrices are conformable when using an operator or some calculation on them.

---

# Lists

A **list** is a generic container that can hold elements of different types, including other lists. Lists are the most general data structure in R.

Structure of a list showing multiple containers with different types:
- A list is the most general data structure in R
- Recall that an R list is a generic (non-atomic) vector
- Lists can contain any other type of data structure
- Lists can even contain other lists

> **📝 Example: Creating a list of vectors**
>
> To create a list we use the function `list()`
>
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

> [!IMPORTANT]
> No vectorization with R lists
>
> Lists are very convenient because they allow you to store multiple kinds of objects in a single place. This power of lists comes with a price: you lose *vectorization*.
>
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

## List Indexing

### Single Bracket Indexing

Single bracket indexing `list[index]`:
- First list element: Shown in an orange box labeled "1st list element (in its box)"
- Double bracket unboxing: `lis[[1]]` - Unboxed 1st list element
- Nested indexing: `lis[[1]][2]` - 2nd element of 1st list element

With single brackets `list[index]`, you extract a sub-list containing the selected elements (still in a "box").

### Double Bracket Indexing

Double bracket indexing `list[[index]]`:
- Unboxes the element and extracts it
- Can use with names for named lists: `list[[name]]`
- Returns a vector of the name and list: `list$name`

### Dollar Operator

The dollar operator `$` provides named access to list elements:
- Format: `list_name$element_name`
- For named lists with elements like "vec1", "vec2", "vec3"
- Access with `list$vec1` - Unboxes vec1 object
- Access with `list$vec1[2]` - 2nd element of vec1 object

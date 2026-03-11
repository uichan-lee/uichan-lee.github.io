---
title: "STAT 33B - Midterm Review"
course: STAT 33B
---

## Atomic vs. Non-Atomic Objects

### Atomic Objects

All elements are the same data type.

```r
# The 6 atomic types in R
logical    <- c(TRUE, FALSE, TRUE)
integer    <- c(1L, 2L, 3L)
double     <- c(1.1, 2.2, 3.3)
complex    <- c(1+2i, 3+4i)
character  <- c("a", "b", "c")
raw        <- charToRaw("hello")

# Check with is.atomic()
is.atomic(c(1, 2, 3))      # TRUE
is.atomic("hello")          # TRUE
```

If you mix types, R coerces everything to the most flexible type:

```r
c(1, TRUE, "a")   # → c("1", "TRUE", "a")  — all become character
c(1, TRUE)        # → c(1, 1)              — logical becomes double
```

**Atomic 1D - Vector**

```r
v <- c(10, 20, 30)

length(v)     # 5
is.atomic(v)  # TRUE

v[2]          # 20
```

**Atomic 2D - Matrix**

```r
m <- matrix(1:9, nrow = 3, ncol = 3)
#      [,1] [,2] [,3]
# [1,]    1    4    7
# [2,]    2    5    8
# [3,]    3    6    9

dim(m)        # 3 3
is.atomic(m)  # TRUE

m[2, 3]       # 8
```

### Non-Atomic Objects

Containers that can hold multiple types at once.

```r
my_list <- list(1, "hello", TRUE, c(1,2,3))

# Data frame — list of equal-length vectors
df <- data.frame(
	name = c("Alice", "Bob"),      # character
	age = c(25, 30),               # double
	pass = c(TRUE, FALSE)          # logical
)

# Check
is.atomic(my_list) # FALSE
is.atomic(df)      # FALSE
```

**Non-Atomic 1D - List**

```r
l <- list(42, "hello", TRUE)

# [[1]]  42
# [[2]]  "hello"
# [[3]]  TRUE

dim(l)        # NULL
length(l)     # 3
is.atomic(l)  # FALSE

l[[2]]        # "hello"
```

**Non-Atomic 2D - DataFrame**

```r
df <- data.frame(
  name  = c("Alice", "Bob", "Carol"),
  age   = c(25, 30, 28),
  pass  = c(TRUE, FALSE, TRUE)
)

#    name  age  pass
# 1  Alice  25  TRUE
# 2  Bob    30  FALSE
# 3  Carol  28  TRUE

dim(df)        # 3 3
is.atomic(df)  # FALSE

df[2, 3]       # FALSE  (row 2, col 3)
df$name        # "Alice" "Bob" "Carol"
```

---

## Vectors

### Creating Vectors

```r
# Integer vectors
int_vec <- c(4L, 8L, 12L)

# Logical vectors
log_vec <- rep(c(TRUE, TRUE), length.out = 5)
log_vec
# [1] TRUE TRUE TRUE TRUE TRUE
```

### Explicit Coercion

```r
# Convert double vector to character
as.character(c(1, 2, 3))

# Convert character vector to integer
as.integer(c("1", "2", "3"))
# [1] 1 2 3

# Convert double vector to logical
as.logical(c(1, 0, 1))
# [1] TRUE FALSE TRUE
```

---

## Factors

Factors can set `level = c("Large", "Medium", "Small")` to indicate the set of possible categorical variables. With `ordered = TRUE`, it can also denote the hierarchy.

Factors contain values as integer index, and prints the values at the index of the level. Changing the level changes the output.

```r
f1 <- factor(c("C", "B", "C", "A"), level=c("A", "B", "C"), ordered=TRUE)
```

**Note**: If the level is **NOT specified**, R automatically sorts levels in *alphabetical order*.

```r
f <- factor(c("low", "medium", "low", "high"))
f
# [1] low medium low high
# Levels: high low medium

levels(f)
# [1] "high" "low" "medium"
```

---

## Matrix

```r
mat1 <- matrix(1:9, nrow=3, ncol=3, byrow=TRUE)

mat2 <- rbind(1:3, 4:6, 7:9)

mat3 <- cbind(seq(1, 7, 3), seq(2, 8, 3), seq(3, 9, 3))

mat3[1, 2] # 2
```

---

## Lists

**Lists** can contain multiple types of data.

```r
lst1 <- list(
    Name = "Mike",
    Age = 31,
    Male = TRUE,
    meals = c("Cookie", "Chicken", "Rice")
)

lst1$Age
# [1] 31

lst1["Age"]
# $Age
# [1] 31
typeof(lst1["Age"])
# [1] "list"

lst1[["Age"]]
# [1] 31
typeof(lst1[["Age"]])
# [1] "double"
```

**3 ways to access data:**

1. `lst_name$col_name`: returns a vector of `col_name`
2. `lst_name["col_name"]`: returns a list of `col_name`
3. `lst_name[["col_name"]]`: returns a vector of `col_name` (same as `$`)

---

## Data Frame

`data.frame` is a **list** with same length `vector`s. Each column is a single vector.

```r
mydf <- data.frame(
	name = c("Ricky", "Micah", "Soyeon"),
	age = c(22, 21, 22),
	female = c(FALSE, FALSE, TRUE)
)
```

### Subsetting Operators

1. `df[, "col_name"]`: returns a vector of single column
2. `df[, c("col1", "col2", "col3")]`: returns a data frame with specified columns and all rows
3. `df["col_name"]`: returns a data frame with single specified column with all rows
4. `df[c("col1", "col2")]`: returns a data frame with specified columns and all rows
5. `df[["col_name"]]`: returns a vector of single column
6. `df$col_name`: returns a vector of single column

You can also put row indexing, like `df[c(1, 2), "col"]`

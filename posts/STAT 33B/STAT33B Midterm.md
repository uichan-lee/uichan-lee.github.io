
## Atomic vs. Non-Atomic Objects

**Atomic Objects**
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

> If you mix types, R coerces everything to the most flexible type:
> ```r
> c(1, TRUE, "a")   # → c("1", "TRUE", "a")  — all become character
> c(1, TRUE)        # → c(1, 1)              — logical becomes double
> ```

- Atomic 1D - `Vector`
```r
v <- c(10, 20, 30)

length(v)     # 3
is.atomic(v)  # TRUE

v[2]          # 20
```

- Atomic 2D - `Matrix`
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

**Non-Atomic Objects**
Containers that can hold elements of multiple types at once (heterogeneous).
```r
my_list <- list(1, "hello", TRUE, c(1,2,3)) # Data frame — list of equal-length vectors 
df <- data.frame(
	name = c("Alice", "Bob"), # character 
	age = c(25, 30), # double 
	pass = c(TRUE, FALSE) # logical 
) 

# Check 
is.atomic(my_list) # FALSE 
is.atomic(df) # FALSE
```

- Non-Atomic 1D - List
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

- Non-Atomic 2D - DataFrame
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

## Vectors

Creating vectors:
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
# [1] "1" "2" "3"

# Convert character vector to integer
as.integer(c("1", "2", "3"))
# [1] 1 2 3

# Convert double vector to logical
as.logical(c(1, 0, 1))
# [1] TRUE FALSE TRUE
```

### Vector Subsetting

```r
scores <- c(alex = 81, blair = 90, casey = 77, drew = 88)

# Blair's score
scores["blair"]

# Alex and Drew's scores
scores[c("alex", "drew")]

# Exclude Casey's score
scores[-2]

# Extract all scores >= 85
scores[scores >= 85]
```


> [! IMPORTANT] Recycling
> If a vector operation involves vectors of different lengths, R automatically does *recycling* — the shorter vector is repeated to match the length of the longer one.
> 
> ```r
> # Arithmetic operation:
> 
> c(1, 2, 3, 4, 5, 6) + c(10, 20)
> # c(10, 20) ➡️ c(10, 20, 10, 20, 10, 20)
> # [1] 11 22 13 24 15 26
> 
> c(1, 2, 3, 4) * 2
> # 2 ➡️ c(2, 2, 2, 2)
> # [1] 2 4 6 8
> 
> 
> # Logical Indexing
> x <- c(10, 20, 30, 40)
> x[c(TRUE, FALSE)]
> # [1] 10 30
> 
> # Matrix Operations
> mat <- matrix(1:6, nrow=2)
> mat + c(10, 20)
> # c(10,20) → 각 column에 반복 적용
> #      [,1] [,2] [,3]
> # [1,]   11   13   15
> # [2,]   22   24   26
> ``` 

## Factors

Use `levels = c(...)` to define the set of possible categories. Adding `ordered = TRUE` creates an **ordered factor** that preserves the hierarchy between levels.

Under the hood, factors store values as integer indices that map to the levels vector. Changing the levels changes how values are displayed.

```r
f1 <- factor(c("C", "B", "C", "A"), level=c("A", "B", "C"), ordered=TRUE)
```

> If the level is <u>NOT specified</u>, R automatically sorts level in *alphabetical order*.
> ```r
> f <- factor(c("low", "medium", "low", "high"))
> f
> # [1] low medium low high
> # Levels: high low medium
> levels(f)
> # [1] "high" "low" "medium"
> ```



## Matrix
```r
mat1 <- matrix(1:9, nrow=3, ncol=3, byrow=TRUE)

mat2 <- rbind(1:3, 4:6, 7:9)

mat3 <- cbind(seq(1, 7, 3), seq(2, 8, 3), seq(3, 9, 3))

mat3[1, 2] # 2
```

## Lists

**Lists** can contain elements of multiple types and different lengths.
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

3 ways to access list elements:
1. `lst$name` — returns the element directly (a vector)
2. `lst["name"]` — returns a **sub-list** containing the element
3. `lst[["name"]]` — returns the element directly, same as `$`

> **Key distinction**: `[` returns a list (like a train car), while `[[` and `$` extract the contents (like opening the car).

## Data Frame

A `data.frame` is essentially a **list of equal-length vectors**. Each column is a single vector, and all columns must have the same number of rows.

```r
mydf <- data.frame(
	name = c("Ricky", "Micah", "Soyeon"),
	age = c(22, 21, 22),
	female = c(FALSE, FALSE, TRUE)
)
```

### Subsetting Operators

| Syntax | Returns | Type |
|--------|---------|------|
| `df[, "col"]` | Single column | vector |
| `df[, c("a", "b")]` | Multiple columns, all rows | data.frame |
| `df["col"]` | Single column, all rows | data.frame |
| `df[c("a", "b")]` | Multiple columns, all rows | data.frame |
| `df[["col"]]` | Single column | vector |
| `df$col` | Single column | vector |

> Row indexing can be combined: e.g., `df[c(1, 2), "col"]` returns rows 1 and 2 of the specified column.

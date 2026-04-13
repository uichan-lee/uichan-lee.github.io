# Iterations and Loops

Many times we need to perform a procedure *several times*. The main idea is that of *iteration*. For this purpose we use loops. `R` provides three basic iterative paradigms:
- `for`
- `while`
- `repeat`

## For Loops

```r
x <- c(2, 4, 6)
y <- rep(0, 3)

for (pos in 1:3) {
	y[pos] <- x[pos] + 1
}
```

You can use `break` to exit a loop early:
```r
x <- c(-15, 12, 3)

for (elt in x) {
	if (elt %% 2 == 0) 
		break
	
	message("The element is ", elt)
}

## The element is -15
```

You can use `next` to skip to the next iteration early:
```r
x <- c(-15, 12, 3)

for (elt in x) {
	if (elt %% 2 == 0) 
		next
	
	message("The element is ", elt)
}

## The element is -15
## The element is 3
```


### Loop Indices

If you need indices, using `1:n` can cause bugs:
```r
n = 0
for (i in 1:n) {
	message(i)
}

## 1 
## 0
```

Use `seq_len(n)` instead of `1:n`
```r
n = 0
for (i in seq_len(n)) {
	message(i)
}
```


| Situation | `1:n` Result |    `seq_len(n)` Result     |   Note    |
| :-------: | :----------: | :------------------------: | :-------: |
|   n = 3   |  `1, 2, 3`   |         `1, 2, 3`          |   same    |
|   n = 1   |     `1`      |            `1`             |   same    |
|   n = 0   |    `1, 0`    | `NULL` (no returned value) | **bugs!** |

Similarly, using `1:length(x)` can cause bugs, if x is an empty vector:
```r
x = c()
for (i in 1:length(x)) {
	message("The element is ", x[i])
}

## The element is
## The element is
```

Use `seq_along(x)` instead:
```r
x = c()
for (i in seq_along(x)) {
	message("The element is ", x[i])
}
```

More generally, use `seq()` to produce sequence of indices.

> [!NOTE] 
> The vector of `times` does not have to be a numeric vector; it can be any vector
> ```r
> value <- 2
> times <- c('1', '2', '3', '4', '5')
> 
> for (i in times) {
> 	value <- value * 2
> 	print(value)
> }
> 
> ## [1] 4
> ## [1] 8
> ## [1] 16
> ## [1] 32
> ## [1] 64
> ```

---

## While Loops

A **while-loop** runs a block of code repeatedly while some condiition is `TRUE`. The condition is checked before each iteration:

```r
even <- seq(0, 50, 2)
total <- 0
i <- 1

while (total < 50) {
	total <- total + even[i]
	i <- i + 1
}

total
## [1] 56

i 
## [1] 9
```

---

## Repeat Loop

Some languages have a do-while-loop, while checks the condition *after* each iteration (so the first iteration always runs).

`R` has **repeat**, which is the same as while (TRUE). 

You can create a do-while-loop in `R` with `repeat`:

```r
total <- 20

repeat {
	total <- total * 2
	if (total > 10)
		break
}

total
# [1] 40
```

- `repeat` loops are like "reverse" while loops
- in `repeat` loops you execute some code and then check a stopping condition
- computations are carried out for as long as the condition is `FALSE`
- the loop stops when the condition is `TRUE`
- if you enter an infinite loop, break it by pressing `ESC` key

---

## Preallocation and Iteration Strategies

- R loops have a bad reputation for being slow. 
- Experienced users will tell you to avoid loops in R.
- It's not really that the loops are slow; the slowness has more to do with what you do inside the loops.
- A typical source of slowness has to do with the way R handles the boxing and unboxing of data objects, which may be a bit inefficient.
- When using R, you may need to start solving a problem using a loop. Once you solved it, try to see if you can find a <u>vectorized alternative.</u>
- It takes practice and experience to find alternative solutions to R loops.

**Preallocation** means allocating memory for results before a computation.
These functions allocate vectors:
- `character()`
- `complex()`
- `numeric()`
- `logical()`
- `vector()`
- `rep()`

Preallocation is especially important for loops: 
```r
# BAD, No Preallocation
x <- c()
for (i in 1:10000) {
	x <- c(x, i * 2)
}
```
This example is extremely inefficient because x "grows" at every iteration. 

```r
# GOOD, With Preallocation
n <- 10000
x <- numeric(n)
for (i in seq_len(n)) {
	x[i] <- i * 2
}
```
Compared to the previous code block, the above code is more efficient because we have preallocated x with the right "size".

**Iteration Strategy**
![[image-37.png]]
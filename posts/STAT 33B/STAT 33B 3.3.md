# `tidyverse`

`tidyverse` is a collection of R packages designed for data science workflows. The core packages include:
- `readr`: fast and friendly file reading (CSV, TSV, etc.)
- `dplyr`, `tidyr`, `tibble`: data frame manipulation and reshaping
- `ggplot2`: data visualization based on the Grammar of Graphics
- `stringr`: string manipulation
- `forcats`: tools for working with factors
- `purrr`: functional programming utilities (e.g., `map()` family)

## Tibble

A **tibble** is an enhanced version of the data frame, provided by the `tibble` package in `tidyverse`.

Compared to an ordinary `data.frame`, a tibble:
- Prints more informatively (shows data types, limits output to first 10 rows)
- Defaults to `drop = FALSE` for the subset operator `[`
	- Subsetting a single column with `[` returns a tibble, not a vector
- Does **not** allow partial matching for the `$` operator (stricter, safer behavior)

```r
tbl <- tibble(
    name = c('Anakin', 'Padme', 'Luke', 'Leia'), 
    gender = c('male', 'female', 'male', 'female'), 
    height = c(1.88, 1.65, 1.72, 1.50) 
)
```

**Conversion**: Use `as.data.frame()` to convert a tibble to a regular data frame, and `as_tibble()` to convert a data frame to a tibble.

## `dplyr` main verbs

- `filter()`
- `select()`
- `slice()`
- `arrange()`
- `mutate()`
- `group_by()`
- `summarise()`

All `dplyr` verbs share a consistent structure:
- First argument is always a data frame (or tibble)
- Subsequent arguments describe *what* to do with the data
- Always return a new data frame (or tibble) — **never modify in place**
- Can be chained together using the pipe operator `|>` or `%>%`

### Primary Verbs Detailed

- **slice()**: Selects rows based on their index positions. Supports row exclusion using negative indices (e.g., `slice(dat, -1)`).
    
- **select()**: Selects one or more columns. Supports column names , strings , name ranges (e.g., `name:gender`) , and index positions.
    
- **filter()**: Subsets rows based on logical conditions. Compatible with operators such as `==` , `%in%` , $!=$ , and boolean logic like `&`.
    
- **arrange()**: Reorders rows based on column values. Ascending order is the default ; descending order requires the `desc()` function.
    
- **mutate()**: Adds new columns or transforms existing ones. Supports arithmetic operations (e.g., $height / 10$) and row-based functions like `n()`.
    
- **summarise() / summarize()**: Reduces multiple values into a single summary statistic. Common functions include `mean()`, `median()`, `sum()`, and `sd()`.
    
- **group_by()**: Groups data to perform operations by category.
    

## Utility Functions

- **count()**: Computes the frequency of values in specific columns.
    
- **distinct()**: Returns unique rows from a data frame.
    
- **n_distinct()**: Returns the count of unique values in a specific selection.
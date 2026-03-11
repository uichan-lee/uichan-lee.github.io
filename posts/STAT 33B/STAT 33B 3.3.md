---
title: "STAT 33B - Week 7: Introduction to tidyverse and dplyr"
date: Mar 3
course: STAT 33B
---

# Tidyverse

`tidyverse` is a set of packages in R for Data Science. It includes:

- `readr`: read file
- `dplyr`, `tidyr`, `tibble`: data frame manipulation
- `ggplot2`: visualization
- `stringr`: String manipulation
- `forcats`: factor manipulation
- `purrr`: functional programming

## Tibble

Enhanced data frame in `tidyverse`.

Compared to an ordinary data frame, a tibble:

- prints differently
- defaults to `drop = FALSE` for the subset operator `[`
  - returns a single column `tibble` if subsetted a single column with `[`
- doesn't allow partial matching for the dollar operator `$`

```r
tbl <- tibble(
    name = c('Anakin', 'Padme', 'Luke', 'Leia'),
    gender = c('male', 'female', 'male', 'female'),
    height = c(1.88, 1.65, 1.72, 1.50)
)
```

Conversion:

Functions `as.data.frame()` and `as_tibble()` are used to convert.

## dplyr Main Verbs

Core verbs for data manipulation:

- `filter()` - Subset rows based on conditions
- `select()` - Choose columns
- `slice()` - Select rows by position
- `arrange()` - Sort rows
- `mutate()` - Add or modify columns
- `group_by()` - Create groups for operations
- `summarise()` / `summarize()` - Compute summary statistics

### Structure of Verbs

- First argument is a data frame (or tibble)
- Subsequent arguments say what to do with data frame
- Always return a data frame (or tibble)
- Never modify in place

### Primary Verbs Detailed

**slice()**: Selects rows based on their index positions. Supports row exclusion using negative indices (e.g., `slice(dat, -1)`).

**select()**: Selects one or more columns. Supports column names, strings, name ranges (e.g., `name:gender`), and index positions.

**filter()**: Subsets rows based on logical conditions. Compatible with operators such as `==`, `%in%`, `!=`, and boolean logic like `&`.

**arrange()**: Reorders rows based on column values. Ascending order is the default; descending order requires the `desc()` function.

**mutate()**: Adds new columns or transforms existing ones. Supports arithmetic operations (e.g., `height / 10`) and row-based functions like `n()`.

**summarise() / summarize()**: Reduces multiple values into a single summary statistic. Common functions include `mean()`, `median()`, `sum()`, and `sd()`.

**group_by()**: Groups data to perform operations by category.

## Utility Functions

**count()**: Computes the frequency of values in specific columns.

**distinct()**: Returns unique rows from a data frame.

**n_distinct()**: Returns the count of unique values in a specific selection.

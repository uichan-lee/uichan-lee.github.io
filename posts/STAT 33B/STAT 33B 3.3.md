# `tidyverse`

`tidyverse` is a set of packages in R for Data Science
It includes:
- `readr`: read file
- `dplyr`, `tidyr`, `tibble`: data frame manipulation
- `ggplot2`: visaulization
- `stringr`: String manipulation
- `forcats`: factor manipulation
- `purrr`: functional programming

## Tibble

Enhanced data frame in `tidyverse`

Compared to an ordinary data frame, a tibble:
- prints differently
- default to `drop = FALSE` for the subset operator `[`
	- returns a single column `tibble` if subsetted a single column with `[`
- Don't allow partial matching for the dollar opeartor `$`

```r
tbl <- tibble(
    name = c('Anakin', 'Padme', 'Luke', 'Leia'), 
    gender = c('male', 'female', 'male', 'female'), 
    height = c(1.88, 1.65, 1.72, 1.50) 
)
```

Conversion: 
Functions `as.data.frame()` and `as_tibble()` are used to convert. 

## `dplyr` main verbs

- `filter()`
- `select()`
- `slice()`
- `arrange()`
- `mutate()`
- `group_by()`
- `summarise()`

Structure of verbs:
- First argument is a data frame (or tibble)
- Subsequent arguments say what to do with data frame
- Always return a data frame (or tibble)
- Never modify in place

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
---
title: "STAT 33B - Week 6: Data Frames and Importing Tables"
date: Feb 23
course: STAT 33B
---

# Importing Tables

There are two subtypes of plain text format, depending on how the separated values are identified in a row.

## 1. Delimited Formats

Values within a row are separated by a special character, or **delimiter**.

### Common Delimiters

| Delimiter | Description |
|---|---|
| ` ` (space) | White space |
| `,` | Comma |
| `\t` | Tab |
| `;` | Semicolon |

## 2. Fixed-Width Format

In a fixed-width format file, each value is allocated a **fixed number of characters** within every row.

Example of a fixed-width delimited file (common file extension .txt):

```
Name Sex    Force Height Robots
Leia female true   150.0  0
Luke male   false  172.0  2
Han  male   false  180.0  0
```

Each value is allocated a fixed number of characters within every row.

## Import Functions

| Function | Description |
|---|---|
| `read.table()` | Comma separated values |
| `read.csv()` | Comma separated values |
| `read.csv2()` | Semicolon separated values (Europe) |
| `read.delim()` | Tab separated values |
| `read.delim2()` | Tab separated values (Europe) |
| `read.fwf()` | Fixed-width format |

### Importing Text Table

```r
sw_txt <- read.table(
	file = "starwarstoy.txt",
	header = TRUE    # Column names in the first line
)
```

### Importing CSV Table

```r
# Using read.table
sw_csv <- read.table(
	file = "starwarstoy.csv",
	header = TRUE,
	sep = ","
)

# Using read.csv
sw_csv <- read.csv(file = "starwarstoy.csv")
```

### Tab Delimited

Example of a tab delimited file (common file extensions .txt or .tsv):

```
Name	Sex	Force	Height	Robots
Leia	female	true	150.0	0
Luke	male	false	172.0	2
Han	male	false	180.0	0
```

```r
sw_tsv <- read.table(
	file = "starwarstoy.tsv",
	header = TRUE,
	sep = "\t"
)

sw_tsv <- read.delim(file = "starwarstoy.tsv")
```

### read.table() Arguments

Some important arguments for `read.table()`:

| Argument | Description |
|---|---|
| `file` | Name of file |
| `header` | Whether column names are in 1st line |
| `sep` | Character used as field separator |
| `quote` | Quoting characters |
| `dec` | Character for decimal point |
| `row.names` | Optional vector of row names |
| `col.names` | Optional vector of column names |
| `na.strings` | Characters treated as missing values |
| `colClasses` | Optional vector of data types for columns |
| `nrows` | Number of lines to read |
| `skip` | Number of lines to skip before read data |
| `check.names` | Check if column names are valid |
| `stringsAsFactors` | Should characters be converted to factors |

---

# Data Frames

A **data frame** is a 2D tabular data structure (list of equal-length vectors). Each column is a single vector.

R data structures overview with atomic and non-atomic types:

| Dimensions | Single Data Type (Atomic) | Multiple Data Types (Non-Atomic) |
|---|---|---|
| 1D | Vector | List |
| 2D | Matrix | **Data Frame** |
| nD | Array | - |

Data frame structure with row and column indices:

```r
dat[ , name(s)]
```

- Single brackets with row index left empty
- Column name(s) on the right
- Returns a data frame with specified columns

Dollar operator for named columns:

```r
dat$name
```

Double brackets with column index:

```r
dat[[j]]
```

- Single column index
- (integer, name)

## Bracket Notation for Data Frames

Using single brackets `dat[ , name(s)]`:
- Empty row index
- Column name(s) specified

Using dollar operator `dat$name`:
- Direct access to named column

Using double brackets `dat[[j]]`:
- Single column index using integer or name

## Data Frame Functions

| Function | Description |
|---|---|
| `str()` | Structure |
| `head()` | First n rows |
| `tail()` | Last n rows |
| `dim()` | Dimensions (# rows, # cols) |
| `nrow()` | Number of rows |
| `ncol()` | Number of columns |
| `names()` | Vector of column names |
| `colnames()` | Vector of column names |
| `rownames()` | Vector of row names |
| `dimnames()` | List of row and column names |
| `summary()` | Descriptive statistics |

## Modifying Data Frames

### Change Male Names

Example of modifying values in a data frame based on a condition:

```r
# change male names
dat[dat$gender == 'male', 'name'] <- c('Anakin', 'Luke')
```

### Multiple Conditions

Apply multiple conditions when subsetting and modifying:

```r
# multiple conditions
conds <- (dat$gender == 'female' & dat$height > 160)

dat[conds, 'name'] <- "PADME"
```

This syntax allows you to:
1. Create a logical condition using `&` (and), `|` (or), and `!` (not)
2. Use that condition to subset rows
3. Assign new values to specific columns in the selected rows

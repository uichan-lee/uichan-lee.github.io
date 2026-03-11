# Importing Tables

There are two subtypes of plain text tabular formats, depending on how values within a row are separated:

1. **Delimited Formats**
Values within a row are separated by a special character called a **delimiter** (e.g., comma, tab, pipe).
![[image-22.png]]

2. **Fixed-Width Format**
Each column occupies a fixed number of characters, with values padded by spaces.
![[image-23.png]]


## Functions
![[image-24.png]]

![[image-25.png]]

- Importing a whitespace-delimited table:
```r
sw_txt <- read.table(
	file = "starwarstoy.txt",
	header = TRUE    # First line contains column names
)
```

- Importing a CSV (comma-separated values) table:
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

- Importing a TSV (tab-separated values) table:
![[image-26.png]]
```r
sw_tsv <- read.table(
	file = "starwarstoy.tsv",
	header = TRUE,
	sep = "\t"
)

sw_tsv <- read.delim(file = "starwarstoy.tsv")
```



# Data Frames
![[image-28.png]]

![[image-27.png]]

![[image-29.png]]

### Modifying Data Frames
![[image-30.png]]
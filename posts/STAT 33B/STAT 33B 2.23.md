# Importing Tables

There are two subtypes of plain text format, depending on how the separated values are identified in a row

1. Delimited Formats
Values within a row are separated by a special character, or **delimiter**.
![[image-22.png]]

2. Fixed-Width Format
![[image-23.png]]


## Functions
![[image-24.png]]

![[image-25.png]]

- Importing Table
```r
sw_txt <- read.table(
	file = "starwarstoy.txt",
	header = TRUE    # Column names in the first line
)
```

- Importing CSV table
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

- Tab Delimited
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

Modifying
![[image-30.png]]
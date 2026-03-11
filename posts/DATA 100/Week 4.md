# Lecture Notes
**Canonicalization**: Convert data into a standard form
Ex.) Join tables with mismatched labels

### Regex (Regular Expression)
[Regex101.com](https://regex101.com/)
Regular Expression is provided in the Python **re** library and the pandas **str** accessor.

```python
import re
pattern = r'\[(\d+)\/(\w+)\/(\d+):(\d+):(\d+):(\d+) (.+)\]'
day, month, year, hour, minute, second, time_zone = re.findall(pattern, line)[0]
```

--- 
#### Regex Operations

- `Concatenation` – "look for consecutive characters"
>BAAB matches BAAB

- `|` – "or"
>`BAB|BAAB` matches `BAB` or `BAAB`

- `*` – "zero or more"
>`AB*A` matches `AA`, `ABA`, `ABBA`, ...

- `()` – "consider a group"
>`(AB)*A` matches `A`, `ABA`, `ABABA`, ...
>`A(A|B)AAB` matches `AAAAB` or `ABAAB`

![[Pasted image 20250921133357.png]]
\*, \( \), and \| are called **metacharacters** – they represent an operation, rather than a literal text character.

- `.` – "look for any character other than \n"
> `.U.U.U.` matches `CUMULUS`, `JUGULUM`

- `[]` – "define a character class"
	- `[A-Z]` – any uppercase letter between A and Z
	- `[0-9]` – any digit between 0 and 9
		- `\d` is equivalent to `[0-9]`
	- `[A-Za-z0-9]` – any letter, any digit
		- `\w` is equivalent to `[A-Za-z0-9]`
	- `\s` matches space, tab or newline
- Use `^` to negate a class = match any character other than what follows 
	- Ex) `[^A-Z] ` – any character that is *not* an uppercase letter between A and Z
	- **Capitalized shortcuts**: 
		- `[^A-Za-z0-9]` = `[^\w]` = `\W`    `[%\d]` = `\D`    `[%\s]` = `\S`

- `+` – "one or more"
> `AB+` matches `AB`, `ABB`, `ABBB`, ...

- `?` – "zero or one"
> `AB?` matches `A`, `AB`

- `{x}` – "repeat exactly x times"
> `AB{2}` matches `ABB`

- `{x, y}` – "repeat between x and y times"
> `AB{0, 2}` matches `A`, `AB`, `ABB`

Keep in mind: `*` = `{0,}`, and `?` = `{0, 1}` = `{, 1}`
![[Pasted image 20250921133601.png]]


- `\` – "read the next character literally"
> `a\+b` matches `a+b`

- `^` – "match the beginning of a string"
	- `^` has different behavior inside/outside of character classes 
	  (`[^abc]` → Match any single character other than a, b, or c)

> `^abc` matches `abc 123`, not `123 abc`

- `$` – "match the end of a string"
> `abc$` matches `123 abc`, not `abc 123`

--- 
#### Greediness

Regex is **greedy** – it looks for the *longest* possible match in a string (when using `+` and `*` operators). 

In English:
- Look for the exact string `<div>`
- then, grab every character except `\n`...
- until the **FINAL** instance of the string `</div>`

So for the following string:
"This is an `<div>example</div> of greediness <div>in</div>` regular expressions"

`<div>.*</div>` will give you the longest possible match, which is the whole: `<div>example</div> of greediness <div>in</div>`

If we want to look for the matching string until the **FIRST** instance of the string `</div>`, we use `?` tags. (Yes, it has multiple meanings.) 

So if we use `<div>.*?</div>`, we will get two matching strings:
"This is an `<div>example</div>` of greediness `<div>in</div>` regular expressions."

--- 
#### Raw Strings in Python

When specifying a pattern, use **raw strings**
- `pattern = r"[0-9]+"`

Create by putting `r` before string delimiters: (`r"..."` `r'...'` `r"""..."""` `r'''...'''`)
Python and regex use \ as the *escape character*. Python interprets first, then regex interprets.
But, Python does not interpret \ in raw string! 
![[Pasted image 20250916210755.png]]

##### Extraction
`re.findall(pattern, text)` return a **list** of all matches to pattern.
![[Pasted image 20250916211018.png]]

`ser.str.findall(pattern)` returns a Series of lists
![[Pasted image 20250916211052.png]]


##### Extraction with Capture Group
`()` also specifies a **capture group**
Some `re` functions extract only the text matched by capture groups, if they are specified.
![[Pasted image 20250916211907.png]]

![[Pasted image 20250916212150.png]]

![[Pasted image 20250916212205.png]]

##### Substitution

`re.sub(pattern, repl, text)`
Returns text with all instances of `pattern` replaced by `repl`.
![[Pasted image 20250916212732.png]]

![[Pasted image 20250916212759.png]]

![[Pasted image 20250921134231.png]]

---
### Visualization

High-level **summary** of a complex dataset.
**Communicate** trends to viewers.

#### Distributions
A **univariate** distribution describes:
- The set of possible values of *one* variable.
- The frequency of each value.
![[Pasted image 20250918111917.png|350]]

Categories should **sum to the total # of datapoints**, and percentages should **sum to 100%**.

##### Bar Plots: Distribution of Qualitative Variables
Bar plots are the most common way of displaying data summarizing a **qualitative** variable.
- Horizontal bars are often preferable to vertical bars.
- Only bar length matters, width does not! 
- Color can be used for groups.
- Sometimes colors are just pretty, but avoid [chart junk](https://en.wikipedia.org/wiki/Chartjunk). 


Let's consider `wb` `DataFrame`, World Bank Dataset about world countries. 
![[Pasted image 20250918112713.png]]

###### Generating Bar Plots: `matplotlib`

```python
import matplotlib.pyplot as plt
plt.example_plotting_function(x_values, y_values)

plt.xlabel("x axis label")
plt.ylabel("y axis label")
plt.title("Title of the plot)
```

To create a bar plot in `matplotlib`: `plt.bar(___)`

```python
continents = wb["Continent"].value_counts()
plt.bar(continents.index, continents.values)
```


###### Generating Bar Plots: `seaborn`

```python
import seaborn as sns
sns.example_plotting_function(data=df, x="x_col", y="y_col")
```

To create a bar plot in `seaborn`: `sns.countplot(___)`

```python
import seaborn as sns
sns.countplot(data=wb, x='Continent')
```

##### Histogram
A histogram:
- Groups datapoints with similar values into shared **bins**
- Each bin's **area** (not height!) is the **percentage** of all datapoints it contains
![[Pasted image 20250918113950.png|341]]

###### Histogram in Code
In `matplotlib`: `plt.hist(x_values, dnsity=True)`

In `Seaborn`: `sns.histplot(data=df, x="x_column", stat="density")`

The `hue` parameter of `seaborn` plotting functions sets the column taht should be used to determine color.
`sns.histplot(data=wb, hue="Hemisphere", x="Gross national income...")`
![[Pasted image 20250918114348.png|450]]

##### Box Plot
![[Pasted image 20250918115014.png]]
`sns.boxplot(data=wb, y="Gross domestic product: % growth : 2016)`
- The *Whisker* is NOT an outlier separator
	- Thus, there could be box plot <u>without</u> any whisker if all values above Q3 and below Q1 are outliers. 
![[Pasted image 20250918115433.png]]

###### Side-by-side Box Plots
If we want to incorporate a **qualitative** variables as well? 
`sns.boxplot(data=wb, x="continent", y = "Gross domestic product: % growth : 2016")`
![[Pasted image 20250918115834.png]]

##### Violin Plots
Violin plots are box plots with smoothed density curves 
- The width indicates the density of points.
- Q1, median, Q3 and "whiskers" are still present – look closely!
`sns.violinplot(data=wb, y="Gross domestic product: % growth : 2016")`

![[Pasted image 20250918115932.png|250]]
![[Pasted image 20250918121019.png]]
#### Kernel Density Estimation (KDE)

Sometimes, we want to identify general trends of a distribution, rather than focus on details. 
Smoothing a distribution helps **generalize** the structure of the data and reduce **noise**. 

Idea: Approximate the *data-generating distribution*
1. Assign an "error range" (**kernel**) to each data point, to account for randomness in sampling.
2. **Sum** up the kernels across all data points.
3. **Scale** the resulting distribution to have area = 1
![[Pasted image 20250918121637.png|350]]

A **kernel** is a function that tries to capture the randomness of our sampled data. 
The most common is the **Gaussian Kernel**.
![[Pasted image 20250918122656.png]]

`sns.kdeplot(points, bw_method=0.65)`
`bw_method` parameter will set the **bandwidth**, a number representing how "smooth" to make our curve.
![[Pasted image 20250918123313.png]]

Detailed step of KDE is in the following [Google Slides](https://docs.google.com/presentation/d/1jp4Jkypx1lYI_4EnMsAtevx08YvtAY8M1TTcPUrnFjA/edit?slide=id.g2555b8b1865_0_844#slide=id.g2555b8b1865_0_844)

Mathematical Notation of KDE
$$f_\alpha(x)=\frac{1}{n}\sum_{i=1}^{n}K_\alpha(x,x_i)$$
![[Pasted image 20250918123404.png|475]]![[Pasted image 20250918135541.png|218]]


# Discussion
It's very common to have missing values.
What strategies seems reasonable? 
Anything that preserves the **original distribution**. 

When asked for the **granularity** of a table, examine what does each row represents in the data.

#### Variable Types
- **Quantitative** continuous
	- Numerical variable that can take on any value
	- Ex: the volume of a cup of boba (300.0mL, 300.5mL, 300.523mL, ...)
- **Quantitative** discrete
	- Numerical variable that can only take on whole-number values
	- Ex: the number of pearls in a cup of boba (1, 2, 3, ...) 
- **Qualitative** ordinal
	- A set of categories that have some sense of ranking/order
	- Ex: a five-star review system for restaurants (5 = great, 1 = poor)
- **Qualitative** nominal
	- A set of categories that aren't specifically ordered

#### Primary and Foreign Keys
![[Pasted image 20250915115157.png]]
- A **Primary Key** is the <u>smallest set</u> of column(s) that *uniquely* identifies each row
	- `students`: "SID", `departments`: "Major"
- A **Foreign Key** is 1 + column(s) that reference the primary key of another table 
	- "Major" is a foreign key of `students` that references the primary key of `deparetments`

`groupby().size()` will return a numpy.Series of the *total number of rows* in each group, including `NaN`s. 

`groupby().count()` will return a pandas.DataFrame of the *number of the values* in each column, for each group, excluding `NaN`s. 
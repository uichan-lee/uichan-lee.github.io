![[elections.csv]]
```python
import pandas as pd
```
---
# Pandas
## Series

A `Series` is a 1-D labeled array of Data. We can think of it as a columnar data.
<br>
**Creating a new `Series` object**
```python
s = pd.Series(["welcome", "to", "data 100"])
print(s, end="\n\n")
print(s.index, end="\n\n")
print(s.values, end="\n\n")
```

If the `index=` argument is not given, the `Index` of integer labels is automatically generated. We can also provide a custom `Index`.
<br>
```python
s = pd.Series([-1, 10, 2], index=["a", "b", "c"])
print(s)
print(s.index)
```
<br>
After it has created, we can reassign the Index.

```python
s.index = ["FIRST", "SECOND", "THIRD"]
print(s)
print(s.index)
```
<br>

**Selection using one or more label(s)**
```python
# Selection using a single label.
s = pd.Series([4, -2, 0, 6], index=['a', 'b', 'c', 'd'])
print(s["a"])
```

```python
# Selection using a list of labels.
print(s[["a", "b", "d"]])
```
<br>

**Selection using filter condition**
```python
# Use a Boolean filter to select data from the original Series
print(s[s > 0])
print()
print(s[s <= 0])
```
---
## DataFrame
`DataFrame` is a collection of `Series` that all share the same `Index`.

The syntax of `DataFrame` is: 
`pd.DataFrame(data, index, columns)`
<br>
We can create a `DataFrame`:
1. From a *CSV* file.
2. Using a list and column name(s).
3. From a dictionary.
4. From a `Series`.
<br>
```python
# Reading a CSV file
import pandas as pd

elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv")
print(elections.head(5))
```
<br>

We can pass a `index_col` attribute, the `Index` can be defined at the initialization.

```python
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv", index_col = "Candidate")
print(elections.head(5))
```
<br>

```python
max_idx = elections.groupby("Year")["%"].idxmax()

max_df = elections.loc[max_idx, ["Year", "Candidate", "Party", "Result"]].set_index("Year")

max_loss_years = max_df[max_df['Result'] == 'loss'].index

print(elections.set_index("Year").loc[max_loss_years])
```

**Creating a `DataFrame` using a list and column names**
```python
# Single-column DataFrame using a list
df_list_1 = pd.DataFrame([1, 2, 3], columns=["Number"])
print(df_list_1.head())
```

```python
# Multi-column DataFrame using a list of lists
# Each sub-list represents a row/observation
df_list_2 = pd.DataFrame([[1, "one"], [2, "two"]], columns=["Number", "Description"])
print(df_list_2.head())
```
<br>

```python
import pandas as pd
print(pd.DataFrame([["A", "B"], [84, 79]], columns=["Group", "Score"]))
```

**Creating a DataFrame from a dictionary** 
```python
# 1. Dictionary of columns
df_dict_1 = pd.DataFrame({"Fruit" : ["Apple", "Banana", "Pineapple"],
							"Price" : [4.49, 1.49, 6.99]})
print(df_dict_1)

# 2. Dictonary of rows
df_dict_2 = pd.DataFrame([{"Fruit":"Apple", "Price":4.49}, 
                          {"Fruit":"Banana", "Price":1.49},
                          {"Fruit":"Pineapple", "Price":6.99}])
print(df_dict_2)
```
<br>

**Creating a `DataFrame` from a `Series`**
```python
# Creating new series
s_a = pd.Series(["a1", "a2", "a3"], index=["r1", "r2", "r3"])
s_b = pd.Series(["b1", "b2", "b3"], index=["r1", "r2", "r3"])

# Passing Series objects for columns
df_ser = pd.DataFrame({"A-column":s_a, "B-column":s_b})
print(df_ser)
```

We can also create an one-column `DataFrame` by passing a `Series`, or using `to_frame()` method of the `Series`.
```python
df_ser = pd.DataFrame(s_a)
print(df_ser)

print()

df_ser = s_b.to_frame()
print(df_ser)
```
<br>

`DataFrame` attributes: `index`, `columns`, and `shape`
```python
# Creating a DataFrame from a CSV file and specifying the Index column
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv", index_col="Candidate")
print(elections.head(5))
```

```python
print("Index:", elections.index)
print("Columns:", elections.columns)
print("Shape:", elections.shape)
```
<br>

The `Index` column can be set to the default list of integers by calling `reset_index()` on a `DataFrame`.
```python
elections = elections.reset_index()
print(elections)

# This sets the Index to the "Party" column
print(elections.set_index("Party"))
```

---
### Slicing in `DataFrame`s

We can use `.head` or `.tail` to return only a few first or last rows of a `DataFrame`.
```python

elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Courses/DATA 100/Notes/attachments/elections.csv")

print(elections.head(5))
print(elections.tail(5))
```
<br>

#### Label-based Extraction using `loc`

Arguments to `.loc` can be:
1. A list
2. A slice (syntax is **inclusive** of the right-hand side of the slice)
3. A single value.
`loc` selects items by row an column *label*.
First argument is rows, second argument is columns.

```python
# Selection by a list
elections.loc[[55, 99, 103], ["Year", "Candidate", "Result"]]
```

```python
# Selection by a list and a slice of columns. 
elections.loc[[55, 99, 103], "Party" : "Result"]
```

```python
# Extracting all rows using a colon
elections.loc[:, ["Year", "Candidate", "Result"]]
```

```python
# Extracting all columns using a colon
elections.loc[[55, 99, 103], :]
```

```python
# Selection by a list and a single-column label
# The output is a Series when you pass a single-column w/o a list
popular_vote_series = elections.loc[[55, 99, 103], "Popular vote"]
print(popular_vote_series)
print(isinstance(popular_vote_series, pd.Series))

print()
# Note that if we pass "Popualr vote" in a list, the output will be a DataFrame
print(elections.loc[[55, 99, 103], ["Popular vote"]])
```

```python
# Selection by a row label and a column label
elections.loc[0, "Candidate"]
```
<br>

#### Integer-Based Extraction Using `iloc`

`iloc` selects items by row and column *integer position*. 

Arguments to `.iloc` can be:
1. A list
2. A slice (syntax is **exclusive** of the right hand side of the slice)
3. A single value
First argument is rows, second argument is columns.

> We're indexing using the row **NUMBERS**, not labels.

```python
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv")
print(elections.head(3))

# Select the rows at positions 1, 2, and 3.
print(elections.iloc[[1, 2, 3], [0, 1, 2]])
```

```python
# Index-based extraction using a list of rows and a slice of column indices
elections.iloc[[1, 2, 3], 0:3]
```

```python
# Selecting all rows using a colon
elections.iloc[:, 0:3]
```

```python
# Same for .iloc, single-column will return you a Series
print(elections.iloc[[1, 2, 3], 1])


# Two indices will return the exact value
print()
print(elections.iloc[1, 2])
```

You'll usually used `.loc` because it's safer and more comprehensible. 
<br>

#### Context-dependent Extraction: `[]`

[] only takes one argument, which may be:
- A slice of row integers
- A list of column labels.
- A single column label.

If we provide a slice of row numbers, we get the numbered rows. 
```python
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv")

print(elections[3:7])
```

```python
# Single integer doesn't work!
elections[2]
```

If we provide a list of column names, we get the listed columns.
```python
elections[["Year", "Candidate", "%"]]
```

Again, a single column will return a `Series` as `loc` and `iloc`
```python
elections["Party"]
```

---
### Conditional Selection (Boolean filtering)

By passing in a sequence (list ,array, or `Series`) of boolean values, we can extract a subset of rows in a `DataFrame`. We will keep only the rows that correspond to a boolean value of `True`.

```python
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv")

print(elections.loc[elections["Party"] == "Democratic", :].head(5))
```

```python
# First 10 rows of elections, retrieved 
elections_first_10_rows = elections[:10]
print(elections_first_10_rows)

# We can access only odd numbered rows 
print(elections_first_10_rows[[False, True, False, True, False, True, False, True, False, True]])

```

Oftentimes, we'll use boolean selection to check for entries in a `DataFrame` that meet a particular condition.

```python
# First, use a logical condition to generate a boolean Series
logical_operator = (elections["Candidate"] == "Donald Trump")

print(logical_operator)
```

```python
# Then, use this boolean Series to filter the DataFrame

elections[logical_operator]
```

Boolean selection also works with `loc`!

```python
# Using .loc
elections.loc[logical_operator]
```
<br>

To filter on multiple conditions, we combine boolean operators using **bitwise comparisons**
![[Pasted image 20250904153219.png]]

```python
# Democratic candidate after 2000
elections.loc[(elections["Party"] == "Democratic") & (elections["Year"] > 2000)]
```

```python
# Any candidate won the election OR got more than 50% votes
won_or_50up = elections[(elections["Result"] == "win") | (elections["%"] > 50)]

print(won_or_50up)
```

<br>


### Adding, Removing, and Modifying Columns

To add a column, use `[]` to reference the  desired new column, then assign it to a `Series` or array of appropriate length.

```python
# Create a Series of the length of each name. 
name_lengths = elections["Candidate"].str.len()

# Add a column named "name_lengths" that includes the length of each name.
elections["name_lengths"] = name_lengths

print(elections)
```

To modify a column, use `[]` to access the desired column, then re-assign it to a new array or Series.
```python
elections["name_lengths"] = elections["name_lengths"] - 1

print(elections)
```

Rename a column using the `.rename()` method.
You need to pass a dictionary with current column label as key and new label as value for `columns=` argument.
```python
# Rename the "name_lengths" column to "Length".
elections = elections.rename(columns={"name_lengths" : "Length"})

print(elections)
```

Remove a column using a `.drop()`
```python
# remove our new "Length" column
elections = elections.drop("Length", axis="columns")

print(elections)


# You can specify the column directly instead
print(elections.drop(columns=["Year", "Candidate"]))
```

If `axis="columns"` is not given, it will drop column and the argument should be the index. 
```python
import numpy as np
# Dropping row indices must be given as a list, array, or Series
elections = pd.read_csv("/Users/rickylee/Documents/Main Vault/🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/attachments/elections.csv")

print(elections.drop([0, 1, 2]))

print(elections.drop(np.arange(0, 100)))

print(elections.drop(pd.Series([1, 2, 3])))
```
<br>

#### Other Useful Methods (.isin, .str.startswith)
```python
# Parenthesis is necessary for multi-line codes
some_candidates = (elections[(elections["Candidate"] == "Donald Trump") |
				(elections["Candidate"] == "Kamala Harris") |
				(elections["Candidate"] == "Barack Obama") | 
				(elections["Candidate"] == "Joseph Biden")])
print(some_candidates, end="\n\n")

# A more concise method to achieve the above: The .isin() method!
names = ["Donald Trump", "Kamala Harris", "Barack Obama", "Joseph Biden"]

print(elections[elections["Candidate"].isin(names)])
```

```python
# What if we only want the candidate name starting with "L"? 
elections[elections["Candidate"].str.startswith("L")]
```

<br>

---
### Useful Utility Functions

#### `Numpy`

Many `Numpy` functions are compatible with objects in `pandas`.

```python
democrat_percent = elections[elections["Party"] == "Democratic"]["%"]

print(democrat_percent)
```

```python
# Average vote % for Democrat candidate

np.mean(democrat_percent)
```

```python
# Highest vote %
print(f"Highest vote: {max(democrat_percent)}%")

print(elections[(elections["%"] == democrat_percent.max())])
```

```python
# Finding the Democrat candidate received the lowest vote %
elections[(elections["%"] == democrat_percent.min())]
```


#### Built-In `Pandas` Methods

There are numerous functions built into `pandas`. You an encouraged to explore all the functionality outlined in the `pandas` [documentation](https://pandas.pydata.org/docs/reference/index.html).

```python
# Returns the shape of the object in the format (num_rows, num_cols)
elections.shape
```

```python
# Returns the total number of entries (num_rows * num_cols)
elections.size
```

```python
# Summary statistics
elections.describe()
```


```python
# You can get summary statistics for a single column (Series) too, with a slightly different look.
print(elections["Candidate"].describe())
```

```python
# Randomly sample a row from the DataFrame.
# You can set replace argument. (default = False)
elections.sample(5, replace=True)[["Year", "Candidate", "Result"]]
```

```python
# Multi-line chaining

result = (
	elections[elections["Year"] > 2000]
	.sample(5, replace=True)
	.iloc[:, 2:]
)

print(result)
```

```python
# Count the number of times each unique value occurs in a Series.

elections["Party"].value_counts()
```

```python
# Return an array of all unique values in the Series.

elections["Candidate"].unique()
```

```python
candidate_names = elections["Candidate"]
print(candidate_names, end="\n\n")

# Sort a Series. Notice that the index changes order, too! 
print(candidate_names.sort_values())
```

```python
elections.groupby("Party").filter(lambda df: df["%"].mean() > 40)
```
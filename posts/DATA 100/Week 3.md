```python
import pandas as pd
```

### Grouping
###### Split-Apply-Combine Paradigm
![[Pasted image 20250909111520.png]]

If there are 'Unnamed' column names after import, we can specify the `header` to skip first few rows. 
`tb_df = pd.read_csv("data/cdc_tuberculosis.csv", header=1)`


`.groupby()` splits a `DataFrame` into "mini" `DataFrame`s (subframes, or `sf`'s)
- There is one `sf` for each group.
- The `sf`'s are stored in a single `DataFrameGroupBy` object
![[Pasted image 20250909111654.png]]

`.agg()` applies an aggregation operation to each subframe (`sf`) and combines the `sf`'s.
![[Pasted image 20250909111758.png]]

![[Pasted image 20250909112036.png]]

**Putting It Together**
Syntax to compute the total # of babies born in each year:
`babynames.groupby('Year')[['Count']].agg('sum')`

```python
df = pd.DataFrame({
  'col1' : ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'C', 'B'],
  'col2' : [3, 1, 4, 1, 5, 9, 2, 5, 6], 
  'col3' : ['ak', 'tx', 'fl', 'hi', 'mi', 'ak', 'ca', 'sd', 'nc']
})
print(df)
```
<br>

If we don't specify the columns to aggregate, `.agg()` aggregates <u>all</u> ungrouped columns.

```python
print(df.groupby('col1')[['col2', 'col3']].agg('max'),"\n")

print(df.groupby('col1').agg('max'))
```

---
## Exploratory Data Analysis (EDA)

`.csv`: Comma Separated Values
`.tsv`: Tab Separated Values
- Fields are delimited by '\t' (tab)
- Like a CSV with tabs instead of commas
- `pd.read_csv`: Need to specify 
	- `delimiter = '\t'`

Key Data Properties to Consider in EDA
- Structure: the "shape" of a data file
- Granularity: how fine/coarse is each datum → a single "piece" of data
- Temporality: how is the data situated in time 
- Faithfulness: how well does the data capture "reality"


![[Pasted image 20250915103950.png]]

##### Temporality: Unix / POSIX Time
**Datetimes** measured in **seconds** since **January 1st 1970 UTC**

Feb 4, 2025 5:00pm PDT → 1738674000 (1,738,674,000 seconds)
Feb 4, 1950 5:00pm PDT → -628167600 (-628,167,600 seconds)


##### Merge
`df1.merge(right = df2, left_on = "c1", right_on = "c2", suffixes = ["_x", "_y"])`

merge performs *inner join* by default, which keeps only rows where the join key exists in **both** tables. 

By specifying `how = 'left'` or `'right'`, we can perform *left join* or *right join*. 

##### Groupby.filter
```python
winners_only = (
    elections
        .groupby("Party")
        .filter(lambda x : (x["Result"] == "win").any())
)
```

##### Missing Data
Approaches:
**A. Keep as `NaN`
- A good default
- If qualitative/categorical, consider creating a "Missing" category

**B. Drop records** with missing values
- Typically a <u>BAD</u> default!
- Temperature probe went office for a minute → Likely *missing at random* → OK to drop
- Police officer never records outcomes of vehicle stops → Likely <u>not</u> missing at random

**C. Imputation/Interpolation**: infer missing values
- Mean/Median Imputation: replace `NaN` with mean/median
- More methods beyond this course:
	- Hot Deck Imputation: use a random non-NaN value
	- Regression Imputation: use a model to predict value
	- Multiple imputation: multiple random values + check sensitivity 


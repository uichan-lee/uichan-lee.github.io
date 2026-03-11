# Parameter Inference and the Bootstrap

It's easy to get the *best guess*. (ex. taking average – average height)
But how good is the best guess? 

## The Bootstrap: Constructing synthetic parallel universe
<u>Big Assumption</u>: The distribution of our sample data resembles the unknown population distribution. In other words, our i.i.d. random sample is representative. 

We can't sample again from the population! 
So we randomly sample **with replacement** (i.e., allow duplicates)

### Bootstrap Demo
[BootStrap Demo](https://data100.datahub.berkeley.edu/user/lee_/lab/tree/fa25-student/lecture/lec19/lec19.ipynb)

Say we have this sampled height data of UC Berkeley (in inches)
![[Pasted image 20251104112503.png]]

We perform Bootstrap on the sample (`heights`) for `n_boot` = 10,000 times, get the bootstrap sample average.
![[Pasted image 20251104112549.png]]

Plot the Sample Mean Height Distribution of Bootstrap samples.
![[Pasted image 20251104112711.png]]

We can calculate the **95% Confidence Interval** by taking the 2.5th percentile and 97.5th percentile of the bootstrap mean.
![[Pasted image 20251104112925.png]]


#### Bootstrap Hypothesis Testing
We can also use our confidence interval to perform **hypothesis testing**. For example, someone might claim that the *true average height* of UC Berkeley undergrads is 68 inches.
$$ \text{Null hypothesis }H_0:\mu=68 $$
In the definition above, $\mu$ is claimed the true average height of Berkeley students. 
![[Pasted image 20251104113412.png]]
> [!Note]
> **Null Hypothesis** is mostly a population parameter($\theta$) equals to some value (C):
> $$ \text{Null hypothesis } H_0:\theta=C$$
> 
> However, there is also *one-sided hypothesis testing* sometimes, that:
> $$ \text{Null hypothesis } H_0:\theta\leq C,$$
> $$ \text{Null hypothesis } H_0:\theta\geq C$$

> [!Question] In what situations might the bootstrap do a bad job of simulating the uncertainty around our best guess?
> Answer: The quality of our bootstrapped distribution depends on the quality of our original sample. If original sample is garbage, bootstrap is also garbage.
> 1. Works better for **large random samples**
> 	- A larger sample is more likely to resemble the population. Number depends.
> 2. Works poorly when the **population distribution is heavily skewed**
> 	- Imagine Bill Gates lived in Berkeley (i.e., heavily skewed income distribution)
> 	- The true average income in Berkeley is really high because of Bill.
> 	- But, if we take a random sample, we're unlikely to select Bill, so our bootstrapping procedure won't produce an accurate confidence interval for the mean.
> 3. Works poorly when **estimator is extreme** (i.e., the maximum or minimum)
> 	- For example, the true population max is guaranteed to be the same as your sample maximum or higher. No reason to resample.


---
## Inference 

![[Pasted image 20251104114407.png]]

![[Pasted image 20251104114517.png]]

There can be overlap between prediction and inference problems.
For example, a credit card agency builds a model to accurately **predict** credit scores. A customer might want to know **why** their credit score is lower than expected. 

> Large-language models (LLMs) are **primarily** interested in predicting the word. Understanding why that word is selected is a **secondary** concern. 


### Correlation and Causation
Inference is closely associated with both correlation and causality. The language is very important here (raise, cause, increase, decrease, etc.)

![[Pasted image 20251104114955.png]]

**Correlation**: Do people with college degrees have higher lifetime earnings?
**Causation**: Does receiving a college degree **increases** lifetime earnings? 

**Randomization** is required in order to infer causality. (Not strictly, but for now)
It would be unethical to randomly assign students to college degrees, and hard to keep track of them over a lifetime. So, we're limited to the tools of **correlational analysis**.

### Regression Inference
Suppose we have a dataset of **lifetime earnings** and **college degree** status.
The correlational relationship between earnings and degrees can be written as a regression:

![[Pasted image 20251104115817.png]]
- $\hat{\theta_0}$: What are the predicted lifetime earnings for someone **without** a college degree?
- $\hat{\theta_1}$: How much higher are predicted earnings for someone **with** a degree, **relative** to someone **without** a degree?

> [!Question] 
> Is this strong evidence that getting a college degree increases lifetime earnings? 
> ![[Pasted image 20251104120200.png]]
> 
> Answer: **NO.** People with college degrees may just be more likely to have **other traits** that increase lifetime earnings. (Family wealth could be the real reason)
> ![[Pasted image 20251104120308.png]]


It looks like wealth is a potential **confounder**. So let's adjust for it in our OLS model: 
![[Pasted image 20251104120350.png]]
- $\hat{\theta_0}$: What are the predicted lifetime earnings for someone without a college degree **and without zero family wealth?**
- $\hat{\theta_1}$: How much higher are predicted earnings for a degree-holder, relative to someone without a degree, **holding family wealth constant**?
- $\hat{\theta_2}$: How much higher are predicted lifetime earnings for each additional dollar of family wealth, assuming we're **comparing two people with the same degree status**?

> [! Question]
> Do we now have strong evidence that getting college degree increases lifetime earnings? 
> ![[Pasted image 20251104120850.png]]
> 
> Answer: Still **NO.** There could be other confounders, like health, demographics, geography, intrinsic motivation, ... **we <u>do not</u> observe all possible confounders**, so we can never be certain of causality.

Common assumption: All confounders are observed and adjusted for (ignorability).
This <u>assumption</u> implies a causal relationship, but the assumption cannot be verified! 
Important to be **transparent** about how to interpret your model. 

#### Causal Inference as Regression
We have a dataset of **support for AI-assisted grading** and an indicator for seeing a message about **AI-assisted grading + tutoring.**

The correlational relationship between support indicator and the message indicator:
![[Pasted image 20251104121507.png]]
- $\hat{\theta_0}$: What proportion of students strongly support AI-assisted grading when they **did not see the tutoring message**?
- $\hat{\theta_1}$: What is the **percentage point** (NOT percent!) change in the proportion who strongly support AI-assisted grading **if they saw the tutoring message v. if they did not**? 

If $\hat{\theta_1} >> 0$, we do have evidence that seeing the tutoring message **increases** reported strong support because we **randomized** who saw the tutoring message. 

---
# SQL

So far in Data 100, we've worked with data stored in `CSV` files. 
Good for **moderately-sized data** that is **static** (i.e., unchanging)
- No larger than ~10GB
- For example, a weekly "snapshot" of data

A **database** is an organized collection of data
A **Database Management Systems (DBMS)** is a software system that stores, manages, and facilitates access to one or more databases. 

![[Pasted image 20251106111854.png]]

SQL is a **special purpose programming language**, distinct from Python. 
- Dominant language for working with **data**
- All inputs and outputs are **tables**
- Introduced in the 1970s

In Data 100, we will connect to SQL databases with **DuckDB** and **SQLite**. 
- Every SQL system is a bit different (MySQL, PostgreSQL, ...) Core functionality is shared.

1. Load the SQL Module
   Our first step is to load the SQL module. We do so using the ipython *line magic* keyword:
   `%load_ext sql`

2. Connect to a database
   We use `%sql` to tell Jupyter that this line represents SQL code, not Python code.
   `%sql duckdb:///data/example_duck.db --alias duck`
   
   In Data 100, our database is stored in a local file. 
   In practice, you'd probably connect to a remote server. 
	```Python
	%%sql
	postgresql://joshhug:mypassw@berkeley.edu/grades
	```

2. Run SQL Statements
   Now that we've connected, we can make queries. 
	```python
	%%sql
	SELECT * FROM Dragon;
	```

## Basic Queries
```SQL
SELECT <column list>
FROM <table>
[WHERE <predicate>]
[ORDER BY <column list>]
[LIMIT <number of rows>]
[OFFSET <number of rows>];
```

- SELECT 
This is the simplest SQL query, which returns the full table:
```SQL
SELECT * 
FROM Dragon; -- Dragon = table name
```

<br>

We can also `SELECT` only a subset of the columns:
```SQL
SELECT cute, year
FROM Dragon;
```

<br>

To rename `SELECT`ed column, use the `AS` keyword:
```SQL
SELECT cute AS cuteness,
	   year AS birth
FROM Dragon;
```

> An **alias** is a name given to a column or table by a programmer. 
> Here, `cuteness` is an alias of the original `cute` column (and `birth` is an alias of `year`)

> Use newlines and whitespaces wisely in your SQL queries. It will simplify debugging. 

<br>

To return only **unique** values, combine `SELECT` with the `DISTINCT` keyword:
```SQL
SELECT DISTINCT year
FROM Dragon;
```
![[Pasted image 20251106112747.png|400]]

To select only some rows of a table, we can use the `WHERE` keyword. 
```SQL
SELECT name, year
FROM Dragon
WHERE cute > 0;
```

<br>

Comparators `OR`, `AND`, and `NOT` let us from more complex conditions.
```SQL
SELECT name, year
FROM Dragon
WHERE cute > 0 OR year > 2013;
```

<br>

Check if values are contained `IN` a specified list
```SQL
SELECT name, year
FROM Dragon
WHERE name IN ('hiccup', 'puff');
```

![[Pasted image 20251106113039.png]]

<br>

**Strings and SQL**
Strings in SQL should use **single quotes**:
- 'Hello World' is a *String*
- "Hello World" is a *column* (with a name that contains a space)

Double quoted strings refer to columns:
```SQL
SELECT "birth weight" FROM patient WHERE "first name" = 'Emrie'
```

<br>

`NULL` is stored in a special format. 
We can't use the "standard" operations =, >, and < with `NULL`.
Instead, check if something `IS` or `IS NOT NULL`:
```SQL
SELECT name, cute
FROM Dragon
WHERE cute IS NOT NULL;
```
> `NULL` = `NULL` returns False! You must use `IS`.

<br>

Specify which column(s) we should order the data by:
```SQL
SELECT * 
FROM Dragon
ORDER BY cute DESC;
```
> By default, SQL orders by ascending order: `ASC`

![[Pasted image 20251106113811.png]]

The `LIMIT` keyword let you retrieve N rows (like `pd.head(N)`)
```SQL
SELECT *
FROM Dragon
LIMIT 2;
```

The `OFFSET` keyword tells SQL to skip the first N rows of the output, then apply `LIMIT`
```SQL
SELECT * 
FROM Dragon
LIMIT 2
OFFSET 1;
```

> Unless you use `ORDER BY`, there is **no guaranteed order** of rows in the table!


## Tables and Schema

**SQL tables** are also called **relations**.
Every columns has three properties: `ColName`, `Type`, and zero or more `Constraints`. 
![[Pasted image 20251106121121.png]]

A **schema** describes the logical structure of a table. Whenever a new table is created, the creator must declare its schema. 
![[Pasted image 20251106121154.png]]

Some examples of SQL **types**: 
- `INT`: Integers
- `FLOAT`: Floating point numbers
- `VARCHAR`: Strings of text (also called `TEXT`)
- `BLOB` Arbitrary data, e.g., songs, video files, etc.
- `DATETIME`: A date and time

Some examples of **constraints**: 
- `CHECK`: Data must obey the given check constraint.
- `PRIMARY KEY`: Specifies that this key is used to uniquely identify rows in the table. 
- `NOT NULL`: Null data cannot be inserted for this column. 
- `DEFAULT`: Provides a default value to use if user does not specify on insertion. 
![[Pasted image 20251106121402.png]]

A **primary key** is a column or set of columns that uniquely identifies each record in the table.
- In the `Dragon` table, the `name` of each Dragon is the primary key.
- In other words, no two dragons can have the same name! 
![[Pasted image 20251106121516.png|350]]

A **foreign key** is a column or set of columns that references a *primary key in another table*.
- A foreign key constraint ensures that a primary key exists in the reference table. 
![[Pasted image 20251106121630.png]]


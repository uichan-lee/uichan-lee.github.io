# SQL II 

- A **primary key** constraint tells SQL that the values in a column must **uniquely identify rows**.
- A **foreign key** constraint tells SQL that all values in a column of a **child table** must exist in a primary key column of a **parent table**. No orphan records! 
![[Pasted image 20251113111602.png]]

## Grouping
```SQL
SELECT * 
FROM DISH
```
![[Pasted image 20251113111802.png|200]]
Notice the repeated dish *types*. What are the trends across each type? 

```SQL
SELECT type
FROM DISH
GROUP BY type;
```

`GROUP BY` is similar to pandas `groupby()`.
By itself, `GROUP BY` provides unique values. 
![[Pasted image 20251113111923.png|400]]

Like `pandas`, SQL has **aggregate functions**: `MAX`, `SUM`, `AVG`, `FIRST`, etc. 
[More Aggregation Functions](https://duckdb.org/docs/stable/sql/functions/aggregates)
![[Pasted image 20251113112008.png]]

> [! NOTE] Declarative Programming Language
> ```SQL
> SELECT type, SUM(cost)
> FROM Dish
> GROUP BY type;
> ```
> In the SQL query above, we told SQL to `SUM` in our `SELECT` statement, but didn't specify the groups until `GROUP BY`.
> 
> This is okay! 
> Unlike Python, SQL is a **declarative programming language**.
> 
> *Declarative programming* is a non-imperative style of programming in which programs *describe their desired results* without explicitly listing commands or steps that must be performed (Wikipedia)

**Using Multiple Aggregation Functions**
```SQL
SELECT type,
	   SUM(cost),
	   MIN(cost),
	   MAX(name)
FROM Dish
GROUP BY type;
```
![[Pasted image 20251113112541.png|400]]

The `COUNT` aggregation is used to count the number of rows in each group. 
![[Pasted image 20251113112649.png|500]]
> `COUNT(*)` returns the number of rows in each group, including rows with **NULLs**. 

---
## Filtering Groups With `HAVING`

`HAVING` filters groups with some condition applied across *all rows* in each group.
```SQL
SELECT columns
FROM table
GROUP BY grouping_column
HAVING condition_applied_across_group;
```

Ex)
```SQL
SELECT *
FROM Dish
WHERE cost > 4
GROUP BY type
HAVING MAX(cost) < 10;
```
![[Pasted image 20251113113302.png|300]]

## Perform EDA in SQL

### Working with Text: `LIKE`
We can perform simple text comparisons in SQL using the `LIKE` keyword. 
How to interpret: "look for entries that are `LIKE` the provided example string"

```SQL
SELECT titleType, primaryTitle
FROM Title
WHERE primaryTitle LIKE '%Star Wars%';
```
> Two "wildcard" characters:
> - % means "look for any character, any number of times"
> - _ means "look for exactly 1 character"

```SQL
SELECT titleType, primaryTitle
FROM Title
WHERE primaryTitle LIKE 'Harry Potter and the Deathly Hallows: Part _'
```

DuckDB and most real DBMSs also support: `SIMILAR TO '.*Star Wars.*'` (regex)


### Converting Data Types: `CAST`
To convert a column to a different data type, use the `CAST` keyword as part of the `SELECT` statement. Returns a *column* of the new data type, which we can `SELECT` for our output. 
```SQL
SELECT primaryTitle, CAST(runtimeMinutes AS INT)
FROM Title;
```
![[Pasted image 20251113114741.png]]

### Applying Conditions: `CASE`
We create conditional statements (like `if` in Python) using `CASE`
```SQL
CASE WHEN <condition> THEN <value>
	 WHEN <other condition> THEN <other value>
	 ...
	 ELSE <yet another value>
	 END
```

Ex)
```SQL
SELECT titleType, startYear,
CASE WHEN startYear < 1950 THEN 'old'
	 WHEN startYear < 2000 THEN 'mid-aged'
	 ELSE 'new'
	 END AS movie_age
```
![[Pasted image 20251113114922.png]]

## Join Tables Together
To minimize redundant storage, DBs store data cross **fact** and **dimension tables**.
![[Pasted image 20251113115746.png]]
A structure that uses fact and dimension table is called a **star schema**. No need to store lots of duplicated data in one giant table! 
![[Pasted image 20251113115807.png]]

### Inner Join
*Inner join* combine every row from the first table with its matching entry in the second table. 
If a row does not have a match, it is omitted. 
![[Pasted image 20251113115909.png]]
> This is the default behavior of `pd.merge`

```SQL
SELECT *
FROM table1 INNER JOIN table2
			ON table1.key = table2.key;
```
![[Pasted image 20251113115954.png]]

### Cross Join
*Cross join* returns <u>every</u> combination of possible rows. Also called a cartesian product. 
```SQL
SELECT *
FROM s CROSS JOIN t;
```

![[Pasted image 20251113120046.png]]

Conceptually, you can imagine an inner join as a cross join filtered to include only matching rows. 
![[Pasted image 20251113120307.png]]

```SQL
SELECT *
FROM s, t;
```
This also does cross join.

### Outer Join
#### Left Outer Join
In a **left outer join** (or just **left join**), keep all rows from the left table and *only matching* rows from the right table. Fill NULL for any missing values. 
![[Pasted image 20251113120719.png]]
#### Right Outer Join
In a **right outer join** (or just **right join**), keep all rows from the right table and *only matching* rows from the left table. Fill NULL for any missing values.
![[Pasted image 20251113120743.png]]
> Right Join is not recommended. Use Left Join. (Josh Hug)


#### Full Outer Join
In a **full outer join**, keep *all rows* from both the left and right tables. Pair any matching rows, then fill missing values with NULL. Conceptually similar to performing both left and right joins. 
![[Pasted image 20251113120926.png]]

### Aliasing in Joins
When working with long table names, we often create aliases.
![[Pasted image 20251113121626.png]]

> The `AS` keyword is actually optional! We usually include it for clarity. 

```SQL
SELECT primaryTitle, averageRating
FROM title T INNER JOIN Rating R
ON T.tconst = R.tconst; 
```

### Common Table Expression (CTE)
Common table expressions (CTEs) allow you to compose multiple queries. 
![[Pasted image 20251113121749.png]]
We can create temporary tables just for a query. (`good_action_movies` and `prolific_actors` in example above)


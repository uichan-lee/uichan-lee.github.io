---
title: "ENVECON C118 - Introduction to Econometrics"
date: 2026-01-20
course: ENVECON C118
---
# Lecture
## What is Econometrics?

### Econometric Questions
- **descriptive q**: asks about quantitative relationship between variables (i.e., x and y)
	- How has the share of global electricity generation from renewables changed in the last 10 years?
- **causal q**: asks about the effect of changing one variable (x) on another variable (y)
	- How much did California's Cap and Trade system reduce carbon emissions?
- **forecasting q**: asks about predicting future values of a variable (y) based on current or past values of other variables (x)
	- What will the price of lithium and cobalt be next year? 

### Why is it hard to answer these questions?
We often only observe a **sample** from the population we want to describe.

- **Best case: random selection**
  - e.g. to estimate the impact of a drought on farmers, we draw names out of a hat from a national registry of all farmers
  - just need to account for the fact that the sample might have different characteristics from the population *by chance*
- **Worst case: not representative/bias**
  - air quality sensors placed near gov buildings — is it a problem to use these sensors to describe the *average* air quality of the country?
  - if we survey people at a national park about their **willingness to pay** for conservation, will our results be biased?

> **Selection bias** refers to settings where the sample is not drawn randomly from the population of interest.

> **❓ Question:** Why are causal questions even harder to answer?
>
> **Example — Effect of air pollution on infant health:**
>
> - **Descriptive:** What is the average birth weight in highly polluted cities versus cleaner cities? (Currie and Neidell 2005)
>   - cleaner cities: **47.1** low birth weight per 1000 births
>   - higher polluted cities: **49.5** lbw per 1000 births
> - **Counterfactual:** How much more would a baby born in a highly polluted city have weighed if *that city* had cleaner air?
> - Counterfactuals can't be learned from seeing data alone — additional assumptions are needed

## Forecasting
Accurate prediction may be possible without knowing anything about the underlying model / causal relationships in the data.
- this is the promise of many new machine learning models.
- from this perspective, forecasting is a more **descriptive** task: estimate stable relationships between past and future data

But "theory-free" prediction can fall short when we need it most.
The **causal inference** tools we'll learn are useful for avoiding blind spots.


## Steps in Economic Analysis
1. Formulate the question of interest
2. Develop an economic and econometric model of the phenomenon you are interested
3. Collect data
4. Estimate the model using econometric techniques
5. Test hypotheses

> **📝 Example:**
> 1. What is the impact of tariffs on the price of consumer goods?
> 2. Model: price$_i=f$ (production costs$_i$, tariff$_i$)
> 	- econometric model: price$_i = \beta_0 + \beta_1$ tarrif$_i$ + $\epsilon_i$
> 3. What data do I need to answer this question?
>    
>    The gold standard for learning about casual effects is a **randomized controlled trial (RCT)** aka an experiment

## Taxonomy of Common Economic Data Types
1. Cross sectional data
	- sample of individuals, households, firms, cities, states, countries, or a variety of other units, taken at a *given point in time*
	- e.g. survey firms this month on the price of goods they sell and tariffs they face
	- we can often assume data have been obtained by random sampling from the underlying population
2. Time series data
	- time series data set consists of observations on a variable or several variables *over time*
	- e.g. stock prices, money supply, GDP, annual homicide rates, and automobile sales figures
	- the chronological ordering of observations in a time series conveys potentially important information
	- data frequency (hourly, daily, weekly, monthly, annual) also important feature of time series
3. Pooled cross-section (stacked snapshots; no unit tracking used)
	- data set with both cross-sectional and time series features
	- stack multiple cross-sections from different dates
	- e.g. two cross sectional household surveys from 2020 and 2025 on the goods households buy
		- *new* random sample in each year
		- often how we study how key relationships change over time
4. Panel data
	- a data set in which multiple units (individuals, firms, countries, etc.) are observed over time
	- e.g. survey the same firms every year for 10 years on the price of goods they sell and tariffs they have
	- panel data allow us to control for unobserved characteristics of the units that do not change over time 

> Key difference between **Pooled Cross-Sectional Data** and **Panel Data** is in the **Unit Tracking**. Panel data is the data of a same entity over time, but pooled cross-sectional data is a random sample from the same population over time. 

> **📝 Example:**
>
> **Time Series Data** — "Time on social media peaked in 2022, with young people cutting back first"
> Average hours/day on social media by age group (2014–2024): the 16–24 group peaked around 3 hrs/day before declining, while older groups (55–64) are still rising. This is *time series* data: the same variable (social media usage) tracked over time.
>
> **Panel Data** — "Even when developers felt AI was speeding them up, it slowed them down"
> Study tracking the same experienced developers completing coding tasks with/without AI tools. Developer forecasts predicted ~20% speedup, but observed result showed ~20% slowdown. This is *panel data*: the same individuals are observed under different conditions over time.
> *(It can also be cross-sectional depending on the analysis.)*
>
> **Pooled Cross-Sectional Data** — "Every governing party facing election in a developed country this year lost vote share"
> Shows rise/fall in governing-party vote share across different countries in different years (1950–2024). Each point is a different country-election, not the same country tracked over time — this is *pooled cross-sectional* data.
> It might look like Panel Data, but the *country* observed is not the same throughout time.



> Panel data should track the same people, but cross-sectional data only keeps the variable, but can be different people. 



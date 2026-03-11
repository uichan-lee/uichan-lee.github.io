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
![[image.png]]

> **Selection bias** refers to settings where the sample is not drawn randomly from the population of interest.

> [!Question] Why are causal questions even harder to answer?
> ![[image-2.png]]

## Forecasting
Accurate prediction may be possible without knowing anything about the underlying model / causal relationships in the data.
- this is the promise of many new machine learning models.
- from this perspective, forecasting is a more **descriptive** task: estimate stable relationships between past and future data

But "theory-free" prediction can fall short when we need it most.
The **causal inference** tools we'll learn are useful for avoiding blind spots.


## Steps in Economic Analysis
1. Formulate the question of interest
2. Develop an economic and econometric model of the phenomenon you are interested in
3. Collect data
4. Estimate the model using econometric techniques
5. Test hypotheses

> [!Example] Example Econometric Analysis
> 1. What is the impact of tariffs on the price of consumer goods?
> 2. Model: price$_i=f$ (production costs$_i$, tariff$_i$)
> 	- econometric model: price$_i = \beta_0 + \beta_1$ tariff$_i$ + $\epsilon_i$
> 3. What data do I need to answer this question?
>    
>    The gold standard for learning about causal effects is a **randomized controlled trial (RCT)**, aka an experiment

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
3. Pooled cross-section (stacked snapshots; no unit tracking)
	- combines cross-sectional and time series features
	- stacks multiple independent cross-sections from different dates
	- e.g. two cross sectional household surveys from 2020 and 2025 on the goods households buy
		- *new* random sample in each year
		- often how we study how key relationships change over time
4. Panel data
	- a data set in which multiple units (individuals, firms, countries, etc.) are observed over time
	- e.g. survey the same firms every year for 10 years on the price of goods they sell and tariffs they have
	- panel data allow us to control for unobserved characteristics of the units that do not change over time 

> Key difference between **Pooled Cross-Sectional Data** and **Panel Data** is in the **Unit Tracking**. Panel data is the data of a same entity over time, but pooled cross-sectional data is a random sample from the same population over time. 

> [! Example] 
> **Time Series Data**
> ![[image-3.png]]
> 
> **Panel Data**
> ![[image-4.png]]
> This is a data for same group of people, so it's Panel Data. (it can be cross-sectional also)
> 
> **Pooled Cross-Sectional Data**
> ![[image-5.png]]
> It might look Panel Data, but the *developed country* is not the same throughout time. 



> Panel data should track the same people, but cross-sectional data only keeps the variable, but can be different people. 



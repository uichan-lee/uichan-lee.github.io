---
title: "ENVECON C118 - Estimator and Identification"
date: 2026-01-29
course: ENVECON C118
---
# Lecture

## Parameters Estimands and Estimators

**Sample, Estimands, and Parameters:**
- **Sample:** the data we actually observe as drawn from a population
  - e.g. a survey of 1,000 California households (what's the population here?)
  - e.g. census data from 10% of US counties (what's the population here?)
- **Estimand:** what we sample data as random and the full population as fixed
- **Target parameter:** what we actually want to know about the population
  - e.g. the causal effect of a college degree on lifetime earnings
  - a fixed number because the population is fixed ("truth")

**Estimator, Estimate, and Parameter:**
- **Estimator:** a function of data for the sample: what we actually see
  - e.g. the difference in average earnings between college grads and non-grads in our sample
  - a random object because the sampled data are (hopefully) random
- **Estimate:** the result from plugging in observables data in the population
  - e.g. the difference in average earnings between college grads and non-grads in the full population
- **Target parameter:** again the population is fixed ("truth")

In econometrics we often separate the process of learning about the *estimand* from the *estimator* (statistical inference) from the process of learning about the *parameter* from the *estimand* (identification).
- **Inference**: Learn about what you don't observe (parameters) from what you do observe (data)
	- Can we reliably estimate the population difference in means from our sample?
- **Identification**: How much we learn about parameters from an infinite amount of data?
	- Does that population difference in means actually tell us about the causal effect we care about? 

### Human Capital Example

**Becker's Theory of Human Capital:**
Becker [1957]'s theory of human capital hypothesizes a positive causal effect of education on earnings. Let's formalize this causal Q using potential outcomes notation:
- Let $D_i$ be an indicator or dummy variable for the college "treatment"
  - $D_i = 1$ if person goes to college, $D_i = 0$ if they don't
- For each individual i imagine two potential earnings outcomes:
  - $Y_i(1)$ = outcome if "treated" (earnings if person went to college)
  - $Y_i(0)$ = outcome if "untreated" (individuals if person didn't go to college)

**Observed Earnings Model:**
- Observed earnings for individual i is $Y_i$ (say from IRS tax records)
- $Y_i$ is $Y_i(1)$ if $D_i = 1$ and $Y_i(0)$ if $D_i = 0$
- We can write this compactly as (why?):
  $$Y_i = D_i Y_i(1) + (1 - D_i) Y_i(0)$$

- We now have a **model relating observable $Y_i$ and treatment $D_i$
- We can set our target parameter as the average treatment effect:
  $$ATE = E[Y_i(1) - Y_i(0)]$$

**Earnings and Schooling (Estimation):**
Suppose we have a sample of earnings and schooling:
- Dataset with variables $(Y_i, D_i), i = 1, \ldots, N$
- Take as our **estimator the difference in sample average average earnings for the $N_{\text{college}}$ people who did go to college vs the $N_{\text{no college}}$ who didn't go to college:

$$\frac{1}{N_{\text{college}}} \sum_{D_i=1} Y_i \quad - \quad \frac{1}{N_{\text{no college}}} \sum_{D_i=0} Y_i$$

**Our Estimand:**
Our **estimand is the corresponding difference in **population means**:
$$E[Y_i|D_i = 1] \quad - \quad E[Y_i|D_i = 0]$$

Compare this to our **parameter: average treatment effect
$$E[Y_i(1) - Y_i(0)]$$

**The Problem (Identification):**
- why might we expect $E[Y_i(1) - Y_i(0)] \ne E[Y_i|D_i = d]$ (why?)
- some people are "close to" population means (by LLN)
- deviations between sample and population means tend to follow a known distribution
- we can use these facts to make inferences about the population means from observed **sample means (e.g. CIs)

**Selection Bias:**
- people who don't go to college may $D_i$ have different potential earnings $Y_i(d)$
- differences in academic ability, career goals, etc.
- also referred to as **omitted variables or confounding factors

## Experiments
### Identification through Randomization

**Identification Challenge:**
- only observe $Y_i(1)$ among those with $D_i = 1$
- only observe $Y_i(0)$ among those with $D_i = 0$
- **counterfactual $Y_i(d)$'s are unobserved!**

**The "gold standard" for learning about causal effects is a randomized controlled trial (RCT), aka an experiment:**

In an RCT:
- we randomly assign people to treatment ($D_i = 1$) and control ($D_i = 0$) groups
- this randomization ensures the treatment assignment is **independent** of potential outcomes
- which means treatment and control groups are **on average** comparable in all ways except for the treatment
- therefore, differences in average observed outcomes between treatment and control groups identify the ATE


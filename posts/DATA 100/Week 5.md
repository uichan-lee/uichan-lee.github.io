
## Visualization II
Last time, we focused on visualizing distributions of one variable (i.e., **univariate** distributions)
We are focusing on the relationships between variables in(i.e., **bivariate** or **multivariate** distributions).
![[Pasted image 20250923114147.png]]


### Scatter Plot
Scatter plots visualize relationships between pairs of quantitative variables.
![[Pasted image 20250923114259.png]]

There is a problem called **overplotting** in scatter plot, where more than one data points "stacks". 
Methods to address overplotting:
1. Reduce point size (`size` parameter in `seaborn`)
2. Increase **transparency** of points (`alpha` parameter in `seaborn`)
3. **Jittering**: Add a small amount of random noise to all x and y values

![[Pasted image 20250923114735.png]]

#### Hex Plots
Rather than plot individual datapoints, make two-dimensional bins.
Use `jointplot` with `kind="hex"`
```python
sns.jointplot(data=df, x="x_column", y="y_column", kind="hex")
```

![[Pasted image 20250923114821.png|325]]



#### Contour Plots
2-dimensional version of a **KDE** plot (i.e., a smoothed hex plot)
Use `kdeplot` with `fill=True` (if you want the shade)
![[Pasted image 20250923115001.png]]
```python
sns.kdeplot(data=df, x="x_column", y="y_column", fill=True)
```
###### Summary
![[Pasted image 20250923115351.png]]


##### Linearization
We often want to **linearize**: rescale the data so x and y variables have a *linear* relationship. 
![[Pasted image 20250923115642.png]]

**Transformation Functions**
![[Pasted image 20250923120026.png]]
Log Transform
![[Pasted image 20250923120219.png]]

Power Transform
![[Pasted image 20250923120617.png]]

Now, we see a linear relationship between the **transformed** variables.
![[Pasted image 20250923121055.png]]

Rule of thumb for easier plotting in `seaborn`: 
- number of rows = number of data points
- number of columns = number of information channels

Stacked Bar Charts and Pie Charts are often BAD visualization.

![[Pasted image 20250923122945.png]]

---
## Sampling

A **census** is a **complete** count or survey of a **population**. 
- *Every individual* is included

A **survey** is a set of questions or measurements.
A census is ideal, but expensive and difficult to execute. 

A **sample** is a subset of a population.
- **Inference**: Drawing conclusions about a population based on a sample.
![[Pasted image 20250925112222.png]]

The best way to get a representative sample is through <u><b>randomization</b></u>

### Sampling Errors
##### Change error (i.e., variance)
- Random samples can vary from what is expected
- One way to reduce: *Increase* size of random sample
- Another option: *Stratify* 

![[Pasted image 20250925113216.png]]

> Chance error is usually related to the **smaple size**

##### Selection bias (i.e., sampling bias)
- Systematically excluding (or favoring) particular groups
- Example: [The Literary Digest poll](https://docs.google.com/presentation/d/1YqvdfY8zGJmbV_NwG5ajJKUuGe1GWU8DeJx67B1CiVM/edit?slide=id.g333a203ab8b_0_308#slide=id.g333a203ab8b_0_308) excluded people not in phone books.
- How to avoid: Randomly sample, and improve overlap of **sampling frame** and population
![[Pasted image 20250925114150.png]]

![[Pasted image 20250925114247.png|575]]


##### Response Bias (i.e., measurement bias)
- Miscalibrated survey questions. Desired measure differs from actual measure.
- Obvious Example: "Will you vote for Roosevelt or Landon? If you say 'Roosevelt', I will give you $1."
- Subtle Example: "Do you agree that you will vote for Roosevelt?" [We tend to prefer agreeing over disagreeing](https://en.wikipedia.org/wiki/Acquiescence_bias).
- How to avoid: Improve questions. Lots of response bias [subtypes+prevention methods](https://en.wikipedia.org/wiki/Response_bias#:~:text=%5B7%5D-,Types,-%5Bedit%5D).


##### Non-response Bias
- Survey respondents differ from non-respondents.
- Example: ~24% response rate to The Literary Digest poll.
- How to avoid: Increase response rate. For example, reduce the number and length of questions, incentivize completion, and follow up.

### Sampling Methods
#### Probability Sample
If we know the probability that any subset of individuals in the sampling frame will be selected, our sample is a **probability sample (i.e., a random sample)**.

>[!Definition: Probability Sample] 
>Every member of the population has a known, <u>nonzero probability</u> of selection.
##### Simple Random Sample (SRS)
Sample is drawn **uniformly** at random <u>without</u> replacement.
- Every subset of **n** individuals has the **same** chance of being selected where n = 1, 2, 3..

In other words:
![[Pasted image 20250925115730.png|300]]


![[Pasted image 20250925115518.png]]
This sampling scheme 
- Is a **probability sample** because there are 10 possible samples. Each one is equally likely. All other combinations have probability 0. 
- Has the same probability for each student being selected with $\frac{1}{10}$
- Is **NOT a simple random sample**, because the chance of selecting (3, 13) is 1/10 but the chance of selecting (3, 4) is 0.

##### Another Example: Stratifying
![[Pasted image 20250925120704.png]]
We have guaranteed proportional representation of undergrads and grad students.
In other words, we have **reduced chance error**. 

Sampling frame is divided into non-overlapping **strata** according to chosen characteristics.
- Then, a SRS is conducted on each **stratum**, with each sample size proportional to the stratum size. 
<br></br>

**Post-stratification**: <u>After</u> sampling, use knowledge about the population to **reweight** responses.
![[Pasted image 20250925121808.png]]
![[Pasted image 20250925121749.png]]
<br>

![[Pasted image 20250925122036.png]]
![[Pasted image 20250925122805.png]]

![[Pasted image 20250925122813.png]]

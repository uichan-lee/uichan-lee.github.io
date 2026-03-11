# Clustering
![[image-44.png]]

## K-Means Clustering
[Demo](https://docs.google.com/presentation/d/1IPPSUXFRQRm0zSQDa_sBtaLEy1Mr6L6V5uPs13P5Cog/edit?slide=id.g22f8a414dd6_0_192#slide=id.g22f8a414dd6_0_192)

Most popular clustering approach. The algorithm:
- Pick an arbitrary **k**, and randomly place **k "centers"**, each a different color.
- Repeat until convergence:
	- Color points according to the closest center.
	- Move center for each color to center of points with that color.

![[image-45.png|401x205]]

![[image-46.png]]


**Color points according to the closest center**
![[image-47.png|444x212]]

**Move center for each color to center of points with that color**
![[image-48.png|477x220]]

![[image-49.png|502x233]]

![[image-50.png|494x236]]
<center>...</center>

![[image-51.png]]
Above, we see the results after iteration 4 and 5:
- Centers **moved slightly** between iteration 4 and 5.
- But no points changed color. If we tried iteration 6, the centers won't move at all.
- Once cluster assignments stop changing, k-means has **converged**. Convergence is guaranteed, except in very odd edge cases.

> **K-Means** is a totally different algorithm than *"K-Nearest Neighbors"*

### Minimizing Inertia
Each time you run K-Means, you get a different output, depending on where centers started. 
![[image-52.png]]

Which is best?
- One approach: Define some sort of **loss function**. 

Goal: Come up with a loss function for clustering.
- What is "good" about the leftmost clustering, but "bad" about the right clustering? 


Two common loss functions:
- **Inertia**: Sum of squared distances from each data point to its center.
- **Distortion**: <u>Weighted</u> sum of squared distances from each data point to its center, where each point is weighted inversely to the total \# of points in its cluster.
![[image-54.png]]

#### Overfitting in K-means
If K = \# of data points, then every data point will be in its own cluster. 
The distance from each point to its cluster center is 0. So, inertia = 0.

This just like fitting a high degree polynomial that touches every point. Overfitting!

<u>Hard problem</u>: Give an algorithm that optimizes inertia for a **particular value of K**.
Algorithm:
- For all possible $k^n$ colorings:
	- Compute the k centers for that coloring.
	- Compute the inertia for the k centers. 

No better algorithm has been found (NP-hard problem).

> [!Question] Which clustering result do you like better? 
> ![[image-56.png]]
> 
> It turns out that $Inertia_A$ = 94.41 and $Inertia_B$ = 87.28.
> K-means prefer the cluster on the **right** side (A).
> - Why is the inertia (i.e., sum of squared distances) on the right side lower?
> - Do you agree that the rightmost clustering is better? 

## Hierarchical Agglomerative Clustering
1. Start with every data point as its own cluster.
2. Sequentially merge the most similar clusters until we have just one giant cluster. 

This is called a **bottom-up** and **agglomerative** method.
- The **linkage criterion** determines the order of combining clusters. 
![[image-57.png|494x183]]


### Linkage Criteria
- **Single Linkage**: <u>Min</u> distance between two points in different clusters determines next merge. 
- **Average Linkage**: <u>Average</u> of all pairwise distance between clusters determines next merge.
- **Complete Linkage**: For every pair of clusters, compute <u>max</u> distance between any two points. Merge the cluster pair with the smallest max distance. 
![[image-59.png]]

[Agglomerative Clustering - Complete Linkage Demo](https://docs.google.com/presentation/d/1IPPSUXFRQRm0zSQDa_sBtaLEy1Mr6L6V5uPs13P5Cog/edit?slide=id.g8e2e3a4c90_0_1144#slide=id.g8e2e3a4c90_0_1144)

On the full dataset, our agglomerative clustering algorithm gets the "correct" output. 
![[image-60.png]]

## Picking K
The algorithm from today require us to **pick a value of K** <u>before</u> we start.
- But how do we pick K? 

Often, the best K is **subjective**
- How many clusters are there in the plot of U.S. states? 

#### Picking K: Elbow Method
For K-Means, one approach is to plot **inertia** versus many different K values. 
- Pick the K at the "elbow", where we get diminishing returns to increasing K.
- But, data often lacks an elbow!
![[image-62.png]]

#### Picking K: Dendrogram
The algorithm starts with the individual data points at the bottom.
- When two points are merged, they are bridged in the dendrogram.
- Th y-axis reports the distance between points/clusters when they are merged. 

Cut the dendrogram just before the first "big" gap between the horizontal lines. 
- The number of cut lines represent the optimal K. 
![[image-63.png]]
(붉은 점선 밑 4개 cluster)

### Silhoutte Scores
To evaluate how "well-clustered" a specific data point is, we use the "silhouette score".
- **High score**: <u>Close</u> to points in its own cluster. <u>Far</u> from points in other clusters.
- **Low score**: <u>Far</u> from points in its own cluster. <u>Close</u> to points in other clusters.
![[image-64.png]]

Maximum silhouette score is when A = 0 (every point in same location in cluster), giving S = 1.
S can also be negative, if A > B.

We can plot the Silhouette Scores for all of our data points.
- Points with **large** silhouette scores are *deeply embedded* in their cluster. We want this!
- Red dotted line shows the average.
![[image-65.png]]

K = 2 vs. K = 3
![[image-66.png]]


### Picking K: Real World Metrics (Example via Andrew Ng)
Real world metrics can guide the choice of K. Assume that you have a T-shirt production line and need to decide which T-shirt sizes to produce.

Perform 2 clusterings:
- Cluster customer heights + weights with K = 3 to design Small, Medium, and Large shirts.
- Cluster heights + weights with K = 5 to design XS, S, M, L, and XL shirts. 

To pick K:
- Consider projected costs and sales for 2 different K's.
- Pick the one that maximizes profit. 


---
# Principal Component Analysis (PCA)

##### Taxonomy of Machine Learning
![[image-68.png]]
"Supervised Learning": Create a function that maps features to **outcomes** (i.e., labels).
"Unsupervised Learning": Identify patterns in **unlabeled** data.
- We have **features** but **no labels**.
	- Sometimes we may have labels, but we choose to ignore them. 

> [!Question] How many dimensions can you visualize on a 2-dimensional screen?
> Physically, we can only plot up to 3-dimensional plots. 
> However, we can add more geometries in the plots to express higher dimensional data. (e.g., color of a point, shape of a point, size of a point, transparency of a point, etc. ) So we can actually plot unlimited dimensional data, although it will look very ugly with high dimension. 
> 
> ![[image-69.png|400]]
> In the above plot, color of a point represents the `model_year`, which is another dimension. So the plot above is representing 4-dimensional data. 

## Dimensionality

### Intrinsic Dimension of Data
Suppose we have a dataset of:
 - **N** observations (datapoints)
 - **d** attributes (features)

In Linear Algebra:
**N** points/row vectors in a **d**-dimension space, OR
**d** column vectors in an **N**-dimension space

**Intrinsic dimension** of a dataset is the **minimal** set of dimensions needed to approximately represent the data.

**Example**:
- 3D dataset →
- Mostly described by position on the 2D-plane

Intrinsic Dimension $\approx$ 2


**Dimension of the column space** of A is the *rank* of matrix A.
![[image-70.png]]

> [!Question] Dimensionality of the Column Space of Data?
> ![[image-71.png]]
> 
> Dataset 3: **A** (1-dimensional)
> Dataset 4: **C** (3-dimensional)
> ![[image-72.png]]

Note that in the dataset below, we've added one <u>outlier</u> point to Dataset 3.
- Just this one outlier is enough to change the **rank** of the matrix to 2.
- But, the data is still <u>approximately 1-dimensional</u>!

![[image-73.png|295x202]]
**Intrinsic dimension** of a dataset is the **minimal** set of dimensions needed to *approximately* represent the data.

**Dimensionality reduction** is generally an *approximation* of the original data.
This is often achieved through **matrix factorization**.
<br>


## PCA: Visual Intuition

> [!Note] Maximizing Variance: A common point of confusion
> In supervised learning, we often say that **minimizing variance** is a goal.
> 
> This is shorthand for minimizing the **variance of our predictions ($\hat{Y}$)**. We want similar predictions across models trained on different random samples of the same population.
> 
> In this section, we talk about **maximizing variance** captured from the original data.
> 
> We want to retain **variance of the features (X)**. Variance in the features is **information**. For example, if the features have no variance, we cannot use them to make predictions. 
> 
> ![[image-74.png]]

[Visual Demo](https://docs.google.com/presentation/d/1ufN64V925TUWjJC4Pd2-fEnD2rI_ZyegMtyLr1PjdzA/edit?slide=id.g3a40c514673_0_708#slide=id.g3a40c514673_0_708)
![[image-75.png|469x319]]


Find the average point (<span style="color: red;">red X</span>), and project every points on the average y (Rating 2).


![[image-76.png|322x285]]

![[image-77.png|320x292]]

We can do the same thing for average X (Rating 1). 
![[image-78.png|320]]

![[image-79.png|400]]



There are two equivalent ways to frame PCA: 
1. Finding the directions of **maximum variability** in the data
2. Finding the low dimensional (rank) matrix factorization that best **approximates** the data.

![[image-80.png|565x378]]

#### PC1
![[image-81.png]]

![[image-82.png]]

![[image-83.png|402x410]]

Is **Var(Latent Feature 1) > Var(Rating 1)** and **Var(Latent Feature 1) > Var(Rating 2)**?
![[image-84.png]]

#### PC2
PC2 is the direction of maximal variance that is **orthogonal** to PC1 (i.e., uncorrelated)
![[image-85.png|461x352]]

![[image-86.png]]

![[image-87.png]]

---
## PCA: Linear Algebra

> [!QUESTION] Why perform PCA?
> Goal: Transform observations from high-dimensional data down to **low-dimensions** (often 2) through linear transformations.
> Related Goal: Low-dimension representation should capture the **variability** of the original data.

1. **Visually** identify clusters of similar high-dimensional observations.
   - Most visualizations are 2-D, so often construct 2 dimensions.

2. You believe the data are inherently low rank, e.g., *just a features* could approximately determine the rest through linear associations.
3. Some models benefit from decorrelated features (e.g., Naive Bayes).
   - PCA **eliminates correlations** between features.
<br>

> [!NOTE] Matrix Multiplication View
> There are two ways to **interpret** matrix multiplication:
> 1. Linear operations per datapoint
> 2. <u>Column transformation</u> (useful today)
> 
> ![[image-88.png]]
> 
> OLS: To get $\hat{Y}$ vector, $\theta_1$ parts feature 1 + $\theta_2$ parts feature 2 + ...

Suppose we have this (100 X 4) original matrix **X**. 
We want a (4 X 2) transformation matrix, or *principal components* V, that transforms **X** into (100 X 2) matrix. 
$$ XV = Z $$
![[image-89.png]]
> We can use more than 2 (3, 4, ...) but 2 is intuitive and common.

<br>

The PCs are **recipes** for constructing the **latent features**.

"To make our new + improved **Latent Feature 1**, combine `PC1[0]` parts `width`, `PC1[1]` parts `length`, `PC1[2]` parts `area`, and `PC1[3]` parts `perimiter`."

![[image-90.png]]

#### PCA Plot
We often construct a scatter plot of the **first two latent features**. This is called a *PCA plot*. 
- PCA plots allow us to visually assess similarities between our data points and if there are any clusters in our dataset. 
![[image-91.png|445x202]]

If PC1 + PC2 explain a large % of the **total variance**, then the PCA plot is a <u>good representation</u>.
If not, then a **PCA plot** is omitting lots of information. 

#### Capturing Total Variance
We define the **total variance** of a data matrix as the sum of variances of attributes.

> [!note] Goal of PCA, restated:
> Find a linear transformation that creates a low-dimension representation which captures as much of the original data's **total variance** as possible.

Two approaches of choosing latent features:
![[image-92.png]]

![[image-93.png]]

#### Scree Plot
A **scree plot** shows the variance ratio captures by each principal component, largest first. 

![[image-94.png|583x289]]

We fully re-construct the rectangle data with 3 PCs, since the rank of the rectangle matrix is 3. But, 1 PC captures most of the variance! 

#### Biplot
![[image-95.png|342x158]] The $i$-th row of **V** indicates **how much feature i contributes** to each PC. Cols of V are the PCs ("recipes") <span style="font-size:12;">First row of V = [0.9, 0.44] → PC1 linear combo is 0.9 parts feature 1, and PC2 has -0.44 parts feature 1.</span>

Biplot superimpose **feature influence** on plot of PC1 vs. PC2.

Biplot help us interpret how features influence the PCs: positively, negatively, or not much at all. 

Simplest biplot: Plot the rows of V with no scaling. 
- For other scalings, which can lead to more interpretable directions/loadings, see [SAS Biplots](https://blogs.sas.com/content/iml/2019/11/06/what-are-biplots.html)
![[image-96.png|369x312]]


### Summary: Plots Based on PCA
![[image-97.png]]


# Singular Value Decomposition (SVD)

**Singular Value Decomposition** (SVD) decomposes a matrix into a product of three matrices.
- We will not prove:
	- How the SVD is computed
	- Why SVD is a valid decomposition of rectangular matrices.

![[image-98.png]]
![[image-99.png]]
```python
U, S, Vt = np.linalg.svd(X, full_matrices=False)
```

### Computing Latent Vectors Using X * V
Constructing a 2 PC approximation (k=2). PCs as a "recipe" to make Z from features in X.
![[image-102.png]]

![[image-100.png]]


### Computing Latent Vectors Using U * S
Equivalent construction of Z. **U cols are normalized Z cols**. S "scales up" U cols to Z cols.
![[image-101.png]]

### Recovering the Data
Given the entire Z matrix we can recover the **centered X** by **multiplying by $V^T$**:
![[image-103.png]]
This is like **inverting** our PC recipe :LiArrowBigRight: How do we combine our latent features (Z) to get back our original features (X)?

If you choose **k < r**, where r is rank(X), you will only recover X **approximately**.

## Centering Data and Computing Variance
We define the **total variance** of a data matrix as the sum of variances of attributes.
![[image-104.png]]

![[image-105.png]]

> $P = XV = U\Sigma$ is sometimes known as the "principal component matrix"

### Variance Ratios
![[image-106.png]]

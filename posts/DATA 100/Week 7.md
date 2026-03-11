# Ordinary Least Squares (OLS)
![[Pasted image 20251007112101.png]]

>[!Definition] 
> **Ordinary Least Squares (OLS)** 
> = Multiple Linear Regression + Mean Squared Error (MSE, L2 Loss) 

![[Pasted image 20251007112739.png|500]]
![[Pasted image 20251007112954.png|550]]
- Row corresponds to a single observation
- Column corresponds to $n$ observations of a same feature


##### Vector Dot Product #LinearAlgebra
The **dot product** is a vector operation that
- Can only be carried out on two vectors with the <u>same number of entries</u>
- Sums up the products of the corresponding entries of the two vectors, and
- Returns a single number
![[Pasted image 20251007113137.png|550]]

##### Linear in Theta
![[Pasted image 20251007113715.png]]


##### Vector Notation
![[Pasted image 20251007114103.png]]
![[Pasted image 20251007114119.png|550]]

##### Matrix Notation
![[Pasted image 20251007114500.png]]
![[Pasted image 20251007114509.png|500]]
![[Pasted image 20251007114520.png]]
- $\hat{\mathbb{Y}}=\mathbb{X}\theta$
- Prediction Vector ($\hat{\mathbb{Y}}$) dimension: $\mathbb{R}^n$
- Design Matrix ($\mathbb{X}$) dimension: $\mathbb{R}^{n\times (p+1)}$
- Parameter Vector ($\theta$) dimension: $\mathbb{R}^{(p+1)}$

##### The Design Matrix $\mathbb{X}$
We can use linear algebra to represent our predictions of all $n$ data points at the same time.
One step in this process is to stack all of our input features together into a **design matrix**:
![[Pasted image 20251007115403.png]]

##### Vector Norms and L2 Vector Norm #LinearAlgebra 
The **norm** of a vector is some measure of that vector's size/length
For the n-dimensional vector $\vec{x}$, the L2 vector norm is:
![[Pasted image 20251007120358.png]]


![[Pasted image 20251007120528.png]]
##### Mean Squared Error with L2 Norms
![[Pasted image 20251007121127.png]]

> [!Question] How Should We Interpret the OLS Problem?
> ![[Pasted image 20251007121541.png]]
> 
> Answer: D. **All of the above**

##### Span #LinearAlgebra 
The set of all possible linear combinations of the columns of $\mathbb{X}$ is called the **span** of $\mathbb{X}$ (denoted $span(\mathbb{X})$), also called the **column space**.
![[Pasted image 20251009151305.png]]

- Intuitively, this is all of the vectors you can "reach" using the columns of $\mathbb{X}$.
- If each column of $\mathbb{X}$ has length **n**, $span(\mathbb{X})$ is a subspace of $\mathbb{R}^n$.

##### Matrix-Vector Multiplication #LinearAlgebra 
So far, we've thought of our model as horizontally stacked predictions per datapoint. 
![[Pasted image 20251009151730.png]]

However, we can also think of matrix-vector multiplication by columns. 
We can think of $\hat{\mathbb{Y}}$ as a **linear combination of feature vectors**, scaled by *parameters*.
![[Pasted image 20251009151811.png]]

- In the figure above, there are only two columns (two features) in the design matrix $\mathbb{X}$, excluding the bias column. (Therefore, there will be only two $\theta$'s–$\theta_1$ and $\theta_2$)

Prediction is a Linear Combination of Columns
Our prediction $\hat{\mathbb{Y}}  = \mathbb{X}\theta$ is a **linear combination** of the columns of $\mathbb{X}$. Therefore $\hat{\mathbb{Y}}\in span(\mathbb{X})$. 
- Interpret: Our linear prediction $\hat{\mathbb{Y}}$ will be in $span(\mathbb{X})$, even if the true values $\mathbb{Y}$ might not be. 
- Goal: Find the vector in $span(\mathbb{X})$ that is **closest** to $\mathbb{Y}$

![[Pasted image 20251009152410.png]]

> [!Important]
> This visualization works because we have 3 observations, and two parameters. If there are more parameters and observations, we can't visualize it because the dimension becomes larger than 3. 
> However, this visual intuition still works on larger scale.

> So how do we minimize this distance – the norm of the residual vector (squared)?

##### Orthogonality #LinearAlgebra 
1. Vector $\vec{a}$ and $\vec{b}$ are **orthogonal**  if and only if if their dot product is 0. $a^Tb=0$
This is generalization of the notion of two vectors in 2D being perpendicular.

2. A vector $\vec{v}$ is **orthogonal** to $span(M)$, the span of the columns of a matrix $M$, if and only if $\vec{v}$ is orthogonal to *each column* in $M$. 

![[Pasted image 20251009153156.png]]

![[Pasted image 20251009153406.png]]

So, the **MOST IMPORTANT EQUATION** of OLS is:
$$\hat{\theta} = (\mathbb{X}^T\mathbb{X})^{-1}\mathbb{X}^T\mathbb{Y}$$

This exists when $(\mathbb{X}^T\mathbb{X})$ is invertible. How de we know when it's invertible? 

##### Residual Properties
1. When using the optimal parameter vector, our residuals $e=\mathbb{Y}-\mathbb{X}\hat{\theta}$ are orthogonal to $span(\mathbb{X})$. 
2. Since our predicted response $\hat{\mathbb{Y}}$ is in $span(\mathbb{X})$ by definition, $\hat{\mathbb{Y}}^Te=0$, and hence it is orthogonal to the residuals. 
3. For all linear models with an **intercept term**, $\hat{y} = \theta_0 + \theta_1x_1 + \dots + \theta_px_p$, **the sum of residuals is zero**.

##### Does a Unique Solution Always Exist?
![[Pasted image 20251009154449.png]]

Two scenarios where $\mathbb{X}$ is not **full column rank**:
1. If our design matrix $\mathbb{X}$ is "wide"
- If fewer observations than features (n < p+1), $\hat{\theta}$ is not unique.
- We often have n >> p, so this is a less common issue. 
2. If our design matrix $\mathbb{X}$ has features that are **linear combinations of other features**.
- By definition, rank of $\mathbb{X}$ is # of linearly independent columns.
	- Perimeter = 2 * Width + 2 * Height $\rightarrow \mathbb{X}$  is not full column rank. 


> [!Summary]
> 1. Goal of OLS
>    Find the minimizing $\theta$, $\hat{\theta}$, such that the predicted value $\hat{\mathbb{Y}} = X\hat{\theta}$ is closest to the real $\mathbb{Y}$.
> 2. Geometric Interpretation
>    OLS is "a process of projecting Y onto the column space of X".
>    residual: $e=Y-\hat{Y}$ is orthogonal to the column space of X.

---
# Discussion

[Slides](https://docs.google.com/presentation/d/1jtUsX7SaXh1L4bsNaH9Ye5hj5lRHavqeLffa1WfZyh0/edit?slide=id.g385a59f2f9a_0_2939#slide=id.g385a59f2f9a_0_2939)
![[Pasted image 20251007141748.png]]
- Any $x_{ip}$ represents a **feature** of the dataset.
- Any $\theta_p$ represents a **parameter** of our model
- $\hat{y_i}=x_i^T\theta$

![[Pasted image 20251007141911.png]]

Any prediction vector $\hat{y}$ is a linear combination of the columns of the $\mathbb{X}$ matrix.
![[Pasted image 20251007142152.png]]
- We say that $\hat{y}$ is the **span** or **column space** of $\mathbb{X}$
- In other words: we can add up some combination of the columns of $\mathbb{X}$ to create $\hat{y}$

For MSE loss, our best guess for the true $Y$ vector is the orthogonal projection of the $Y$ vector onto $span(X)$. We can use this fact to deduce the optimal $\vec{\theta}$.
![[Pasted image 20251007142502.png]]

### OLS Equation
$$\hat{\theta} = (X^TX)^{-1}X^TY$$

- This expression only works when $X^TX$ is invertible. This only occurs when all columns of $X$ are linearly independent. 

![[Pasted image 20251007143236.png]]


---

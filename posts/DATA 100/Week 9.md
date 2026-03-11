# Batch, mini-batch, and stochastic gradient descent

![[Pasted image 20251021114849.png]]

**Epoch:** One pass through <u>all</u> n data points while updating the parameters.
For example: we can calculate the **exact** gradient with all n data points (i.e., 1 epoch), as before:
![[image.png]]
This is *one epoch* of gradient descent with *one update* to the parameter vector. 

What if we split one epoch into two pieces, and perform gradient descent on both of them? 
![[image-1.png]]

We can use a *random sample* to *approximate the gradient*
![[image-2.png]]

This optimization algorithm is called **Mini-batch gradient descent**, while the original one (using entire epoch)

We are taking **n/b mini batches, each of size b**.

![[image-3.png]]

> [! Facts]
> - One epoch of mini-batch gradient descent updates will get you <u>closer</u> to a minimum of a function than one epoch of gradient descent update.
> - One parameter update of mini-batch is less computationally expensive than one parameter update of gradient descent. 
> - One epoch of gradient descent updates (one update) is less computationally expensive than one epoch of mini-batch gradient descent updates (n/b updates) .

![[image-4.png]]

Taking mini-batch gradient descent to extreme, we can take b = 1 to have **Stochastic Gradient Descent (SGD)**

![[image-5.png]]



# Feature Engineering
### One-hot Encoding
![[Pasted image 20251023111415.png]]

The one-hot encoded features can then be used in the design matrix to train a model. 
![[Pasted image 20251023111451.png]]

Interpreting the `day_Fri` coefficient:
When interpreting a coefficient, try setting other parameters as 0 (even though that doesn't make sense)
![[Pasted image 20251023111615.png]]

The problem is that any set of one-hot encoded columns will always sum to a column of all ones:
![[Pasted image 20251023111817.png]]
If we also include a bias column in the design matrix, there will be **linear dependence** in the model. $\mathbb{X}^T\mathbb{X}$ is not invertible, so our OLS estimate fails. 

How to solve?
1. Designate a one-hot encoded column as a **reference level** and remove the column from X.
2. Do not include a bias column (i.e., **remove the intercept**)
3. Regularize

![[Pasted image 20251023112001.png]]
This choice is about **interpretation**. Predictions are always the same for Options 1 and 2.

What happens if we omit the `day_fri` column and include an intercept?
![[Pasted image 20251023112051.png]]

---
### Polynomial Features
![[Pasted image 20251023112454.png]]

$$ \hat{y} = \theta_0 + \theta_1(hp) + \theta_2(hp^2) $$
This is still a **linear model**. Even though there are non-linear features, the model is linear with respect to $\theta$ (though not linear with respect to *hp*.
![[Pasted image 20251023112615.png]]

What if we add more polynomial features? 
![[Pasted image 20251023112651.png]]

![[Pasted image 20251023112714.png]]
As we continue to add more polynomial features, the MSE decreases.
Equivalently: As the **model complexity** increases, its *training error* decreases.
![[Pasted image 20251023112754.png|775]]

Given **N** data points with different x-values, we can always find a polynomial of degree **N-1** that goes through all those points. 
![[Pasted image 20251023113141.png]]

![[Pasted image 20251023113126.png]]

Complex models are sensitive to the specific dataset used to train them. 
In other words, they have high **variance**, because the fitted model will **vary** a lot across different training samples, even if they were randomly drawn from the same population! 
![[Pasted image 20251023113248.png]]

We know that we can **decrease training error** by increasing model complexity.
However, models that are too complex (e.g., high-degree polynomial) do not generalize well. 
![[Pasted image 20251023113503.png]]


## Cross-Validation

### Training, Test, and Validation Sets

A **test set** is a portion of our dataset that we "hold out" from model training.
- The test set is only used <u>once</u> to compute the performance (MSE, RMSE, etc) of the model after model fitting is finalized. 

> [! Important] Problem
> What if we are dissatisfied with our **one-time** test set performance? We can't go back and adjust our model–that's cheating!
> We'd be *factoring in information from the test set* to redesign our model. The test set would no longer fairly represent the performance on unseen data.

A **validation set** is a "held-out" portion of the *training set* that can be used **more than once**.
- Train model on training set. Evaluate model on the validation set. Adjust model. <u>Repeat.</u>
- At the very end, evaluate on the test set <u>once</u>.
![[Pasted image 20251023114907.png]]

![[Pasted image 20251023114043.png]]
> Variance: How much our model changes if fit to a new random sample of data. 

### K-Fold Cross-Validation
A **fold** is a chunk of data.
- Our training data has 5 folds, each containing 20% of the data. 
![[Pasted image 20251023115018.png|200]]
In **cross-validation (CV)**, we evaluate the model on *each* of these folds

For a dataset with K folds:
- Pick one fold to hold out.
- Train model on data from every other fold.
- Compute the error on the held-out fold.
- Repeat for all K Folds

The **cross-validation (CV) error** is the average error across all K held-out folds. 
![[Pasted image 20251023115206.png]]

![[Pasted image 20251023115728.png]]


#### Hyperparameters
Cross-validation is often used for **hyperparameter** selection.

**Hyperparameter**: A parameter of a learning process chosen <u>by us</u>.
- Cannot solve for hyperparameters via calculus, OLS, gradient descent, etc.
- Examples
	- Degree of polynomial model
	- Gradient descent learning rate, $\alpha$
	- Regularization penalty, $\lambda$

![[Pasted image 20251023120039.png]]


> [!Summary]
> ![[image-6.png]]
## Regularization

**Regularization** restricts complexity by limiting the magnitudes of the model parameters $\theta_i$'s.
Example: The sum of all absolute parameters could be no longer than some number Q. 
$$ \sum_{j=1}^{p}|\theta_j| \leq Q $$

![[image-7.png]]

We've given the model a **budget** for how much weight it can assign to each feature. 
Assign larger $\theta_j$ only to the **most predictive features**. Use your budget where it counts! 

![[Pasted image 20251023121449.png]]


When we apply the constraint $\sum_{j=1}^{p}|\theta_j| \leq Q$, only parameter combinations inside the diamond are allowed. (Q some arbitrary number)
![[Pasted image 20251023121524.png|500]]

Size of Q
![[Pasted image 20251023121600.png]]

When Q is very small, parameters are set to (essentially) 0.

If the model has no intercept term:
$\hat{\mathbb{Y}} = (0)x_1+(0)x_2=0$
If the model has an intercept term:
$\hat{\mathbb{Y}} =\theta_0 + (0)x_1+(0)x_2=\theta_0$

Remember: The **intercept term is excluded** from the constraint. Otherwise, we bias towards predicting 0 instead of the mean of Y.

#### L1 Regularization (LASSO)
In **L1 regularization**: Find $\theta_j$'s that minimize the objective function: 
![[Pasted image 20251023123031.png]]

By the Lagrangian Duality, these two problems are equivalent
![[Pasted image 20251023123052.png]]
$\lambda$ is the **regularization penalty hyperparameter**. When $\lambda$ is large, larger $\theta_j$'s are penalized $\rightarrow$ model will adjust by reducing $\theta_j$'s and decreasing complexity. 

How to choose the best value for $\lambda$? Cross-validation!

L1 regularization is also called **LASSO**: "least absolute shrinkage and selection operator".

In `sklearn`, we use the `Lasso` model class
```python
import sklearn.linear_model as lm
lasso_model = lm.Lasso(alpha=1) # alpha represents lambda
lasso_model.fit(X_train, Y_train)
lasso_model.coef_
```

##### Pitfalls of Unscaled Data
The features with larger values will naturally contribute more to $\hat{\mathbb{Y}}$  for each observation. 
- Compared to $hp^8$, LASSO model needs to "spend" more of its parameter budget on $hp$.
![[Pasted image 20251023123546.png]]

Ideally, our data should all be on the same scale.
- One approach: Standardize the data. Subtract mean and divide by SD.
$$z_k = \frac{x_k-\mu_k}{\sigma_k} $$
```python
lasso_model_scaled = lm.Lasso(alpha=1)
lasso_model_scaled.fit(X_train_standardized, Y_train)
lasso_model_scaled.coef_
```

#### L2 Regularization (Ridge)
We could have applied a different constraint to our parameters: The sum of their *squares* must be less than some number Q. 
![[Pasted image 20251023123728.png]]

As with L1 regularization, we can express this constraint in two forms:
![[Pasted image 20251023123747.png]]
L2 regularization is commonly called **ridge regression**.
```python
import sklearn.linear_model as lm
ridge_model = lm.Ridge(alpha=1)
ridge_model.fit(X_train, Y_train)
ridge_model.coef_
```

**LASSO vs. Ridge** Regression
![[Pasted image 20251023123930.png]]


![[Pasted image 20251023122910.png]]

# Defining Distributions
- Random variables are random – they take on a given value with certain probability.
- The distribution of an RV describes the probability that the variables takes on any possible value. 

The distribution of the random variable $X$ tells us
$$P(X = x) = ?$$
for any given value of $x$ that $X$ could possibly take on

e.g., $x$ = face of a flipped fair coin 
$P(X = 1) = 0.5$ 
$P(X = 0) = 0.5$

**Expectation**: what value we "expect" the variable $X$ to have 
$$\mathbb{E}(X) = \sum{xP(X=x)}$$
Coin Example: $\mathbb{E}(X) = 1\cdot(0.5)+0\cdot(0.5)=0.5$

**Variance**: how much we "expect" the variable $X$ to vary from $\mathbb{E}(X)$.
$$ Var(X) = \mathbb{E}((X-\mathbb{E}(X))^2) $$

**Standard Deviation**: a sense of how $X$ varies, in the units of $X$
$$ SD(X) = \sqrt{\mathbb{E}((X-\mathbb{E}(X))^2)} $$


## Bernoulli Distribution 
- Say we have two possible outcomes: something happens, or it doesn't
	- For example, we take a flyer from Sproul, or we don't
	- Often represented as an indicator, $I$
- We represent one of the outcomes with "1", and the other with "0".
	- 1: we take the flyer
	- 0: we don't 
$$
\text{Bernoulli}(p) :
\begin{cases}
P(I = 1) = p \\
P(I = 0) = 1 - p
\end{cases}
$$
- $\mathbb{E}(I) = p(1) + (1-p)(0) = p$
- $Var(I) = p(1-p)$

> [! Important]
> Bernoulli Distribution is different from Binomial Distribution. 

## Binomial Distribution
We use binomial distribution when:
- Sampling from two different categories, <u>several times</u>. We call one category a "success", and the other a "failure".
- The probability of success is the same with every trial.
- The outcome of any trial doesn't affect the outcomes of the others (independent)

The probability of $k$ successes out of $n$ trial is:
![[image-8.png]]
- $n$ choose $k$: $\begin{pmatrix}n\\k\end{pmatrix} = \frac{n!}{k!(n-k)!}$ 

Another perspective: we're doing several repeated Bernoulli trials! 
- If Sproul has $n$ flyers, we decide whether or not to take a flyer $n$ times

If we represent any instance of taking/not taking the flyer as $I_m$, we can directly add the expectation from our Bernoulli example $n$ times:
$$
\begin{align} 
\mathbb{E}(X_{Bin}) 
 &= \mathbb{E}(I_1+I_2+\dots+I_n) \\
 &= \mathbb{E}(I_1) + \mathbb{E}(I_2) + \dots + \mathbb{E}(I_n)\\
 &= p + p + \dots + p \\
 &= np \\
Var(X_{Bin}) &= np(1-p) 
\end{align}
$$



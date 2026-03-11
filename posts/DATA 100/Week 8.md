# `sklearn` and Gradient Descent
[Slide](https://docs.google.com/presentation/d/1LjGudc2zz37J5S8VzK8-lKJxqcP8stoMevBK7fvShHA/edit?slide=id.g2fa1b702420_0_193#slide=id.g2fa1b702420_0_193)
[Demo](25-student/lecture/lec14/lec14.ipynb)

**Calculating OLS with the Normal Equation**

---
##  `sklearn`  to fit our Multiple Linear Regression Model

1. **Initialize** a new model interface
   `my_model = lm.LinearRegression`
2. **Fit** the model to the training data
   `my_model.fit(X, y)`
3. Use fitted model to make **predictions**
   `my_model.predict(X_new)`

To extract the model's **parameters**: `my_model.coef_` and `my_model.intercept_`

Example:
```python
from sklearn.linear_model import LinearRegression
model = LinearRegression()

model.fit(
	X=df[["flipper_length_mm", "body_mass_g"]],
	y=df["bill_depth_mm])
	
model.predict(df[["flipper_length_mm", "body_mass_g"]])

model.intercept_

model.coef_
```
![[Pasted image 20251014123442.png|300]]
--- 
## Gradient Descent
We're looking for the value $\hat{\theta}$ that minimizes our loss function.
In this lecture (doc), we will consider the loss function graph when there is <u>only one parameter</u> (excluding the bias term, $\hat{\theta_0}$).

But for now, let's think about a general graph $x, f(x)$. 

Starting from a random guess $(x)$, we can
1. **Face** the path of least resistance
2. **Move** in that direction a little bit
3. **Iterate** until the path of least resistance is to stay put

So how do we find the <u>path of least resistance</u>?
The answer is derivative! 

**Slopes Tell Us Where to Move Along the Horizontal Axis**
![[Pasted image 20251014114149.png]]
We can express it in an equation.
![[Pasted image 20251014114821.png]]

The opposite sign of the derivative at each point tells us the direction of our next guess.
![[Pasted image 20251014115020.png]]

However, this algorithm might result in an infinite oscillation!
![[Pasted image 20251014115222.png|450]]

When we step left or right to move our point downhill, <u>how big of a step</u> should we take each time? 

---
##### Learning Rate

![[Pasted image 20251014115234.png]]

> [!Note]
> The value of $\alpha$ is between (0, 1)
> In Data 100, the learning rate is constant. $\alpha$ could also decrease over time, or *decay*.

**Improved Algorithm (with learning rate $\alpha$):**
![[Pasted image 20251014115317.png|500]]

When do we **stop updating**? 
- After a fixed number of updates (e.g. T = 1000), OR
- Updates becomes really small.
![[Pasted image 20251014115454.png]]


##### Multiple Minima
What if our initial guess had been elsewhere? 
The algorithm may have gotten "stuck" in a local minimum. :LiAnnoyed:
![[Pasted image 20251014124249.png]]

###### Convexity
![[Pasted image 20251014124356.png]]
In Calculus term: It's concave up in any point in the domain.

For a **convex** function, <u>any local minimum is a global minimum</u>.
- The "arbitrary function" in the earlier demo is non-convex
- **MSE is convex**, which is why it's a popular choice of loss function
- MAE is also convex

Gradient descent is **only guaranteed to converge for convex functions** (given enough iterations and an appropriate step size).
![[Pasted image 20251014124530.png]]

---
### Gradient Descent on a 1D Model
Recall: When modeling, we aim to identify the model parameters $(\hat{\theta})$ that minimize a loss function. 

We will most often use "loss" to refer to a <u>model's average error across the dataset</u>. Also known as the empirical risk (R), cost function, or objective function. 
$$ L(\theta) = R(\theta) = \frac{1}{n}\sum_{i=1}^{n}{l(y,\hat{y})} $$

**Goal:** choose the value of $\theta$ that minimizes $L(\theta)$, the model's **loss** on the dataset
![[Pasted image 20251014124955.png]]

**Gradient**: The direction of steepest <u>ascent</u> for a function at some specific input. 
![[Pasted image 20251014121934.png]]

### Gradient Descent on high-dimensional Models
Usually, models will have <u>more than one parameter</u> that needs to be optimized.
![[Pasted image 20251014125634.png]]
**Idea**: Expand gradient descent to update our guesses for *all* parameters.


![[Pasted image 20251014125733.png]]

On a 3D (or higher) loss surface, the **gradient** $\nabla_{\vec{\theta}}L$ is a **vector** of partial derivatives.
![[Pasted image 20251014125947.png]]

![[Pasted image 20251014130025.png]]


---
## Feature Functions

Recall that a linear model has a form of $\hat{y} = \theta_0 + \sum_{j=1}^p{x_j\theta_j}$, where $\hat{y}$ is a quantitative continuous variable. 
Our features don't need to be numbers: we could have categorical variables such as names. Additionally, the true relationship doesn't have to be linear, as we could have a relationship that is quadratic. 

In these cases, we often apply **feature functions**, functions that take in some value and output another value. 
This might look like converting a string into a number, combining multiple numeric values, or creating a boolean value from some filter.

If we use $\phi$ to represent the feature function or transformation applied to our data, then our model takes the following form:
$$ \hat{y} = f_\theta(x) = \theta_0 + \sum_{j=1}^p{\phi(x)_j\theta_j} $$
<center>

</center>

![[Pasted image 20251019221048.png|500]]

---
##### Example Feature Functions
1. **One-hot Encoding**
   - Converts a single categorical feature into many binary features, each of which represents one of the possible values in the original column. 
   - Each of the binary feature columns produced contains a *1* for rows that had the column's label in the original column and *0* elsewhere.

2. **Polynomial Feature**
   - Creates polynomial combinations of features.
   
3. **Normalized/Standardized Feature**
   - Normalizes features so they have a mean of 0 and a standard deviation of 1.


### One Hot Encoding

One technique to deal with non-numeric data is to perform **one-hot encoding** – treat each category as its own binary variable.
![[Pasted image 20251019214528.png]]
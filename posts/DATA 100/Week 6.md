# Simple Linear Regression
![[Pasted image 20250930112120.png]]


##### The Regression Line
The **regression line** is the unique straight line that minimizes the mean squared error of estimation among all straight lines.
![[Pasted image 20250930112315.png|450]]
![[Pasted image 20250930112323.png|450]]

##### Correlation
Correlation measures the strength of a **linear association** between two variables. $|r|\leq 1$
![[Pasted image 20250930112511.png]]

> The **correlation** $r$ is the **average** of the **product** of x and y, both measured in standard units. 

![[Pasted image 20250930112624.png|520]]
![[Pasted image 20250930112726.png]]
- $n$ is the number of data pairs. 

![[Pasted image 20250930113233.png]]

##### Parametric Model
**Parametric models** are described by parameters. ($\theta_0, \theta_1, etc.$)
- The $x, y$ values are **not** parameters. 
- Parameters are like sound settings.
- $\hat{\theta}$ is an **estimate** of a parameter $\theta$ based on a sample of $x, y$ values.
	- The "hat" denotes a estimated or predicted quantity.
	- $\hat{y}$ is a prediction. $\hat{\theta}$ is estimated from data. $\hat{\theta}$ is one possible sound setting.
- We pick the "**best**" estimated parameters according to some chosen criterion. 
![[Pasted image 20250930113609.png]]


##### The Modeling Process
![[Pasted image 20250930114051.png]]


#### 1. Choose a Model: Simple Linear Regression Model (SLR)
$$\hat{y} = \theta_0 + \theta_1x$$

SLR is a **parametric model**: The slope and intercept are parameters that determine the shape of the model. 

---
#### 2. Choose a Loss Function
We need a metric of how "good" or "bad" our predictions are.
A **loss function** characterizes the *cost* or error from a particular model.
![[Pasted image 20250930114616.png]]

##### L2 and L1 Loss
![[Pasted image 20250930114927.png]]

We care about prediction quality on our entire dataset, not just loss on one point.
![[Pasted image 20250930115255.png]]
Why is average loss a function of $\theta$? our choice of $\theta$ determines $\hat{y}$ $\rightarrow$ For example, $\hat{y}=\theta_0+\theta_1x$ 
![[Pasted image 20250930115521.png]]

---
#### 3. Fit the Model
How do we choose the best parameters of our model given our data? 
![[Pasted image 20250930115757.png|450]]

![[Pasted image 20250930120203.png]]

![[Pasted image 20250930120832.png]]
![[Pasted image 20250930122051.png]]

---
#### 4. Evaluate the Model

1. Visualize Data
2. Performance Metrics
	1. Root Mean Square Error (RMSE)
3. Visualize residuals
   Look at a residual plot of $e_i=y_i-\hat{y_i}$ to visualize the difference between actual and predicted values. 

![[Pasted image 20250930122622.png]]
![[Pasted image 20250930122629.png]]


## 
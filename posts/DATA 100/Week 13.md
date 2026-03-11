> [! NOTE] Course Evaluations Research 
> Four large classes, two male + two female instructors with lots of experience. 
> Randomize students within each course:
> 1. Standard Evaluation
> OR
> 2. Standard Evaluation + **unconscious bias statement**[^1]
> 
> Result:
> ![[Pasted image 20251119142613.png]]
> ![[Pasted image 20251119142638.png]]
> 
> What do we learn from this experiment? 
> - **Unconscious biases** possibly had strong effects on evaluations.
> - Course evaluations are definitely **fickle**[^2]; we can easily swayed!
> 
> This is **concerning**, especially since evaluations often influence re-hiring and promotion. 
> 
> How do we combat these limitations? 
> - **Awareness**. Hunger, sleep, weather, and other biases may influence your judgement. 
> - Think **big picture**. Don't fixate on the most recent lecture or little annoyances.
> - It's good to complain! Just be **constructive**. "I didn't like X; I would have preferred Y."

---
# Logistic Regression I

^f2e4d9

## Regression vs. Classification
Up until this point, we have been working exclusively with **linear regression**. 

#### So Far: Regression
In regression, we use quantitative features to predict a **numeric unbounded output**. 
![[Pasted image 20251119143334.png]]
Examples:
- Predict **tip** from total bill
- Predict **mpg** from hp
- Predict **goal difference** from turnover %

#### Now: Classification
In **classification**, we use quantitative features to predict qualitative (categorical) output.
Examples:
- Predict **day of week** from total bill
- Predict **model of car** from hp
- Predict **which team won** from turnover %

We model **probabilities** of each class and transform them into a predicted **outcome**. 
![[Pasted image 20251119143522.png]]
> The threshold for **decision rule** 0.5 is totally arbitrary. 

#### Kinds of Classification
![[Pasted image 20251119143722.png]]
> [! Warning] Confusing Language
> We use logistic **regression** to perform **classification**. Here, 'regression' refers to fitting a function mapping inputs to outputs, not the task being performed. 
## The Logistic Regression Model

For an input x, compute the **average value of y** for all nearby x, and predict that.
![[Pasted image 20251119144409.png|600|479x306]]
Better fit to our data than OLS! 
Some observations:
- All predictions are between 0 and 1. 
- Our predictions are **non-linear**.
	- Specifically, we see an "S" shape.

To compute the **average of a bin**, we:
- Count the number of wins in the bin.
- Divide by the total # of datapoints in the bin.
This is the **probability** that Y = 1 in that bin!

$P(Y=1\ |\ bin) = \frac{\text{\# Y=1 in bin}}{\text{\# datapoints in bin}}$

Our curve models the **probability that Y = 1** for a **particular value of x**.
$$ P(Y=1|x) $$ This is consistent with out observation that all predictions should be between 0 and 1.
- The **predictions** represent **probability** estimates. 


### The Sigmoid Function
We need to identify a function that maps **(-∞, ∞) inputs** to **(0, 1) outputs**. 
$$
\begin{align}
\lim_{x\to-\infty}\frac{1}{1+e^{-x}} = 0  \\\\
\lim_{x\to-\infty}\frac{1}{1+e^{-x}} = 1
\end{align}
$$

![[Pasted image 20251119145929.png|500]]
Also known as the **logistic** function or the **inverse logit** function. 

We can **shift** and **scale** the sigmoid function just like any other function: 
![[Pasted image 20251119150045.png|500]]
- Bigger A → Horizontal shrink, Steeper!
- Bigger B → Negative horizontal shift 

![[Pasted image 20251119150605.png|500]]

We've discovered the (simple) **logistic regression** model! It just fits a sigmoid to the data. 
![[Pasted image 20251119151604.png]]

Just like OLS, we're not limited to one input. 

### Logistic Regression with p inputs
The logistic regression model for modeling P(Y=1|x):
![[Pasted image 20251119152123.png]]
To predict a probability:
- Compute a **linear** combination of the features: $x^T\theta$
- Apply the **sigmoid function**: $\sigma(x^T\theta)$

> [!Practice]
> Q.
> I fit a logistic regression model **with no intercept** using my training data, and estimate these optimal parameters: 
> ![[Pasted image 20251119152348.png|300]]
> What is the estimated probability of Y=1 for a single observation where $x_0 = 15$ and $x_1=1$?
> 
> A. 
> The estimated probability is $$\hat{P}_{\hat{\theta}}(Y=1|x)=\sigma(x^T\theta)=\sigma(0.1(15) - 0.5(1))=\frac{1}{1+e^{-1}}\approx 0.7311$$

### Formalizing the Logistic Regression Model
The main takeaways of this section:
- Model the **probability P(Y = 1 | x)** using a **sigmoid** transformation of a **linear model**.
![[Pasted image 20251119153141.png]]
The logistic regression model is often written as follows: 
$$\hat{P}_\theta(Y=1|x) = \sigma(x^T\theta) $$

## Log Odds and Linearity
![[Pasted image 20251119153537.png]]

#### Interpreting Logistic Regression Coefficient as Log-Odds

Does $log(\frac{P(Y=1|x)}{1-P(Y=1|x)})$ have a meaningful interpretation? 
Suppose someone says "Cal has **10 to 1 odds** of winning the game."
10:1 odds mean that P(Cal wins) = 10 \* P(Cal loses)
$$10 = Odds(Cal\ wins) = \frac{P(Cal\ wins)}{P(Cal\ loses)} = \frac{P(Cal\ wins)}{1 - P(Cal\ wins)}$$

> "For every one unit increase in x, **log(Odds(Y=1|x))** goes up by $\theta_1$"


#### Applying a Decision Rule
Logistic regression estimates the probability that a datapoint belongs to Class 1. 
![[Pasted image 20251119155627.png|300]]

The model itself does NOT **classify** (i.e., choose whether a prediction is Class 0 or Class 1).
A **decision rule** tells us how to convert model outputs into classifications. It's <u>our</u> decision.

#### Threshold
We often make decision rules by specifying a **threshold**, T. If the predicted probability is greater than or equal to T, predict Class 1. Otherwise, predict Class 0.
![[Pasted image 20251119160017.png]]
The threshold T is often 0.5, but <u>not always</u>. 
> Selecting the threshold is NOT a Data Science problem, but depends on the domain knowledge.

#### Converting Probabilities to Predicted Class
Suppose you have a fitted logistic regression model with the following form:
$$P(Y=1|x)=\sigma(1+2x_1+3x_2)$$
You <u>decide</u> to classify all new data points with **P(Y=1 | x) ≥ 0.5** as Class 1, and all points with **P(Y=1 | x) ≤ 0.5** as Class 0. 

> [! NOTE] Probability of 0.5 implies a log odds of 0
> Recall:
> ![[Pasted image 20251119160503.png|400]]
> 
> With **P(Y=1|x) = 0.5**, this becomes:
> ![[Pasted image 20251119160534.png]]

#### Linearity and Logistic Regression
![[Pasted image 20251119170309.png]]
You decide to classify all new data points with **P(Y = 1 | x) ≥ 0.5** as Class 1, and all points with **P(Y = 1 | x) < 0.5** as Class 0.

This is the same as labeling all points with **log(Y = 1 | x) ≥ 0** as Class 1, and all **log(Odds(Y = 1 | x)) < 0** as Class 0.

log(Odds(Y = 1 | x)) = 0 = $1 + 2x_1 + 3x_2$ is a **<u>linear</u> decision boundary** for classification.
![[Pasted image 20251119170731.png]]

## Cross-Entropy Loss
Can L2 loss still work in logistic regression? 
![[Pasted image 20251119172519.png]]
1. **Non-convex**. Gets stuck in local minima.
Secant line crosses function, so R''(θ) is not greater than 0 for all θ.
Gradient Descent: Different initial guesses will yield different optimal estimates.
![[Pasted image 20251119172745.png|500]]![[Pasted image 20251119172733.png|300]]

2. **Bounded**. Not a good measure of model error.
- MSE never gets very large, because both response and estimated probability are bounded by 1. 
![[Pasted image 20251119173023.png]]

#### Cross-Entropy Loss
Let $y$ be a binary label {0, 1} and **p** be the model's estimated probability of Class 1.
The **cross-entropy (CE) loss** is defined as: 
![[Pasted image 20251119173236.png]]

The Cross-Entropy (CE) loss function is often written more compactly as the **product of the label** and **the log probability**, summed over both classes.
![[Pasted image 20251119173443.png]]
![[Pasted image 20251119173613.png]]

> Can we add L1 or L2 regularization? Absolutely!

> There is no closed solution for Logistic Regression (like in OLS).

> Cross-Entropy Loss is Convex!


[^1]: *... Women and instructors of color are systematically rated lower in their teaching evaluations than white men, even when there are no actual differences in the instruction or in what students have learned. ...*

[^2]: Fickle: likely to change frequently without necessarily good reason.

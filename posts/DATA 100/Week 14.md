# Logistic Regression II



### Recall
[[🐻 UC Berkeley/Fall 2025/Courses/DATA 100/Notes/Week 13#^f2e4d9|Logistic Regression I]]

> [!NOTE] Recall: Logistic regression with one input
> **Logistic regression** fits a sigmoid to data with binary outcomes and numeric inputs. 
> ![[Pasted image 20251125224235.png]]

> [!NOTE] Recall: Applying a Decision Rule
> Logistic regression estimates the probability that a datapoint belongs to Class 1.
> $$ 
> \hat{P}_\theta(Y=1|x) = \frac{1}{1+e^{-x^T\theta}}
> $$
> The model itself does <u>not</u> **classify** (i.e., choose whether a prediction is Class 0 or Class 1).
> A **decision rule** tells us how to convert model outputs (probability) into classifications (0 or 1). It's <u>our</u> decision. 

> [!NOTE] Recall: Thresholds
> We commonly make decision rules by specifying a **threshold**, T. 
> If the predicted probability is greater than or equal to T, predict Class 1. Otherwise, predict Class 0. 
> ![[Pasted image 20251125224738.png]]
> The threshold is often 0.5, but <u>not always</u>. We'll discuss using $T \neq 0.5$ soon.

A **decision boundary** splits the data into predicted classes based on **features**. 
- For logistic regression, the decision boundary is a **hyperplane**: a linear combination of the features in p-dimensions. 
![[Pasted image 20251125225152.png]]
> The plots above are predicted class, not actual class.

### Linear Separability
A classification dataset is said to be **linearly separable** if there exists a hyperplane *among input features x* that separates the two classes y.
![[Pasted image 20251125225523.png]]

**Linear Separability Causes Diverging Model Parameters**
When data is linearly separable, the **optimal model parameters diverge to $\pm \infty$**.
- The sigmoid can <u>never</u> output exactly 0 or 1, so no finite optimal theta exists.

This can be a problem when using **gradient descent** to fit the model. Consider a simple, linearly separable "toy" dataset with two datapoints: 
![[Pasted image 20251125230548.png|0x0]]
Because gradient descent follows the tilted loss surface downwards, it <u>never</u> converges. 

So how do we prevent this problem? 



### Regularized Logistic Regression
To avoid large weights (particularly on linearly separable data), use **regularization**. 
- As with linear regression, standardize features first. 
![[Pasted image 20251125230833.png]]

```python
# sklearn defaults
model = LogisticRegression(penalty= 'l2', C=1.0, ...)
model.fit()
```

Regularization hyperparameter C is the inverse of $\lambda$. $C = 1 / \lambda$.
Set C big for minimal regularization, e.g. `C = 300.0`.

![[image-32.png|209x244]]

---
## Performance Metrics

#### Accuracy 
The most basic evaluation metric for a classifier is **accuracy**. 
$$accuracy = \frac{\text{\# of points classified correctly}}{\text{\# points total}} $$
If I predict the correct class for 75 out of 100 data points, my accuracy is 75%. 

> [!NOTE] Pitfalls of Accuracy: A Case Study
> Suppose we're trying to build a classifier to filter spam emails.
> - Each email is **spam** (1) or **ham** (0). 
> 
> We have 100 emails: **5** of them are  **spam**, and the remaining **95** are real (i.e., **ham**).
> 
> Case 1: Assume we have a model that classifies all email as **ham** (0). What is the accuracy of the classifier? 
> A: $\text{accuracy}_1=\frac{95}{100}=0.95$ 
> High accuracy... but we detected <u>none</u> of the spam!
> 
> Case 2" Assume we have a model that classifies all email as **spam** (1). What is the accuracy? 
> A: $\text{accuracy}_2=\frac{5}{100}=0.5$ 
> Low accuracy... but we detected <u>all</u> of the spam! 

> [!example]  Types of Classifications
> - **"positive"** means a *prediction* of **1**.
> - **"negative"** means a *prediction* of **0**. 
> 
> - **"True"** means **correct** prediction.
> - **"False"** means **incorrect** prediction.
> 
> ![[image-33.png|301x174]]

### Confusion Matrix 
![[image-34.png|210x214]]A **confusion matrix** plots TP, TN, FP, FN for a particular classifier, dataset, and **threshold (!)**.

Out **0/1 predictions** depend on our choice of probability threshold, so the confusion matrix can also **change with a new threshold**.
<br>
<br>
<br>

> [!Question] Effect of changing the probability threshold on TP
> I **increase** the probability threshold. What happens to the count of **true positives (TP)**?
> ![[image-35.png]]
> 
> If we **increase** the threshold, it becomes **harder** to make a positive prediction. 
> The number of **positives** (P) will **stay the same or decrease**. 
> So, <u>TP and FP</u> will either go down or stay the same, too. 


#### Accuracy, Precision, and Recall
![[image-36.png]]

TP, TN, FP, FN can change with a new threshold, so all of these metrics can change too!
These are **threshold-dependent** metrics. 

#### Precision vs. Recall
$\text{precision} = \frac{\text{TP}}{\text{TP + FP}}$ . Precision penalizes FPs.
$\text{recall} = \frac{\text{TP}}{\text{TP + FN}}$ . Recall penalizes FNs.

There is a **tradeoff** between precision and recall; they are often *inversely related*.
In many settings, FPs and FNs have **different costs**.
- You should **adjust** your threshold to optimize for **overall** costs of FPs and FNs.

For example, consider credit card fraud detection system: 
- FNs (undetected fraud) are <u>a lot</u> more costly than FPs (false fraud alert text)
- So, it's OK to send a lot false fraud alerts (low precision) as long as we detect more of the actual fraud (high recall). 

#### "Sweeping Through" thresholds
Here's a diagram of the process for a general train-validate split over 99 thresholds (T). 
![[image-37.png]]

![[image-38.png|230x219]]The choice of threshold T impacts classification performance. 
- High T: Most predictions are 0. Lots of FNs.
- Low T: Most predictions are 1. Lots of FPs.

Do we get max accuracy when T = 0.5? 
Not always the case...


##### Precision-Recall Curves
To construct a precision-recall curve, we:
1. Generate predictions for many different thresholds.
2. For each threshold, compute precision and recall.
![[image-39.png|618x301]]

We often choose a threshold that keeps both precision and recall high. 
But, if the cost of FPs and TPs differ a lot, we may not. 

#### Computing an F1 Score
One way to **balance** precision and recall is to maximize the $F_1$ score.
![[image-40.png]]
- The harmonic mean of precision and recall
- Often used when there is a **large class imbalance**.

How do you use it?
- Pick the threshold that **maximizes the $F_1$ score**. 

> If FPs and FNs have different costs, we may not want to balance precision + recall. Think back to credit card fraud! 

#### True and False Positive Rates
Two more performance metrics worth knowing! 

- $FPR = \frac{FP}{FP + TN}$ 
**False Positive Rate (FPR)**: Out of all actual 0s, how many did we classify **incorrectly**?

- $TPR=\frac{TP}{TP+FN}$
**True Positive Rate (TPR)**: Out of all actual 1s, how many did we classify correctly? **Same as recall**. 

#### ROC Curves
We can perform a similar process with FPR and TPR
1. Try many thresholds
2. Compute the FPR and TPR for each threshold
3. Choose a threshold that keeps FPR *low* and TPR *high*
> ROC = "Receiver Operating Characteristic" (comes from radar in WWII)


![[image-41.png|298x269]]

- Threshold being low → easier to make positive predictions (at the right top)
- Threshold being high → harder to make positive predictions (at the left bottom)


A **perfect predictor** has TPR = 1 and FPR = 0.
![[image-43.png|305x279]]
The best **Area Under the ROC Curve (AUC-ROC)** is 1. (Worst possible is 0.5)
Because we want our classifier to be as close as possible to the perfect predictor, we aim to maximize the **AUC**. 

> What is the good AUC-ROC? Depends on the domain. (We want pretty high AUC for credit card fraud detection)

> **AUC-ROC** doesn't rely on one particular threshold because it uses every threshold to build the curve (independent of threshold). 
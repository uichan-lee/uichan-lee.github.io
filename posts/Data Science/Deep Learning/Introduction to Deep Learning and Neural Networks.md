> SFO -> ICN 비행을 하며 로컬 LLM (*qwen3.6-35b-a3b* model) 로 공부한 내용입니다.
> 2026.05.18

---
# Introduction

## Why Deep Learning? 
> Linear Model의 한계와 Non-linearity 도입 
- **Limits of Linear Model:** Logistic Regression의 결정 경계는 line/hyperplane 으로 고정됩니다 (Linear Decision Boundary). Can't learn for non-linear data. 
	- ex. 고양이와 개를 구별하는 픽셀 패턴, 자연어의 문맥 등 
- **해결책:** 여러 개의 선형 변환을 *비선형 (non-linear)* 함수로 연결하면, 복잡한 곡선이나 표면으로도 데이터를 분리할 수 있습니다. 
	- 단일 층: 직선
	- 여러 층 + *비선형 활성화*: 곡선, 구불구불 복잡한 경계 
- **직관:** 1층 = 직선으로 자르기, 2층 이상 = 여러 직선을 조합해 곡선으로 자르기.

---
## What is Layer (층)?

신경망은 **뉴런 (Neuron)** 이 모여 만든 **층(Layer)** 들이 쌓여 있습니다. 

> [!NOTE] 층(Layer)의 구성 요소
> 각 층은 다음과 같은 단계를 거칩니다. 
> 1. **입력 (Input):** 이전 층에서 넘어온 데이터 (`a_prev`)
> 2. **선형 결합 (Linear Combination):** $Z = W * a\_prev + b$ 
> 	- `W` (가중치, weight): 데이터의 중요도 조절 
> 	- `b` (편향, bias): 기준점 이동 
> 3. **활성화 (Activation):** $A = \text{Activation}(Z)$
> 	- *왜 필요한가?* 선형 결합만으로는 아무리 층을 깊게 해도 결국 선형 모델이 됩니다. 비선형 함수(*ReLU, Sigmoid* 등)를 통해 비선형성을 부여합니다.
> 4. **출력 (Output):** 다음 층으로 전달될 데이터 (`A`)

---
## Conceptual Diagram of Neural Network


```
[Input Data, a_prev]
        │
        ▼
┌───────────────────────────┐
│   1. Linear Combination   │
│   Z = W @ a_prev + b      │
│   (W: 가중치, b: 편향)       │
└───────────────────────────┘
        │
        ▼
┌───────────────────────────┐
│   2. Activation (활성화)    │
│   a = Activation(Z)       │
│   (ex. ReLU, Sigmoid)     │
└───────────────────────────┘
        │
        ▼
[Output Data a] (Passed to next Layer)

```

> [!IMPORTANT] Key Points of Deep Learning
> 1. **Linear Combination (선형 결합):**
> 	- $Z = W \cdot a\_prev + b$  (in *Python* notation, $Z = W @ a\_prev + b$)
> 	- Multiply *weight*(`W`) and add *bias* (`b`) to *input data*(`a_prev`).
> 	- You can only catch <u>linear relationship</u> with this step.
> 2. **Activation:**
> 	- Apply <u>non-linear functions</u> (e.g. ReLU, Sigmoid, etc.) to the result of lin. comb. (`Z`)
> 	- *Why?* It gives non-linearity in the model, so it can learn complex non-linear patterns.
> 	- *Output Data* `a` will be passed to the next layer. 
> 3. **Layer:**
> 	- Normally, we call the *Linear Combination + Activation* combo as one *layer*.
> 	- Thus, $Z_1 \rightarrow A_1$ is one layer, and $Z_2 \rightarrow A_2$ is another layer.

Now let's take a look into what *activation function* is. 

---
## Activation Functions (활성화 함수)

For a neural network to learn non-linear relationship, it needs a *non-linear function.* In this post, we compare the most popular 3 functions. 

---
### Sigmoid Function

- **Formula**: $\sigma(z) = \frac{1}{1 + e^{-z}}$ 
- **Range**: $\sigma(z) \in (0, 1)$
- **Characteristics**:
	1. Useful to use to represent the *probability* (ex. A layer for binary classification)
	2. Problem: *Gradient Vanishing* (기울기 소실)
		- When $z$ is very large or very small, graph becomes flat
		- Slope (derivative) gets close to 0, so weight update hardly happens during *Backpropagation* (역전파) 
		- $\rightarrow$ usually not used for *Hidden Layer* (은닉층)

---
### Tanh (Hyperbolic Tangent) Function

- **Formula**: $\tanh(z) = \frac{e^z-e^{-z}}{e^z + e^{-z}}$ 
- **Range**: $\tanh(z) \in (-1, 1)$
- **Characteristics**:
	1. Similar to Sigmoid, but its output is *symmetric about 0*.
	2. Since the data mean is centered at 0, the learning convergence rate can be slightly faster than that of Sigmoid (조금 더 빠른 수렴 than Sigmoid)
	3. Problem: Still suffers from the *Gradient Vanishing* problem.
		- When $z$ is large or small, the gradient approaches 0.

---
### ReLU (Rectrified Linear Unit) Function - Standard

- **Formula**: $f(z) = \max(0, z)$ 
- **Range**: $f(z) \in [0, \infty)$
- **Characteristics**:
	1. If $z > 0$, outputs $z$ as is.
	2. If $z \le 0$, outputs 0. 
	3. Advantages:
		- Solves the Gradient Vanishing problem.
		- In the region where $z > 0$, the gradient is always 1. 
		- Therefore, gradients are effectively propagated even in deep neural networks.
	4. Disadvantages:
		- *Dying ReLU* problem:
			- In the region where $z \le 0$, the gradient becomes 0, causing neurons to "die" (always output 0) and potentially stop learning. (However, this is still far better than other activation functions)

> [!NOTE] Intuitive Comparison
> |Function|Range|Slope (Gradient)|Hidden Layer Usage|Main Purpose|
|---|---|---|---|---|
|**Sigmoid**|(0,1)|$z$가 크면 ≈0 (소실)|❌ Not Recommended|Output Layer (binary classification)|
|**Tanh**|(−1,1)|$z$가 크면 ≈0 (소실)|⚠️ Possible (but prefer ReLU)|specific structure like RNN |
|**ReLU**|[0,∞)|$z>0$이면 1, $z\le0$이면 0|✅ **Standard**|**Hidden Layer (Mostly)**|

---
### Softmax Function (mostly for output layer)

**Softmax Function** is type of activation function, but mostly used for the *output layer* (출력층), and in*Multi-class Classification* (다중 클래스 분류) problem, used to get the probability of each class.

> [!QUESTION] Why do we need it? 
> We usually solve *Multi-class Classification* problem. (ex. Image classification - what is the animal in the image among cat, dog, fox, and rabbit?)
> - Model's output layer's return value $Z_{out}$ is multiple real numbers. 
> - These values can be negative, and they may not sum up to 1. 
> - But we want to express this $Z_{out}$ as a *probability*, like "This image is 70% cat, 20% dog, and 10% rabbit"
> - Condition of Probability:
> 	1. Every values are in $[0, 1]$ range. 
> 	2. Sum of every probabilities should be $1$

So what does Softmax function do? 
- It returns a probability vector $P$ from output value of the last layer, $Z$. 
$$ P_i = \frac{e^{Z_i}}{\sum_{i}e^{Z_i}} $$

Intuitive Understanding:
1. **Exponential function** $(e^x)$: Makes every value *Positive*. (there is no negative probability)
2. **Numerator** $(\sum e^{Z_i})$: Divide by sum of every values $\rightarrow$ Makes the sum 1.
3. **Key Characteristic**: The relative magnitude between $Z_i$ values are preserved. That is, if $Z_i$ value was larger, than the probability is also larger. 

> **Example:**
> Model output $Z_{out} = [2.0, 1.0, 0.1]$ 
> - $e^{2.0} \approx 7.39$
> - $e^{1.0} \approx 2.72$
> - $e^{0.1} \approx 1.10$
> - Sum $\approx 11.21$
> - Probability $P \approx [0.66, 0.24, 0.10]$ 
>   The largest value in the input $(2.0)$ had the largest probability $(7.39)$.

---

## Loss Functions (손실 함수) 

> [!QUESTION] Why do we need it? 
> Model gave us probability $(P)$, so we need to express how much it differ from the answer $(Y_true)$.
> - This difference is called **Loss** (손실)
> - Deep Learning's purpose is to minimize this loss by updating the weight $(W)$
> - **Important**: Loss function should be *differentiable* (for Gradient Descent slope calculation)

---
### A. Binary Cross-Entropy (for Binary Classification)

**Binary Classification** is when there are only two classes (Human vs Dog, Yes vs No)
- Activation function: **Sigmoid**
- Loss function: **Binary Cross-Entropy**

$$ L = - [y \cdot \log(\hat{y}) + (1-y) \cdot \log(1-\hat{y})] $$
- $y$: Answer (1 or 0)
- $\hat{y}$: Predicted probability (output of *Sigmoid*)
<br>

Intuition:
- If the answer was 1 and model predicted as 0.1? 
	- $\Rightarrow\log(0.1)$ is large negative number, so Loss gets very large (penalize)
- If the answer was 1 and model predicted as 0.9? 
	- $\Rightarrow \log(0.9)$ is a small negative number, so Loss is small (good)

---

### Categorical Cross-Entropy (CCE) (for Multi-class Classification)

**Multi-class Classification** is when there are multiple classes (ex. cat, dog, rabbit probability)
- Activation function: **Softmax**
- Loss function: **Categorical Cross-Entropy**

$$ L = - \sum_{i=1}^C y_i \cdot \log(\hat{y}_i) $$
- $C$: number of classes 
- $y_i$: *One-Hot Encoding* indicator variable of answer class (ex. If dog is the answer, $[0, 1, 0]$)
- $\hat{y_i}$: Model's predicted probability vector, $(\sum{\hat{y}_i} = 1)$
<br>

Intuition:
- If the predicted probability of the answer class (ex. dog at index 1) is close to 1, 
	- $\Rightarrow \log(\hat{y}_1)$ gets close to 0, so Loss gets smaller.
- If the predicted probability of the answer class is low, 
	- $\Rightarrow$ then Loss is large. 
- Other (non-answer) classes' probability don't affect the Loss. (only answer class affects)
<br>

**Comparison Table**

| Problem                    | Activation | Loss Function             | Main Idea                                                                  |
| -------------------------- | ---------- | ------------------------- | -------------------------------------------------------------------------- |
| Binary Classification      | Sigmoid    | Binary Cross-Entropy      | Answer class's probability to be close to 1.                               |
| Multi-class Classification | Softmax    | Categorical Cross-Entropy | Answer class's probability to be *relatively* largest among other classes. |
|                            |            |                           |                                                                            |

**NumPy Code Example**:
```python
import numpy as np

# Multi-class Classification: [Cat, Dog, Rabbit]
# Final output of the model (Before Softmax, Z)
Z = np.array([2.0, 1.0, 0.1])

# 1. Apply Softmax 
def softmax(z):
    # For numerical stability, subtract z_max from z (prevent exp being too large)
    exp_z = np.exp(z - np.max(z))
    return exp_z / np.sum(exp_z)

probabilities = softmax(Z)
print(f"Predicted Probability: {probabilities}") 
# Output: [0.659, 0.242, 0.098] (Approx.)

# 2. Loss Calculation (Cross-Entropy)
# Suppose the ansewr is 'Dog' (Index 1)
y_true = np.array([0, 1, 0]) 

# Categorical Cross-Entropy Loss: -sum(y_true * log(probabilities))
loss = -np.sum(y_true * np.log(probabilities + 1e-15)) # +1e-15 is to prevent log(0)
print(f"Loss: {loss}")
```


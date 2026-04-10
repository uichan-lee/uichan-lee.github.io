# 확률/통계 기본 개념

## Mean, Variance, Standard Deviation
$$\mu = \frac{1}{n}\sum x_i$$
$$\sigma^2 = \frac{1}{n}\sum(x_i - \mu)^2 $$
$$\sigma = \sqrt\sigma^2 $$

$$Cov(X, Y) = \frac{1}{n}\sum(x_i - \mu_x)(y_i - \mu_y)$$
$$Corr(X, Y) = \frac{Cov(X, Y)}{\sigma_x \sigma_y}$$
- Covariance: 두 변수가 같은 방향으로 움직이는지 $(-\infty, \infty)$
- Correlation: Covariance를 (-1, 1)로 정규화 한 것

> ML 모델에서 feature들 간 correlation이 높다면 $\rightarrow$ multicollinearity problem



---
# Bias-Variance Tradeoff

$$
\text{Total Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Noise}
$$
- $Bias$ : 모델이 얼마나 단순하게 가정하는가. High Bias = Underfitting
- $Variance$: 모델이 훈련 데이터에 얼마나 민감한가. High Variance = Overfitting
- $Irreducible\ Noise$: 데이터 자체의 노이즈. 어떤 모델로도 줄일 수 없음.

![[others/attachments/image-1.png]]

- If the model gets *complicated* (more complexity) $\rightarrow$ Bias $\uparrow$, Variance $\downarrow$
- If the model gets *simpler* (less complexity) $\rightarrow$ Bias $\downarrow$, Variance $\uparrow$
- The goal is to find the <u>sweet spot</u>, where we can minimize both Bias and Variance.

![[others/attachments/image-2.png]]

## How to solve High Bias and High Variance problems

Underfitting (High Bias) 해결:
- Use more complex model
- add more features
- decrease regularization
- 더 오래 학습 

Overfitting (High Variance) 해결:
- Collect more data
- Add (strengthen) regularization (L1/L2)
- Dropout
- Early stopping
- Remove some features

---
# Loss Functions & Evaluation Metrics

## Loss Functions

모델을 학습할 때 "얼마나 틀렸는가" 를 수치화한 함수. Gradient Descent는 이를 최소화하는 방향으로 파라미터 업데이트를 함. 

1. MSE (Mean Squared Error)
$$
MSE = \frac{1}{n}\sum(y_i-\hat y_i)^2
$$
- Used in Regression
- outlier에 취약 (오차를 제곱해서)
- classification에서는 사용하지 않음

2. MAE (Mean Absolute Error)
$$
MAE = \frac{1}{n}\sum|y_i - \hat y_i|
$$
- Used in Regression
- Less sensitive to outliers than MSE
- Can't differntiate at 0 (graident is discontinuous)

3. Binary Cross Entropy (Log Loss)
$$
BCE = -\frac{1}{n}\sum [y_i \cdot log(\hat p_i) + (1-y_i)\cdot log(1-\hat p_i)]
$$
- Used in binary classification (logistic regression)
- Why BCE instead of MSE? sigmoid + BCE = convex loss surface = converging gradient descent.


## Evaluation Metrics

**Confusion Matrix**
![[others/attachments/image-3.png]]

- Accuracy = (TP + TN) / Total 
	- 클래스 불균형 있을 시 쓸모없음. 
	- CTR (Click-Through Rate) = 0.3% 일 때 "전부 클릭 안함" 으로 예측해도 accuracy = 99.7%
- Precision = TP / (TP + FP)
	- 내가 Positive 라고 한 것 중 실제 Positive 비율
	- ex) 스팸 필터: 정상 메일을 스팸으로 잘못 분류하면 안됨 = precision 중요
- Recall = TP / (TP + FN)
	- 실제 Positive 중에서 내가 잡아낸 비율
	- ex) 암 진단: 환자를 놓치면 안됨 = recall 중요
- F1 = $2 \times (Precision \times Recall) / (Precision + Recall)$ 
	- 불균형 데이터에서 accuracy 대신 사용
	- Pick the threshold that maximuzes F1 score! 
- AUC-ROC = threshold 를 0부터 1까지 TPR vs FPR 곡선을 그린 면적. 1에 가까울 수록 좋음. 
- AUC-PR (Precision-Recall Curve): 극단적 불균형엔 AUC-ROC보다 informative. Positive class가 너무 적을 때, ROC는 성능을 낙관적으로 볼 수 있음.

![[image-4.png]]

---
# Gradient Descent

모델 파라미터 $\theta$를 조금씩 업데이트 해서 Loss를 최소화 하는 최적화 알고리즘

$$
\theta := \theta - \alpha \cdot \nabla_\theta L(\theta )
$$
- $\alpha$ = learning rate (한 걸음의 크기)
- $\nabla L$ = gradient (현재 위치에서 기울기)

Learning Rate $\alpha$ 효과:

![[image-6.png]]

## Type of Gradient Descent

- **Batch Gradient Descent**
	- 전체 데이터로 gradient 계산 후 1번 업데이트
	- 정확하지만 데이터가 많으면 너무 느림
	- 메모리 문제 
- **SGD (Stochastic Gradient Descent)**
	- 데이터 1개씩 gradient 계산 후 업데이트
	- 빠르지만 노이즈가 심해서 경로가 들쭉날쭉
	- Local minimum 탈출에 유리
- **Mini-batch Gradient Descent**
	- 데이터를 작은 batch로 나눠서 업데이트
	- 속도와 안정성의 균형 - 실전에서 가장 많이 씀

> [!NOTE] Adam (Adaptive Moment Estimation)
> 현재 가장 많이 쓰이는 optimizer
> 두 가지를 동시에 관리:
> - *Momentum* (방향): 이전 gradient 방향을 기억해서 관성처럼 활용
> - *Adaptive learning rate*: 파라미터마다 learnign rate를 자동으로 조정. 드물게 업데이트 된 파라미터는 lr 키움, 자주 업데이트 된 파라미터는 lr 줄임
> - 단점: 메모리를 더 씀


## Problems of Gradient Descent

**Local Minimum / Saddle Point**
- Non-convex loss surface에서 global minimum이 아닌 local minimum에 빠질 수 있음
- Saddle point: 한 방향은 minimum, 다른 방향은 maximum인 지점 - graident 가 0이 되어 멈춤
- 해결: momentum, Adam, adjust learning rate



---
# Linear Regression

Base Model:
$$
\hat y = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \dots = \theta^T x
$$


## Ordinary Least Squares
Loss surface = MSE:
$$
L = \frac{1}{n}\sum(y_i - \hat y_i)^2
$$

Closed form solution: $\hat \theta = (X^TX)^{-1}X^Ty$
데이터가 작을 시, 직접 계산하는 것이 나음. 데이터가 클 시, inverse 계산이 비싸서 gradient descent 사용. 



### 평가 Metric

**R² (결정계수):**

$$
R^2 = 1 - \frac{\sum(y_i - \hat y_i)^2}{\sum(y_i - \bar y)^2}
$$

- 1에 가까울수록 좋음
- 0이면 평균으로만 예측하는 것과 동일
- 음수 가능 — 모델이 평균보다 못한 경우

**RMSE:**

$$
RMSE = \sqrt{\frac{1}{n}\sum (y_i - \hat y_i)^2}
$$

실제 단위로 해석 가능 — "평균적으로 ±RMSE만큼 틀린다"

---
# Logistic Regression 

> 왜 *Linear Regression을* classification에 사용하지 못하나? 
> Linear Regression의 출력값은 $(-\infty, \infty)$. 하지만 확률은 0-1 사이의 값을 가짐. 
> $\rightarrow$ 출력을 0-1로 압축해주는 함수, **sigmoid** 사용


## Sigmoid Function

$$
\sigma(z) = \frac{1}{1+e^{-z}}
$$
- input: $(\infty, \infty)$
- output: $(0, 1)$ – interpret as probability
- $z = \theta^T X$ (linear combination of features)

![[image-8.png]]

## Log-odds (Logit)

**Odds** = $p/(1-p)$ 
- $p = 0.5 \rightarrow Odds = 1$
- $p = 0.9 \rightarrow Odds = 9$ (9 times more likely)

**Log-odds** = $log(p/(1-p)) = \theta_0 + \theta_1x_1 + \theta_2x_2 + \dots$

Logistic Regression은 log-odds를 선형으로 모델링 하는 구조. 그걸 sigmoid로 변환하면 확률이 나옴. 

![[image-9.png]]

> For every one unit increase in $x$, log(Odds(Y = 1 | x)) goes up by $\theta_1$.


## Decision Boundary

If threshold = 0.5, z= 0 is decision boundary:
$z = \theta ^T X = 0$ 인 지점이 decision boundary
- $z > 0 \rightarrow p > 0.5 \rightarrow Class_1$
- $z < 0 \rightarrow p < 0.5 \rightarrow Class_2$

하지만 실전에서는 비즈니스 상황에 따라 threshold를 변경


## Calibration

모델의 예측 확률값이 실제 확률과 얼마나 일치하는가

Ex) 모델이 "클릭 확률 20%" 라고 예측한 샘플 100개 중 실제 20개가 클릭 ➡️ well-calibrated

How to improve calibration?
By **post-processing**

Platt Scaling
	- 예측값에 sigmoid 를 한번 더 씌워서 보정
	- Logistic Regression의 출력을 다시 Logistic Regression으로 fitting

> [!NOTE] Feature Standardization
> 왜 필요한가? 
> Logistic Regression은 *Gradient Descent* 로 학습. 만약 Feature들의 scale이 다르면 문제가 생김. 
> 
> 1. Loss Surface가 찌그러져서 수렴이 느려짐.
> 2. 계수 ($\theta$) 해석 불가. 스케일이 달라서.
> 3. Regularization이 $\theta$ 크기에 비례하여 정규화를 해서, 스케일이 작은 피쳐가 강하게 적용받음


## Class Imbalance

클래스 불균형 처리 방법

> 만약 데이터에서 스팸 메일이 0.3%, 일반 메일이 99.7% 라면 어떻게 처리해야 할까?

### 데이터 레벨

1. Oversampling: 소수 클래스를 늘리기 
소수 클래스 (스팸) 샘플을 복제하거나 새로 생성해서 균형을 맞춘다.
- Random oversampling
- SMOTE(Synthetic Minority Oversampling Technique): 기존 스팸 샘플들 사이를 보간해서 새로운 가상 샘플 생성. Random 보다 정교함.

2. Undersampling: 다수 클래스를 줄이기
정상 메일 샘플을 제거해서 균형을 맞추기
- 장점: 학습 속도 빠름
- 단점: 정보 손실, 데이터가 원래 많을 때만 유효

### 모델 레벨

**Class Weight** 조정 

모델에 "소수 클래스를 더 중요하게 봐라" 고 직접 알려주는 방법
Loss 계산 시 소수 클래스 샘플에 더 높은 가중치를 줌
```python
#sklearn
model = LogisticRegression(class_weight = 'balanced')

model = LogisticRegression(class_weight={0: 1, 1: 50})
```

---
# Tree 계열 모델 

## Decision Tree 
데이터를 질문으로 쪼개는 구조 

```
                [나이 < 30?]
               /            \
            Yes              No
        [연봉 < 5만?]      [클릭?]
        /        \           /   \
      No          Yes       No   Yes
   (안클릭)     (클릭)
```

각 노드에서 "어떤 feature로, 어떤 기준으로 쪼갤까" 를 정해야 함
모든 가능한 feature, 모든 가능한 기준값을 다 시도해보고 가장 impurity 를 줄이는 걸 선택.

그 기준이 **Gini Impurity**와 **Entropy**.

### Gini Impurity vs Entropy

둘 다 "이 노드가 얼마나 섞여있는가" 를 측정함. 
낮을수록 순수 (한 클래스만 있음)

*Gini Impurity*: $Gini = 1- \sum p_i^2 \in (0, 0.5)$

*Entropy*: $Entropy = -\sum p_i log_2(p_i) \in (0, 1)$

만약에 노드에 클래스가 50:50 이면
- Gini = $1 - (0.5^2 + 0.5^2) = 0.5$ (max)
- Entropy = $-(0.5log_2(0.5) + 0.5log_2(0.5)) = -log_2(0.5)=1.0$ (max)

한 클래스만 있으면 둘다 0 (순수)
실전: Gini가 계산이 빠르고 sklearn 기본 값. 결과는 거의 동일. 

분할 기준은 **Information Gain**: 분할 전후의 impurity 감소량이 가장 큰 feature/기준을 선택 

> Feature Importance 제공:
> 각 feature가 impurity를 얼마나 줄였는지 합산해서 중요도를 계산. 어떤 변수가 예측에 중요한지 알 수 있음. 

> [!NOTE] Decision Tree의 문제점
> 트리를 끝까지 키우면 training data에 완전히 fit $\rightarrow$ High variance, overfitting
> 해결책: Random Forest / Gradient Boosting
> 
> ![[image-10.png]]


## Overfitting 

트리를 제한 없이 키우면 overfitting 문제가 발생함.
트리가 깊어질수록 training data 노이즈까지 외워버림.

해결책: **Pruning** (가지치기)
- `max_depth`: 트리 최대 깊이 제한
- `min_samples_split`:  노드를 분할하려면 최소 몇 개 샘플이 있어야 하는지
- `min_samples_leaf`: 리프 노드에 최소 몇 개 샘플이 있어야 하는지 

## Random Forest

핵심 아이디어: 여러 개의 다양한 트리를 만들어서 투표 

> 왜 여러 트리를 만드나?
> 트리 하나는 Variance가 높음. 데이터가 조금만 달라져도 완전히 다른 트리. 
> 여러개의 트리의 평균을 내면 variance가 크게 줄어듬. 
> 하지만 같은 데이터로 학습하면 트리들이 서로 correlated. Solution은 2개의 랜덤성:

1. Bootstrap Sampling - 각 트리마다 복원추출로 다른 데이터 서브셋 사용
2. Random Feature Selection - 각 분할마다 전체 feature 중 일부만 랜덤하게 고려 

이 두 가지 랜덤성 덕분에 트리들이 서로 다양해지고 (decorrelated), 평균을 내면 variance가 줄어듬
- 장점: Overfitting에 강함, 병렬 학습 가능, feature importance 제공
- 단점: 트리가 많아서 느리고 해석이 어려움 

## Gradient Boosting / XGBoost

Random Forest는 트리들이 독립적으로 학습함. 
Boosting은 다름; 이전 트리가 틀린 부분에 집중해서 다음 트리 학습.

핵심 아이디어: 이전 트리가 틀린 부분을 다음 트리가 보완

1. 처음엔 단순한 예측 (예: 평균값) 
2. 잔차 계산
3. 그 잔차를 예측하는 새 트리 추가
4. 반복, 잔차 점차 감소

$$ \hat y = Tree_1 + Tree_2 + Tree_3 + \dots $$

**Overfitting Problem**:
트리를 너무 많이 쌓으면 Variance 상승. 
Bias 는 높게 시작하여 트리가 많아질수록 줄여나가는 구조. 

제어 방법:
- `n_estimators`: 트리 개수 (너무 많으면 과적합)
- `learning_rate`: 각 트리의 기여도 (작을수록 보수적)
- `max_depth`: 개별 트리 깊이 (boosting은 주로 3-5로 얕게)
- Early stopping: validation error 안 줄면 멈춤

> overfitting은 early stopping, n_estimators 줄이기, max_depth 제한 (3~5), learning_rate 낮추기로 대응할 수 있습니다.

> Random Forest는 Variance 를 줄이고, Boosting은 bias 를 줄인다.

언제 어떤 걸 사용하나요? 
- 데이터가 적거나 빠른 baseline $\rightarrow$ Random Forest
- 최고 성능 필요, 데이터 충분 $\rightarrow$ XGBoost
- 결측값 많을 때 $\rightarrow$ XGBoost

---



## Bias / Variance 완전 정리

### 개념부터

**Bias** — 모델이 얼마나 단순하게 가정하는가

> "모델이 데이터의 패턴을 얼마나 잘 포착하는가"

**Variance** — 모델이 훈련 데이터에 얼마나 민감한가

> "데이터가 조금 바뀌면 모델이 얼마나 달라지는가"

---

### 4가지 조합

||Low Variance|High Variance|
|---|---|---|
|**Low Bias**|✅ Ideal|Overfitting|
|**High Bias**|Underfitting|Worst case|

---

### Underfitting (High Bias, Low Variance)

```
train accuracy 낮음
test accuracy  낮음
둘 다 비슷하게 낮음
```

**원인:**

- 모델이 너무 단순
- feature가 부족
- regularization이 너무 강함
- 학습을 너무 적게 함

**해결:**

- 더 복잡한 모델 사용
- feature 추가
- regularization 줄이기 (λ 낮추기)
- epoch 늘리기
- polynomial feature 추가

---

### Overfitting (Low Bias, High Variance)

```
train accuracy 높음 (99%)
test accuracy  낮음  (72%)
둘의 차이가 큼
```

**원인:**

- 모델이 너무 복잡
- 데이터가 너무 적음
- regularization 없음
- 학습을 너무 오래 함

**해결:**

- 데이터 추가
- Regularization 추가/강화 (L1/L2)
- Dropout (신경망)
- Early stopping
- Feature 제거
- 더 단순한 모델

---

### 모델 복잡도와 관계

```
모델 복잡도 →

단순                    복잡
Linear    Decision    Deep
Regression  Tree      Network

Bias  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓→  낮아짐
Variance →↑↑↑↑↑↑↑↑↑↑↑↑↑  높아짐

sweet spot 찾는 게 목표
```

---

### Regularization이 bias/variance에 미치는 영향

```
λ 크게 (강한 regularization)
→ θ를 0으로 당김
→ 모델 단순해짐
→ Bias ↑, Variance ↓
→ Underfitting 위험

λ 작게 (약한 regularization)
→ θ 자유롭게 커짐
→ 모델 복잡해짐
→ Bias ↓, Variance ↑
→ Overfitting 위험
```

---

### Tree 계열에서

|모델|Bias|Variance|이유|
|---|---|---|---|
|단순 Decision Tree|High|Low|얕은 트리, 단순|
|깊은 Decision Tree|Low|High|데이터 외워버림|
|Random Forest|Low|Low|여러 트리 평균 → variance 감소|
|Gradient Boosting|Low|Low|잔차 학습 → bias 감소, regularization으로 variance 제어|

---

# PCA (Principal Component Analysis)

> 데이터의 분산을 가장 잘 설명하는 방향으로 새로운 축을 만들어 차원을 줄이는 것

**Example:**
Original Data: (Height, Weight) - 2 dimension
-> They have high correlation
-> Can be expressed with a single feature
-> Most of the information are keeped in 1 dimension

**Process:**
1. Data standardization
2. Construct *covariance matrix*
3. Calculate *Eigenvalue*, *Eigenvector*
4. Select *Eigenvector* in order of *Eigenvalue* (큰 순서로 선택; 주성분)
5. 데이터를 선택한 주성분으로 projection

언제 사용하는지:
- Feature가 너무 많을 때 (차원 축소)
- Feature 간 multicollinearity가 심할 때
- 시각화 (2~3 차원으로 줄여서)

주의:
- PCA 이후 feature의 해석이 어려워짐
- 분산을 기준으로 하기 때문에 label 정보를 활용 못함 
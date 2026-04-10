**Core Idea**: 
"Combine multiple models to make better predictions than any single model alone."

Just like classification ensembles use majority voting, regression ensembles us *averaging* or *weighted averaging*

---
## Types of Ensemble Regression

### Bagging Regression (Random Forest Regressor)

Average the predictions of multiple trees:
```
Tree 1 prediction: $100k
Tree 2 prediction: $120k
Tree 3 prediction: $110k
→ Final: (100 + 120 + 110) / 3 = $110k
```
It reduces *variance* – each tree sees different data, averaging smooths out noise.

### Boosting Regression (Gradient Boosting, XGBoost)

Each tree learns the *residual* of the previous. Final prediction is the **sum**.
```
Tree 1 prediction: $100k  (residual: $10k)
Tree 2 prediction: $7k    (residual: $3k)
Tree 3 prediction: $2k    (residual: $1k)
→ Final: 100 + 7 + 2 = $109k
```
It reduces *bias* - sequentially corrects mistakes.

### Stacking Regression

Use predictions of multiple models as <u>input to a meta model</u>.
```
Linear Regression → $105k  ┐
Random Forest     → $112k  ├→ Meta model → Final prediction
XGBoost           → $108k  ┘
```
The meta model learns the optimal weights to combine base model predictions.

### Voting Regression

Simple or weighted average of multiple model predictions. 
```python
from sklearn.ensemble import VotingRegressor

voting = VotingRegressor([
    ('lr', LinearRegression()),
    ('rf', RandomForestRegressor()),
    ('xgb', XGBRegressor())
])
```


## Classification vs Regression Ensemble

|              | Classification               | Regression                   |
| ------------ | ---------------------------- | ---------------------------- |
| Bagging      | Majority vote                | Average                      |
| Boosting     | Residual learning (log loss) | Residual learning (MSE loss) |
| Final output | Class label                  | Continuous value             |



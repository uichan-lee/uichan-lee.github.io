# Welcome to My Writings

This sample post demonstrates all supported Obsidian features. You can copy this file as a reference when writing new posts.

## Callout Blocks

> [!note] A Note
> This is a note callout. Great for general information or things worth remembering.

> [!tip] Pro Tip
> You can use callouts to highlight important information. All standard Obsidian types are supported.

> [!warning] Watch Out
> Be careful with this operation — it cannot be undone.

> [!question] Did You Know?
> Callouts support many types: note, tip, warning, question, success, failure, danger, bug, example, abstract, and quote.

> [!example] Example
> Here's how you'd structure a data pipeline in Python using pandas and scikit-learn.

> [!success] Result
> The model achieved 91.2% cross-validation accuracy on the test set.

## LaTeX Math

Inline math works naturally: the quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$, and Euler's identity is $e^{i\pi} + 1 = 0$.

Block math for display equations:

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

Bayes' theorem:

$$
P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}
$$

Matrix notation:

$$
\mathbf{X} = \begin{bmatrix} x_{11} & x_{12} \\ x_{21} & x_{22} \end{bmatrix}
$$

## Highlighted Text

You can ==highlight important text== just like in Obsidian. This is useful for marking ==key concepts== or ==definitions==.

## Code Blocks

```python
import numpy as np
import pandas as pd

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

df = pd.read_csv("data.csv")
print(df.describe())
```

## Standard Markdown

- **Bold text** and *italic text*
- [Links](https://example.com) work too
- Lists, tables, blockquotes — all supported

| Feature | Supported |
|---------|-----------|
| Callouts | Yes |
| LaTeX | Yes |
| Highlights | Yes |
| Code Blocks | Yes |

> Regular blockquotes (without `[!type]`) still render as normal quotes.

---

*That's it! Upload your Obsidian notes as `.md` files and they'll render properly.*

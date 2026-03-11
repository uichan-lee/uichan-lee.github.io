# Asymptotic II 

Given a code snippet, we can express its runtime as a function R(N), where N is some property of the input of the function (often the size of the input).


Whereas Big Theta can informally be thought of as something like "equals", Big O can be thought of as "less than or equal". 

![[Pasted image 20251001013138.png]]

![[Pasted image 20251001160506.png|675]]
- Big Oh and Big Omega are **Not Unique**.

![[Pasted image 20251001162124.png]]

# Asymptotic III
## Toy Recursion Analysis
![[Pasted image 20251001161550.png]]

Another approach: Count number of calls to f3, given by C(N)
- C(1) = 1
- C(2) = 1 + 2
- C(3) = 1 + 2 + 4

## Example Problem 

```java
public static void f4(int N) {
	if (N == 0) { return; }
	f4(N / 2);
	f4(N / 2);
	f4(N / 2);
	f4(N / 2);
	g(N);    // runs in Θ(N^2) time
}
```

We're considering large N, so we won't be considering encountering `if (N == 0)` for the first input. 
Each `f4` call will call another 4`f4(N/2)` calls.

![[Pasted image 20251002234700.png|300]]

Each call will then also divide into 4 `f4(N/4)` calls.
Meanwhile, there is also one `g(N)` calls for each `f4` calls. 
So we add `g(N) = Θ(N^2)` for each calls. 

![[Pasted image 20251002234927.png|550]]
(We're adding value to every single calls, not one for each row)
All added runtimes of $(\frac{N}{c})^2$  gets simplified to $N^2$. 
Thus, each level (row) of `f4` calls costs $a\cdot (N^2+bN)$, or simply $\theta(N^2)$ runtime.

Then, how many levels are there for $N$ nodes? 
For each layer of calls, we can see that the input $N$ divides by 2. 
In other words, if we want additional layer of calls, we multiply the input size by 2. 
This is the behavior of $\log_2(N)$. 

Having $\log_2(N)$ layers which costs $\theta(N^2)$ runtime means... $$\theta(N^2\log{N})$$

# Extends, Sets, Maps, and BSTs

An **Abstract Data Type (ADT)** is defined only by its operations, not by its implementation.

### Tree
A tree consists of:
- A set of nodes.
- A set of edges that connect these nodes.
	- Constraint: There is exactly one path between any two nodes. 
In a rooted tree, we call one node the root. (conventionally at the top)
In a rooted binary tree, every node has either 0, 1, or 2 children (subtrees).
#### Binary Search Trees
A binary search tree is a rooted binary tree with the BST property.
**BST Property**. For every node X in the tree:
- Every key in the *left* subtree is *less* than X's key.
- Every key in the *right* subtree is *greater* than X's key.
![[Pasted image 20251003163629.png]]

- `fish` is greater than `ears`, so left is not a BST.
> No duplicate keys allowed!




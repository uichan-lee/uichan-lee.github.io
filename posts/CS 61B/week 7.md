> [!Opening Questions]
> #### 1
> ![[Pasted image 20251006115959.png]]
> **Q.** Let H(N) be the height of a tree with N nodes. Give H(N) in Big-Theta notation for "bushy" and "spindly" trees, respectively:
> **A.** Θ(log(N)) for bushy, and Θ(N) for spindly tree
> 
> Then, all three statements are true.
> - Worst case BST height is Θ(N)
> 	- A worse case (spindly tree) has a height that grows exactly linearly
> - BST height is O(N)
> - BST height is O(N^2)
> ---
> #### 2
> ![[Pasted image 20251006120437.png]]
> **A.** Worst case BST height is Θ(N).
> 
> Analogy: "The most expensive room in the hotel is $639 per night." is more informative than "Every room in the hotel is less than or equal to $639 per night."

---
# Binary Search Tree
##### BST Height
BST height is all four of these:
- $O(N)$
- $\theta(log(N))$ in the best case ("bushy")
- $\theta(N)$ in the worst case ("spindly")
- $O(N^2)$

The middle two statements are more informative. 
- Big O is NOT mathematically the same thing as "worst case"
	- e.g. BST heights are $O(N^2)$, but are not quadratic in the worst case.
	- ... but Big O often used as shorthand for "worst case".

Big O is still a useful idea:
- Allows us to make simple blanket statements, e.g. can just say "binary search is $O(log N)$" instead of "binary search is $\theta(log N)$ in the worst case"
- Sometimes don't know the exact runtime, so use O to give an upper bound.
	- Example: Runtime for finding shortest route that goes to all world cities is $O(N^2)$. There might be a faster way, but nobody knows one yet. 
- Easier to write proofs for Big O than Big Theta.

##### Height and Depth
Height and average depth are important properties of BSTs.
![[Pasted image 20251006121516.png]]
- The **"depth" of a node** is how far it is from the root, e.g. depth(g) = 2.
- The **"height" of a tree** is the depth of its deepest leaf, e.g. height(T) = 4.
- The "average depth" of a tree is the average depth of a tree's nodes. 
	- $\frac{0*1 + 1*2 + 2*4 + 3*6 + 4*1}{1+2+4+6+1}=2.35$

Height and average depth *determine runtimes* for BST operations.
- The **"height" of a tree** determines the worst case runtime to find a node.
	- Example: Worst case is contain(s), requires 5 comparisons (height + 1)
- The **"average depth"** determines the average case runtime to find a node.
	- Example: Average case is 3.35 comparisons (average depth + 1)

Although the height and average depth must be larger than the optimal value, **randomized trees** are bushy, not spindly. 

> [!Summary]
> BSTs have:
> - Worst case Θ(N) height.
> - Best case Θ(log N) height.
> - Θ(log N) height if constructed via random inserts.

Bad News: We can't always insert our items in a random order in real world scenarios. Why?
- Data comes in over time, don't have all at once.
	- Example: Storing dates of events.
		- `add("01-Jan-2019, 10:31:00")`
		- `add("01-Jan-2019, 17:51:00")`
		- `add("02-Jan-2019, 00:04:00")`
		- `add("02-Jan-2019, 22:45:00")`

---
# B-Trees
##### Avoiding Imbalance through Overstuffing
The problem is adding new leaves at the bottom.
Avoid new leaves by "overstuffing the leaf nodes". 
![[Pasted image 20251006124623.png|500]]

Overstuffed tree always has balanced height. 
However, the problem arises when the leaf node becomes too overstuffed. (basically just a linked list)

Height is balanced, but we have a new problem:
- Leaf node can get too stuffed. 

Solution?
- Set a limit L on the number of items, say L = 3.
- If any node has more than L items, give an item to parent.
	- Which one? Let's say the left-middle. (this is the best choice)

![[Pasted image 20251006124910.png|500]]
Problem is that *16* is to the right of *17*.

- If any node has more than L items, give an item to parent.
	- Pulling item out of full node splits it into left and right.
	- Parent node now has three children!
![[Pasted image 20251006125021.png|500]]

- `contains(18)`:
	- 18 > 13, so go right
	- 18 > 15, so compare vs. 17
	- 18 > 17, so go right
Examining a node costs us O(L) compares, but that's okay since L is constant.


##### Splitting Non-Leaf Nodes
![[Pasted image 20251006125307.png]]

> [!Question]
> **Q.** What happens if the root is too full? 
> ![[Pasted image 20251006125412.png]]
> 
> **A.** ![[Pasted image 20251006125546.png]]

Observation: Splitting-trees (B-Tree) has perfect balance.
##### The Real Name for Splitting Trees is "B Trees"
- B-trees of order L = 3 (Like we used today) are also called a 2-3-4 tree or a 2-4 tree.
	- "2-3-4" refers to the number of children that a node can have, e.g. a 2-3-4 tree node may have 2, 3, or 4 children.
- B-trees of order L=2 are also called a 2-3 tree.

B-Trees are most popular in two specific contexts:
- Small L (L = 2 or L = 3):
	- Used as a conceptually simple balanced search tree
- L is very large (say thousands)
	- Used in practice for databases and filesystems (i.e. systems with very large records)
![[Pasted image 20251006130052.png]]

##### Height of a B-Tree with Limit L
L: Max number of items per node
> Height: Between $~\log_{L+1}(N)$ and $~log_2(N)$
- Largest possible height is all non-leaf nodes have 1 item.
- Smallest possible height is all nodes have L items.
- Overall height is therefore Θ(log N)

![[Pasted image 20251006132641.png]]
##### Runtime for `contains`
- Worst case number of nodes to inspect: H + 1
- Worst case number of items to inspect per node: L
- Overall runtime: O(HL)

Since H = Θ(log N), overall runtime is O(L log N).
- Since L is a constant, runtime is therefore O(log N)

> [!Bottom Line]
> `contains` and `add` are both **O(log N)**


##### The Bad News
B-Trees for small L, e.g. 2-3 trees and 2-3-4 trees, are really complicated to implement. We are looking for a data structure that is efficient like B-Trees, but easier to implement.
![[Pasted image 20251009225218.png]]

# Left Leaning Red-Black Trees (LLRBs)
##### Tree Rotation
Let's define a tree rotation operation. 
Suppose we run `rotateLeft(G)`: Let x be the right child of G. Make G the **new left child** of x.
> You can think of `rotateLeft()` operation as temporarily merging the *right child* and push self (G) to the left.


![[Pasted image 20251009224854.png]]
![[Pasted image 20251009224916.png]]
There are 3 children to `P`, which doesn't make sense. So we will move the `k` node to the right child of `G`. 
![[Pasted image 20251009225621.png]]

In a sequence:
![[Pasted image 20251009225635.png]]

If we call `rotateRight(P)` on the rotated tree, we will return to the original state:
![[Pasted image 20251009225719.png]]

Rotation can shorten (or lengthen) a tree, while preserving the search tree property!
![[Pasted image 20251009225829.png]]
So, we can use rotation to balance a BST.
- Rotation allows balancing of a BST in **O(N)** moves.

> [!Some Rotations are Undefined] 
> - Rotating a node right is undefined if that node has no left child. 
> 	- We would need to promote the node's left child, but it doesn't exist.
> - Rotating a node left is undefined if that node has no right child. 


Now, let's build a BST that is structurally identical to a 2-3 tree. 
- Since 2-3 trees are balanced, so will our special BSTs.
## LLRBs
A BST with left glue links that represents a *2-3 tree* is often called a **"Left Leadning Red Black Binary Search Tree"** or LLRB.

- LLRBs are normal BSTs.
- There is a 1-1 correspondence between an LLRB and an equivalent 2-3 tree.
- The red is just a convenient fiction. Red links don't "do" anything special. (is for human to differentiate)

![[Pasted image 20251009230434.png]]

Searching an LLRB tree for a key is easy.
- Treat it exactly like any BST.

![[Pasted image 20251009230809.png]]

An LLRB has no more than ~2x the height of its 2-3 tree equivalent. 
Since 2-3 tree has a logarithmic height, LLRB also has.

- When inserting: Use a red link.
- If there is a *right leaning "3-node"* , we have a **Left Leaning Violation**.
	- <u>Rotate Left</u> the appropriate node to fix.
- If there are *two consecutive left links*, we have an **Incorrect 4 Node Violation**.
	- <u>Rotate Right</u> the appropriate node to fix.
- If there are *nodes with two red children*, we have **Temporary 4 Node**. 
	- <u>Color Flip</u> the node to emulate the split operation. 

One last detail: Cascading operations.
- It is possible that a rotation or flip operation will cause an additional violation that needs fixing. 

**Cascading Example**
Inserting Z gives us a temporary 4 node.
- Color flip yields and invalid tree, because its *right leaning 3-node*.
- We can fix it with `rotateLeft(B)`.
![[Pasted image 20251009231932.png]]

---
# Priority Queues and Heaps

**The Priority Queue Interface**

![[Pasted image 20251010161843.png]]



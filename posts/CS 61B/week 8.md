# Trees and Traversals 

> [! Definition]
> **Tree Definition (Reminder)**
> A tree consists of
> - A set of nodes.
>- A set of edges that connect those nodes.
>- Constraint: There is exactly one path between any two nodes
>---
>**Rooted Tree Definition (Reminder)**
>A rooted tree is a tree where we've chosen one node as the "root".
>- Every node `N` except the root has exactly one parent, defined as the first node on the path from N to the root.
>- A node with no child is called a leaf.
>![[Pasted image 20251013225931.png]]
> 

Trees are a more general concept.
- Organization  charts
- Family lineage

Sometimes you want to iterate over a tree. 
- What one might call "tree iteration" is actually called **"tree traversal"**
- Unlike lists, there are many orders in which we might visit the nodes.
	- Each ordering is useful in different ways. 

### Tree Traversal Orderings
![[Pasted image 20251013230555.png|400]]

**Level Order**
- Visits top-to-bottom, left-to-right (like reading in English): DBFACEG
**Depth First Traversals**
- 3 types: Preorder, Inorder, Postoder
- Basic (rough) idea: Traverse "deep nodes" (e.g. `A`) before shallow ones (e.g. `F`)
- Note: Traversing a node is different than "visiting" a node.


```java
// Preorder traversal: "Visit" a node, then traverse its children: DBACFEG
preOrder (BSTNode x) {
	if (x == null) return;
	print(x.key);
	preOrder(x.left);
	preOrder(x.right);
}

// Inorder traversal: Traverse left child, visit, traverse right child: ABCDEFG
inOrder (BSTNode x) {
	if (x == null) return;
	inOrder(x.left);
	print(x.key);
	inOrder(x.right);
}

// Postorder traversal: Traverse left, right, then visit: ACBEGFD
postOrder (BSTNode x) {
	if (x == null) return;
	postOrder(x.left);
	postOrder(x.right);
	print(x.key);
}
```
A Useful Visual Trick (for Humans, Not Algorithms)
![[Pasted image 20251013231428.png]]
![[Pasted image 20251013231446.png]]

## Graphs
Trees are fantastic for representing strict hierarchical relationship.
- But not every relationship is hierarchical. 
- Example: Metro map (contains cycles)

> [! Definition] 
> **Graph Definition**
> A graph consists of:
> - A set of nodes.
> - A set of zero or more edges, each of which connects two nodes.
> ![[Pasted image 20251013232344.png]]
> ---

A simple graph is a graph with:
- No edges that connect to a vertex to itself, i.e. no "length 1 loops"
- No two edges that connect the same vertices, i.e. no "parallel edges"
![[Pasted image 20251013232505.png]]

**Graph Types**
![[Pasted image 20251013232619.png]]

![[Pasted image 20251013232902.png]]

**Some Graph Queries**
- *s-t Path*: Is there a path between vertices `s` and `t`? 
- *Connectivity*: Is the graph connected, i.e. is there a path between all vertices?
- *Biconnectivity*: Is there a vertex whose removal disconnects the graph? 
- *Shortest s-t Path*: What is the shortest path between vertices `s` and `t`?
- *Cycle Detection*: Does the graph contain any cycles?
- *Euler Tour*: Is there a cycle that uses every edge exactly once? 
- *Hamilton Tour*: Is there a cycle that uses every vertex exactly once?
- *Planarity*: Can you draw the graph on paper with no crossing edges?
- *Isomorphism*: Are two graphs isomorphic (the same graph in disguise)? 

![[Pasted image 20251018141541.png]]

> [! Summary]
> Graphs are a more general idea than a tree.
> - A tree is a graph where there are no cycles and every vertex is connected.
> - Key graph terms: Directed, Undirected, Cyclic, Acyclic, Path, Cycle
> 
> Graph problems vary widely in difficulty.
> - Common tool for solving almost all graph problems is traversal.
> - A traversal is an order in which you visit / act upon vetices.
> - Tree traversals:
> 	- Preorder, inorder, postorder, level order.
> - Graph traversals:
> 	- DFS preorder, DFS postorder, BFS.
> - By performing actions / setting instance variables during a graph (or tree) traversal, you an solve problems like s-t connectivity or path finding. 


---
# Graph Traversals and Implementations

#### Breadth First Search
- Initialize a queue with a starting vertex `s` and mark that vertex.
	- A queue is a list that has two operations: `enqueue` (a.k.a. `addLast`) and dequeue (a.k.a. `removeFirst`)
	- Let's call this queue our **fringe**
- Repeat until queue is empty:
	- Remove vertex `v` from the front of the queue.
	- For each unmarked neighbor n of v:
		- Mark n
		- Set `edgeTo[n] = v` (and/or `distTo[n] = distTo[n] + 1`)
		- Add `n` to end of queue.

In our **fringe**, the closest next vertex will <u>always</u> at the front of the queue. 

![[Pasted image 20251018143641.png]]

#### Depth First Search
![[image-33.png|239x153]]There are two types of Depth First Search:
1. DFS Preorder
2. DFS Postorder

[Demo](https://docs.google.com/presentation/d/1nJmLj2gCwKRwx0_fIEFj0d2_JFhsjknzOpCk4jjGklw/edit?slide=id.g25f3bf5f9c7_0_1020#slide=id.g25f3bf5f9c7_0_1020)

- **DFS Preorder**: Action is before DFS calls to neighbors.
	- Our action was setting `edgeTo`
	- Example: `edgeTo[1]` was set before DFS calls to neighbors 2 and 4.
- One valid DFS preorder for this graph: 012543678
	- Equivalent to the order of `dfs` calls.

- **DFS Postorder**: Action is after DFS calls to neighbors.
- Results for `dfs(0)` would be: 347685210
	- Equivalent to the order of `dfs` returns.

- **BFS Order**: Act in order of distance from s.
	- BFS stands for "breadth first search"
	- Analogous to "level order". Search is wide, not deep.
	- 0 1 24 53 68 7

#### Graph Representations
1. Adjacency Matrix
![[Pasted image 20251018144652.png]]
Total runtime to iterate over all neighbors of `v` is $\theta(V)$.
- Underlying code has to iterate through entire array to handle `next()` and `hasNext()` calls.

2. Adjacency List
![[Pasted image 20251018145210.png]]


> [! Quiz]
> ![[Pasted image 20251018150252.png]]
> ---
> **A: $\theta(V + E)$** (All cases)
> Best case: $\theta(V)$    Worst case: $\theta(V^2)$
> 
> Runtime to iterate over `v`'s neighbors:
> - $\Omega(1), O(V)$
>   
> How many vertices do we consider?
> - V


## Dijkstra's Algorithm
[Slides](https://docs.google.com/presentation/d/1Bv1gzXFz4J4Y5Y1J2ktwUVkAkcuI7Q4SDUbuKao4dBw/edit?slide=id.g25f504b600f_0_675#slide=id.g25f504b600f_0_675)


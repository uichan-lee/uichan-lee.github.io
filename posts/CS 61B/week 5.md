
## Asymptotic I
Our goal is to somehow <u>characterize the runtimes</u> of the functions.
- Characterization should be **simple** and **mathematically rigorous**.
- Characterization should **demonstrate superiority**.
![[Pasted image 20250929140833.png]]
##### Techniques for Measuring Computational Cost
Technique 1: Measure execution time in seconds using a client program.
- Good: Easy to measure, meaning is obvious.
- Bad: May require large amounts of computation time. Result varies with machine, compiler, input data, etc. 

Technique 2A: Count possible operations for an array of size N = 10,000.
- Good: Machine independent. Input dependence captured in model. 
- Bad: Tedious to compute. Array size was arbitrary. Doesn't tell you actual time. 
![[Pasted image 20250929134916.png]]

Technique 2B: Count possible operations in terms of input array size N.
- Good: Machine independent. Input dependence captured in model. Tells you how algorithm *scales*.
- Bad: Even more tedious to compute. Doesn't tell you actual time. 
![[Pasted image 20250929135150.png]]

##### Comparing Algorithms
Which algorithm is better? dup2. Why?
- Fewer operations to do the same work [e.g., 50,015,001 vs. 10000 operations]
- Better answer: Algorithm *scales better* in the worst case. $(N^2+3N+2)/2$  vs. $N$
- Even better answer: Parabolas ($N^2$) grow faster than lines ($N$).
![[Pasted image 20250929140345.png]]

##### Intuitive Order of Growth Identification
Simplification 1: Consider only the worst case.
- Justification: When comparing algorithms, we often care only about the worst case. (there are exceptions)

![[Pasted image 20250929141337.png|405]]
For this algorithm, the order of growth of the runtime is $N^3$.
![[Pasted image 20250929141423.png]]

Simplification 2: Pick some representative operation to act as a proxy for the overall runtime.
- Good choice: **increment**
- Bad choice: assignment of $j = i+1$
We call our choice the "**cost model**".
![[Pasted image 20250929141709.png|350]]

Simplification 3: Ignore lower order terms.
![[Pasted image 20250929141754.png|350]]

Simplification 4: Ignore multiplicative constants.
- Why? It has no real meaning. We already threw away information when we choose a singly proxy operation.
![[Pasted image 20250929141732.png|350]]

Simplification Summary:
1. Only consider the worst case.
2. Pick a representative operation (the cost model).
3. Ignore lower order terms.
4. Ignore multiplicative constants.
![[Pasted image 20250929142048.png]]


### Big Theta
Given a function $Q(N)$, we can apply our last two simplifications (ignore low orders terms and multiplicative constants) to yeild the order of growth of $Q(N)$.
- Example: $Q(N)=3N^3+N^2$
- Order of growth: $N^3$
![[Pasted image 20250929142947.png|450]]

![[Pasted image 20250929143143.png]]
- k1 = 3, k2 = 5
![[Pasted image 20250929143206.png]]


## Disjoint Sets 
'Disjoint Sets' data structure for solving the "Dynamic Connectivity" problem. 

Disjoint Sets data structure has two operations:
- `connect(x, y)`: Connects x and y
- `isConnected(x, y)`: Returns true if x and y are connected. Connections can be transitive, i.e. they don't need to be direct. 

![[Pasted image 20250929180912.png]]

##### The Disjoint Sets Interface
```java
public inteface DisjointSets {
	/** Connects two items P and Q. */
	void connect(int p, int q);
	
	/** Checks to see if two items are connected. */
	boolean isConnected(int p, int q); 
}
```
Goal: Design an efficient DisjointSets implementation. 
- Number of elements N can be huge.
- Number of method calls M can be huge.
- Calls to methods may be interspersed

- Naive approach: Record every single connecting line somehow. 
- Better approach: Model connectedness in terms of sets.
	- How things are connected isn't something we need to know.
	- Only need to keep track of which connected component each item belongs to. 
Rather than manually writing out every single connecting line, only record the sets that each item belongs to. 
![[Pasted image 20250929181732.png]]


[Path Compression](https://docs.google.com/presentation/d/1ki_jXKBTUNCl_QomfpErBFH9T1wOYrHZ8jOGFOQSQoA/edit?slide=id.g20e53a1f10d_0_433#slide=id.g20e53a1f10d_0_433)
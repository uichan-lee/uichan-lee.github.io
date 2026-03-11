> [!Note] **Abstract Data Type vs. Specific Implementations**
> There are many ways to implement an abstract data type.
> ![[image-17.png|530x257]]

Runtimes for Balanced Search Tree and Hash Table implementations were very fast. 

|                                       |   contains(x)   |      add(x)      |
| :-----------------------------------: | :-------------: | :--------------: |
|                  BST                  | $\theta(log N)$ | $\theta(log N)$  |
| Resizing Separate Chaining Hash Table |  $\theta(1)^✝$  | $\theta(1)^{*✝}$ |
\*: indicates "on average"
✝: Assuming items are evenly spread.

---
# Tries

![[image-18.png|149x324]]
Suppose we know that our keys are always strings.
- Can use a special data structure known as a **Trie**
- Basic idea: Store each letter of the string as a node in a tree.


Tries will have great performance on:
- get
- add
- special string operations


|                    | key type   | get(x)          | add(x)           |
| ------------------ | ---------- | --------------- | ---------------- |
| Balanced BST       | comparable | $\theta(log N)$ | $\theta(log N)$  |
| RSC hash Table     | hashable   | $\theta(1)^✝$   | $\theta(1)^{*✝}$ |
| data indexed array | chars      | $\theta(1)$     | $\theta(1)$      |
| **Tries**          | Strings    | ?               | ?                |

For String keys, we can use a "Trie". Key ideas:
- Every node stores only one letter.
- Nodes can be shared by multiple keys. 

![[image-24.png]]

To make it clear which words the Trie contains, we mark the node that ends a word. 

> [!Note]
> Trie:
> - Short for Re**trie**val Tree.
> - Inventor Edward Fredkin suggested it should be pronounced "tree", but almost everyone pronounces it like "try"

## Trie Implementation and Runtime

The first approach might look something like the code below.
```java
public class TrieSet {
	private static final int R = 128; // ASCII
	private Node root; // root of trie
	
	private static class Node {
		private boolean isKey;
		private DataIndexedCharMap next;
		private Node(boolean b, int R) {
			iskey = b;
			next = new DataIndexedCharMap<Node>(R);
		}
	}
}
```

```java
public class DataIndexedCharMap<V> {
	private V[] items;
	public DataIndexedCharMap(int R) {
		items = (V[]) new object[R];
	}
}
```

Given a Trie with N keys, What is the:
- Add runtime? $\theta(1)$
- Contains runtime? $\theta(1)$

Runtimes independent of number of keys!
Or in terms of L, the length of the key:
- Add: $\theta(L)$
- Contains: $O(L)$

One downside of the DictCharKey based Trie is the huge memory cost of storing R links per every node.
- Wasteful because most links are unused in real world usage. 
![[Pasted image 20251103140557.png]]

---
# Basic Sorts (Sorting $I$)

##### Sorting - Definitions (from Donald Knuth's *TAOCP*)
An **ordering relation** < for keys a, b, and c has the following properties: 
- Law of Trichotomy: Exactly one of a < b, a = b, b < a is true
- Law of Transitivity: If a < b, and b < c, then a < c

An ordering relation with the properties above is also known as a "total order".

A **sort** is a permutation (re-arrangement) of a sequence of elements that puts the keys into non-descending order relative to a given ordering relation. 
- $x_1 \leq x_2 \leq x_3 \leq \dots \leq x_N$

**Example: String Length**
Two valid sets for ["cows", "get", "going", "the"] for the ordering relation of string length in ascending order: 
- ["the", "get", "cows", "going"]
- ["get", "the", "cows", "going"]

Ordering relations are typically given in the form of `comapareTo` or `compare` methods.
```java
import java.util.Comparator;

public class LengthComparator implements Comparator<String> {
	public int compare(String x, String b) {
		return x.length() - b.length();
	}
}
```

An **inversion** is a pair of elements that are out of order with respect to <.
![[Pasted image 20251110101233.png]]
Another way to state the goal of sorting:
- Given a sequence of elements with Z inversions.
- Perform a sequence of operations that reduces inversions to 0.

##### Performance Definitions
Characterizations of the runtime efficiency are sometimes called the **time complexity** of an algorithm. 
Example:
- Dijkstra's has time complexity O(E log V)

Characterizations of the "extra" memory usage of an algorithm is sometimes called the **space complexity** of an algorithm.
- Dijkstra's has space complexity $\theta(V)$ (for the queue, `distTo`, `edgeTo`)
	- Note that the graph takes up space $\theta(V+E)$, but we don't count this as part of the space complexity of Dijkstra since the graph has itself already exists and is an input to Dijkstra's. 

Each *primitive* object (one variable, one element of a list, etc.) counts as 1 unit of space, if its size is independent of input size. 


## Selection Sort
[Selection Sort Demo](https://docs.google.com/presentation/d/1RIlO0BLQBu_Du7L_IuBQ8srFdqA6wfteGB0T69OcBLo/edit?slide=id.g25f59ced8fc_0_523#slide=id.g25f59ced8fc_0_523)
Selection sorting N items:
- Find the smallest item in the unsorted portion of the array.
- Move it to the end of the sorted portion of the array.
- Selection sort the remaining unsorted items.

Example Two Steps (not first two steps):
![[Pasted image 20251110101843.png]]
![[Pasted image 20251110101850.png]]

### Sort Properties:
- $\theta(N^2)$ time if we use an array (or similar data structure)
- $\theta(1)$ memory if we swap *in-place*
Seems inefficient: We look through entire remaining array every time to find the minimum.

## Heapsort
### Naive Heap Sort
Idea: Instead of rescanning entire array looking for minimum, maintain a heap so that getting the minimum is fast!

Naive heap sorting N items:
- Insert all items into a max heap[^1], and discard input array. Create output array.
- Repeat N times:
	- Delete largest item from the max heap.
	- Put the largest item at the end of the unused part of the output array.
[Naive Heap Sort Demo](https://docs.google.com/presentation/d/1RIlO0BLQBu_Du7L_IuBQ8srFdqA6wfteGB0T69OcBLo/edit?slide=id.g25f59ced8fc_0_887#slide=id.g25f59ced8fc_0_887)

[^1]: A min heap would work as well, but wouldn't be able to take advantage of the fancy trick (discussed later).

**Phase 1: Heap Creation**
![[Pasted image 20251110103532.png]]
> The runtime of heap creation is $O(N log N)$

**Phase 2: Heap Deletion**
First few steps are:
![[Pasted image 20251110103648.png]]
![[Pasted image 20251110103656.png]]
![[Pasted image 20251110103708.png]]
...

![[Pasted image 20251110103732.png]]

> The total runtime of Naive Heapsort is **O(N log N)**
> - Getting items into the heap O(N log N) time
> - Selecting *largest* item: $\theta(1)$
> - Removing *largest* item: O(log N) for each removal

> Memory usage is $\theta(N)$ to build the additional copy of all of our data. 


### In-Place Heapsort
Notice here that both the heaps and the output have a sequence of 0s in them
- These are kind of "filler values"; they have no meaning here, and are just placeholders
	- In theory, we don't need to store these 0s
	- Notably, at each step, the heap shrinks by 1 item, and the output grows by one item. 
![[Pasted image 20251110104258.png]]

Idea: Store the heap and the output in the same array, so we save memory. 
1. Convert input into heap (ideally *in-place* so no memory is used)
2. Repeat N times:
		a. Delete largest item from the max heap, and move deleted item to vacated array slot. (Uses no extra memory!)
![[Pasted image 20251110104425.png]]
Step 1: Convert input array into a heap
Two parameters we can play with here:
- Min Heap vs **Max Heap** (since we always want to move the largest remaining item to the vacant spot)
- Top Down Heapification vs **Bottom Up heapification**  (Asymptotically faster)
![[Pasted image 20251110105432.png]]
[In-Place Heap Sort Demo](https://docs.google.com/presentation/d/1RIlO0BLQBu_Du7L_IuBQ8srFdqA6wfteGB0T69OcBLo/edit?slide=id.g25f59ced8fc_0_1645#slide=id.g25f59ced8fc_0_1645)

After the Bottom-up heapification, repeatedly remove the largest item (heap removal)
First few steps (after heapification) are: 
![[Pasted image 20251110105733.png]]
![[Pasted image 20251110105749.png]]
![[Pasted image 20251110105755.png]]
...
![[Pasted image 20251110105814.png]]
## Merge Sort
Top-Down merge sorting N items:
- Split items into 2 roughly even pieces.
- Merge sort each half.
- Merge the two sorted halves to form the final result. 
	- Compare input[i] < input[j] (if necessary)
	- Copy smaller item and increment p and i or j
[Top-Down Merge Sort Demo](https://docs.google.com/presentation/d/1RIlO0BLQBu_Du7L_IuBQ8srFdqA6wfteGB0T69OcBLo/edit?slide=id.g312555aae2a_0_1337#slide=id.g312555aae2a_0_1337)

![[Pasted image 20251110110948.png]]
![[Pasted image 20251110111018.png]]
...

![[Pasted image 20251110111042.png]]
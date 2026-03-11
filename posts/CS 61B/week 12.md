# Insertion Sort (In-place)
General Strategy:
- Repeat for i = 0 to N - 1:
- Designate item i as the traveling item. 
- Swap items backwards until traveller is in the right place among all previously examined items. 
- In example, use j pointer to track current spot of traveling item. 

[Insertion Sort Demo](https://docs.google.com/presentation/d/1LaozqAT3MAEkK6x-w_njeM0oCcBQDbKCloiKUOr5q-8/edit?slide=id.g25e3164fbfa_0_243#slide=id.g25e3164fbfa_0_243)
![[Pasted image 20251110162237.png]]
![[Pasted image 20251110162256.png]]
![[Pasted image 20251110162332.png]]
![[Pasted image 20251110162339.png]]
...
![[Pasted image 20251110162400.png]]

Two more examples: 
![[Pasted image 20251110162422.png]]
> [!Note] Recall: Inversions
> An **inversion** is a pair of elements that are out of order with respect to <. 
> ![[Pasted image 20251110163053.png]]
> 
> For arrays that are almost sorted, insertion sort does very little work. 
> - Left array: 5 inversions, so only 5 swaps. 
> - Right array: 3 inversion, so only 3 swaps 

On arrays with small number of inversions, insertion sort is extremely fast. 
- Define an **almost sorted** array as one in which number of inversions $\leq$ cN for some c. Insertion sort is excellent on these arrays

Less obvious: For small arrays (N < 15 or so), insertion sort is fastest.
- More an empirical fact than a theoretical one.
- The Java implementation of Mergesort does this 

![[Pasted image 20251110163743.png]]

---
# Quicksort

##### Context for Quicksort's Invention
1960: Tony Hoare was working on a crude automated translation program for Russian and English.

Algorithm: N binary searches of D length dictionary. 
- Total runtime: N log D
- ASSUMES log time binary search! 

Limitation at the time:
- Dictionary stored on long piece of tape, sentence is an array in RAM. 
	- Binary search of tape is not log time (requires physical movement!)
- Better: **Sort the sentence** and scan dictionary tape once. Take N log N + D time. 
	- But Tony had to figure out how to sort an array


**Partitioning**
Main idea: I have a list of small and large items. To sort this:
- Separate the small items and large items into two separate piles.
- Sort the small items
- Sort the large items
- Put the sorted lists together

How to decide what's big and what's small?
- Pick an item from the list (we'll call this the pivot). 
  Smaller items are small, and bigger items are big. 

We call this a **partition**; we separate the big items and the small items, and put remaining items in the middle. 

> [!NOTE] Partitioning
> A **partition** of an array, given a **pivot** x, is a rearrangement of items so that:
> - All entries to the left of x are <= x
> - All entries to the right of x are >= x
> - x moves between the smaller and larger items 
> ![[Pasted image 20251110164624.png]]

![[Pasted image 20251110165336.png]]

Observations:
- 5 is "in its place." Exactly where it'd be if the array were sorted.
- Can sort two halves separately, e.g. through recursive use of partitioning. 
![[Pasted image 20251110165410.png]]

## Quick Sort Algorithm
[Quick Sort Demo](https://docs.google.com/presentation/d/1LaozqAT3MAEkK6x-w_njeM0oCcBQDbKCloiKUOr5q-8/edit?slide=id.g239d559103d_1_145#slide=id.g239d559103d_1_145)

Quick sorting N items:
- Partition on leftmost item. 
- Quicksort left half.
- Quicksort right half. 

First few runs:
![[Pasted image 20251110165720.png]]
Partition on leftmost item(32)[^1]
![[Pasted image 20251110165739.png]]
![[Pasted image 20251110165803.png]]
![[Pasted image 20251110165808.png]]

...
![[Pasted image 20251110165829.png]]
![[Pasted image 20251110165839.png]]

Quicksort was the name chosen by Tony Hoare for partition sort.
- For most common situations, it is empirically the fastest sort.
	- Tony was luck that the name was correct.

How fast is Quicksort? Need to count number and difficulty of partition operations.
Theoretical analysis:
- Partitioning costs $\theta(K)$, where $\theta(K)$ is the number of elements being partitioned. 
- The interesting twist: Overall runtime will depend crucially on where pivot ends up. 

## Runtime Analysis

**Best Case: Pivot Always Lands in the Middle**
![[Pasted image 20251112161311.png]]

Best case runtime? 
- Total work at each level (partitioning): ≅N
	- First level: ≅N, Second level: 2 * ≅N / 2, Third level: 4 * ≅N / 4 ...

> Overall runtime: **θ(N log N)**

Worst Case: Pivot Always Lands at Beginning of Array
![[Pasted image 20251112161916.png|250]]
> Overall runtime: **θ(N²)**

Theoretical Analysis:
- Best case: θ(N log N)
- Worst case: θ(N²)

Compare to the *Mergesort*:
- Best case: θ(N log N)
- Worst case: θ(N log N)

Then how can quicksort be the fastest sort empirically? 

**Argument #1: 10% Case**
![[Pasted image 20251112162648.png]]
Work at each level: O(N)
- Runtime is O(NH)
	- H is approximately $log_{10/9}$N = O(log N)
- Overall: O(N log N)

**Argument #2: Quicksort is BST Sort**
![[Pasted image 20251112162959.png]]
Key idea: `compareTo` calls are same for BST insert and Quicksort.
- Every number gets compared to 5 in both. 
- 3 gets compared to only 1, 2, 4, and 5 in both.

Reminder: Random insertion into a BST takes O(N log N) time. 

**Empirical Quicksort Runtimes**
![[Pasted image 20251112163714.png]]

![[Pasted image 20251112163823.png]]

If pivot always lands somewhere "good", Quicksort is θ(N log N). However, the very rare θ(N²) cases do happen in practice.
- Bad ordering: Array already in (almost) sorted order 
- Bad elements: Array with all duplicates

To avoid running into the worst case: 
1. Randomness
	a. Pick pivots randomly
	b. Shuffle before you sort.
2. Smarter pivot selection
	a. Picking the median from the first few (e.g. 3) in the partition.
	b. Could calculate the actual median in linear time. Worst case is θ(N log N), but it is slower than Mergesort. 
3. Introspection
4. Preprocess the array



[^1]: Why 32? Just took the leftmost item. We could have different way to choose the pivot. 

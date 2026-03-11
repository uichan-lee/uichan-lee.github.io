Sorting is a foundational problem.
- Obviously useful for putting things in order.
- But can also be used to solve other tasks, sometimes in non-trivial ways.
	- Sorting improves duplicate finding from a Naive $N^2$ to N log N
	- Sorting improves 3SUM from a naive $N^3$ to $N^2$.
- There are many ways to sort an array, each with its own interesting tradeoffs and algorithmic features. 

**Any comparison based sort requires at least order N log N comparisons.** 
Proof summary:
- Puppy, cast, dog is $\Omega$(lg N!), i.e. requires lg N! comparisons.
- TUCS (The Ultimate Comparison Sort; asymptotically fastest sorting algorithm) can solve puppy, cat, dog, and thus takes $\Omega$(lg N!) compares. 
- lg(N!) is $\Omega$(N log N)
	- This was because N! was $\Omega(N/2)^{N/2}$

---
## Sorting Stability

A sort is said to be stable if order of equivalent items is preserved. 
![[Pasted image 20251119161103.png]]

![[Pasted image 20251119161341.png]]
Sorting instability can be really annoying. Wanted students listed alphabetically by section.

> If you shuffle the data before you start, it is NEVER stable. 

> [!NOTE] Sorting Stability
> Is insertion sort stable?
> - Yes
> - Equivalent items never move past their equivalent brethren. 
> 
> Is Quicksort stable? 
> - Depends on your partitioning strategy.

![[Pasted image 20251119161550.png]]

## Warmup: Digit-by-digit Sorting
As a warmup to the later part, suppose we have a list of integers we want to sort.
- Suppose we first sort by **only the rightmost digit**. 
![[Pasted image 20251119161959.png|350]]

- Now suppose we sort by the **left digit** using a **stable sort**. 
![[Pasted image 20251119162107.png]]

> This procedure does not work if the sort subroutine is <u>unstable</u>.

Example of a digit-by-digit sort:
- Use a stable sort on each digit, moving from least to most significant. 
- Result is guaranteed to correct! 
![[Pasted image 20251119162324.png]]

> Two quick notes:
> - No obvious reason why this procedure is useful (can just sort by entire integer)
> - Other digit-by-digit sort procedures work.


## Counting Sort
The key idea from our previous sorting lecture: Sorting requires $\Omega(N log N)$ compares in the worst case. 

> [!Example] Example #1: Sleep Sort (for Sorting Integers) (not actually good)
> For each integer x in array A, start a new program that:
> - Sleeps for x seconds.
> - Prints x.
> All starts at the same time. 
> 
> Runtime: N + max(A)

> [!Example] Example #2: Counting Sort: Exploiting Space Instead of Time
> Assuming keys are unique integers 0 to 11 .
> Idea:
> - Create a new array.
> - Copy item with key i into ith entry of new array.
> ![[Pasted image 20251119162931.png]]
> 
> We just sorted N items in $\theta(N)$ worst case time. 
> - Avoiding yes/no questions lets us dodge our lower bound based on puppy, cat, dog! 

Counting Sort:
- Count number of occurrences of each item.
- Iterate through list, using count array to decide where to put everything. 
Bottom line, we can use counting sort to sort N objects in $\theta(N)$ time.

> [! Example] Counting Sort 
> ![[Pasted image 20251119163515.png]]
> 
> ![[Pasted image 20251119163523.png]]
> 
> ![[Pasted image 20251119163540.png]]
> 
> ...
> ![[Pasted image 20251119163552.png]]

#### Runtime 

> [!Question] Counting Sort vs. Quicksort
> For sorting an array of the 100 largest cities by population, which sort do you think has a better expected worst case runtime in seconds?
> A. Counting Sort (as described in our demo)
> B. Quicksort
> 
> Answer: **Quicksort**
> Counting sort requires building an array of size 37,832,892 (population of Tokyo; largest city)

> [!Question] Counting Sort Runtime Analysis
> What is the runtime for counting sort on N keys with alphabet of size R?
> - Treat R as a variable, not a constant.
> 
> Total runtime on N keys with alphabet of size R: $\theta$(N+R)
> - Creating and filling our count-related arrays: $\theta$(R)
> 	- Example: R = 4 for four card suits.
> - Counting each item and copying into new array: $\theta$(N)
> 
> Memory usage: $\theta$(N + R)
> Bottom line: If N is ≥ R, then we expect reasonable performance. 

![[Pasted image 20251119164802.png]]

Counting sort is nice, but alphabetic restriction limits usefulness.
- Idea: Let's try digit-by-digit sorting.
- The set of possible digits will be a relatively small alphabet. 

# Radix Sort

By decomposing input into a string of characters from a finite alphabet, we can force R to be small. 
![[Pasted image 20251119165145.png]]

![[Pasted image 20251119165208.png]]


## LSD Radix Sort
Non-comparison based sorting algorithms that proceed digit-by-digit are called "Radix Sorts".

The sort we've just discussed is called "LSD Radix Sort".
LSD: Least Significant Digit.

### LSD Runtime
What is the runtime of LSD sort? 
- θ(WN + WR)
- N: Number of items; R: Size of alphabet; W: Width of each item in # digits


### Non-equal Key Lengths
After processing least significant digit, we have array shown below. 
When keys are of different lengths, can treat empty spaces as less than all other characters. 
![[Pasted image 20251119165723.png]]

![[Pasted image 20251119165803.png]]

## MSD Radix Sort
Basic idea: Just like LSD, but sort from leftmost digit towards the right. 




********
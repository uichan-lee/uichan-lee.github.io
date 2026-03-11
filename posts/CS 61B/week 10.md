# Hash Tables 

We've now seen several implementations of the Set (or Map) ADT.
 ![[image.png]]

> [!info] Hash Tables
> - *Data* is converted into a hash code, the **hash code** is then **reduced** to a valid *index*.
> - *Data* is stored in a bucket corresponding to that *index*.
> 	- Each bucket is a "separate chain" of items.
> - Resize when load factor N/M exceeds some constant.
> - If items are spread out nicely, you get $\theta(1)$ average runtime.

**Limits of Search Tree Based Sets**
Our search tree based sets require items to be comparable.
- Need to be able to ask "is `X` < `Y`?" Not true of all types.
- Could we somehow avoid the need for objects to be comparable? 
Our search tree sets have excellent performance, but could maybe be better? 

## Deriving Hash Tables

#### `ArrayOfListsSet`
Suppose we have a `LinkedListSet<Integer>`. Let's assume there is no specific order.
- Contains and add are obviously slow.
![[image-1.png]]

![[image-2.png]]


Below is a picture of our `ArrayOfListsSet` for M = 10.
![[image-3.png]]

#### `DynamicArrayOfListsSet`
Let's take the idea to extreme, and suppose we have as many lists as there are integers. ![[🐻 UC Berkeley/Fall 2025/Courses/CS 61B/Notes/attachments/image-4.png|290x338]]
- Every integer gets its own list! 
- Runtime is constant for all operations:
	- Contains: Check if that integer's list is empty.
	- Add: If the list is not empty, add the integer.

This approach would be wasteful. 
- In Java, the smallest integer is -2147483648 and the largest is 2147483648.
- Thus, we'd need an array of length slightly greater than 4 billion. 


We've observed a tradeoff between runtime and space usage: 
- For M = 10, we got a 10x speedup
- For M = # of integers, we get constant time operations.
What M should we pick? 
- We should start with an M that is small, and let M gets larger as N gets larger. (similar to resizing arrays)

[Hash Table Resizing](https://docs.google.com/presentation/d/1-xM1BMMNWMlSZ5NCFwhwe05M2Ut5DEIrf2iWM-2PAnE/edit?slide=id.g215a1ff9f04_2_166#slide=id.g215a1ff9f04_2_166)

If we have N items that are <u>evenly distributed</u>, length of each list is ~N/M
- N/M is **constant** asymptotically (limited to 1.5 in the demo)
- So operations are constant on average. 

Now we figured out how to efficiently deal with integers, let's take a look at other types. 
#### lowercase strings

> [! Question] Storing the Word `cat`
> Suppose we want to add ("cat") to our HashTable.
> 
> The key question:
> - What is the `cat` th element of a list? 
> - One idea: Use the order in the alphabet of the first letter as the list number.
> 	- `a` = 1, `b` = 2, `c` = 3, ..., `z` = 26
> 	- So `cat` would go in bucket 3.
> 
> What are some issues with this approach? 
> - You only ever use 26 buckets. You can keep adding them but this approach would never use bucket 27 through infinity. 
> - Can't store "293duvckd193"

One good approach:
Use all digits by multiplying each by a power of 26.
- `a` = 1, `b` = 2, ..., `z` = 26
- Thus the index of "cat" is $(3\times26^2) + (1 \times 26^1) + (20 \times 26^0) = 2074$ 

Why this specific pattern? 
- Let's review how numbers are represented in decimal.
![[image-5.png]]

As long as we pick a base $\ge$ 26, this algorithm is guaranteed to give each lowercase English word a unique number! 
- Using base 26, no words will get 2074 except "cat". 

We've now extended our `DynamicArrayOfLinkedLists` to handle strings.
- Data is converted by a **integerization function** into an integer representation.
- The **integer** is then **reduced** to a valid *index*, usually using the modulus operator, e.g. 2353248 % 10 = 8. 
![[image-6.png]]

Using only lowercase English characters is too restrictive.
- What if we want to store strings like "2pac" or "eGg!"?

**ASCII Characters**
![[image-7.png]]


Maximum possible value for english-only text including punctuation is **126**, so can use 126 as our base in order to ensure unique values for all possible strings.
![[image-8.png]]

**Implementing `asciiToInt`**
Below is a simple formula which converts a String to an integer.
- Treats String as a base 126 number.
```java
public static int asciiToInt(String s) {
	int intRep = 0;
	for (int i = 0; i < s.length(); i += 1) {
		intRep = intRep * 126;
		intRep = intRep + s.charAt(i);
	}
	return intRep;
}
```

However, we also use other languages and symbols.
![[image-9.png]]

The largest possible value for Chinese characters is **40,959**, so we'd need to use this as our base if we want to have a unique representation for all possible strings of Chinese characters.
![[image-10.png]]

##### Integer Overflow 
So far, we've tried to map any possible string to a unique integer.
- But in Java, there are only finitely many integers. 

That is, we tried to map **守门员** as a base 40959 number, yielding **39,312,024,869,368**, that doesn't exist in Java as an int. 

In Java, the largest possible integer is 2,147,483,647. 
- If you go over this limit, you overflow, starting back over at the smallest integer, which is -2,147,483,648.
- In other words, the next number after 2,147,483,647 is -2,147,483,648. 
![[image-11.png|352x197]]

Because Java has a maximum integer, we won't get the numbers we expect! 
![[image-12.png]]

#### Hash Codes
Because the range of our hashCode is finite, it is impossible to pursue unique factorizations for each String.

Instead of base 40,959 or something larger, **Java uses 31**.
![[image-13.png]]![[image-14.png]]

A `DynamicArrayOfLists` with a finite integerization function is called a **hash table**.
- Data is converted by a **hash function** into a finite integer representation called a **hash code**. Java hash codes must be in [-2,147,483,648, 2,147,483,647].
- The **hash code** is then **reduced** to a valid *index*, usually using the modulus operator, e.g. 2348762878 % 10 = 8.
![[image-16.png]]

Java's actual `hashCode` function for Strings below (code cleaned up slightly):
```java
public int hashCode(String s) {
	int intRep = 0;
	for (int i = 0; i < s.length(); i += 1) {
		intRep = intRep * 31;
		intRep = intRep + s.charAt(i);
	}
	return intRep;
}
```

> [! Question] Using a Negative HashCode
> Suppose that 💀's hash code is -1.
> Into which bucket is it more natural to place this item? Maybe the final index.
> 
> Unfortunately, -1 % 4 = -1. Will result in index errors! 
> Use `Math.floorMod` instead
> 
> ```java
> public class ModTest {
> 	public static void main(String[] args) {
> 		System.out.println(-1 % 4);
> 		System.out.println(Math.floorMod(-1, 4));
> 	}
> }
> ```

## `hashCode` and `equals`

## Mutable Keys
### Mutable vs. Immutable Types
An immutable data type is one for which an instance cannot change in any observable way after instantiation. 

Examples:
- Mutable: ArrayDeque, Percolation
- Immutable: Integer, String, Date

The `final` keyword will help the compiler ensure immutability. 
- final variable means you may assign a value once (either in constructor of class or in initializer), but after it can never change.
- Final is neither sufficient nor necessary for a class to be immutable. 

### Mutable Hash Table Keys
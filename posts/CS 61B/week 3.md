Last week, we implemented the *linked list*, `LList` [[🐻 UC Berkeley/Fall 2025/Courses/CS 61B/Notes/week 2#Sep 5|week 2]]
`LList` had fast runtime for removing the first element, but not last. 

So, we can add a class variable `.last` for `LList`, to keep track of the last node of the list. 
In that case, we can quickly perform `.addLast` , `.getLast`, and `.removeLast`!

But... is it really faster for all of them? 


---
#### `.last` Is Not Enough

![[Pasted image 20250908214127.png]]

`removeLast` requires two actions:
- Setting 9's next variable to null.
- Setting last equal to 9's memory location
	- Have to search through list to find for 9's node.

Keeping `.last` indeed makes `.addLast` and `.getLast` operations faster. However, it does NOT make `.removeLast` faster, because we can't update the `.last` variable easily.

After we remove the last node using `.last`, we should re-assign the variable to the new last node, which was the node before the previous `.last` node. Meanwhile, there is no way to traverse backwards from the `.last` node and retrieve the previous node easily, resulting in a traversal, which can't be a fast operation for a long list. 

Then, how can we make `removeLast` also fast? 

---
## Doubly Linked List

We can add **backwards links** from every node.
This yields a **doubly linked list** or `DLList`, as opposed to our earlier **singly linked list** or `SLList`.

![[Pasted image 20250908214845.png]]

In this case, sometimes, the `last` pointer will point at the same node with the `sentinel`. 
![[Pasted image 20250908215038.png]]
Then we would need to set up if statement for each case. Thus, there are two solutions to fix this problem.
1. Have two sentinels. (Use `sentFront` for front sentinel, and `sentBack` for end sentinel.)
   This makes the structure messy.
2. *Better Approach*: Have a single sentinel, which will point itself. (So the sentinel node is pointing at itself both `prev` and `next`.) 
   ![[Pasted image 20250908215828.png]]

### Generic Lists
![[Pasted image 20250908221027.png]]

One downside of Linked List is that `.get` method is inefficient when we are accessing to an element that is in a middle of the list. 
There are several approach to increase the efficiency. But for now, we'll just use `Array`!

---
## Array 

Python list uses **ArrayList**, resulting in a faster index approach, but slower when you `addFront`.

To store information, we need memory boxes, which we can get in Java by declaring variables or instantiating objects. Examples:
```java
int x; 
Walrus w1;
Walrus w2 = new Walrus(30, 5.6);
```
`int x;` gives us a memory box of 32 bits that stores ints.
`Walrus w1;` gives us a memory box of 64 bits that stores Walrus references.

**Arrays** are a special kind of object which consists of a **numbered** sequence of memory boxes.
- To get ith item of array A, use A[i].
<br>

Array consist of:
- A fixed integer **length** 
- A sequence of N memory boxes where N=length, such that:
	- All of the boxes hold the same type of value
	- The boxes are numbered 0 through length - 1

Retrieval from any position of an array is very fast. 
- Independent of array size.

```java
public class AList {
	public int[] items;
	public int size;
	
	public AList() {
		items = new int[100];
		size = 0;
	}
	
	public void addLast(int x) {
		items[size] = x;
		size += 1;
	}
	
	public int getLast() {
		return items[size - 1];
	}
	
	public int get(int i) {
		return items[i];
	}
	
	public int size() {
		return size;
	}
	
	public int removeLast() {
		int valueToReturn = getLast();
		// contents[size - 1] = 0; 
		size -= 1;
		return valueToReturn;
	}
}
```

Some current issues:
- Can't resize
- Slow insert at the beginning

---
## Testing

##### Q. How Does a Programmer Know That Their Code Works?
Programmers believe their code works because of *tests they write themselves*.

```java
public class TestSort {
	public static void main(String[] args) {
		String[] input = {"velociraptor", "uranium", "horse", "koshi"};
		String[] expected = {"horse", "koshi", "uranium", "velociraptor"};
	}
}
```

**Unit Test**: A software testing method by which individual units of source code ... are tested to determine whether they are fit for use. 

Unit testing frameworks do the hard work for us
- Ex: JUnit, AsserJ, and *Truth*

```java
import static com.google.common.truth.Truth.assertThat;
public class TestSort {

	@Test
	public void testSort() {
		String[] input = {"velociraptor", "uranium", "horse", "koshi"};
		String[] expected = {"horse", "koshi", "uranium", "velociraptor"};
		
		Sort.sort(input);
		assertThat(input).isEqualTo(expected);
	}
	
	public static void main(String[] args) {
		testSort();
	}
}
```

##### Reading Stack Traces
![[Pasted image 20250910205247.png]]

For some exceptions, including `NullPointerException`, Java will give you an explanation.

The first line in the stack trace is where the error occurred - in other words, it is the last method call that took place before the error, so you can use that to isolate where the bug is.

---
## Array List

We'll start from this Naive `AList`
![[Pasted image 20250912161249.png]]

##### Array Resizing
When the array gets too full, just make a new array:
- `int[] a = new int[size + 1];`
- Copy over the array items
- `a[size] = 11;`
- `itmes = a; size += 1;`


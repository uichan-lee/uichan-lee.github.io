
****
## Sep 1 
### Arrays (fixed-size)

Java arrays are *fixed-size*, so we can't add or remove elements. 
Also, they can only hold a single type. 

```java
int[] zeroedArray = new int[3];
int[] array = {4, 7, 10};
array[0] = 5;

System.out.println([0]);
System.out.println(Arrays.toString(array));
System.out.println(array.length);
```

---
### Foreach Loop / Enhanced For Loop

```java
int[] array = {1, 2, 3};
for (int i : array) {
	System.out.println(i);
}
```
* There must be type declaration of the iterating variable with `:`.
* Called Enhanced For Loop on certain other types such as `List`s and `Set`s.

---
### Lists (resizable)
```java
import java.util.List;
import java.util.ArrayList;

public class Lists{
	public static void main(String[] args){
		List<String> lst = new ArrayList<>();
		lst.add("zero");
		lst.add("one");
		lst.set(0, "zed");
		
		for (String elem : lst) {
			System.out.println(elem);
		}
	}
}
```

- Java `List` objects can only old one type.
- You should specify the generic type in the diamond operator `<>`
  You can leave the `<>` empty for the instantiation of the variable. 
- `List`s do not support slicing or negative indexing. 
- Due to a quirk with Java type system, if you want a list of *primitive objects*, you must use the corresponding Reference type for that primitive type.
	- `ArrayList<Integer>` instead of `ArrayList<int>`, or `ArrayList<Character>` instead of `ArrayList<char>`

---
### Sets

```java
import java.util.Set;
import java.util.HashSet;

public class Sets{
	public static void main(String[] args) {
		Set<Integer> s = new HashSet<>();
		
		s.add(1);
		s.add(2);
		s.add(3);
		s.remove(2);
		
		System.out.println("Set size:" + s.size());
		
		if (s.contains(1)) {
			System.out.println("1 in set");
		}
		
		for (int elem : s) {
			System.out.println(elem);
		}
	}
}
```

- Java has two types of `Set`s, ==TreeSet== and ==HashSet==. `Treeset`keeps its elements in "sorted" order, and is fast. In contrast, `HashSet` does not have a defined "order", but is (usually) really fast. 
- We will formalize these notions of "fast" later on in the course when we learn about asymptotic analysis. 
- A `Set` cannot contain duplicate items. If we try to add an item already in the set, nothing happens. 

---
### Dictionaries / Maps
```java
import java.util.Map;
import java.util.HashMap;

public class Maps{
	public static void main(String[] args) {
		Map<String, String> map = new HashMap<>();
		map.put("hello", "hi");
		map.put("hello", "goodbye");
		
		System.out.println(map.get("hello"));
		System.out.println(map.size());
		
		if (map.containsKey("hello")) {
			System.out.println("\"hello\" in map");
		}
		
		for (String key : map.keySet()) {
		System.out.println(key);
		}
	}
}
```

- Java has two types of `Map`s, ==TreeMap==, and ==HashMap==. Similarly to sets, `TreeMap` keeps its keys sorted and is fast; `HashMap` has no order and is (usually) very fast.
- A `Map` cannot contain duplicate keys. If we try to add a key already in the map, the value is overwritten.
- In the angle brackets, we have the "key type" first, followed by the "value type".
- `Map`s cannot directly be used with the `:` for loop. Typically we call `keySet` to iterate over a set of the keys, and use those to retrieve the values. One may also iterate over the `entrySet` to get both the keys and values. 

---
### Classes
```java
public class Point {
	public int x;
	public int y;
	public Point(int x, int y) {
		this.x = x;
		this.y = y;
	}
	public Point() {
		this(0, 0);
	}
	public double distanceTo(Point other) {
		return Math.sqrt(
			Math.pow(this.x - other.x , 2) + 
			Math.pow(this.y - other.y, 2)
		);
	}
	public void translate(int dx, int dy) {
		this.x += dx;
		this.y += dy;
	}
}
```

We can use this class as follow:

```java
public class PointDemo{
	public class void main(String[] args) {
		Point p1 = new Point(5, 9);
		Point p2 = new Point(-3, 3);
		
		System.out.println("Point 1: ( " + p1.x + ", " + p1.y + ")");
		System.out.println("Distance: " + p1.distanceTo(p2));
		
		p1.translate(2, 2);
		System.out.println("Point 1: ( " + p1.x + ", " + p1.y + ")");
	}
}

```

---
### Exceptions

Lastly, we look at how we can throw exceptions in Java compared to Python.

```python
# PYTHON

def minIndex(numbers):
	if len(numbers) == 0:
		raise Exception("There are no elements in the list!")
	
	m = numbers[0]
	idx = 0
	
	...
	
	return 0
```

```java
// JAVA
public static int minIndex(int[] numbers) throws Exception {
	if (numbers.length == 0) {
		throw new IllegalArgumentException("Thre are no elements in the array!");
	}
	int m = numbers[0];
	int idx = 0;
	
	...

	return 0;
}

```

---
## Sep 3

**Primitive Types, Reference Types, and Linked Data Structures**

##### Quiz
![[Pasted image 20250903161137.png]]
> Answer: Yes

Your computer stores information in "memory".
- Information is stored in memory as a sequence of ones and zeros.
	  Example: 72 stored as 01001000

Each Java type has a different way to interpret the bits:
- 8 primitive types in Java: byte, short, **int**, long, float, **double**, boolean, char

Everything else, including Arrays, is a **reference type**.

### Declaring a Variable (Simplified)

When you declare a variable of a certain type in Java: 
- Your computer sets aside exactly enough bits to hold a thing of that type.
- Java creates an internal table that maps each variable name to a location.
- Java does NOT write anything into the reserved boxes.
![[Pasted image 20250903161830.png]]

### The Golden Rule of Equals 

Given variables y and x:
- y = x **copies** all the bits from x into y.

### Class Instantiations

Can think of `new` as returning the address of the newly created object.

Just as the primitive types, the equals sign copies the bits.

```java
Walrus a;
a = new Walrus(1000, 8.3);
Walrus b;
b = a; 
```

(Pass by value)
![[Pasted image 20250903163813.png]]

same thing goes for Arrays.
`int[] a;` will NOT instantiate the array.
It will just create a 64 bit box for storing an integer array address.


---
## Sep 5

We can improve our implementation of `IntList` from last lecture

```java
# Naked Linked List
public class IntList {
	public int first;
	public IntList rest;
	
	public IntList(int f, IntList r) {
		first = f;
		rest = r;
	}
	
	/** 
	This is an inefficient and unnatural implementation
	*/
	public void addFirst(int x) {
		rest = new IntList(first, rest);
		first = x;
	}
}
```

Naked linked list functions properly, but users need to know references very well, and be able to think recursively. 

```java
public class IntNode {
	public int item;
	public IntNode next;
	
	public IntNode(int i, IntNode n) {
		item = i;
		next = n;
	}
}
```

This is just changing the Class and instance names. 
<br>
##### Private

Use the `private` keyword to prevent code in <u>other classes</u> from using members (or constructors) of a class. 

**Why Restrict Access?**
> Hide implementation details from users of your class

- Less for user of class to understand.
- Safe for you to change private methods (implementation).
<br>

##### Nested Class (static)

We can combine two classes into one file pretty simply. 

**Why Nested Classes?**

> It's useful when a class doesn't stand on its own and is obviously subordinate to another class. 

If the nested class NEVER uses any instance variables or methods of the outer class, declare it `static`. 

- Static classes cannot access outer class's instance variables or methods. 
- Results in a minor savings of memory

In our case, we can declare `IntNode` inner class static, since it never uses any of SLList's instance variables or methods. 

```java
public class SLList {

	// Why is it static?	
	private static class IntNode {
		int item;
		IntNode next;
		
		IntNode (int i, IntNode n) {
			item = i;
			next = n;
		}
	}
	
	// Change public → private
	private IntNode first;
	
	public SLList(int x) {
		first = new IntNode(x, null);
	}
	
	/** Adds x to the front of the list. */
	public void addFirst(int x) {
		first = new IntNode(x, first);
	}
	
	/** Returns the first item in the list. */
	public int getFirst() {
		return first.item;
	}
	
	public static void main(String[] args) {
		SLList L = new SLList(15);
		L.addFirst(10);
		L.addFirst(5);
		// L = [5, 10, 15]
		
		System.out.println(L.getFirst());
	}
}
```
<br>

To motivate our remaining improvements, and to give more functionality to our `SLList` class, let's add:
- .addLast(int x)
- .size()

```java
public class SLList {

	// Why is it static?	
	private static class IntNode {
		int item;
		IntNode next;
		
		IntNode (int i, IntNode n) {
			item = i;
			next = n;
		}
	}
	
	// Change public → private
	private IntNode first;
	
	public SLList(int x) {
		first = new IntNode(x, null);
	}
	
	/** Adds x to the front of the list. */
	public void addFirst(int x) {
		first = new IntNode(x, first);
	}
	
	/** Adds an item to the end of the list. **/
	public void addLast(int x) {
		IntNode p = first;
		
		/** Move p until it reaches the end **/
		while (p.next != null) {
			p = p.next;
		}
		
		p.next = new IntNode(x, null);
	}
	
	/** Returns the first item in the list. */
	public int getFirst() {
		return first.item;
	}
	
	// Writing a recursive size method is tricky, because SLList itself is not recursive.
	// We write a private static helper method.
	
	/** Returns the size of the lists that starts at IntNode p. */
	private static int size(IntNode p) {
		if (p.next == null) {
		return 1;
		}
		return 1 + size(p.next);
	}
	
	public int size() {
		return size(first);
	}
	
	
	public static void main(String[] args) {
		SLList L = new SLList(15);
		L.addFirst(10);
		L.addFirst(5);
		// L = [5, 10, 15]
		
		System.out.println(L.getFirst());
	}
}
```


We can improve the efficiency (execution time to be fast) of `size()`  method by adding another private variable. 

```java
public class SLList {

	// Why is it static?	
	private static class IntNode {
		int item;
		IntNode next;
		
		IntNode (int i, IntNode n) {
			item = i;
			next = n;
		}
	}
	
	private IntNode first;
	// ADDED: keep track of the current size. 
	private int size; 
	
	public SLList(int x) {
		first = new IntNode(x, null);
		size = 1;
	}
	
	// Additional constructor for no argument
	public SLList() {
		first = null;
		size = 0;
	}
	
	/** Adds x to the front of the list. */
	public void addFirst(int x) {
		first = new IntNode(x, first);
		size++;
	}
	
	/** Adds an item to the end of the list. **/
	public void addLast(int x) {
		IntNode p = first;
		
		/** Move p until it reaches the end **/
		while (p.next != null) {
			p = p.next;
		}
		
		p.next = new IntNode(x, null);
		size++;
	}
	
	/** Returns the first item in the list. */
	public int getFirst() {
		return first.item;
	}
	
	/** Returns the size of the lists that starts at IntNode p. */
	public int size() {
		return size;
	}
	
	
	public static void main(String[] args) {
		SLList L = new SLList(15);
		L.addFirst(10);
		L.addFirst(5);
		// L = [5, 10, 15]
		
		System.out.println(L.getFirst());
	}
}
```
<br>

There is one bug in the implementation of `SLLIst` `.addLast(int x)` function.
```java
public class SLList {

	// Why is it static?	
	private static class IntNode {
		int item;
		IntNode next;
		
		IntNode (int i, IntNode n) {
			item = i;
			next = n;
		}
	}
	
	private IntNode first;
	// ADDED: keep track of the current size. 
	private int size; 
	
	public SLList(int x) {
		first = new IntNode(x, null);
		size = 1;
	}
	
	// Additional constructor for no argument
	public SLList() {
		first = null;
		size = 0;
	}
	
	/** Adds x to the front of the list. */
	public void addFirst(int x) {
		first = new IntNode(x, first);
		size++;
	}
	
	/** Adds an item to the end of the list. **/
	public void addLast(int x) {
		IntNode p = first;
		
		/** Move p until it reaches the end **/
		while (p.next != null) {
			p = p.next;
		}
		
		p.next = new IntNode(x, null);
		size++;
	}
	
	/** Returns the first item in the list. */
	public int getFirst() {
		return first.item;
	}
	
	/** Returns the size of the lists that starts at IntNode p. */
	public int size() {
		return size;
	}
	
	
	public static void main(String[] args) {
		// Create an empty SLList.
		SLList L = new SLList();
		
		L.addLast(10); 
		// ERROR: Cannot read field "next" because "<local2>" is null
	}
}
```

The error occurs because the empty `SLList` has `null` for its `first` variable, we assign `p = first = null`, resulting in `p.next = null.next` generating an error. 

First way to fix this is by adding special case when its an empty list. 
```java
public void addLast(int x) {
	size += 1;
	
	if (first == null) {
		first = new IntNode(x, null);
		return;
	}
	
	IntNode p = first;
	while (p.next != null) {
		p = p.next;
	}
	
	p.next = new IntNode(x, null);
}
```

This code function fine, but it is not 'simple'.

We can improve this implementation by introducing a special `IntNode` called a `Sentinel Node`.

```java
public class SLList {

	// Why is it static?	
	private static class IntNode {
		int item;
		IntNode next;
		
		IntNode (int i, IntNode n) {
			item = i;
			next = n;
		}
	}
	
	// RENAME: first → sentinel
	private IntNode sentinel;
	private int size; 
	
	public SLList(int x) {
		/** The single-element list is no longer just one node. It's two nodes:
		the sentinel node followed by the node with the single value.
		*/
		sentinel = new IntNode(63, null);
		sentinel.next = new IntNode(x, null);
		size = 1;
	}
	
	public SLList() {
		sentinel = new IntNode(63, null);
		size = 0;
	}
	
	/** Adds x to the front of the list. */
	public void addFirst(int x) {
		sentinel.next = new IntNode(x, sentinel.next);
		size++;
	}
	
	/** 
	Adds an item to the end of the list. 
	Sentinel always exists, so there's no bug anymore.
	*/
	public void addLast(int x) {
		IntNode p = sentinel;
		
		/** Move p until it reaches the end **/
		while (p.next != null) {
			p = p.next;
		}
		
		p.next = new IntNode(x, null);
		size += 1;
	}
	
	/** Returns the first item in the list. */
	public int getFirst() {
		return sentinel.next.item;
	}
	
	/** Returns the size of the lists that starts at IntNode p. */
	public int size() {
		return size;
	}
	
	
	public static void main(String[] args) {
		// Create an empty SLList.
		SLList L = new SLList();
		
		L.addLast(10); 
	}
}
```
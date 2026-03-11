
### Method Overloading in Java
Java allows multiple methods with same name, but different parameters. 
- This is called method **overloading**. 

```java
public static String longerst(AList<String> list) {
	...
}

public static String longest(SLList<String> list) {
	...
}
```

**The Downsides**
While overloading works, it's a bad idea in the case of `longest`. Why?
- Code is virtually identical, aesthetically gross.
- Won't work for future lists. If we create a `QList` class, have to make a third method.
- Harder to *maintain*
	- Example: Suppose you find a bug in one of the methods. You fix it in the `SLList` version, and forget to do it in the `AList` version.

**Hypernym and Hyponym**
In natural languages, we have a concept known as a **"hypernym"** to deal with this problem.
- Dog is a "hypernym" of poodle, malamute, yorkie, etc.

We use the word **hyponym** for the opposite type of relationship.
- "dog": Hypernym of "poodle", "malamute", "dachshund", etc.
- "poodle": Hyponym of "dog"

Hypernyms and hyponyms comprise a hierarchy.
![[Pasted image 20250915230656.png]]

`SLList`s and `AList`s are both clearly some kind of "list"
- List is a hypernym of SLList and AList

Expressing this in Java is a two-step process:
- Step 1: Define a reference type for our hypernym (`List61B.java`)
- Step 2: Specify that `SLList`s and `AList`s are hyponyms of that type.
![[Pasted image 20250915231116.png]]


We'll use the new keyword **interface** instead of **class** to define a `List61B`.
- Idea: Interface is a specification of what a List is able to do, not how to do it. 

```java
public interface List61B<Item> {
	public void addFirst(Item x);
	public void addLast(Item y);
	public Item getFirst();
	public Item getLast();
	public Item removeLast();
	public Item get(int i);
	public void insert(Item x, int position);
	public int size();
}
```

We'll now:
- Use the new **implements** keyword to tell the Java compiler that `SLList` and `AList` are hyponyms of List61B.

```java
public class AList<Item> implements List61B<Item> {
	...
	public void addLast(Item x) {
		...
	}
}
```

We can now adjust our `longest` method to work on either kind of list:
```java
public static String longest(List61B<String> list) {  // Changed to List61B
	...
}
```

If a "subclass" has a method with the exact same signature as in the "superclass", we say the subclass **overrides** the method.
![[Pasted image 20250915232137.png]]

In 61B, we'll always mark every overriding method with the `@Override` annotation. 
- Example: Mark `AList.java`'s overriding methods with `@Override`
- The only effect of this tag is that the code won't compile if it's not actually an overriding method. 

```java
public class AList<Item> implements List61B<Item> {
	...
	
	@Override
	public void addLast(Item x) {
		...
	}
}
```


Interface inheritance:
- Subclass inherits signatures, but NOT implementation.

For better or worse, Java also allows <u>implementation inheritance</u>.
- Subclasses can inherit signatures AND implementation.

Use the **default** keyword to specify a method that subclasses should inherit from an **interface**. 
- Example: Let's add a default `print()` method to `List61B.java`

```java
public interface List61B<Item> {
	public void addFirst(Item x);
	public void addLast(Item y);
	public Item getFirst();
	public Item getLast();
	public Item removeLast();
	public Item get(int i);
	public void insert(Item x, int position);
	public int size();
	
	default public void print() {
		for (int i = 0; i < size(); i += 1) {
			System.out.print(get(i) + " ");
		}
	}
}
```

However, this `default` implementation is inefficient for `SLList`! (Efficient for `AList` though)

Then, we would want to override default methods. 
```java
/** Inside SLList.java */
@Override
public void print() {
	Node p = sentinel.next;
	while (p != null) {
		System.out.print(p.item + " ");
		p = p.next;
	}
}
```

---
### ArraySet 

![[Pasted image 20250917161541.png|450]]

### The Enhanced For Loop (Iterator / Iterable)
```java
Set<Integer> javaset = new HashSet<>();
javaset.add(5);
javaset.add(23);
javaset.add(42);
for (int i : javaset) {
    System.out.println(i);
}
```

The enhanced for loop works by first calling the `.iterator` method of the object
- This returns an object of type `Iterator<Integer>`
- Iterator interface has its own API for fetching values one-by-one:
	- hasNext: Tells us whether there are more values.
	- next: gets the next value.

![[Pasted image 20250917162101.png|575]]


```java
public class ArraySet<T> implements Iterable<T>{
	private T[] items;
	private int size;
	
	...

	private class WizardIterator implements Iterator<Integer>{
		public WizardIterator() {
			wizPos = 0;
		}
		
		@Override
		public boolean hasNext() {
			return wizPos < size();
		}
		
		@Override
		public T next() {
			T thingToReturn = items[wizPos];
			wizPos += 1;
			return thingtoReturn;
		}
	}

	// we need to treutnr some sort of object that has a 
	// hasNext function and a next function
	public Iterator<Integer> iterator() {

	return new WizardIterator();
	}
	
	...	
}

```
![[Pasted image 20250917164017.png|575]]

### Object Methods

`.equals()`

**String toString()**
The `toString()` method provides a string representation of an object.


---
### Comparable/Comparator

**Polymorphism**: "the ability in programming to present the same programming interface for differing underlying forms"

![[Pasted image 20250919162316.png|475]]



This results in error below
- The issue is that `max` doesn't know how to compare two `Dog` objects.
![[Pasted image 20250919162330.png]]

This is the code of the `interface`, `Comparable<T>`
![[Pasted image 20250919162359.png]]

Let's implement the `Comparable` interface in `Dog.java`.
This means:
- Adding "`implements Comparable<Dog>`" to the top of the file.
- Overriding the `compareTo` method
![[Pasted image 20250919162725.png|475]]

```java
public class Dog implemenets Comparable<Dog> {
	...
	@Override
	public int comapreTo(Dog uddaDog) {
		return size - udaaDog.size;
	}
}
```

##### Comparator
We can create custom comparator, that can compare two objects in different logic. 
```java
// same as Dog object
public class DogComparator implements Comparator<Dog> {
	@Override
	public int compare(Dog firstDog, Dog secondDog) {
		return firstDog.size - secondDog.size;
	}
}

// Longer name means bigger 
public class DogNameComparator implements Comparator<Dog> {
	@Override
	public int compare(Dog firstDog, Dog secondDog) {
		return (firstDog.name).length() - (secondDog.name).length();
	}
}
```

##### Using Comparator
```java
DogNameComparator nameComparator = new DogNameComparator();
Collections.sort(dogList, nameComparator);
```

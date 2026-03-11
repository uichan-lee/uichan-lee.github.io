---

---
- Java is a *statically typed language*, meaning that every variable has a type that is known at compile time (you must specify it).
---
**Java main function structure (in Main.java)**
```java
public class Main{
	public static void main(String[] args) {
		System.out.println("Hello World!");
		// ...
	}
}
```
---
**Assignment Git Process**
[Git Guide](https://fa25.datastructur.es/resources/using-git/)
![[Pasted image 20250901143452.png]]

---
**Java Workflow**
![[Pasted image 20250901143532.png]]

---
### Object Instantiation
![[Pasted image 20250901144009.png]]
Classes contain not just functions (a.k.a. methods), but also data.
- For example, we might add a _size_ variable to each Dog.
- Classes can be instantiated as objects. 
* Cannot add new instance variable to an object. 
* They must all obey the blueprint exactly.


### Array of Objects
![[Pasted image 20250901144121.png]]


---
### Static vs. Non-Static

Key differences between static and non-static (a.k.a. instance) methods:
- Static methods are invoked using the class name, e.g. Dog.makeNoise( );
- Instance methods are invoked using an instance name, e.g. maya.makeNoise( );
- Static methods can’t access “my” instance variables, because there is no “me”.

---
### **Lists**

There are multiple types of Lists. 
Most common type of List is **ArrayList**, but **LinekdList** is also used sometimes. 

In Python, there is no distinction between abstract idea of a list and an actual list.
In Java, there are many types of lists, so programmer has to decide which one when instantiating. 

List = “Abstract Data Type” 
ArrayList, LinkedList, etc = “Concrete Implementation”  

Need to import `java.util.ArrayList` and `java.util.List`
![[Pasted image 20250901144621.png]]

---

### **Maps**

In programming languages, a map is a collection of key-value pairs. Each key is guaranteed to be unique. 

Also called: 
- Dictionary (in Python)
- Associative Array (in theoretical computer science)
- Symbol Table (in Princeton) 

Ex) `{“alpha” : “first letter”, “beta” : “second letter”}`
![[Pasted image 20250901144933.png]]

---
### Arrays (fixed-size)

![[Pasted image 20250901144630.png]]

Java has a special collection called “Array”

- Size that must be declared at the time the array is created.
- Size cannot change.
- All items must be of the same type.
- No methods.
- Syntax for accessing array entries is similar to Python, e.g. x[0];

Why do Java has both lists and arrays? 

- Arrays are more performant:
	- Reading and writing from them is faster.
	- Use less memory.

Java favors arrays over lists because Java is a language built for **performance**

---

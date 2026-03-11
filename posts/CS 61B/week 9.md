# Spanning Trees
Given an **undirected** graph, a **spanning tree** T is a subgraph of G, where T:
![[Pasted image 20251022145513.png]]

A **minimum spanning tree** is a spanning tree of minimum total weight.
- Example: Network of power lines that connect a bunch of buildings. 
![[Pasted image 20251022151045.png]]


> [!Question] MST vs. SPT
> ![[Pasted image 20251022151001.png]]
> 
> Answer: **B**
> ![[Pasted image 20251022151019.png]]

A shortest path tree depends on the start vertex. 
There is no source for a MST. 
Nonetheless, the MST sometimes happens happens to be an SPT for a specific vertex. 

#### Cut Property
![[Pasted image 20251022151753.png]]

![[Pasted image 20251022151811.png]]

### Prim's Algorithm
Insert all vertices into fringe `PQ`, storing vertices in order of distance <u>from tree</u>.
Repeat: Remove (closest) vertex `v` from `PQ`, and relax all edges pointing from `v`. 
###### Few Steps
![[Pasted image 20251022155540.png]]
![[Pasted image 20251022155551.png]]
![[Pasted image 20251022155627.png]]

End result:
![[Pasted image 20251022155649.png]]

#### Prim's Algorithm Runtime
Priority Queue operation count, assuming binary heap based `PQ`:
- Insertion: V, each costing O(log V) time.
- Delete-min: V, each costing O(log V) time.
- Decrease priority: O(E), each costing O(log V) time.
	- Operation not discussed in lecture. 

Overall runtime: $O(V*log(V) + V*log(V) + E*log(V))$
Assuming E > V, this is just O(E log V) (Same as Dijkstra's)
![[Pasted image 20251022160427.png]]

### Kruskal's Algorithm
Initially mark all edges gray
- Consider edges in increasing order of weight.
- Add edge to MST (mark black) unless doing so creates a cycle.
- Repeat until V-1 edges.

##### Few Steps
![[Pasted image 20251022164749.png]]
![[Pasted image 20251022164829.png]]
![[Pasted image 20251022164845.png]]

...

![[Pasted image 20251022165128.png]]
- Don't add `D-E: 3` because they forms a cycle. 

...

![[Pasted image 20251022165237.png]]


# Directed Acyclic Graphs

## Topological Sorting

What algorithm do we use to find a valid ordering for the vertices? 
> DFS Postorder


![[Pasted image 20251024162226.png]]
![[Pasted image 20251024162233.png]]

- Record DFS postorder in a list: [H, E, B, D, A, G, F, C]
- Topological ordering is given by the reverse order of that list (reverse postorder):
	- [C, F, G, A, D, B, E, H]

![[Pasted image 20251024162646.png]]
The reason it's called **topological sort**: Can think of this process as sorting our nodes so they appear in an order consistent with edges, e.g. [C, F, G, A, D, B, E, H]

> [!Important] Depth First Search
> Be aware, that when people say "Depth First Search", they sometimes mean with restarts, and they sometimes mean without.
> 
> For example, when we did DepthFirstPaths for reachability, we did not restart.
> For Topological Sort, we restarted from every vertex with indegree 0.

A topological sort only exists if the graph is a <u>directed acyclic graph (DAG)</u>.
- For the graph below, there is NO possible ordering where all arrows are respected.
![[Pasted image 20251024163026.png|400]]

DAGs appear in many real world applications, and there are many graph algorithms that only work on DAGs.



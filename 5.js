// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Reorganized Code
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//

// note carefully close-to-final source file organization

var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// graph caller function - sort of main() for caller page
// called directly, or on load success event of some input file
// global scope, only function allowed to access global vars

function main_graph()   
{
    // create a graph (default undirected)
    // note g no longer a global var
    var g = new Graph();
    
    // set graph properties - set a suitable label
    g.label = "Figure 3.10 (Levitin, 3rd edition)";
    g.digraph = false;
    g.read_graph(_v,_e);
    g.print_graph();
    g.DFS();
    g.BFS();
    document.write("<p>",g.dfs_push,"</p>");
    document.write("<p>",g.dfs_pop,"</p>");  
    document.write("<p>",g.bfs_out,"</p>");

    
    
   
}

    
// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can have label, example: a, v1, jeddah
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited (useful for traversals)
    this.adjacent = new List();    // head pointer of adjacency linked list
    this.adjacentByID = adjacentByID;
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = [];                // vertex list: array of Vertex objects
	this.nv;                       // number of vertices
	this.ne;                       // number of edges
	this.digraph = false;          // true if digraph, false otherwise (default undirected)
	this.dfs_push = [];            // DFS traversal order output array
    this.bfs_out = [];             // BFS traversal order output array
    this.dfs_pop = [];
	
	// --------------------
	// student property fields next
	
	this.label;                // (fill) identification string to label graph
	
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;  // default input reader method   
	
	this.add_edge = add_edge;
	this.print_graph = better_output;    // (replace) better printer function
	this.list_vert = list_vert;
	this.DFS = DFS;                  // perform depth-first search  
	this.dfs = dfs;                  // DFS a connected component
	this.BFS = BFS;                  // perform a breadth-first search  
	this.bfs = bfs;                  // BFS a connected component

	
	// --------------------
	// student methods next; actual functions in student code section at end
	
	
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to other functions but use object member fields and methods depending
// on which object is passed by method call through "this"
//

// --------------------
function list_vert()
{
	var i, v;                     // local vars
	for (i=0; i < this.nv; i++)
	{
		v = this.vert[i];
		document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit, 
			" - ADJACENCY: ", v.adjacentByID(), "<br>" );
	}
}

// --------------------
function add_edge(u_i, v_i)
{
    var u = this.vert[u_i],
        v = this.vert[v_i];

    u.adjacent.insert(v_i);

    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}

// --------------------
function better_input(v, e) // default graph input method
{
    this.nv = v.length;
    this.ne = e.length;

    var i;
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    for (i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v);
    }

    if (!this.digraph)
    {
        this.ne = this.ne * 2;
    }
}

// --------------------
function DFS()
{
    var i, v = this.vert;
    for (i = 0; i < this.nv; i++)
    {
        v[i].visit = false;
    }

    for (i = 0; i < this.nv; i++)
    {
        if (!v[i].visit)
        {
            this.dfs(i);
        }
    }
}

// --------------------
function dfs(v_i)
{
    var v = this.vert[v_i];
    this.dfs_push[this.dfs_push.length] = v_i;
    v.visit = true;

    var w = v.adjacentByID(),
        m = w.length;
    var i;
    for (i = 0; i <= m; i++)
    {
        if (i == m)
        {
            this.dfs_pop[this.dfs_pop.length] = v_i;
        }
        else if (!this.vert[w[i]].visit)
        {
            this.dfs(w[i]);
        }
    }
}

// --------------------
function BFS()
{
    // mark all vertices unvisited
    var i, v = this.vert;
    for (i = 0; i < this.nv; i++)
    {
        v[i].visit = false;
    }

    // traverse unvisited connected components
    for (i = 0; i < this.nv; i++)
    {
        if (v[i].visit == false)
        {
            this.bfs(i);
        }

    }
}

// --------------------
function bfs(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];

    // process v 
    v.visit = true;
    this.bfs_out[this.bfs_out.length] = v_i;

    // initialize queue with v
    var queue = new Queue();
    queue.enqueue(v);

    var u, m, w, i;
    // while queue not empty
    while (!queue.isEmpty())
    {
        // dequeue and process a vertex, u
        u = queue.dequeue();

        // queue all unvisited vertices adjacent to u
        w = u.adjacentByID(), m = w.length;
        for (i = 0; i < m; i++)
        {
            if (!this.vert[w[i]].visit)
            {
                this.vert[w[i]].visit = true;
                queue.enqueue(this.vert[w[i]]);
                this.bfs_out[this.bfs_out.length] = w[i];
            }
        }
    }
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function better_output()
{
    document.write("<p>", "GRAPH {", this.label, "} ", this.digraph ? "DIERCTED - " : "UNDIRECTED - ",
        this.nv, " VERTICES, ", this.ne, " EDGES: ", "</p>");
    this.list_vert();
}

function adjacentByID()
{
    return this.adjacent.traverse();
}

// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First DFS Traversal
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


// graph from Figure 3.10 (Levitan, 3rd edition)
// read vertex info into corresponding *user* fields of Vertex() object  
// property fields can be listed in any order
// note coding convention for global vars

var _v = [ 
	{label:"a"}, 
	{label:"b"}, 
	{label:"c"},
	{label:"d"},
	{label:"e"},
	{label:"f"},
	{label:"g"},
	{label:"h"},
	{label:"i"},
	{label:"j"}
		
	];
	
var _e = [
	{u:0, v:3},
	{u:0, v:2},
	{u:3, v:2},
	{u:2, v:5},
	{u:5, v:4},
	{u:5, v:1},
	{u:1, v:4},
	{u:0, v:4},
	{u:6, v:7},
	{u:7, v:8},
	{u:8, v:9},
	{u:9, v:6}
	
	];


// create a graph (default undirected)
var _g = new Graph();

// if _g is directed (digraph) change property BEFORE input
// _g.digraph = true;

// use global input arrays _v and _e to initialize internal data structures
_g.read_graph(_v,_e);

// perform a depth-first search and store result
_g.DFS();

// copy output code to your caller page
//document.write("<p>",_g.dfs_push,"</p>");
//document.write("<p>",_g.dfs_pop,"</p>");
// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can be labelled
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited (useful for traversals)
	this.adjacent = new List();    // init an adjacency list
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
    this.dfs_pop = [];            
	
	// --------------------
	// student property fields next
	
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;  // default input reader method   
	
	this.add_edge = add_edge;
	this.print_graph = list_vert;
	
	// --------------------
	// student methods next; actual functions in student code section at end
    
    this.DFS =  DFS ;                    // perform depth-first search
	this.dfs =  dfs;                     // DFS a connected component            
	                                 
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to normal functions but use object member fields and methods
// depending on which object is passed by method call through "this"
//

// --------------------
function list_vert()
{
	var i, v;
	for (i=0; i < this.nv; i++)
	{
		v = this.vert[i];
		document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit, 
			" - ADJACENCY: ", v.adjacent.traverse(), "<br>" );
	}
}

// --------------------
function add_edge(u_i, v_i)
{
    var u = this.vert[u_i],
        v = this.vert[v_i];

    u.adjacent.insert(v_i);

    if (!(this.digraph))
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

    if (!(this.digraph))
    {
        this.ne = this.ne * 2;
    }
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function DFS()
{

    // mark all vertices unvisited
    var i;
    var v;
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        v.visit = false;
    }

    // traverse unvisited connected components
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        if (!(v.visit))
        {
            this.dfs(i);
        }
        v.visit = false;
    }




}

// --------------------
function dfs(v_i)
{

    // get by id then process vertex
    var v = this.vert[v_i];
    this.dfs_push[this.dfs_push.length] = v_i;
    v.visit = true;
    // recursively traverse unvisited adjacent vertices
    var w = v.adjacent.traverse(),
        m = w.length;
    var i;
    for (i = 0; i <= m; i++)
    {
        if (i == m)
        {
            this.dfs_pop[this.dfs_pop.length] = v_i;
        }
        else if (!(this.vert[w[i]].visit))
        {
            this.dfs(w[i]);
        }


    }


}
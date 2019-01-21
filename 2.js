// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Implementation
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


// graph from Figure 3.10 (Levitan, 3rd edition)
// read input info for each vertex into corresponding user fields of Vertex() object  
// for now we only have one *user* property field: label, rest are internal
// property fields can be listed in any order

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

// if g is directed (digraph) change property BEFORE input
// _g.digraph = true;

// use global input arrays _v and _e to initialize its internal data structures
_g.read_graph(_v,_e);


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can be labelled
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited (useful for traversals)
	this.adjacent =  new List();   // (fill code) init an adjacency list
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = [];                // vertex list: array of Vertex objects
	this.nv;                       // number of vertices
	this.ne;                       // (fill code) number of edges
	this.digraph = false;          // (fill code) true if digraph, false otherwise (default undirected)
		
	
	// --------------------
	// member methods use functions defined below
	
	this.read_graph = better_input;  // new default input reader method   
	
	this.add_edge = add_edge        // (fill code) specify function to implement this interface method
	this.print_graph = list_vert;
	
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
			" - ADJACENCY: ", v.adjacent.traverse(), "<br>" );   // note change (linked list call)
	}
}

// --------------------
function add_edge(u_i, v_i) // pass vert id
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
    var u = this.vert[u_i];
    var v = this.vert[v_i];

    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    u.adjacent.insert(v_i);

    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (this.digraph == false)
        v.adjacent.insert(u_i);

}

// --------------------
// default graph input method (args v,e are local to func, to be passed as parameters on call)
// i.e., don't use the globals inside
function better_input(v, e)
{

    // set vertex and edge count fields
    this.nv = v.length;
    this.ne = e.length;

    // input vertices into internal vertex array
    var i;
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }


    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge() 
    for (i = 0; i < this.ne; i++)
    {
        this.add_edge(e[i].u, e[i].v);
    }


    // double edge count if graph undirected 
    if (this.digraph == false)
        this.ne = this.ne * 2;

}


// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Graph Object
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// start the vertex part of a simple graph object (no edges yet)
//


// use this simple array of objects to input vertices into 
// corresponding user input fields (see Vertex object below)
var _v = [{
    label: "Router 1"
}, {
    label: "Router 2"
}, {
    label: "Router 3"
}];

// replace label init value with strings of your choice
// be creative (don't do "a", "b"..., or "1", "2" etc.)


// create a graph
var _g = new Graph();

// input graph into internal data structures
_g.read_graph(_v);


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v) {
    // user input fields

    this.label = v.label; // vertex can have label, example: a, v1, jeddah

    // more fields to initialize internally

    this.adjacent = null; // reference/pointer to adjacency linked list
    this.visit = false; // (fill code) vertex can be marked visited (useful for traversals)
}

// -----------------------------------------------------------------------
// Graph object constructor

function Graph() {
    this.vert = []; // vertex list: array of Vertex objects
    this.nv; // number of vertices


    // --------------------
    // member methods use functions defined below

    this.read_graph = graph_input; // default input reader method   
    this.print_graph = list_vert;

}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to normal functions but use object member fields and methods
// depending on which object is passed by method call through "this"
//

// --------------------
function list_vert() // simple vertex lister  
{
    var i, v; // local vars
    for (i = 0; i < this.nv; i++) {
        v = this.vert[i];
        document.write("VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
            " - ADJACENCY: ", v.adjacent, "<br>");
    }
}

// --------------------
function graph_input(v) {
    // (fill code below) set number of vertices field
    this.nv = v.length;


    // (fill code below) input vertices into internal vertex array
    for (var i = 0; i < this.nv; i++) {
        this.vert[i] = new Vertex(v[i]);
    }



}
// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Object
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// graph caller function--- sort of main() for caller page
// called directly, or on load success event of some input file
// global scope, only function allowed to access global vars

function main_graph()   
{
    // create a graph (default undirected)
    g = new Graph();
    
    // set graph properties
	g.label = "Figure 3.10 (Levitin, 3rd edition)";
    //g.digraph = true;
    
    // use global input arrays _v and _e to initialize its internal data structures
    g.readGraph(_v,_e);
    
    // use print_graph() method to check graph
     g.printGraph();

    // report connectivity status if available
    //g.IsConnected();

	// perform depth-first search and output stored result
    g.topoSearch(g.dfs);
    document.write("<p>","dfs_push: ",g.dfs_push,"</p>");
    document.write("<p>","dfs_pop: ",g.dfs_pop,"</p>");
    
    // report connectivity status if available
    g.componentInfo();
    
    // perform breadth-first search and output stored result
    g.topoSearch(g.bfs); 
    document.write("<p>","bfs_order: ",g.bfs_order,"</p>");

    // output the graph adjacency matrix
    g.makeAdjMatrix();
    document.write("<p>","frist row matrix: ",g.adjMatrix[0],"</p>"); 
    document.write("<p>","last row matrix: ",g.adjMatrix[g.nv-1],"</p>");
   

    
}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
	// user input fields
	
	this.label = v.label;          // vertex can be labelled
	
	// more fields to initialize internally
	
	this.visit = false;            // vertex can be marked visited or "seen"
    this.adjacent = new List();    // init an adjacency list
	
	// --------------------
    // member methods use functions defined below
    this.adjacentByID = adjacentByIdImpl;           //Get id of adjacent vertices in an array
    this.incidentEdge = incidentEdgeImpl;           // Get information about edges incident to vertex.
    this.vertexInfo = vertexInfoImpl;               //Insert a new edge node in the adjacency list of vertex.
    this.insertAdjacent = insertAdjacentImpl;      // Get vertex details in a printable string
		
}

// -----------------------------------------------------------------------
// Edge object constructor
function Edge(target_v,weight)
{
	this.target_v = target_v ;                                    // Id of edge target vertex
    this.weight =! (weight === undefined) ? weight : null ;       // Edge weight or cost ( optional )
    this.edgelabel = null;                                        // Edge can be labelled
}


// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
	this.vert = [];                // vertex list: array of Vertex objects
	this.nv = 0;                   // number of vertices
	this.ne = 0;                   // number of edges
    this.digraph = false;          // true if digraph, false otherwise (default undirected)
    this.weighted = false;         // true if the graph is weighted, false otherwise
	this.dfs_push = [];            // DFS order output
    this.bfs_order = [];           // BFS order output
    this.dfs_pop = [];             // DFS pop order output
    this.label = "";               // identification string to label graph
    
	
	// --------------------
	// student property fields next
	
	this.connectedComp = 0;          // number of connected comps set by DFS; 0 (default) for no info
	this.adjMatrix = [];             // graph adjacency matrix to be created on demand
    
	
	
	// --------------------
	// member methods use functions defined below
	
    this.readGraph = better_input;        // default input reader method  
    this.addEdge = addEdgeImpl2;          //Insert an edge
	this.printGraph = printGraphImpl;     // better printer function
	this.list_vert = "";
	this.dfs = dfsImpl;                   // DFS a connected component
    this.bfs = bfsImpl;                   // BFS a connected component
    
	
	// --------------------
	// student methods next; actual functions in student code section at end
    
    this.makeAdjMatrix = makeAdjMatrixImpl2;       //Create adjacency (or weight, if graph weighted) matrix
    this.IsConnected = IsConnectedImpl;            //Test if graph connected
    this.componentInfo = componentInfoImpl;        //Get connectivity info in printable form
    this.topoSearch = topoSearchImpl;              // perform a topological search  
}


// -----------------------------------------------------------------------
// functions used by methods of Graph object
// similar to normal functions but use object member fields and methods
// depending on which object is passed by method call through "this"
//

// --------------------
function addEdgeImpl(u_i, v_i)
{
    // fetch edge vertices using their id, where u: source vertex, v: target vertex
    var u = this.vert[u_i],
        v = this.vert[v_i];
    
    // insert (u,v), i.e., insert v (by id) in adjacency list of u
    u.adjacent.insert(v_i);
    
    // insert (v,u) if undirected graph (repeat above but reverse vertex order)
    if (!this.digraph)
    {
        v.adjacent.insert(u_i);
    }
}

// --------------------
function addEdgeImpl2(u_i,v_i,weight)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
	var v = this.vert[v_i],
	    u = this.vert[u_i];
		
	// insert (u,v), i.e., insert v in adjacency list of u
    u.insertAdjacent(v_i,weight);
	
		
	// insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (!this.digraph)
    {
        v.insertAdjacent(u_i,weight);
    }
}

// --------------------
function printGraphImpl()
{
    // Graph properties
	document.write("<p>GRAPH {",this.label, "} ",this.weighted?"":"UN","WEIGHTED, ", this.digraph?"":"UN", "DIRECTED - ", this.nv, " VERTICES, ", 
		this.ne, " EDGES:</p>");
    
    // reprot conectivity
    this.componentInfo();

	// list vertices	
    var i,v;
    for ( i=0; i < this.nv; i++ )
    {
        v = this.vert[i];
        document.write( "VERTEX: ", i ,v.vertexInfo() );
    }
}

// --------------------
function list_vert()
{
	return "";   
}

// --------------------
function better_input(v,e)
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
    
    // check graph ih weighted
    if ( ! (e.length < 0) && ! (e[0].w === undefined) )   
    {
        this.weighted = true;
    }
    
    // input vertex pairs from edge list input array
    // remember to pass vertex ids to add_edge()
    for (i = 0; i < this.ne; i++)
    {
        this.addEdge(e[i].u, e[i].v,e[i].w);
    }
    
    // double edge count if graph undirected
    if (!this.digraph)
    {
        this.ne = this.ne * 2;
    }
}

// --------------------
function better_output()
{
    document.write("<p>", "GRAPH {", this.label, "} ", this.digraph ? "DIERCTED - " : "UNDIRECTED - ",
        this.nv, " VERTICES, ", this.ne, " EDGES: ", "</p>");
    this.list_vert();
}

// --------------------
function topoSearchImpl(fun)
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
        if (!v[i].visit)
        {
            fun == g.dfs ? (this.connectedComp++, this.dfs(i)) : this.bfs(i);
        }
    }
   
}

// --------------------
function DFS()
{

}

// --------------------
function dfsImpl(v_i)
{
    // get by id then process vertex
	var v = this.vert[v_i];
    this.dfs_push[this.dfs_push.length] = v_i;
    v.visit = true;
    
    // recursively traverse unvisited adjacent vertices
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
function DFS()
{

}

// --------------------
function bfsImpl(v_i)
{
	// get vertex v by its id
    var v = this.vert[v_i];

    // process v 
    v.visit = true;
    this.bfs_order[this.bfs_order.length] = v_i;

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
                this.bfs_order[this.bfs_order.length] = w[i];
            }
        }
    }
}

// --------------------
function makeAdjMatrix()
{

}

// --------------------
function makeAdjMatrixImpl()
{
    // initially create row elements and zero the adjacncy matrix
    var i,j,k,w,m,v,s;
    for ( i=0; i < this.nv; i++ )
    {
        this.AdjMatrix[i] =[];
        for ( j=0; j < this.nv; j++)
        {
            this.AdjMatrix[i][j] = 0;
        }

       // for each vertex, set 1 for each adjacency
       v = this.vert[i];
       w = v.adjacentByID();
       m = w.length;
       for ( k=0; k < m; k++ )
       {
           this.AdjMatrix[i][w[k]] = 1;
       }

    }
}

// --------------------
function  makeAdjMatrixImpl2()
{
    // initially create row elements and zero the adjacncy matrix
    var i,j,k,w,m,v,s;
    for ( i=0; i < this.nv; i++ )
    {
        this.adjMatrix[i] =[];
        for ( j=0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }
       // for each vertex, set 1 for each adjacency
       v = this.vert[i];
       w = v.incidentEdge();
       m = w.length;
       for ( k=0; k < m; k++ )
       {
           this.adjMatrix[i][w[k].adjVert_i] = (this.weighted) ? w[k].edgeWeight : 1;
       }

    }
}

// --------------------
function IsConnectedImpl()
{
   // check graph concetivity 
   return  (this.connectedComp == 0);         
}

// --------------------
function componentInfoImpl()
{
    //reprot conectivity 
    this.IsConnected() ? document.write("<p>","no connectivity info","</p>") :
    document.write("<p>","DISCONNECTED ",this.connectedComp,"</p>");
}

// --------------------
function adjacentByIdImpl()
{
    // return id of adjacent vertices
    var w= this.adjacent.traverse(),
    m = w.length, 
    adjacentVertices = [],
    i;
    for ( i=0; i < m; i++ )
    {
        adjacentVertices[i] = w[i].target_v;
    }
    return adjacentVertices;
}

// --------------------
function incidentEdgeImpl()
{
    //return information about edges incident to vertex.
    var w = this.adjacent.traverse(),
    m = w.length, 
    adjacentVertices = [],
    i;
    for ( i=0; i < m; i++ )
    {
        adjacentVertices[i] = {adjVert_i : w[i].target_v , edgeLabel : w[i].edgelabel, edgeWeight : w[i].weight};
    }
    return adjacentVertices;
} 

// --------------------
function vertexInfoImpl()
{
    //return vertex details
    var string = " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: "+ this.adjacentByID()+ "<br>"; 
    return string;
}

// --------------------
function insertAdjacentImpl(v_i,weight)
{
    //  create edge object using v_i as target and weight( optional ), then pass edge object
    var E = ! (weight === undefined) ? new Edge(v_i,weight) : new Edge(v_i);
    this.adjacent.insert(E);
}

function primImpl()
{

    var n_edgeTree;

    // create and init set of vertices tree , which can be initialized with root vertex
    var VerticesTree = [];

    // mark all vertices unvisited
    for (var w = 0; w < this.nv; w++)
        this.vert[w].visit = false;

    //get and insert the 1st vertex to the VerticesTree list (initial)
    VerticesTree[0] = this.vert[0];
    this.vert[0].visit = true; //Mark the vertex as visited

    var min = Infinity;

    // process vertices by applying prim's algorithm
    for (var i = 0; i < this.nv; i++)
    {
        //Find the minimum weight edge 
        for (var j = 0; j < VerticesTree.length; j++)
        {
            // get incident edge nodes of vertex in VerticesTree
            var incident_Edge = VerticesTree[j].incidentEdge();

            // process vertices adjacent to vertex in VerticesTree and store the edge with lower cost
            for (var k = 0; k < incident_Edge.length; k++)
            // check if the current adjacent vertex is non-visited and the its weight < previous edgeWeight 
                if (!this.vert[incident_Edge[k].adjVert_i].visit && incident_Edge[k].edgeWeight < min)
            {
                //insert the incident edge into the edge tree set
                this.prim_edgeTree[i] = (
                {
                    v: VerticesTree[j],
                    u: this.vert[incident_Edge[k].adjVert_i],
                    w: incident_Edge[k].edgeWeight
                });
                min = this.prim_edgeTree[i].w; //insert the new mininum weight
            }
        }

        //insert adjacent Vertex with minimum weight edge to VerticesTree 
        n_edgeTree = this.prim_edgeTree.length;
        VerticesTree[VerticesTree.length] = this.prim_edgeTree[n_edgeTree - 1].u;

        // mark VerticesTree as visited
        this.prim_edgeTree[n_edgeTree - 1].u.visit = true;

        min = Infinity;

    }

}


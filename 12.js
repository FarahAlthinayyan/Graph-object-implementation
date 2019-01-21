// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Final Project (NEW)
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


//var _v = [], _e = [];   // note naming conventions in upload guide
// graph from Exircise 9.2 1b (3rd edition)
// input user property fields for each vertex as defined in the Vertex object below

var _v = [
	{ label: "a" }, // index = 0
	{ label: "b" }, // index = 1
	{ label: "c" }, // index = 2
	{ label: "d" }, // index = 3
	{ label: "e" }, // index = 4
	{ label: "f" }, // index = 5
	{ label: "g" }, // index = 6
	{ label: "h" }, // index = 7
	{ label: "i" }, // index = 8
	{ label: "j" }, // index = 9
	{ label: "k" }, // index = 10
	{ label: "l" }  // index = 11
];

var _e = [
	{ u: 0, v: 1, w: 3 },
	{ u: 0, v: 2, w: 5 },
	{ u: 0, v: 3, w: 4 },
	{ u: 1, v: 4, w: 3 },
	{ u: 1, v: 5, w: 6 },
	{ u: 2, v: 3, w: 2 },
	{ u: 2, v: 6, w: 4 },
	{ u: 3, v: 4, w: 1 },
	{ u: 3, v: 7, w: 5 },
	{ u: 4, v: 5, w: 2 },
	{ u: 4, v: 8, w: 4 },
	{ u: 5, v: 9, w: 5 },
	{ u: 6, v: 7, w: 3 },
	{ u: 6, v: 10, w: 6 },
	{ u: 7, v: 8, w: 6 },
	{ u: 7, v: 10, w: 7 },
	{ u: 8, v: 9, w: 3 },
	{ u: 8, v: 11, w: 5 },
	{ u: 9, v: 11, w: 9 },
	{ u: 10, v: 11, w: 8 }
];


// -----------------------------------------------------------------------
function main_graph()   
{
    var a = new Heap();
    a.insert("a",2);
    a.insert("b",9);
    a.insert("c",7);
    a.insert("d",6);
    a.insert("e",5);
    a.insert("f",8);
    document.write(a.show());
    a.insert("g",10);
    document.write(" ");
    document.write(a.show());
    a.insert("h",15);
    document.write(" ");
    document.write(a.show());
  

    var g = new Graph();
    //{n=1000, m=250000},
    //n=5000, m=3500000
    //{n=10000,m=2500000}
    // {n=20000, m=3000000}
     g.readGraph(_v,_e);
     g.label = "Exercise 9.2: 1b (Levitin, 3rd edition)";
     g.printGraph();
   //g.make_graph(1000,250000);
    
  

   var t0= performance.now();
   g.prim();
   var t1 = performance.now() - t0;
  // document.write("<p>","Using heap (",(t1).toFixed(4),")","</p>");


   for (var i = 0; i < g.VT.length; i++)
    {
        document.write("( " + g.VT[i].parent + " , " + g.VT[i].tree + " ) ");
    }
    document.write("<p>","</p>");


    var t2= performance.now();
    g.prim1();
    var t3 = performance.now() - t2;
    //document.write("<p>","Using LinkList (",(t3).toFixed(4),")","</p>");

    for (var i = 0; i < g.VT.length; i++)
    {
        document.write("( " + g.VT[i].parent + " , " + g.VT[i].tree + " ) ");
    }
    document.write("<p>","</p>");



    var t4 = performance.now();
    g.prim2();
    var t5 = performance.now() - t4;
   // document.write("<p>","Brute force (",(t5).toFixed(4),")","</p>");

    for (var i = 0; i < g.VT.length; i++)
    {
        document.write("( " + g.VT[i].parent + " , " + g.VT[i].tree + " ) ");
    }
    document.write("<p>","</p>");
    
  

   
   

}


// -----------------------------------------------------------------------
// similar to starter 8
function Vertex(v)
{
    // property fields
	
    this.label = v.label;
	this.visit = false;
    this.adjacent = new List();
    this.parent = null;
	// member methods
	this.adjacentByID = adjacentByIdImpl;           
    this.incidentEdge = incidentEdgeImpl;          
    this.vertexInfo = vertexInfoImpl;              
    this.insertAdjacent = insertAdjacentImpl;  	
}

// -----------------------------------------------------------------------
// similar to starter 8
function Edge(vert_i,weight)
{
    this.target_v = vert_i;
    this.weight =! (weight === undefined) ? weight : null ;      
    this.edgelabel = null;  
}


// -----------------------------------------------------------------------
// similar to starter 8 (NO network methods)
function Graph()
{
   
    this.VT = [];
    this.vert = [];
	this.nv = 0;                 // ... (complete next)
	this.ne = 0;                  
    this.digraph = false;         
    this.weighted = false;        
	this.dfs_push = [];           
    this.bfs_order = [];          
    this.dfs_pop = [];            
    this.label = "";              
    this.connectedComp = 0;         
    this.adjMatrix = []; 

	// member methods
	
	this.read_graph = better_input;  // ... (complete next)
	this.readGraph = better_input;        
    this.addEdge = addEdgeImpl2;          
	this.printGraph = printGraphImpl;    
	this.list_vert = "";
	this.dfs = dfsImpl;                   
    this.bfs = bfsImpl;                  
	this.makeAdjMatrix = makeAdjMatrixImpl2;      
    this.isConnected = isConnectedImpl;        
    this.componentInfo = componentInfoImpl;      
    this.topoSearch = topoSearchImpl; 
    this.prim = primImpl; 
    this.prim1 = primImpl1;
    this.prim2 = primImpl2;  
    this.make_graph = make_graphImpl;  
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects


function make_graphImpl(n, m, w)   // feel free to change, if needed
{
    // parameter validations and checks: number of edges etc.
	var mmax = n*(n-1);
	if ( ! this.digraph ) mmax /= 2;
	if (m>mmax)
	{
		document.write("<p>ERROR: invalid number of edges for graph type</p>");
		return;
	}
	
	// create n vertex in v[] using id 0 to n-1 as label
	var v=[];
	for (var i=0; i<n; i++)
		v[i] = {label:i.toString()};

	// if graph complete no need to generate random edges, just create mmax edges systematically
	

	// otherwise repreat create m distinct edges (graph loops not allowed)
	
	var e=[], wmin=1, wmax = 50000, wsum=0;
	
	var h = [];   // quick-dirty n x n matrix to check previously generated edges, 
	              // m-entry hash table would be more efficient
	for (i=0; i<n; i++)    
	{
		h[i] = []; h[i][i]=0;    // no graph loops; 0 = blocked pair of vertices
	}
	
	for (i=0; i<m; i++)
	{
		// generate vertices u, v randomly
		do 
		{
			var u_i = random(0,n-1), v_i = random(0,n-1);
		
		} while ( h[u_i][v_i] != undefined );
		
		h[u_i][v_i] = 0; h[v_i][u_i] = 0;     // update matrix: block u,v; block v,u also if undirected
		
		// if (u,v) is distinct insert in e[] (generate random weight if w true)
		// otherwise repeat generate another u,v pair
	
		e[i] = {u:u_i, v:v_i};
		if (w)
		{
			e[i].w = random(wmin,wmax);
			wsum += e[i].w;
		}
	}

	// call graph reader method and set label, graph type depends on value of digraph property
	this.readGraph(v,e);
	this.label = "Generated "+n+" vertices, "+m+" random "+(!this.digraph?"un":"")+"directed edges ("+Math.round(m/mmax*100)+"%)"+(w?", ave weight = "+Math.round(wsum/m):"");
}

function random(low,high)
{
	return Math.floor(Math.random()*(high-low+1))+low;
}


// -----------------------------------------------------------------------
// begin student code section (NO network functions, only code related to this project)
// -----------------------------------------------------------------------

// Final M2 code here

function primImpl2()
{
    var i, j, k, m, w, v_tree = [], min_weight = Infinity , min_target = 0, min_source = 0;
    
    // mark all vertices unvisited
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }
    this.VT = [];
    // insert the first vertex in the vertices tree
    v_tree[0] = this.vert[0];
    v_tree[0].visit = true;
    this.VT[0] = 
    {
        parent: "-",
        tree: 0
    };
    // for each vertex, search for the shortest edge connect to it.
    for ( i=1; i < this.nv; i++ )
    {
        // find the edge with a minimum weight among all edges related to the vertices tree 
        for ( j=0; j < v_tree.length; j++ )
        { 
            // for each vertex in the vertices tree, search for the edge with minimum weight in the adjaceny list
            w = v_tree[j].incidentEdge(), m = w.length;
            
            for ( k=0; k < m; k++ )
            {   
                // save the unvisited target reached by the minimum edge weight 
                if (! this.vert[w[k].adjVert_i].visit && w[k].edgeWeight < min_weight)
                {
                    min_target = w[k].adjVert_i;
                    min_source = this.VT[j].tree;
                    min_weight = w[k].edgeWeight;
                }
            }
            //insert the saved vertex in the minimum spanning tree
       
        }
        this.VT[i] = 
        {
            parent: min_source,
            tree: min_target
        };

         //insert the saved vertex into the vertices tree and mark it visited
         v_tree[v_tree.length] = this.vert[min_target];
         this.vert[min_target].visit = true;
 
         //reset the minimum value
         min_weight = Infinity;
        
       
    }
   // return spainning_tree;
}

function primImpl()
{
    var w, m;
 
 //mark all vertices unvisited
 for (var i = 0; i < this.nv; i++)
 {
 this.vert[i].visit = false;
 }

 //initilize queue to store all adjacents of all vertices 
 var pq = new PQueue();

 // get the first vertix and mark it as visit
 w = this.vert[0].incidentEdge(), m = w.length;
 this.vert[0].visit = true;

 //initialize weight arrey to keep remembering all of the weights for target
 var weights = [];

 //insert target vertex and minimum weight to the priority queue
 //and assign parent to the target index also assign weight on weights array
 for (var i = 0; i < m; i++)
 {
 pq.insert(w[i].adjVert_i, w[i].edgeWeight);
 this.vert[w[i].adjVert_i].parent = 0;
 weights[w[i].adjVert_i] = w[i].edgeWeight;

 }

 // initialize an empty arrays 
 this.VT = [];

 // for VT store on the first index the info parent, next target
 this.VT[0] = {
 parent: "-",
 tree: 0
 };

 for (var i = 1; i < this.nv; i++)
 {
 // get the highest priority Id 
 var min = pq.deleteMin();

 // mark vertex visited
 this.vert[min].visit = true;

 // store the next info
 this.VT[this.VT.length] = {
 parent: this.vert[min].parent,
 tree: min
 }

 //catch adjacents. for vert[min] and add them to w
 w = this.vert[min].incidentEdge(), m = w.length;

 for (var j = 0; j < m; j++)
 {
 u = w[j];

 // for un-visit target 
 //insert target vertex and minimum weight to the priority queue
 if (!this.vert[w[j].adjVert_i].visit)
 {
 pq.insert(w[j].adjVert_i, w[j].edgeWeight);
 if ((this.vert[u.adjVert_i].parent == null) || (this.vert[u.adjVert_i].parent !== null && weights[u.adjVert_i] > u.edgeWeight))
 {
 //to the next target add parent info and assign weight to weights array
 this.vert[w[j].adjVert_i].parent = min;
 weights[w[j].adjVert_i] = w[j].edgeWeight;
 }

 }
 }

 }
 
   
}

  // }
function primImpl1()
{
    var w, m;
 
 
 //mark all vertices unvisited
 for (var i = 0; i < this.nv; i++)
 {
 this.vert[i].visit = false;
 }

 //initilize queue to store all adjacents of all vertices 
 var pq = new PQueue1();

 // get the first vertix and mark it as visit
 w = this.vert[0].incidentEdge(), m = w.length;
 this.vert[0].visit = true;

 //initialize weight arrey to keep remembering all of the weights for target
 var weights = [];

 //insert target vertex and minimum weight to the priority queue
 //and assign parent to the target index also assign weight on weights array
 for (var i = 0; i < m; i++)
 {
 pq.insert1(w[i].adjVert_i, w[i].edgeWeight);
 this.vert[w[i].adjVert_i].parent = 0;
 weights[w[i].adjVert_i] = w[i].edgeWeight;

 }

 // initialize an empty arrays 
 this.VT = [];

 // for VT store on the first index the info parent, next target
 this.VT[0] = {
 parent: "-",
 tree: 0
 };

 for (var i = 1; i < this.nv; i++)
 {
 // get the highest priority Id 
 var min = pq.deleteMin1();

 // mark vertex visited
 this.vert[min].visit = true;

 // store the next info
 this.VT[this.VT.length] = {
 parent: this.vert[min].parent,
 tree: min
 }

 //catch adjacents. for vert[min] and add them to w
 w = this.vert[min].incidentEdge(), m = w.length;

 for (var j = 0; j < m; j++)
 {
 u = w[j];

 // for un-visit target 
 //insert target vertex and minimum weight to the priority queue
 if (!this.vert[w[j].adjVert_i].visit)
 {
 pq.insert1(w[j].adjVert_i, w[j].edgeWeight);
 if ((this.vert[u.adjVert_i].parent == null) || (this.vert[u.adjVert_i].parent !== null && weights[u.adjVert_i] > u.edgeWeight))
 {
 //to the next target add parent info and assign weight to weights array
 this.vert[w[j].adjVert_i].parent = min;
 weights[w[j].adjVert_i] = w[j].edgeWeight;
 }

 }
 }

 }
 
}
    //  }




// -----------------------------------------------------------------------
// paste your heap package here 
function Heap()
{
	// h[0] not used, heap initially empty
	
	this.h = [null];                   // heap of integer keys
	this.h_item = [null];              // corresponding heap of data-items (any object)
	this.size = 0;                     // 1 smaller than array (also index of last child)
	this.pos = [null];

	// --------------------
	// PQ-required only; more could be added later when needed
	// the 2 basic shape maintaining operations heapify and reheapify simplify
	// processing functions

	this.isEmpty =  heapIsEmpty;            // return true if heap empty
	this.deleteRoot =  heapDeleteRoot;      // return data-item in root
	this.insert =  heapInsert;              // insert data-item with key
	
	this.heapify = heapifyImpl;            // make subtree heap; top-down heapify ("sink") used by .deleteRoot()
	this.reheapify =  reheapifImpl;        // bottom-up reheapify ("swim") used by .insert()
	this.show = heapShow;                  // utility: return pretty formatted heap as string
	                                      // ... etc 

	// --------------------
	// student methods next; ; actual functions in student code section at end

}

// -----------------------------------------------------------------------
// functions used by methods of Heap() object

// note return interface for heapDeleteRoot() below
// use prefix 'heap' for implementing functions (see examples)
// if both key and item are needed, pass key before item
//

function heapShow()
{
	var n = this.size;
	var m = Math.floor(n/2);       // last parent node
	
	var k = this.h.slice(1,n+1), a = this.h_item.slice(1,n+1);
	
	var out="<h2>Heap (size="+ n+ "):</h2><p>Keys: " + k + "<br>Data: "+ a + "</p>";
	for (var i=1; i<=m; i++)
	{
		out += "<p>"+ i+ ": <b>"+ this.h[i]+ "("+ this.h_item[i]+ ")</b><ul>";
		if ( 2*i <= n )
			out += "<li>"+ this.h[2*i]+ "</li>";
		if ( 2*i+1 <= n )
			out+= "<li>"+ this.h[2*i+1]+ "</li>";
		out+= "</ul></p>";
		
	}

	
	
	return out;
}


// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------
// -----------------------------------------------------------------------

function heapIsEmpty()
{
    return ( this.size == 0 );
}

//---------------------------------------
function heapDeleteRoot()
{
	// save root key and item pair
	
    var root = [ this.h[1], this.h_item[1] ];
    if(! this.isEmpty()){
	this.h[1] = this.h[this.size];
	this.h_item[1] = this.h_item[this.size];
	this.size--;
	this.heapify(1);}
	
    // ... complete
	
	return root[1];
}

function heapInsert(item,key)
{
	
	
	if (this.pos[item] > 0 )
		{
			this.h[this.pos[item]] = key;
			this.reheapify(this.pos[item]);
					
		}
	else
	{
		this.size++;
	    this.h_item[this.size] = item;
		this.h[this.size] = key;
		this.pos[item] = this.size;
		this.reheapify(this.size);
	}

	
		
}

function heapifyImpl(k)
{
	var v = this.h[k];
	var v_item = this.h_item[k];
	//var k =1;
	var j = 0;
    var heap = false;
   
        while( heap == false && (2*k) <= (this.size) )
        {
            j = (2*k);
            if( j < this.size )
            {
                if(  this.h[j]  <  this.h[j+1] )
                {
                    j++;
                }
                
            }
             
            if( v >= this.h[j] )
            {
                heap = true;
            }
            else
            {
				this.h[k] = this.h[j];
				this.h_item[k] = this.h_item[j];
				this.pos[this.h_item[k]] = k;
                k = j;
            }
			this.h[k] = v;
			this.h_item[k] = v_item;
			this.pos[this.h_item[k]] = k;
        }
}

function reheapifImpl(k)
{
	var v = this.h[k];
	var v_item = this.h_item[k];
  //  var k = this.size;
    var heap = false;
	var j = 0;
	
        while( heap == false && Math.floor(k/2) >= 1 )
        {
            j = Math.floor(k/2);
            if( v <= this.h[j] )
            {
                heap=true;
            }
            else
            {
				this.h[k] = this.h[j];
				this.h_item[k] = this.h_item[j];
				this.pos[this.h_item[k]] = k;
                k = j;
            }
			this.h[k] = v;
			this.h_item[k] = v_item;
			this.pos[this.h_item[k]] = k;
        }
}

// -----------------------------------------------------------------------
// paste your PQ package here

function PQueue()
{
    
	this.pq = new Heap();
   
    this.isEmpty = pqEmpty;

     
    this.deleteMin = deleteMin;

     
    this.insert = pqinsert;

     
    this.decrease = decrease;
    

      
        
	
}


function pqEmpty()
{
    // return boolean using Linked List isEmpty() func.
    return this.pq.isEmpty();
}



function deleteMin()
{
    return this.pq.deleteRoot();
}



function pqinsert(item, key)
{
   return this.pq.insert(item,( key*-1));
}


function decrease(item, key)
{
    this.pq.insert(item,(key*-1));
}

// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// similar to starters 8 and 11
// *NO* JSDOC comments in this section
// -----------------------------------------------------------------------


function addEdgeImpl(u_i, v_i) //replaced
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
function addEdgeImpl2(u_i, v_i, weight)
{
   
    var v = this.vert[v_i],
        u = this.vert[u_i];

    u.insertAdjacent(v_i, weight);

    if (!this.digraph)
    {
        v.insertAdjacent(u_i, weight);
    }
}

// --------------------
function printGraphImpl()
{
   
    document.write("<p>GRAPH {", this.label, "} ",this.weighted ? "" : "UN", "WEIGHTED, " ,this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ",
        this.ne, " EDGES:</p>");

    document.write(this.componentInfo());

    var i, v;
    for (i = 0; i < this.nv; i++)
    {
        v = this.vert[i];
        document.write("VERTEX: ", i, v.vertexInfo());
    }
}

// --------------------
function list_vert() // replaced
{
    var i, v;  
	for (i=0; i < g.nv; i++)
	{
		v = g.vert[i];
		document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit, 
			" - ADJACENCY: ", v.adjacentByID(), "<br>" );
	}
}

// --------------------
function better_input(v, e)
{
  
    this.nv = v.length;
    this.ne = e.length;

    var i;
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i] = new Vertex(v[i]);
    }

    if (!(e.length < 0) && !(e[0].w === undefined))
    {
        this.weighted = true;
    }

    for (i = 0; i < this.ne; i++)
    {
        this.addEdge(e[i].u, e[i].v, e[i].w);
    }

    if (!this.digraph)
    {
        this.ne = this.ne * 2;
    }
}

// --------------------
function better_output()
{
    document.write("<p>", "GRAPH {", g.label, "} ", g.digraph ? "DIERCTED - " : "UNDIRECTED - ",
        g.nv, " VERTICES, ", g.ne, " EDGES: ", "</p>");
    list_vert();
}

// --------------------
function topoSearchImpl(fun)
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
            fun == g.dfs ? (this.connectedComp++, this.dfs(i)) : this.bfs(i);
        }
    }

}

// --------------------
function DFS() //replaced
{
    var i, v = g.vert;
    for (i = 0; i < g.nv; i++)
    {
        v[i].visit = false;
    }

    for (i = 0; i < g.nv; i++)
    {
        if (!(v[i].visit))
        {
            g.dfs(i);
        }
    }
}

// --------------------
function dfsImpl(v_i)
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
function BFS() //replaced
{
    var i, v = g.vert;
    for (i = 0; i < g.nv; i++)
    {
        v[i].visit = false;
    }

    for (i = 0; i < g.nv; i++)
    {
        if (v[i].visit == false)
        {
            g.bfs(i);
        }

    }
}

// --------------------
function bfsImpl(v_i)
{
    var v = this.vert[v_i];

    v.visit = true;
    this.bfs_order[this.bfs_order.length] = v_i;

    var queue = new Queue();
    queue.enqueue(v);

    var u, m, w, i;
   
    while (!queue.isEmpty())
    {
        
        u = queue.dequeue();

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
function makeAdjMatrix() //replaced
{
    var i, j, k, w, m, v;
    for (i = 0; i < g.nv; i++)
    {
        g.adjMatrix[i] = [];
        for (j = 0; j < g.nv; j++)
        {
            g.adjMatrix[i][j] = 0;
        }

        v = g.vert[i];
        w = v.adjacentByID();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            g.adjMatrix[i][w[k]] = 1;
        }

    }
}

// --------------------
function makeAdjMatrixImpl()
{
    var i, j, k, w, m, v;
    for (i = 0; i < this.nv; i++)
    {
        this.adjMatrix[i] = [];
        for (j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
        }

        v = this.vert[i];
        w = v.adjacentByID();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            this.adjMatrix[i][w[k]] = 1;
        }

    }
}

// --------------------
function makeAdjMatrixImpl2()
{
    var i, j, k, w, m, v;
    for (i = 0; i < this.nv; i++)
    {
        this.adjMatrix[i] = [];
        this.dist[i] = [];
        for (j = 0; j < this.nv; j++)
        {
            this.adjMatrix[i][j] = 0;
            this.dist[i][j] = 0;
        }
      

        v = this.vert[i];
        w = v.incidentEdge();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            this.adjMatrix[i][w[k].adjVert_i] = (this.weighted) ? w[k].edgeWeight : 1;
        }

    }
}

// --------------------
function isConnectedImpl()
{
    return this.connectedComp === 1;
}

// --------------------
function componentInfoImpl()
{
    var result;
    if (this.isConnected()){
        result = "CONNECTED";
    }
    else if (this.connectedComp === 0)
    {
        result = "no connectivity info";
    }
    else 
    {
        result = "DISCONNECTED " + this.connectedComp;
    }
    return ("<p>"+ result+ "</p>");
}

// --------------------
function adjacentByIdImpl()
{
    var w = this.adjacent.traverse(),
        m = w.length,
        adjacentVertices = [],
        i;
    for (i = 0; i < m; i++)
    {
        adjacentVertices[i] = w[i].target_v;
    }
    return adjacentVertices;
}

// --------------------
function incidentEdgeImpl()
{
    var w = this.adjacent.traverse(),
        m = w.length,
        adjacentVertices = [],
        i;
    for (i = 0; i < m; i++)
    {
        adjacentVertices[i] = {
            adjVert_i: w[i].target_v,
            edgeLabel: w[i].edgelabel,
            edgeWeight: w[i].weight
        };
    }
    return adjacentVertices;
}

// --------------------
function vertexInfoImpl()
{
    var string = " {" + this.label + "} - VISIT: " + this.visit + " - ADJACENCY: " + this.adjacentByID() + "<br>";
    return string;
}

// --------------------
function insertAdjacentImpl(v_i, weight)
{
    var E = !(weight === undefined) ? new Edge(v_i, weight) : new Edge(v_i);
    this.adjacent.insert(E);
}
/**
@methodOf Graph#
@method dijkstra
@author Reem Alsulami
@description #1find the shortest paths start from a given vertex for directed/undirected weighted graph
#2 fill the vt information in {@link #vt} in
	input order by default. Supported interface fields are as follows:
	
	 <code>vt.parent</code> - the parents array contain the parent for each vertex, used in print the path from the source vertex to the current vertex
	 <code>vt.destination</code> - the destination vertex, it go to from the source vertex
	 <code>vt.distance</code> - the distance of the path start from the source vertex to the cuurent vertex
@param {integer} u_i Source vertex id

*/
function dijkstraImpl(s)
{  

    var pq, i, k, vertex, u ,v , w, m, d = [] , parent =[];
    this.vt.length = 0;
    pq = new PQueue();
    for ( i=0; i < this.nv; i++ )
    {
        v = this.vert[i];
        v.visit = false;
        d[i] = Infinity;
        pq.insert(i,d[i]);
    }

    d[s] = 0;
    pq.decrease(s,d[s]);
    

    for ( i=0; i < this.nv; i++ )
    {
        u = pq.deleteMin();
        vertex = this.vert[u.item];
        vertex.visit = true;
        w = vertex.incidentEdge();
        m = w.length;
        
        for ( k=0; k < m; k++ )
        {
            if ( ! this.vert[w[k].adjVert_i].visit && (u.prior + w[k].edgeWeight) < d[w[k].adjVert_i] )
            {
                d[w[k].adjVert_i] = (u.prior + w[k].edgeWeight);
                this.vert[w[k].adjVert_i].parent= u.item;
                pq.decrease(w[k].adjVert_i,d[w[k].adjVert_i]);
                
            }
        }

        if ( u.item == s)
        parent[parent.length] = -1;
        else
        parent[parent.length]  =  this.vert[u.item].parent;
      
        
        this.vt[u.item] = 
        {
            parent: parent,
            destination: this.vert[u.item],
            weight: null,
            distance: d[u.item]

        };

        
        
    }


}

/**
@methodOf Graph#
@method makeDistMatDij
@author Reem Alsulami
@description #1 create hte distance matrix for directed/undirected weighted graph by calling @method Dijkstra for each vertex as a source vertex.
each call create one line in the distance matrix {@link #adjMatrix.dist}.
*/
function makeDistMatDijkImpl()
{
    var i,j ;

     for ( i=0; i < this.nv; i++ )
     {
        this.dijkstra(i);
        this.dist[i] = [];
        for ( j=0; j < this.nv; j++ )
        {
            this.dist[i][j] = this.vt[j].distance;
        }
     }
}

//----------------------------------------------------------------------------------------------------------------------------

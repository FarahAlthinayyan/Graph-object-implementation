// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2017, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge property fields to be added later as needed
//


var _v = [], _e = [];   // note naming convention in upload guide
//var _v2 = [], _e2 = [];
//var _v3 = [], _e3 = [];
//var _v4 = [], _e4 = [];
// -----------------------------------------------------------------------
function main_graph()   
{
    g = new Graph();
   // g1 = new Graph();
   // g2 = new Graph();
   // g3 = new Graph();
    g.label = "Exercise 8.4: 1 (Levitin, 3rd edition)";
    
    //g.digraph = true;
    g1.digraph = true;
    
    g.readGraph(_v,_e);
  //  g1.readGraph(_v2,_e2);
  //  g2.readGraph(_v3,_e3);
  //  g3.readGraph(_v4,_e4);
    // Exercise 8.4: 1 

    g.printGraph();
    
    //g.componentInfo();

    g.topoSearch(g.dfs);
    document.write("<p>","dfs_push: ",g.dfs_push,"</p>");
    
    g.componentInfo();
    

    /*document.write("<p>","TC matrix by DFS:","</p>"); 
	g.dfsTC();
    for ( var i=0; i < g.tc.length;i++)
	{
        document.write("<p>",g.tc[i],"</p>"); 
    }*/


    document.write("<p>","TC matrix by Warshall-Floyd:","</p>"); 
  
    g.warshallFloyd();
    for ( var i=0; i < g.tc.length;i++)
	{
        document.write("<p>",g.tc[i],"</p>"); 
    }
    

  /*  document.write("<p>","DAG: ",g.isDAG(),"</p>"); 
    
    // Exercise 8.4: 7 

    document.write("<p>","TC matrix by Warshall-Floyd Exercise 8.4: 7","</p>"); 
    g1.warshallFloyd();
    for ( var i=0; i < g1.tc.length;i++)
	{
        document.write("<p>",g1.tc[i],"</p>"); 
    }*/


    if( g.weighted)
    {
        document.write("<p>","Distance matrix Exercise 8.4: 7 ","</p>"); 
        for ( var i=0; i < g.dist.length;i++)
        {
            document.write("<p>",g.dist[i],"</p>"); 
        }
    }

   // document.write("<p>","DAG Exercise 8.4: 7 ","</p>"); 
   // document.write("<p>",g1.isDAG(),"</p>"); 
    
    // MST for KSA 12 cities 
   /* var total = 0;
    if (g2.weighted)
    {
        document.write("<p>","MST for KSA 12 cities","</p>"); 
        g2.prim();
        for ( var i=0; i < g2.spainning_tree.length;i++)
        {
            document.write("<p>","PATH","{",i+1,"}"," : ","{",g2.spainning_tree[i].v.label,",",g2.spainning_tree[i].u.label,"} - PATH COST = ",g2.spainning_tree[i].w,
            " Km","</p>"); 
            total+= g2.spainning_tree[i].w;
        }
        document.write("<p>","THE SHORTEST PATH AMONG ALL CITIES IS : ",total," Km","</p>");

    }*/

   
    if (g.weighted)
    {
        g.dijkstra(0);
        document.write(" The Shortest paths strart from vertex: ",0," {",g.vert[0].label,"}");
        for ( var i= 1; i < g.vt.length ;i++ )
       { 
           document.write("<p>",showPath( i, 0,parent),"PATH{",i,"}: from ",g.vert[0].label," to ",g.vt[i].target.label,": with distance ",g.vt[i].distance,"</p>");
       }
    }

    if (g.weighted)
    {
        g.makeDistMatDijk();
        document.write("<p>","Distance matrix from Dijkstra ","</p>"); 
        for ( var i=0; i < g.dist.length;i++)
        {
           document.write("<p>",g.dist[i],"</p>"); 
       }
   }
  
    
     
}


// -----------------------------------------------------------------------

function Vertex(v)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section
	
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
		
	// --------------------
	// student property fields next
	
	
	// --------------------
	// student methods next; actual functions in student code sections
	
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section

	
	// property fields
	
	this.target_v = vert_i;
    this.weight =! (weight === undefined) ? weight : null ;      
    this.edgelabel = null;                                   // ... (complete next)
	
	// member methods
	

	// --------------------
	// student property fields next
	
	
	// --------------------
	// student methods next; actual functions in student code sections

}


// -----------------------------------------------------------------------

function Graph()
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments (leave outline)
	// no JSDOC comments in this section
	
	
	// property fields

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
    this.IsConnected = IsConnectedImpl;           
    this.componentInfo = componentInfoImpl;      
    this.topoSearch = topoSearchImpl;               
	// --------------------
    // student property fields next

    /**#@+
    * @description PROPERTY –
    */
		 
    /** Transitive closure matrix */
	this.tc = [];
		
	/** distance matrix  */
    this.dist = [];
    this.vt = [];
    /** distance matrix  */
    this.spainning_tree = [];
    this.dijkstra = dijkstraImpl;
    this.makeDistMatDijk = makeDistMatDijkImpl; 
   
 	/**#@- */
    

	// --------------------
	// student methods next (actual functions in student code sections)

	// transitive closure package (requirements in line comments) 
    
    /**#@+
    * @description MEMBER METHOD –
    */
 
    /** check if exsits path between any two vertices	*/
    this.hasPath = hasPathImpl;                 // boolean, true if path exists between vertices v_i, v_j in digraph
     
 	/** Get the shortest path between any two vertices in weighted graph */
    this.shortestPath = shortestPathImpl;       // return distance of shortest path between v_i, v_j in weighted graph 
		
	/** check if the graph is acyclic */
    this.isDAG = isDAGImpl                      // boolean, true if acyclic digraph	

	/** generate the tc and distance of a given graph	*/
    this.warshallFloyd = warshallFloydImpl;     // inserts .tc field in adjacency matrix if digraph, and .dist if weighted

    /** generate tc of given graph based on dfs traverse */	
    this.dfsTC = dfsTCImpl;                     // return TC matrix for digraph based on a dfs

    /** generate MST of a given undirected graph */
	this.prim = primImpl;                       // create the minimum spanning tree of a given graph
		
        /**#@- */
        
   
	
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and subsidiary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 
/** 
@methodOf Graph#
@method hasPath
@author Reem Alsulami
@description check for a path exists between two vertices using transitive closure matrix
@param {integer} u_i Source vertex id
@param {integer} v_i Target vertex id
@return {boolean} true if path exists between vertices v_i, v_j in digraph
*/
function hasPathImpl(v_i,v_j)
{
   //return true path exist between two vertices
   return ( this.tc[v_i][v_j] == 1 );
     
}

/** 
@methodOf Graph#
@method shortestPath
@author Reem Alsulami
@description find the shortest path between any two vertices using distance matrix
@param {integer} u_i Source vertex id
@param {integer} v_i Target vertex id
@return {integer} distance of shortest path between v_i, v_j in weighted graph 
*/
function shortestPathImpl(v_i,v_j)
{
    // return the shortest distance between two vertices
    if (this.weighted)
    return this.dist[v_i][v_j];
}

/** 
@methodOf Graph#
@method dfsTC
@author Reem Alsulami
@description #1 generate transitive closure matrix using depth first search traverse implementation.
#2 fill the result in {@link #tc}
*/
function dfsTCImpl()
{

    var v, i, j, s, k;
    for (i = 0; i < this.nv; i++)
    {   
        
        // reset dfs_push and vertices visited values
        this.dfs_push.length = 0;
		for (s= 0; s < this.nv; s++)
		{
			this.vert[s].visit = false;
        }
        
        // call dfs for each node as a starter node
        v = this.vert[i];
        w = v.adjacentByID();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            this.dfs(w[k]);
        }
        
        // fill the transitive closure array 
        this.tc[i] = [];
		for ( j = 0; j < this.nv ; j++)
		{
			this.tc[i][j] = 0;
        }
        
		for ( j = 0; j < this.nv ; j++)
		{
            
			this.tc[i][this.dfs_push[j]] = 1;
        }
        
        // reset dfs_push and vertices visited values
		this.dfs_push.length = 0;
		for (s= 0; s< this.nv; s++)
		{
			this.vert[s].visit = false;
		}
	}
}

/** 
@methodOf Graph#
@method warshallFloyd
@author Reem Alsulami
@description #1 generate the transitive clousre matrix of a digraph.
#2 generate the distance matrix of the shortest paths length of a weighted graph that do not contain a cycle of a negative length.
#3 fill The Transitive closure matrix in {@link #tc}
and The distance matrix of the shortest paths length in {@link #dist}
*/
function warshallFloydImpl()
{
    var i, j, k, w, m, v;
    
    // generate adjacent and distance matrix.
    this.makeAdjMatrix();
    for (i = 0; i < this.nv; i++)
    {
        this.tc[i] = [];
        for (j = 0; j < this.nv; j++)
        {
            this.tc[i][j] = 0;
        }
        v = this.vert[i];
        w = v.adjacentByID();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            this.tc[i][w[k]] = 1;
        }

}
    
    // merge and perform warshall and Floyd algorithms
    for ( k=0; k < this.nv; k++ )
    {
        for ( i=0; i < this.nv; i++ )
        {
            for ( j=0; j < this.nv; j++ )
            {
                // perform warshall algorithm
                if(this.digraph){
                if ( (this.tc[i][j] == 1) || ( this.tc[i][k] == 1 && this.tc[k][j] == 1 ))
                {
                    this.tc[i][j] = 1;
                }}

                // perform Floyed algorithm
                if ( this.weighted )  
                {
                    if ( this.dist[i][j] < (this.dist[i][k] + this.dist[k][j]) )
                    {
                        this.dist[i][j] = this.dist[i][j];
                    }
                    else
                    {
                        this.dist[i][j] = (this.dist[i][k] + this.dist[k][j]);
                    }
                }   
            }
        }
    }
}

/** 
@methodOf Graph#
@method isDAG
@author Reem Alsulami
@description check if the graph is acyclic or not using transitive closure matrix
@return {boolean} true if acyclic digraph
*/
function isDAGImpl()
{
    // check and return if the graph is a dag
    var i;
    for ( i=0; i < this.nv; i++ )
    {
        if (this.hasPath(i,i))
        {
            return false;
        }   
    }

    return true;
}

/** 
@methodOf Graph#
@method prim
@author Reem Alsulami
@description #1 generate the minimum spanning tree of a weighted undirected graph.
#2 fill the minimum spanning tree information in {@link #spainning_tree} in
	input order by default. Supported interface fields are as follows:
	
	 <code>spainning_tree.v</code> - the source vertex
	 <code>spainning_tree.u</code> - the target vertex
	 <code>spainning_tree.w</code> - the weight of edge between source and target
*/
function primImpl()
{
    var i, j, k, m, w, v_tree = [], min_weight = Infinity , min_target = 0, min_source = 0;

    // mark all vertices unvisited
    for (i = 0; i < this.nv; i++)
    {
        this.vert[i].visit = false;
    }
    
    // insert the first vertex in the vertices tree
    v_tree[0] = this.vert[0];
    v_tree[0].visit = true;
    
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
                    min_source = j;
                    min_weight = w[k].edgeWeight;
                }
            }
        }
        
        //insert the saved vertex in the minimum spanning tree
        this.spainning_tree[this.spainning_tree.length] = 
        {
            v: v_tree[min_source],
            u: this.vert[min_target],
            w: min_weight
        };
        
        //insert the saved vertex into the vertices tree and mark it visited
        v_tree[v_tree.length] = this.vert[min_target];
        this.vert[min_target].visit = true;

        //reset the minimum value
        min_weight = Infinity;
    }

}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// for this section, strip line comments (leave outline)
// no JSDOC comments in this section
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
   
    document.write("<p>GRAPH {", this.label, "} ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ",
        this.ne, " EDGES:</p>");

    this.componentInfo();

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
function IsConnectedImpl()
{
    return (this.connectedComp == 0);
}

// --------------------
function componentInfoImpl()
{
    this.IsConnected() ? document.write("<p>", "no connectivity info", "</p>") :
        document.write("<p>",this.connectedComp == 1 ? "CONNECTED" : ("DISCONNECTED ",this.connectedComp), "</p>");
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


    


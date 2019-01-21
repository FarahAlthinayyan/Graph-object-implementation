// CPCS 324 Algorithms & Data Structures 2
// Reference starter - Basic Flow Network Package (NEW)
// 2018, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// a maximum flow implementation based on simple graph object with 
// minimal linked-list edge implementation and fields
//


var _v = [], _e = [];   // note naming convention in upload guide
var _v2 = [], _e2 = [];

// -----------------------------------------------------------------------
function main_graph()   
{
   
    var Fnetwork = new FNetwork();
    Fnetwork.networkGraph.label = "Figure 10.4 (Levitin, 3rd edition)";
    Fnetwork.readNetwork(_v,_e);
    document.write("GRAPH {", Fnetwork.networkGraph.label, "} ", Fnetwork.networkGraph.digraph ? "" : "UN", "DIRECTED - ", Fnetwork.networkGraph.nv, " VERTICES, ",
    Fnetwork.networkGraph.ne, " EDGES","</br>");
    Fnetwork.printNetwork();
    Fnetwork.edmondsKarp();
    document.write("<p>GRAPH {", Fnetwork.networkGraph.label, "} after applying edmonds Karp algorithm","</br>");
    Fnetwork.printNetwork();

    document.write("</br>");

    var Fnetwork1 = new FNetwork();
    Fnetwork1.networkGraph.label = "Exercise 10.2: 2b (Levitin, 3rd edition)";
    Fnetwork1.readNetwork(_v2,_e2);
    document.write("GRAPH {", Fnetwork1.networkGraph.label, "} ", Fnetwork1.networkGraph.digraph ? "" : "UN", "DIRECTED - ", Fnetwork1.networkGraph.nv, " VERTICES, ",
    Fnetwork1.networkGraph.ne, " EDGES:","</br>");
    Fnetwork1.printNetwork();
    Fnetwork1.edmondsKarp();
    document.write("<p>GRAPH {", Fnetwork1.networkGraph.label, "} after applying edmonds Karp algorithm","</br>");
    Fnetwork1.printNetwork();
  
}


// -----------------------------------------------------------------------
// network object initial requirements: support Edmonds-Karp maximum flow algorithm

function FNetwork()   
{

	// --------------------
	// student property fields next
    this.networkGraph = new Graph();
    this.networkGraph.weighted = true;
    this.networkGraph.digraph = true;
    this.src = 0;
    this.sink = 0;
    this.Nlabels = [];
	// --------------------
	// student member methods next
	
	// note following are required method names, you are not required to use all of them
	// you are required to use the name if you choose to have the method

	// accessor methods: getters
	this.edgeFlow = edgeFlowImpl;              // return (get) flow for argument edge i,j
	this.edgeCap = edgeCapImpl;                // return capacity for argument edge i,j
	this.srcVertex = srcVertexImpl;            // return source vertex (or its id, you decide)
	this.sinkVertex = sinkVertexImpl;          // return sink vertex (or its id, you decide)
	this.getFlowVal = getFlowImpl;             // return current flow *value* in network
	this.getFlow = getFlowImpl;                // return current flow as array of {u,v,flow} objects
	this.inFlow = inFlowImpl;                  // return incoming flow for argument vertex
	this.outFlow = outFlowImpl;                // return outgoing flow for argument vertex
	
	// accessor methods: setters
	this.setEdgeFlow = setEdgeFlowImpl;       // set flow on argument edge (i,j)
	this.setFlow = setFlowImpl;               // set flow to argument (including 0) for all edges 
	this.initFlow = initFlowImpl;             // reset flow to 0 for all edges
	this.setLabel = setLabelImpl;             // set network label (hide Graph code)
	
	
	// other possibly useful method names
	this.isSrc = isSrcImpl;                       // true if argument is source vertex of network      
	this.isSink = isSinkImpl;                     // true if argument is sink vertex of network
	this.isEdge = isEdgeImpl;                     // true if argument vertices form an edge ALERT belong to Graph() but leave as test to students
	this.isBackwardEdge = isBackwardEdgeImpl;     // true if argument vertices form a backward edge
	this.readNetwork = readNetworkImpl;           // input reader method
	this.printNetwork = printNetworkImpl;         // output network including current flow (reference output of final project
	this.edmondsKarp = edmondsKarpImpl;           // implement the Edmonds-Karp algorithm for maximum flow
	

}

// -----------------------------------------------------------------------
// similar to starter 8
function Vertex(v)
{
	// property fields
	
    this.label = v.label;
	this.visit = false;
    this.adjacent = new List();
    this.parent = 0;
    this.temp_label = 0;
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
    this.flow =0; 
}


// -----------------------------------------------------------------------
// similar to starter 8
function Graph()
{
    this.vert = [];
	this.nv = 0;                 // ... (complete next)
	this.ne = 0;                  
    this.digraph = false;         
    this.weighted = false;  
    this.label = ""; 
    this.adjMatrix = []; 
	this.readGraph = better_input;        
    this.addEdge = addEdgeImpl2;          
    this.printGraph = printGraphImpl; 
    this.makeAdjMatrix = makeAdjMatrixImpl2;        
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// REMOVE transitive closure and greedy packages, also related methods in Graph to prevent errors.

// flow network package


/** Apply edmonds Karp algorithm to compute the maximum flow value of a given network graph
    
    @methodOf FNetwork#
    @author Amal Balubaid
    @author Reem Alsulami
    @return {array of Integers} flow values
*/

function edmondsKarpImpl()
{
    var i , j;           //local variables

    this.initFlow();    //initialize the network flow with zero

    var src = this.srcVertex();      //source vertex

    var sink = this.sinkVertex();     //sink vertex

    var vertices = this.networkGraph.vert;   // network graph vertices

    // initialize the netowrk vertices label and parent
    for ( i=0; i < vertices.length; i++)    
    {
        vertices[i].temp_label = 0;
        vertices[i].parent = "-";
    }

    this.setLabel(src,Infinity,"-");

    //initialize Queue with the source vertex 

    var Q = new Queue();     
    Q.enqueue(src);

    //find a path from source vertex to the sink
    while(! Q.isEmpty())
    {
        i = Q.dequeue();
       
        for ( j=0; j <= sink ; j++ )
        {
            //process forward edges
            if(this.isEdge(i,j))
            {
                if( vertices[j].temp_label == 0 && vertices[j].parent == "-" )
                {
                    var xij = this.edgeFlow(i, j);
                    var uij = this.edgeCap(i, j);
                    var rij = uij - xij;
                    if (rij > 0) 
                    {
                       var lj = Math.min(vertices[i].temp_label, rij); 
                       vertices[j].temp_label = lj;
                       vertices[j].parent = i;
                       Q.enqueue(j);
                    }
                }

                //process backward edges
               if (this.isBackwardEdge(i,j))
                {
                    if( vertices[j].temp_label == 0 &&  vertices[j].parent == "-" )
                    {    
                        
                        var xji = this.edgeFlow(j, i); 
                        if (xji > 0)
                        {
                            var lj = Math.min(vertices[i].temp_label, xji); 
                            vertices[j].parent = i*-1;
                            vertices[j].temp_label = lj;
                            Q.enqueue(j); 
                        }
                        
                       
                    }
                }
            }
        }

        // set the flow values on the path from source to the sink vertex
            if(! (vertices[sink].temp_label == 0) && ! (vertices[sink].parent == "-") )
            {
                j = sink;
                while (! j == src )
                {
                    var parent = vertices[j].parent;
                    if( parent >= 0 )
                    {
                       
                        this.setEdgeFlow(parent , j , vertices[sink].temp_label);
                       
                    }
                    else
                    {
                        parent = parent * -1;
                        this.setEdgeFlow(j , parent , (vertices[sink].temp_label*-1));
                     
                    }

                   j = parent;
                }
                
                 // reinitialize the netowrk vertices label and parent
                for ( i=0; i < vertices.length; i++)
                {
                    vertices[i].temp_label = 0;
                    vertices[i].parent = "-";
                }
               
                //initialize Queue with the source vertex 
                Q = new Queue();
                this.setLabel(src,Infinity,"-");
                Q.enqueue(src); 
                
            }
           
        }
    
    //return netowk flow
    return this.getFlowVal();

    }

/** assign 0 to every edge in the network
    
    @methodOf FNetwork#
    @author Amal Balubaid
*/
function initFlowImpl()
{
    for(var i=0; i < this.nv; i++)
    {
        var u = this.gNetwork.vert[i];
        var w = u.incidentEdge();   var m = w.length;
        for(var j=0 ; j < m; j++)
        {
            w[j].edgeFlow = 0;
        }
    }
}

/** Find the src of the FNetwork and return its id
    
    @methodOf FNetwork#
    @author Amal Balubaid
    @return {Integer} src id
*/
function srcVertexImpl()
{
    for(var i=0; i < this.networkGraph.nv; i++)
    {
        for(var j=0 ; j<this.networkGraph.nv; j++)
        {
            if(this.networkGraph.adjMatrix[j][i]!=0)
            {
                break;
            }
        }
        if(j==this.networkGraph.nv)
        {
        
            return i;
 }
    }
    
}

/** Find the sink of the FNetwork and return its id
    
    @methodOf FNetwork#
    @author Amal Balubaid
    @return {Integer} sink id
*/
function sinkVertexImpl()
{
    var w, m, v, i;
    
    for ( i=0; i < this.networkGraph.nv; i++)
    {
        v = this.networkGraph.vert[i];
        w = v.incidentEdge();
        m = w.length;
    
        if (m == 0)
        {
            return i;
        }
    }
    
   
}

/** get the current flow values in the network
 @author Reem Alsulami
 @return {array of integer} flow values  */
function getFlowImpl()
{
    var v, w, m, i, k, flow = [];

    for( i=0; i < this.networkGraph.nv; i++)
    {
        v = this.networkGraph.vert[i];
        w = v.adjacentByID();
        m = w.length;

       for ( k=0; k < m; k++ )
       {
           
            flow[flow.length] = w[k].flow;

       }
    }
    

    return flow;
}

/** check if the given vertex is a network source or not
 @author Reem Alsulami
  @param {integer} the ID of the vertex
 @return {boolean} true if the vertex is a network source, otherwise false. */
function isSrcImpl(v_i)
{
    var i, w, m, j, v, isSrc = false;

    for ( i=0; i < this.networkGraph.nv; i++ )
    {
        v = this.networkGraph.vert[i];
        w = v.incidentEdge();
        m = w.length;

        for ( k =0; k < m; k++ )
        {
            if( w[k].adjVert_i == v_i )
            {
                isSrc = true;
            }
        }
    }

    if (! isSrc )
    {
        return true;
    }
    else return false;

}


/** compute the flow incoming flow for argument vertex
 @author Reem Alsulami
 @param {integer} the ID of the argument vertex
 @return {Integer} the flow incoming flow for argument vertex */
function inFlowImpl(v_i)
{
    var v, m, w, k, inFlow = 0;
    v = this.networkGraph.vert[v_i];
    w = v.adjacentByID();
    m = w.length;

    for ( k =0; k < m; k++ )
    {
        inFlow += w[k].flow;
    }

    return inFlow;
}

/**
 return the Capacity between two vertices i and j (edge capacity)
 
 @methodOf FNetwork#
 
 @author Rahaf Alsulami
 @param {integer} the ID of the first vertex (i)
 @param {integer} the ID of the second vertex (j)
 @returns {integer} Capacity
 */
function edgeCapImpl(i,j)
{
    var v, w, m, k;

    v = this.networkGraph.vert[i];
    w = v.incidentEdge();
    m = w.length;

   for ( k=0; k < m; k++ )
  {
      if ( w[k].adjVert_i == j )
      {
            return w[k].edgeWeight;
      }
        
  }
}


/** compute the flow outgoing flow for argument vertex
 @author Reem Alsulami
 @param {integer} the ID of the argument vertex
 @return {Integer} the flow outgoing flow for argument vertex */
function outFlowImpl(v_i)
{
    var i, w, m, j, v, outFlow = 0;

    for ( i=0; i < this.networkGraph.nv; i++ )
    {
        v = this.networkGraph.vert[i];
        w = v.adjacentByID();
        m = w.length;

        for ( k =0; k < m; k++ )
        {
            if( w[k].target_v == v_i )
            {
                outFlow += w[k].flow;
            }
        }
    }
    return outFlow;
}


/** get the flow value on the edge between vertex i and j
 @author Reem Alsulami
 @param {integer} the ID of the first argument vertex
 @param {integer} the ID of the second argument vertex
 @return {Integer} the flow value on the edge between vertex i and j*/
function edgeFlowImpl(i,j)
{
    var v, w, m, k;

    v = this.networkGraph.vert[i];
    w = v.adjacentByID();
    m = w.length;

    for ( k=0; k < m; k++ )
    {
       if ( w[k].target_v == j )
       {
            return w[k].flow;
       }
        
    }
}

function setFlowImpl()
{
   
}

/**
 set the flow x between two vertices i and j
 
 @methodOf FNetwork#
 
 @author Rahaf Alsulami 
 
 @param {integer} the ID of the first vertex (i)
 @param {integer} the ID of the second vertex (j)
 @param {integer} the flow (x)
 
 */
function setEdgeFlowImpl(i,j,flow)
{
    var v, w, m, k;

    v = this.networkGraph.vert[i];
    w = v.adjacentByID();
    m = w.length;

   for ( k=0; k < m; k++ )
   {
      if ( w[k].target_v == j )
      { 
            w[k].flow = w[k].flow + flow;
      }
        
   }
}

/**
    set label to specific vertex with flow, parent and set sign (+) for forward and (-) for backward

    @methodOf FNetwork#

    @author Rahaf Alsulami
    @param {integer} (vert_i) ID of the vertex
    @param {integer} flow (l)
    @param {integer} (i) the parent of that vertex
   
*/
function setLabelImpl(i,l,p)
{
    this.networkGraph.vert[i].temp_label = l;
    this.networkGraph.vert[i].parent = p;
}


/** read network graph
@author Rahaf almotery */
function readNetworkImpl(v,e)
{
    this.networkGraph.readGraph(v,e);
    this.networkGraph.makeAdjMatrix();
}


/** check if the given vertex is a network sink or not
 @author Reem Alsulami
 @return {boolean} true if the vertex is a network sink, otherwise false. */
function isSinkImpl(v_i)
{
    var w, m, v;

   
        v = this.networkGraph.vert[v_i];
        w = v.incidentEdge();
        m = w.length;

        if (m == 0)
        {
            return true;
        }
        else 
        {
            return false;
        }
}

/**
check if is edge from vertex i to j
 
 @methodOf FNetwork#
 
 @author Rahaf Alsulami
 @param {integer} the ID of the first vertex (i)
 @param {integer} the ID of the second vertex (j)
 @returns {boolean} true if the is edge from vertex i to j
 */
function isEdgeImpl(i,j)
{
    return ( ! this.networkGraph.adjMatrix[i,j] == 0 )
}


/**
check if is edge from vertex j to i
 
 @methodOf FNetwork#
 
 @author Rahaf Alsulami
 @param {integer} the ID of the first vertex (i)
 @param {integer} the ID of the second vertex (j)
 @returns {boolean} true if the is edge from vertex j to i
 */
function isBackwardEdgeImpl(i,j)
{
    return ( ! this.networkGraph.adjMatrix[j,i] == 0 )
}

/** print network graph
@author Rahaf almotery */
function printNetworkImpl()
{
    var i, w, m, j, v;

    for ( i=0; i < this.networkGraph.nv; i++ )
    {
        v = this.networkGraph.vert[i];
        w = v.adjacent.traverse();
        m = w.length;

        document.write(i," {",v.label,"} ");

        for ( k =0; k < m; k++ )
        {
            document.write(i,"-",w[k].target_v,"  ",w[k].weight,"  ",w[k].flow,"  ", k != m-1 ? ",  ": "");
        }
        document.write("</br>");
    }
}

// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// similar to starter 8 (strip line comments, leave outline)
// no JSDOC comments in this section
// -----------------------------------------------------------------------


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
function list_vert() 
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

function adjacentByIdImpl()
{
    return this.adjacent.traverse();
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
            edgeWeight: w[i].weight,
            flow : w[i].flow
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

function makeAdjMatrixImpl2()
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
        w = v.incidentEdge();
        m = w.length;
        for (k = 0; k < m; k++)
        {
            this.adjMatrix[i][w[k].adjVert_i] = (this.weighted) ? w[k].edgeWeight : 1;
        }

    }
}



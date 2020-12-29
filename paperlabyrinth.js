class Node {
    constructor(index, y, x, value) {
        this.index = index;
        this.y = y;
        this.x = x;
        this.value = value;
        this.distance;
    }
}

//Differences usage of nodes and vertex: Node is the object, Vertex is the index used to create the graph, which refers to the object Node
class Labyrinth {
    constructor(){
        this.indexAlice;
        this.indexRabbit;
        this.nodeList = [];
        this.adjacencyList = [];
        this.distanceToRabbit;
        this.distanceFromRabbit;
    }
    
    setIndexAlice(x, y) {
        const findNode = node => node.x === x && node.y === y;
        this.indexAlice = this.nodeList.find(findNode).index;
    }
    setIndexRabbit(x, y) {
        const findNode = node => node.x === x && node.y === y;
        this.indexRabbit = this.nodeList.find(findNode).index;
    }
    
    addNode(node, index){
        if (!this.nodeList[index]) this.nodeList[index] = node;
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    
    initializeLabyrinth(xr, yr, xs, ys) {
        this.connectLabyrinth();
        this.setIndexRabbit(xr, yr);
        this.setIndexAlice(xs, ys);
    }
    
    connectLabyrinth(){
        const possibleDirections = {
            1:['right', 'left', 'up'],
            2:['right', 'down','up'],
            4:['right','left','down'],
            8:['left','down','up']
        };
        //.A For every node of nodeList
        this.nodeList.forEach(node=>{
            //  1. Calculate where the connections are for the node
            //      a. From value, substract 8 if it remains positive
            //          -then 4, if possible
            //          -then 2, if possible
            //          -then 1, if possible
            //      b. Keep track of what you substracted, by storing the integers in an array, directionList
            //      c. Replace each value in the directionList, by the possibilites right, down etc.
            //      d. Reduce the directionList, by finding the intersection/overlap of each two arrays
            //          -directionList.reduce(array1.filter(value => array2.includes(value))
            let binaryList = [8, 4, 2, 1];
            let directionList = [];
            let value = node.value;
            while (value > 0){
                let substraction = binaryList.shift();
                if(value - substraction >= 0){
                    value -= substraction;
                    directionList.push(possibleDirections[substraction]);
                }
            }
            let edgeList = directionList.reduce((totalArray, currentArray) => totalArray.filter(value => currentArray.includes(value)));
            //  3. For every edge in edgeList
            //      a. Search the the node that the edge connects to
            //          -By searching the corresponding x y coordinates
            //      b. Make the connection between node and foundNode
            let x = 0;
            let y = 0;
            let foundNode;
            const findNode = node => node.x === x && node.y === y;
            edgeList.forEach(edge => {
                switch(edge) {
                    case 'left':
                        x = node.x - 1;
                        y = node.y;
                        foundNode = this.nodeList.find(findNode);
                        this.addEdge(node.index, foundNode.index);
                        break;
                    case 'right':
                        x = node.x + 1;
                        y = node.y;
                        foundNode = this.nodeList.find(findNode);
                        this.addEdge(node.index, foundNode.index);
                        break;
                    case 'up':
                        x = node.x;
                        y = node.y - 1;
                        foundNode = this.nodeList.find(findNode);
                        this.addEdge(node.index, foundNode.index);
                        break;
                    default:
                        x = node.x;
                        y = node.y + 1;
                        foundNode = this.nodeList.find(findNode);
                        this.addEdge(node.index, foundNode.index);
                }
            });
        });
        
        
    }
    
    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
    }
    
    findDiameter() {
        let nodes = Object.keys(this.adjacencyList);
        let potentialDiameters = [];
        for (let node of nodes) {
            node = parseInt(node);
            potentialDiameters.push(this.bfs(node));
        }
        return this.findMin(potentialDiameters);
    }
    calcDistances(){
        return `${labyrinth.bfs(this.indexAlice, this.indexRabbit)} ${labyrinth.bfs(this.indexRabbit, this.indexAlice)}`;
    }
    
    bfs(rootVertex, destinationVert) {
        //1 Start with root to the quee
        //1.1  Set parent to null;
        //1.2  Set distance to 0
        //1.3  Incr distance
        //1.4  Start BFS specific
        let visited = {};
        let queue = [];
        let rootNode = this.nodeList[rootVertex];
        rootNode.distance = 0;
        queue.push(rootVertex);
        while(queue.length > 0) {
            this._bfsUtil(visited, queue);
        }
        return this.nodeList[destinationVert].distance;
    }
    
    _bfsUtil(visited, queue) {
        //1 For each child
        //  2 Set parent
        //  3 Set distance, which is the distance of the parent + 1
        //  4 Add child to queue
        let parent = queue[0];
        let distance = this.nodeList[parent].distance + 1;
        this.adjacencyList[parent].forEach(child => {
            if(!visited[child] && !queue.includes(child)) {
                let childNode = this.nodeList[child];
                childNode.distance = distance;
                queue.push(child);
            }
        });
        visited[parent] = true;
        queue.shift();
    }
    
}

const [xs, ys] = readline().split(' ').map(Number);
const [xr, yr] = readline().split(' ').map(Number);
const [w, h] = readline().split(' ').map(Number);

const convertHexadecimal = hexadecimal => parseInt(hexadecimal, 16);
let nodeList = [];
let labyrinth = new Labyrinth();
let index = 0;
for (let y = 0; y < h; y++) {
    let row = readline().split('').map(convertHexadecimal);
    for(let x = 0; x < w; x++){
        labyrinth.addNode(new Node(index, y, x, row[x]), index);
        labyrinth.addVertex(index);
        index++;
    }
}

labyrinth.initializeLabyrinth(xr, yr, xs, ys);
console.log(labyrinth.calcDistances());
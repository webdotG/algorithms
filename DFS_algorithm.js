function dfs(graph, start) {
    // Создаём граф как список смежности
    const adjList = {};
    graph.forEach(([from, to]) => {
        if (!adjList[from]) adjList[from] = [];
        if (!adjList[to]) adjList[to] = [];
        adjList[from].push(to);
        adjList[to].push(from); // Для неориентированного графа
    });

    const visited = new Set();
    const result = [];

    function dfsRecursive(node) {
        visited.add(node);
        result.push(node);
        
        if (adjList[node]) {
            adjList[node].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    dfsRecursive(neighbor);
                }
            });
        }
    }

    if (!adjList[start]) {
        throw new Error('Стартовая вершина не найдена в графе');
    }

    dfsRecursive(start);
    return result;
}
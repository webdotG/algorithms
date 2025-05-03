function dijkstra(graph, start, end) {
    // Создаём граф как список смежности
    const adjList = {};
    graph.forEach(([from, to, weight]) => {
        if (!adjList[from]) adjList[from] = [];
        if (!adjList[to]) adjList[to] = [];
        adjList[from].push({ node: to, weight });
    });

    // Инициализация
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();
    
    for (let node in adjList) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    // Основной цикл
    while (!pq.isEmpty()) {
        const { node: current } = pq.dequeue();
        
        if (current === end) break;

        adjList[current].forEach(neighbor => {
            const alt = distances[current] + neighbor.weight;
            
            if (alt < distances[neighbor.node]) {
                distances[neighbor.node] = alt;
                previous[neighbor.node] = current;
                pq.enqueue(neighbor.node, alt);
            }
        });
    }

    // Восстановление пути
    const path = [];
    let current = end;
    while (current !== null) {
        path.push(current);
        current = previous[current];
    }
    path.reverse();

    if (distances[end] === Infinity) {
        return { path: [], distance: null };
    }

    return { path, distance: distances[end] };
}

// Приоритетная очередь (min-heap)
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(node, priority) {
        this.values.push({ node, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}
export function breadthFirstSearch(graph, start, target) {
    // Создаём граф как список смежности
    const adjList = {};
    graph.forEach(([from, to]) => {
        if (!adjList[from]) adjList[from] = [];
        if (!adjList[to]) adjList[to] = [];
        adjList[from].push(to);
        adjList[to].push(from); // Для неориентированного графа
    });

    // Проверка существования вершин
    if (!adjList[start] || !adjList[target]) {
        throw new Error('Начальная или конечная вершина не найдена в графе');
    }

    // Инициализация
    const queue = [start];
    const visited = new Set([start]);
    const previous = { [start]: null };

    // Основной цикл
    while (queue.length > 0) {
        const current = queue.shift();
        
        if (current === target) {
            // Восстанавливаем путь
            const path = [];
            let node = target;
            while (node !== null) {
                path.push(node);
                node = previous[node];
            }
            return path.reverse();
        }

        if (adjList[current]) {
            adjList[current].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                    previous[neighbor] = current;
                }
            });
        }
    }

    return []; // Путь не найден
}
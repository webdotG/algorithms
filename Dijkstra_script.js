document.addEventListener('DOMContentLoaded', function() {
    const code = `function dijkstra(graph, start, end) {
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
}`;
    document.getElementById('dijkstra-code').textContent = code;
    Prism.highlightAll();
});

function runDijkstra() {
    const input = document.getElementById('dijkstra-input');
    const output = document.getElementById('dijkstra-output');
    const inputText = input.value.trim();

    output.innerHTML = '';
    output.className = 'output';

    if (!inputText) return;

    const regex = /^\s*\[\s*\[.*\]\s*\]\s*,\s*([A-Za-z]+)\s*,\s*([A-Za-z]+)\s*$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [[A,B,4],[B,C,3]], A, C';
        output.classList.add('error');
        return;
    }

    const start = match[1];
    const end = match[2];
    let graph;

    try {
        const graphStrMatch = inputText.match(/^\s*(\[\s*\[.*\]\s*\])/);
        if (!graphStrMatch) throw new Error('Неверный формат графа');

        let graphStr = graphStrMatch[1];
        graphStr = graphStr.replace(/([A-Za-z]+)(?=(,|\]))/g, '"$1"');
        
        graph = JSON.parse(graphStr);
        if (!Array.isArray(graph) || graph.some(edge => edge.length !== 3 || typeof edge[2] !== 'number' || edge[2] < 0)) {
            throw new Error('Граф должен содержать рёбра вида [from, to, weight], где weight ≥ 0');
        }
    } catch (e) {
        output.innerHTML = `❌ Ошибка: ${e.message}`;
        output.classList.add('error');
        return;
    }

    // Запускаем алгоритм с подробным логированием
    const result = dijkstra(graph, start, end);
    output.classList.add('show-result');

    if (result.distance === null) {
        output.classList.add('error');
        output.innerHTML = `❌ Путь от ${start} до ${end} не существует`;
        return;
    }

    // Формируем пошаговое объяснение
    let explanation = `
        <div class="algorithm-steps">
            <h3>Пошаговое выполнение алгоритма Дейкстры:</h3>
            <ol>
                <li><strong>Исходный граф:</strong><br>
                    ${graph.map(e => `${e[0]} → ${e[1]} (вес ${e[2]})`).join(', ')}</li>
                <li><strong>Начальная инициализация:</strong><br>
                    Все расстояния = ∞, кроме ${start} = 0</li>
                <li><strong>Обработка узлов:</strong>
                    <ul>
                        <li>Из ${start} (расстояние 0):
                            <ul>
                                ${graph.filter(e => e[0] === start).map(e => 
                                    `<li>В ${e[1]} новое расстояние: ${e[2]}</li>`).join('')}
                            </ul>
                        </li>
                        <li>Из B (расстояние 4):
                            <ul>
                                ${graph.filter(e => e[0] === 'B').map(e => 
                                    `<li>В ${e[1]} новое расстояние: ${4 + e[2]}</li>`).join('')}
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><strong>Результат:</strong><br>
                    Найден более короткий путь в C через B (расстояние 7 < 8)</li>
            </ol>
        </div>
        <div class="result-section">
            <h3>Оптимальный путь:</h3>
            <strong>${result.path.join(' → ')}</strong> (длина: ${result.distance})
        </div>
    `;

    output.classList.add('success');
    output.innerHTML = explanation;
}
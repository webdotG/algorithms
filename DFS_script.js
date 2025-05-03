document.addEventListener('DOMContentLoaded', function() {
    const code = `function dfs(graph, start) {
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

    dfsRecursive(start);
    return result;
}`;
    document.getElementById('dfs-code').textContent = code;
    Prism.highlightAll();
});

function runDFS() {
    const input = document.getElementById('dfs-input');
    const output = document.getElementById('dfs-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output';

    // Если поле пустое, выходим
    if (!inputText) return;

    // Проверка формата: [[from,to],...], start
    const regex = /^\s*\[\s*\[.*\]\s*\]\s*,\s*([A-Za-z]+)\s*$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [[A,B],[A,C]], A';
        output.classList.add('error');
        return;
    }

    const start = match[1];
    let graph;

    // Преобразуем входные данные в корректный JSON
    try {
        // Извлекаем часть с графом
        const graphStrMatch = inputText.match(/^\s*(\[\s*\[.*\]\s*\])/);
        if (!graphStrMatch) throw new Error('Неверный формат графа');

        let graphStr = graphStrMatch[1];
        // Заменяем неэкранированные буквы на экранированные строки
        graphStr = graphStr.replace(/([A-Za-z]+)(?=(,|\]))/g, '"$1"');
        
        // Парсим граф
        graph = JSON.parse(graphStr);
        if (!Array.isArray(graph) || graph.some(edge => edge.length !== 2 || typeof edge[0] !== 'string' || typeof edge[1] !== 'string')) {
            throw new Error('Граф должен содержать рёбра вида [from, to]');
        }
    } catch (e) {
        output.innerHTML = `❌ Ошибка: неверный формат графа (${e.message})`;
        output.classList.add('error');
        return;
    }

    // Запускаем алгоритм
    try {
        const result = dfs(graph, start);
        output.classList.add('show-result');
        output.classList.add('success');
        output.innerHTML = `✅ Порядок обхода: <strong>${result.join(' -> ')}</strong>`;
    } catch (e) {
        output.classList.add('error');
        output.innerHTML = `❌ Ошибка: ${e.message}`;
    }
}
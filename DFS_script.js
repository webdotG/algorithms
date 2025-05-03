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

    output.innerHTML = '';
    output.className = 'output';

    if (!inputText) return;

    const regex = /^\s*\[\s*\[.*\]\s*\]\s*,\s*([A-Za-z]+)\s*$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [[A,B],[A,C]], A';
        output.classList.add('error');
        return;
    }

    const start = match[1];
    let graph;

    try {
        const graphStrMatch = inputText.match(/^\s*(\[\s*\[.*\]\s*\])/);
        if (!graphStrMatch) throw new Error('Неверный формат графа');

        let graphStr = graphStrMatch[1];
        graphStr = graphStr.replace(/([A-Za-z]+)(?=(,|\]))/g, '"$1"');
        
        graph = JSON.parse(graphStr);
        if (!Array.isArray(graph) || graph.some(edge => edge.length !== 2)) {
            throw new Error('Граф должен содержать рёбра вида [from, to]');
        }
    } catch (e) {
        output.innerHTML = `❌ Ошибка: ${e.message}`;
        output.classList.add('error');
        return;
    }

    // Запускаем алгоритм с подробным объяснением
    const result = dfs(graph, start);
    output.classList.add('show-result');

    // Формируем пошаговое объяснение
    let explanation = `
        <div class="algorithm-steps">
            <h3>Пошаговое выполнение DFS (Depth-First Search):</h3>
            <ol>
                <li><strong>Исходный граф:</strong><br>
                    ${graph.map(e => `${e[0]} — ${e[1]}`).join(', ')}</li>
                
                <li><strong>Список смежности:</strong><br>
                    ${JSON.stringify(buildAdjList(graph), null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}</li>
                
                <li><strong>Обход начинается с узла ${start}:</strong>
                    <ul>
                        ${generateDFSSteps(graph, start).join('')}
                    </ul>
                </li>
            </ol>
        </div>
        
        <div class="result-section">
            <h3>Порядок обхода:</h3>
            <strong>${result.join(' → ')}</strong>
        </div>
    `;

    output.classList.add('success');
    output.innerHTML = explanation;
}

// Вспомогательные функции
function buildAdjList(graph) {
    const adjList = {};
    graph.forEach(([from, to]) => {
        if (!adjList[from]) adjList[from] = [];
        if (!adjList[to]) adjList[to] = [];
        adjList[from].push(to);
        adjList[to].push(from);
    });
    return adjList;
}

function generateDFSSteps(graph, start) {
    const steps = [];
    const adjList = buildAdjList(graph);
    const visited = new Set();
    const stack = [[start, 0, true]];
    
    while (stack.length > 0) {
        const [node, depth, isNew] = stack.pop();
        
        if (isNew) {
            if (visited.has(node)) continue;
            
            visited.add(node);
            steps.push(`<li>Посещаем <strong>${node}</strong> (глубина ${depth})</li>`);
            
            // Добавляем обратно в стек с флагом false
            stack.push([node, depth, false]);
            
            // Добавляем соседей в обратном порядке (для правильного порядка обхода)
            const neighbors = [...adjList[node]].reverse();
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    stack.push([neighbor, depth + 1, true]);
                }
            }
        } else {
            steps.push(`<li>Возвращаемся из <strong>${node}</strong> (глубина ${depth})</li>`);
        }
    }
    
    return steps;
}
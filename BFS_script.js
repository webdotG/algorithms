document.addEventListener('DOMContentLoaded', function() {
    const code = `function breadthFirstSearch(graph, start, target) {
    // Создаём граф как список смежности
    const adjList = {};
    graph.forEach(([from, to]) => {
        if (!adjList[from]) adjList[from] = [];
        if (!adjList[to]) adjList[to] = [];
        adjList[from].push(to);
        adjList[to].push(from); // Для неориентированного графа
    });

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
}`;
    document.getElementById('bfs-code').textContent = code;
    Prism.highlightAll();
});

function runBFS() {
    const input = document.getElementById('bfs-input');
    const output = document.getElementById('bfs-output');
    const inputText = input.value.trim();

    output.innerHTML = '';
    output.className = 'output';

    if (!inputText) return;

    const regex = /^\s*\[\s*\[.*\]\s*\]\s*,\s*([\wа-яА-Я]+)\s*,\s*([\wа-яА-Я]+)\s*$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [[Вы,Алиса],[Вы,Боб]], Вы, Том';
        output.classList.add('error');
        return;
    }

    const start = match[1];
    const target = match[2];
    let graph;

    try {
        const graphStrMatch = inputText.match(/^\s*(\[\s*\[.*\]\s*\])/);
        if (!graphStrMatch) throw new Error('Неверный формат графа');

        let graphStr = graphStrMatch[1];
        graphStr = graphStr.replace(/([\wа-яА-Я]+)(?=(,|\]))/g, '"$1"');
        
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
    const result = breadthFirstSearch(graph, start, target);
    output.classList.add('show-result');

    if (result.length === 0) {
        output.classList.add('error');
        output.innerHTML = `❌ Путь от <strong>${start}</strong> до <strong>${target}</strong> не существует`;
        return;
    }

    // Формируем пошаговое объяснение
    let explanation = `
        <div class="algorithm-steps">
            <h3>Пошаговое выполнение BFS (Breadth-First Search):</h3>
            <ol>
                <li><strong>Исходный граф социальных связей:</strong><br>
                    ${graph.map(e => `${e[0]} знаком с ${e[1]}`).join(', ')}</li>
                
                <li><strong>Список смежности:</strong><br>
                    ${JSON.stringify(buildAdjList(graph), null, 2).replace(/\n/g, '<br>').replace(/ /g, ' ')}</li>
                
                <li><strong>Поиск пути от "${start}" до "${target}":</strong>
                    <ul>
                        ${generateBFSSteps(graph, start, target).join('')}
                    </ul>
                </li>
            </ol>
        </div>
        
        <div class="result-section">
            <h3>Кратчайший путь в социальных связях:</h3>
            <strong>${result.join(' → ')}</strong> (${result.length-1} шагов)
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

function generateBFSSteps(graph, start, target) {
    const steps = [];
    const adjList = buildAdjList(graph);
    const visited = new Set([start]);
    const queue = [start];
    const previous = { [start]: null };
    let level = 0;
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        steps.push(`<li>Уровень ${level}: ${queue.join(', ')}</li>`);
        
        for (let i = 0; i < levelSize; i++) {
            const current = queue.shift();
            
            if (current === target) {
                steps.push(`<li style="color:green">Нашли цель "${target}" на уровне ${level}</li>`);
                return steps;
            }

            adjList[current]?.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    previous[neighbor] = current;
                    queue.push(neighbor);
                    steps.push(`<li>  Добавляем "${neighbor}" (через "${current}")</li>`);
                }
            });
        }
        level++;
    }
    
    return steps;
}
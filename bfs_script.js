document.addEventListener('DOMContentLoaded', function() {
    const bfsCode = `function breadthFirstSearch(graph, start, target) {
    const queue = [start];
    const visited = new Set([start]);
    const parent = { [start]: null };

    while (queue.length > 0) {
        const current = queue.shift();

        if (current === target) {
            const path = [];
            let node = target;
            while (node !== null) {
                path.unshift(node);
                node = parent[node];
            }
            return path;
        }

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                parent[neighbor] = current;
            }
        }
    }

    return null;
}`;
    
    document.getElementById('bfs-code').textContent = bfsCode;
    Prism.highlightAll();
});

function runBFS() {
    const input = document.getElementById('bfs-input');
    const output = document.getElementById('bfs-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output';

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Проверка формата
    const regex = /^([^,]+)\s*,\s*([^,]+)$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат "вы, Том"';
        output.classList.add('error');
        return;
    }

    const start = match[1].trim();
    const target = match[2].trim();

    // Граф (социальная сеть)
    const graph = {
        'вы': ['Алиса', 'Боб'],
        'Алиса': ['Клэр'],
        'Боб': ['Клэр', 'Джон'],
        'Клэр': ['Том'],
        'Джон': ['Том'],
        'Том': []
    };

    // Проверка, есть ли вершины в графе
    if (!graph[start] || !Object.keys(graph).includes(target)) {
        output.innerHTML = `❌ Ошибка: вершина "${start}" или "${target}" не найдена в графе`;
        output.classList.add('error');
        return;
    }

    // Запускаем BFS
    const result = breadthFirstSearch(graph, start, target);

    // Форматируем вывод
    output.classList.add('show-result');
    if (!result) {
        output.classList.add('error');
        output.innerHTML = `❌ Путь от <strong>${start}</strong> к <strong>${target}</strong> не найден`;
    } else {
        output.classList.add('success');
        output.innerHTML = `✅ Найден путь: <strong>${result.join(' → ')}</strong>`;
    }
}

function breadthFirstSearch(graph, start, target) {
    const queue = [start];
    const visited = new Set([start]);
    const parent = { [start]: null };

    while (queue.length > 0) {
        const current = queue.shift();

        if (current === target) {
            const path = [];
            let node = target;
            while (node !== null) {
                path.unshift(node);
                node = parent[node];
            }
            return path;
        }

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                parent[neighbor] = current;
            }
        }
    }

    return null;
}
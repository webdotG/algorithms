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

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output';

    // Если поле пустое, выходим
    if (!inputText) return;

    // Проверка формата: [[from,to],...], start, target
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

    // Преобразуем входные данные в корректный JSON
    try {
        // Извлекаем часть с графом
        const graphStrMatch = inputText.match(/^\s*(\[\s*\[.*\]\s*\])/);
        if (!graphStrMatch) throw new Error('Неверный формат графа');

        let graphStr = graphStrMatch[1];
        // Заменяем неэкранированные слова на экранированные строки
        graphStr = graphStr.replace(/([\wа-яА-Я]+)(?=(,|\]))/g, '"$1"');
        
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
        const result = breadthFirstSearch(graph, start, target);
        output.classList.add('show-result');
        if (result.length === 0) {
            output.classList.add('error');
            output.innerHTML = `❌ Путь от <strong>${start}</strong> до <strong>${target}</strong> не существует`;
        } else {
            output.classList.add('success');
            output.innerHTML = `✅ Найден путь: <strong>${result.join(' -> ')}</strong>`;
        }
    } catch (e) {
        output.classList.add('error');
        output.innerHTML = `❌ Ошибка: ${e.message}`;
    }
}
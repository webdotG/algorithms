document.addEventListener('DOMContentLoaded', function() {
    const code = `// Поиск в массиве
function findKeyInArray(box) {
    if (typeof box === 'string') {
        if (box.toLowerCase().includes('key')) {
            return { 
                found: true, 
                message: \`🔑 Нашли ключ в \${box}!\`,
                box: box 
            };
        }
        return { found: false };
    }
    
    if (Array.isArray(box)) {
        for (const innerBox of box) {
            const result = findKeyInArray(innerBox);
            if (result.found) {
                return result;
            }
        }
    }
    
    return { found: false };
}

// Поиск в объекте
function findKeyInObject(box) {
    if (box.isKey) {
        return { 
            found: true, 
            message: \`🔑 Нашли ключ в \${box.name}!\`,
            box: box 
        };
    }
    
    for (const innerBox of box.innerBoxes) {
        const result = findKeyInObject(innerBox);
        if (result.found) {
            return result;
        }
    }
    
    return { found: false };
}`;

    document.getElementById('recursive-code').textContent = code;
    Prism.highlightAll(); // Активируем подсветку синтаксиса

    // Обновление плейсхолдера при смене типа структуры
    document.getElementById('structure-type').addEventListener('change', function() {
        const input = document.getElementById('recursive-input');
        if (this.value === 'array') {
            input.placeholder = '["Коробка 1", ["Коробка 2 key"]]';
        } else {
            input.placeholder = '{"name":"Коробка 1","isKey":false,"innerBoxes":[{"name":"Коробка 2","isKey":false,"innerBoxes":[{"name":"Коробка 3","isKey":true,"innerBoxes":[]}]}]}';
        }
    });
});

function runRecursiveSearch() {
    const input = document.getElementById('recursive-input');
    const output = document.getElementById('recursive-output');
    const structureType = document.getElementById('structure-type').value;
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output'; // Сбрасываем классы

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Парсим введенные данные
    let data;
    try {
        data = JSON.parse(inputText);
    } catch (e) {
        output.innerHTML = '❌ Ошибка: неверный формат JSON';
        output.classList.add('error');
        return;
    }

    // Запускаем поиск в зависимости от типа структуры
    let result;
    if (structureType === 'array') {
        if (!Array.isArray(data)) {
            output.innerHTML = '❌ Ошибка: ожидается массив';
            output.classList.add('error');
            return;
        }
        result = findKeyInArray(data);
    } else {
        if (!data || typeof data !== 'object' || !('name' in data && 'isKey' in data && 'innerBoxes' in data)) {
            output.innerHTML = '❌ Ошибка: объект должен содержать поля name, isKey и innerBoxes';
            output.classList.add('error');
            return;
        }
        result = findKeyInObject(data);
    }

    // Форматируем вывод
    output.classList.add('show-result');
    if (result.found) {
        output.classList.add('success');
        output.innerHTML = result.message;
    } else {
        output.classList.add('error');
        output.innerHTML = '❌ Ключ не найден!';
    }
}
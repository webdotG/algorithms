document.addEventListener('DOMContentLoaded', function() {
    const code = `function findKeyInArray(box) {
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
}`;

    document.getElementById('recursive-code').textContent = code;
});

function runRecursiveSearch() {
    const input = document.getElementById('recursive-input');
    const output = document.getElementById('recursive-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output'; // Сбрасываем классы

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Парсим введенный массив
    let arr;
    try {
        arr = JSON.parse(inputText);
        if (!Array.isArray(arr)) throw new Error('Введено не массив');
    } catch (e) {
        output.innerHTML = '❌ Ошибка: неверный формат массива. Используйте формат: ["Коробка 1", ["Коробка 2 key"]]';
        output.classList.add('error');
        return;
    }

    // Запускаем поиск
    const result = findKeyInArray(arr);

    // Форматируем вывод
    output.classList.add('show-result');
    if (result.found) {
        output.classList.add('success');
        output.innerHTML = result.message;
    } else {
        output.classList.add('error');
        output.innerHTML = '❌ Ключ не найден в массиве!';
    }
}
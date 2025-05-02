document.addEventListener('DOMContentLoaded', function() {
    const code = `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    
    return arr;
}`;

    document.getElementById('selection-sort-code').textContent = code;
    Prism.highlightAll(); // Активируем подсветку синтаксиса
});

function runSelectionSort() {
    const input = document.getElementById('selection-sort-input');
    const output = document.getElementById('selection-sort-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output'; // Сбрасываем классы

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Парсим введенные данные
    let arr;
    try {
        arr = JSON.parse(inputText);
        if (!Array.isArray(arr) || !arr.every(num => typeof num === 'number')) {
            output.innerHTML = '❌ Ошибка: ожидается массив чисел';
            output.classList.add('error');
            return;
        }
    } catch (e) {
        output.innerHTML = '❌ Ошибка: неверный формат JSON';
        output.classList.add('error');
        return;
    }

    // Выполняем сортировку
    const result = selectionSort(arr);

    // Форматируем вывод
    output.classList.add('show-result');
    output.classList.add('success');
    output.innerHTML = `✅ Отсортированный массив: [${result.join(', ')}]`;
}
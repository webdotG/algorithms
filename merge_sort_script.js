document.addEventListener('DOMContentLoaded', function() {
    const code = `function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}`;

    document.getElementById('merge-sort-code').textContent = code;
    Prism.highlightAll(); // Активируем подсветку синтаксиса
});

function runMergeSort() {
    const input = document.getElementById('merge-sort-input');
    const output = document.getElementById('merge-sort-output');
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
    const result = mergeSort(arr);

    // Форматируем вывод
    output.classList.add('show-result');
    output.classList.add('success');
    output.innerHTML = `✅ Отсортированный массив: [${result.join(', ')}]`;
}
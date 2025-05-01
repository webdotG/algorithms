document.addEventListener('DOMContentLoaded', function() {
    // Вставляем код алгоритма в блок
    const codeElement = document.getElementById('merge-sort-code');
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
    
    codeElement.textContent = code;
});

function runMergeSort() {
    const input = document.getElementById('merge-sort-input');
    const output = document.getElementById('merge-sort-output');
    const inputText = input.value.trim();
    
    output.innerHTML = '';
    output.className = 'output';

    try {
        // Проверяем введенные данные
        if (!inputText.startsWith('[') || !inputText.endsWith(']')) {
            throw new Error('Используйте формат: [3,1,4,2]');
        }
        
        const arr = JSON.parse(inputText);
        if (!Array.isArray(arr)) {
            throw new Error('Введите корректный массив');
        }
        
        // Выполняем сортировку
        const sortedArray = mergeSort(arr);
        
        // Форматируем вывод
        output.innerHTML = `
            <div class="result-line">Исходный : <strong>${inputText}</strong></div>
            <div class="result-line">Отсортированный : <strong>[${sortedArray.join(', ')}]</strong></div>
        `;
        output.classList.add('success');
    } catch (e) {
        output.innerHTML = `❌ Ошибка: ${e.message}`;
        output.classList.add('error');
    }
}
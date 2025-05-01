document.addEventListener('DOMContentLoaded', function() {
    // Вставляем код алгоритма в блок
    const code = `function selectionSort(arr) {
    const sortedArr = [...arr];
    
    for (let i = 0; i < sortedArr.length - 1; i++) {
        let minIndex = i;
        
        // Ищем минимальный элемент
        for (let j = i + 1; j < sortedArr.length; j++) {
            if (sortedArr[j] < sortedArr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Меняем местами
        [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
    }
    
    return sortedArr;
}`;
    document.getElementById('selection-sort-code').textContent = code;
});

function runSelectionSort() {
    const input = document.getElementById('selection-sort-input');
    const output = document.getElementById('selection-sort-output');
    const inputText = input.value.trim();
    
    output.innerHTML = '';
    output.className = 'output';

    try {
        const arr = JSON.parse(inputText);
        if (!Array.isArray(arr)) throw new Error('Введите корректный массив');
        
        const sortedArray = selectionSort(arr);
        
        output.innerHTML = `
            <div class="result-line">Исходный массив: <strong>[${arr.join(', ')}]</strong></div>
            <div class="result-line">Отсортированный: <strong>[${sortedArray.join(', ')}]</strong></div>
        `;
        output.classList.add('success');
    } catch (e) {
        output.innerHTML = `❌ Ошибка: ${e.message}`;
        output.classList.add('error');
    }
}
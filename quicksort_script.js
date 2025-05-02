document.addEventListener('DOMContentLoaded', function() {
    const code = `function quickSort(arr) {
    // Базовый случай: массив с 0 или 1 элементом уже отсортирован
    if (arr.length < 2) {
        return arr;
    }
    
    // Выбираем опорный элемент (первый элемент)
    const pivot = arr[0];
    const less = [];
    const greater = [];
    
    // Разбиваем массив на элементы меньше и больше pivot
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            less.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }
    
    // Рекурсивно сортируем подмассивы и объединяем
    return [...quickSort(less), pivot, ...quickSort(greater)];
}`;
    
    document.getElementById('quick-sort-code').textContent = code;
});

function runQuickSort() {
    const input = document.getElementById('quick-sort-input');
    const output = document.getElementById('quick-sort-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output'; // Сбрасываем классы

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Проверка формата: ожидаем [числа]
    const regex = /^\[([\d\s,]*)\]$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [3, 5, 2, 1, 4]';
        output.classList.add('error');
        return;
    }

    const arrayStr = match[1];

    // Парсим массив
    let arr;
    try {
        arr = arrayStr.split(',')
            .map(item => parseInt(item.trim()))
            .filter(item => !isNaN(item));
        
        if (arr.length === 0) throw new Error();
    } catch (e) {
        output.innerHTML = '❌ Ошибка: неверный формат массива';
        output.classList.add('error');
        return;
    }

    // Запускаем быструю сортировку
    const result = quickSort(arr);

    // Форматируем вывод
    output.classList.add('show-result');
    output.classList.add('success');
    output.innerHTML = `✅ Отсортированный массив: <strong>[${result.join(', ')}]</strong>`;
}
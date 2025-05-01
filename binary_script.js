document.addEventListener('DOMContentLoaded', function() {
    const code = `function binarySearch(arr, item) {
    let low = 0
    let high = arr.length - 1

    while(low <= high) {
        const middle = Math.floor((low + high) / 2)
        const find = arr[middle]

        if(find === item) return middle

        if(find > item) {
            high = middle -1
        } else {
            low = middle + 1
        }
    }

    return null
}`;
    
    document.getElementById('binary-code').textContent = code;
});

function runBinarySearch() {
    const input = document.getElementById('binary-input');
    const output = document.getElementById('binary-output');
    const inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output'; // Сбрасываем классы

    // Если поле пустое, просто выходим
    if (!inputText) return;

    // Проверка формата
    const regex = /^\[([\d\s,]*)\]\s*,\s*(\d+)$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [1,2,3], 5';
        output.classList.add('error');
        return;
    }

    const arrayStr = match[1];
    const target = parseInt(match[2]);

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

    // Сортируем массив
    arr.sort((a, b) => a - b);

    // Запускаем поиск
    const result = binarySearch(arr, target);

    // Форматируем вывод
    output.classList.add('show-result');
    if (result === null || result === -1) {
        output.classList.add('error');
        output.innerHTML = `❌ Элемент <strong>${target}</strong> не найден в массиве: [${arr.join(', ')}]`;
    } else {
        output.classList.add('success');
        output.innerHTML = `✅ Найден элемент <strong>${target}</strong> с индексом ${result} в массиве: [${arr.join(', ')}]`;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const code = `function binarySearch(arr, item) {
    let low = 0
    let high = arr.length - 1

    while(low <= high) {
        const middle = Math.floor((low + high) / 2)
        const find = arr[middle]
        
        console.log(\`Диапазон [\${low},\${high}], средний индекс \${middle}, значение \${find}\`)

        if(find === item) return middle

        if(find > item) {
            high = middle - 1
        } else {
            low = middle + 1
        }
    }

    return null
}`;
    
    document.getElementById('binary-code').textContent = code;
    Prism.highlightAll();
});

function runBinarySearch() {
    const input = document.getElementById('binary-input');
    const output = document.getElementById('binary-output');
    const inputText = input.value.trim();

    output.innerHTML = '';
    output.className = 'output';

    if (!inputText) return;

    // Более сложный пример для демонстрации
    const complexExample = '[23,5,17,9,42,13,7,31,0,11,25,3,19,28,15], 19';
    
    // Проверка формата
    const regex = /^\[([\d\s,]*)\]\s*,\s*(\d+)$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = `❌ Ошибка: используйте формат [1,2,3], 5<br>Пример сложного массива: <code>${complexExample}</code>`;
        output.classList.add('error');
        return;
    }

    const arrayStr = match[1];
    const target = parseInt(match[2]);

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

    // Сортируем массив для бинарного поиска
    const sortedArr = [...arr].sort((a, b) => a - b);
    const result = binarySearch(sortedArr, target);

    // Формируем подробный вывод
    output.classList.add('show-result');
    if (result === null) {
        output.classList.add('error');
        output.innerHTML = `
            <div class="search-details">
                <h3>Результат поиска:</h3>
                <p>❌ Элемент <strong>${target}</strong> не найден</p>
                
                <h3>Отсортированный массив:</h3>
                <div class="array-view">[${sortedArr.join(', ')}]</div>
                
                <h3>Исходный массив:</h3>
                <div class="array-view">[${arr.join(', ')}]</div>
                
                <p class="hint">Бинарный поиск требует отсортированного массива</p>
            </div>
        `;
    } else {
        output.classList.add('success');
        output.innerHTML = `
            <div class="search-details">
                <h3>Результат поиска:</h3>
                <p>✅ Найден элемент <strong>${target}</strong> на позиции ${result}</p>
                
                <h3>Визуализация массива:</h3>
                <div class="array-view">
                    ${sortedArr.map((num, i) => 
                        `<span class="${i === result ? 'highlight' : ''}">${num}</span>`
                    ).join(', ')}
                </div>
                
                <h3>Шаги поиска:</h3>
                <ol>
                    <li>Отсортированный массив: [${sortedArr.join(', ')}]</li>
                    <li>Ищем элемент ${target}</li>
                    <li>Сначала проверяем середину массива</li>
                    <li>Сравниваем и сужаем диапазон</li>
                    <li>Найден на ${result+1}-й попытке</li>
                </ol>
            </div>
        `;
    }
}
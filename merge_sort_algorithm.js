function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Сравниваем элементы и добавляем меньший в результат
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Добавляем оставшиеся элементы
    return result
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

// Основная функция сортировки
function mergeSort(arr) {
    // Базовый случай рекурсии
    if (arr.length <= 1) {
        return arr;
    }

    // Разделяем массив на две части
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Рекурсивно сортируем и сливаем
    return merge(mergeSort(left), mergeSort(right));
}

// Пример использования (обернуто в блок, чтобы избежать redeclaration)
{
    const sampleArray = [38, 27, 43, 3, 9, 82, 10];
    console.log('До сортировки:', sampleArray);
    console.log('После сортировки:', mergeSort(sampleArray));
}
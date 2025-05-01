// Сортировка выбором (Selection Sort)
function selectionSort(arr) {
    // Создаем копию массива, чтобы не изменять оригинал
    const sortedArr = [...arr];
    
    for (let i = 0; i < sortedArr.length - 1; i++) {
        let minIndex = i;
        
        // Ищем минимальный элемент в неотсортированной части
        for (let j = i + 1; j < sortedArr.length; j++) {
            if (sortedArr[j] < sortedArr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Меняем местами с первым неотсортированным элементом
        [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
    }
    
    return sortedArr;
}

// Пример использования
const sampleArray = [64, 25, 12, 22, 11];
console.log('До сортировки:', sampleArray);
console.log('После сортировки:', selectionSort(sampleArray));


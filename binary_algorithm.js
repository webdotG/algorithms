function binarySearch(arr, item) {
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

    return -1 //null
}

const arr = [1, 3, 5, 7, 9];
console.log('бинарный алгоритм [1, 3, 5, 7, 9], 1 ',binarySearch(arr, 3)); // 1 (корректно)
console.log('бинарный алгоритм [1, 3, 5, 7, 9], 10 ',binarySearch(arr, 10)); // null или -1 (не найдено)


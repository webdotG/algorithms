//log2​n — это степень, в которую нужно возвести 2, чтобы получить n
//log2 2​50 → между 25=3225=32 и 26=6426=64 → ≈5.6 (6 шагов).
//log2​ 200 → между 27=12827=128 и 28=25628=256 → ≈7.6 (8 шагов).
// 2. Правило "делим пополам"
// Для бинарного поиска log⁡2nlog2​n — это сколько раз нужно разделить nn на 2, чтобы получить 1.
// Пример для n=100n=100:
//     100 / 2 = 50
//     50 / 2 = 25
//     25 / 2 = 12.5
//     12.5 / 2 = 6.25
//     6.25 / 2 = 3.125
//     3.125 / 2 = 1.5625
//     1.5625 / 2 = 0.78125 (меньше 1, останавливаемся)
// Итого: 7 шагов

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

    return null
}

const arr = [1, 3, 5, 7, 9];
console.log('бинарный алгоритм [1, 3, 5, 7, 9], 1 ',binarySearch(arr, 3)); // 1 (корректно)
console.log('бинарный алгоритм [1, 3, 5, 7, 9], 10 ',binarySearch(arr, 10)); // null или -1 (не найдено)


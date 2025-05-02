// document.addEventListener('DOMContentLoaded', function() {
//     const code = `class HashTable {
//     constructor() {
//         this.table = {};
//     }

//     // Простая хеш-функция (для демонстрации)
//     hash(key) {
//         let hash = 0;
//         for (let i = 0; i < key.length; i++) {
//             hash += key.charCodeAt(i);
//         }
//         return hash % 37; // Ограничиваем размер таблицы
//     }

//     // Вставка: добавляет пару ключ-значение
//     set(key, value) {
//         this.table[key] = value;
//     }

//     // Поиск: возвращает значение по ключу
//     get(key) {
//         return this.table[key] || null;
//     }

//     // Удаление: удаляет пару по ключу
//     delete(key) {
//         delete this.table[key];
//     }
// }`;
    
//     document.getElementById('hash-table-code').textContent = code;
// });

// const hashTable = new HashTable();

// function runHashTable() {
//     const input = document.getElementById('hash-table-input');
//     const output = document.getElementById('hash-table-output');
//     const inputText = input.value.trim();

//     // Очищаем предыдущий вывод
//     output.innerHTML = '';
//     output.className = 'output'; // Сбрасываем классы

//     // Если поле пустое, просто выходим
//     if (!inputText) return;

//     // Проверка формата: "операция, ключ, [значение]"
//     const parts = inputText.split(',').map(part => part.trim());
//     const operation = parts[0].toLowerCase();
//     const key = parts[1];
//     const value = parts[2];

//     // Проверка корректности ввода
//     if (!['set', 'get', 'delete'].includes(operation) || !key) {
//         output.innerHTML = '❌ Ошибка: используйте формат "set, ключ, значение", "get, ключ" или "delete, ключ"';
//         output.classList.add('error');
//         return;
//     }

//     if (operation === 'set' && value === undefined) {
//         output.innerHTML = '❌ Ошибка: для set укажите значение';
//         output.classList.add('error');
//         return;
//     }

//     // Выполняем операцию
//     try {
//         if (operation === 'set') {
//             const parsedValue = isNaN(value) ? value : parseFloat(value);
//             hashTable.set(key, parsedValue);
//             output.innerHTML = `✅ Добавлено: ключ <strong>${key}</strong>, значение <strong>${parsedValue}</strong>`;
//             output.classList.add('success');
//         } else if (operation === 'get') {
//             const result = hashTable.get(key);
//             if (result === null) {
//                 output.innerHTML = `❌ Ключ <strong>${key}</strong> не найден`;
//                 output.classList.add('error');
//             } else {
//                 output.innerHTML = `✅ Найдено: ключ <strong>${key}</strong>, значение <strong>${result}</strong>`;
//                 output.classList.add('success');
//             }
//         } else if (operation === 'delete') {
//             hashTable.delete(key);
//             output.innerHTML = `✅ Удалён ключ <strong>${key}</strong>`;
//             output.classList.add('success');
//         }
//     } catch (e) {
//         output.innerHTML = `❌ Ошибка: ${e.message}`;
//         output.classList.add('error');
//     }
// }
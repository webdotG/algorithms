document.addEventListener('DOMContentLoaded', function() {
    const code = `function greedy(classes) {
    // Сортируем по времени окончания
    const sortedClasses = classes.slice().sort((a, b) => a.end - b.end);
    const selected = [];
    let lastEnd = -Infinity;
    
    for (const cls of sortedClasses) {
        if (cls.start >= lastEnd) {
            selected.push(cls);
            lastEnd = cls.end;
        }
    }
    
    return selected;
}`;
    document.getElementById('greedy-code').textContent = code;
    Prism.highlightAll();
});
function runGreedy() {
    const input = document.getElementById('greedy-input');
    const output = document.getElementById('greedy-output');
    let inputText = input.value.trim();

    // Очищаем предыдущий вывод
    output.innerHTML = '';
    output.className = 'output';

    // Если поле пустое, выходим
    if (!inputText) return;

    // Проверка формата
    const regex = /^\s*\[\s*\{.*\}\s*\]\s*$/;
    const match = inputText.match(regex);

    if (!match) {
        output.innerHTML = '❌ Ошибка: используйте формат [{subject: "Математика", start: 9, end: 10}]';
        output.classList.add('error');
        return;
    }

    let classes;

    try {
        try {
            classes = JSON.parse(inputText);
        } catch (e) {
            inputText = inputText.replace(/(subject\s*:\s*)([^,}\s][^,}\]]*)/g, '$1"$2"');
            classes = JSON.parse(inputText);
        }
        if (!Array.isArray(classes) || classes.some(cls => 
            !cls.subject || typeof cls.subject !== 'string' || 
            typeof cls.start !== 'number' || typeof cls.end !== 'number' || 
            cls.start < 0 || cls.end <= cls.start
        )) {
            throw new Error('Неверный формат данных');
        }
    } catch (e) {
        output.innerHTML = '❌ Ошибка: проверьте синтаксис (пример: {"subject": "Математика", "start": 9, "end": 10})';
        output.classList.add('error');
        return;
    }

    try {
        const selected = greedy(classes);
        output.classList.add('show-result');
        output.classList.add('success');

        // Создаем список всех занятий с отметками
        const allClassesStr = classes.map(cls => {
            const isSelected = selected.some(s => s.subject === cls.subject && s.start === cls.start);
            return isSelected 
                ? `✅ <strong>${cls.subject}</strong> (${cls.start}–${cls.end})` 
                : `❌ ${cls.subject} (${cls.start}–${cls.end}) — нужно перенести`;
        }).join('<br>');

        // Итоговое расписание
        const scheduleStr = selected.map(cls => 
            `${cls.subject} (${cls.start}–${cls.end})`
        ).join('<br>');

        output.innerHTML = `
            <div class="result-section">
                <h3>Все занятия:</h3>
                ${allClassesStr}
            </div>
            <div class="result-section">
                <h3>Выбранные занятия (без пересечений):</h3>
                <strong>${scheduleStr}</strong>
            </div>
            <div class="result-section">
                <h3>Итог:</h3>
                Можно провести <strong>${selected.length}</strong> из ${classes.length} занятий
            </div>
        `;

    } catch (e) {
        output.classList.add('error');
        output.innerHTML = `❌ Ошибка: ${e.message}`;
    }
}
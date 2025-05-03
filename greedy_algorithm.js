function greedy(classes) {
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
}
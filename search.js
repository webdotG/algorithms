document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.querySelector('.search-results');
    
    // Функция поиска по заголовкам
    function searchHeadings(query) {
        const headings = document.querySelectorAll('h2, h3, h4, h5');
        resultsContainer.innerHTML = '';
        
        if (!query.trim()) {
            resultsContainer.style.display = 'none';
            return;
        }
        
        const matches = [];
        const queryLower = query.toLowerCase();
        
        headings.forEach(heading => {
            const text = heading.textContent.toLowerCase();
            if (text.includes(queryLower)) {
                matches.push({
                    element: heading,
                    text: heading.textContent,
                    id: heading.id || heading.parentElement.id
                });
            }
        });
        
        if (matches.length > 0) {
            matches.forEach(match => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = match.text;
                
                resultItem.addEventListener('click', () => {
                    if (match.id) {
                        // Прокрутка с учетом фиксированного хедера
                        const element = document.getElementById(match.id);
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        match.element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    
                    // Подсветка найденного элемента
                    const target = match.element;
                    target.classList.add('highlight');
                    setTimeout(() => {
                        target.classList.remove('highlight');
                    }, 2000);
                    
                    // Закрываем результаты поиска
                    resultsContainer.style.display = 'none';
                });
                
                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="search-no-results">Ничего не найдено</div>';
            resultsContainer.style.display = 'block';
        }
    }
    
    // Debounce
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    // Обработчик поиска с debounce
    const debouncedSearch = debounce(function(e) {
        searchHeadings(e.target.value);
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
    
    // Закрытие результатов при клике вне области
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            resultsContainer.style.display = 'none';
        }
    });
    
    // Показать результаты при фокусе, если есть текст
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            searchHeadings(this.value);
        }
    });
});
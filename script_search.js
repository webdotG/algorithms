document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const resultsContainer = document.querySelector('.search-results');
    
    // Функция поиска по заголовкам (только h2 и h3)
    function searchHeadings(query) {
        const headings = document.querySelectorAll('h2, h3'); // Исправленный селектор
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
                    id: heading.id || heading.parentElement.id || heading.closest('.algorithm-block')?.id
                });
            }
        });
        
        if (matches.length > 0) {
            matches.forEach(match => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.textContent = match.text;
                
                resultItem.addEventListener('click', () => {
                    // Прокрутка с учетом фиксированного хедера
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const element = match.id ? document.getElementById(match.id) : match.element;
                    
                    if (element) {
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10; // -10 для небольшого отступа
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Подсветка
                        element.classList.add('highlight');
                        setTimeout(() => {
                            element.classList.remove('highlight');
                        }, 2000);
                    }
                    
                    resultsContainer.style.display = 'none';
                    searchInput.value = match.text; // Подставляем текст заголовка в поиск
                });
                
                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="search-no-results">Ничего не найдено</div>';
            resultsContainer.style.display = 'block';
        }
    }
    
    // Debounce функция
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }
    
    // Обработчики событий
    searchInput.addEventListener('input', debounce(function(e) {
        searchHeadings(e.target.value);
    }, 300));
    
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            searchHeadings(this.value);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            resultsContainer.style.display = 'none';
        }
    });
});
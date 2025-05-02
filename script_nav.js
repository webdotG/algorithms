document.addEventListener('DOMContentLoaded', function() {
    const navButton = document.getElementById('nav-button');
    const navList = document.getElementById('nav-list');

    if (!navButton || !navList) {
        console.error('navButton or navList not found in the DOM');
        return;
    }

    navButton.addEventListener('click', function() {
        console.log('Button clicked, current display:', navList.style.display);
        const isHidden = navList.style.display === 'none' || navList.style.display === '' || window.getComputedStyle(navList).display === 'none';
        if (isHidden) {
            updateNavList();
            navList.style.display = 'block';
            navButton.textContent = 'Закрыть';
        } else {
            navList.style.display = 'none';
            navButton.textContent = 'Меню';
        }
    });

    function updateNavList() {
        const h2Elements = document.querySelectorAll('.algorithm-block > h2');
        navList.innerHTML = '';
        console.log('Found h2 elements:', h2Elements.length);

        h2Elements.forEach(h2 => {
            if (h2.id) {
                const link = document.createElement('a');
                link.href = `#${h2.id}`;
                link.textContent = h2.textContent;
                navList.appendChild(link);
                console.log('Added link:', h2.textContent);

                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        console.log('Link clicked:', h2.textContent);
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                        navList.style.display = 'none';
                        navButton.textContent = 'Меню';
                        navList.innerHTML = '';
                        console.log('Nav list cleared');
                    }
                });
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target !== navButton && !navList.contains(e.target)) {
            console.log('Clicked outside, hiding nav list');
            navList.style.display = 'none';
            navButton.textContent = 'Меню';
        }
    });
});
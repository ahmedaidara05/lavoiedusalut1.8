// Charger le contenu du livre
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        window.bookContent = data;
        renderSummary();
        renderFavorites();
    });

// Variables globales
let currentPage = 'home-page';
let currentChapter = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let fontSize = 16;
let isAutoScrolling = false;
let scrollDirection = 'down';

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;

    // Gérer la barre de navigation
    const bottomNav = document.querySelector('.bottom-nav');
    if (pageId === 'home-page' || pageId === 'settings-page') {
        bottomNav.classList.add('hidden');
    } else {
        bottomNav.classList.remove('hidden');
    }
}

// Page d'accueil
document.getElementById('start-btn').addEventListener('click', () => showPage('summary-page'));

// Sommaire
function renderSummary() {
    const chapterList = document.getElementById('chapter-list');
    chapterList.innerHTML = '';
    for (let i = 1; i <= 44; i++) {
        const chapter = document.createElement('div');
        chapter.classList.add('chapter-item');
        chapter.textContent = `Chapitre ${i}`;
        chapter.addEventListener('click', () => {
            currentChapter = i;
            showPage('reading-page');
            renderChapter();
        });
        chapterList.appendChild(chapter);
    }
}

// Lecture
function renderChapter() {
    const contentDiv = document.getElementById('chapter-content');
    const lang = document.getElementById('language-select').value;
    const chapterData = bookContent.chapters.find(ch => ch.id === currentChapter);
    contentDiv.innerHTML = `<h2 class="golden-title">${chapterData.title[lang]}</h2><p>${chapterData.content[lang]}</p>`;
    contentDiv.style.fontSize = `${fontSize}px`;
}

// Mode sombre/clair
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle').textContent = document.body.classList.contains('dark-mode') ? 'Mode Clair' : 'Mode Sombre';
});

document.getElementById('theme-toggle-settings').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle-settings').textContent = document.body.classList.contains('dark-mode') ? 'Mode Clair' : 'Mode Sombre';
});

// Changement de langue
document.getElementById('language-select').addEventListener('change', renderChapter);
document.getElementById('language-select-settings').addEventListener('change', () => {
    const lang = document.getElementById('language-select-settings').value;
    document.getElementById('language-select').value = lang;
    renderChapter();
});

// Zoom
document.getElementById('zoom-in').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('zoom-in-settings').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('zoom-out-settings').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

// Lecture à voix haute (simulation avec Web Speech API)
document.getElementById('read-aloud').addEventListener('click', () => {
    const content = document.getElementById('chapter-content').textContent;
    const voice = document.getElementById('voice-select').value;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = document.getElementById('language-select').value;
    // Simulation de voix différentes (dépend du navigateur)
    utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes(voice)) || null;
    speechSynthesis.speak(utterance);
});

// Favoris
document.getElementById('favorite-btn').addEventListener('click', () => {
    if (!favorites.includes(currentChapter)) {
        favorites.push(currentChapter);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
    }
});

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    favorites.forEach(chapterId => {
        const chapter = document.createElement('div');
        chapter.classList.add('chapter-item');
        chapter.textContent = `Chapitre ${chapterId}`;
        chapter.addEventListener('click', () => {
            currentChapter = chapterId;
            showPage('reading-page');
            renderChapter();
        });
        favoritesList.appendChild(chapter);
    });
}

// Auto-scroll
document.getElementById('auto-scroll').addEventListener('click', () => {
    isAutoScrolling = !isAutoScrolling;
    document.getElementById('auto-scroll').textContent = isAutoScrolling ? 'Arrêter' : 'Auto-scroll';
    if (isAutoScrolling) {
        const scroll = () => {
            if (isAutoScrolling) {
                window.scrollBy(0, scrollDirection === 'down' ? 1 : -1);
                requestAnimationFrame(scroll);
            }
        };
        scroll();
    }
});

// Paramètres
document.getElementById('back-btn').addEventListener('click', () => showPage(currentPage === 'settings-page' ? 'summary-page' : currentPage));

// Connexion/Inscription (simulation)
document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('user-name').textContent = username;
        alert('Connexion réussie !');
    }
});

document.getElementById('signup-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('user-name').textContent = username;
        alert('Inscription réussie !');
    }
});

// Navigation via barre
document.querySelectorAll('.bottom-nav button').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// Sécurité
document.addEventListener('contextmenu', e => e.preventDefault()); // Désactiver clic droit
document.addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === 'p' || e.key === 'c' || e.key === 's')) {
        e.preventDefault(); // Désactiver Ctrl+P, Ctrl+C, Ctrl+S
    }
});
document.addEventListener('copy', e => e.preventDefault()); // Désactiver copier
document.addEventListener('cut', e => e.preventDefault()); // Désactiver couper

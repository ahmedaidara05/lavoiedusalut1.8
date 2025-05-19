* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    overflow-x: hidden;
}

.golden-title {
    font-family: 'Playfair Display', serif;
    color: #d4af37;
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 20px;
}

.page {
    display: none;
    min-height: 100vh;
    padding: 20px;
}

.page.active {
    display: block;
}

/* Page d'accueil */
.hero {
    background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb') no-repeat center/cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    position: relative;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-content p {
    font-size: 1.2em;
    margin: 20px 0;
}

.btn {
    background: #d4af37;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    font-size: 1.1em;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.btn:hover {
    transform: scale(1.05);
}

/* Sommaire */
.chapter-list {
    display: grid;
    gap: 15px;
    max-width: 800px;
    margin: 0 auto;
}

.chapter-item {
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.chapter-item:hover {
    transform: translateY(-5px);
}

/* Page Lecture */
.reading-toolbar {
    background: #333;
    padding: 10px;
    display: flex;
    gap: 10px;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 10;
}

.reading-toolbar button, .reading-toolbar select {
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chapter-content {
    max-width: 800px;
    margin: 20px auto;
    font-size: 1.1em;
    line-height: 1.6;
    user-select: none; /* Empêche la sélection de texte */
}

/* Mode sombre */
.dark-mode {
    background: #1a1a1a;
    color: white;
}

.dark-mode .chapter-item {
    background: #333;
}

.dark-mode .reading-toolbar {
    background: #222;
}

/* Favoris */
#favorites-list {
    max-width: 800px;
    margin: 0 auto;
}

/* Paramètres */
.back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    background: #d4af37;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.user-profile {
    text-align: center;
    margin-bottom: 20px;
}

.user-profile img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
}

.settings-content {
    max-width: 600px;
    margin: 0 auto;
}

.setting-item {
    margin-bottom: 20px;
}

.setting-item label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.setting-item input, .setting-item select, .setting-item button {
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.social-links {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.social-icon img {
    width: 30px;
    height: 30px;
}

/* Barre de navigation */
.bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #333;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    z-index: 10;
}

.bottom-nav button {
    background: none;
    border: none;
    color: white;
    font-size: 1em;
    cursor: pointer;
}

.bottom-nav.hidden {
    display: none;
}

/* Sécurité */
body {
    -webkit-user-select: none; /* Chrome, Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE */
    user-select: none; /* Standard */
}

/* Responsive */
@media (max-width: 600px) {
    .golden-title {
        font-size: 2em;
    }

    .reading-toolbar {
        flex-wrap: wrap;
    }
}

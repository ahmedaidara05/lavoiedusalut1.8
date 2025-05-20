// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAljojXHODwHjStePWkhthWLRzrw3pUslQ",
    authDomain: "la-voie-du-salut-36409.firebaseapp.com",
    projectId: "la-voie-du-salut-36409",
    storageBucket: "la-voie-du-salut-36409.firebasestorage.app",
    messagingSenderId: "61439310820",
    appId: "1:61439310820:web:52bfe8b862666ac13d25f1",
    measurementId: "G-G9S1ST8K3R"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Charger le contenu du livre
let bookContent = [];
fetch('content.json')
    .then(response => response.json())
    .then(data => {
        bookContent = data;
        initChapters();
    });

// Navigation
let lastPage = 'home';

function navigate(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(page).classList.remove('hidden');
    lastPage = page;
    document.querySelector('.nav-bar').style.display = (page === 'home' || page === 'settings') ? 'none' : 'flex';
    document.querySelector('.ai-button').style.display = (page === 'chapters' || page === 'reading' || page === 'favorites') ? 'block' : 'none';
    document.getElementById('ai-chat').classList.add('hidden'); // Cacher le chat IA lors de la navigation
}

// Retour à la dernière page
function navigateBack() {
    navigate(lastPage);
}

// Liste des chapitres
function initChapters() {
    const chapterList = document.querySelector('.chapter-list');
    chapterList.innerHTML = '';
    for (let i = 1; i <= 44; i++) {
        const div = document.createElement('div');
        div.textContent = `Chapitre ${i}`;
        div.onclick = () => {
            currentChapter = i;
            loadChapter(i);
            navigate('reading');
        };
        chapterList.appendChild(div);
    }
}

// Gestion du contenu du chapitre
let currentChapter = 1;
function loadChapter(chapter) {
    const content = bookContent[chapter - 1][document.getElementById('language').value];
    document.getElementById('chapter-content').innerHTML = `<h2>Chapitre ${chapter}</h2><p>${content}</p>`;
}

// Mode sombre/clair
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('theme-toggle').innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

document.getElementById('settings-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('settings-theme').innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Zoom
let fontSize = 16;
document.getElementById('zoom-in').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('zoom-out').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('settings-zoom-in').addEventListener('click', () => {
    fontSize += 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

document.getElementById('settings-zoom-out').addEventListener('click', () => {
    if (fontSize > 12) fontSize -= 2;
    document.getElementById('chapter-content').style.fontSize = `${fontSize}px`;
});

// Changement de langue
document.getElementById('language').addEventListener('change', () => loadChapter(currentChapter));
document.getElementById('settings-language').addEventListener('change', () => {
    document.getElementById('language').value = document.getElementById('settings-language').value;
    loadChapter(currentChapter);
});

// Lecture à voix haute
let voices = [];
let utterance = null;
function populateVoices() {
    voices = speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    voiceSelect.innerHTML = '';
    voices.slice(0, 4).forEach((voice, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = populateVoices;

document.getElementById('read-aloud').addEventListener('click', () => {
    if (utterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.getElementById('read-aloud').innerHTML = '<i class="fas fa-volume-up"></i>';
        return;
    }
    const text = document.getElementById('chapter-content').textContent;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[document.getElementById('voice-select').value];
    utterance.lang = document.getElementById('language').value;
    speechSynthesis.speak(utterance);
    document.getElementById('read-aloud').innerHTML = '<i class="fas fa-stop"></i>';
});

// Auto-scroll
let scrolling = false;
document.getElementById('auto-scroll').addEventListener('click', () => {
    scrolling = !scrolling;
    document.getElementById('auto-scroll').innerHTML = scrolling ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-scroll"></i>';
    if (scrolling) {
        const content = document.getElementById('chapter-content');
        let scrollSpeed = 1;
        const scroll = () => {
            if (scrolling) {
                content.scrollTop += scrollSpeed;
                if (content.scrollTop >= content.scrollHeight - content.clientHeight) {
                    scrolling = false;
                    document.getElementById('auto-scroll').innerHTML = '<i class="fas fa-scroll"></i>';
                }
                requestAnimationFrame(scroll);
            }
        };
        scroll();
    }
});

// Gestion des favoris avec Firestore
let favorites = [];
function updateFavorites() {
    const favoriteList = document.querySelector('.favorite-list');
    favoriteList.innerHTML = '';
    if (auth.currentUser) {
        db.collection('users').doc(auth.currentUser.uid).get()
            .then(doc => {
                if (doc.exists) {
                    favorites = doc.data().favorites || [];
                    favorites.forEach(chapter => {
                        const div = document.createElement('div');
                        div.textContent = `Chapitre ${chapter}`;
                        div.onclick = () => {
                            currentChapter = chapter;
                            loadChapter(chapter);
                            navigate('reading');
                        };
                        favoriteList.appendChild(div);
                    });
                }
            });
    }
}

document.getElementById('favorite').addEventListener('click', () => {
    if (!auth.currentUser) {
        alert('Veuillez vous connecter pour ajouter des favoris.');
        return;
    }
    if (!favorites.includes(currentChapter)) {
        favorites.push(currentChapter);
        db.collection('users').doc(auth.currentUser.uid).set({ favorites }, { merge: true })
            .then(() => updateFavorites());
    }
});

// Connexion/Inscription avec Firebase
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            document.getElementById('user-name').textContent = userCredential.user.email;
            updateFavorites();
            alert('Connexion réussie !');
        })
        .catch(error => alert('Erreur de connexion : ' + error.message));
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.updateProfile({ displayName: username });
            db.collection('users').doc(userCredential.user.uid).set({ favorites: [] });
            document.getElementById('user-name').textContent = username;
            alert('Inscription réussie !');
        })
        .catch(error => alert('Erreur d\'inscription : ' + error.message));
}

// Mettre à jour le profil utilisateur
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('user-name').textContent = user.displayName || user.email;
        updateFavorites();
    } else {
        document.getElementById('user-name').textContent = 'Utilisateur';
        document.querySelector('.favorite-list').innerHTML = '';
    }
});

// Chat IA
document.getElementById('ai-button').addEventListener('click', () => {
    document.getElementById('ai-chat').classList.toggle('hidden');
});

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    // Réponse IA limitée au livre
    const aiResponse = getAIResponse(message);
    const aiMessage = document.createElement('div');
    aiMessage.className = 'ai-message';
    aiMessage.textContent = aiResponse;
    chatMessages.appendChild(aiMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    input.value = '';
}

function getAIResponse(message) {
    // Logique simple pour répondre aux questions sur le livre
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('lyra')) {
        return 'Lyra est l\'héroïne de "L\'Écho des Étoiles", une astronome qui découvre une étoile mystérieuse et entreprend une quête pour protéger un cristal cosmique.';
    } else if (lowerMessage.includes('cristal')) {
        return 'Le cristal est un artefact cosmique contenant l\'essence d\'une étoile, central à l\'histoire de Lyra dans "L\'Écho des Étoiles".';
    } else if (lowerMessage.includes('kaelen')) {
        return 'Kaelen est un voyageur mystérieux qui aide Lyra mais révèle plus tard des intentions ambiguës liées à une force obscure.';
    } else {
        return 'Désolé, je ne peux répondre qu\'aux questions sur "L\'Écho des Étoiles". Essayez de poser une question sur Lyra, le cristal, ou l\'histoire !';
    }
}

// Sécurité
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === 'p' || e.key === 'c' || e.key === 's')) {
        e.preventDefault();
    }
});

// Initialisation
populateVoices();

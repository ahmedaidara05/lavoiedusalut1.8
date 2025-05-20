// Configuration and initialization of Firebase
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
const storage = firebase.storage();

// Global Variables
let currentChapterId = null;
let currentLanguage = 'fr'; // Default language
let currentFontSize = 1.1; // Default font size for reading page
let utterance = null; // For speech synthesis
let speechVoices = [];
let currentVoiceIndex = 0; // Index for cycling through voices
let autoScrollInterval = null;
let chapterContentData = {}; // To store loaded content
let userFavorites = []; // Array to store favorited chapter IDs

// DOM Elements
const homePage = document.getElementById('home-page');
const sommairePage = document.getElementById('sommaire-page');
const readingPage = document.getElementById('reading-page');
const favoritesPage = document.getElementById('favorites-page');
const settingsPage = document.getElementById('settings-page');

const startButton = document.getElementById('start-button');
const chaptersList = document.getElementById('chapters-list');
const favoritesList = document.getElementById('favorites-list');
const noFavoritesMessage = document.getElementById('no-favorites-message');

const readingChapterTitle = document.getElementById('reading-chapter-title');
const chapterContent = document.getElementById('chapter-content');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const readAloudToggle = document.getElementById('read-aloud-toggle');
const favoriteChapterButton = document.getElementById('favorite-chapter');
const scrollUpButton = document.getElementById('scroll-up');
const scrollDownButton = document.getElementById('scroll-down');
const backToSommaireButton = document.querySelector('.back-to-sommaire');

const backFromSettingsButton = document.getElementById('back-from-settings');
const loginRegisterButton = document.getElementById('login-register-button');
const logoutButton = document.getElementById('logout-button');
const changePasswordButton = document.getElementById('change-password-button');
const userPhoto = document.getElementById('user-photo');
const userName = document.getElementById('user-name');

const settingsThemeToggle = document.getElementById('settings-theme-toggle');
const settingsLangToggle = document.getElementById('settings-lang-toggle');
const settingsZoomIn = document.getElementById('settings-zoom-in');
const settingsZoomOut = document.getElementById('settings-zoom-out');

const bottomNav = document.querySelector('.bottom-nav');
const navItems = document.querySelectorAll('.nav-item');

const chatFabSommaire = document.getElementById('chat-fab');
const chatFabReading = document.getElementById('chat-fab-reading');
const chatFabFavorites = document.getElementById('chat-fab-favorites');
const chatModal = document.getElementById('chat-modal');
const closeChatButton = document.querySelector('.close-chat');
const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat-button');

const authModal = document.getElementById('auth-modal');
const closeAuthButton = document.querySelector('.close-auth');
const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authSubmit = document.getElementById('auth-submit');
const toggleToRegister = document.getElementById('toggle-to-register');
const toggleToLogin = document.getElementById('toggle-to-login');
let isRegisterMode = false;
let lastPageBeforeSettings = 'home-page'; // To return to the correct page from settings


// --- Utility Functions ---

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // Update active state for bottom navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === pageId) {
            item.classList.add('active');
        }
    });

    // Hide/show bottom nav based on page
    if (pageId === 'home-page' || pageId === 'settings-page') {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
    }

    // Hide chat FAB on home and settings page
    [chatFabSommaire, chatFabReading, chatFabFavorites].forEach(fab => {
        if (fab) fab.style.display = 'none';
    });
    if (pageId === 'sommaire-page' && chatFabSommaire) {
        chatFabSommaire.style.display = 'flex';
    } else if (pageId === 'reading-page' && chatFabReading) {
        chatFabReading.style.display = 'flex';
    } else if (pageId === 'favorites-page' && chatFabFavorites) {
        chatFabFavorites.style.display = 'flex';
    }

    // Stop speech synthesis if changing page
    if (utterance && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        readAloudToggle.textContent = '🔊';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    // You would typically reload or update text content based on the new language here
    // For this example, we'll primarily update the chapter content
    alert(`Langue changée en : ${lang.toUpperCase()}. Le contenu des chapitres sera mis à jour lors de la lecture.`);
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLanguage = savedLang;
    }
}

function adjustFontSize(delta) {
    currentFontSize = Math.max(0.8, Math.min(2.0, currentFontSize + delta));
    chapterContent.style.fontSize = `${currentFontSize}em`;
}

function populateVoices() {
    speechVoices = window.speechSynthesis.getVoices();
    // Filter for common languages if desired, or just use available
    // Example: speechVoices = speechVoices.filter(voice => voice.lang.startsWith('fr') || voice.lang.startsWith('en') || voice.lang.startsWith('ar'));
    if (speechVoices.length === 0) {
        // Fallback for when voices are not immediately available
        window.speechSynthesis.onvoiceschanged = () => {
            speechVoices = window.speechSynthesis.getVoices();
            // Optional: filter voices again here
        };
    }
}

function speakText(text) {
    if (utterance && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        readAloudToggle.textContent = '🔊';
        return;
    }

    if (!text) {
        alert('Aucun texte à lire.');
        return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'fr' ? 'fr-FR' : (currentLanguage === 'en' ? 'en-US' : 'ar-SA'); // Adjust lang codes
    
    // Try to find a voice that matches the language
    const langSpecificVoices = speechVoices.filter(voice => voice.lang.startsWith(utterance.lang.substring(0, 2)));
    if (langSpecificVoices.length > 0) {
        utterance.voice = langSpecificVoices[currentVoiceIndex % langSpecificVoices.length];
        currentVoiceIndex++; // Cycle to the next voice for the next speak
    } else if (speechVoices.length > 0) {
        utterance.voice = speechVoices[currentVoiceIndex % speechVoices.length]; // Fallback to any available voice
        currentVoiceIndex++;
    } else {
        console.warn('No voices found, using default browser voice.');
    }

    utterance.onend = () => {
        readAloudToggle.textContent = '🔊';
        clearInterval(autoScrollInterval); // Stop auto-scroll when speech ends
    };
    utterance.onstart = () => {
        readAloudToggle.textContent = '⏸️'; // Change icon to pause
        startAutoScroll(true); // Start auto-scroll when speech starts
    };
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        alert('Erreur lors de la lecture à voix haute. Le navigateur peut ne pas prendre en charge cette fonctionnalité ou aucune voix n\'est disponible.');
        readAloudToggle.textContent = '🔊';
        clearInterval(autoScrollInterval);
    };

    window.speechSynthesis.speak(utterance);
}

function startAutoScroll(isReadingAloud = false) {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
    const scrollSpeed = isReadingAloud ? 1 : 5; // Slower for reading aloud
    autoScrollInterval = setInterval(() => {
        chapterContent.scrollBy(0, scrollSpeed);
        if (chapterContent.scrollTop + chapterContent.clientHeight >= chapterContent.scrollHeight - 5) { // Reached bottom
            clearInterval(autoScrollInterval);
            // Optional: stop speech if it's reading aloud and reached end
            if (isReadingAloud && utterance && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                readAloudToggle.textContent = '🔊';
            }
        }
    }, 100);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

function saveFavorites() {
    if (auth.currentUser) {
        db.collection('users').doc(auth.currentUser.uid).set({
            favorites: userFavorites
        }, { merge: true }).catch(error => console.error("Error saving favorites:", error));
    } else {
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    }
}

async function loadFavorites() {
    if (auth.currentUser) {
        try {
            const doc = await db.collection('users').doc(auth.currentUser.uid).get();
            if (doc.exists && doc.data().favorites) {
                userFavorites = doc.data().favorites;
            } else {
                userFavorites = [];
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
            userFavorites = [];
        }
    } else {
        const savedFavorites = localStorage.getItem('userFavorites');
        if (savedFavorites) {
            userFavorites = JSON.parse(savedFavorites);
        } else {
            userFavorites = [];
        }
    }
    renderFavorites();
}

function renderFavorites() {
    favoritesList.innerHTML = ''; // Clear current favorites
    if (userFavorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
    } else {
        noFavoritesMessage.style.display = 'none';
        userFavorites.forEach(chapterId => {
            const chapter = content.chapters.find(c => c.id === chapterId);
            if (chapter) {
                const chapterItem = document.createElement('div');
                chapterItem.classList.add('chapter-item');
                chapterItem.innerHTML = `
                    <h3>${chapter.title[currentLanguage]}</h3>
                    <p>${chapter.summary[currentLanguage]}</p>
                `;
                chapterItem.addEventListener('click', () => {
                    readChapter(chapter.id);
                });
                favoritesList.appendChild(chapterItem);
            }
        });
    }
}

// --- Event Listeners ---

startButton.addEventListener('click', () => showPage('sommaire-page'));

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = item.dataset.target;
        if (targetPage === 'settings-page') {
            lastPageBeforeSettings = document.querySelector('.page.active').id;
        }
        showPage(targetPage);
    });
});

themeToggle.addEventListener('click', toggleTheme);
settingsThemeToggle.addEventListener('click', toggleTheme);

langToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'fr' ? 'en' : (currentLanguage === 'en' ? 'ar' : 'fr');
    setLanguage(newLang);
    // Update the icon to reflect current language
    langToggle.textContent = newLang.toUpperCase();
});

settingsLangToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'fr' ? 'en' : (currentLanguage === 'en' ? 'ar' : 'fr');
    setLanguage(newLang);
    settingsLangToggle.textContent = newLang.toUpperCase();
});


zoomInButton.addEventListener('click', () => adjustFontSize(0.1));
zoomOutButton.addEventListener('click', () => adjustFontSize(-0.1));
settingsZoomIn.addEventListener('click', () => adjustFontSize(0.1));
settingsZoomOut.addEventListener('click', () => adjustFontSize(-0.1));


readAloudToggle.addEventListener('click', () => {
    const textToSpeak = chapterContent.textContent;
    if (textToSpeak) {
        speakText(textToSpeak);
    } else {
        alert("Aucun texte à lire.");
    }
});

scrollUpButton.addEventListener('mousedown', () => startAutoScroll(false, true)); // true for scrolling up
scrollUpButton.addEventListener('mouseup', stopAutoScroll);
scrollUpButton.addEventListener('mouseleave', stopAutoScroll); // Stop if mouse leaves button

scrollDownButton.addEventListener('mousedown', () => startAutoScroll(false, false)); // false for scrolling down
scrollDownButton.addEventListener('mouseup', stopAutoScroll);
scrollDownButton.addEventListener('mouseleave', stopAutoScroll);

backToSommaireButton.addEventListener('click', () => showPage('sommaire-page'));
backFromSettingsButton.addEventListener('click', () => showPage(lastPageBeforeSettings));


// --- Anti-copy/paste measures ---
document.addEventListener('contextmenu', e => e.preventDefault()); // Disable right-click
document.addEventListener('copy', e => { e.preventDefault(); alert('Copie de contenu désactivée.'); });
document.addEventListener('cut', e => { e.preventDefault(); alert('Couper le contenu désactivé.'); });
document.addEventListener('selectstart', e => { e.preventDefault(); }); // Disable text selection

// Prevent print (Ctrl+P or Cmd+P)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('L\'impression de contenu est désactivée.');
    }
});

// Prevent F12 (Dev Tools)
document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
        e.preventDefault();
        alert('Les outils de développement sont désactivés pour cette page.');
    }
});


// --- Chapter Loading & Favorites ---
function renderChaptersList() {
    chaptersList.innerHTML = '';
    content.chapters.forEach(chapter => {
        const chapterItem = document.createElement('div');
        chapterItem.classList.add('chapter-item');
        chapterItem.innerHTML = `
            <h3>${chapter.title[currentLanguage]}</h3>
            <p>${chapter.summary[currentLanguage]}</p>
        `;
        chapterItem.addEventListener('click', () => {
            readChapter(chapter.id);
        });
        chaptersList.appendChild(chapterItem);
    });
}

function readChapter(chapterId) {
    const chapter = content.chapters.find(c => c.id === chapterId);
    if (chapter) {
        currentChapterId = chapterId;
        readingChapterTitle.textContent = chapter.title[currentLanguage];
        chapterContent.innerHTML = chapter.text[currentLanguage]; // Use innerHTML for paragraphs
        chapterContent.scrollTop = 0; // Reset scroll position

        // Apply current font size
        chapterContent.style.fontSize = `${currentFontSize}em`;

        // Update favorite button state
        if (userFavorites.includes(chapterId)) {
            favoriteChapterButton.classList.add('favorited');
        } else {
            favoriteChapterButton.classList.remove('favorited');
        }

        showPage('reading-page');
    }
}

favoriteChapterButton.addEventListener('click', () => {
    if (!currentChapterId) return;

    const index = userFavorites.indexOf(currentChapterId);
    if (index > -1) {
        // Remove from favorites
        userFavorites.splice(index, 1);
        favoriteChapterButton.classList.remove('favorited');
        alert('Chapitre retiré des favoris.');
    } else {
        // Add to favorites
        userFavorites.push(currentChapterId);
        favoriteChapterButton.classList.add('favorited');
        alert('Chapitre ajouté aux favoris !');
    }
    saveFavorites(); // Save changes to Firebase or local storage
    renderFavorites(); // Update favorites page if visible
});


// --- Firebase Authentication ---
loginRegisterButton.addEventListener('click', () => {
    authModal.style.display = 'flex';
    isRegisterMode = false;
    authTitle.textContent = 'Connexion';
    authSubmit.textContent = 'Se connecter';
    toggleToRegister.style.display = 'inline';
    toggleToLogin.style.display = 'none';
    authEmail.value = '';
    authPassword.value = '';
});

closeAuthButton.addEventListener('click', () => {
    authModal.style.display = 'none';
});

toggleToRegister.addEventListener('click', () => {
    isRegisterMode = true;
    authTitle.textContent = 'Inscription';
    authSubmit.textContent = 'S\'inscrire';
    toggleToRegister.style.display = 'none';
    toggleToLogin.style.display = 'inline';
});

toggleToLogin.addEventListener('click', () => {
    isRegisterMode = false;
    authTitle.textContent = 'Connexion';
    authSubmit.textContent = 'Se connecter';
    toggleToRegister.style.display = 'inline';
    toggleToLogin.style.display = 'none';
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = authEmail.value;
    const password = authPassword.value;

    try {
        if (isRegisterMode) {
            await auth.createUserWithEmailAndPassword(email, password);
            alert('Inscription réussie !');
        } else {
            await auth.signInWithEmailAndPassword(email, password);
            alert('Connexion réussie !');
        }
        authModal.style.display = 'none';
    } catch (error) {
        alert(`Erreur d'authentification: ${error.message}`);
        console.error('Auth error:', error);
    }
});

logoutButton.addEventListener('click', async () => {
    try {
        await auth.signOut();
        alert('Déconnexion réussie !');
    } catch (error) {
        alert(`Erreur de déconnexion: ${error.message}`);
        console.error('Logout error:', error);
    }
});

changePasswordButton.addEventListener('click', async () => {
    const newPassword = prompt('Entrez votre nouveau mot de passe:');
    if (newPassword && newPassword.length >= 6) {
        try {
            await auth.currentUser.updatePassword(newPassword);
            alert('Mot de passe changé avec succès !');
        } catch (error) {
            alert(`Erreur de changement de mot de passe: ${error.message}`);
            console.error('Password change error:', error);
        }
    } else if (newPassword !== null) {
        alert('Le mot de passe doit contenir au moins 6 caractères.');
    }
});

// Firebase Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        userName.textContent = user.displayName || user.email;
        userPhoto.src = user.photoURL || 'https://via.placeholder.com/80x80?text=User'; // Default if no photo
        loginRegisterButton.style.display = 'none';
        logoutButton.style.display = 'block';
        changePasswordButton.style.display = 'block';
        loadFavorites(); // Load user-specific favorites
    } else {
        userName.textContent = 'Invité';
        userPhoto.src = 'https://via.placeholder.com/80x80?text=User';
        loginRegisterButton.style.display = 'block';
        logoutButton.style.display = 'none';
        changePasswordButton.style.display = 'none';
        userFavorites = []; // Clear favorites if logged out
        loadFavorites(); // Load local storage favorites if no user
    }
});


// --- AI Chatbot ---

chatFabSommaire.addEventListener('click', () => chatModal.style.display = 'flex');
chatFabReading.addEventListener('click', () => chatModal.style.display = 'flex');
chatFabFavorites.addEventListener('click', () => chatModal.style.display = 'flex');
closeChatButton.addEventListener('click', () => chatModal.style.display = 'none');

sendChatButton.addEventListener('click', handleChat);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleChat();
    }
});

function addChatMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = message;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom
}

async function handleChat() {
    const userQuestion = chatInput.value.trim();
    if (!userQuestion) return;

    addChatMessage(userQuestion, 'user');
    chatInput.value = '';

    // Simulate AI response based on the book content (simple example)
    const aiResponse = generateAiResponse(userQuestion);
    addChatMessage(aiResponse, 'ai');
}

function generateAiResponse(question) {
    const lowerQuestion = question.toLowerCase();
    let response = "Désolé, je ne peux répondre qu'aux questions concernant le contenu du livre.";

    // Simple keyword-based responses for demonstration
    if (lowerQuestion.includes("bonjour") || lowerQuestion.includes("salut")) {
        response = "Bonjour ! Comment puis-je vous aider avec le livre ?";
    } else if (lowerQuestion.includes("titre")) {
        response = `Le titre du livre est "La Voie du Salut".`;
    } else if (lowerQuestion.includes("chapitre") && lowerQuestion.includes("nombre")) {
        response = `Le livre contient ${content.chapters.length} chapitres.`;
    } else if (currentChapterId && lowerQuestion.includes("résumé du chapitre") && lowerQuestion.includes("ce chapitre")) {
        const currentChap = content.chapters.find(c => c.id === currentChapterId);
        if (currentChap) {
            response = `Le résumé de ce chapitre est : "${currentChap.summary[currentLanguage]}".`;
        } else {
            response = "Je ne peux pas trouver le résumé du chapitre actuel.";
        }
    } else if (lowerQuestion.includes("thème du livre")) {
        response = "Le livre explore les thèmes de la découverte de soi, de la résilience et du destin à travers un voyage épique.";
    }
    // More complex AI would involve sending to a backend service with a real LLM
    return response;
}


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadLanguage();
    populateVoices(); // Load voices for speech synthesis
    renderChaptersList();
    loadFavorites(); // Ensure favorites are loaded on start
    showPage('home-page'); // Start on the home page
});

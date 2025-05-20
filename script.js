// Configuration et initialisation de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAljojXHODwHjStePWkhthWLRzrw3pUslQ", // REPLACE WITH YOUR ACTUAL API KEY
    authDomain: "la-voie-du-salut-36409.firebaseapp.com", // REPLACE WITH YOUR ACTUAL AUTH DOMAIN
    projectId: "la-voie-du-salut-36409", // REPLACE WITH YOUR ACTUAL PROJECT ID
    storageBucket: "la-voie-du-salut-36409.firebasestorage.app", // REPLACE WITH YOUR ACTUAL STORAGE BUCKET
    messagingSenderId: "61439310820", // REPLACE WITH YOUR ACTUAL MESSAGING SENDER ID
    appId: "1:61439310820:web:52bfe8b862666ac13d25f1", // REPLACE WITH YOUR ACTUAL APP ID
    measurementId: "G-G9S1ST8K3R" // REPLACE WITH YOUR ACTUAL MEASUREMENT ID
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Global Variables
let currentChapterId = null;
let currentLanguage = 'fr'; // Default language
let currentFontSize = 1.1; // Default font size for reading page (em)
let utterance = null; // For speech synthesis
let speechVoices = [];
let currentVoiceIndex = 0; // Index for cycling through voices for read-aloud
let autoScrollInterval = null;
let userFavorites = []; // Array to store favorited chapter IDs (e.g., ['chapter-1', 'chapter-5'])
let lastPageBeforeSettings = 'home-page'; // To return to the correct page from settings

// DOM Elements - Pages
const homePage = document.getElementById('home-page');
const sommairePage = document.getElementById('sommaire-page');
const readingPage = document.getElementById('reading-page');
const favoritesPage = document.getElementById('favorites-page');
const settingsPage = document.getElementById('settings-page');

// DOM Elements - Home Page
const startButton = document.getElementById('start-button');

// DOM Elements - Sommaire Page
const chaptersList = document.getElementById('chapters-list');

// DOM Elements - Reading Page
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
const backToSommaireButton = document.getElementById('back-to-sommaire');

// DOM Elements - Favorites Page
const favoritesList = document.getElementById('favorites-list');
const noFavoritesMessage = document.getElementById('no-favorites-message');

// DOM Elements - Settings Page
const backFromSettingsButton = document.getElementById('back-from-settings');
const loginRegisterButton = document.getElementById('login-register-button');
const logoutButton = document.getElementById('logout-button');
const changePasswordButton = document.getElementById('change-password-button');
const userNameDisplay = document.getElementById('user-name-display'); // Changed from userPhoto to userNameDisplay

const settingsThemeToggle = document.getElementById('settings-theme-toggle');
const settingsLangToggle = document.getElementById('settings-lang-toggle');
const settingsZoomIn = document.getElementById('settings-zoom-in');
const settingsZoomOut = document.getElementById('settings-zoom-out');

// DOM Elements - Navigation
const bottomNav = document.querySelector('.bottom-nav');
const navItems = document.querySelectorAll('.nav-item');

// DOM Elements - Chat Modal
const chatFabSommaire = document.getElementById('chat-fab-sommaire');
const chatFabReading = document.getElementById('chat-fab-reading');
const chatFabFavorites = document.getElementById('chat-fab-favorites');
const chatModal = document.getElementById('chat-modal');
const closeChatButton = document.querySelector('.close-chat');
const chatHistory = document.getElementById('chat-history');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat-button');

// DOM Elements - Auth Modal
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


// --- Utility Functions ---

/**
 * Shows a specific page and updates navigation/FAB visibility.
 * @param {string} pageId The ID of the page (section) to show.
 */
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

    // Handle bottom nav visibility
    if (pageId === 'home-page' || pageId === 'settings-page') {
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
    }

    // Handle chat FAB visibility
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

/**
 * Toggles between dark and light mode.
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

/**
 * Loads the saved theme preference.
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

/**
 * Sets the application language.
 * @param {string} lang 'fr', 'en', or 'ar'.
 */
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    alert(`Langue changée en : ${lang.toUpperCase()}. Le contenu des chapitres sera mis à jour lors de la lecture.`);
    // Re-render sommaire to reflect language change in titles/summaries
    renderChaptersList();
    renderFavorites(); // Re-render favorites for language change
    // If on reading page, reload chapter content
    if (document.getElementById('reading-page').classList.contains('active') && currentChapterId) {
        readChapter(currentChapterId); // Re-load the current chapter in new language
    }
}

/**
 * Loads the saved language preference.
 */
function loadLanguage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLanguage = savedLang;
    }
}

/**
 * Adjusts the font size of the chapter content.
 * @param {number} delta The amount to change the font size by (e.g., 0.1 or -0.1).
 */
function adjustFontSize(delta) {
    currentFontSize = Math.max(0.8, Math.min(2.0, currentFontSize + delta)); // Min 0.8em, Max 2.0em
    chapterContent.style.fontSize = `${currentFontSize}em`;
    localStorage.setItem('fontSize', currentFontSize); // Save font size
}

/**
 * Loads the saved font size preference.
 */
function loadFontSize() {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseFloat(savedFontSize);
        chapterContent.style.fontSize = `${currentFontSize}em`;
    }
}

/**
 * Populates the speechVoices array with available voices.
 */
function populateVoices() {
    speechVoices = window.speechSynthesis.getVoices();
    if (speechVoices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            speechVoices = window.speechSynthesis.getVoices();
            console.log('Voices loaded:', speechVoices.map(v => v.name));
        };
    } else {
        console.log('Voices available:', speechVoices.map(v => v.name));
    }
}

/**
 * Initiates or stops text-to-speech for the current chapter.
 * @param {string} text The text content to speak.
 */
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        alert('Votre navigateur ne prend pas en charge la lecture à voix haute.');
        return;
    }

    if (utterance && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        readAloudToggle.textContent = '🔊';
        clearInterval(autoScrollInterval); // Stop auto-scroll if speech is cancelled
        return;
    }

    if (!text) {
        alert('Aucun texte à lire.');
        return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    // Map current language to BCP 47 language tags for better voice matching
    let langCode = 'fr-FR'; // Default to French
    if (currentLanguage === 'en') langCode = 'en-US';
    else if (currentLanguage === 'ar') langCode = 'ar-SA';
    utterance.lang = langCode;

    // Cycle through voices for the current language
    const langSpecificVoices = speechVoices.filter(voice => voice.lang.startsWith(utterance.lang.substring(0, 2)));

    if (langSpecificVoices.length > 0) {
        utterance.voice = langSpecificVoices[currentVoiceIndex % langSpecificVoices.length];
        currentVoiceIndex = (currentVoiceIndex + 1) % langSpecificVoices.length; // Cycle to next voice
    } else if (speechVoices.length > 0) {
        // Fallback to any available voice if no language-specific voice found
        utterance.voice = speechVoices[currentVoiceIndex % speechVoices.length];
        currentVoiceIndex = (currentVoiceIndex + 1) % speechVoices.length;
        console.warn('No specific voice for current language, using a general voice.');
    } else {
        console.warn('No voices found at all, using default browser voice.');
    }

    utterance.onend = () => {
        readAloudToggle.textContent = '🔊';
        clearInterval(autoScrollInterval);
    };
    utterance.onstart = () => {
        readAloudToggle.textContent = '⏸️';
        startAutoScroll(true); // Start auto-scroll when speech starts
    };
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        alert('Erreur de lecture à voix haute. Aucune voix disponible ou problème de navigateur.');
        readAloudToggle.textContent = '🔊';
        clearInterval(autoScrollInterval);
    };

    window.speechSynthesis.speak(utterance);
}

/**
 * Starts automatic scrolling of the chapter content.
 * @param {boolean} isReadingAloud True if initiated by read-aloud, affects speed.
 * @param {boolean} scrollUp True to scroll up, false to scroll down.
 */
function startAutoScroll(isReadingAloud = false, scrollUp = false) {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
    const scrollSpeed = isReadingAloud ? 0.5 : 5; // Slower for reading aloud
    autoScrollInterval = setInterval(() => {
        if (scrollUp) {
            chapterContent.scrollBy(0, -scrollSpeed);
            if (chapterContent.scrollTop <= 0) {
                clearInterval(autoScrollInterval);
            }
        } else {
            chapterContent.scrollBy(0, scrollSpeed);
            if (chapterContent.scrollTop + chapterContent.clientHeight >= chapterContent.scrollHeight - 5) {
                clearInterval(autoScrollInterval);
                if (isReadingAloud && utterance && window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    readAloudToggle.textContent = '🔊';
                }
            }
        }
    }, 50); // Faster interval for smoother scroll
}

/**
 * Stops any ongoing automatic scrolling.
 */
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

/**
 * Saves the user's favorite chapters to Firebase or localStorage.
 */
async function saveFavorites() {
    if (auth.currentUser) {
        try {
            await db.collection('users').doc(auth.currentUser.uid).set({
                favorites: userFavorites
            }, { merge: true });
            console.log("Favorites saved to Firebase.");
        } catch (error) {
            console.error("Error saving favorites to Firebase:", error);
        }
    } else {
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
        console.log("Favorites saved to Local Storage.");
    }
}

/**
 * Loads the user's favorite chapters from Firebase or localStorage.
 */
async function loadFavorites() {
    if (auth.currentUser) {
        try {
            const doc = await db.collection('users').doc(auth.currentUser.uid).get();
            if (doc.exists && doc.data().favorites) {
                userFavorites = doc.data().favorites;
                console.log("Favorites loaded from Firebase:", userFavorites);
            } else {
                userFavorites = [];
                console.log("No favorites found in Firebase or document does not exist.");
            }
        } catch (error) {
            console.error("Error loading favorites from Firebase:", error);
            userFavorites = []; // Fallback to empty if error
        }
    } else {
        const savedFavorites = localStorage.getItem('userFavorites');
        if (savedFavorites) {
            userFavorites = JSON.parse(savedFavorites);
            console.log("Favorites loaded from Local Storage:", userFavorites);
        } else {
            userFavorites = [];
            console.log("No favorites found in Local Storage.");
        }
    }
    renderFavorites(); // Always render favorites after loading
}

/**
 * Renders the list of favorite chapters on the favorites page.
 */
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
            // Save current page before going to settings
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
});

settingsLangToggle.addEventListener('click', () => {
    const newLang = currentLanguage === 'fr' ? 'en' : (currentLanguage === 'en' ? 'ar' : 'fr');
    setLanguage(newLang);
});

zoomInButton.addEventListener('click', () => adjustFontSize(0.1));
zoomOutButton.addEventListener('click', () => adjustFontSize(-0.1));
settingsZoomIn.addEventListener('click', () => adjustFontSize(0.1));
settingsZoomOut.addEventListener('click', () => adjustFontSize(-0.1));

readAloudToggle.addEventListener('click', () => {
    const textToSpeak = chapterContent.textContent; // Use textContent for plain text for speech
    if (textToSpeak) {
        speakText(textToSpeak);
    } else {
        alert("Aucun texte à lire.");
    }
});

scrollUpButton.addEventListener('mousedown', () => startAutoScroll(false, true));
scrollUpButton.addEventListener('mouseup', stopAutoScroll);
scrollUpButton.addEventListener('mouseleave', stopAutoScroll);
scrollUpButton.addEventListener('touchend', stopAutoScroll); // For mobile

scrollDownButton.addEventListener('mousedown', () => startAutoScroll(false, false));
scrollDownButton.addEventListener('mouseup', stopAutoScroll);
scrollDownButton.addEventListener('mouseleave', stopAutoScroll);
scrollDownButton.addEventListener('touchend', stopAutoScroll); // For mobile

backToSommaireButton.addEventListener('click', () => showPage('sommaire-page'));
backFromSettingsButton.addEventListener('click', () => showPage(lastPageBeforeSettings));


// --- Anti-copy/paste measures (client-side, not foolproof) ---
document.addEventListener('contextmenu', e => e.preventDefault()); // Disable right-click
document.addEventListener('copy', e => { e.preventDefault(); alert('Copie de contenu désactivée.'); });
document.addEventListener('cut', e => { e.preventDefault(); alert('Couper le contenu désactivé.'); });
document.addEventListener('selectstart', e => { e.preventDefault(); }); // Disable text selection

document.addEventListener('keydown', (e) => {
    // Prevent print (Ctrl+P or Cmd+P)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('L\'impression de contenu est désactivée.');
    }
    // Prevent Dev Tools (F12)
    if (e.key === 'F12') {
        e.preventDefault();
        alert('Les outils de développement sont désactivés pour cette page.');
    }
    // Prevent common dev tool shortcuts (Ctrl+Shift+I, J, C)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
        e.preventDefault();
        alert('Les outils de développement sont désactivés pour cette page.');
    }
});

// --- Chapter Loading & Favorites ---

/**
 * Renders the list of all chapters on the Table of Contents page.
 */
function renderChaptersList() {
    chaptersList.innerHTML = '';
    content.chapters.forEach(chapter => {
        const chapterItem = document.createElement('div');
        chapterItem.classList.add('chapter-item');
        chapterItem.setAttribute('data-chapter-id', chapter.id); // Add data attribute for easier identification
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

/**
 * Loads and displays the content of a specific chapter on the reading page.
 * @param {string} chapterId The ID of the chapter to read.
 */
function readChapter(chapterId) {
    const chapter = content.chapters.find(c => c.id === chapterId);
    if (chapter) {
        currentChapterId = chapterId;
        readingChapterTitle.textContent = chapter.title[currentLanguage];
        chapterContent.innerHTML = chapter.text[currentLanguage]; // Use innerHTML for paragraphs
        chapterContent.scrollTop = 0; // Reset scroll position to top

        // Apply current font size
        chapterContent.style.fontSize = `${currentFontSize}em`;

        // Update favorite button state
        if (userFavorites.includes(chapterId)) {
            favoriteChapterButton.classList.add('favorited');
        } else {
            favoriteChapterButton.classList.remove('favorited');
        }

        showPage('reading-page');
    } else {
        alert("Chapitre non trouvé.");
        showPage('sommaire-page'); // Go back to sommaire if chapter not found
    }
}

favoriteChapterButton.addEventListener('click', () => {
    if (!currentChapterId) return; // Ensure a chapter is being read

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
    // No need to call renderFavorites() immediately unless on favorites page,
    // as it will be called when navigating to favorites page.
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
            // Optional: prompt for first name/last name after registration
            // const fullName = prompt('Entrez votre nom et prénom (ex: John Doe):');
            // if (fullName) {
            //     await auth.currentUser.updateProfile({ displayName: fullName });
            // }
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
    // Firebase requires re-authentication for sensitive operations like password change
    // For simplicity here, we'll just prompt. In a real app, you'd re-authenticate.
    const newPassword = prompt('Entrez votre nouveau mot de passe (min 6 caractères):');
    if (newPassword === null) return; // User cancelled

    if (newPassword.length >= 6) {
        try {
            await auth.currentUser.updatePassword(newPassword);
            alert('Mot de passe changé avec succès !');
        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                alert('Veuillez vous reconnecter pour changer votre mot de passe.');
                authModal.style.display = 'flex'; // Show login modal
                isRegisterMode = false;
                authTitle.textContent = 'Reconnexion requise';
                authSubmit.textContent = 'Se reconnecter';
            } else {
                alert(`Erreur de changement de mot de passe: ${error.message}`);
            }
            console.error('Password change error:', error);
        }
    } else {
        alert('Le mot de passe doit contenir au moins 6 caractères.');
    }
});

// Firebase Auth State Listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        userNameDisplay.textContent = user.displayName || user.email; // Display name if available, else email
        loginRegisterButton.style.display = 'none';
        logoutButton.style.display = 'block';
        changePasswordButton.style.display = 'block';
        loadFavorites(); // Load user-specific favorites from Firestore
    } else {
        // User is signed out.
        userNameDisplay.textContent = 'Invité'; // Or "Nom Prénom" as a placeholder
        loginRegisterButton.style.display = 'block';
        logoutButton.style.display = 'none';
        changePasswordButton.style.display = 'none';
        userFavorites = []; // Clear user-specific favorites
        loadFavorites(); // Load local storage favorites if no user is logged in
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

/**
 * Adds a message to the chat history.
 * @param {string} message The text of the message.
 * @param {string} sender 'user' or 'ai'.
 */
function addChatMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = message;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom
}

/**
 * Handles user input in the chat and generates an AI response.
 */
async function handleChat() {
    const userQuestion = chatInput.value.trim();
    if (!userQuestion) return;

    addChatMessage(userQuestion, 'user');
    chatInput.value = '';

    // Simulate AI response based on the book content
    // For a real AI, you'd send this to a backend with a sophisticated LLM (e.g., Gemini API)
    const aiResponse = generateAiResponse(userQuestion);
    addChatMessage(aiResponse, 'ai');
}

/**
 * Generates a simulated AI response based on the user's question and current context.
 * This is a basic rule-based AI.
 * @param {string} question The user's question.
 * @returns {string} The AI's response.
 */
function generateAiResponse(question) {
    const lowerQuestion = question.toLowerCase();
    let response = "Désolé, je ne peux répondre qu'aux questions concernant le contenu du livre ou les fonctionnalités du site.";

    if (lowerQuestion.includes("bonjour") || lowerQuestion.includes("salut")) {
        response = "Bonjour ! Comment puis-je vous aider avec le livre 'La Voie du Salut' ?";
    } else if (lowerQuestion.includes("titre du livre")) {
        response = `Le titre du livre est "La Voie du Salut".`;
    } else if (lowerQuestion.includes("nombre de chapitres")) {
        response = `Le livre contient ${content.chapters.length} chapitres.`;
    } else if (lowerQuestion.includes("auteur")) {
        response = `L'auteur de ce récit est une intelligence artificielle au service de l'imagination.`;
    } else if (lowerQuestion.includes("thème du livre")) {
        response = "Le livre explore des thèmes comme la découverte de soi, la résilience, la quête de vérité, et l'équilibre entre lumière et obscurité.";
    } else if (lowerQuestion.includes("personnage principal") || lowerQuestion.includes("héroïne")) {
        response = "Le personnage principal est Elara, une jeune orpheline qui découvre un destin extraordinaire.";
    } else if (currentChapterId && (lowerQuestion.includes("résumé du chapitre") || lowerQuestion.includes("ce chapitre parle de"))) {
        const currentChap = content.chapters.find(c => c.id === currentChapterId);
        if (currentChap) {
            response = `Le chapitre actuel, "${currentChap.title[currentLanguage]}", peut être résumé ainsi : "${currentChap.summary[currentLanguage]}".`;
        } else {
            response = "Vous n'êtes pas sur un chapitre de lecture pour le moment, ou je n'ai pas d'information.";
        }
    } else if (lowerQuestion.includes("mode sombre")) {
        response = "Vous pouvez activer ou désactiver le mode sombre depuis les icônes sur la page de lecture ou dans les Paramètres.";
    } else if (lowerQuestion.includes("changer de langue")) {
        response = "Vous pouvez changer la langue (Français, Anglais, Arabe) via l'icône sur la page de lecture ou dans les Paramètres.";
    } else if (lowerQuestion.includes("zoom")) {
        response = "Utilisez les icônes '+' et '-' sur la page de lecture ou dans les Paramètres pour ajuster la taille du texte.";
    } else if (lowerQuestion.includes("lecture à voix haute")) {
        response = "L'icône '🔊' sur la page de lecture vous permet d'écouter le chapitre en cours. Elle dispose de plusieurs voix.";
    } else if (lowerQuestion.includes("favoris")) {
        response = "L'icône '❤️' sur la page de lecture permet d'ajouter un chapitre à vos favoris. Vous pouvez les retrouver sur la page 'Favoris'.";
    } else if (lowerQuestion.includes("défilement automatique")) {
        response = "Sur la page de lecture, les flèches haut et bas sous le texte permettent de défiler automatiquement.";
    } else if (lowerQuestion.includes("connexion") || lowerQuestion.includes("inscription")) {
        response = "Vous pouvez vous connecter ou vous inscrire via la page 'Paramètres' pour sauvegarder vos données.";
    } else if (lowerQuestion.includes("mot de passe")) {
        response = "Dans la page 'Paramètres', si vous êtes connecté, vous pouvez changer votre mot de passe.";
    } else if (lowerQuestion.includes("prophétie")) {
        response = "La prophétie mentionne que 'l'enfant du berceau oublié reviendra, guidé par le symbole d'or, pour réveiller la lumière endormie.'";
    }

    return response;
}


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadLanguage();
    loadFontSize();
    populateVoices(); // Load voices for speech synthesis

    renderChaptersList(); // Populate the table of contents
    loadFavorites(); // Load user favorites (will also render them)

    // Initially show the home page
    showPage('home-page');
});

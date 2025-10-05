// ========================================
// YouTube Playlist Progress Tracker
// ========================================

// ========================================
// Global State & Constants
// ========================================
const STORAGE_KEY = 'youtube_playlists';
const API_KEY_STORAGE = 'youtube_api_key';
const DARK_MODE_STORAGE = 'dark_mode_enabled';
const COLLAPSED_PLAYLISTS_STORAGE = 'collapsed_playlists';
const LANGUAGE_STORAGE = 'app_language';
let playlists = [];
let apiKey = null;
let collapsedPlaylists = new Set();
let currentLanguage = 'ar'; // Default to Arabic

// ========================================
// Translations
// ========================================
const translations = {
    ar: {
        // Header
        appTitle: '📺 متتبع قوائم تشغيل YouTube',
        appSubtitle: 'تتبع تقدمك في مشاهدة الدورات والقوائم التعليمية',
        darkModeTooltip: 'تبديل الوضع الليلي',
        languageToggleTooltip: 'تبديل اللغة',
        
        // API Key Setup
        setupTitle: '🔑 مرحباً! دعنا نبدأ الإعداد',
        setupDescription: 'لجلب قوائم التشغيل تلقائياً من YouTube، نحتاج إلى مفتاح API مجاني. لا تقلق، العملية بسيطة جداً وتأخذ 3 دقائق فقط!',
        setupStepsTitle: '📝 كيفية الحصول على مفتاح API:',
        setupStep1: 'اذهب إلى',
        setupStep2: 'أنشئ مشروع جديد أو اختر مشروعاً موجوداً',
        setupStep3: 'فعّل',
        setupStep4: 'اذهب إلى "بيانات الاعتماد" (Credentials) وأنشئ "مفتاح API"',
        setupStep5: 'انسخ المفتاح والصقه أدناه',
        setupNote: '💡 مجاني تماماً: 10,000 طلب يومياً (كافية لآلاف القوائم!)',
        apiKeyLabel: 'مفتاح YouTube API:',
        apiKeyPlaceholder: 'AIzaSy...',
        saveAndStart: '✅ حفظ والبدء',
        
        // Add Playlist Section
        addPlaylistTitle: '➕ إضافة قائمة تشغيل جديدة',
        playlistNameLabel: 'اسم القائمة (اختياري):',
        playlistNamePlaceholder: 'مثال: دورة تعلم JavaScript',
        playlistUrlLabel: 'رابط قائمة التشغيل:',
        playlistUrlPlaceholder: 'https://www.youtube.com/playlist?list=PLxxxxxx',
        playlistUrlHint: '💡 الصق رابط أي قائمة تشغيل على YouTube وسنجلب جميع الفيديوهات تلقائياً!',
        fetchPlaylistBtn: '🚀 جلب القائمة',
        loading: '⏳ جاري التحميل...',
        
        // Playlists Section
        savedPlaylistsTitle: '📋 قوائم التشغيل المحفوظة',
        noPlaylistsYet: 'لا توجد قوائم محفوظة بعد',
        addPlaylistHint: 'ابدأ بإضافة قائمة تشغيل أعلاه! 👆',
        collapseTooltip: 'اضغط للطي/الفتح',
        resetProgressTooltip: 'إعادة تعيين التقدم',
        deletePlaylistTooltip: 'حذف القائمة',
        videosOf: 'من',
        video: 'فيديو',
        watchVideo: '▶️ مشاهدة',
        
        // Footer
        footerText: 'صنع بواسطة Ahmed Kamel ❤️',
        supportBtn: '☕ ادعمني',
        
        // Messages
        enterApiKey: '⚠️ يرجى إدخال مفتاح API',
        apiKeySaved: '✅ تم حفظ مفتاح API بنجاح! يمكنك الآن إضافة قوائم التشغيل',
        apiKeyUpdated: '✅ تم تحديث مفتاح API بنجاح!',
        enterPlaylistUrl: '⚠️ يرجى إدخال رابط قائمة التشغيل',
        invalidPlaylistUrl: '❌ رابط قائمة التشغيل غير صالح. تأكد من أنه يحتوي على "list=" متبوعاً بمعرف القائمة',
        fetchingVideos: '⏳ جاري جلب الفيديوهات من YouTube...',
        emptyPlaylist: '⚠️ القائمة فارغة أو لا يمكن الوصول إليها',
        playlistAdded: 'تم إضافة',
        playlistAddedSuccess: 'فيديو من قائمة',
        successfully: 'بنجاح!',
        fetchError: '❌ حدث خطأ أثناء جلب القائمة. ',
        checkApiKey: 'تأكد من صحة مفتاح API.',
        quotaExceeded: 'تم تجاوز حد الاستخدام اليومي. حاول غداً.',
        checkPlaylistAndKey: 'تأكد من صحة رابط القائمة ومفتاح API.',
        confirmDelete: 'هل أنت متأكد من حذف القائمة',
        confirmDeleteDetails: 'سيتم حذف جميع الفيديوهات والتقدم المحفوظ.',
        playlistNotFound: '❌ لم يتم العثور على القائمة',
        playlistDeleted: '✅ تم حذف القائمة',
        confirmReset: 'هل تريد إعادة تعيين التقدم لقائمة',
        confirmResetDetails: 'سيتم إلغاء تحديد جميع الفيديوهات المكتملة.',
        progressReset: '✅ تم إعادة تعيين التقدم لقائمة',
        apiKeyPrompt: 'مفتاح YouTube API الحالي:',
    },
    en: {
        // Header
        appTitle: '📺 YouTube Playlist Tracker',
        appSubtitle: 'Track your progress watching courses and playlists',
        darkModeTooltip: 'Toggle Dark Mode',
        languageToggleTooltip: 'Switch Language',
        
        // API Key Setup
        setupTitle: '🔑 Welcome! Let\'s Get Started',
        setupDescription: 'To automatically fetch playlists from YouTube, we need a free API key. Don\'t worry, it\'s super simple and takes only 3 minutes!',
        setupStepsTitle: '📝 How to Get an API Key:',
        setupStep1: 'Go to',
        setupStep2: 'Create a new project or select an existing one',
        setupStep3: 'Enable',
        setupStep4: 'Go to "Credentials" and create an "API Key"',
        setupStep5: 'Copy the key and paste it below',
        setupNote: '💡 Completely Free: 10,000 requests per day (enough for thousands of playlists!)',
        apiKeyLabel: 'YouTube API Key:',
        apiKeyPlaceholder: 'AIzaSy...',
        saveAndStart: '✅ Save & Start',
        
        // Add Playlist Section
        addPlaylistTitle: '➕ Add New Playlist',
        playlistNameLabel: 'Playlist Name (optional):',
        playlistNamePlaceholder: 'Example: Learn JavaScript Course',
        playlistUrlLabel: 'Playlist URL:',
        playlistUrlPlaceholder: 'https://www.youtube.com/playlist?list=PLxxxxxx',
        playlistUrlHint: '💡 Paste any YouTube playlist link and we\'ll fetch all videos automatically!',
        fetchPlaylistBtn: '🚀 Fetch Playlist',
        loading: '⏳ Loading...',
        
        // Playlists Section
        savedPlaylistsTitle: '📋 Saved Playlists',
        noPlaylistsYet: 'No saved playlists yet',
        addPlaylistHint: 'Start by adding a playlist above! 👆',
        collapseTooltip: 'Click to collapse/expand',
        resetProgressTooltip: 'Reset Progress',
        deletePlaylistTooltip: 'Delete Playlist',
        videosOf: 'of',
        video: 'videos',
        watchVideo: '▶️ Watch',
        
        // Footer
        footerText: 'Made by Ahmed Kamel ❤️',
        supportBtn: '☕ Support Me',
        
        // Messages
        enterApiKey: '⚠️ Please enter an API key',
        apiKeySaved: '✅ API key saved successfully! You can now add playlists',
        apiKeyUpdated: '✅ API key updated successfully!',
        enterPlaylistUrl: '⚠️ Please enter a playlist URL',
        invalidPlaylistUrl: '❌ Invalid playlist URL. Make sure it contains "list=" followed by the playlist ID',
        fetchingVideos: '⏳ Fetching videos from YouTube...',
        emptyPlaylist: '⚠️ Playlist is empty or cannot be accessed',
        playlistAdded: 'Added',
        playlistAddedSuccess: 'videos from playlist',
        successfully: 'successfully!',
        fetchError: '❌ Error fetching playlist. ',
        checkApiKey: 'Check your API key.',
        quotaExceeded: 'Daily quota exceeded. Try again tomorrow.',
        checkPlaylistAndKey: 'Check playlist URL and API key.',
        confirmDelete: 'Are you sure you want to delete playlist',
        confirmDeleteDetails: 'All videos and progress will be deleted.',
        playlistNotFound: '❌ Playlist not found',
        playlistDeleted: '✅ Playlist deleted',
        confirmReset: 'Do you want to reset progress for playlist',
        confirmResetDetails: 'All completed videos will be unchecked.',
        progressReset: '✅ Progress reset for playlist',
        apiKeyPrompt: 'Current YouTube API Key:',
    }
};

/**
 * Get translation for a key
 */
function t(key) {
    return translations[currentLanguage][key] || key;
}

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ App initialized');
    
    // Load language preference
    loadLanguagePreference();
    
    // Load Dark Mode preference
    loadDarkModePreference();
    
    // Load collapsed playlists state
    loadCollapsedPlaylistsState();
    
    // Load API Key from localStorage
    loadApiKey();
    
    // Check if API key exists and show appropriate section
    checkApiKeyStatus();
    
    // Load playlists from localStorage
    loadPlaylistsFromStorage();
    
    // Render playlists
    renderPlaylists();
    
    // Setup event listeners
    setupEventListeners();
});

// ========================================
// Event Listeners Setup
// ========================================
function setupEventListeners() {
    // Playlist form
    const playlistForm = document.getElementById('addPlaylistForm');
    playlistForm.addEventListener('submit', handleAddPlaylist);
    
    // API Key form
    const apiKeyForm = document.getElementById('apiKeyForm');
    apiKeyForm.addEventListener('submit', handleApiKeySubmit);
    
    // API Key settings button
    const apiKeySettingsBtn = document.getElementById('apiKeySettingsBtn');
    apiKeySettingsBtn.addEventListener('click', showApiKeySetup);
    
    // Dark Mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Language toggle
    const languageToggle = document.getElementById('languageToggle');
    languageToggle.addEventListener('click', toggleLanguage);
    
    console.log('✅ Event listeners setup complete');
}

// ========================================
// Language Functions
// ========================================

/**
 * Load language preference from localStorage
 */
function loadLanguagePreference() {
    const stored = localStorage.getItem(LANGUAGE_STORAGE);
    if (stored && (stored === 'ar' || stored === 'en')) {
        currentLanguage = stored;
        updateUILanguage();
        console.log('✅ Language loaded:', currentLanguage);
    }
}

/**
 * Toggle language between Arabic and English
 */
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    localStorage.setItem(LANGUAGE_STORAGE, currentLanguage);
    updateUILanguage();
    console.log('🌍 Language switched to:', currentLanguage);
}

/**
 * Update all UI text based on current language
 */
function updateUILanguage() {
    // Update HTML lang and dir attributes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update language toggle button
    const languageText = document.querySelector('.language-text');
    if (languageText) {
        languageText.textContent = currentLanguage === 'ar' ? 'EN' : 'ع';
    }
    
    // Update header
    document.querySelector('.title').textContent = t('appTitle');
    document.querySelector('.subtitle').textContent = t('appSubtitle');
    document.getElementById('darkModeToggle').title = t('darkModeTooltip');
    document.getElementById('languageToggle').title = t('languageToggleTooltip');
    
    // Update API Key setup section (if visible)
    const setupTitle = document.querySelector('.setup-title');
    if (setupTitle) {
        setupTitle.textContent = t('setupTitle');
        document.querySelector('.setup-description').innerHTML = `${t('setupDescription')} <strong>${t('setupNote').includes('✨') ? '✨' : ''}</strong>`;
        document.querySelector('.setup-steps h3').textContent = t('setupStepsTitle');
        
        const steps = document.querySelectorAll('.setup-steps ol li');
        if (steps.length >= 5) {
            steps[0].innerHTML = `${t('setupStep1')} <a href="https://console.cloud.google.com/" target="_blank" rel="noopener">Google Cloud Console</a>`;
            steps[1].textContent = t('setupStep2');
            steps[2].innerHTML = `${t('setupStep3')} <strong>YouTube Data API v3</strong>`;
            steps[3].textContent = t('setupStep4');
            steps[4].textContent = t('setupStep5');
        }
        
        const setupNote = document.querySelector('.setup-note');
        if (setupNote) {
            setupNote.innerHTML = t('setupNote');
        }
        
        const apiKeyLabel = document.querySelector('#apiKeyForm label');
        if (apiKeyLabel) {
            apiKeyLabel.textContent = t('apiKeyLabel');
        }
        
        const apiKeyInput = document.getElementById('apiKeyInput');
        if (apiKeyInput) {
            apiKeyInput.placeholder = t('apiKeyPlaceholder');
        }
        
        const apiKeyBtn = document.querySelector('#apiKeyForm button');
        if (apiKeyBtn) {
            apiKeyBtn.textContent = t('saveAndStart');
        }
    }
    
    // Update add playlist section
    const sectionTitle = document.querySelector('#addPlaylistSection .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = t('addPlaylistTitle');
    }
    
    const labels = document.querySelectorAll('#addPlaylistForm label');
    if (labels.length >= 2) {
        labels[0].textContent = t('playlistNameLabel');
        labels[1].textContent = t('playlistUrlLabel');
    }
    
    const playlistNameInput = document.getElementById('playlistName');
    if (playlistNameInput) {
        playlistNameInput.placeholder = t('playlistNamePlaceholder');
    }
    
    const playlistUrlInput = document.getElementById('playlistUrl');
    if (playlistUrlInput) {
        playlistUrlInput.placeholder = t('playlistUrlPlaceholder');
    }
    
    const hint = document.querySelector('#addPlaylistForm .hint');
    if (hint) {
        hint.textContent = t('playlistUrlHint');
    }
    
    const addBtn = document.querySelector('#addPlaylistBtn .btn-text');
    if (addBtn) {
        addBtn.textContent = t('fetchPlaylistBtn');
    }
    
    // Update playlists section title
    const playlistsSectionTitle = document.querySelector('.playlists-section .section-title');
    if (playlistsSectionTitle) {
        playlistsSectionTitle.textContent = t('savedPlaylistsTitle');
    }
    
    // Update footer
    const footerCreator = document.querySelector('.footer-creator');
    if (footerCreator) {
        footerCreator.textContent = t('footerText');
    }
    
    const supportBtn = document.querySelector('.support-btn');
    if (supportBtn) {
        supportBtn.textContent = t('supportBtn');
    }
    
    // Re-render playlists to update their text
    renderPlaylists();
}

// ========================================
// Dark Mode Functions
// ========================================

/**
 * Load Dark Mode preference from localStorage
 */
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem(DARK_MODE_STORAGE) === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        // Update icon
        setTimeout(() => {
            const toggleIcon = document.querySelector('.toggle-icon');
            if (toggleIcon) {
                toggleIcon.textContent = '☀️';
            }
        }, 0);
        console.log('✅ Dark mode enabled');
    }
}

/**
 * Toggle Dark Mode
 */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem(DARK_MODE_STORAGE, isDarkMode);
    
    // Update icon
    const toggleIcon = document.querySelector('.toggle-icon');
    toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
    
    console.log(isDarkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

// ========================================
// Playlist Collapse/Expand Functions
// ========================================

/**
 * Load collapsed playlists state from localStorage
 */
function loadCollapsedPlaylistsState() {
    const stored = localStorage.getItem(COLLAPSED_PLAYLISTS_STORAGE);
    if (stored) {
        collapsedPlaylists = new Set(JSON.parse(stored));
        console.log('✅ Loaded collapsed playlists state');
    }
}

/**
 * Save collapsed playlists state to localStorage
 */
function saveCollapsedPlaylistsState() {
    localStorage.setItem(COLLAPSED_PLAYLISTS_STORAGE, JSON.stringify([...collapsedPlaylists]));
    console.log('✅ Saved collapsed playlists state');
}

/**
 * Toggle playlist collapse/expand
 * @param {string} playlistId - Playlist ID to toggle
 */
function togglePlaylistCollapse(playlistId) {
    const playlistCard = document.querySelector(`[data-playlist-id="${playlistId}"]`);
    if (!playlistCard) return;
    
    playlistCard.classList.toggle('collapsed');
    
    if (playlistCard.classList.contains('collapsed')) {
        collapsedPlaylists.add(playlistId);
        console.log('📁 Playlist collapsed:', playlistId);
    } else {
        collapsedPlaylists.delete(playlistId);
        console.log('📂 Playlist expanded:', playlistId);
    }
    
    saveCollapsedPlaylistsState();
}

// ========================================
// API Key Management Functions
// ========================================

/**
 * Load API Key from localStorage
 */
function loadApiKey() {
    const stored = localStorage.getItem(API_KEY_STORAGE);
    if (stored) {
        apiKey = stored;
        console.log('✅ API Key loaded from storage');
    }
}

/**
 * Save API Key to localStorage
 */
function saveApiKey(key) {
    localStorage.setItem(API_KEY_STORAGE, key);
    apiKey = key;
    console.log('✅ API Key saved to storage');
}

/**
 * Check API Key status and show/hide appropriate sections
 */
function checkApiKeyStatus() {
    const setupSection = document.getElementById('apiKeySetupSection');
    const addSection = document.getElementById('addPlaylistSection');
    
    if (!apiKey) {
        // No API key - show setup
        setupSection.style.display = 'block';
        addSection.style.display = 'none';
        console.log('⚠️ No API key found - showing setup');
    } else {
        // Has API key - show main form
        setupSection.style.display = 'none';
        addSection.style.display = 'block';
        console.log('✅ API key exists - showing main form');
    }
}

/**
 * Handle API Key form submission
 */
function handleApiKeySubmit(e) {
    e.preventDefault();
    
    const input = document.getElementById('apiKeyInput');
    const key = input.value.trim();
    
    if (!key) {
        alert(t('enterApiKey'));
        return;
    }
    
    // Save the key
    saveApiKey(key);
    
    // Show success and switch to main form
    showMessage(t('apiKeySaved'), 'success');
    checkApiKeyStatus();
    
    console.log('✅ API Key submitted successfully');
}

/**
 * Show API Key setup (from settings button)
 */
function showApiKeySetup() {
    const currentKey = apiKey || '';
    const newKey = prompt(t('apiKeyPrompt'), currentKey);
    
    if (newKey !== null && newKey.trim()) {
        saveApiKey(newKey.trim());
        showMessage(t('apiKeyUpdated'), 'success');
    }
}

/**
 * Extract Playlist ID from YouTube playlist URL
 * @param {string} url - YouTube playlist URL
 * @returns {string|null} - Playlist ID or null
 */
function extractPlaylistId(url) {
    url = url.trim();
    
    // Pattern: https://www.youtube.com/playlist?list=PLAYLIST_ID
    // Pattern: https://youtube.com/playlist?list=PLAYLIST_ID
    // Also handles URLs with additional parameters
    
    const patterns = [
        /[?&]list=([a-zA-Z0-9_-]+)/,  // Standard playlist URL
        /^([a-zA-Z0-9_-]+)$/          // Just the ID itself
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            console.log('✅ Extracted playlist ID:', match[1]);
            return match[1];
        }
    }
    
    console.warn('⚠️ Could not extract playlist ID from:', url);
    return null;
}

/**
 * Fetch playlist details and all videos from YouTube API
 * @param {string} playlistId - YouTube playlist ID
 * @returns {Promise<Object>} - Playlist data with videos
 */
async function fetchPlaylistFromYouTube(playlistId) {
    try {
        const videos = [];
        let nextPageToken = null;
        let playlistTitle = '';
        
        // Fetch all videos (handling pagination)
        do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }
            
            const data = await response.json();
            
            // Get playlist title from first page
            if (!playlistTitle && data.items.length > 0) {
                playlistTitle = data.items[0].snippet.channelTitle || 'قائمة تشغيل';
            }
            
            // Extract video information
            data.items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const videoTitle = item.snippet.title;
                
                // Skip private/deleted videos
                if (videoTitle !== 'Private video' && videoTitle !== 'Deleted video') {
                    videos.push({
                        id: videoId,
                        title: videoTitle,
                        url: `https://www.youtube.com/watch?v=${videoId}`,
                        completed: false
                    });
                }
            });
            
            nextPageToken = data.nextPageToken;
            console.log(`✅ Fetched ${videos.length} videos so far...`);
            
        } while (nextPageToken);
        
        console.log(`✅ Total videos fetched: ${videos.length}`);
        
        return {
            title: playlistTitle,
            videos: videos
        };
        
    } catch (error) {
        console.error('❌ Error fetching playlist:', error);
        throw error;
    }
}

// ========================================
// Playlist Management Functions
// ========================================

/**
 * Handle adding a new playlist
 * @param {Event} e - Form submit event
 */
async function handleAddPlaylist(e) {
    e.preventDefault();
    console.log('🔄 handleAddPlaylist called');
    
    // Show loading state
    toggleLoadingState(true);
    
    try {
        // 1. Get form values
        const playlistNameInput = document.getElementById('playlistName');
        const playlistUrlInput = document.getElementById('playlistUrl');
        
        const customName = playlistNameInput.value.trim();
        const playlistUrl = playlistUrlInput.value.trim();
        
        // 2. Validate input
        if (!playlistUrl) {
            showMessage(t('enterPlaylistUrl'), 'error');
            toggleLoadingState(false);
            return;
        }
        
        // 3. Extract playlist ID
        const playlistId = extractPlaylistId(playlistUrl);
        if (!playlistId) {
            showMessage(t('invalidPlaylistUrl'), 'error');
            toggleLoadingState(false);
            return;
        }
        
        // 4. Fetch playlist from YouTube API
        showMessage(t('fetchingVideos'), 'success');
        
        const playlistData = await fetchPlaylistFromYouTube(playlistId);
        
        if (playlistData.videos.length === 0) {
            showMessage(t('emptyPlaylist'), 'error');
            toggleLoadingState(false);
            return;
        }
        
        // 5. Create playlist object
        const playlist = {
            id: Date.now().toString(), // Simple unique ID
            name: customName || playlistData.title || 'قائمة تشغيل',
            createdAt: new Date().toISOString(),
            videos: playlistData.videos
        };
        
        // 6. Add to playlists array and save to localStorage
        playlists.unshift(playlist); // Add at the beginning
        savePlaylistsToStorage();
        
        // 7. Render playlists
        renderPlaylists();
        
        // 8. Reset form
        playlistNameInput.value = '';
        playlistUrlInput.value = '';
        
        // 9. Show success message
        const successMsg = `✅ ${t('playlistAdded')} ${playlistData.videos.length} ${t('playlistAddedSuccess')} "${playlist.name}" ${t('successfully')}`;
        showMessage(successMsg, 'success');
        
        // Scroll to playlists section
        document.querySelector('.playlists-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
    } catch (error) {
        console.error('❌ Error adding playlist:', error);
        
        let errorMessage = t('fetchError');
        
        if (error.message.includes('API key')) {
            errorMessage += t('checkApiKey');
        } else if (error.message.includes('quota')) {
            errorMessage += t('quotaExceeded');
        } else {
            errorMessage += t('checkPlaylistAndKey');
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        toggleLoadingState(false);
    }
}

/**
 * Load playlists from localStorage
 */
function loadPlaylistsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        playlists = JSON.parse(stored);
        console.log('✅ Loaded playlists from storage:', playlists.length);
    }
}

/**
 * Save playlists to localStorage
 */
function savePlaylistsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
    console.log('✅ Saved playlists to storage');
}

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube video URL
 * @returns {string|null} - Video ID or null
 */
function extractVideoId(url) {
    url = url.trim();
    
    // Pattern 1: https://www.youtube.com/watch?v=VIDEO_ID
    // Pattern 2: https://youtu.be/VIDEO_ID
    // Pattern 3: https://www.youtube.com/embed/VIDEO_ID
    // Pattern 4: https://m.youtube.com/watch?v=VIDEO_ID
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/ // Just the ID itself
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            console.log('✅ Extracted video ID:', match[1]);
            return match[1];
        }
    }
    
    console.warn('⚠️ Could not extract video ID from:', url);
    return null;
}

/**
 * Fetch video title from YouTube oEmbed API
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<string>} - Video title
 */
async function fetchVideoTitle(videoId) {
    try {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch video: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Fetched title for', videoId, ':', data.title);
        return data.title;
    } catch (error) {
        console.error('❌ Error fetching video title:', error);
        return `فيديو ${videoId} (لم يتم العثور على العنوان)`;
    }
}

/**
 * Delete a playlist
 * @param {string} playlistId - Playlist ID to delete
 */
function deletePlaylist(playlistId) {
    console.log('🔄 deletePlaylist called for:', playlistId);
    
    // Find the playlist to get its name
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) {
        console.error('❌ Playlist not found:', playlistId);
        showMessage(t('playlistNotFound'), 'error');
        return;
    }
    
    // Ask for confirmation
    const confirmed = confirm(`${t('confirmDelete')} "${playlist.name}"?\n\n${t('confirmDeleteDetails')}`);
    
    if (!confirmed) {
        console.log('⚠️ Delete cancelled by user');
        return;
    }
    
    // Remove playlist from array
    playlists = playlists.filter(p => p.id !== playlistId);
    
    // Save to localStorage
    savePlaylistsToStorage();
    
    // Re-render playlists
    renderPlaylists();
    
    // Show success message
    showMessage(`${t('playlistDeleted')} "${playlist.name}"`, 'success');
    console.log('✅ Playlist deleted successfully');
}

/**
 * Reset progress for a playlist
 * @param {string} playlistId - Playlist ID to reset
 */
function resetPlaylistProgress(playlistId) {
    console.log('🔄 resetPlaylistProgress called for:', playlistId);
    
    // Find the playlist
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) {
        console.error('❌ Playlist not found:', playlistId);
        showMessage(t('playlistNotFound'), 'error');
        return;
    }
    
    // Ask for confirmation
    const confirmed = confirm(`${t('confirmReset')} "${playlist.name}"?\n\n${t('confirmResetDetails')}`);
    
    if (!confirmed) {
        console.log('⚠️ Reset cancelled by user');
        return;
    }
    
    // Reset all videos to not completed
    playlist.videos.forEach(video => {
        video.completed = false;
    });
    
    // Save to localStorage
    savePlaylistsToStorage();
    
    // Re-render playlists
    renderPlaylists();
    
    // Show success message
    showMessage(`${t('progressReset')} "${playlist.name}"`, 'success');
    console.log('✅ Progress reset successfully');
}

/**
 * Toggle video completion status
 * @param {string} playlistId - Playlist ID
 * @param {string} videoId - Video ID
 */
function toggleVideoCompletion(playlistId, videoId) {
    console.log('🔄 toggleVideoCompletion called for:', playlistId, videoId);
    
    // Find the playlist
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) {
        console.error('❌ Playlist not found:', playlistId);
        return;
    }
    
    // Find the video and toggle its completion status
    const video = playlist.videos.find(v => v.id === videoId);
    if (!video) {
        console.error('❌ Video not found:', videoId);
        return;
    }
    
    video.completed = !video.completed;
    console.log('✅ Video completion toggled:', video.completed);
    
    // Save to localStorage
    savePlaylistsToStorage();
    
    // Re-render playlists to update UI
    renderPlaylists();
}

// ========================================
// Rendering Functions
// ========================================

/**
 * Render all playlists to the DOM
 */
function renderPlaylists() {
    const container = document.getElementById('playlistsContainer');
    
    // If no playlists, show empty state
    if (playlists.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>${t('noPlaylistsYet')}</p>
                <p class="empty-hint">${t('addPlaylistHint')}</p>
            </div>
        `;
        return;
    }
    
    // Render all playlists
    container.innerHTML = playlists.map(playlist => {
        const progress = calculateProgress(playlist);
        const isCollapsed = collapsedPlaylists.has(playlist.id);
        
        return `
            <div class="playlist-card ${isCollapsed ? 'collapsed' : ''}" data-playlist-id="${playlist.id}">
                <!-- Playlist Header -->
                <div class="playlist-header">
                    <div class="playlist-title-section" onclick="togglePlaylistCollapse('${playlist.id}')" title="${t('collapseTooltip')}">
                        <span class="collapse-arrow">▼</span>
                        <h3 class="playlist-title">${escapeHtml(playlist.name)}</h3>
                    </div>
                    <div class="playlist-actions">
                        <button class="btn-icon" onclick="resetPlaylistProgress('${playlist.id}')" title="${t('resetProgressTooltip')}">
                            🔄
                        </button>
                        <button class="btn-icon" onclick="deletePlaylist('${playlist.id}')" title="${t('deletePlaylistTooltip')}">
                            🗑️
                        </button>
                    </div>
                </div>
                
                <!-- Progress Container -->
                <div class="progress-container">
                    <div class="progress-info">
                        <span><strong>${progress.completed}</strong> ${t('videosOf')} <strong>${progress.total}</strong> ${t('video')}</span>
                        <span><strong>${progress.percentage}%</strong></span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                </div>
                
                <!-- Video List -->
                <div class="video-list">
                    ${playlist.videos.map((video, index) => `
                        <div class="video-item ${video.completed ? 'completed' : ''}" data-video-id="${video.id}">
                            <input 
                                type="checkbox" 
                                class="video-checkbox" 
                                id="video-${playlist.id}-${video.id}"
                                ${video.completed ? 'checked' : ''}
                                onchange="toggleVideoCompletion('${playlist.id}', '${video.id}')"
                            >
                            <label for="video-${playlist.id}-${video.id}" class="video-title">
                                ${index + 1}. ${escapeHtml(video.title)}
                            </label>
                            <a href="${video.url}" target="_blank" class="video-link" rel="noopener noreferrer">
                                ${t('watchVideo')}
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ renderPlaylists completed - rendered', playlists.length, 'playlists');
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Calculate playlist progress
 * @param {Object} playlist - Playlist object
 * @returns {Object} - Progress info {completed, total, percentage}
 */
function calculateProgress(playlist) {
    const total = playlist.videos.length;
    const completed = playlist.videos.filter(video => video.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
}

// ========================================
// UI Utility Functions
// ========================================

/**
 * Show message to user
 * @param {string} message - Message text
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(message, type = 'success') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    messageBox.style.display = 'block';
    
    // Hide after 4 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 4000);
}

/**
 * Toggle loading state on button
 * @param {boolean} isLoading - Loading state
 */
function toggleLoadingState(isLoading) {
    const btn = document.getElementById('addPlaylistBtn');
    const btnText = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.loader');
    
    if (isLoading) {
        btn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
    } else {
        btn.disabled = false;
        btnText.style.display = 'inline-block';
        loader.style.display = 'none';
    }
}

// ========================================
// Placeholder Comments for Future Modules
// ========================================

/*
 * MODULE 2: إضافة Playlist واستخراج الفيديوهات
 * - Complete handleAddPlaylist()
 * - Complete extractVideoId()
 * - Complete fetchVideoTitle()
 * - Implement error handling
 */

/*
 * MODULE 3: عرض Playlists وتتبع التقدم
 * - Complete renderPlaylists()
 * - Complete toggleVideoCompletion()
 * - Complete calculateProgress()
 * - Add visual feedback
 */

/*
 * MODULE 4: إدارة القوائم والتحسينات النهائية
 * - Complete deletePlaylist()
 * - Complete resetPlaylistProgress()
 * - Add confirmation dialogs
 * - Final UI/UX polish
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER LOGIC (UPGRADED FOR SYSTEM PREFERENCE) ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    
    // Function to apply the chosen theme and set the correct icon
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.body.classList.remove('light-theme');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    // Main logic to determine the initial theme on page load
    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            // 1. If user has a saved preference, use it.
            applyTheme(savedTheme);
        } else if (systemPrefersDark) {
            // 2. If no saved preference, check system setting. If dark, use dark.
            applyTheme('dark');
        } else {
            // 3. Otherwise (no saved preference, system is light), use light.
            applyTheme('light');
        }
    };

    // Event listener for the switcher button click
    themeSwitcher.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            // If current is light, switch to dark and save preference
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        } else {
            // If current is dark, switch to light and save preference
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        }
    });

    // BONUS: Listen for real-time changes in the OS theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newColorScheme = e.matches ? 'dark' : 'light';
        // Only change the theme if the user has NOT made a manual choice
        if (!localStorage.getItem('theme')) {
            applyTheme(newColorScheme);
        }
    });

    // Run the initial theme check when the page loads
    initializeTheme();


    // --- "COPY TO CLIPBOARD" LOGIC (No changes needed here) ---
    const links = {
        github: 'https://github.com/yeyintonline/555MIX/releases/download/V11.0.1/555MIX.AGENTYY.apk',
        gdrive: 'https://drive.google.com/uc?export=download&id=1aZX9lTx3KZ2A11vOdfaeK915kfV5QSoU',
        mediafire: 'https://www.mediafire.com/file/jscr3ccmzn8hp35/555Mix_V11.0.1_AGENTYY.apk/file',
        pixeldrain: 'https://pixeldrain.com/u/qKbwmGRp'
    };
    const copyButtons = {
        github: document.getElementById('copyGithubBtn'),
        gdrive: document.getElementById('copyGdriveBtn'),
        mediafire: document.getElementById('copyMediafireBtn'),
        pixeldrain: document.getElementById('copyPixeldrainBtn')
    };
    const feedbackElement = document.getElementById('copyFeedback');
    const copyToClipboard = (link, button) => {
        if (!navigator.clipboard) {
            alert("Clipboard API not available.");
            return;
        }
        navigator.clipboard.writeText(link).then(() => {
            feedbackElement.textContent = '✅ Link ကို Copy ကူးပြီးပါပြီ ...';
            feedbackElement.classList.add('show');
            const originalText = button.textContent;
            button.textContent = '✔';
            setTimeout(() => {
                feedbackElement.classList.remove('show');
                button.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            feedbackElement.textContent = 'Copy Failed!';
            feedbackElement.classList.add('show');
            setTimeout(() => { feedbackElement.classList.remove('show'); }, 2000);
        });
    };
    if (copyButtons.github) { copyButtons.github.addEventListener('click', () => copyToClipboard(links.github, copyButtons.github)); }
    if (copyButtons.gdrive) { copyButtons.gdrive.addEventListener('click', () => copyToClipboard(links.gdrive, copyButtons.gdrive)); }
    if (copyButtons.mediafire) { copyButtons.mediafire.addEventListener('click', () => copyToClipboard(links.mediafire, copyButtons.mediafire)); }
    if (copyButtons.pixeldrain) { copyButtons.pixeldrain.addEventListener('click', () => copyToClipboard(links.pixeldrain, copyButtons.pixeldrain)); }
});

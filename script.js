document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER LOGIC ---
    const themeSwitcher = document.getElementById('theme-switcher');
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    
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

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) { applyTheme(savedTheme); } 
        else if (systemPrefersDark) { applyTheme('dark'); } 
        else { applyTheme('light'); }
    };

    themeSwitcher.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    initializeTheme();


    // --- "COPY TO CLIPBOARD" LOGIC (UPGRADED WITH "ACTIVATED" STATE) ---
    const links = {
        github: 'https://github.com/yeyintonline/555MIX/releases/download/V11.0.1/555MIX.AGENTYY.apk',
        gdrive: 'https://drive.google.com/uc?export=download&id=1aZX9lTx3KZ2A11vOdfaeK915kfV5QSoU',
        mediafire: 'https://www.mediafire.com/file/jscr3ccmzn8hp35/555Mix_V11.0.1_AGENTYY.apk/file',
        pixeldrain: 'https://pixeldrain.com/u/qKbwmGRp'
    };
    
    // Get all copy buttons into an array to manage them easily
    const allCopyButtons = [
        document.getElementById('copyGithubBtn'),
        document.getElementById('copyGdriveBtn'),
        document.getElementById('copyMediafireBtn'),
        document.getElementById('copyPixeldrainBtn')
    ];
    
    const feedbackElement = document.getElementById('copyFeedback');

    const copyToClipboard = (link, clickedButton) => {
        if (!navigator.clipboard) { return; }

        navigator.clipboard.writeText(link).then(() => {
            feedbackElement.textContent = '✅ Link ကို Copy ကူးပြီးပါပြီ ...';
            feedbackElement.classList.add('show');
            
            const originalContent = clickedButton.innerHTML;
            clickedButton.innerHTML = '✔';
            
            // --- NEW LOGIC FOR ACTIVATED STATE ---
            // 1. Remove 'activated' from all other buttons
            allCopyButtons.forEach(button => {
                if (button !== clickedButton) {
                    button.classList.remove('activated');
                }
            });
            // 2. Add 'activated' to the clicked button
            clickedButton.classList.add('activated');
            // --- END OF NEW LOGIC ---

            setTimeout(() => {
                feedbackElement.classList.remove('show');
                clickedButton.innerHTML = originalContent;
            }, 2000);

        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    // Attach event listeners to each button
    allCopyButtons.forEach(button => {
        if (button) {
            const key = button.id.replace('copy', '').replace('Btn', '').toLowerCase();
            button.addEventListener('click', () => copyToClipboard(links[key], button));
        }
    });
});

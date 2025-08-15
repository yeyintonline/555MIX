// Wait until the HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Iframe Logic ---
    const playButton = document.getElementById('playBtn');
    const iframeContainer = document.getElementById('iframeContainer');
    const closeButton = document.getElementById('closeBtn');

    // When "Play Now" button is clicked, show the iframe container
    if (playButton) {
        playButton.addEventListener('click', () => {
            iframeContainer.classList.remove('hidden');
        });
    }

    // When "Close" button is clicked, hide the iframe container
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            iframeContainer.classList.add('hidden');
        });
    }


    // --- 2. Download Logic ---
    const downloadButton = document.getElementById('downloadBtn');

    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            // Create a temporary link element
            const link = document.createElement('a');
            
            // Set the path to your APK file.
            // Since the APK is in the same folder, we just need the filename.
            link.href = 'app.apk'; 
            
            // Suggest a filename for the download
            link.download = 'Bet555Mix_App.apk'; 
            
            // Programmatically click the link to trigger the download
            link.click();
        });
    }

});

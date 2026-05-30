function copyToClipboard(button) {
    // Find the script text in the same card
    const scriptText = button.previousElementSibling.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(scriptText).then(() => {
        // Change button appearance
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

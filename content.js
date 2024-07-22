chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "warnUser") {
        console.log('Displaying warning for predatory site');  // Log when the warning is displayed

        // Remove any existing warning div to avoid duplicates
        const existingWarning = document.getElementById('journalguard-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        // Create the warning div
        const warningDiv = document.createElement("div");
        warningDiv.id = 'journalguard-warning';
        warningDiv.style.position = "fixed";
        warningDiv.style.top = "0";
        warningDiv.style.left = "0";
        warningDiv.style.width = "100%";
        warningDiv.style.height = "100vh"; // Full viewport height
        warningDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Dark overlay
        warningDiv.style.color = "white";
        warningDiv.style.zIndex = "10000"; // Ensure it's on top
        warningDiv.style.display = "flex";
        warningDiv.style.flexDirection = "column";
        warningDiv.style.justifyContent = "center";
        warningDiv.style.alignItems = "center";
        warningDiv.style.textAlign = "center";
        warningDiv.style.padding = "20px";
        warningDiv.style.fontSize = "24px"; // Larger text
        warningDiv.style.fontFamily = "'Garamond', serif"; // Dark academia font style
        warningDiv.style.animation = "fadeIn 0.5s"; // Add fade-in animation

        const warningContent = document.createElement("div");
        warningContent.style.backgroundColor = "white"; // White background for the popup
        warningContent.style.border = "2px solid #1b1b1b"; // Dark border
        warningContent.style.borderRadius = "10px";
        warningContent.style.padding = "20px";
        warningContent.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
        warningContent.style.maxWidth = "500px"; // Adjust the max width to make it more compact
        warningContent.style.width = "90%"; // Adjust the width to make it responsive
        warningContent.style.animation = "bounceIn 0.5s"; // Add bounce-in animation

        const warningHeader = document.createElement("h1");
        warningHeader.innerHTML = "⚠️ Warning ⚠️";
        warningHeader.style.fontSize = "32px"; // Increased font size
        warningHeader.style.marginBottom = "20px";
        warningHeader.style.color = "#ffcc00"; // Gold color

        const warningMessage = document.createElement("p");
        warningMessage.innerHTML = 'This site is known to host <a href="https://en.wikipedia.org/wiki/Predatory_publishing" target="_blank" style="color: #ffcc00;">predatory journals</a>.';
        warningMessage.style.fontSize = "22px"; // Increased font size
        warningMessage.style.marginBottom = "20px";
        warningMessage.style.lineHeight = "1.5";
        warningMessage.style.color = "#333"; // Ensure text color is visible on white background

        const image = document.createElement("img");
        image.src = 'https://images.nature.com/lw1200/magazine-assets/d41586-019-03759-y/d41586-019-03759-y_17468170.jpg'; // Direct image URL
        image.style.width = "100%";
        image.style.borderRadius = "10px";
        image.style.marginBottom = "20px";
        image.style.maxHeight = "300px"; // Limit the height to make it more compact
        image.style.objectFit = "contain"; // Ensure the image fits well within the container

        const footer = document.createElement("div");
        footer.style.marginTop = "20px";
        footer.style.fontSize = "18px"; // Increased font size
        footer.style.color = "#333"; // Ensure text color is visible on white background
        footer.innerHTML = '<b>JournalGuard</b> - <a href="https://github.com/evonshahriar/journalguard" target="_blank" style="color: #ff5722;">GitHub.com/evonshahriar/journalguard</a>';

        const dismissButton = document.createElement("button");
        dismissButton.innerText = "Dismiss";
        dismissButton.style.marginTop = "20px";
        dismissButton.style.padding = "10px 20px";
        dismissButton.style.fontSize = "20px"; // Increased font size
        dismissButton.style.cursor = "pointer";
        dismissButton.style.backgroundColor = "#ff5722"; // Hogwarts themed button color
        dismissButton.style.border = "none";
        dismissButton.style.color = "white";
        dismissButton.style.borderRadius = "5px";
        dismissButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        dismissButton.onclick = () => {
            warningDiv.style.animation = "fadeOut 0.5s"; // Add fade-out animation
            setTimeout(() => {
                warningDiv.remove();
            }, 500); // Match the duration of the fade-out animation
        };

        warningContent.appendChild(warningHeader);
        warningContent.appendChild(warningMessage);
        warningContent.appendChild(image); // Add the image here
        warningContent.appendChild(dismissButton);
        warningContent.appendChild(footer);
        warningDiv.appendChild(warningContent);
        document.body.appendChild(warningDiv);

        // Add keyframes for animations
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes bounceIn {
                0% { transform: scale(0.5); opacity: 0; }
                60% { transform: scale(1.05); opacity: 1; }
                80% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});

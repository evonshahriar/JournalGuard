chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'warnUser') {
    if (!document.getElementById('journalguard-warning')) {  // Ensure the warning is only added once
      const warningDiv = document.createElement('div');
      warningDiv.id = 'journalguard-warning';
      warningDiv.style.position = 'fixed';
      warningDiv.style.top = '0';
      warningDiv.style.left = '0';
      warningDiv.style.width = '100%';
      warningDiv.style.height = '100vh';
      warningDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      warningDiv.style.color = 'white';
      warningDiv.style.zIndex = '10000';
      warningDiv.style.display = 'flex';
      warningDiv.style.flexDirection = 'column';
      warningDiv.style.justifyContent = 'center';
      warningDiv.style.alignItems = 'center';
      warningDiv.style.textAlign = 'center';
      warningDiv.style.padding = '20px';
      warningDiv.style.fontSize = '24px';
      warningDiv.style.fontFamily = 'Arial, sans-serif';

      const warningContent = document.createElement('div');
      warningContent.style.backgroundColor = 'white';
      warningContent.style.border = '2px solid #1b1b1b';
      warningContent.style.borderRadius = '10px';
      warningContent.style.padding = '20px';
      warningContent.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
      warningContent.style.maxWidth = '500px';
      warningContent.style.width = '90%';

      const warningHeader = document.createElement('h1');
      warningHeader.innerHTML = '⚠️ Warning ⚠️';
      warningHeader.style.fontSize = '32px';
      warningHeader.style.marginBottom = '20px';
      warningHeader.style.color = '#ffcc00';

      const warningMessage = document.createElement('p');
      warningMessage.innerHTML = 'This site is known to host <a href="https://en.wikipedia.org/wiki/Predatory_publishing" target="_blank" style="color: #ffcc00;">predatory journals</a>.';
      warningMessage.style.fontSize = '22px';
      warningMessage.style.marginBottom = '20px';
      warningMessage.style.lineHeight = '1.5';
      warningMessage.style.color = '#333';

      const image = document.createElement('img');
      image.src = 'https://images.nature.com/lw1200/magazine-assets/d41586-019-03759-y/d41586-019-03759-y_17468170.jpg';
      image.style.width = '100%';
      image.style.borderRadius = '10px';
      image.style.marginBottom = '20px';
      image.style.maxHeight = '300px';
      image.style.objectFit = 'contain';

      const footer = document.createElement('div');
      footer.style.marginTop = '20px';
      footer.style.fontSize = '18px';
      footer.style.color = '#333';
      footer.innerHTML = '<b>JournalGuard</b> - <a href="https://github.com/evonshahriar/journalguard" target="_blank" style="color: #ff5722;">GitHub.com/evonshahriar/journalguard</a>';

      const dismissButton = document.createElement('button');
      dismissButton.innerText = 'Dismiss';
      dismissButton.style.marginTop = '20px';
      dismissButton.style.padding = '10px 20px';
      dismissButton.style.fontSize = '20px';
      dismissButton.style.cursor = 'pointer';
      dismissButton.style.backgroundColor = '#ff5722';
      dismissButton.style.border = 'none';
      dismissButton.style.color = 'white';
      dismissButton.style.borderRadius = '5px';
      dismissButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      dismissButton.onclick = () => {
        warningDiv.remove();  // Use remove() method to remove the warningDiv
      };

      warningContent.appendChild(warningHeader);
      warningContent.appendChild(warningMessage);
      warningContent.appendChild(image);
      warningContent.appendChild(dismissButton);
      warningContent.appendChild(footer);
      warningDiv.appendChild(warningContent);
      document.body.appendChild(warningDiv);
    }
  }
});

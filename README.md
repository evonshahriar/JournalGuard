# JournalGuard: A Chrome Extension for Protecting Researchers from Predatory Journals

Evon Shahriar

---

**Abstract:** JournalGuard is a Chrome extension designed to protect researchers and academics from predatory journals. It provides real-time alerts when users visit websites known to host or be associated with predatory academic journals, ensuring access to only credible research sources. This README document outlines the features, installation process, usage instructions, and contribution guidelines for the JournalGuard project.

---

| 1. Introduction | 2. Features |
|-----------------|-------------|
| JournalGuard is a powerful tool in the fight against predatory publishing practices. By leveraging a community-maintained database of known predatory journal websites, it provides an essential layer of protection for researchers navigating the complex landscape of academic publishing. | - **Real-time Alerts:** Immediate warnings upon navigating to known predatory journal websites.<br>- **User-friendly Interface:** Clear, visually appealing warnings with detailed information.<br>- **Report Functionality:** Allows users to report suspicious journals directly from the extension.<br>- **Customizable:** Easy updating of the predatory journal list through a CSV file. |

| 3. Installation | 4. Usage |
|-----------------|----------|
| 1. Clone the repository or download the source code.<br>2. Open Chrome and navigate to `chrome://extensions`.<br>3. Enable "Developer mode" in the top right corner.<br>4. Click "Load unpacked" and select the directory containing the extension files. | Once installed, JournalGuard operates automatically in the background:<br>- A warning overlay appears when visiting a known predatory journal website.<br>- The JournalGuard icon in the browser toolbar opens the popup interface.<br>- Use the popup to report new predatory journals or the current site. |

| 5. File Structure | 6. Updating the Predatory Journal List |
|--------------------|---------------------------------------|
| The extension consists of the following key files:<br>- `manifest.json`: Defines the extension's properties and permissions.<br>- `background.js`: Handles background processes, including URL checks.<br>- `content.js`: Injects the warning overlay into web pages.<br>- `popup.html` and `popup.js`: Define the popup interface and functionality.<br>- `predatory_sites.csv`: Contains the list of known predatory journal websites. | The `predatory_sites.csv` file can be updated to add or remove entries:<br>1. Open the file in a text editor or spreadsheet application.<br>2. Each line represents one entry: `URL,Publisher,Source`<br>3. Add new entries or modify existing ones as needed.<br>4. Save the file and reload the extension for changes to take effect. |

| 7. Contributing | 8. License |
|-----------------|------------|
| Contributions to JournalGuard are welcome:<br>1. Fork the repository.<br>2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).<br>3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).<br>4. Push to the branch (`git push origin feature/AmazingFeature`).<br>5. Open a Pull Request. | This project is licensed under the MIT License. See the LICENSE file for details. |

| 9. Acknowledgments | 10. Contact |
|---------------------|-------------|
| - Icon created by [Freepik](https://www.freepik.com) from [Flaticon](https://www.flaticon.com/).<br>- Predatory journal data sourced from various academic resources and community contributions. | Evon Shahriar - [GitHub](https://github.com/evonshahriar)<br>Project Link: [https://github.com/evonshahriar/JournalGuard](https://github.com/evonshahriar/JournalGuard) |

---

*Made with ❤️ for the academic community*


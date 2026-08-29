# 🔐 Password Forge

Password Forge is a lightweight, responsive password generator built with **HTML, CSS, and vanilla JavaScript**.

It allows users to generate randomized passwords with a configurable length and selectable character sets, while providing password visibility controls, clipboard copying, and a simple strength estimation.

Password Forge is part of **ProyectoZ**, a personal development journey focused on building real software, learning through practical projects, and improving as a developer.

## ✨ Features

- 🔑 Generate randomized passwords
- 📏 Choose a password length from 4 to 64 characters
- 🔠 Include uppercase letters
- 🔡 Include lowercase letters
- 🔢 Include numbers
- 🔣 Include symbols
- ✅ Guarantees at least one character from every selected character set
- 🎲 Uses the **Web Crypto API** for random character selection
- 🔀 Shuffles generated characters before displaying the result
- 👁️ Show and hide the generated password
- 📋 Copy the password to the clipboard
- 📊 Estimate password strength
- 🌍 Automatic language detection
- 🇬🇧 English interface
- 🇪🇸 Spanish interface
- 🇫🇷 French interface
- 🇩🇪 German interface
- 🇮🇹 Italian interface
- 💾 Remembers the user's selected language
- 📱 Responsive layout for desktop and mobile
- ✨ Custom animations and micro-interactions
- 🎨 Custom UI built specifically for Password Forge

## 🌍 Internationalization

Password Forge automatically detects the user's preferred browser language and loads the corresponding translation.

Supported languages:

```text
English
Spanish
French
German
Italian
```

Translations are stored separately in JSON files:

```text
translations/
├── de.json
├── en.json
├── es.json
├── fr.json
└── it.json
```

Users can also manually switch languages from the language selector.

The selected language is stored locally so it is preserved when the user returns to the application.

## 🛡️ Password Generation

Password Forge uses the browser's **Web Crypto API** through `crypto.getRandomValues()` to select random characters.

When several character sets are enabled, the generator first ensures that each selected category contributes at least one character.

For example:

```text
Uppercase
Lowercase
Numbers
Symbols
```

A generated password will contain at least one character from each selected category before the remaining characters are generated and the final result is shuffled.

This prevents the required character types from always appearing in predictable positions.

## 📊 Password Strength

Password Forge includes a lightweight heuristic strength estimator.

The estimation considers:

- Password length
- Uppercase characters
- Lowercase characters
- Numbers
- Symbols

The interface displays five levels:

```text
Very weak
Weak
Medium
Strong
Very strong
```

This is intended as a **visual guideline**, not as a complete password security analysis or guarantee.

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| **HTML5** | Application structure and semantic markup |
| **CSS3** | Layout, responsive design, animations and UI styling |
| **JavaScript** | Application logic and user interactions |
| **Web Crypto API** | Random character generation |
| **Clipboard API** | Copying passwords to the clipboard |
| **Fetch API** | Loading language files dynamically |
| **JSON** | Translation data storage |
| **LocalStorage** | Remembering the selected language |
| **Git** | Version control |
| **GitHub** | Repository hosting |
| **GitHub Pages** | Deployment |

## 📁 Project Structure

```text
PasswordForge/
│
├── index.html
├── style.css
├── script.js
├── icono.png
├── interface.png
├── README.md
│
└── translations/
    ├── de.json
    ├── en.json
    ├── es.json
    ├── fr.json
    └── it.json
```

## 🚀 Getting Started

Password Forge does not require a build system, package manager, or external JavaScript libraries.

### Run locally

Clone the repository:

```bash
git clone https://github.com/adrianrrdev/PasswordForge.git
```

Move into the project directory:

```bash
cd PasswordForge
```

Because the application loads translation files using `fetch()`, it is recommended to run it through a local HTTP server rather than opening `index.html` directly with `file://`.

For example, using **Visual Studio Code** with a local development server:

```text
VS Code
   ↓
Local server
   ↓
http://localhost:...
   ↓
Password Forge
```

## 🌍 Live Demo

Try the deployed application:

**https://adrianrrdev.github.io/PasswordForge/**

## 📸 Screenshot

### Main Interface

![Password Forge interface](interface.png)

## 🧠 What I Learned

Building Password Forge was an opportunity to move from individual programming exercises to a complete small web application.

Throughout the project I practiced:

- Structuring web pages with HTML.
- Building responsive layouts with CSS.
- Using CSS variables.
- Creating reusable UI components.
- Working with Flexbox and CSS Grid.
- Creating animations and micro-interactions.
- Working with JavaScript functions and variables.
- Manipulating the DOM.
- Handling user interactions.
- Validating user input.
- Working with regular expressions.
- Using the Clipboard API.
- Using the Web Crypto API.
- Loading external JSON data with `fetch()`.
- Working with asynchronous JavaScript.
- Using `localStorage`.
- Implementing a multilingual interface.
- Testing and debugging.
- Using Git for version control.
- Publishing a project with GitHub Pages.
- Writing technical documentation.

More importantly, Password Forge taught me the complete development cycle:

```text
Idea
 ↓
Design
 ↓
Implementation
 ↓
Testing
 ↓
Debugging
 ↓
Refactoring
 ↓
Documentation
 ↓
Version Control
 ↓
Deployment
```

## 🔮 Future Improvements

Potential improvements for future versions include:

- [ ] Add password history
- [ ] Add more customization options
- [ ] Improve the strength estimator
- [ ] Add more advanced security recommendations
- [ ] Improve accessibility
- [ ] Add automated tests
- [ ] Add more visual themes
- [ ] Add more languages
- [ ] Improve error handling
- [ ] Add additional UI micro-interactions

## 🎮 ProyectoZ

Password Forge is the first major project of **ProyectoZ**, a personal year-long challenge focused on learning by building real software.

The goal of ProyectoZ is not simply to learn programming concepts, but to develop the ability to:

> **Build. Test. Improve. Document. Publish.**

Each project is designed to introduce new technologies and increasingly advanced development concepts while creating something that can become part of a real portfolio.

## 👨‍💻 Author

Built by **[adrianrrdev](https://github.com/adrianrrdev)** as part of **ProyectoZ**.

---

⭐ **If you found Password Forge useful or interesting, feel free to explore the repository and follow the project's development.**

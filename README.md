# 🔐 Password Forge

Password Forge is a modern, responsive password generator built with vanilla HTML, CSS, and JavaScript.

It allows users to generate strong random passwords by choosing their desired length and the character types they want to include: uppercase letters, lowercase letters, numbers, and symbols.

The application also provides a password strength estimation based on the password's length and character variety.

This project was created as part of **ProyectoZ**, a personal learning project focused on developing real-world software, improving programming skills, and learning how to use AI as a development tool.

---

## ✨ Features

- 🔑 Generate random passwords
- 📏 Customizable password length
- 🔠 Uppercase letters
- 🔡 Lowercase letters
- 🔢 Numbers
- 🔣 Symbols
- 👁️ Show and hide the generated password
- 📋 Copy passwords to the clipboard
- 📊 Password strength estimation
- 📱 Responsive design
- ✅ Guarantees at least one character from each selected category
- 🎲 Uses `crypto.getRandomValues()` for stronger random number generation
- 🎨 Animated interface and custom UI components
- 💜 Custom visual design created specifically for Password Forge

---

## 🛠️ Technologies

- **HTML5** — page structure and semantic elements
- **CSS3** — styling, animations, transitions, and responsive design
- **JavaScript** — application logic and user interactions
- **Web Crypto API** — secure random number generation
- **Clipboard API** — copying passwords to the clipboard

---

## ⚙️ How It Works

Password Forge allows the user to configure the characteristics of the password before generating it.

The user can:

1. Choose the desired password length.
2. Select the character categories to include.
3. Generate a password.
4. Show or hide the generated password.
5. Check the estimated password strength.
6. Copy the password to the clipboard.

When multiple character categories are selected, Password Forge guarantees that the generated password contains at least one character from each selected category.

After the required characters are added, the password is shuffled so that the selected character types are not kept in predictable positions.

### Password Strength

Password Forge includes a simple heuristic password strength estimator.

The estimation considers:

- Password length
- Uppercase letters
- Lowercase letters
- Numbers
- Symbols

The result is displayed using five visual strength levels:

- Very weak
- Weak
- Medium
- Strong
- Very strong

This estimation is intended as a visual guide and should not be considered a definitive security analysis.

---

## 📁 Project Structure

```text
PasswordForge/
│
├── index.html
├── style.css
├── script.js
├── icono.png
├── interface.png
└── README.md
```

---

## 🚀 Getting Started

No installation or external dependencies are required.

### Run locally

Clone the repository:

```bash
git clone https://github.com/adrianrrdev/PasswordForge.git
```

Open the project folder:

```bash
cd PasswordForge
```

Then open `index.html` in your browser.

You can also open the project in **Visual Studio Code** and use a local development server to run it.

---

## 🌍 Live Demo

The current deployed version of Password Forge is available here:

**https://adrianrrdev.github.io/PasswordForge/**

---

## 📸 Screenshot

### Main Interface

![Password Forge interface](interface.png)

---

## 📚 What I Learned

Building Password Forge helped me practice several important web development concepts:

- Structuring a web application with HTML.
- Creating responsive interfaces with CSS.
- Working with CSS variables, transitions, and animations.
- Working with JavaScript functions and variables.
- Manipulating the DOM.
- Handling user interactions and events.
- Working with the Clipboard API.
- Using the Web Crypto API.
- Validating user input.
- Working with regular expressions.
- Creating a password strength estimation system.
- Designing a simple and intuitive user experience.
- Using Git and GitHub for version control.
- Testing and debugging a project before publication.
- Deploying a static web application with GitHub Pages.
- Documenting a project for other developers.

More importantly, this project was an introduction to building a complete small application from scratch, from the initial design and implementation to testing, version control, documentation, and publication.

---

## 🔮 Future Improvements

Possible improvements for future versions include:

- [ ] Add password history.
- [ ] Add more password customization options.
- [ ] Improve accessibility.
- [ ] Add automated tests.
- [ ] Add additional visual themes.
- [ ] Improve password strength analysis.
- [ ] Add more advanced security recommendations.
- [ ] Improve animations and micro-interactions.

---

## 🎮 ProyectoZ

Password Forge is the first major project of **ProyectoZ**, a personal year-long challenge designed to develop practical programming skills through real projects.

The goal is not only to learn how to code, but to learn how to **build, test, document, publish, and improve real software**.

---

**Built by [adrianrrdev](https://github.com/adrianrrdev) as part of ProyectoZ.**

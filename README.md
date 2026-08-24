# 🔐 Password Forge

Password Forge is a modern, responsive password generator built with vanilla HTML, CSS, and JavaScript.

It allows users to generate strong random passwords by choosing their desired length and the character types they want to include: uppercase letters, lowercase letters, numbers, and symbols.

This project was created as part of **ProyectoZ**, a personal learning project focused on developing real-world software, improving programming skills, and learning how to use AI as a development tool.

## ✨ Features

* 🔑 Generate random passwords
* 📏 Customizable password length
* 🔠 Uppercase letters
* 🔡 Lowercase letters
* 🔢 Numbers
* 🔣 Symbols
* 👁️ Show and hide the generated password
* 📋 Copy passwords to the clipboard
* 📱 Responsive design
* 🛡️ Guarantees at least one character from each selected category
* 🎲 Uses `crypto.getRandomValues()` for stronger random number generation

## 🛠️ Technologies

* **HTML5** — page structure
* **CSS3** — styling, animations, and responsive design
* **JavaScript** — application logic and user interactions
* **Web Crypto API** — random number generation

## ⚙️ How It Works

Password Forge allows the user to configure the characteristics of the password before generating it.

The user can:

1. Choose the desired password length.
2. Select the character categories to include.
3. Generate a password.
4. Show or hide the generated password.
5. Copy the password to the clipboard.

When multiple character categories are selected, Password Forge guarantees that the generated password contains at least one character from each selected category.

After the required characters are added, the password is shuffled so that the selected character types are not kept in predictable positions.

## 📁 Project Structure

```text
PasswordForge/
├── index.html
├── style.css
├── script.js
├── interface.png
└── README.md
```

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

## 📸 Screenshots

### Main Interface

![Password Forge interface](interface.png)

## 📚 What I Learned

Building Password Forge helped me practice several important web development concepts:

* Structuring a web application with HTML.
* Creating responsive interfaces with CSS.
* Working with JavaScript functions and variables.
* Manipulating the DOM.
* Handling user interactions and events.
* Working with the Clipboard API.
* Using the Web Crypto API.
* Validating user input.
* Designing a simple and intuitive user experience.
* Using Git and GitHub for version control.
* Testing and debugging a project before publication.
* Documenting a project for other developers.

More importantly, this project was an introduction to building a complete small application from scratch, from the initial design and implementation to testing, documentation, and publication.

## 🔮 Future Improvements

Possible improvements for future versions include:

* [ ] Add password strength estimation.
* [ ] Add password history.
* [ ] Add more customization options.
* [ ] Improve accessibility.
* [ ] Add automated tests.
* [ ] Add additional visual themes.
* [ ] Deploy a live version of the application.

## 🎮 ProyectoZ

Password Forge is the first major project of **ProyectoZ**, a personal year-long challenge designed to develop practical programming skills through real projects.

The goal is not only to learn how to code, but to learn how to **build, test, document, publish, and improve real software**.

---

**Built by [adrianrrdev](https://github.com/adrianrrdev) as part of ProyectoZ.**

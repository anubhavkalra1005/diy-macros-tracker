
# 🥗 DIY Macros Tracker

**DIY Macros Tracker** is a modern, full-stack web application that helps you track your daily macronutrient intake from various foods. Built with React.js, Node.js, Express, and Prisma, it offers a beautiful, intuitive interface and robust backend for seamless nutrition tracking.

---

## 🚀 Features

- 📊 **Macros Chart:** View, add, and edit food items with their macros in a dynamic table.
- 📝 **Add/Edit Foods:** Beautiful forms and modals for adding or editing food items, with floating labels and validation.
- 🧮 **Automatic Calculations:** Track calories, protein, carbohydrates, and fats for each food and in total.
- 🏷️ **Custom Units:** Manage food units (g, ml, etc.) with a backend-powered dropdown.
- 👤 **User Management:** Add and manage users (for multi-user support).
- 🌈 **Modern UI:** Responsive, gradient backgrounds, sticky header, and visually appealing design.
- 🔥 **Hot Reloading:** Fast development with nodemon and Vite.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite), CSS-in-JS
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via Prisma ORM)
- **ORM:** Prisma
- **API:** RESTful endpoints

---

## 📦 Project Structure

```
diy-macros-tracker/
|── README.md              # This file
├── server/                # Express backend & Prisma
│   ├── index.js           # Main server file
│   └── prisma/            # Prisma schema & migrations
└── frontend/
    ├── public/            # Static assets
    ├── src/               # React frontend
    │   ├── components/    # UI components
    │   └── assets/        # Images & icons
    └── package.json       # Project metadata
```

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/anubhavkalra1005/diy-macros-tracker.git
cd diy-macros-tracker
```

### 2. Install Dependencies

Install both frontend and backend dependencies:

```bash
# Install root dependencies (Vite, etc.)
cd frontend
npm install
cd ..

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Start the Backend Server

```bash
cd server
npm run dev
# or
# node index.js
```

### 4. Start the Frontend

```bash
cd frontend
npm run dev
# The app will be available at http://localhost:5173
```

---

## 🌟 Usage

1. Open the app in your browser.
2. Add users and food items with their macros.
3. Track your daily intake and visualize your macros chart.
4. Edit or delete entries as needed.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Questions?

Feel free to open an issue or contact the maintainer at [anubhavkalra1005](https://github.com/anubhavkalra1005).
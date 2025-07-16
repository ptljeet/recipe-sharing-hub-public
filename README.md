# 🍳 Recipe Sharing Hub

The **Recipe Sharing Hub** is a full-stack web application built with Next.js, TypeScript, and MongoDB. It is designed for food enthusiasts to **share**, **discover**, and **save recipes**, offering a social platform for collaboration and inspiration in the kitchen.

---

## 📝 Project Description

The Recipe Sharing Hub provides a community-driven space where users can:
- Share their own recipes (with images)
- Browse recipes posted by others
- Save and manage their favorite recipes
- Discover new dishes by category, tags, or search
- Engage in a clean, intuitive, and mobile-friendly interface

---

## 🎯 Target Audience

- Home cooks & professional chefs  
- Culinary bloggers & students  
- Food hobbyists & health-focused individuals  
- Anyone who enjoys exploring new recipes!

---

## 🥅 Project Objective

To build an engaging and collaborative recipe-sharing platform that:
- Promotes food culture and creativity  
- Supports rich user interaction  
- Allows easy posting, discovery, and saving of recipes  
- Delivers a seamless experience across devices

---

## 👨‍💻 Team Roles

| Team Member     | Responsibilities                               |
|------------------|-------------------------------------------------|
| **Neha Desai**   | User Registration & Login, Save/Favorite Recipes |
| **Devarsh Raval**| Add a Recipe, Search & Filter Recipes           |
| **Jeet Patel**   | View All Public Recipes, User Profile Page      |

---

## 🚀 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS (optional)
- **Backend:** API Routes, MongoDB with Mongoose
- **Authentication:** JWT / NextAuth
- **Database:** MongoDB (Atlas/local)
- **Hosting:** Vercel / Local Dev

---

## 🛠️ How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/your-username/recipe-sharing-hub.git
cd recipe-sharing-hub
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create a `.env.local` file and add your MongoDB URI:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/recipes
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Key Features

- 🔐 Secure registration and login
- 🍲 Add recipes with images, categories, and tags
- 🔍 Search and filter by title, tags, or category
- ❤️ Favorite and save recipes for later
- 👤 User profile page to manage your posts
- 🌐 View public feed of all recipes

---

## 📁 Project Structure

```

├───public
└───src
    ├───app
    │   ├───api
    │   │   ├───auth
    │   │   │   ├───login
    │   │   │   └───logout
    │   │   ├───recipes
    │   │   │   └───[id]
    │   │   └───users
    │   │       └───[id]
    │   │           └───favorites
    │   ├───dashboard
    │   ├───login
    │   ├───recipes
    │   │   ├───new
    │   │   └───[id]
    │   ├───register
    │   └───saved
    ├───components
    ├───context
    ├───lib
    └───models
```

## 📄 License

This project is built for educational and collaborative purposes by students of Humber College, Canada.

---

Enjoy sharing and discovering delicious ideas! 🍽️

# 🚀 TaskFlow - Full Stack Task Manager

TaskFlow is a modern, responsive Task Management application built to help users organize their daily activities efficiently. It features secure authentication and real-time task updates.

![dashboard Screenshot](./screenshots/dashboard.png)

## ✨ Features

- **🔐 User Authentication:** Secure Login and Signup using JWT & BCrypt.
- **📝 CRUD Operations:** Create, Read, Update (mark as completed), and Delete tasks.
- **🎨 Modern UI:** Clean and responsive interface built with Tailwind CSS.
- **🗄️ Database:** Persistent data storage using MySQL and Prisma ORM.

## 🛠️ Tech Stack

**Frontend:**
- React (TypeScript)
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js & Express
- Prisma ORM
- MySQL
- TypeScript

## 📸 Screenshots

| Login Page | Dashboard |
|:---:|:---:|
| ![inscription](./screenshots/inscription.png) | ![dashboard](./screenshots/dashboard.png) |

## 🚀 How to Run Locally

Follow these steps to get the project running on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/mouadelamri/TaskFlow-FullStack.git](https://github.com/mouadelamri/TaskFlow-FullStack.git)
cd TaskFlow-FullStack
2. Setup Backend (Server)
cd server
npm install
# Create a .env file and add your DATABASE_URL
npx prisma migrate dev
npm run dev
3. Setup Frontend (Client)
Open a new terminal:
cd client
npm install
npm start
👨‍💻 Author
Mouad El Amri

GitHub: @mouadelamri

Made with ❤️ by Mouad.
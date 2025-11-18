
## 🐳 Running with Docker (Recommended)

Make sure you have **Docker Desktop** installed.

### **1. Build the containers**

```sh
docker compose build
```

### **2. Start the project**

```sh
docker compose up
```

### **3. Open in browser**

Visit:

```
http://localhost:5173
```

---

## 🛠️ Running Without Docker

If you do not have Docker Desktop installed, you can start the project manually.

---

## 📌 Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

This will start the frontend on:

```
http://localhost:5173
```

---

## 📡 Backend Setup

```sh
cd backend
npm install
npm run dev
```

Backend will start on its configured port (usually `http://localhost:3000`).

---

## 📂 Project Structure

```
second-brain/
├── frontend/    # UI built with modern web tools
├── backend/     # API, routes, controllers, database logic
├── docker-compose.yml
└── README.md
```


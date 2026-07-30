# 🛒 Nexus Mart

A full-stack MERN e-commerce platform with role-based access, JWT authentication, product management, and integrated Braintree payments.

---

## ✨ Features

- **Authentication & Authorization** — JWT-based login/register, protected routes, admin vs. user role separation, forgot-password flow
- **Product Management** — Create, update, delete products with image upload, category assignment, and stock/shipping info
- **Smart Product Discovery** — Keyword search, price-range filtering, pagination, category-wise browsing, and "related products" recommendations
- **Category Management** — Full CRUD with slug-based routing for clean, SEO-friendly URLs
- **Order & Payment System** — Braintree payment gateway integration for secure checkout, with order status tracking (`Not Process → Processing → Shipped → Delivered`)
- **User Profiles** — Update personal details and shipping address post-registration

---

## 🧰 Tech Stack

**Frontend**
- React 18, React Router DOM
- Ant Design (UI components)
- Axios (API calls)
- React Hot Toast (notifications)
- Braintree Web Drop-in (payment UI)

**Backend**
- Node.js, Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- Express-formidable (file/image uploads)
- Braintree (payment processing)
- Morgan (request logging), Colors (console logging)

---

## 📁 Project Structure

```
Nexus-Mart/
├── client/            # React frontend
├── config/            # Database connection setup
├── controllers/        # Route logic (auth, category, product)
├── helpers/            # Utility functions (e.g. password hashing)
├── middlewares/         # Auth guards (requireSignIn, isAdmin)
├── models/            # Mongoose schemas (User, Product, Category, Order)
├── routes/            # Express route definitions
└── server.js           # App entry point
```

---

## 🔌 API Overview

| Module | Endpoint | Method | Description |
|---|---|---|---|
| Auth | `/api/v1/auth/register` | POST | Register a new user |
| Auth | `/api/v1/auth/login` | POST | User login |
| Auth | `/api/v1/auth/forgot-password` | POST | Reset password via security answer |
| Auth | `/api/v1/auth/profile` | PUT | Update user profile |
| Category | `/api/v1/category/create-category` | POST | Create category (admin) |
| Category | `/api/v1/category/get-category` | GET | List all categories |
| Product | `/api/v1/product/create-product` | POST | Create product with image (admin) |
| Product | `/api/v1/product/get-product` | GET | List all products |
| Product | `/api/v1/product/product-filters` | POST | Filter by category/price |
| Product | `/api/v1/product/search/:keyword` | GET | Search products |
| Product | `/api/v1/product/related-product/:pid/:cid` | GET | Get related products |
| Product | `/api/v1/product/braintree/payment` | POST | Process payment |

> Full route list available in `/routes`.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas)
- Braintree sandbox credentials

### 1. Clone the repo
```bash
git clone https://github.com/Ankush126863/Nexus-Mart.git
cd Nexus-Mart
```

### 2. Install dependencies
```bash
npm install
npm install --prefix ./client
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```
PORT=8080
DEV_MODE=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
```

### 4. Run the app
```bash
npm run dev
```
This runs the backend (`nodemon server.js`) and frontend (`client`) concurrently.

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`

---

## 🖼️ Screenshots

*<img width="1917" height="845" alt="Screenshot 2026-07-30 223436" src="https://github.com/user-attachments/assets/83ad913c-b6d7-4a1b-87d5-d8d2af115502" />
<img width="1906" height="843" alt="Screenshot 2026-07-30 223111" src="https://github.com/user-attachments/assets/94e3551a-e686-4b8c-b386-d531f413fe26" />
<img width="1891" height="870" alt="Screenshot 2026-07-30 223359" src="https://github.com/user-attachments/assets/0a36d7a8-e5aa-42f3-8bd5-47f76e69e4f7" />

*

---

## 📌 Notes

- Product images are stored as binary data (Buffer) directly in MongoDB
- Slugs are auto-generated for both products and categories for clean, SEO-friendly URLs
- Role-based middleware (`requireSignIn`, `isAdmin`) protects all admin-only routes

---

## 📄 License

This project is licensed under the MIT License.

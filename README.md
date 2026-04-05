# Zorvyn | Premium Finance Dashboard

Zorvyn is a high-performance, aesthetically-driven finance dashboard designed by **Saurabh Bhardwaj**. It focuses on "Glassmorphism" aesthetics, fluid animations, and a seamless user experience for managing personal transactions and financial insights.

---

## ✨ Features

- **💎 Premium Glassmorphism UI**: Built with a layered, translucent design system that feels lightweight and modern.
- **📊 Real-time Financial Insights**: Visualized data through interactive Recharts with custom styling.
- **💸 Transaction Management**: Full CRUD capabilities for transactions with advanced filtering and sorting.
- **🔐 Role-Based Access Control**: Toggle between **Admin** (Full Access) and **Viewer** (Read-only) modes.
- **⚡ Fluid Animations**: Powered by Framer Motion for staggered entries, floating decorative elements, and smooth transitions.
- **📱 Fully Responsive**: Optimized for Desktop, Tablet, and Mobile with a dedicated mobile bottom navigation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd Zorvyn-Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Zustand

---

## 📐 Architecture & Approach

### 1. Atomic State Management
We use **Zustand** for a lightweight, decentralized state management approach. Each domain (Transactions, UI, User) has its own store, allowing for focused updates and high performance.

### 2. Motion Design System
Animations aren't just an afterthought; they are integrated into the component lifecycle. Custom `motionVariants` ensure a consistent "floating" and "liquid" feel across the entire app.

### 3. Glassmorphism & Depth
The UI utilizes a custom `glass` layer defined in Tailwind, combining `backdrop-blur`, subtle borders, and layered shadows to create visual hierarchy without heavy colors.

---

## 📝 Deployment

This project is deployed on **Vercel** with url https://zorvyn-finance-dashboard-liart.vercel.app/. 

---


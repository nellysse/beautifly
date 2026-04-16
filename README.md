# 🦋 Beautyfly | Admin Panel

**Beautyfly** is a modern, aesthetic management dashboard designed for cosmetics inventory. This project demonstrates proficiency in React.js, third-party API integration, and building responsive business interfaces.

## ✨ Key Features
- **Live Data Integration:** Powered by the [Makeup API](https://makeup-api.herokuapp.com/), specifically fetching real-time data for Maybelline products.
- **Dynamic Dashboard:** Automated metrics calculation including total product count, unique category filtering, and stock simulation.
- **Full Inventory Management:** View detailed product specifications and perform simulated updates through a clean, intuitive UI.
- **SLA-Focused Reliability:** Designed with **Uptime SLA** principles in mind, featuring robust error handling and loading states to ensure a seamless user experience during API latency.
- **Responsive Design:** A mobile-first approach using Tailwind CSS with a custom "Rose/Pink" aesthetic.

## 🛠 Tech Stack
- **Frontend:** React 18 (Hooks, Router DOM)
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **HTTP Client:** Axios
- **Deployment:** Vercel (Configured with `vercel.json` for SPA routing)

## 📊 Technical Architecture
The application is structured using a **Controller-Service-Repository** pattern logic on the frontend to separate concerns. It handles asynchronous data fetching with lifecycle hooks and ensures data integrity through form validation.

## 🚀 Getting Started
1. **Clone the repository:** ```bash
   git clone [https://github.com/nellysse/beautifly.git](https://github.com/nellysse/beautifly.git)
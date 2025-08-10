# 🚀 Optimized Currency Converter

A feature-rich and performance-optimized currency converter application built with React. This project allows users to get real-time exchange rates and includes modern features for an excellent user experience.

**[Live Demo Link Here]** ![Currency Converter Screenshot](![currency converter Gif](https://github.com/user-attachments/assets/6847de23-852c-44cb-8991-ced7da3ff10d)
) ## 📜 Description

This is a web application that provides real-time currency conversion. It was built not just to be functional, but also to be fast, efficient, and user-friendly, incorporating several advanced frontend development techniques.

## ✨ Key Features

-   **Real-time Exchange Rates:** Fetches the latest currency conversion rates from a live API.
-   **Dark / Light Mode:** A toggle to switch between dark and light themes for user comfort.
-   **Performance Optimized:**
    -   **Debouncing:** Implemented on the amount input to minimize API calls and improve performance.
    -   **Memoization:** Used `React.memo` and `useCallback` to prevent unnecessary component re-renders.
-   **Great User Experience (UX):**
    -   **Loading & Error States:** Clear feedback to the user while data is being fetched or if an error occurs.
    -   **Local Storage:** Remembers the user's last selected currencies for convenience.
-   **1-Unit Rate Display:** Shows the conversion rate for a single unit (e.g., 1 USD = 83.54 INR) for clarity.

## 🛠️ Tech Stack

-   **Frontend:** React.js
-   **Styling:** Tailwind CSS
-   **State Management:** React Hooks (useState, useEffect, useCallback, custom hooks)
-   **API:** Fawaz Ahmed's Currency API

## ⚙️ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/manishub45/currency-convertor.git](https://github.com/manishub45/currency-convertor.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```

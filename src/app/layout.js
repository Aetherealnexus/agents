'use client'; // Mark as Client Component

import React, { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css"; // Global CSS for themes

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  // Manage the theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme in localStorage
  };

  return (
    <html lang="en" className={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="theme-toggle-container">
          {/* Toggle theme button */}
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun" width="24" height="24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" width="24" height="24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        <div className="container">
          <main className="content">{children}</main>
          <footer className="footer">
            <div className="footer-container">
              <h1 className="footer-title">Aethereal Nexus</h1>
              <p className="footer-reserved">Reserved</p>
              <div className="footer-sections">
                <div className="footer-wallet">
                  <span>Concretization under transparency → </span>
                  <span className="wallet-address">[Wallet Address Here]</span>
                </div>
                <div className="footer-return">
                  <a href="/" className="return-link">Return to Main Page</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

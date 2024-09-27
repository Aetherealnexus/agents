"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Fetch pages from the API route
  const loadPages = async () => {
    try {
      const response = await fetch("/api/pages"); // Fetching from the dynamic API
      const data = await response.json();
      setPages(data); // Update state with fetched pages
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  useEffect(() => {
    // Load pages when the component mounts
    loadPages();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedPages = showAll ? filteredPages : filteredPages.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Find Your Ideal Agent</h1>
        <p className={styles.subtitle}>
          Explore innovative solutions and the agents behind them.
        </p>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for Agents..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
            aria-label="Search for Agents"
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      <div className={styles.pagesList}>
        <h2 className={styles.listTitle}>Featured Agents</h2>
        <ul className={styles.pageLinks}>
          {displayedPages.map((page) => (
            <li key={page.path} className={styles.pageItem}>
              <Link href={page.path} className={styles.pageLink}>
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
        {filteredPages.length > 5 && (
          <button
            className={styles.showMoreButton}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
}

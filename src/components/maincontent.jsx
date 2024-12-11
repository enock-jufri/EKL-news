import React from "react";

function MainContent() {
  return (
    <main className="main-content">
      <article className="featured-news">
        <img src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/6786/live/9dba9840-b34d-11ef-a0f2-fd81ae5962f4.jpg.webp" alt="Featured News" />
        <h2>
          Trump lays out sweeping early acts on deportation and January 6
          pardons
        </h2>
        <p>
          President-elect Donald Trump in a television interview that aired
          Sunday previewed a sweeping agenda for his first days in office...
        </p>
      </article>
      <footer class="footer">
  <div class="footer-container">
    
    <div class="footer-section">
      <h4>Sections</h4>
      <ul>
        <li><a href="#">Trending</a></li>
        <li><a href="#">Politics</a></li>
        <li><a href="#">Health</a></li>
        <li><a href="#">Sports</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Entertainment</a></li>
      </ul>
    </div>

    <div class="footer-section">
      <h4>Follow Us</h4>
      <ul class="social-links">
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Instagram</a></li>
        <li><a href="#">YouTube</a></li>
      </ul>
    </div>

    <div class="footer-section">
      <h4>Contact Us</h4>
      <p>Email: support@example.com</p>
      <p>Phone: +254 (800) 123-4567</p>
    </div>

    <div class="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Help Center</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; 2024 EKL News. All Rights Reserved.</p>
  </div>
</footer>
    </main>
  );
}

export default MainContent;

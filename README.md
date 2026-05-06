# 🚀 Hebatollah Alayan - Full-Stack Web Portfolio

![Portfolio Screenshot](https://hebatollah.page.gd/screenshot.png)

A professional **Full-Stack Web Portfolio** built as part of the Software Engineering curriculum, showcasing skills in modern web development technologies.

## 🌐 Live Demo
🔗 **[View Live Portfolio](https://hebatollah.page.gd)**

## 🔑 Admin Panel
🔗 **[Admin Login](https://hebatollah.page.gd/admin/login.php)**

---

## 🛠️ Technologies Used

| Front-End | Back-End | Database |
|-----------|----------|----------|
| HTML5 | PHP 8.x | MySQL |
| CSS3 (Grid, Flexbox) | Sessions & Cookies | phpMyAdmin |
| JavaScript (ES6+) | MySQLi (Prepared Statements) | |
| Font Awesome | CSRF Protection | |
| Google Fonts | Password Hashing (Bcrypt) | |

---

## ✨ Features

### Public Portfolio
- 📱 **Fully Responsive** – Works on all devices (desktop, tablet, mobile)
- 🌙 **Dark Mode** – Toggle with persistent preference
- 🖼️ **Image Slider** – Modal gallery for project screenshots
- ✅ **Form Validation** – Real-time client-side + server-side validation
- 📬 **Contact Form** – Messages saved to MySQL database
- ⚡ **AJAX Loading** – Projects loaded dynamically without page refresh

### Admin Dashboard
- 🔐 **Secure Login** – Bcrypt password hashing + prepared statements
- 📊 **Dashboard Stats** – Project and message counts at a glance
- ✏️ **CRUD Operations** – Add, edit, and delete portfolio projects
- 📧 **Message Viewer** – View all contact form submissions
- 🍪 **Remember Me** – Persistent login with secure cookies
- 🔒 **CSRF Protected** – All forms protected against forgery

---

## 🗄️ Database Setup

1. Create a MySQL database named `portfolio_db`
2. Import the file `database/portfolio_db.sql`
3. Update credentials in `includes/config.php`

```php
define('DB_HOST', 'your_host');
define('DB_NAME', 'portfolio_db');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');

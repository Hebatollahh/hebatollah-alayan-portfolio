<?php
/**
 * Logout Handler
 * Hebatollah Alayan - Portfolio
 */

session_start();

// Clear all session variables
$_SESSION = [];

// Destroy the session cookie
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}

// Destroy the session
session_destroy();

// Clear remember me cookie
if (isset($_COOKIE['remember_token'])) {
    // Remove from database if possible
    require_once '../includes/config.php';
    $stmt = $conn->prepare("UPDATE admin_users SET remember_token = NULL WHERE remember_token = ?");
    $stmt->bind_param("s", $_COOKIE['remember_token']);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    
    // Delete cookie
    setcookie('remember_token', '', time() - 3600, '/', '', 
        isset($_SERVER['HTTPS']), true);
}

// Clear theme cookie
setcookie('theme', '', time() - 3600, '/');

// Redirect to login page
header('Location: login.php?logged_out=1');
exit;
?>
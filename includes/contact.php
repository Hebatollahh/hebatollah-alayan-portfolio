<?php
/**
 * Contact Form Handler
 * Hebatollah Alayan - Portfolio
 */

require_once 'config.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['status' => 'error', 'message' => 'Invalid request method.'], 405);
}


// Get and sanitize form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Server-side validation
$errors = [];

// Name validation
if (empty($name)) {
    $errors[] = 'Name is required.';
} elseif (strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters long.';
} elseif (strlen($name) > 100) {
    $errors[] = 'Name must be less than 100 characters.';
} elseif (!preg_match("/^[a-zA-Z\s\-'.]+$/", $name)) {
    $errors[] = 'Name contains invalid characters.';
}

// Email validation
if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

// Message validation
if (empty($message)) {
    $errors[] = 'Message is required.';
} elseif (strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters long.';
} elseif (strlen($message) > 1000) {
    $errors[] = 'Message must be less than 1000 characters.';
}

// Subject validation (optional field)
if (!empty($subject) && strlen($subject) > 200) {
    $errors[] = 'Subject must be less than 200 characters.';
}

// If there are validation errors
if (!empty($errors)) {
    jsonResponse(['status' => 'error', 'message' => implode(' ', $errors)], 422);
}

// Prepare SQL statement to prevent SQL injection
$sql = "INSERT INTO contacts (name, email, subject, message, ip_address, user_agent, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("Prepare failed: " . $conn->error);
    jsonResponse(['status' => 'error', 'message' => 'A database error occurred. Please try again.'], 500);
}

// Get client information
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';

// Bind parameters
$stmt->bind_param(
    "ssssss",
    $name,
    $email,
    $subject,
    $message,
    $ipAddress,
    $userAgent
);

// Execute the statement
if ($stmt->execute()) {
    jsonResponse([
        'status' => 'success',
        'message' => 'Thank you! Your message has been sent successfully. I will get back to you soon.'
    ]);
} else {
    error_log("Insert failed: " . $stmt->error);
    jsonResponse(['status' => 'error', 'message' => 'Failed to save your message. Please try again.'], 500);
}

$stmt->close();
?>
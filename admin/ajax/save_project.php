<?php
require_once '../../includes/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$image_url = trim($_POST['image_url'] ?? '');
$link = trim($_POST['link'] ?? '');

// Validate
if (empty($title) || empty($description) || empty($image_url) || empty($link)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
    exit;
}

if ($id > 0) {
    // Update existing project
    $stmt = $conn->prepare("UPDATE projects SET title = ?, description = ?, image_url = ?, link = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $title, $description, $image_url, $link, $id);
} else {
    // Insert new project
    $stmt = $conn->prepare("INSERT INTO projects (title, description, image_url, link) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $description, $image_url, $link);
}

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Project saved successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $conn->error]);
}

$stmt->close();
?>
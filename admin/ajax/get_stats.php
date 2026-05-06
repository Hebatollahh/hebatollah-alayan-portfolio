<?php
require_once '../../includes/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$projectsCount = $conn->query("SELECT COUNT(*) as count FROM projects")->fetch_assoc()['count'] ?? 0;
$messagesCount = $conn->query("SELECT COUNT(*) as count FROM contacts")->fetch_assoc()['count'] ?? 0;

echo json_encode([
    'projects' => $projectsCount,
    'messages' => $messagesCount,
]);
?>
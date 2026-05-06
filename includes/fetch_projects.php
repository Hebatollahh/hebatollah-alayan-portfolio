<?php
/**
 * Fetch Projects for AJAX
 * Hebatollah Alayan - Portfolio
 */

require_once 'config.php';

// Set appropriate headers
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

try {
    // Query to fetch all projects ordered by creation date (newest first)
    $sql = "SELECT id, title, description, image_url, link, created_at 
            FROM projects 
            ORDER BY created_at DESC";
    
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }
    
    $projects = [];
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $projects[] = [
                'id' => (int)$row['id'],
                'title' => htmlspecialchars($row['title'], ENT_QUOTES, 'UTF-8'),
                'description' => htmlspecialchars($row['description'], ENT_QUOTES, 'UTF-8'),
                'image_url' => htmlspecialchars($row['image_url'], ENT_QUOTES, 'UTF-8'),
                'link' => htmlspecialchars($row['link'], ENT_QUOTES, 'UTF-8'),
                'created_at' => $row['created_at'],
            ];
        }
    }
    
    // Return projects as JSON
    echo json_encode($projects, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
    $result->free();
    
} catch (Exception $e) {
    error_log("Error fetching projects: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch projects.']);
}
?>
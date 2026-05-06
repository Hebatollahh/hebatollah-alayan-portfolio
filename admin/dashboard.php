<?php
/**
 * Admin Dashboard
 * Hebatollah Alayan - Portfolio
 */

require_once '../includes/config.php';

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Fetch counts for dashboard stats
$projectsCount = 0;
$messagesCount = 0;

$result = $conn->query("SELECT COUNT(*) as count FROM projects");
if ($result) {
    $projectsCount = $result->fetch_assoc()['count'];
    $result->free();
}

$result = $conn->query("SELECT COUNT(*) as count FROM contacts");
if ($result) {
    $messagesCount = $result->fetch_assoc()['count'];
    $result->free();
}

// Get recent messages
$recentMessages = [];
$result = $conn->query("SELECT id, name, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5");
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $recentMessages[] = $row;
    }
    $result->free();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Dashboard - Admin Panel</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
    
    <div class="admin-layout">
        <!-- Sidebar -->
        <?php include 'includes/sidebar.php'; ?>
        
        <!-- Main Content -->
        <main class="admin-main">
            <header class="admin-topbar">
                <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="admin-user">
                    <span class="user-greeting">Welcome, <strong><?php echo htmlspecialchars($_SESSION['admin_username']); ?></strong></span>
                    <div class="user-avatar">
                        <i class="fas fa-user-shield"></i>
                    </div>
                </div>
            </header>
            
            <div class="admin-content">
                <h1 class="page-title">Dashboard Overview</h1>
                
                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background-color: rgba(108, 99, 255, 0.1);">
                            <i class="fas fa-briefcase" style="color: #6C63FF;"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="projectsCount"><?php echo $projectsCount; ?></span>
                            <span class="stat-label">Total Projects</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon" style="background-color: rgba(0, 200, 167, 0.1);">
                            <i class="fas fa-envelope" style="color: #00C9A7;"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="messagesCount"><?php echo $messagesCount; ?></span>
                            <span class="stat-label">Contact Messages</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon" style="background-color: rgba(255, 107, 107, 0.1);">
                            <i class="fas fa-database" style="color: #FF6B6B;"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value">MySQL</span>
                            <span class="stat-label">Database Status: <span style="color: #00C9A7;">Connected</span></span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon" style="background-color: rgba(253, 203, 110, 0.1);">
                            <i class="fas fa-shield-alt" style="color: #FDCB6E;"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value">Secure</span>
                            <span class="stat-label">Session Active</span>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Messages -->
                <div class="admin-card">
                    <div class="card-header">
                        <h2>Recent Messages</h2>
                        <a href="manage_messages.php" class="btn btn-sm">View All <i class="fas fa-arrow-right"></i></a>
                    </div>
                    <div class="card-body">
                        <?php if (!empty($recentMessages)): ?>
                            <table class="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($recentMessages as $msg): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($msg['name']); ?></td>
                                        <td><?php echo htmlspecialchars($msg['email']); ?></td>
                                        <td><?php echo htmlspecialchars($msg['subject'] ?? 'N/A'); ?></td>
                                        <td><?php echo date('M d, Y H:i', strtotime($msg['created_at'])); ?></td>
                                        <td>
                                            <a href="manage_messages.php?view=<?php echo $msg['id']; ?>" class="btn btn-sm">View</a>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        <?php else: ?>
                            <p class="empty-state">No messages received yet.</p>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="admin-card">
                    <div class="card-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div class="card-body">
                        <div class="quick-actions">
                            <a href="manage_projects.php" class="quick-action-btn">
                                <i class="fas fa-plus-circle"></i>
                                Add New Project
                            </a>
                            <a href="manage_messages.php" class="quick-action-btn">
                                <i class="fas fa-envelope-open-text"></i>
                                View All Messages
                            </a>
                            <a href="../index.html" target="_blank" class="quick-action-btn">
                                <i class="fas fa-external-link-alt"></i>
                                View Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="js/admin.js"></script>
</body>
</html>
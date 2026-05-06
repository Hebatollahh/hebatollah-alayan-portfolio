<?php
/**
 * Manage Contact Messages
 * Hebatollah Alayan - Portfolio
 */

require_once '../includes/config.php';

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// View single message
$viewMessage = null;
if (isset($_GET['view']) && is_numeric($_GET['view'])) {
    $messageId = (int)$_GET['view'];
    $stmt = $conn->prepare("SELECT * FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $messageId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $viewMessage = $result->fetch_assoc();
    }
    $stmt->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Messages - Admin Panel</title>
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
                    <span>Welcome, <strong><?php echo htmlspecialchars($_SESSION['admin_username']); ?></strong></span>
                    <div class="user-avatar"><i class="fas fa-user-shield"></i></div>
                </div>
            </header>
            
            <div class="admin-content">
                <h1 class="page-title">Contact Messages</h1>
                
                <?php if ($viewMessage): ?>
                <!-- Single Message View -->
                <div class="admin-card">
                    <div class="card-header">
                        <h2>Message from <?php echo htmlspecialchars($viewMessage['name']); ?></h2>
                        <a href="manage_messages.php" class="btn btn-sm"><i class="fas fa-arrow-left"></i> Back to List</a>
                    </div>
                    <div class="card-body">
                        <table class="detail-table">
                            <tr>
                                <td class="detail-label">Name:</td>
                                <td><?php echo htmlspecialchars($viewMessage['name']); ?></td>
                            </tr>
                            <tr>
                                <td class="detail-label">Email:</td>
                                <td><a href="mailto:<?php echo htmlspecialchars($viewMessage['email']); ?>"><?php echo htmlspecialchars($viewMessage['email']); ?></a></td>
                            </tr>
                            <tr>
                                <td class="detail-label">Subject:</td>
                                <td><?php echo htmlspecialchars($viewMessage['subject'] ?? 'N/A'); ?></td>
                            </tr>
                            <tr>
                                <td class="detail-label">Date:</td>
                                <td><?php echo date('F j, Y \a\t g:i A', strtotime($viewMessage['created_at'])); ?></td>
                            </tr>
                            <tr>
                                <td class="detail-label">IP Address:</td>
                                <td><?php echo htmlspecialchars($viewMessage['ip_address'] ?? 'N/A'); ?></td>
                            </tr>
                        </table>
                        <div class="message-content">
                            <h4>Message:</h4>
                            <p><?php echo nl2br(htmlspecialchars($viewMessage['message'])); ?></p>
                        </div>
                    </div>
                </div>
                <?php else: ?>
                <!-- Messages Table -->
                <div class="admin-card">
                    <div class="card-body">
                        <div id="messagesTableContainer">
                            <div class="loading-state">
                                <div class="spinner"></div>
                                <p>Loading messages...</p>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </main>
    </div>
    
    <script src="js/admin.js"></script>
</body>
</html>
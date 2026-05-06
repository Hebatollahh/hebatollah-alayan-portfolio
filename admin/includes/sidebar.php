<?php
// Get current page for active link
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<aside class="admin-sidebar" id="adminSidebar">
    <div class="sidebar-header">
        <a href="dashboard.php" class="sidebar-logo">
            <i class="fas fa-cog"></i>
            <span>Admin Panel</span>
        </a>
    </div>
    
    <nav class="sidebar-nav">
        <ul>
            <li>
                <a href="dashboard.php" class="<?php echo $currentPage === 'dashboard.php' ? 'active' : ''; ?>">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="manage_projects.php" class="<?php echo $currentPage === 'manage_projects.php' ? 'active' : ''; ?>">
                    <i class="fas fa-briefcase"></i>
                    <span>Manage Projects</span>
                </a>
            </li>
            <li>
                <a href="manage_messages.php" class="<?php echo $currentPage === 'manage_messages.php' ? 'active' : ''; ?>">
                    <i class="fas fa-envelope"></i>
                    <span>Messages</span>
                    <?php
                    // Unread messages count
                    $result = $conn->query("SELECT COUNT(*) as count FROM contacts");
                    $unreadCount = $result ? $result->fetch_assoc()['count'] : 0;
                    if ($unreadCount > 0):
                    ?>
                    <span class="badge"><?php echo $unreadCount; ?></span>
                    <?php endif; ?>
                </a>
            </li>
            <li>
                <a href="../index.html" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    <span>View Site</span>
                </a>
            </li>
        </ul>
    </nav>
    
    <div class="sidebar-footer">
        <a href="logout.php" class="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </a>
    </div>
</aside>
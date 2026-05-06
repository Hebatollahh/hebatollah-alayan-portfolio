<?php
/**
 * Manage Projects - CRUD
 * Hebatollah Alayan - Portfolio
 */

require_once '../includes/config.php';

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Manage Projects - Admin Panel</title>
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
                <div class="page-header">
                    <h1 class="page-title">Manage Projects</h1>
                    <button class="btn btn-primary" id="openAddModal">
                        <i class="fas fa-plus"></i> Add New Project
                    </button>
                </div>
                
                <!-- Projects Table Container -->
                <div class="admin-card">
                    <div class="card-body">
                        <div id="projectsTableContainer">
                            <div class="loading-state">
                                <div class="spinner"></div>
                                <p>Loading projects...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <!-- Add/Edit Project Modal -->
    <div id="projectModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-container admin-modal-container">
            <div class="modal-header">
                <h3 id="modalTitle">Add New Project</h3>
                <button class="modal-close-btn" onclick="closeProjectModal()" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="projectForm" novalidate>
                <input type="hidden" name="id" id="projectId">
                
                <div class="form-group">
                    <label for="projectTitle">Project Title <span class="required">*</span></label>
                    <input type="text" id="projectTitle" name="title" required 
                           placeholder="Enter project title" maxlength="200">
                    <span class="error-message" id="titleError"></span>
                </div>
                
                <div class="form-group">
                    <label for="projectDescription">Description <span class="required">*</span></label>
                    <textarea id="projectDescription" name="description" rows="4" required 
                              placeholder="Enter project description"></textarea>
                    <span class="error-message" id="descriptionError"></span>
                </div>
                
                <div class="form-group">
                    <label for="projectImage">Image URL <span class="required">*</span></label>
                    <input type="url" id="projectImage" name="image_url" required 
                           placeholder="https://example.com/image.jpg">
                    <span class="error-message" id="imageError"></span>
                </div>
                
                <div class="form-group">
                    <label for="projectLink">Project Link <span class="required">*</span></label>
                    <input type="url" id="projectLink" name="link" required 
                           placeholder="https://github.com/your-project">
                    <span class="error-message" id="linkError"></span>
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeProjectModal()">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="saveProjectBtn">
                        <span class="btn-text">Save Project</span>
                        <span class="btn-loader" style="display:none;"><i class="fas fa-spinner fa-spin"></i></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    <script src="js/admin.js"></script>
</body>
</html>
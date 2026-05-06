/**
 * ============================================================
 * ADMIN PANEL JAVASCRIPT
 * Hebatollah Alayan - Portfolio
 * ============================================================
 */

'use strict';

// ============================================================
// SIDEBAR TOGGLE
// ============================================================
(function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    
    if (sidebarToggle && adminSidebar) {
        sidebarToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                if (!adminSidebar.contains(e.target) && 
                    !sidebarToggle.contains(e.target) && 
                    adminSidebar.classList.contains('open')) {
                    adminSidebar.classList.remove('open');
                }
            }
        });
    }
})();

// ============================================================
// PROJECT MANAGEMENT
// ============================================================

// Load projects into table
async function loadProjects() {
    const container = document.getElementById('projectsTableContainer');
    if (!container) return;
    
    try {
        const response = await fetch('ajax/get_projects.php', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const result = await response.json();
        
        if (result.error) {
            container.innerHTML = `<div class="loading-state"><p>${result.error}</p></div>`;
            return;
        }
        
        if (result.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open" style="font-size: 48px; color: #B0B0B0;"></i>
                    <p>No projects have been added yet.</p>
                    <button class="btn btn-primary" onclick="openAddModal()">
                        <i class="fas fa-plus"></i> Add Your First Project
                    </button>
                </div>
            `;
            return;
        }
        
        let html = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        result.forEach(project => {
            html += `
                <tr>
                    <td>${project.id}</td>
                    <td><img src="${escapeHTML(project.image_url)}" alt="${escapeHTML(project.title)}" 
                             style="width: 60px; height: 40px; object-fit: cover; border-radius: 4px;"></td>
                    <td>${escapeHTML(project.title)}</td>
                    <td>${escapeHTML(project.description.substring(0, 80))}...</td>
                    <td>${formatDate(project.created_at)}</td>
                    <td>
                        <button class="btn btn-sm" onclick="editProject(${project.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProject(${project.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<div class="loading-state"><p>Error loading projects. Please refresh.</p></div>';
    }
}

// Open Add Modal
function openAddModal() {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectId').value = '';
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectImage').value = '';
    document.getElementById('projectLink').value = '';
    
    clearFormErrors();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Edit Project
async function editProject(id) {
    try {
        const response = await fetch(`ajax/get_project.php?id=${id}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) throw new Error('Failed to fetch project');
        
        const project = await response.json();
        
        if (project.error) {
            alert(project.error);
            return;
        }
        
        const modal = document.getElementById('projectModal');
        document.getElementById('modalTitle').textContent = 'Edit Project';
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image_url;
        document.getElementById('projectLink').value = project.link;
        
        clearFormErrors();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
    } catch (error) {
        console.error('Error fetching project:', error);
        alert('Failed to load project data.');
    }
}

// Delete Project
async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }
    
    const formData = new FormData();
    formData.append('id', id);
    
    try {
        const response = await fetch('ajax/delete_project.php', {
            method: 'POST',
            body: formData,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert('Project deleted successfully!');
            loadProjects();
        } else {
            alert(result.message || 'Failed to delete project.');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Network error. Please try again.');
    }
}

// Close Modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Save Project (Form Submit)
document.getElementById('projectForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const saveBtn = document.getElementById('saveProjectBtn');
    const btnText = saveBtn.querySelector('.btn-text');
    const btnLoader = saveBtn.querySelector('.btn-loader');
    
    // Simple validation
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const imageUrl = formData.get('image_url').trim();
    const link = formData.get('link').trim();
    
    if (!title || !description || !imageUrl || !link) {
        alert('All fields are required.');
        return;
    }
    
    // Show loading
    saveBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    try {
        const response = await fetch('ajax/save_project.php', {
            method: 'POST',
            body: formData,
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert('Project saved successfully!');
            closeProjectModal();
            loadProjects();
        } else {
            alert(result.message || 'Failed to save project.');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        alert('Network error. Please try again.');
    } finally {
        saveBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Clear form errors
function clearFormErrors() {
    document.querySelectorAll('#projectForm .form-group').forEach(group => {
        group.classList.remove('error', 'success');
    });
    document.querySelectorAll('#projectForm .error-message').forEach(el => {
        el.textContent = '';
    });
}

// ============================================================
// MESSAGES MANAGEMENT
// ============================================================
async function loadMessages() {
    const container = document.getElementById('messagesTableContainer');
    if (!container) return;
    
    try {
        const response = await fetch('ajax/get_messages.php', {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        
        if (!response.ok) throw new Error('Failed to fetch messages');
        
        const result = await response.json();
        
        if (result.error) {
            container.innerHTML = `<div class="loading-state"><p>${result.error}</p></div>`;
            return;
        }
        
        if (result.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open" style="font-size: 48px; color: #B0B0B0;"></i>
                    <p>No messages have been received yet.</p>
                </div>
            `;
            return;
        }
        
        let html = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        result.forEach(msg => {
            html += `
                <tr>
                    <td>${msg.id}</td>
                    <td>${escapeHTML(msg.name)}</td>
                    <td>${escapeHTML(msg.email)}</td>
                    <td>${escapeHTML(msg.subject || 'N/A')}</td>
                    <td>${formatDate(msg.created_at)}</td>
                    <td>
                        <a href="manage_messages.php?view=${msg.id}" class="btn btn-sm">View</a>
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading messages:', error);
        container.innerHTML = '<div class="loading-state"><p>Error loading messages. Please refresh.</p></div>';
    }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// ============================================================
// MODAL OUTSIDE CLICK
// ============================================================
document.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (modal && e.target === modal) {
        closeProjectModal();
    }
});

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Load projects if on manage projects page
    if (document.getElementById('projectsTableContainer')) {
        loadProjects();
    }
    
    // Load messages if on messages page
    if (document.getElementById('messagesTableContainer')) {
        loadMessages();
    }
    
    // Open modal button
    document.getElementById('openAddModal')?.addEventListener('click', openAddModal);
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('projectModal');
            if (modal && modal.classList.contains('show')) {
                closeProjectModal();
            }
        }
    });
});
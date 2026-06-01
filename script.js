// Global variables
let allScripts = [];
let currentFilter = 'all';
let showFavoritesOnly = false;
let copiedCount = 0;

// Sample scripts with professional content
let scripts = [
    {
        id: 1,
        title: 'Professional Greeting',
        category: 'customer-service',
        text: 'Hello! Thank you for contacting us. My name is [Your Name]. How can I assist you today?',
        description: 'Professional greeting to start the conversation',
        favorite: false
    },
    {
        id: 2,
        title: 'Customer Assurance',
        category: 'customer-service',
        text: 'I understand your concern. Don\'t worry, I\'m here to help you resolve this issue. We will get this sorted out for you.',
        description: 'Show empathy and reassure the customer',
        favorite: false
    },
    {
        id: 3,
        title: 'Professional Apology',
        category: 'customer-service',
        text: 'I sincerely apologize for the inconvenience this has caused you. We take your feedback seriously and will ensure this doesn\'t happen again.',
        description: 'Apologize professionally and take responsibility',
        favorite: false
    },
    {
        id: 4,
        title: 'Active Listening',
        category: 'customer-service',
        text: 'Let me make sure I understand your situation correctly: [Summarize the issue]. Is that an accurate summary of what you\'re experiencing?',
        description: 'Confirm you understand the customer\'s problem',
        favorite: false
    },
    {
        id: 5,
        title: 'Solution Offering',
        category: 'customer-service',
        text: 'Here\'s what I can do to help you: [Provide solution]. I believe this will resolve your issue effectively. Would this work for you?',
        description: 'Offer clear and professional solutions',
        favorite: false
    },
    {
        id: 6,
        title: 'Professional Closing',
        category: 'customer-service',
        text: 'Thank you so much for giving us the opportunity to help. Is there anything else I can assist you with today?',
        description: 'Professional closing statement',
        favorite: false
    },
    {
        id: 7,
        title: 'Escalation Notice',
        category: 'customer-service',
        text: 'I understand this is urgent. Let me transfer you to a specialist who has expertise in this area. They\'ll be able to provide you with the best support.',
        description: 'How to escalate to a specialist professionally',
        favorite: false
    },
    {
        id: 8,
        title: 'Refund Processing',
        category: 'sales',
        text: 'I can help you with that refund. For your protection, let me verify your account details. Can you please provide your order number?',
        description: 'Handle refund requests securely and professionally',
        favorite: false
    },
    {
        id: 9,
        title: 'Hold Request',
        category: 'customer-service',
        text: 'Of course, I\'ll be happy to put you on a brief hold while I gather that information for you. Thank you for your patience.',
        description: 'How to politely request to put customer on hold',
        favorite: false
    },
    {
        id: 10,
        title: 'Callback Offer',
        category: 'customer-service',
        text: 'I have your information. We\'ll call you back within [time frame] with an update. Is the best number to reach you [phone number]?',
        description: 'Offer to call back instead of long wait',
        favorite: false
    },
    {
        id: 11,
        title: 'Complaint Resolution',
        category: 'support',
        text: 'I\'m truly sorry you had that experience. Your feedback is valuable to us and helps us improve. What can I do to make this right for you?',
        description: 'Respond to complaints with care and professionalism',
        favorite: false
    },
    {
        id: 12,
        title: 'Follow-up Message',
        category: 'support',
        text: 'Following up on our conversation about [issue]. Have you been able to resolve this? If you need any further assistance, please don\'t hesitate to reach out.',
        description: 'Professional follow-up message',
        favorite: false
    }
];

// Initialize
window.addEventListener('load', function() {
    loadScripts();
    allScripts = [...scripts];
    renderScripts(scripts);
    updateStats();
});

// Render scripts
function renderScripts(scriptsToRender) {
    const grid = document.getElementById('scriptsGrid');
    grid.innerHTML = '';

    if (scriptsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);"><i class="fas fa-inbox" style="font-size: 3em; margin-bottom: 20px;"></i><p>No scripts found</p></div>';
        return;
    }

    scriptsToRender.forEach(script => {
        const card = document.createElement('div');
        card.className = `script-card ${script.favorite ? 'favorite' : ''}`;
        card.innerHTML = `
            <div class="card-header">
                <div class="card-title-section">
                    <h3 class="card-title">${escapeHtml(script.title)}</h3>
                    <span class="card-category">${script.category.replace('-', ' ')}</span>
                </div>
                <button class="favorite-btn ${script.favorite ? 'active' : ''}" onclick="toggleFavorite(${script.id})" title="Add to favorites">
                    <i class="fas fa-star"></i>
                </button>
            </div>
            <div class="card-content">
                <div class="script-text">${escapeHtml(script.text)}</div>
                <div class="card-description">${escapeHtml(script.description)}</div>
            </div>
            <div class="card-footer">
                <button class="card-btn" onclick="copyScript(${script.id}, this)">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button class="card-btn edit" onclick="editScript(${script.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Copy script
function copyScript(id, button) {
    const script = allScripts.find(s => s.id === id);
    if (!script) return;

    navigator.clipboard.writeText(script.text).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('copied');
        copiedCount++;
        updateStats();
        showToast('✓ Script copied to clipboard!');

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        showToast('✗ Failed to copy. Please try again.');
    });
}

// Edit script
function editScript(id) {
    const script = allScripts.find(s => s.id === id);
    if (!script) return;

    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Script</h2>
                <button class="close-btn" onclick="document.getElementById('modal').classList.remove('show')">&times;</button>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" id="editTitle" value="${escapeHtml(script.title)}" />
            </div>
            <div class="form-group">
                <label>Category</label>
                <select id="editCategory">
                    <option value="customer-service" ${script.category === 'customer-service' ? 'selected' : ''}>Customer Service</option>
                    <option value="sales" ${script.category === 'sales' ? 'selected' : ''}>Sales</option>
                    <option value="support" ${script.category === 'support' ? 'selected' : ''}>Support</option>
                </select>
            </div>
            <div class="form-group">
                <label>Script Text</label>
                <textarea id="editText">${escapeHtml(script.text)}</textarea>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" id="editDescription" value="${escapeHtml(script.description)}" />
            </div>
            <div class="modal-buttons">
                <button class="btn btn-cancel" onclick="document.getElementById('modal').classList.remove('show')">Cancel</button>
                <button class="btn btn-save" onclick="saveEdit(${script.id})">Save Changes</button>
            </div>
        </div>
    `;
    modal.classList.add('show');
}

// Save edit
function saveEdit(id) {
    const script = allScripts.find(s => s.id === id);
    if (!script) return;

    script.title = document.getElementById('editTitle').value;
    script.category = document.getElementById('editCategory').value;
    script.text = document.getElementById('editText').value;
    script.description = document.getElementById('editDescription').value;

    saveScripts();
    document.getElementById('modal').classList.remove('show');
    filterScripts();
    showToast('✓ Script updated successfully!');
}

// Add new script
function addNewScript() {
    const newId = Math.max(...allScripts.map(s => s.id), 0) + 1;
    const modal = document.getElementById('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>New Script</h2>
                <button class="close-btn" onclick="document.getElementById('modal').classList.remove('show')">&times;</button>
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" id="newTitle" placeholder="Enter script title" />
            </div>
            <div class="form-group">
                <label>Category</label>
                <select id="newCategory">
                    <option value="customer-service">Customer Service</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                </select>
            </div>
            <div class="form-group">
                <label>Script Text</label>
                <textarea id="newText" placeholder="Enter your script here"></textarea>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" id="newDescription" placeholder="Brief description" />
            </div>
            <div class="modal-buttons">
                <button class="btn btn-cancel" onclick="document.getElementById('modal').classList.remove('show')">Cancel</button>
                <button class="btn btn-save" onclick="saveNewScript(${newId})">Create Script</button>
            </div>
        </div>
    `;
    modal.classList.add('show');
}

// Save new script
function saveNewScript(id) {
    const title = document.getElementById('newTitle').value.trim();
    const category = document.getElementById('newCategory').value;
    const text = document.getElementById('newText').value.trim();
    const description = document.getElementById('newDescription').value.trim();

    if (!title || !text) {
        showToast('✗ Please fill in all required fields');
        return;
    }

    allScripts.push({
        id,
        title,
        category,
        text,
        description,
        favorite: false
    });

    saveScripts();
    document.getElementById('modal').classList.remove('show');
    filterScripts();
    showToast('✓ New script created!');
}

// Filter by category
function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.nav-btn').classList.add('active');
    filterScripts();
}

// Filter scripts
function filterScripts() {
    let filtered = allScripts;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (currentFilter !== 'all') {
        filtered = filtered.filter(s => s.category === currentFilter);
    }

    if (showFavoritesOnly) {
        filtered = filtered.filter(s => s.favorite);
    }

    if (searchTerm) {
        filtered = filtered.filter(s =>
            s.title.toLowerCase().includes(searchTerm) ||
            s.text.toLowerCase().includes(searchTerm) ||
            s.description.toLowerCase().includes(searchTerm)
        );
    }

    renderScripts(filtered);
}

// Toggle favorite
function toggleFavorite(id) {
    const script = allScripts.find(s => s.id === id);
    if (script) {
        script.favorite = !script.favorite;
        saveScripts();
        filterScripts();
        updateStats();
    }
}

// Toggle favorites view
function toggleFavorites() {
    showFavoritesOnly = !showFavoritesOnly;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (showFavoritesOnly) {
        event.target.closest('.nav-btn').classList.add('active');
    } else {
        document.querySelector('.nav-btn').classList.add('active');
    }
    filterScripts();
}

// Export scripts
function exportScripts() {
    const dataStr = JSON.stringify(allScripts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scripts-backup.json';
    link.click();
    showToast('✓ Scripts exported successfully!');
}

// Show toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Update stats
function updateStats() {
    document.getElementById('totalScripts').textContent = allScripts.length;
    document.getElementById('favoritesCount').textContent = allScripts.filter(s => s.favorite).length;
    document.getElementById('copiedCount').textContent = copiedCount;
}

// Save scripts
function saveScripts() {
    localStorage.setItem('scripts', JSON.stringify(allScripts));
}

// Load scripts
function loadScripts() {
    const saved = localStorage.getItem('scripts');
    if (saved) {
        allScripts = JSON.parse(saved);
        scripts = allScripts;
    }
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

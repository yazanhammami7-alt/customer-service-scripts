// Sample scripts - you can customize these
let scripts = [
    {
        id: 1,
        title: 'Greeting',
        category: 'customer-service',
        icon: '👋',
        text: 'Hello! Thank you for contacting us. My name is [Your Name]. How can I assist you today?',
        description: 'Professional greeting to start the conversation'
    },
    {
        id: 2,
        title: 'Assurance',
        category: 'customer-service',
        icon: '✅',
        text: 'I understand your concern. Don\'t worry, I\'m here to help you resolve this issue.',
        description: 'Show empathy and reassure the customer'
    },
    {
        id: 3,
        title: 'Apology',
        category: 'customer-service',
        icon: '😔',
        text: 'I sincerely apologize for the inconvenience this has caused you. We take your feedback seriously.',
        description: 'Apologize professionally and take responsibility'
    },
    {
        id: 4,
        title: 'Listen & Understand',
        category: 'customer-service',
        icon: '👂',
        text: 'Let me make sure I understand your situation correctly: [Summarize the issue]. Is that correct?',
        description: 'Confirm you understand the customer\'s problem'
    },
    {
        id: 5,
        title: 'Provide Solution',
        category: 'customer-service',
        icon: '💡',
        text: 'Here\'s what I can do to help you: [Provide solution]. Would this work for you?',
        description: 'Offer clear solutions'
    },
    {
        id: 6,
        title: 'Closing',
        category: 'customer-service',
        icon: '👋',
        text: 'Thank you so much for giving us the opportunity to help. Is there anything else I can assist you with today?',
        description: 'Professional closing statement'
    },
    {
        id: 7,
        title: 'Escalation',
        category: 'customer-service',
        icon: '⬆️',
        text: 'I understand this is urgent. Let me transfer you to a specialist who can better assist with this matter. Please bear with me.',
        description: 'How to escalate to a specialist'
    },
    {
        id: 8,
        title: 'Refund Request',
        category: 'sales',
        icon: '💰',
        text: 'I can help you with that refund. For your protection, let me verify your account details first. Can you please provide your order number?',
        description: 'Handle refund requests safely'
    },
    {
        id: 9,
        title: 'Hold Request',
        category: 'customer-service',
        icon: '⏸️',
        text: 'Of course, I\'ll be happy to put you on a brief hold while I gather that information for you. Thank you for your patience.',
        description: 'How to politely request to put customer on hold'
    },
    {
        id: 10,
        title: 'Callback Offer',
        category: 'customer-service',
        icon: '📞',
        text: 'I have your information. We\'ll call you back within [time frame] with an update. Is the best number to reach you [phone number]?',
        description: 'Offer to call back instead of long wait'
    },
    {
        id: 11,
        title: 'Complaint Response',
        category: 'customer-service',
        icon: '📢',
        text: 'I\'m truly sorry you had that experience. Your feedback is valuable to us. What can I do to make this right?',
        description: 'Respond to complaints appropriately'
    },
    {
        id: 12,
        title: 'Follow-up',
        category: 'customer-service',
        icon: '✉️',
        text: 'Following up on our conversation about [issue]. Have you been able to resolve this? If you need any further assistance, please don\'t hesitate to reach out.',
        description: 'Professional follow-up message'
    }
];

// Initialize app
window.addEventListener('load', function() {
    loadScripts();
    renderScripts(scripts);
});

// Render scripts
function renderScripts(scriptsToRender) {
    const grid = document.getElementById('scriptsGrid');
    grid.innerHTML = '';

    scriptsToRender.forEach(script => {
        const card = document.createElement('div');
        card.className = 'script-card';
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${script.icon}</div>
                <div class="card-title-section">
                    <h2>${escapeHtml(script.title)}</h2>
                    <span class="card-category">${script.category}</span>
                </div>
            </div>
            <div class="card-content">
                <div class="script-text">${escapeHtml(script.text)}</div>
                <div class="card-description">${escapeHtml(script.description)}</div>
            </div>
            <div class="card-footer">
                <button class="copy-button" onclick="copyScript(${script.id}, this)">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button class="edit-button" onclick="editScript(${script.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Copy script to clipboard
function copyScript(id, button) {
    const script = scripts.find(s => s.id === id);
    if (!script) return;

    navigator.clipboard.writeText(script.text).then(() => {
        // Show success feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('copied');

        // Show toast
        showToast('✅ Script copied to clipboard!');

        // Reset button
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('❌ Failed to copy. Please try again.');
    });
}

// Edit script
function editScript(id) {
    const script = scripts.find(s => s.id === id);
    if (!script) return;

    // Show edit modal
    const modal = createModal('Edit Script', `
        <div class="form-group">
            <label>Title</label>
            <input type="text" id="editTitle" value="${escapeHtml(script.title)}" />
        </div>
        <div class="form-group">
            <label>Icon</label>
            <input type="text" id="editIcon" value="${script.icon}" maxlength="2" />
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
    `, () => {
        script.title = document.getElementById('editTitle').value;
        script.icon = document.getElementById('editIcon').value;
        script.category = document.getElementById('editCategory').value;
        script.text = document.getElementById('editText').value;
        script.description = document.getElementById('editDescription').value;
        
        saveScripts();
        renderScripts(scripts);
        showToast('✅ Script updated successfully!');
    });
}

// Create modal
function createModal(title, content, onSave) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            ${content}
            <div class="modal-buttons">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="handleSave()">Save</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    window.handleSave = onSave;
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// Filter scripts
function filterScripts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = scripts.filter(script => 
        script.title.toLowerCase().includes(searchTerm) ||
        script.text.toLowerCase().includes(searchTerm) ||
        script.description.toLowerCase().includes(searchTerm) ||
        script.category.toLowerCase().includes(searchTerm)
    );
    renderScripts(filtered);
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Save scripts to localStorage
function saveScripts() {
    localStorage.setItem('scripts', JSON.stringify(scripts));
}

// Load scripts from localStorage
function loadScripts() {
    const saved = localStorage.getItem('scripts');
    if (saved) {
        scripts = JSON.parse(saved);
    }
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

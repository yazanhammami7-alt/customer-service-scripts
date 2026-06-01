// Global variables
let allScripts = [];
let currentFilter = 'all';
let showFavoritesOnly = false;
let copiedCount = 0;

// Sample scripts
let scripts = [
    // 1 - Greeting Scripts
    {
        id: 1,
        title: 'Greeting Script 1',
        category: 'greeting',
        text: '',
        description: 'Greeting script 1',
        favorite: false
    },
    // 2 - Assurance Scripts
    {
        id: 2,
        title: 'Assurance Script 1',
        category: 'assurance',
        text: '',
        description: 'Assurance script 1',
        favorite: false
    },
    // 3 - Apology Scripts
    {
        id: 3,
        title: 'Apology Script 1',
        category: 'apology',
        text: '',
        description: 'Apology script 1',
        favorite: false
    },
    // 4 - Hold Scripts
    {
        id: 4,
        title: 'Hold Script 1',
        category: 'hold',
        text: '',
        description: 'Hold script 1',
        favorite: false
    },
    {
        id: 5,
        title: 'Hold Script 2',
        category: 'hold',
        text: '',
        description: 'Hold script 2',
        favorite: false
    },
    {
        id: 6,
        title: 'Hold Script 3',
        category: 'hold',
        text: '',
        description: 'Hold script 3',
        favorite: false
    },
    {
        id: 7,
        title: 'Hold Script 4',
        category: 'hold',
        text: '',
        description: 'Hold script 4',
        favorite: false
    },
    // 5 - Information Scripts
    {
        id: 8,
        title: 'Information Script 1',
        category: 'information',
        text: '',
        description: 'Information script 1',
        favorite: false
    },
    {
        id: 9,
        title: 'Information Script 2',
        category: 'information',
        text: '',
        description: 'Information script 2',
        favorite: false
    },
    {
        id: 10,
        title: 'Information Script 3',
        category: 'information',
        text: '',
        description: 'Information script 3',
        favorite: false
    },
    {
        id: 11,
        title: 'Information Script 4',
        category: 'information',
        text: '',
        description: 'Information script 4',
        favorite: false
    },
    {
        id: 12,
        title: 'Information Script 5',
        category: 'information',
        text: '',
        description: 'Information script 5',
        favorite: false
    },
    // 6 - Before Ending Scripts
    {
        id: 13,
        title: 'Before Ending Script 1',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 1',
        favorite: false
    },
    {
        id: 14,
        title: 'Before Ending Script 2',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 2',
        favorite: false
    },
    {
        id: 15,
        title: 'Before Ending Script 3',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 3',
        favorite: false
    },
    {
        id: 16,
        title: 'Before Ending Script 4',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 4',
        favorite: false
    },
    {
        id: 17,
        title: 'Before Ending Script 5',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 5',
        favorite: false
    },
    {
        id: 18,
        title: 'Before Ending Script 6',
        category: 'before-ending',
        text: '',
        description: 'Before ending script 6',
        favorite: false
    },
    // 7 - Ending Scripts
    {
        id: 19,
        title: 'Ending Script 1',
        category: 'ending',
        text: '',
        description: 'Ending script 1',
        favorite: false
    },
    {
        id: 20,
        title: 'Ending Script 2',
        category: 'ending',
        text: '',
        description: 'Ending script 2',
        favorite: false
    },
    {
        id: 21,
        title: 'Ending Script 3',
        category: 'ending',
        text: '',
        description: 'Ending script 3',
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
                    <option value="greeting" ${script.category === 'greeting' ? 'selected' : ''}>Greeting</option>
                    <option value="assurance" ${script.category === 'assurance' ? 'selected' : ''}>Assurance</option>
                    <option value="apology" ${script.category === 'apology' ? 'selected' : ''}>Apology</option>
                    <option value="hold" ${script.category === 'hold' ? 'selected' : ''}>Hold</option>
                    <option value="information" ${script.category === 'information' ? 'selected' : ''}>Information</option>
                    <option value="before-ending" ${script.category === 'before-ending' ? 'selected' : ''}>Before Ending</option>
                    <option value="ending" ${script.category === 'ending' ? 'selected' : ''}>Ending</option>
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
                    <option value="greeting">Greeting</option>
                    <option value="assurance">Assurance</option>
                    <option value="apology">Apology</option>
                    <option value="hold">Hold</option>
                    <option value="information">Information</option>
                    <option value="before-ending">Before Ending</option>
                    <option value="ending">Ending</option>
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

// Filter scripts
function filterScripts() {
    let filtered = allScripts;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

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

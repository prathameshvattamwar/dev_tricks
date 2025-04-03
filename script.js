// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Search functionality (basic setup)
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                // Will implement actual search later
                // alert('Search functionality will be implemented in a future step!');
                
                // For now, just save recent searches in localStorage
                saveRecentSearch(searchTerm);
            }
        });
    }
    
    // Enter key for search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
});

// Function to save recent searches in localStorage
function saveRecentSearch(term) {
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Add to the beginning of the array if not already present
    if (!recentSearches.includes(term)) {
        recentSearches.unshift(term);
    }
    
    // Keep only the most recent 5 searches
    recentSearches = recentSearches.slice(0, 5);
    
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
}

// Function to render HTML tricks
function renderHTMLTricks() {
    // Check if we're on the HTML tricks page
    const tricksContainer = document.getElementById('tricksContainer');
    if (!tricksContainer) return;
    
    // Include our data file
    const script = document.createElement('script');
    script.src = '../data/html-tricks.js';
    document.head.appendChild(script);
    
    // Wait for the script to load, then render tricks
    script.onload = function() {
        // Clear the container of example content
        tricksContainer.innerHTML = '';
        
        // Render each trick
        htmlTricks.forEach(trick => {
            const trickCard = createTrickCard(trick);
            tricksContainer.appendChild(trickCard);
        });
        
        // Initialize syntax highlighting
        hljs.highlightAll();
        
        // Set up filtering
        setupFiltering();
    };
}

// Function to create a trick card
function createTrickCard(trick) {
    const trickCol = document.createElement('div');
    trickCol.className = 'col-md-6 col-lg-4 trick-card-wrapper mb-4';
    
    // Create difficulty badge class
    let difficultyClass = 'bg-success'; // Default: beginner
    if (trick.difficulty === 'intermediate') difficultyClass = 'bg-primary';
    if (trick.difficulty === 'advanced') difficultyClass = 'bg-danger';
    
    // Create HTML for the card
    trickCol.innerHTML = `
        <div class="card trick-card" data-difficulty="${trick.difficulty}" data-tags="${trick.tags.join(' ')}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="badge ${difficultyClass}">${trick.difficulty.charAt(0).toUpperCase() + trick.difficulty.slice(1)}</span>
                <div>
                    ${trick.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(' ')}
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${trick.title}</h5>
                <p class="card-text">${trick.description}</p>
                
                <div class="code-snippet">
                    <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                    <pre><code class="language-html">${escapeHTML(trick.code)}</code></pre>
                </div>
                
                <h6>Why it works:</h6>
                <p>${trick.explanation}</p>
                
                <h6>Browser Compatibility:</h6>
                <p>${trick.compatibility}</p>
            </div>
            <div class="card-footer text-muted">
                Added by: ${trick.author}
            </div>
        </div>
    `;
    
    return trickCol;
}

// Helper function to escape HTML for code display
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Setup filtering functionality
function setupFiltering() {
    const trickSearch = document.getElementById('trickSearch');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const tagFilter = document.getElementById('tagFilter');
    
    if (!trickSearch || !difficultyFilter || !tagFilter) return;
    
    // Helper function to apply all filters
    const applyFilters = () => {
        const searchTerm = trickSearch.value.toLowerCase();
        const difficultyValue = difficultyFilter.value;
        const tagValue = tagFilter.value;
        
        document.querySelectorAll('.trick-card-wrapper').forEach(wrapper => {
            const card = wrapper.querySelector('.card');
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            const difficulty = card.dataset.difficulty;
            const tags = card.dataset.tags;
            
            // Apply search filter
            const matchesSearch = searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm);
            
            // Apply difficulty filter
            const matchesDifficulty = difficultyValue === '' || 
                difficulty === difficultyValue;
            
            // Apply tag filter
            const matchesTag = tagValue === '' || 
                tags.includes(tagValue);
            
            // Show/hide based on all filters
            wrapper.style.display = (matchesSearch && matchesDifficulty && matchesTag) ? 'block' : 'none';
        });
    };
    
    // Add event listeners
    trickSearch.addEventListener('input', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
    tagFilter.addEventListener('change', applyFilters);
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Existing dark mode code here...
    
    // Render HTML tricks if we're on that page
    renderHTMLTricks();
});

// Function to render CSS tricks
function renderCSSTricks() {
    // Check if we're on the CSS tricks page
    const tricksContainer = document.getElementById('tricksContainer');
    if (!tricksContainer) return;
    
    // Include our data file
    const script = document.createElement('script');
    script.src = '../data/css-tricks.js';
    document.head.appendChild(script);
    
    // Wait for the script to load, then render tricks
    script.onload = function() {
        // Clear the container of example content
        tricksContainer.innerHTML = '';
        
        // Render each trick
        cssTricks.forEach(trick => {
            const trickCard = createTrickCard(trick, 'css');
            tricksContainer.appendChild(trickCard);
        });
        
        // Initialize syntax highlighting
        hljs.highlightAll();
        
        // Set up filtering
        setupFiltering();
    };
}

// Update the createTrickCard function to handle different code types
function createTrickCard(trick, type = 'html') {
    const trickCol = document.createElement('div');
    trickCol.className = 'col-md-6 col-lg-4 trick-card-wrapper';
    
    // Create difficulty badge class
    let difficultyClass = 'bg-success'; // Default: beginner
    let difficultyIcon = 'fa-seedling';
    if (trick.difficulty === 'intermediate') {
        difficultyClass = 'bg-primary';
        difficultyIcon = 'fa-code';
    }
    if (trick.difficulty === 'advanced') {
        difficultyClass = 'bg-danger';
        difficultyIcon = 'fa-fire';
    }
    
    // Determine language for code highlighting
    let codeLanguage = 'html';
    if (type === 'css') codeLanguage = 'css';
    if (type === 'js') codeLanguage = 'javascript';
    
    // Create HTML for the card
    trickCol.innerHTML = `
        <div class="card trick-card" data-difficulty="${trick.difficulty}" data-tags="${trick.tags.join(' ')}">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="badge ${difficultyClass}">
                    <i class="fas ${difficultyIcon} me-1"></i>
                    ${trick.difficulty.charAt(0).toUpperCase() + trick.difficulty.slice(1)}
                </span>
                <div>
                    ${trick.tags.map(tag => `<span class="badge bg-secondary"><i class="fas fa-tag me-1"></i>${tag}</span>`).join(' ')}
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">${trick.title}</h5>
                <p class="card-text">${trick.description}</p>
                
                <div class="code-snippet">
                    <button class="copy-btn" onclick="copyCode(this)"><i class="far fa-copy me-1"></i>Copy</button>
                    <pre><code class="language-${codeLanguage}">${escapeHTML(trick.code)}</code></pre>
                </div>
                
                <h6><i class="fas fa-lightbulb me-1"></i> Why it works:</h6>
                <p>${trick.explanation}</p>
                
                <h6><i class="fas fa-globe me-1"></i> Browser Compatibility:</h6>
                <p>${trick.compatibility}</p>
            </div>
            <div class="card-footer text-muted">
                <i class="fas fa-user me-1"></i> Added by: ${trick.author}
            </div>
        </div>
    `;
    
    return trickCol;
}

// Update the DOMContentLoaded event to check and render the appropriate page
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode code (leave existing code here)
    
    // Determine which page we're on and render accordingly
    const path = window.location.pathname;
    
    if (path.includes('html-tricks.html')) {
        renderHTMLTricks();
    } else if (path.includes('css-tricks.html')) {
        renderCSSTricks();
    }
    // We'll add JavaScript tricks in the next step
});

// Function to render JavaScript tricks
function renderJSTricks() {
    // Check if we're on the JavaScript tricks page
    const tricksContainer = document.getElementById('tricksContainer');
    if (!tricksContainer) return;
    
    // Include our data file
    const script = document.createElement('script');
    script.src = '../data/js-tricks.js';
    document.head.appendChild(script);
    
    // Wait for the script to load, then render tricks
    script.onload = function() {
        // Clear the container
        tricksContainer.innerHTML = '';
        
        // Render each trick
        jsTricks.forEach(trick => {
            const trickCard = createTrickCard(trick, 'js');
            tricksContainer.appendChild(trickCard);
        });
        
        // Initialize syntax highlighting
        hljs.highlightAll();
        
        // Set up filtering
        setupFiltering();
    };
}

// Update the DOMContentLoaded event to include JavaScript tricks
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode code (leave existing code here)
    
    // Determine which page we're on and render accordingly
    const path = window.location.pathname;
    
    if (path.includes('html-tricks.html')) {
        renderHTMLTricks();
    } else if (path.includes('css-tricks.html')) {
        renderCSSTricks();
    } else if (path.includes('js-tricks.html')) {
        renderJSTricks();
    }
});

// Contribution form handling
function initContributionForm() {
    const form = document.getElementById('trickSubmissionForm');
    const previewButton = document.getElementById('previewButton');
    const previewArea = document.getElementById('previewArea');
    const trickPreview = document.getElementById('trickPreview');
    
    if (!form) return;
    
    // Preview button click handler
    if (previewButton) {
        previewButton.addEventListener('click', function() {
            if (!validateForm()) return;
            
            const trick = getTrickFromForm();
            previewArea.style.display = 'block';
            
            // Create preview
            trickPreview.innerHTML = '';
            const previewCard = createTrickCard(trick, trick.category);
            trickPreview.appendChild(previewCard);
            
            // Initialize syntax highlighting
            hljs.highlightAll();
            
            // Scroll to preview
            previewArea.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const trick = getTrickFromForm();
        
        // Save to localStorage
        saveSubmission(trick);
        
        // In a real app, send to Google Sheets here
        submitToGoogleSheets(trick);
        
        // Show success message
        showSubmissionConfirmation();
        
        // Reset form
        form.reset();
        previewArea.style.display = 'none';
    });
    
    // Helper function to validate form
    function validateForm() {
        let isValid = true;
        
        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    
    // Helper function to get trick data from form
    function getTrickFromForm() {
        const title = document.getElementById('trickTitle').value.trim();
        const category = document.getElementById('trickCategory').value;
        const tags = document.getElementById('trickTags')
            .value.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
        
        return {
            id: 'user_' + Date.now(),
            title: title,
            description: document.getElementById('trickDescription').value.trim(),
            code: document.getElementById('trickCode').value.trim(),
            explanation: document.getElementById('trickExplanation').value.trim(),
            compatibility: document.getElementById('trickCompatibility').value.trim(),
            difficulty: document.getElementById('trickDifficulty').value,
            tags: tags,
            author: document.getElementById('contributorName').value.trim(),
            category: category,
            dateSubmitted: new Date().toISOString(),
            status: 'pending' // pending, approved, rejected
        };
    }
}

// Function to save submission to localStorage
function saveSubmission(trick) {
    let submissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]');
    submissions.push(trick);
    localStorage.setItem('userSubmissions', JSON.stringify(submissions));
}

// Function to load user submissions
function loadUserSubmissions() {
    const submissionsList = document.getElementById('mySubmissionsList');
    const noSubmissionsMessage = document.getElementById('noSubmissionsMessage');
    
    if (!submissionsList) return;
    
    let submissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]');
    
    if (submissions.length === 0) {
        if (noSubmissionsMessage) noSubmissionsMessage.style.display = 'block';
        return;
    }
    
    // Hide no submissions message
    if (noSubmissionsMessage) noSubmissionsMessage.style.display = 'none';
    
    // Clear existing content except the message
    const existingSubmissions = submissionsList.querySelectorAll('.user-submission');
    existingSubmissions.forEach(submission => submission.remove());
    
    // Add each submission
    submissions.forEach(trick => {
        const submissionDiv = document.createElement('div');
        submissionDiv.className = 'card mb-3 user-submission';
        
        let statusClass = 'bg-warning text-dark';
        let statusText = 'Pending Review';
        
        if (trick.status === 'approved') {
            statusClass = 'bg-success';
            statusText = 'Approved';
        } else if (trick.status === 'rejected') {
            statusClass = 'bg-danger';
            statusText = 'Rejected';
        }
        
        const formattedDate = new Date(trick.dateSubmitted).toLocaleDateString();
        
        submissionDiv.innerHTML = `
            <div class="card-header d-flex justify-content-between">
                <span>${trick.title}</span>
                <span class="badge ${statusClass}">${statusText}</span>
            </div>
            <div class="card-body">
                <p><strong>Category:</strong> ${trick.category.toUpperCase()}</p>
                <p><strong>Submitted:</strong> ${formattedDate}</p>
                <p><strong>Description:</strong> ${trick.description}</p>
                <button class="btn btn-sm btn-primary view-submission-btn" data-trick-id="${trick.id}">
                    View Details
                </button>
            </div>
        `;
        
        submissionsList.appendChild(submissionDiv);
    });
    
    // Add click handlers for view buttons
    document.querySelectorAll('.view-submission-btn').forEach(button => {
        button.addEventListener('click', function() {
            const trickId = this.getAttribute('data-trick-id');
            const trick = submissions.find(t => t.id === trickId);
            
            // Display trick details in a modal or expandable section
            // For simplicity, we'll use an alert for now
            alert(`Trick: ${trick.title}\n\nCode:\n${trick.code}\n\nExplanation: ${trick.explanation}`);
            
            // In a real implementation, you'd show a modal with the full details
        });
    });
}

// Function to show submission confirmation
function showSubmissionConfirmation() {
    // Create a toast or alert to confirm submission
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        <strong>Success!</strong> Your trick has been submitted for review.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}

// Function to submit to Google Sheets (mock implementation)
function submitToGoogleSheets(trick) {
    // In a real implementation, this would send the data to a Google Sheets Web App
    console.log('Submitting to Google Sheets:', trick);
    
    // Mock implementation - in a real app you would use fetch() to send data to Google Sheets Web App
    /*
    fetch('YOUR_GOOGLE_SCRIPT_URL', {
        method: 'POST',
        body: JSON.stringify(trick),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

// Global search functionality for the home page
function setupGlobalSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !searchButton) return;
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) return;
        
        // Save to recent searches
        saveRecentSearch(searchTerm);
        
        // Redirect to search results page
        window.location.href = `pages/search-results.html?q=${encodeURIComponent(searchTerm)}`;
    });
    
    // Make Enter key work too
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Display recent searches
    displayRecentSearches();
}

// Function to display recent searches
function displayRecentSearches() {
    const recentSearchesContainer = document.getElementById('recentSearches');
    if (!recentSearchesContainer) return;
    
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    if (recentSearches.length === 0) {
        recentSearchesContainer.style.display = 'none';
        return;
    }
    
    // Find or create the searches container
    let searchesDiv = recentSearchesContainer.querySelector('.d-inline-block');
    if (!searchesDiv) {
        searchesDiv = document.createElement('div');
        searchesDiv.className = 'd-inline-block';
        recentSearchesContainer.appendChild(searchesDiv);
    }
    
    // Clear existing searches
    searchesDiv.innerHTML = '';
    
    // Add each search term
    recentSearches.forEach(term => {
        const badge = document.createElement('a');
        badge.href = `pages/search-results.html?q=${encodeURIComponent(term)}`;
        badge.className = 'search-tag';
        badge.textContent = term;
        searchesDiv.appendChild(badge);
    });
    
    // Make sure the container is visible
    recentSearchesContainer.style.display = 'block';
}

// Update the DOMContentLoaded event to include global search setup
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode code and other existing code here...
    
    // Set up global search
    setupGlobalSearch();
    
    // Determine which page we're on and render accordingly
    const path = window.location.pathname;
    
    if (path.includes('html-tricks.html')) {
        renderHTMLTricks();
    } else if (path.includes('css-tricks.html')) {
        renderCSSTricks();
    } else if (path.includes('js-tricks.html')) {
        renderJSTricks();
    } else if (path.includes('search-results.html')) {
        renderSearchResults();
    }
});

// Function to render search results
function renderSearchResults() {
    const resultsContainer = document.getElementById('searchResultsContainer');
    if (!resultsContainer) return;
    
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (!searchQuery) {
        resultsContainer.innerHTML = '<div class="alert alert-info">No search query provided.</div>';
        return;
    }
    
    // Update search term display
    const searchTermDisplay = document.getElementById('searchTermDisplay');
    if (searchTermDisplay) {
        searchTermDisplay.textContent = searchQuery;
    }
    
    // Load all data files
    loadAllTricksData().then(allTricks => {
        // Search through all tricks
        const results = searchTricks(allTricks, searchQuery);
        
        // Display results
        displaySearchResults(results, resultsContainer);
    });
}

// Function to load all tricks data
function loadAllTricksData() {
    return new Promise((resolve) => {
        // Load HTML tricks
        const htmlScript = document.createElement('script');
        htmlScript.src = '../data/html-tricks.js';
        document.head.appendChild(htmlScript);
        
        // Load CSS tricks
        const cssScript = document.createElement('script');
        cssScript.src = '../data/css-tricks.js';
        document.head.appendChild(cssScript);
        
        // Load JS tricks
        const jsScript = document.createElement('script');
        jsScript.src = '../data/js-tricks.js';
        document.head.appendChild(jsScript);
        
        // Wait for all scripts to load
        jsScript.onload = function() {
            // Combine all tricks with category labels
            const allTricks = [
                ...htmlTricks.map(trick => ({...trick, category: 'html'})),
                ...cssTricks.map(trick => ({...trick, category: 'css'})),
                ...jsTricks.map(trick => ({...trick, category: 'js'}))
            ];
            
            resolve(allTricks);
        };
    });
}

// Function to search tricks
function searchTricks(tricks, query) {
    query = query.toLowerCase();
    
    return tricks.filter(trick => {
        return (
            trick.title.toLowerCase().includes(query) ||
            trick.description.toLowerCase().includes(query) ||
            trick.explanation.toLowerCase().includes(query) ||
            trick.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });
}

// Function to display search results
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">No results found.</div>';
        return;
    }
    
    container.innerHTML = ''; // Clear container
    
    // Group results by category
    const htmlResults = results.filter(trick => trick.category === 'html');
    const cssResults = results.filter(trick => trick.category === 'css');
    const jsResults = results.filter(trick => trick.category === 'js');
    
    // Display counts
    const countsDiv = document.createElement('div');
    countsDiv.className = 'mb-4';
    countsDiv.innerHTML = `
        <p>Found ${results.length} result${results.length !== 1 ? 's' : ''}:</p>
        <div class="d-flex gap-3">
            <span class="badge bg-secondary">${htmlResults.length} HTML</span>
            <span class="badge bg-secondary">${cssResults.length} CSS</span>
            <span class="badge bg-secondary">${jsResults.length} JavaScript</span>
        </div>
    `;
    container.appendChild(countsDiv);
    
    // Display all results
    results.forEach(trick => {
        const trickCard = createTrickCard(trick, trick.category);
        container.appendChild(trickCard);
    });
    
    // Initialize syntax highlighting
    hljs.highlightAll();
}

// Add animation classes to elements when they appear in viewport
document.addEventListener('DOMContentLoaded', function() {
    // Add staggered animation class to main content rows
    const rows = document.querySelectorAll('.tricksContainer .row, .container .row');
    rows.forEach(row => {
      row.classList.add('staggered-animation');
    });
    
    // Add fadeInUp animation to hero section elements
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section .lead, .search-wrapper');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s forwards`;
    });
  });
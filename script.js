// Add loading overlay functions
function showLoadingOverlay(message) {
    // Create a loading overlay if it doesn't exist
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50';
        overlay.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div class="spinner mb-4"></div>
                <p class="text-lg font-medium">${message}</p>
            </div>
        `;
        
        // Add spinner style if not already in the document
        if (!document.querySelector('#spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.textContent = `
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border-left-color: #506D2F;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(overlay);
    } else {
        // Update message if overlay already exists
        const messageElement = overlay.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
        overlay.classList.remove('hidden');
    }
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        // Optionally remove after animation
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Initialize everything when the page loads
window.onload = function() {
    setupCountdown();
    setupImageSlider();
    
    // Update names if needed
    if (document.querySelector('#leftName')) {
        document.getElementById('leftName').textContent = "Sanma";
    }
    if (document.querySelector('#rightName')) {
        document.getElementById('rightName').textContent = "Rahul";
    }
};

// Image slider functionality
function setupImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Set up dot click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });
    
    // Set up prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    
    // Auto-advance slides every 4 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hand
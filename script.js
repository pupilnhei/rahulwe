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
        // Handle wrap-around
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
}

// Countdown timer to wedding day
function setupCountdown() {
    // Set the wedding date - April 27, 2025
    const weddingDate = new Date("April 29, 2025 10:00:00").getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the countdown if element exists
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hrs</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Mins</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Secs</span>
                </div>
            `;
        }
        
        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdownTimer);
            if (countdownElement) {
                countdownElement.innerHTML = "<div class='text-xl script-font'>Our Wedding Day Has Arrived!</div>";
            }
        }
    }, 1000);
}

// Add to Calendar functionality
function addToCalendar(eventTitle, eventDate, eventTime, venue) {
    const startDateTime = new Date(eventDate + ' ' + eventTime);
    const endDateTime = new Date(startDateTime.getTime() + 3600000); // Add 1 hour for event duration

    const googleCalendarUrl = 'https://www.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(eventTitle) +
        '&dates=' + startDateTime.toISOString().replace(/-|:|\.\d+/g, '') +
        '/' + endDateTime.toISOString().replace(/-|:|\.\d+/g, '') +
        '&details=' + encodeURIComponent('Wedding Event in Uttarakhand') +
        '&location=' + encodeURIComponent(venue) +
        '&sf=true&output=xml';

    window.open(googleCalendarUrl, '_blank');
    
    // Show confirmation
    showNotification("Event added to your calendar!");
}

// Open Google Maps directions
function openDirections() {
    window.open('https://www.google.com/maps/search/?api=1&query=Nimbuchar+Kotdwar+Uttarakhand', '_blank');
}

// Live stream function
function openLiveStream() {
    alert("Get ready to join our wedding virtually! The livestream link will be available closer to the wedding date.");
}

// Notification system
function showNotification(message, type = 'success') {
    // Create container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container fixed top-4 right-4 z-50 flex flex-col items-end';
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `bg-white rounded shadow-md p-4 mb-2 transform translate-x-full transition-transform duration-300 ${type === 'error' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-600'}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2 text-${type === 'error' ? 'red' : 'green'}-600">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            </span>
            <p class="text-sm">${message}</p>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 4000);
}
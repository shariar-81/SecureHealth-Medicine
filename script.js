document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    
    // Cart modal elements
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const disease = this.getAttribute('data-disease');
            const age = this.getAttribute('data-age');
            const container = this.closest('.age-group');
            const medicines = container.querySelectorAll('.medicine');
            
            // Add each medicine to cart
            medicines.forEach(medicine => {
                const name = medicine.getAttribute('data-name');
                const price = parseFloat(medicine.getAttribute('data-price'));
                
                cart.push({
                    name: name,
                    price: price,
                    disease: disease,
                    ageGroup: age
                });
            });
            
            // Update cart count
            cartCount.textContent = cart.length;
            
            // Show notification
            showNotification(`${medicines.length} medicines added to cart!`);
        });
    });
    
    // Show cart modal
    document.querySelector('a[href="#cart"]').addEventListener('click', function(e) {
        e.preventDefault();
        showCart();
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert(`Thank you for your purchase! Total: ৳${calculateTotal().toFixed(2)}`);
        cart = [];
        cartCount.textContent = '0';
        cartModal.style.display = 'none';
    });
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
        if (searchTerm) {
            // In a real implementation, this would search the content
            alert(`Searching for: "${searchTerm}"\nThis feature would show search results in a real application.`);
        }
    });
    
    // Emergency call button
    document.querySelector('.emergency-btn').addEventListener('click', function(e) {
        if (!confirm('Are you sure you want to call emergency services?')) {
            e.preventDefault();
        }
    });
    
    // Helper functions
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function showCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = 'Total: ৳0.00';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div>
                        <strong>${item.name}</strong>
                        <div>For ${item.ageGroup} - ${item.disease}</div>
                    </div>
                    <div>৳${item.price.toFixed(2)}</div>
                `;
                cartItems.appendChild(itemElement);
            });
            
            cartTotal.textContent = `Total: ৳${calculateTotal().toFixed(2)}`;
        }
        
        cartModal.style.display = 'block';
    }
    
    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
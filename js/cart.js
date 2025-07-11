// Datos de los productos
const products = {
    'fruit': {
        name: 'Fruit Sparkle',
        price: 50000,
        color: 'fruit'
    },
    'body': {
        name: 'Body & Sweetness',
        price: 50000,
        color: 'body'
    },
    'floral': {
        name: 'Floral & Citrus Brightness',
        price: 50000,
        color: 'floral'
    },
    'balance': {
        name: 'Balance & Structure',
        price: 50000,
        color: 'balance'
    },
    'kit': {
        name: 'Kit Completo',
        price: 190000,
        color: 'black'
    }
};

// Carrito de compras
let cart = [];

// Cargar carrito desde localStorage al iniciar
function loadCart() {
    const savedCart = localStorage.getItem('aquabrew_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('aquabrew_cart', JSON.stringify(cart));
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products[productId];
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            color: product.color,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showAddedToCartModal();
    closeModal()
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Actualizar cantidad de un producto
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity) || 1;
        if (item.quantity < 1) item.quantity = 1;
        saveCart();
        updateCartUI();
    }
}

// Vaciar el carrito
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Actualizar la interfaz del carrito
function updateCartUI() {
    const cartCount          = document.getElementById('cart-count');
    const mobileCartCount    = document.getElementById('mobile-cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal       = document.getElementById('cart-subtotal');
    const cartTotal          = document.getElementById('cart-total');
    const checkoutBtn        = document.getElementById('checkout-btn');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
        mobileCartCount.textContent = totalItems;
        mobileCartCount.classList.remove('hidden');
        checkoutBtn.disabled = false;
    } else {
        cartCount.classList.add('hidden');
        mobileCartCount.classList.add('hidden');
        checkoutBtn.disabled = true;
    }
    
    // Actualizar lista de productos
    if (cart.length > 0) {
        let itemsHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            itemsHTML += `
                <div class="flex items-center py-4 border-b border-gray-200">
                    <div class="flex-shrink-0 w-16 h-16 rounded-md bg-${item.color}-100 flex items-center justify-center">
                        <span class="text-${item.color}-600 font-bold">${item.quantity}</span>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex justify-between">
                            <h4 class="text-gray-800 font-medium">${item.name}</h4>
                            <span class="text-gray-800 font-bold">$${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <div class="flex items-center">
                                <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="text-gray-500 hover:text-gray-700 px-2 py-1">
                                    -
                                </button>
                                <input type="number" min="1" value="${item.quantity}" 
                                        onchange="updateQuantity('${item.id}', this.value)"
                                        class="w-12 text-center border border-gray-300 rounded-md mx-1">
                                <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="text-gray-500 hover:text-gray-700 px-2 py-1">
                                    +
                                </button>
                            </div>
                            <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-700 text-sm">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = itemsHTML;
        
        // Calcular envío (ejemplo: gratis para compras mayores a $400,000)
        const shipping = subtotal >= 400000 ? 0 : 17000;
        
        // Actualizar totales
        cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
        document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`;
        cartTotal.textContent = `$${(subtotal + shipping).toLocaleString()}`;
    } else {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 py-4">Tu carrito está vacío</p>';
        cartSubtotal.textContent = '$0';
        document.getElementById('cart-shipping').textContent = '$0';
        cartTotal.textContent = '$0';
    }
}

// Mostrar modal de carrito
function openCartModal() {
    document.getElementById('cart-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Cerrar modal de carrito
function closeCartModal() {
    document.getElementById('cart-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// Mostrar modal de agregado al carrito
function showAddedToCartModal() {
    const modal = document.getElementById('added-to-cart-modal');
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 3000);
}

// Proceder al checkout
function proceedToCheckout() {
    closeCartModal();
    openCheckoutModal();
}

// Mostrar modal de checkout
function openCheckoutModal() {
    // Limpiar el formulario y los errores
    const form = document.getElementById('checkout-form');
    form.reset();
    
    // Limpiar mensajes de error
    const errorMessages = document.querySelectorAll('.text-red-500');
    errorMessages.forEach(msg => msg.remove());
    
    // Limpiar bordes rojos
    const errorFields = document.querySelectorAll('.border-red-500');
    errorFields.forEach(field => {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-300');
    });
    
    // Limpiar mensaje de error general si existe
    const generalError = document.querySelector('.bg-red-100');
    if (generalError) {
        generalError.remove();
    }

    // Mostrar el modal
    document.getElementById('checkout-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Cerrar modal de checkout
function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// Mostrar modal de éxito
function openSuccessModal(orderNumber) {
    document.getElementById('order-number').textContent = `#${orderNumber}`;
    document.getElementById('order-success-modal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Cerrar modal de éxito
function closeSuccessModal() {
    document.getElementById('order-success-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');

    // Limpiar el formulario por si acaso
    const form = document.getElementById('checkout-form');
    form.reset();
}

// Enviar pedido
function submitOrder() {
    // Obtener elementos del formulario
    const form = document.getElementById('checkout-form');
    const requiredFields = [
        'checkout-name', 
        'checkout-email', 
        'checkout-phone', 
        'checkout-address', 
        'checkout-city', 
        'checkout-state'
    ];
    
    let isValid = true;
    
    // Validar campos requeridos
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            isValid = false;
            field.classList.add('border-red-500');
            field.classList.remove('border-gray-300');
            
            // Crear mensaje de error si no existe
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('text-red-500')) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'text-red-500 text-xs mt-1';
                errorMsg.textContent = 'Este campo es obligatorio';
                field.parentNode.insertBefore(errorMsg, field.nextSibling);
            }
        } else {
            field.classList.remove('border-red-500');
            field.classList.add('border-gray-300');
            
            // Eliminar mensaje de error si existe
            if (field.nextElementSibling && field.nextElementSibling.classList.contains('text-red-500')) {
                field.nextElementSibling.remove();
            }
        }
    });
    
    // Validar email
    const emailField = document.getElementById('checkout-email');
    const emailValue = emailField.value.trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        isValid = false;
        emailField.classList.add('border-red-500');
        emailField.classList.remove('border-gray-300');
        
        if (!emailField.nextElementSibling || !emailField.nextElementSibling.classList.contains('text-red-500')) {
            const errorMsg = document.createElement('p');
            errorMsg.className = 'text-red-500 text-xs mt-1';
            errorMsg.textContent = 'Ingresa un email válido';
            emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling);
        }
    }
    
    // Si no es válido, detener el envío
    if (!isValid) {
        // Hacer scroll al primer campo con error
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Si todo es válido, proceder con el envío
    const formData = new FormData(form);
    
    // Agregar items del carrito al formData
    cart.forEach((item, index) => {
        formData.append(`item_${index}_name`, item.name);
        formData.append(`item_${index}_quantity`, item.quantity);
        formData.append(`item_${index}_price`, item.price);
    });
    
    // Calcular totales
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 400000 ? 0 : 17000;
    const total = subtotal + shipping;
    
    formData.append('subtotal', subtotal);
    formData.append('shipping', shipping);
    formData.append('total', total);
    
    // Mostrar estado de carga
    const submitBtn = document.querySelector('#checkout-modal button[onclick="submitOrder()"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Procesando...';
    
    // Enviar datos a Formspree
    fetch('https://formspree.io/f/xvgayrjb', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        if (response.ok) {
            // Generar número de pedido aleatorio
            const orderNumber = Math.floor(1000 + Math.random() * 9000);
            
            // Limpiar carrito
            clearCart();
            
            // Cerrar checkout y mostrar éxito
            closeCheckoutModal();
            openSuccessModal(orderNumber);
        } else {
            throw new Error('Error al enviar el pedido');
        }
    })
    .catch(error => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Mostrar mensaje de error general
        const errorContainer = document.createElement('div');
        errorContainer.className = 'bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4';
        errorContainer.textContent = 'Hubo un error al procesar tu pedido. Por favor intenta nuevamente.';
        
        const formHeader = document.querySelector('#checkout-modal h3');
        formHeader.parentNode.insertBefore(errorContainer, formHeader.nextSibling);
        
        console.error(error);
    });
}

// Cargar carrito al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});
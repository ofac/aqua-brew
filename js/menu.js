
// Menú Hamburguesa
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Modal Productos
function openModal(product) {
    const modal            = document.getElementById('modal');
    const modalTitle       = document.getElementById('modal-title');
    const modalColor       = document.getElementById('modal-color');
    const modalDescription = document.getElementById('modal-description');
    const confirmBtn       = document.getElementById('confirm-btn');
    const price            = document.getElementById('price');

    switch(product) {
        case 'kit':
            modalTitle.textContent = 'Kit Completo';
            modalDescription.innerHTML = `<strong>Descubre el Kit completo de Aqua Brew:</strong> <br> La herramienta definitiva para baristas exigentes.
                                          Con los 4 kit minerales de Aqua Brew, lleva tu café filtrado al siguiente nivel.<br> <strong>Este kit te permite:</strong><br>
                                          Personalizar el perfil del agua según el tipo de café o el resultado que buscas: más cuerpo, dulzor, brillo o acidez.`
            modalColor.className = 'w-12 h-1 bg-gray-900 mb-4';
            confirmBtn.dataset.color = 'kit'
            price.textContent = `$190.000`
            break;
        case 'fruit':
            modalTitle.textContent = 'Fruit Sparkle';
            modalDescription.textContent = 'Aporta acidez brillante y notas frutales florales, con tonos de frutas cítricas.';
            modalColor.className = 'w-12 h-1 bg-fruit mb-4';
            confirmBtn.dataset.color = 'fruit'
            price.textContent = `$50.000`
            break;
        case 'body':
            modalTitle.textContent = 'Body & Sweetness';
            modalDescription.textContent = 'Aporta cuerpo y dulzura, con una textura delicada y un dulzor terso.';
            modalColor.className = 'w-12 h-1 bg-body mb-4';
            confirmBtn.dataset.color = 'body'
            price.textContent = `$50.000`
            break;
        case 'floral':
            modalTitle.textContent = 'Floral & Citrus Brightness';
            modalDescription.textContent = 'Aporta acidez brillante e intensa y notas frutales. En exceso, puede generar amargor dominante.';
            modalColor.className = 'w-12 h-1 bg-floral mb-4';
            confirmBtn.dataset.color = 'floral'
            price.textContent = `$50.000`
            break;
        case 'balance':
            modalTitle.textContent = 'Balance & Structure';
            modalDescription.textContent = 'Aporta estructura y complejidad, proporcionando equilibrio y armonía. Genera una acidez de baja intensidad.';
            modalColor.className = 'w-12 h-1 bg-balance mb-4';
            confirmBtn.dataset.color = 'balance'
            price.textContent = `$50.000`
            break;
    }
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Funciones para el modal de Aqua Tips
function openAquaTipsModal() {
    document.getElementById('aqua-tips-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAquaTipsModal() {
    document.getElementById('aqua-tips-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}



// Funciones para abrir y cerrar los modales
function openModalLink(modalType) {
    document.getElementById(`${modalType}-modal`).classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModalLink(modalType) {
    document.getElementById(`${modalType}-modal`).classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

// Actualiza los enlaces del footer para usar estas funciones
document.addEventListener('DOMContentLoaded', function() {
    // Términos
    document.querySelector('.link01').addEventListener('click', function(e) {
        e.preventDefault();
        openModalLink('terms');
    });
    
    // Privacidad
    document.querySelector('.link02').addEventListener('click', function(e) {
        e.preventDefault();
        openModalLink('privacy');
    });
    
    // FAQ
    document.querySelector('.link03').addEventListener('click', function(e) {
        e.preventDefault();
        openModalLink('faq');
    });
});

// Config owl carousel 
$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive:{
        0:{
            items: 2
        },
        600:{
            items: 3
        },
        1000:{
            items: 4
        }
    }
})
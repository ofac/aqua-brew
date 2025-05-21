
// Menú Hamburguesa
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Modal
function openModal(product) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalColor = document.getElementById('modal-color');
    const modalDescription = document.getElementById('modal-description');
    const confirmBtn = document.getElementById('confirm-btn');
    
    switch(product) {
        case 'kit':
            modalTitle.textContent = 'Kit Completo';
            modalDescription.textContent = 'Descubre el Kit completo de Aqua Brew: La herramienta definitiva para baristas exigentes.';
            modalColor.className = 'w-12 h-1 bg-gray-900 mb-4';
            confirmBtn.className = confirmBtn.className.replace(/bg-\w+/g, '') + ' bg-gray-900';
            break;
        case 'fruit':
            modalTitle.textContent = 'Fruit Sparkle';
            modalDescription.textContent = 'Aporta acidez brillante y notas frutales florales, con tonos de frutas cítricas.';
            modalColor.className = 'w-12 h-1 bg-fruit mb-4';
            confirmBtn.className = confirmBtn.className.replace(/bg-\w+/g, '') + ' bg-fruit';
            break;
        case 'body':
            modalTitle.textContent = 'Body & Sweetness';
            modalDescription.textContent = 'Aporta cuerpo y dulzura, con una textura delicada y un dulzor terso.';
            modalColor.className = 'w-12 h-1 bg-body mb-4';
            confirmBtn.className = confirmBtn.className.replace(/bg-\w+/g, '') + ' bg-body';
            break;
        case 'floral':
            modalTitle.textContent = 'Floral & Citrus Brightness';
            modalDescription.textContent = 'Aporta acidez brillante e intensa y notas frutales. En exceso, puede generar amargor dominante.';
            modalColor.className = 'w-12 h-1 bg-floral mb-4';
            confirmBtn.className = confirmBtn.className.replace(/bg-\w+/g, '') + ' bg-floral';
            break;
        case 'balance':
            modalTitle.textContent = 'Balance & Structure';
            modalDescription.textContent = 'Aporta estructura y complejidad, proporcionando equilibrio y armonía. Genera una acidez de baja intensidad.';
            modalColor.className = 'w-12 h-1 bg-balance mb-4';
            confirmBtn.className = confirmBtn.className.replace(/bg-\w+/g, '') + ' bg-balance';
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
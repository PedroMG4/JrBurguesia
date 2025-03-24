function openModal(element) {
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    // Obtener datos desde atributos personalizados
    const title = element.getAttribute("data-title");
    const description = element.getAttribute("data-description");

    // Insertar datos en el modal
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Aplicar estilos personalizados si querés
    modalTitle.classList.add("modal-title-estilo");
    modalDescription.classList.add("modal-description-estilo");

    // Mostrar el modal
    modal.classList.add("active"); // Hace visible y centra el modal
    setTimeout(() => {
        modal.classList.add("show"); // Para animación si usás .show
    }, 10);
}

function closeModal(event) {
    const modal = document.getElementById("infoModal");

    // Cerrar el modal si se hace clic fuera del contenido o en la X
    if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.classList.remove("active"); // Oculta el modal
        }, 100);
    }
}

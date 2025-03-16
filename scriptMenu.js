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
    

    // Mostrar el modal con la animación
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}
modalTitle.classList.add("modal-title-estilo");
modalDescription.classList.add("modal-description-estilo");

function closeModal(event) {
    const modal = document.getElementById("infoModal");

    // Cerrar el modal si se hace clic fuera del contenido o en la X
    if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }
}

function openModal(element) {
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    const title = element.getAttribute("data-title");
    const description = element.getAttribute("data-description");

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    

    //mostrar modal
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}
modalTitle.classList.add("modal-title-estilo");
modalDescription.classList.add("modal-description-estilo");

function closeModal(event) {
    const modal = document.getElementById("infoModal");

    //para cerrar modal
    if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }
}

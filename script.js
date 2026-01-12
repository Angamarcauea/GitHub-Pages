const imageUrlInput = document.getElementById("imageUrl");
const addImageBtn = document.getElementById("addImage");
const deleteImageBtn = document.getElementById("deleteImage");
const gallery = document.getElementById("gallery");
const message = document.getElementById("message");

let selectedImage = null;

// Verificar si es imagen
function esImagen(url) {
    return /\.(jpg|jpeg|png|webp)$/i.test(url);
}

// AGREGAR IMAGEN
addImageBtn.addEventListener("click", () => {
    const url = imageUrlInput.value.trim();
    message.textContent = "";

    if (!esImagen(url)) {
        message.textContent = "Ingrese una URL válida de imagen (.jpg, .png, .webp)";
        return;
    }

    const img = document.createElement("img");
    img.src = url;

    img.onerror = () => {
        message.textContent = "No se pudo cargar la imagen";
        img.remove();
    };

    img.addEventListener("click", () => {
        if (selectedImage) {
            selectedImage.classList.remove("selected");
        }
        img.classList.add("selected");
        selectedImage = img;
    });

    gallery.appendChild(img);
    imageUrlInput.value = "";
});

// ELIMINAR IMAGEN
deleteImageBtn.addEventListener("click", () => {
    if (!selectedImage) {
        message.textContent = "Seleccione una imagen primero";
        return;
    }

    selectedImage.remove();
    selectedImage = null;
    message.textContent = "";
});

// ELIMINAR CON TECLA DELETE
document.addEventListener("keydown", (event) => {
    if (event.key === "Delete" && selectedImage) {
        selectedImage.remove();
        selectedImage = null;
    }
});

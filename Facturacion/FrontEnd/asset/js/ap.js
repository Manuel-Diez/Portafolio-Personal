function toggleSidebar() {
    document.getElementById('sidebarMenu').classList.toggle('show');
    document.getElementById('mainContent').classList.toggle('shift');
}

// Load content into iframe
function loadContent(url) {
    var iframe = document.getElementById('workSpace');
    iframe.src = url; // Actualiza el src del iframe
    toggleSidebar(); // Cierra la barra lateral
}

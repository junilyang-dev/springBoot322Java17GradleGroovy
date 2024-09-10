function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    const toastElement = new bootstrap.Toast(document.getElementById('customToast'));
    toastElement.show();
}
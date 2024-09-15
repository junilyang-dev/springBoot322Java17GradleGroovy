function showToast(message, type) {
    $('#customToast').removeClass().addClass(`toast ${type ?? ''}`);
    $('#customToast strong').removeClass().addClass(`me-auto ${type ?? ''}`);
    $('#toastMessage').text(message);
    new bootstrap.Toast($('#customToast')).show();
}
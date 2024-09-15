/*https://getbootstrap.com/docs/5.0/utilities/colors/
.text-primary
.text-secondary
.text-success
.text-danger
.text-warning
.text-info
.text-light
.text-dark
.text-body
.text-muted
.text-white
.text-black-50
.text-white-50
*/
function showToast(message, type) {
    $('#customToast').removeClass().addClass(`toast ${type ?? ''}`);
    $('#customToast strong').removeClass().addClass(`me-auto ${type ?? ''}`);
    $('#toastMessage').text(message);
    new bootstrap.Toast($('#customToast')).show();
}
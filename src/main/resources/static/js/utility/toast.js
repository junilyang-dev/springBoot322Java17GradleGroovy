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
$(function (){
    Toast.setPlacement(TOAST_PLACEMENT.TOP_CENTER);
    Toast.setTheme(TOAST_THEME.DARK);
    Toast.enableTimers(TOAST_TIMERS.COUNTDOWN);

});
function showToast(message, type) {
    let title;
    let status;
    switch (type) {
        case "WARNING":
            title = "WARNING";
            status = TOAST_STATUS.WARNING;
            break;
        case 'SUCCESS':
            title = 'SUCCESS';
            status = TOAST_STATUS.SUCCESS;
            break;
        case "DANGER":
            title = "DANGER";
            status = TOAST_STATUS.DANGER;
            break;
        default:
            title = "INFO";
            status = TOAST_STATUS.INFO;
    }

    let toast = {
        title: title,
        message: message,
        status: status,
        timeout: 2000
    }
    Toast.create(toast);

    // $('#customToast').removeClass().addClass(`toast ${type ?? ''}`);
    // $('#customToast strong').removeClass().addClass(`me-auto ${type ?? ''}`);
    // $('#toastMessage').text(message);
    // new bootstrap.Toast($('#customToast')).show();
}
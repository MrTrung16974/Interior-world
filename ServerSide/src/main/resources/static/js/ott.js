/**
 * Created by quangtt on 28/03/2017.
 */
    

function showDialogConfirm(title, content) {

    $("#dialogConfirm #confirm_title").text(title);
    $("#dialogConfirm #confirm_content").text(content);
    $("#dialogConfirm").modal('show');
}
function showMessage(title, content) {
    $("#modalMessage #title").text(title);
    $("#modalMessage #content").text(content);
    $("#modalMessage").modal('show');
}
function showAlertSuccess(content) {
    //Do cung thay doi text cua div ==>facein, faceout tuan tu nhung gia tri cua text da bi thay doi
    //TODO: Chuyen sang su dung toast: http://codeseven.github.io/toastr/demo.html
    // $("#alert-success-content").text(content);
    // $("#alert-success").fadeIn(3000);
    // $("#alert-success").fadeOut(7000);
    //toastr.success(content);
}

function showAlertError(content) {
    // $("#alert-dander-content").text(content);
    // $("#alert-dander").fadeIn(3000);
    // $("#alert-dander").fadeOut(7000);
    //toastr.error(content);
}

function showAlert(id, content, timein, timeout) {
    $("#" + id + " .alert-content").text(content);
    if (timein >= 0) {
        $("#" + id).fadeIn(timein);
    }
    if (timeout >= 0) {
        $("#" + id).fadeOut(timeout);
    }
}

function stopEventPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else if (window.event) {
        window.event.cancelBubble = true;
    }
} 
 

function showLoadingModal() {
    $('body').addClass("loading");
}

function hideLoadingModal() {
    $('body').removeClass("loading");
}

function boDauTiengViet(str){
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

//https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box
function matchYoutubeUrl(url) {
    if(url===''){
        return true;
    }
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}

function getStartUrl(prefix){
    //vd url = "https://demomb.vnpay.vn:20157/ottrpt/ott/manage"; prex = "/ott/"
    //==> "https://demomb.vnpay.vn:20157/ottrpt"
    var url = window.location.href;
    return url.substring(0,url.indexOf(prefix));
}


$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status == 408 || jqxhr.status == 302) {
        $("#modalTimeOut").modal("show");
    }

});
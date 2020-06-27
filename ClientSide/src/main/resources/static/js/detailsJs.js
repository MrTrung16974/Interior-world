$(document).ready(function () {
    var idProduct = new URLSearchParams(window.location.search).get("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8099/v1/api/product/" + idProduct,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                rederDataSingleProduct(response.data);
                singleProduct = response.data;
                comment = response.data.comment;
                rederComentProduct(comment);
            }
            else {
                console.log(response.message);
            }
        }
    });

});
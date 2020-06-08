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
                console.log(response.data);
                rederDataProductDetail(response.data);
            }
            else {
                console.log(response.message);
            }
        }
    });

    function rederDataProductDetail(item) {
        if(item != null) {
            $("#imageOneStyle").css('background-image',`url(${item.image.imageOne})`);
            $("#imageTwoStyle").css('background-image',`url(${item.image.imageTwo})`);
            $("#imageThreeStyle").css('background-image',`url(${item.image.imageThree})`);
            $("#imageFourStyle").css('background-image',`url(${item.image.imageFour})`);
            $("#imageOneHref").attr("href",`${item.image.imageOne}`);
            $("#imageTwoHref").attr("href",`${item.image.imageTwo}`);
            $("#imageThreeHref").attr("href",`${item.image.imageThree}`);
            $("#imageFourHref").attr("href", `${item.image.imageFour}`);
            $("#imageOneSrc").attr("src",  `${item.image.imageOne}`);
            $("#imageTwoSrc").attr("src", `${item.image.imageTwo}`);
            $("#imageThreeSrc").attr("src", `${item.image.imageThree}`);
            $("#imageFourSrc").attr("src", `${item.image.imageFour}`);

            $("#price-product").text(`$${item.price}`);
            $("#name-product").text(`${item.name}`);
            $("#description-product").text(`${item.description}`);

            $("button#addtocart").attr("onclick", `addToCastDB('${item.id}')`);
        }else{
            $("#single-product-detail").text("Sản phẩm không tồn tại");
        }
    }
});
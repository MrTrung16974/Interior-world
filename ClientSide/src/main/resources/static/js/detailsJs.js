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
                // rederDataProductDetail(response.data);
                rederDataSingleProduct(response.data);
                comment = response.data.comment;
                // rederComentProduct(comment);
            }
            else {
                console.log(response.message);
            }
        }
    });

    function rederDataProductDetail(item) {
        if(item != null) {
            $("#imageOneStyle").css('background-image',`url(${item.image.imageOne ? item.image.imageOne : ""})`);
            $("#imageTwoStyle").css('background-image',`url(${item.image.imageTwo  ? item.image.imageTwo : ""})`);
            $("#imageThreeStyle").css('background-image',`url(${item.image.imageThree  ? item.image.imageThree : ""})`);
            $("#imageFourStyle").css('background-image',`url(${item.image.imageFour  ? item.image.imageFour : ""})`);
            $("#imageOneHref").attr("href",`${item.image.imageOne  ? item.image.imageOne : ""}`);
            $("#imageTwoHref").attr("href",`${item.image.imageTwo  ? item.image.imageTwo : ""}`);
            $("#imageThreeHref").attr("href",`${item.image.imageThree ? item.image.imageThree : ""}`);
            $("#imageFourHref").attr("href", `${item.image.imageFour ? item.image.imageFour : ""}`);
            $("#imageOneSrc").attr("src",  `${item.image.imageOne ? item.image.imageOne : ""}`);
            $("#imageTwoSrc").attr("src", `${item.image.imageTwo ? item.image.imageTwo : ""}`);
            $("#imageThreeSrc").attr("src", `${item.image.imageThree ? item.image.imageThree : ""}`);
            $("#imageFourSrc").attr("src", `${item.image.imageFour ? item.image.imageFour : ""}`);

            $("#price-product").text(`$${item.price ? item.price : ""}`);
            $("#name-product").text(`${item.name ? item.name : ""}`);
            $("#breadcrumb-item-name").text(`${item.name ? item.name : ""}`);
            $("#description-product").text(`${item.description ? item.description : ""}`);

            $("button#addtocart").attr("onclick", `addToCastDB('${item.id}')`);
            $("button#addtoComent").attr("onclick", `addComment('${item.id}')`);
        }else{
            $("#single-product-detail").text("Sản phẩm không tồn tại");
        }
    }
    function forImage(image) {
        let imageWrite = "";
        data.map(item => {
            imageWrite += `<div class="single-prd-item">
                            <img class="img-fluid" src="${item ? item : ""}" alt="">
                        </div>`
        });
        return imageWrite;
    }
    function rederDataSingleProduct(item) {
        $("#single-product").empty();
        if(typeof item != "undefined"
            && item != null) {
            $('#single-product').html(
        `<div class="row s_product_inner">
                    <div class="col-lg-6">
                        <div class="owl-carousel owl-theme s_Product_carousel">
                            <div class="single-prd-item">
                                <img class="img-fluid" src="${item.image[0] ? item.image[0] : ""}" alt="">
                            </div>
                            <div class="single-prd-item">
                                <img class="img-fluid" src="img/category/s-p1.jpg" alt="">
                            </div>
                            <div class="single-prd-item">
                                <img class="img-fluid" src="img/category/s-p1.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 offset-lg-1">
                        <div class="s_product_text">
                            <h3>${item.name ? item.name : ""}</h3>
                            <h2>$${item.price ? item.price : ""}</h2>
                            <ul class="list">
                                <li><a class="active" href="#"><span>Category</span> : ${findCategories(item.type.type != null? item.type.type : 10)}</a></li>
                                <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                <li><a href="#"><span>Star</span> : ${forStar(item.star)}</a></li>
                            </ul>
                            <p>${item.description ? item.description : ""}</p>
                          
                            <div class="product_count">
                                <a class="button primary-btn" onclick="addToCastDB('${item.id}')">Add to Cart</a>               
                            </div>
                            <div class="card_area d-flex align-items-center">
                                <a class="icon_btn" href="#"><i class="lnr lnr lnr-diamond"></i></a>
                                <a class="icon_btn" onclick="addFavouriteUser(${item.id})"><i class="lnr lnr lnr-heart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $("button#addtoComent").attr("onclick", `addComment('${item.id}')`);
        }else{
            $("#single-product").html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
        }
    }

});
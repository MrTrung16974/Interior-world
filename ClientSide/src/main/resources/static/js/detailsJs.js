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
                rederDataSingleProduct(response.data);
                comment = response.data.comment;
                rederComentProduct(comment);
            }
            else {
                console.log(response.message);
            }
        }
    });

    function forImageLi(data) {
        let imageLiWrite = "";
        let length = data.length;
        for (let i=0; i < length; i++) {
            imageLiWrite += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;
        }
        return imageLiWrite;
    }

    function forImage(data) {
        let imageWrite = "";
        let length = data.length;
        for (let i=0; i < length; i++) {
            if(i == 1) {
                imageWrite += `<div class="carousel-item active">
                                <img height="500" class="d-block w-100" src="${data[i] ? data[i] : ""}" alt="First slide">
                            </div>`;
            }else {
                imageWrite += `<div class="carousel-item">
                                <img height="500" class="d-block w-100" src="${data[i] ? data[i] : ""}" alt="First slide">
                            </div>`;
            }
        }
        return imageWrite;
    }

    function rederDataSingleProduct(item) {
        $("#single-product").empty();
        if(typeof item != "undefined"
            && item != null) {
            $('#single-product').html(
        `<div class="row s_product_inner">
                    <div class="col-lg-6">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                ${forImageLi(item.image)}
                            </ol>
                            <div class="carousel-inner">
                                ${forImage(item.image)}
                            </div>
                            <a  style="color: #000000;"  class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <i style="font-size: 30px" class="fas fa-chevron-left"></i>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a  style="color: #000000;"  class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <i style="font-size: 30px" class="fas fa-chevron-right"></i>
                                <span class="sr-only">Next</span>
                            </a>
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
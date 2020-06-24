// reder cast
function rederData(data) {
    $("#lst-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            $('#lst-product').append(
                `<div class="col-md-6 col-lg-4">
                    <div class="card text-center card-product">
                      <div class="card-product__img">
                        <img class="card-img" src="${item.image.imageOne ? item.image.imageOne : ""}" alt="">
                        <ul class="card-product__imgOverlay">
                          <li><button onclick="addToCastDB(${item.id})"><i class="ti-shopping-cart"></i></button></li>
                          <li><button onclick="addFavouriteUser(${item.id})"><i class="ti-heart"></i></button></li>
                        </ul>
                      </div>
                      <div class="card-body">
                        <p>${item.type ? item.type : ""}</p>
                        <div id="ratings" class="ratings">
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="far fa-star" aria-hidden="hidden"></i>
                            <i class="far fa-star" aria-hidden="true"></i>
                        </div>
                        <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                        <p class="card-product__price">$${item.price ? item.price : ""}</p>
                      </div>
                    </div>
                </div>`);
        });
    }else{
        $("#lst-product").html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}
// function renderStar(rate) {
//     let data = '';
//     for(i = > 5){
//         if(i < rate)
//             data += <i class="fa fa-star" aria-hidden="true"></i>else{
//
//             data += <i class="fa fa-star-o" aria-hidden="hidden"></i>
//         }
//     }
//     return data;
// }
function rederDataCastBoxUp(data) {
    $("#box-up-lst-prodcut-in-cast").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            $('#box-up-lst-prodcut-in-cast').append(
            `<li>
                <div class="media-left">
                    <div class="cart-img"> <a href="#"> <img class="media-object img-responsive" src="${item.image.imageOne ? item.image.imageOne : ""}" alt="..."> </a> </div>
                </div>
                <div class="media-body">
                    <h6 class="media-heading"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h6>
                    <span class="price">$${item.price ? item.price : ""}</span> <span class="qty">QTY: ${item.number ? item.number : ""}</span>
                </div>
            </li>`
        );
    });
    }else{
        $("#box-up-lst-prodcut-in-cast").html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}
function rederDataCast(data) {
    $("#lst-product-in-cast").empty();
    if (typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#lst-product-in-cast').append(
            `<tr style="position: relative;">
                <td class="cart_product_img">
                    <a href="#"><img src="${item.image.imageOne}" alt="Product"></a>
                </td>
                <td class="cart_product_desc">
                    <a href="/product-details?id=${item.id}" >
                        <h5>${item.name}</h5>
                    </a>
                </td>
                <td class="price">
                    <span>$${item.price}</span>
                </td>
                <td class="qty">
                    <div class="qty-btn d-flex">
                        <p>Qty</p>
                        <div class="quantity">
                            <span class="qty-minus" onclick="removeItem('${item.id}')"><i class="fa fa-minus" aria-hidden="true"></i></span>
                            <input type="number" class="qty-text" id="qty2" step="1" min="1" max="300" name="quantity" value="${item.number ? item.number : 0}">
                            <span class="qty-plus" onclick="addItem('${item.id}')"><i class="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                    </div>
                </td>
                <td onclick="deleteItem(${item.id})" class="remove-item">
                    <span>x</span>
                </td>
            </tr>`
        );
    });
    } else {
        $('#lst-product-in-cast').html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}

//reder user
function rederUserInfo(data) {
    $('#name-user').text(data.id);
}

//reder coment
//    reder coment product
function rederComentProduct(data) {
    $("#comments-list").empty();
    let presentTime = new Date();
    console.log(presentTime);
    if(data != null) {
        data.map(item => {
            $('#comments-list').append(
                `<li>
                    <div class="comment-main-level">
                        <!-- Avatar -->
                        <div class="comment-avatar"><img src="${item.image? item.image : "/img/core-img/login.png"}" alt=""></div>
                        <!-- Contenedor del Comentario -->
                        <div class="comment-box">
                            <div class="comment-head">
                                <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">${item.buyer ? item.buyer : "Anonymously"}</a></h6>
                                <span>hace ${item.createAt ? item.createAt : "0"}</span>
                            </div>
                            <div class="comment-content">
                                ${item.comtent ? item.comtent : ""}
                            </div>
                        </div>
                    </div>
                </li>`
            );
        });
    }else {
        $('#comments-list').html("<p style='color: #1abc9c;'>Product has not been evaluated</p>");
    }
}

//reder favourite
function rederDataFavourite(data) {
    $("#lst-product-in-favourite").empty();
    if (typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#lst-product-in-favourite').append(
                `<tr style="position: relative;">
                <td class="cart_product_img">
                    <a href="#"><img src="${item.image.imageOne}" alt="Product"></a>
                </td>
                <td class="cart_product_desc">
                    <a href="/product-details?id=${item.id}" >
                        <h5>${item.name}</h5>
                    </a>
                </td>
                <td class="price">
                    <span>$${item.price}</span>
                </td>
                <td class="star">
                    <div class="ratings">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-o" aria-hidden="hidden"></i>
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                    </div>
                </td>
                <td onclick="addFavouriteUser(${item.id})" class="remove-item">
                    <span>x</span>
                </td>
            </tr>`
            );
        });
    } else {
        $('#lst-product-in-favourite').html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}
function rederDataFavouriteBoxUp(data) {
    $("#box-up-lst-prodcut-in-favourite").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            $('#box-up-lst-prodcut-in-favourite').append(
                `<tr class="lst-product-cart">
                <td class="cart_product_img box-up">
                    <a href="#"><img width="50" height="50" src="${item.image.imageOne}" alt="Product"></a>
                </td>
                <td class="cart_product_desc box-up">
                    <a href="/product-details?id=${item.id}" >
                        <h5>${item.name}</h5>
                    </a>
                </td>
                <td class="price box-up">
                    <span>$${item.price}</span>
                </td>
                <td onclick="addFavouriteUser(${item.id})" class="remove-item box-up">
                    <span>x</span>
                </td>
            </tr>`
            );
        });
    }else{
        $("#box-up-lst-prodcut-in-favourite").html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}



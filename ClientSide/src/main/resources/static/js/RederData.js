// reder cast
function rederData(data) {
    $("#lst-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            $('#lst-product').append(
            `<div class="col-12 col-sm-6 col-md-12 col-xl-6">
                    <div  class="single-product-wrapper">
                        <!-- Product Image -->
                        <div class="product-img">
                            <img src="${item.image.imageOne}" alt="">
                            <!-- Hover Thumb -->
                            <img class="hover-img" src="${item.image.imageTwo}" alt="">
                        </div>

                        <!-- Product Description -->
                        <div class="product-description d-flex align-items-center justify-content-between">
                            <!-- Product Meta Data -->
                            <div class="product-meta-data">
                                <div class="line"></div>
                                <p class="product-price">$${item.price}</p>
                                <a href="/product-details?id=${item.id}">
                                    <h6>${item.name}</h6>
                                </a>
                            </div>
                            <!-- Ratings & Cart -->
                            <div class="ratings-cart text-right">
                                <div id="ratings" class="ratings">
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                                <div class="cart">
                                    <a onclick="addToCastDB(${item.id})" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt=""></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
    });
    }else{
        $("#lst-product").html("<h3 style='padding: 20px;'>Sản phẩm không tồn tại</h3>");
    }
}
function rederDataCastBoxUp(data) {
    $("#box-up-lst-prodcut-in-cast").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            $('#box-up-lst-prodcut-in-cast').append(
            `<tr style="position: relative;">
                    <td class="cart_product_img">
                        <a href="#"><img width="50" height="50" src="${item.image.imageOne}" alt="Product"></a>
                    </td>
                    <td class="cart_product_desc">
                        <h5>${item.name}</h5>
                    </td>
                    <td class="price">
                        <span>$${item.price}</span>
                    </td>
                    <td style="position: relative;" onclick="deleteItem(${item.id})" class="remove-item">
                        <span>x</span>
                    </td>
                </tr>`
        );
    });
    }else{
        $("#box-up-lst-prodcut-in-cast").html("<h3 style='padding: 20px;'>Sản phẩm không tồn tại</h3>");
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
                    <h5>${item.name}</h5>
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
        $('#lst-product-in-cast').html("<h3 style='padding: 20px;'>Sản phẩm không tồn tại</h3>");
    }
}

//reder user
function rederUserInfo(data) {
    $("#box-up-info-user").empty();
    if(data != null) {
        $('#box-up-info-user').append(
            `<ul>
                <li><a href="#">Tài khoản của tôi</a></li>
                <li><a onclick="logoutUser()">Đăng Xuất</a></li>
            </ul>`
        );
        $('#name-user').text(data.buyer);
        $('#login-user').css("display", "none");
        $('#logout-user').css("display", "block");
    }
}
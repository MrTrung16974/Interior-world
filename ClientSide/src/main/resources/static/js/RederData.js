// reder cast
function rederData(data) {
    let checkFavourite = false;
    $("#lst-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0 != null) {
        data.map(item => {
            userDto.lstFavourite.map(favourite => {
                if(favourite.id == item.id) {
                    checkFavourite = true;
                }
            });
            if(checkFavourite) {
                $('#lst-product').append(
                    `<div class="col-md-6 col-lg-4">
                            <div class="card text-center card-product">
                              <div class="card-product__img">
                                <a href="/product-details?id=${item.id ? item.id : ""}"><img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt=""></a>
                                <ul class="card-product__imgOverlay">
                                  <li><button onclick="addToCastDB(${item.id})"><i class="ti-shopping-cart"></i></button></li>
                                  <li><button onclick="addFavouriteUser(${item.id})"><i style="color: #e5ff10;" class="ti-heart-broken"></i></button></li>
                                </ul>
                              </div>
                              <div class="card-body">
                                <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                                <div class="ratings">
                                    ${forStar(item.star)}
                                </div>
                                <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                <p class="card-product__price">$${item.price ? item.price : ""}</p>
                              </div>
                            </div>
                        </div>`
                );
            }else {
                $('#lst-product').append(
                    `<div class="col-md-6 col-lg-4">
                    <div class="card text-center card-product">
                      <div class="card-product__img">
                        <a href="/product-details?id=${item.id ? item.id : ""}"><img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt=""></a>
                        <ul class="card-product__imgOverlay">
                          <li><button onclick="addToCastDB(${item.id})"><i class="ti-shopping-cart"></i></button></li>
                          <li><button onclick="addFavouriteUser(${item.id})"><i class="ti-heart"></i></button></li>
                        </ul>
                      </div>
                      <div class="card-body">
                        <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                        <div class="ratings">
                            ${forStar(item.star)}
                        </div>
                        <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                        <p class="card-product__price">$${item.price ? item.price : ""}</p>
                      </div>
                    </div>
                </div>`);
            }
            checkFavourite = false;
        });
    }else{
        $("#lst-product").html("<h3 style='padding: 20px;'>There are no products matching your search!</h3>");
    }
}

function rederDataSingleProduct(item) {
    let checkFavourite = false;
    $("#single-product").empty();
    if(typeof item != "undefined"
        && item != null) {
        userDto.lstFavourite.map(favourite => {
            if(favourite.id == item.id) {
                checkFavourite = true;
            }
        });
        if(checkFavourite) {
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
                                    <a class="icon_btn" onclick="addFavouriteUser(${item.id})"><i style="color: red;" class="lnr lnr lnr-heart-pulse"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
        }else {
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
        }


        $("button#add-to-coment").attr("onclick", `addComment('${item.id}')`);
        $("p#description-product").text(item.description ? item.description : "");
    }else{
        $("#single-product").html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
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
            `<li>
                <div class="media-left">
                    <div class="cart-img"> <a href="#"> <img class="media-object img-responsive" src="${item.image[0] ? item.image[0] : ""}" alt="..."> </a> </div>
                </div>
                <div class="media-body">
                    <h6 class="media-heading"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h6>
                    <span class="price">$${item.price ? item.price : ""}</span> <span class="qty">QTY: ${item.number ? item.number : ""}</span>
                    <button style="margin-left: 20px; " class="delete-item-cart" onclick="deleteItem('${item.id ? item.id : ""}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            </li>`
        );
    });
    }else{
        $("#box-up-lst-prodcut-in-cast").html("<p style='text-align: center'>You have no items in the basket</p>");
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
                `<tr>
                      <td>
                          <div class="media">
                              <div class="d-flex">
                                  <img src="${item.image[0] ? item.image[0] : ""}" width="150" height="100" class="img-fluid" alt="">
                              </div>
                              <div class="media-body">
                                  <a  href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a>
                              </div>
                          </div>
                      </td>
                      <td>
                          <h5>$${item.price ? item.price : ""}</h5>
                      </td>
                      <td>
                          <div class="product_count">
                              <input type="text" disabled="disabled" name="qty" id="sst" maxlength="12" value="${item.number ? item.number : 0}" title="Quantity:"
                                  class="input-text qty">
                              <button 
                                  class="increase items-count" onclick="addItem('${item.id}')" type="button"><i class="lnr lnr-chevron-up"></i></button>
                              <button 
                                  class="reduced items-count" onclick="removeItem('${item.id}')" type="button"><i class="lnr lnr-chevron-down"></i></button>
                          </div>
                      </td>
                      <td>
                          <h5>$${item.price && item.number ? item.price*item.number : ""}</h5>
                      </td>
                      <td class="delete-item-cart">
                          <i onclick="deleteItem('${item.id}')" class="fas fa-trash-alt"></i>
                      </td>
                </tr>`
            );
        });
        $('#lst-product-in-cast').append(
            `<tr class="bottom_button">
                  <td>
                      <a class="button" href="#">Update Cart</a>
                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                  <td>
                      <div class="cupon_text d-flex align-items-center">
                          <input type="text" placeholder="Coupon Code">
                          <a class="primary-btn" href="#">Apply</a>
                          <a class="button" href="#">Have a Coupon?</a>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td>
    
                  </td>
                  <td>
    
                  </td>
                  <td>
    
                  </td>
                  <td>
                      <h5>Subtotal</h5>
                  </td>
                  <td>
                      <h5 id="price-number-in-cart">$2160.00</h5>
                  </td>
              </tr>
              <tr class="shipping_area">
                  <td class="d-none d-md-block">
    
                  </td>
                  <td>
    
                  </td>
                  <td>
                      <h5>Shipping</h5>
                  </td>
                  <td>
                  </td>
                  <td>
                      <div class="shipping_box">
                          <ul class="list">
                              <li><a href="#">Flat Rate: $5.00</a></li>
                              <li><a href="#">Free Shipping</a></li>
                              <li><a href="#">Flat Rate: $10.00</a></li>
                              <li class="active"><a href="#">Local Delivery: $2.00</a></li>
                          </ul>
                          <h6>Calculate Shipping <i class="fa fa-caret-down" aria-hidden="true"></i></h6>
                          <select class="shipping_select">
                              <option value="1">Bangladesh</option>
                              <option value="2">India</option>
                              <option value="4">Pakistan</option>
                          </select>
                          <select class="shipping_select">
                              <option value="1">Select a State</option>
                              <option value="2">Select a State</option>
                              <option value="4">Select a State</option>
                          </select>
                          <input type="text" placeholder="Postcode/Zipcode">
                          <a class="gray_btn" href="#">Update Details</a>
                      </div>
                  </td>
              </tr>
              <tr class="out_button_area">
                      <td class="d-none-l">
    
                      </td>
                      <td class="">
    
                      </td>
                      <td>
    
                      </td>
                      <td>
    
                      </td>
                      <td>
                          <div class="checkout_btn_inner d-flex align-items-center">
                              <a class="gray_btn" href="#">Continue Shopping</a>
                              <a class="primary-btn ml-2" href="#">Proceed to checkout</a>
                          </div>
                      </td>
                  </tr>`
        );
    } else {
        $('#lst-product-in-cast').html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}

//reder user
function rederUserInfo(data) {
    $('#name-user').text(data.name);
}

//reder coment
//    reder coment product
function rederComentProduct(data) {
    $("#comments-list").empty();
    if(data != null) {
        data.map(item => {
            $('#comments-list').append(
                `<div class="review_item">
                    <div class="media">
                        <div class="d-flex">
                            <img src="${item.image != null? item.image[0] : "img/product/review-1.png"}" alt="">
                        </div>
                        <div class="media-body">
                            <h4>${item.buyer ? item.buyer : "Anonymously"}</h4>
                            <h5>${item.createAt ? item.createAt : "0"}</h5>
                        </div>
                    </div>
                    <p>${item.comtent ? item.comtent : ""}</p>
                </div>`
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
                `<tr>
                      <td>
                          <div class="media">
                              <div class="d-flex">
                                  <img src="${item.image[0] ? item.image[0] : ""}" width="150" height="100" class="img-fluid" alt="">
                              </div>
                              <div class="media-body">
                                  <p>${item.name ? item.name : ""}</p>
                              </div>
                          </div>
                      </td>
                      <td>
                          <h5>$${item.price ? item.price : ""}</h5>
                      </td>
                      <td>
                          <div class="ratings">
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="fas fa-star" aria-hidden="true"></i>
                            <i class="far fa-star" aria-hidden="hidden"></i>
                            <i class="far fa-star" aria-hidden="hidden"></i>
                        </div>
                      </td>
                      <td>
                          <h5>${item.price && item.number ? item.price*item.number : ""}</h5>
                      </td>
                      <td class="delete-item-cart">
                          <i onclick="deleteItem('${item.id}')" class="fas fa-trash-alt"></i>
                      </td>
                </tr>`
            );
        });
        $('#lst-product-in-favourite').append(
            `<tr class="bottom_button">
                  <td>
                      <a class="button" href="#">Update Cart</a>
                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                  <td>

                  </td>
                  <td>
                      <div class="cupon_text d-flex align-items-center">
                          <input type="text" placeholder="Coupon Code">
                          <a class="primary-btn" href="#">Apply</a>
                          <a class="button" href="#">Have a Coupon?</a>
                      </div>
                  </td>
              </tr>`
        );
    } else {
        $('#lst-product-in-favourite').html("<h3 style='padding: 20px;'>Product does not exist!</h3>");
    }
}
function rederDataFavouriteBoxUp(data) {
    $("#box-up-lst-prodcut-in-favourite").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#box-up-lst-prodcut-in-favourite').append(
                `<li>
                    <div class="media-left">
                        <div class="cart-img"> <a href="#"> <img class="media-object img-responsive" src="${item.image[0] ? item.image[0] : ""}" alt="..."> </a> </div>
                    </div>
                    <div class="media-body">
                        <h6 class="media-heading"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h6>
                        <span class="price">$${item.price ? item.price : ""}</span>
                        <span class="ratings">
                            ${forStar(item.star)}
                        </span>
                        </span>
                        <button style="margin-left: 20px; " class="delete-item-cart" onclick="addFavouriteUser('${item.id ? item.id : ""}')"><i class="fas fa-trash-alt"></i></button>
                        </span>
                    </div>
                </li>`
            );
        })
    }else{
        $("#box-up-lst-prodcut-in-favourite").html("<p style='text-align: center'>You have no items in the basket</p>");
    }
}



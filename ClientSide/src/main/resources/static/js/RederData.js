// reder chung
function rederBanner(data) {
    $("#banner-page").html(
    `<section style="background-image: url(${data.bgBanner})" class="blog-banner-area breadcrumb_bg" id="category">
            <div class="container h-100">
                <div class="blog-banner">
                    <div class="text-center">
                        <h1>${data.namePage}</h1>
                        <nav aria-label="breadcrumb" class="banner-breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a th:href="@{/home}">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">${data.namePage}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>`
    );
}

// reder cast
function rederData(data) {
    let checkFavourite = false;
    $("#lst-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            if(typeof userDto.lstFavourite != "undefined"
                && userDto.lstFavourite != null
                && userDto.lstFavourite.length != null
                && userDto.lstFavourite.length > 0) {
                userDto.lstFavourite.map(favourite => {
                    if(favourite.id == item.id) {
                        checkFavourite = true;
                    }
                });
            }
            if(checkFavourite) {
                $('#lst-product').append(
                    `<div class="col-md-6 col-lg-4">
                            <div class="card text-center card-product">
                              <div class="card-product__img">
                                <a href="/product-details?id=${item.id ? item.id : ""}"><img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt=""></a>
                                <ul class="card-product__imgOverlay">
                                  <li><button onclick="addToCastDefaultDB('${item.id}', '${item.priceForColor[0].nameColor}', '${item.priceForColor[0].priceForColor}', '${item.price ? item.price : 0}')"><i class="ti-shopping-cart"></i></button></li>
                                  <li><button onclick="addFavouriteUser(${item.id})"><i style="color: #e5ff10;" class="ti-heart-broken"></i></button></li>
                                </ul>
                              </div>
                              <div class="card-body">
                                <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                                <div class="ratings">
                                    ${forStar(item.star)}
                                </div>
                                <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                <p class="card-product__price">${formatter.format(item.price ? item.price : 0)}</p>
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
                            <li><button onclick="addToCastDefaultDB('${item.id}', '${item.priceForColor[0].nameColor}', '${item.priceForColor[0].priceForColor}', '${item.price ? item.price : 0}')"><i class="ti-shopping-cart"></i></button></li>
                            <li><button onclick="addFavouriteUser(${item.id})"><i class="ti-heart"></i></button></li>
                        </ul>
                      </div>
                      <div class="card-body">
                        <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                        <div class="ratings">
                            ${forStar(item.star)}
                        </div>
                        <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                        <p class="card-product__price">${formatter.format(item.price ? item.price : 0)}</p>
                      </div>
                    </div>
                </div>`);
            }
            checkFavourite = false;
        });
    }else{
        $("#lst-product").html("<h3 style='color: #1abc9c;padding: 20px;'>There are no products matching your search!</h3>");
    }
}

function rederDataTrending(data) {
    let checkFavourite = false;
    $("#lst-trending-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            if(typeof userDto.lstFavourite != "undefined"
                && userDto.lstFavourite != null
                && userDto.lstFavourite.length != null
                && userDto.lstFavourite.length > 0) {
                userDto.lstFavourite.map(favourite => {
                    if(favourite.id == item.id) {
                        checkFavourite = true;
                    }
                });
            }
            if(checkFavourite) {
                $('#lst-trending-product').append(
                        `<div class="col-md-6 col-lg-4 col-xl-3">
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
                                <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                <p class="card-product__price">${formatter.format(item.price ? item.price : 0)}</p>
                              </div>
                            </div>
                        </div>`
                );
            }else {
                $('#lst-trending-product').append(
                    `<div class="col-md-6 col-lg-4 col-xl-3">
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
                            <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                            <p class="card-product__price">${formatter.format(item.price ? item.price : 0)}</p>
                          </div>
                        </div>
                    </div>`);
            }
            checkFavourite = false;
        });
    }else{
        $("#lst-trending-product").html("<p style='color: #1abc9c;padding: 20px;'>There are no products matching your search!</p>");
    }
}

function rederDataSingleProduct(item) {
    console.log(item);
    let checkFavourite = false;
    $("#single-product").empty();
    if(typeof item != "undefined"
        && item != null) {
        if(typeof userDto.lstFavourite != "undefined"
            && userDto.lstFavourite != null
            && userDto.lstFavourite.length != null
            && userDto.lstFavourite.length > 0) {
            userDto.lstFavourite.map(favourite => {
                if(favourite.id == item.id) {
                    checkFavourite = true;
                }
        });
        }
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
                                <h2 id="price-product">${formatter.format(item.price ? item.price : 0)}</h2>
                                <ul class="list">
                                    <li><a class="active" href="#"><span>Category</span> : ${findCategories(item.type.type != null? item.type.type : 10)}</a></li>
                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                    <li><a href="#"><span>Star</span> : ${forStar(item.star)}</a></li>
                                    <li class="color-for-price">
                                        <span>Color : </span>
                                        ${forColor(item)}
                                    </li>
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
                                    <h2 id="price-product">${formatter.format(item.price ? item.price : 0)}</h2>
                                    <ul class="list">
                                        <li><a class="active" href="#"><span>Category</span> : ${findCategories(item.type.type != null? item.type.type : 10)}</a></li>
                                        <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                        <li><a href="#"><span>Star</span> : ${forStar(item.star)}</a></li>
                                         <li class="color-for-price my-4">
                                             <span>Color : </span>
                                             ${forColor(item)}
                                        </li>
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
        $("p#description-product").text(item.longDescription != null ? item.longDescription : "");
        $("h5#width").text((item.type.width != null ? item.type.width : "") + " cm");
        $("h5#height").text((item.type.height != null ? item.type.height : "") + " cm");
        $("h5#depth").text((item.type.depth != null ? item.type.depth : "") + " cm");
        $("h5#weight").text((item.type.weight != null ? item.type.weight : "") + " kg");
        $("h5#quality-checking").text(item.type.qualityChecking != null ? item.type.qualityChecking : "");
        $("h5#type").text(findCategories(item.type.type != null ? item.type.type : 10));
        $("h5#material").text(findMaterial(item.type.material != null ? item.type.material : 10));
    }else{
        $("#single-product").html("<p style='color: #1abc9c;padding: 20px;'>Product does not exist!</p>");
    }
}

function rederDataCastBoxUp(data) {
    $("#box-up-lst-prodcut-in-cast").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#box-up-lst-prodcut-in-cast').append(
            `<li>
                <div class="media-left">
                    <div class="cart-img"> <a href="#"> <img class="media-object img-responsive" src="${item.image[0] ? item.image[0] : ""}" alt="..."> </a> </div>
                </div>
                <div class="media-body">
                    <h6 class="media-heading"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h6>
                    <span class="price">${formatter.format(item.price ? item.price : 0)}</span> <span class="qty">QTY: ${item.number ? item.number : ""}</span>
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
    console.log(data);
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
                                  <p>Color: <span>${item.nameColor ? item.nameColor : ""}</span></p>
                              </div>
                          </div>
                      </td>
                      <td>
                          <h5>${formatter.format(item.price ? item.price : 0)}</h5>
                      </td>
                      <td>
                          <div class="product_count">
                              <input type="text" disabled="disabled" name="qty" id="sst" maxlength="12" value="${item.number ? item.number : 0}" title="Quantity:"
                                  class="input-text qty">
                              <button 
                                  class="increase items-count" onclick="addItem('${item.id}', '${item.nameColor}')" type="button"><i class="lnr lnr-chevron-up"></i></button>
                              <button 
                                  class="reduced items-count" onclick="removeItem('${item.id}', '${item.nameColor}')" type="button"><i class="lnr lnr-chevron-down"></i></button>
                          </div>
                      </td>
                      <td>
                          <h5>${formatter.format(item.price && item.number ? item.price*item.number : "")}</h5>
                      </td>
                      <td class="delete-item-cart">
                          <i onclick="deleteItem('${item.id }', '${item.nameColor}')" class="fas fa-trash-alt"></i>
                      </td>
                </tr>`
            );
        });
    } else {
        $('#lst-product-in-cast').html("<p style='color: #1abc9c; padding: 20px;'>Product does not exist!</p>");
    }
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
                  <h5 id="price-number-in-cart">$0</h5>
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
}

//reder user
function rederUserInfo(data) {
    if(pathname == "/account-info") {
        if(typeof data != "undefined"
            && data != null) {
            $('#infomation-user').html(
                `<div class="col-12 col-md-7 col-lg-8 col-xl-8">
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td>User Name</td>
                                        <td>${data.username ? data.username : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>
                                            <input value="${data.fullName ? data.fullName : ""}" class="form-control" type="text" id="full-name" name="full-name">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>
                                            <input value="${data.email ? data.email : ""}" class="form-control" type="email" id="email" name="email">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>
                                            <input  class="form-control" value="${data.phone ? data.phone : ""}" type="number" id="phone" name="phone">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sex</td>
                                        <td>
                                            <input type="radio" name="sex" id="male">
                                            <label for="male">Male</label>
                                            <input type="radio" name="sex" id="female">
                                            <label for="female">Female</label>
                                            <input type="radio" name="sex" id="order">
                                            <label for="order">Order</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Birth Day</td>
                                        <td>
                                            <input type="date" name="birthday" id="birthday">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input class="btn btn-primary" type="button" name="save-user" id="btn-save" value="Save" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 col-md-5 col-lg-4 col-xl-4">
                            <div class="col-md-12 form-group text-center">
                                <img src="${data.image ? data.image : ""}" width="100" height="100" class="face-user" id="img-youface" />
                                <input id="image-face" class="image-face" name="image-face" type="file" />
                                <label class="btn-face" for="image-face">Choose image</label>
                                <br />
                                <span>Size flie max 1 MB</span>
                                <br />
                                <span>Format: .JPG, .PND</span>
                            </div>
                        </div>`
            );
        }
        $('#face-user').attr('src', data.image ? data.image : "img/user.png");
        $('#name-account').text(data.fullName ? data.fullName : "Anonymously");
    }
    $('#name-user').text(data.fullName ? data.fullName : "Anonymously");
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
                            <img src="${item.image ? item.image : "img/user.png"}" alt="">
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
                          <h5>${formatter.format(item.price ? item.price : 0)}</h5>
                      </td>
                      <td>
                          <div class="ratings">
                              ${forStar(item.star)}
                          </div>
                      </td>
                      <td>
                          <h5>${findCategories(item.type.type != null? item.type.type : 10)}</h5>
                      </td>
                      <td class="delete-item-cart">
                          <i onclick="addFavouriteUser('${item.id}')" class="fas fa-trash-alt"></i>
                      </td>
                </tr>`
            );
        });

    } else {
        $('#lst-product-in-favourite').html("<p style='color: #1abc9c; padding: 20px;'>Product does not exist!</p>");
    }
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
                        <span class="price">${formatter.format(item.price ? item.price : 0)}</span>
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



// reder cast
function rederDataAllProduct(data) {
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
                    `<div class="col-6 col-sm-6 col-lg-4">
                            <div class="card text-center card-product">
                              <div class="card-product__img">
                                <a href="/product-details?id=${item.id ? item.id : ""}">
                                    <img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt="">
                                    <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                                </a>
                                <ul class="card-product__imgOverlay">
                                  <li><button onclick="showChooseProduct('${item.id}')"><i class="ti-shopping-cart"></i></button></li>
                                  <li><button onclick="addFavouriteUser('${item.id}')"><i style="color: #e5ff10;" class="ti-heart-broken"></i></button></li>
                                </ul>
                                <ul id="${item.id}" style="display: none" class="card-product__imgOverlay choose-color">
                                    <li class="color-for-price">
                                        <p class="text-center text-light">Please choose</p>
                                        ${forColor(item)} 
                                    </li>
                                    <br />
                                    <li><button onclick="addToCastDB('${item.id}', 1)"><i class="ti-shopping-cart"></i></button></li>
                                    <li><button onclick="hideChooseProduct('${item.id}', '${item.promotion != null ? item.promotion.percent: 0}', '${item.price}')"><i class="ti-close"></i></button></li>
                                </ul>
                              </div>
                              <div class="card-body">
                                <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                                <div class="ratings">
                                    ${forStar(item.star)}
                                </div>
                                <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                ${findPriceProduct(item, "-price")}
                              </div>
                            </div>
                        </div>`
                );
            }else {
                $('#lst-product').append(
                    `<div class="col-6 col-sm-6 col-lg-4">
                    <div class="card text-center card-product">
                      <div class="card-product__img">
                        <a href="/product-details?id=${item.id ? item.id : ""}">
                            <img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt="">
                            <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                        </a>
                        <ul class="card-product__imgOverlay">
                            <li><button onclick="showChooseProduct('${item.id}')"><i class="ti-shopping-cart"></i></button></li>
                            <li><button onclick="addFavouriteUser('${item.id}')"><i class="ti-heart"></i></button></li>
                        </ul>
                        <ul id="${item.id}" style="display: none" class="card-product__imgOverlay choose-color">
                            <li class="color-for-price">
                                <p class="text-center text-light">Please choose</p>
                                ${forColor(item)} 
                            </li>
                            <br />
                            <li><button onclick="addToCastDB('${item.id}', 1)"><i class="ti-shopping-cart"></i></button></li>
                            <li><button onclick="hideChooseProduct('${item.id}', '${item.promotion != null ? item.promotion.percent: 0}', '${item.price}')"><i class="ti-close"></i></button></li>
                        </ul>
                      </div>
                      <div class="card-body">
                        <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                        <div class="ratings">
                            ${forStar(item.star)}
                        </div>
                        <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                        ${findPriceProduct(item, "-price")}
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
    let count = 0;
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
            if(count < 8){
               if(checkFavourite) {
                    $('#lst-trending-product').append(
                        `<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
                                <div class="card text-center card-product">
                                  <div class="card-product__img">
                                    <a href="/product-details?id=${item.id ? item.id : ""}">
                                        <img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt="">
                                        <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                                    </a>
                                    <ul class="card-product__imgOverlay">
                                      <li><button onclick="showChooseProduct('${item.id}')"><i class="ti-shopping-cart"></i></button></li>
                                      <li><button onclick="addFavouriteUser('${item.id}')"><i style="color: #e5ff10;" class="ti-heart-broken"></i></button></li>
                                    </ul>
                                    <ul id="${item.id}" style="display: none" class="card-product__imgOverlay choose-color">
                                        <li class="color-for-price">
                                            <p class="text-center text-light">Please choose</p>
                                            ${forColor(item)} 
                                        </li>
                                        <br />
                                        <li><button onclick="addToCastDB('${item.id}', 1)"><i class="ti-shopping-cart"></i></button></li>
                                        <li><button onclick="hideChooseProduct('${item.id}','${item.promotion != null ? item.promotion.percent: 0}', '${item.price}')"><i class="ti-close"></i></button></li>
                                    </ul>
                                  </div>
                                  <div class="card-body">
                                    <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                                    <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                    ${findPriceProduct(item, "-price")}                                  
                                    </div>
                                </div>
                            </div>`
                    );
               }else {
                    $('#lst-trending-product').append(
                        `<div class="col-6 col-sm-6 col-lg-4 col-xl-3">
                            <div class="card text-center card-product">
                              <div class="card-product__img">
                                <a href="/product-details?id=${item.id ? item.id : ""}">
                                    <img class="card-img" src="${item.image[0] ? item.image[0] : ""}" alt="">
                                    <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                                </a>
                                <ul class="card-product__imgOverlay">
                                  <li><button onclick="showChooseProduct('${item.id}')"><i class="ti-shopping-cart"></i></button></li>
                                  <li><button onclick="addFavouriteUser('${item.id}')"><i class="ti-heart"></i></button></li>
                                </ul>
                                <ul id="${item.id}" style="display: none" class="card-product__imgOverlay choose-color">
                                    <li class="color-for-price">
                                        <p class="text-center text-light">Please choose</p>
                                        ${forColor(item)} 
                                    </li>
                                    <br />
                                    <li><button onclick="addToCastDB('${item.id}', 1)"><i class="ti-shopping-cart"></i></button></li>
                                    <li><button onclick="hideChooseProduct('${item.id}', '${item.promotion != null ? item.promotion.percent: 0}', '${item.price}')"><i class="ti-close"></i></button></li>
                                </ul>
                              </div>
                              <div class="card-body">
                                <p>${findCategories(item.type.type != null? item.type.type : 10)}</p>
                                <h4 class="card-product__title"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h4>
                                ${findPriceProduct(item, "-price")}                              
                                </div>
                            </div>
                        </div>`);
               }
            }
            checkFavourite = false;
            count++;
        });
    }else{
        $("#lst-trending-product").html("<p style='color: #1abc9c;padding: 20px;'>There are no products matching your search!</p>");
    }
}
function rederDataCatetory(data) {
    $("#catetory-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#catetory-product').append(
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-0 mb-4">
                    <div id="catetory-product-1" class="single-search-product-wrapper">
                        <div class="single-search-product d-flex">
                            <a href="/product-details?id=${item.id ? item.id : ""}"><img src="${item.image[0] ? item.image[0] : ""}" alt=""></a>
                            <div class="desc">
                                <a href="/product-details?id=${item.id ? item.id : ""}" class="title">${item.name ? item.name : ""}</a>
                                <div class="price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</div>
                                <div class="price">${item.promotion != null ? formatter.format((item.price*((100-item.promotion.percent)/100))) : ""}</div>                             
                            </div>
                        </div>
                    </div>
                </div>
                    `
            );
        });
    }else{
        $("#catetory-product").html("<p style='color: #1abc9c;padding: 20px;'>There are no products matching your search!</p>");
    }
}
function rederDataTop(data) {
    $("#top-product").empty();
    if(typeof data != "undefined"
        && data != null
        && data.length != null
        && data.length > 0) {
        data.map(item => {
            $('#top-product').append(
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-0 mb-4">
                    <div id="catetory-product-1" class="single-search-product-wrapper">
                        <div class="single-search-product d-flex">
                            <a href="/product-details?id=${item.id ? item.id : ""}"><img src="${item.image[0] ? item.image[0] : ""}" alt=""></a>
                            <div class="desc">
                                <a href="/product-details?id=${item.id ? item.id : ""}" class="title">${item.name ? item.name : ""}</a>
                                <div class="price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></div>
                                <div class="price">${item.promotion != null ? formatter.format((item.price*((100-item.promotion.percent)/100))) : ""}</div>                            
                            </div>
                        </div>
                    </div>
                </div>`
            );
        });
    }else{
        $("#top-product").html("<p style='color: #1abc9c;padding: 20px;'>There are no products matching your search!</p>");
    }
}
function rederDataBestSellers(data) {
    let checkFavourite = false;
    for( var i in data ){
        if( data.hasOwnProperty(i) ){
            var $html = '';
            if(typeof userDto.lstFavourite != "undefined"
                && userDto.lstFavourite != null
                && userDto.lstFavourite.length != null
                && userDto.lstFavourite.length > 0) {
                userDto.lstFavourite.map(favourite => {
                    if(favourite.id == data[i].id) {
                        checkFavourite = true;
                    }
                });
            }
            if(checkFavourite) {
                $html += (`<div class="card text-center card-product">
                                <div class="card-product__img">
                                    <a href="/product-details?id=${data[i].id}">
                                        <img class="img-fluid" src="${data[i].image[0] != null? data[i].image[0] : ''}" alt="">
                                        <div class="promotion">${data[i].promotion != null ? data[i].promotion.percent+"%" : ""}</div>
                                    </a>
                                    <ul class="card-product__imgOverlay">
                                        <li><button onclick="showChooseProductSellers('${data[i].id}')"><i class="ti-shopping-cart"></i></button></li>
                                        <li><button onclick="addFavouriteUser('${data[i].id}')"><i style="color: #e5ff10;" class="ti-heart-broken"></i></button></li>
                                    </ul>
                                    <ul style="display: none" class="card-product__imgOverlay choose-color ${data[i].id}-sellers">
                                        <li class="color-for-price">
                                            <p class="text-center text-light">Please choose</p>
                                            ${forColor(data[i])} 
                                        </li>
                                        <br />
                                        <li><button onclick="addToCastDB('${data[i].id}', 2)"><i class="ti-shopping-cart"></i></button></li>
                                        <li><button onclick="hideChooseProductSellers('${data[i].id}', '${data[i].promotion != null ? data[i].promotion.percent: 0}', '${data[i].price}')"><i class="ti-close"></i></button></li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <p>${findCategories(data[i].type.type != null ? data[i].type.type : 10 )}</p>
                                    <h4 class="card-product__title"><a href="/product-details?id=${data[i].id}">${data[i].name != null? data[i].name : ""}</a></h4>
                                    ${findPriceProductSellers(data[i], "-price-sellers")}
                                </div>
                            </div>`);
            }else {
                $html += (`<div class="card text-center card-product">
                                <div class="card-product__img">
                                    <a href="/product-details?id=${data[i].id}">        
                                        <img class="img-fluid" src="${data[i].image[0] != null? data[i].image[0] : ''}" alt="">
                                        <div class="promotion">${data[i].promotion != null ? data[i].promotion.percent+"%" : ""}</div>
                                    </a>
                                    <ul class="card-product__imgOverlay">
                                        <li><button onclick="showChooseProductSellers('${data[i].id}')"><i class="ti-shopping-cart"></i></button></li>
                                        <li><button onclick="addFavouriteUser('${data[i].id}')"><i style="color: #e5ff10;" class="ti-heart"></i></button></li>
                                    </ul>
                                    <ul style="display: none" class="card-product__imgOverlay choose-color ${data[i].id}-sellers">
                                        <li class="color-for-price">
                                            <p class="text-center text-light">Please choose</p>
                                            ${forColor(data[i])} 
                                        </li>
                                        <br />
                                        <li><button onclick="addToCastDB('${data[i].id}', 2)"><i class="ti-shopping-cart"></i></button></li>
                                        <li><button onclick="hideChooseProductSellers('${data[i].id}', '${data[i].promotion != null ? data[i].promotion.percent: 0}', '${data[i].price}')"><i class="ti-close"></i></button></li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <p>${findCategories(data[i].type.type != null ? data[i].type.type : 10 )}</p>
                                    <h4 class="card-product__title"><a href="/product-details?id=${data[i].id}">${data[i].name != null? data[i].name : ""}</a></h4>
                                    ${findPriceProductSellers(data[i], "-price-sellers")}                                
                                </div>
                            </div>`);
            }
            checkFavourite = false;
        }
        owlBestSeller.trigger('add.owl.carousel',jQuery($html));
    }
    owlBestSeller.trigger('refresh.owl.carousel')
}
function rederDataLatest(data) {
    for( var i in data ){
        if( data.hasOwnProperty(i) ){
            var $html = '';
            $html += (`<div class="hero-carousel__slide">
                                        <img src="${data[i].image[0] ? data[i].image[0] : ''}" alt="" class="img-fluid">
                                        <a href="/product-details?id=${data[i].id}" class="hero-carousel__slideOverlay">
                                            <h3>${data[i].name ? data[i].name : ""}</h3>
                                            <p>${findCategories(data[i].type.type)}</p>
                                        </a>
                                    </div>`);
        }
        owl.trigger('add.owl.carousel',jQuery($html));
    }
    owl.trigger('refresh.owl.carousel')
}
function rederDataSlide(data) {
    for( var i in data ){
        if( data.hasOwnProperty(i) ){
            var $html = '';
            $html += (`<div class="hero-carousel__slide">
                          <img src="${data[i].bgBanner ? data[i].bgBanner : 'img/Slide/banner_1.jpg'}" alt="" class="img-fluid">
                          <div class="hero-banner__content">
                            <h4>${data[i].nameBanner}</h4>
                            <h1>${data[i].titleBanner}</h1>
                            <p>${data[i].contentBanner}</p>
                            <a class="button button-hero" href="/shop">Browse Now</a>
                          </div>
                        </div>`);
        }
        owlBanner.trigger('add.owl.carousel',jQuery($html));
    }
    owlBanner.trigger('refresh.owl.carousel')
}


function rederDataSingleProduct(item) {
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
                        <div style="overflow: hidden;position: relative;padding: 0;" class="col-lg-6">
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
                            <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                        </div>
                        <div class="col-lg-5 offset-lg-1">
                            <div class="s_product_text">
                                <h3>${item.name ? item.name : ""}</h3>
                                    ${findPriceSingleProduct(item, "-price")}
                                    <ul class="list">
                                    <li><a class="active" href="#"><span>Category</span> : ${findCategories(item.type.type != null? item.type.type : 10)}</a></li>
                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                    <li><a href="#"><span>Star</span> : <span id="single-star-product">${forStar(item.star)}</span></a></li>
                                    <li class="color-for-price">
                                        <span>Color : </span>
                                        ${forColor(item)}
                                    </li>
                                </ul>
                                <p>${item.description ? item.description : ""}</p>
                              
                                <div class="product_count">
                                    <a class="button primary-btn" onclick="addToCastDB('${item.id}', 1)">Add to Cart</a>               
                                </div>
                                <div class="card_area d-flex align-items-center">
                                    <a class="icon_btn" onclick="addFavouriteUser(${item.id})"><i style="color: red;" class="lnr lnr lnr-heart-pulse"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
        }else {
            $('#single-product').html(
                `<div class="row s_product_inner">
                            <div style="overflow: hidden;position: relative;padding: 0;" class="col-lg-6">
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
                                <div class="promotion">${item.promotion != null ? item.promotion.percent+"%" : ""}</div>
                            </div>
                            <div class="col-lg-5 offset-lg-1">
                                <div class="s_product_text">
                                    <h3>${item.name ? item.name : ""}</h3>
                                    ${findPriceSingleProduct(item, "-price")}
                                    <ul class="list">
                                        <li><a class="active" href="#"><span>Category</span> : ${findCategories(item.type.type != null? item.type.type : 10)}</a></li>
                                        <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                        <li><a href="#"><span>Star</span> : <span id="single-star-product">${forStar(item.star)}</span></a></li>
                                         <li class="color-for-price my-4">
                                             <span>Color : </span>
                                             ${forColor(item)}
                                        </li>
                                    </ul>
                                    <p>${item.description ? item.description : ""}</p>
                                  
                                    <div class="product_count">
                                        <a class="button primary-btn" onclick="addToCastDB('${item.id}', 1)">Add to Cart</a>               
                                    </div>
                                    <div class="card_area d-flex align-items-center">
                                        <a class="icon_btn" onclick="addFavouriteUser(${item.id})"><i class="lnr lnr lnr-heart"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
        }

        $("#total-comment").text(item.comment != null? `(${item.comment.length})` : `(0)`);
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
                        <div class="cart-img"> <a href="/product-details?id=${item.id ? item.id : ""}"> <img class="media-object img-responsive" src="${item.image[0] ? item.image[0] : ""}" alt="..."> </a> </div>
                    </div>
                    <div class="media-body">
                        <h6 class="media-heading"><a href="/product-details?id=${item.id ? item.id : ""}">${item.name ? item.name : ""}</a></h6>
                        <span class="price">${formatter.format(item.price ? item.price : 0)}</span> <span class="qty">QTY: ${item.number ? item.number : ""}</span>
                        <button style="margin-left: 20px; " class="delete-item-cart" onclick="deleteItem('${item.id }', '${item.nameColor}')"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </li>`
            );
        });
    $("#total-comment").text(data.comment != null? `(${data.comment.length})` : `(0)`);
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
                                  <p>Color: <span>${item.nameColor ? item.nameColor : ""}</span></p>
                              </div>
                          </div>
                      </td>
                      <td>
                          <h5>${formatter.format(item.price ? item.price : 0)}</h5>
                      </td>
                      <td>
                          <div class="product_count">
                              <input type="text" disabled="disabled" name="qty" maxlength="12" value="${item.number ? item.number : 0}" title="Quantity:" class="input-text qty">
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
                          <li><a>
                                <label for="5.00">Flat Rate: $5.00</label>
                                <input type="radio" name="shipping-rete" value="5" id="5.00">
                          </a></li>
                          <li><a>
                            <label for="free">Free Shipping</label>
                            <input type="radio" name="shipping-rete" value="0" id="free">
                          </a></li>
                          <li><a>
                              <label for="10.00">Flat Rate: $10.00</label>
                              <input type="radio" name="shipping-rete" value="10" id="10.00">
                           </a></li>
                          <li><a>
                                <label for="2.00">Local Delivery: $2.00</label>
                                <input type="radio" name="shipping-rete" value="2" id="2.00">
                          </a></li>
                      </ul>
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
                          <a class="gray_btn" href="/shop">Continue Shopping</a>
                          <a class="primary-btn ml-2" onclick="checkout()">Proceed to checkout</a>
                      </div>
                  </td>
              </tr>`
    );
}
function rederDataCheckout() {
    $("#lst-product-in-cast").empty();
    if(typeof order.listProduct != "undefined"
        && order.listProduct != null
        && order.listProduct.length != null
        && order.listProduct.length > 0) {
        $('#list-product-checkout').append(
            `<li><a href="#"><h4>Product <span>Total</span></h4></a></li>`
        );
        order.listProduct.map(item => {
            $('#list-product-checkout').append(
                `<li><a href="#">${item.name}<span class="middle">x ${item.number}</span> <span class="last">${formatter.format(item.price)}</span></a></li>`
            );
        });
        $("#total-price-product").text(formatter.format(order.totalPrice));
        $("#flat-rate-shipping").text(formatter.format(order.flatRateShipping));
        $("#total-product-order").text(order.totalProductOrder);
    }else {
        $('#lst-product-in-cast').html("<p style='color: #1abc9c; padding: 20px;'>Checkout does not exist!</p>");
    }
}
function rederDataAllOrder(order) {
    $("#content-order").empty();
    if( typeof order != "undefined"
        && order != null
        && order.length != null
        && order.length > 0) {
        order.map(item => {
            $("#content-order").append(`
                <div class="order">
                    <div class="order-header">
                        <div class="row">
                            <div class="col-12 col-sm-5">
                                <div>
                                    <i class="fas fa-shipping-fast"></i>
                                    <span id="order_status">${findStatusOrder(item.status)}</span>
                                </div>
                            </div>
                            <div class="col-12 col-sm-7">
                                <div>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span id="order_address">${item.shippingAddress}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="body-order mx-2">
                        <div class="product-in-order">
                            ${forProductOrder(item.listProduct)}
                        </div>
                        <hr />
                        <div style="font-size: 20px;" >
                            <span>Total : </span>
                            <span style="color: red;">${item.flatRateShipping != null ? formatter.format(item.flatRateShipping) : "$0"}</span>
                        </div>
                    </div>
                </div>
            `);
        });
    }else {
        $("#content-order").text("You have not placed any orders yet!");
    }
}

function rederInfoUserDataCheckout() {
    if(typeof userDto != "undefined"
        && userDto != null
        && userDto != "") {
        $("#billing-details").empty();
        $("#billing-details").html(
            `<div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" disabled value="${userDto.username ? userDto.username : ''}" id="name" placeholder="First name" name="name">
                <span class="placeholder" data-placeholder="User name" ></span>
            </div>
            <div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" value="${userDto.fullName ? userDto.fullName : ''}" id="fullName" name="fullName" placeholder="Last name">
                <span class="placeholder" data-placeholder="Full name"></span>
            </div>
            <div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" id="phone"  value="${userDto.phone ? userDto.phone : ''}"  name="phone" placeholder="Phone number">
                <span class="placeholder" data-placeholder="Phone number"></span>
            </div>
            <div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" id="email"  value="${userDto.email ? userDto.email : ''}"  name="email" placeholder="Email Address">
                <span class="placeholder" data-placeholder="Email Address"></span>
            </div>
            <div class="col-md-12 form-group p_star">
                <input type="text" class="form-control" id="billing-address" name="billing-address"  value="${userDto.address ? userDto.address : ''}"  placeholder="Billing Address">
                <span class="placeholder" data-placeholder="Billing Address"></span>
            </div>
            <div class="col-md-12 form-group p_star">
                <input type="text" class="form-control" id="shipping-address" name="shipping-address"  value="${userDto.address ? userDto.address : ''}" placeholder="Shipping Address">
                <span class="placeholder" data-placeholder="Shipping Address"></span>
            </div>      
            <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="zip" name="zip" placeholder="Postcode/ZIP">
            </div>
            <div class="col-md-12 form-group">
                <div class="creat_account">
                    <input type="checkbox" id="f-option2" name="selector">
                    <label for="f-option2">Create an account?</label>
                </div>
            </div>
            <div class="col-md-12 form-group mb-0">
                <div class="creat_account">
                    <h3>Shipping Details</h3>
                    <input type="checkbox" id="f-option3" name="selector">
                    <label for="f-option3">Ship to a different address?</label>
                </div>
                <textarea class="form-control" name="message" id="message" rows="1" placeholder="Note to the seller..."></textarea>
            </div>`
        );
    }
}
function rederInfoUserDataPayMent(order) {
    $("#order-info").empty();
    $("#order-product").empty();
    if(typeof userDto != "undefined"
        && userDto != null
        && userDto != "") {
        $("#order-info").html(
            `<div class="row mb-5">
              <div class="col-md-6 col-xl-4 mb-4 mb-xl-0">
                <div class="confirmation-card">
                  <h3 class="billing-title">Order Info</h3>
                  <table class="order-rable">
                    <tr>
                      <td>Order number</td>
                      <td>: ${order.id}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                      <td>: ${order.createdAt}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>: ${order.flatRateShipping != null ? formatter.format(order.flatRateShipping) : "$0"}</td>
                    </tr>
                    <tr>
                      <td>Payment method</td>
                      <td>: ${order.paymentType != null ? order.paymentType : ""}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="col-md-6 col-xl-4 mb-4 mb-xl-0">
                <div class="confirmation-card">
                  <h3 class="billing-title">Billing Address</h3>
                    <p>
                        <span>Adderss </span>
                        <span>:  ${order.billingAddress != null ? order.billingAddress : ""}</span>
                    </p>
                </div>
              </div>
              <div class="col-md-6 col-xl-4 mb-4 mb-xl-0">
                <div class="confirmation-card">
                  <h3 class="billing-title">Shipping Address</h3>
                    <p>
                        <span>Adderss</span>
                        <span>: ${order.shippingAddress != null ? order.shippingAddress : ""}</span>
                    </p>
                </div>
              </div>
            </div>`
        );
        order.listProduct.map(item => {
            $('#order-product').append(
                `<tr>
                <td>
                  <p>${item.name}</p>
                </td>
                <td>
                  <h5>x ${item.number}</h5>
                </td>
                <td>
                  <p>${formatter.format(item.price)}</p>
                </td>`
            );
        });
        $('#order-product').append(
            `<tr>
                <td>
                  <h4>Subtotal</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <p>${formatter.format(order.totalPrice)}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Shipping</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <p>Flat rate: ${formatter.format(order.shippingRates)}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Total</h4>
                </td>
                <td>
                  <h5></h5>
                </td>
                <td>
                  <h4>${formatter.format(order.flatRateShipping)}</h4>
                </td>
              </tr>`
        );
        orderConfirmation = {};
    }else {
        $("p.billing-alert").text("You have not placed any orders yet!");
    }
}

//reder user
function rederUserInfo() {
    if(pathname == "/account-info") {
        if(typeof userDto != "undefined"
            && userDto != null) {
            $('#user-info').html(
                `<div class="Info-user-profile">
                    <div class="title-user form-header">
                        <h5>User Profile</h5>
                        <p>Manage profile information for account security</p>
                    </div>
                    <form class="content-user-profile from-content">
                        <div class="row">
                            <div class="col-12 col-md-7 col-lg-8 col-xl-8">
                                <table width="100%">
                                    <tbody class="login_form">
                                        <tr>
                                            <td>User Name</td>
                                            <td id="user-name">${userDto.username ? userDto.username : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Full Name</td>
                                            <td class="form-group">
                                                <input value="${userDto.fullName ? userDto.fullName : ""}" class="form-control" type="text" id="full-name-user" name="full-name-user">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td class="form-group">
                                                <input value="${userDto.email ? userDto.email : ""}" class="form-control" type="email" id="email-user" name="email-user">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td class="form-group">
                                                <input  class="form-control" value="${userDto.phone ? userDto.phone : ""}" type="number" id="phone-user" name="phone-user">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sex</td>
                                            <td>
                                                <input type="radio" class="sex" value="0" name="sex" id="male">
                                                <label for="male">Male</label>
                                                <input type="radio" class="sex" value="1" name="sex" id="female">
                                                <label for="female">Female</label>
                                                <input type="radio" class="sex" value="2" name="sex" id="other">
                                                <label for="other">Other</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Birth Day</td>
                                            <td class="form-group">
                                                <input type="date" class="form-control" id="birthday-user" name="birthday-user" value="${ChangeDateFormatAgain(userDto.birthday != null ? userDto.birthday : "00/00/0000")}" placeholder="dd-mm-yyyy" />
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-12 col-md-5 col-lg-4 col-xl-4">
                                <div class="col-md-12 form-group text-center">
                                    <img src="${userDto.image ? userDto.image : ""}" width="100" height="100" class="face-user" id="img-youface" />
                                    <input id="image-face" class="image-face" name="image-face" type="file" />
                                    <label class="btn-face" for="image-face">Choose image</label>
                                    <br />
                                    <span>Size flie max 1 MB</span>
                                    <br />
                                    <span>Format: .JPG, .PND</span>
                                </div>
                            </div>
                            <div class="col-12 mt-5">
                                <input class="btn btn-primary" onclick="updateUser()" type="button" name="save-user" id="btn-save" value="Save" />
                            </div>
                        </div>
                    </form>
                </div>`
            );
        }
        if(userDto.sex != null) {
            let valSex = userDto.sex;
            $(`input[value=${valSex}].sex`).attr("checked", "checked");
        }
        $('#face-user').attr('src', userDto.image ? userDto.image : "img/user.png");
        $('#name-account').text(userDto.fullName ? userDto.fullName : "Anonymously");
    }
    $('#name-user').text(userDto.fullName ? userDto.fullName : "Anonymously");
}
function rederUsesAddress() {
    if(pathname == "/account-info") {
        if(typeof userDto.address != "undefined"
            && userDto.address != null) {
            $('#user-info').html(
                `<div class="Info-address">
                        <div class="title-user form-header">
                            <h5>My Address</h5>
                        </div>
                        <div id="content-adddress" class="content-addres">
                            <ul>
                                <li>
                                    <div class="row">
                                        <div class="col-12 col-xl-2 col-lg-2 col-md-2">
                                            <div>
                                                <span>Name</span>
                                            </div>
                                            <div>
                                                <span>Phone</span>
                                            </div>
                                            <div>
                                                <span>Address</span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-8 col-lg-8 col-md-8">
                                            <div>
                                                <span>${userDto.fullName} </span>
                                            </div>
                                            <div>
                                                <span>${userDto.phone}</span>
                                            </div>
                                            <div class="form-group">
                                                <span id="input-user-address">${userDto.address}</span>
                                            </div>
                                        </div>
                                        <div class="col-12 col-xl-2 col-lg-2 col-md-2">
                                            <div id="shop-edit-user">
                                                <span><a ><i onclick="editAddressUser()" class="fas fa-edit"></i></a></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>`
            );
        }else {
            $('#user-info').html(
                `<ul class="login_form">
                    <li  class="form-group">
                        <p>You do not have an address!</p>
                        <hr/>
                    </li>
                    <li class="form-group">
                        <textarea rows="3" id="user-address" class="form-control" placeholder="Your Address!"></textarea>
                    </li> 
                    <li class="form-group">
                        <button onclick="updateUserAddress()" class="btn btn-success">+  Add</button>
                    </li>
                </ul>`
            );
        }
    }
}
function rederChangePassword() {
    if(pathname == "/account-info") {
        $('#user-info').html(
            `<div class="change-password-profile">
                <div class="title-user form-header">
                    <h5>Change Password</h5>
                    <p>For account security, please do not share the password with others</p>
                </div>
                <form class="content-password login_form from-content">
                    <label for="current-password">Current Password : </label>
                    <div class="col-md-12 form-group">
                        <input onkeypress="changePassword(event)" type="password" class="form-control" name="current-password" id="current-password" />
                        <i class="hide-eye-pass eye-pass fas fa-eye-slash"></i>
                        <i class="show-eye-pass eye-pass fas fa-eye"></i>
                    </div>
                    <label for="new-password">New Password : </label>
                    <div class="col-md-12 form-group">
                        <input  onkeypress="changePassword(event)" type="password" class="form-control"  name="new-password" id="new-password" />
                        <i class="hide-eye-pass eye-pass fas fa-eye-slash"></i>
                        <i class="show-eye-pass eye-pass fas fa-eye"></i>
                    </div>
                    <label for="confirm-password">Confirm Password : </label>
                    <div class="col-md-12 form-group">
                        <input onkeypress="changePassword(event)" type="password" class="form-control"  name="confirm-password" id="confirm-password" />
                        <i class="hide-eye-pass eye-pass fas fa-eye-slash"></i>
                        <i class="show-eye-pass eye-pass fas fa-eye"></i>
                    </div>
                    <button onclick="changeClickPassword()" class="btn btn-primary" type="button">Change</button>
                </form>
            </div>`
        );
    }
    shopHidePass();
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
                            <span class="ratings">
                                   ${forStar(item.star)}                     
                            </span>
                            <h5>${item.createAt ? item.createAt : "0"}</h5>
                            <a class="reply_btn" onclick="likeCommet('${item.id}', '${item.buyer}')">
                                <i class="far fa-thumbs-up"></i>
                                <span class="number-like">${item.like != null ? item.like.length : "0"}</span>
                            </a>
                        </div>
                    </div>
                    <p>${item.comtent ? item.comtent : ""}</p>
                </div>`
            );
        });
        $("#total-comment").text(data != null? `(${data.length})` : `(0)`);
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



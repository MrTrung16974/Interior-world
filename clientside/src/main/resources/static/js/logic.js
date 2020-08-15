//    switch option
switch (pathname) {
    case "/home":
        $("title.title-page").text("Aroma Shop - Home");
        $("li.home").addClass("active");
        break;
    case "/shop":
        $("title.title-page").text("Aroma Shop - Shop");
        $("li.shop").addClass("active");
        break;
    case "/cart":
        $("title.title-page").text("Aroma Shop - Cart");
        $("li.cart").addClass("active");
        break;
    case "/checkout":
        $("title.title-page").text("Aroma Shop - Check Out");
        break;
    case "/product-details":
        $("title.title-page").text("Aroma Shop - Product Details");
        break;
    case "/contact":
        $("title.title-page").text("Aroma Shop - Contact");
        $("li.contact").addClass("active");
        break;
    case "/login":
        $("title.title-page").text("Aroma Shop - Login");
        $("div.nav-link>a.login").addClass("active");
        break;
    case "/register":
        $("title.title-page").text("Aroma Shop - Register");
        $("div.nav-link>a.register").addClass("active");
        break;
    case "/confirmation":
        $("title.title-page").text("Aroma Shop - Confirmation");
        break;
    case "/tracking-order":
        $("title.title-page").text("Aroma Shop - Tracking Order");
        break;
    case "/favourite":
        $("title.title-page").text("Aroma Shop - Favourite");
        break;
    case "/account-info":
        $("title.title-page").text("Aroma Shop - Account Info");
        break;
    default :
        $("title.title-page").text("Aroma Shop");
        break;
}
function findCategories(type) {
    let category = null;
    lstCategory.forEach(item => {
        if(item.id == type) {
            category = item.contentCategory;
        }
    });
    return category;
}
function findMaterial(material) {
    let fabric = null;
    lstMaterial.forEach(item => {
        if(item.id == material) {
            fabric = item.contentMaterial;
        }
    });
    return fabric;
}
function findStatusOrder(status) {
    let satusOrder = null;
    switch (status) {
        case 1:
            satusOrder = "Cart";
            break;
        case 2:
            satusOrder = "CheckOut";
            break;
        case 3:
            satusOrder = "Order";
            break;
        case 4:
            satusOrder = "OnDelivery";
            break;
        case 5:
            satusOrder = "Delivered";
            break;
        default:
            break;
    }
    return satusOrder;
}
function findPriceProduct(item, nameClacs) {
    let price = "";
    if(item.promotion != null) {
        price = (`<p class="card-product__price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></p>
        <p id="${item.id + nameClacs}" class="card-product__price">${item.promotion != null ? formatter.format((item.price*((100-item.promotion.percent)/100))) : ""}</p>`)
    }else {
        price = (`<p id="${item.id + nameClacs}" class="card-product__price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></p>`);
    }
    return price;
}

function findPriceProductSellers(item, nameClacs) {
    let price = "";
    if(item.promotion != null) {
        price = (`<p class="card-product__price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></p>
        <p  class="card-product__price ${item.id + nameClacs}">${item.promotion != null ? formatter.format((item.price*((100-item.promotion.percent)/100))) : ""}</p>`)
    }else {
        price = (`<p  class="card-product__price ${item.id + nameClacs}" >${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></p>`);
    }
    return price;
}

function findPriceSingleProduct(item, nameClacs) {
    let price = "";
    if(item.promotion != null) {
        price = (`<h2 class="card-product__price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></h2>
        <h2 id="${item.id + nameClacs}" class="card-product__price">${item.promotion != null ? formatter.format((item.price*((100-item.promotion.percent)/100))) : ""}</h2>`)
    }else {
        price = (`<h2 id="${item.id + nameClacs}" class="card-product__price">${item.promotion != null ? item.price ? "<s>" + formatter.format(item.price) +"</s>" : "<s>" +0 +"</s>" : item.price ? formatter.format(item.price) : 0}</s></h2>`);
    }
    return price;
}


function forStar(star) {
    let starWrite = "";
    for (let i=1; i <= 5; i++) {
        if(i > star) {
            starWrite += "<i class=\"far fa-star\" aria-hidden=\"false\"></i>";
        }else {
            starWrite += "<i class=\"fas fa-star\" aria-hidden=\"true\"></i>";
        }
    }
    return starWrite;
}
function forPagination(totalPage, page) {
    $("#pagination").empty();
    let i = 0;
    $("#pagination").append(`<li><a onclick='searchProduct(${page == 0 ? 0 : page-1})'><i class="fa fa-angle-left"></i></a></li>`);
    for(i; i < totalPage; i++) {
        if(i == currentPage) {
            $("#pagination").append(`<li class="active"><a onclick='searchProduct(${i})'>${i+1}</a></li>`);
        }else {
            $("#pagination").append(`<li><a onclick='searchProduct(${i})'>${i+1}</a></li>`);
        }
    }
    $("#pagination").append(`<li><a onclick='searchProduct(${page == totalPage-1 ? totalPage-1 : page+1})'><i class="fa fa-angle-right"></i></a></li>`);
}
function forImageLi(data) {
    let imageLiWrite = "";
    let length = data.length;
    for (let i=0; i < length; i++) {
        if(i == 0) {
            imageLiWrite += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;
        }else {
            imageLiWrite += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
        }
    }
    return imageLiWrite;
}
function forImage(data) {
    let imageWrite = "";
    let length = data.length;
    for (let i=0; i < length; i++) {
        if(i == 0) {
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
function forColor(data) {
    let colorWrite = "";
    if(data.priceForColor != null && data.priceForColor.length > 0) {
        let item = data.priceForColor;
        let length = item.length;
        for (let i=0; i < length; i++) {
            colorWrite += `<a class="${data.id}-checked">
                                <label for="${data.id}-${item[i].nameColor}" class="name-color">${item[i].nameColor}</label>
                                <input type="radio" value="${item[i].nameColor}"
                                 onclick="getPriceProduct('${data.id}' , '${data.price}', '${item[i].priceForColor}', '${data.promotion != null ? data.promotion.percent : 0}')"
                                  name="color-price" id="${data.id}-${item[i].nameColor}">
                            </a>`;
        }
    }
    return colorWrite;
}
function forProductOrder(data) {
    let productOrder = "";
    if (data != null && data.length > 0) {
        let item = data.priceForColor;
        data.map(item => {
            productOrder +=
                (`<div class="row mt-2">
                    <div class="col-sm-3 image-product">
                        <img width="100" height="100" src="${item.image.length > 0 ? item.image[0] : ''}" alt="Ảnh product">
                    </div>
                    <div class="col-sm-6 name-product">
                        <span>${item.name != null ? item.name : ''}</span>
                        <div>
                            <span>Color : </span>
                            <span>${item.nameColor != null ? item.nameColor : ''}</span>
                        </div>
                    </div>
                    <div class="col-sm-3 price-product">
                        <span style="color: red;">${item.price != null ? formatter.format(item.price) : ''}</span>
                    </div>
                </div>`);
        });
    }
    return productOrder;
}
function getPriceProduct(id, price, priceColor , percent) {
    let nameColor = $(this);
    let numberPrice = Number.parseInt(price);
    let numberPriceColor = Number.parseInt(priceColor);
    let numberPercent = Number.parseInt(percent);
    if(price > 0) {
        if(Number.parseInt(percent) > 0) {
            $(`#${id}-price`).text(formatter.format((numberPrice*((100-numberPercent)/100)) + numberPriceColor));

            $(`.${id}-price-sellers`).text(formatter.format((numberPrice*((100-numberPercent)/100)) + numberPriceColor));
        }else {
            $(`#${id}-price`).text(formatter.format(numberPrice + numberPriceColor));
            $(`.${id}-price-sellers`).text(formatter.format(numberPrice + numberPriceColor));
        }
    }else {
        $(`#${id}-price`).text(formatter.format(0));
    }
}

function showChooseProductSellers(id) {
    $(`.${id}-sellers`).show();
}
function hideChooseProductSellers(id, percent, price) {
    $(`.${id}-sellers`).hide();
    if(percent > 0) {
        $(`.${id}-price-sellers`).text(formatter.format((price*((100-Number.parseInt(percent))/100))));
    }else {
        $(`.${id}-price-sellers`).text(formatter.format((price)));
    }
    $(`a.${id}-checked input[type="radio"]`).prop('checked', false);
}

function showChooseProduct(id) {
    $(`#${id}`).show();
}
function hideChooseProduct(id, percent, price) {
    $(`#${id}`).hide();
    if(percent > 0) {
        $(`#${id}-price`).text(formatter.format((price*((100-Number.parseInt(percent))/100))));
    }else {
        $(`#${id}-price`).text(formatter.format(price));
    }
    $(`a.${id}-checked input[type="radio"]`).prop('checked', false);
}

//vallidate contain
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(email) {
    const re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    return re.test(String(email).toLowerCase());
}

// function shop vs hide loading
function shopLoading() {
    $("#loading").css('display', 'block');
    $("#bg-loading").css('display', 'block');
}
function hideLoading() {
    $("#loading").css('display', 'none');
    $("#bg-loading").css('display', 'none');
}
// End reder chung

// search all page
// let inputSearch = $("div#search_input_box");
// $("#search-all-page").on('click', function () {
//     let isopened =
//         $('#search_input_box').css("display");
//     if(isopened != "block" ) {
//         inputSearch.show(500);
//     }else {
//         inputSearch.hide(500);
//     }
// });
// $("#close_search").on('click', function () {
//     inputSearch.hide(500);
// });

// logic cart
function getTotalProductInCast(cast) {
    let total = cart.listProduct.length;
    if (total <= 0) {
        $("#total-cast").text(`0`);
    } else {
        $("#total-cast").text(`${total}`);
    }
}
function getTotalProductInFavourite(data) {
    let total = data.length;
    if (total <= 0) {
        $("#total-favourite").text(`0`);
    } else {
        $("#total-favourite").text(`${total}`);
    }
}
function getPriceProductInCast(cast) {
    let price_number = 0;
    if (cast.listProduct != null) {
        let length = cast.listProduct.length;
            for (let i = 0; i < length; i++) {
                price_number += (cast.listProduct[i].price * cast.listProduct[i].number);
            }
        $("#price-number").text(formatter.format(price_number));
        $("#price-number-in-cart").text(formatter.format(price_number));
    }
}


//logic user name
function editAddressUser() {
    $("span#input-user-address").html(
        `<textarea rows="3" id="user-address" class="form-control different-control w-100" placeholder="Your Address!"></textarea>
                <button onclick="updateUserAddress()" class="btn btn-success mt-3">Edit Address</button>`
    );
    $("div#shop-edit-user").attr("style", "display:none;");
}

$(document).ready(function() {

    // Rating Initialization
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function(e){
            if (e < onStar) {
                $(this).addClass('hover');
            }
            else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function(){
        $(this).parent().children('li.star').each(function(e){
            $(this).removeClass('hover');
        });
    });

    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');
        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }

        // JUST RESPONSE (Not needed)
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        var msg = "";
        if (ratingValue > 1) {
            msg = "Thanks! You rated this " + ratingValue + " stars.";
        }
        else {
            msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
        }
        toastr.info(msg);
        star = ratingValue;
    });

});

//Load need login page to view
function loadPage(url) {
    if(checkLoginDto()) {
        window.location.href = urlClient + url;
    }else {
        window.location.href = urlClient + "login";

    }
}
// get parameter form url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
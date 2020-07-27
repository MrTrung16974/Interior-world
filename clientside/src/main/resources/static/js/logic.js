// khai báo biến
var type = "";
var material = "";
var color = "";

var token = getCookie("token");
var checkLogin = false;
var keyword = "";
var sort = 1;
var star = "";
let temp = -1;
var currentPage = 0;
var listAllProduct = [];
var listTrendingProduct = [];
var singleProduct = null;

var userDto = {
    username: "",
    fullName: "",
    email: "",
    image: "",
    address: "",
    sex: "",
    phone: "",
    birthday: "",
    lstFavourite: [],
};

var cart = {
    id: "",
    image: "",
    buyer: "",
    listProduct: [],
    status: ""
};

var order = {
    id: "",
    image: "",
    buyer: "",
    shippingRates: "",
    totalPrice: "",
    flatRateShipping: "",
    totalProductOrder: "",
    listProduct: [],
    status: ""
};

// single commnet
var comment = {
    image: "",
    buyer: "",
    like: [],
    star: "",
    content: "",
    createAt: ""
};

// chậm trễ thời gian gọi hàm
const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), delay)
    }
}

// format data (DD/MM/YYYY)
const ChangeDateFormatAgain = date => {
    const [dd, mm, yy] = date.split(/\//g);
    return `${yy}-${mm}-${dd}`;
};
const changeDateFormatTo = date => {
    const [yy, mm, dd] = date.split(/-/g);
    return `${dd}/${mm}/${yy}`;
};
// formart price
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

var formatPirceToInt = (price) => {
    let end = price.indexOf(".")
    let srtPrice = price.slice(1, end);

    let endStr = srtPrice.indexOf(",")
    let oneSrtPrice = srtPrice.slice(0, endStr);
    let twoStrPrice = srtPrice.slice(endStr+1)
    let endStrPrice = oneSrtPrice.concat(twoStrPrice);

    return endStrPrice;
}
var shopHidePass = () => {
    $(".hide-eye-pass, .show-eye-pass").on('click', function () {
        var passwordId = $(this).parents('div:first').find('input').attr('id');
        if ($(this).hasClass('hide-eye-pass')) {
            $("#" + passwordId).attr("type", "text");
            $(this).parent().find(".hide-eye-pass").hide();
            $(this).parent().find(".show-eye-pass").show();
        } else {
            $("#" + passwordId).attr("type", "password");
            $(this).parent().find(".show-eye-pass").hide();
            $(this).parent().find(".hide-eye-pass").show();
        }
    });
}
shopHidePass();

var url      = window.location.href;
var origin   = window.location.origin;
var pathname = window.location.pathname;
// Returns path only (/path/example.html)

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
    switch (type) {
        case 0:
            category = "Cabinets";
            break;
        case 1:
            category = "Desk";
            break;
        case 2:
            category = "Decorate";
            break;
        case 3:
            category = "Belongings";
            break;
        case 4:
            category = "Sofa";
            break;
        case 5:
            category = "Lamp";
            break;
        default:
            category = ""
            break;
    }
    return category;
}
function findMaterial(matearial) {
    let fabric = null;
    switch (matearial) {
        case 0:
            fabric = "Wood";
            break;
        case 1:
            fabric = "Plastic";
            break;
        case 2:
            fabric = "Glass";
            break;
        case 3:
            fabric = "Titanium alloy";
            break;
        case 4:
            fabric = "Iron";
            break;
        default:
            fabric = "";
            break;
    }
    return fabric;
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
                                 onclick="getPriceProduct(${data.id} ,${data.price}, ${item[i].priceForColor})"
                                  name="color-price" id="${data.id}-${item[i].nameColor}">
                            </a>`;
        }
    }
    return colorWrite;
}

function getPriceProduct(id, price, priceColor) {
    let nameColor = $(this);
    if(price > 0) {
        $(`#${id}-price`).text(formatter.format(price + priceColor));
        $(`.${id}-price-sellers`).text(formatter.format(price + priceColor));
    }else {
        $(`#${id}-price`).text(formatter.format(0));
    }
}

function showChooseProductSellers(id) {
    $(`.${id}-sellers`).show();
}
function hideChooseProductSellers(id, price) {
    $(`.${id}-sellers`).hide();
    $(`.${id}-price-sellers`).text(formatter.format(`${price}`));
    $(`a.${id}-checked input[type="radio"]`).prop('checked', false);
}

function showChooseProduct(id) {
    $(`#${id}`).show();
}
function hideChooseProduct(id, price) {
    $(`#${id}`).hide();
    $(`#${id}-price`).text(formatter.format(`${price}`));
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
    if(token != null && token != "") {
        window.location.href = "http://localhost:8080/" + url;
    }else {
        window.location.href = "http://localhost:8080/login"

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

// logic cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie( name, path, domain ) {
    if( getCookie( name ) ) {
        document.cookie = name + "=" +
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}
// khai báo biến
var type = "";
var material = "";
var color = "";

var token = getCookie("token");
var checkLogin = false;
var keyword = "";
var sort = 1;
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
    phone: "",
    lstFavourite: [],
};

var cart = {
    id: "",
    image: "",
    buyer: "",
    listProduct: [],
    status: ""
};

// single commnet
var comment = {
    image: "",
    buyer: "",
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

// formart price
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

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
    let item = data.priceForColor;
    let length = item.length;
    for (let i=0; i < length; i++) {
        colorWrite += `<a>
                            <label for="${item[i].nameColor}" class="name-color">${item[i].nameColor}</label>
                            <input type="radio" value="${item[i].color}"
                             onclick="getPriceProduct(${data.price}, ${item[i].priceForColor})" name="color-price" id="${item[i].nameColor}">
                        </a>`;
    }
    return colorWrite;
}

function getPriceProduct(price, priceColor) {
    console.log("OK");
    let nameColor = $(this);
    if(price > 0) {
        $("#price-product").text(formatter.format(price + priceColor));
    }else {
        $("#price-product").text(formatter.format(0));
    }
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
let inputSearch = $("div#search_input_box");
$("#search-all-page").on('click', function () {
    let isopened =
        $('#search_input_box').css("display");
    if(isopened != "block" ) {
        inputSearch.show(500);
    }else {
        inputSearch.hide(500);
    }
});
$("#close_search").on('click', function () {
    inputSearch.hide(500);
});

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
//show vs hide pass user
$(document).ready(function() {
    $(".hide-eye-pass, .show-eye-pass").on('click', function() {
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
});
//Load need login page to view
function loadPage(url) {
    if(token != null && token != "") {
        window.location.href = "http://localhost:8080/" + url;
    }else {
        window.location.href = "http://localhost:8080/login"

    }
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
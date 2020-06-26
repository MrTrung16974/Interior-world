// khai báo biến
var type = "";
var material = "";
var color = "";

var token = getCookie("token");
var keyword = "";
var checkLogin = false;
var sort = 1;
var pageDefault = 0;
var userDto = {
    id: "",
    name: "",
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
var comment = {
    image: "",
    buyer: "",
    content: "",
    createAt: ""
};

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
        default :
            $("title.title-page").text("Aroma Shop");
            break;
    }
function findCategories(type) {
    let category = null;
    switch (type) {
        case 0:
            category = "Cabinets"
            break;
        case 1:
            category = "Desk"
            break;
        case 2:
            category = "Decorate"
            break;
        case 3:
            category = "Belongings"
            break;
        case 4:
            category = "Sofa"
            break;
        case 5:
            category = "Lamp"
            break;
        default:
            category = ""
            break;
    }
    return category;
}
function findMaterial(type) {
    let category = null;
    switch (type) {
        case 0:
            category = "Wood"
            break;
        case 1:
            category = "Plastic"
            break;
        case 2:
            category = "Glass"
            break;
        case 3:
            category = "Titanium alloy"
            break;
        case 4:
            category = "Iron"
            break;
        default:
            category = ""
            break;
    }
    return category;
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
function forPagination(totalPage) {
    $("#pagination").empty();
    $("#pagination").append(`<li><a href="#"><i class="fa fa-angle-left"></i></a></li>`);
    for(let i = 0; i < totalPage; i++) {
        if(i == pageDefault) {
            $("#pagination").append(`<li class="active"><a onclick='searchProduct(${i})'>${i+1}</a></li>`);
        }else {
            $("#pagination").append(`<li><a onclick='searchProduct(${i})'>${i+1}</a></li>`);
        }
    }
    $("#pagination").append(`<li><a href="#"><i class="fa fa-angle-right"></i></a></li>`);
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
        $("#price-number").text(price_number);
        $("#price-number-in-cart").text("$" + price_number);
    }

}

//logic user name
//Load need login page to view
function loadPageCast() {
    if(token != null && token != "") {
        window.location.href = "http://localhost:8080/cart"
    }else {
        window.location.href = "http://localhost:8080/login"

    }
}
function loadPageFavourite() {
    if(token != null && token != "") {
        window.location.href = "http://localhost:8080/favourite"
    }else {
        window.location.href = "http://localhost:8080/login"

    }
}
function loadPageCheckOut() {
    if (token != null && token != "") {
        window.location.href = "http://localhost:8080/checkout"
    } else {
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
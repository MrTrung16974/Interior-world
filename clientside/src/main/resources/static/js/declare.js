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
var lstMaterial  = [];
var lstCategory  = [];

var url      = window.location.href;
var origin   = window.location.origin;
var pathname = window.location.pathname;
// Returns path only (/path/example.html)

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
    if(endStr == "-1") {
        return srtPrice;
    }
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

//search product category vs material vs color
function searchAdvanced() {
    //Advanced search product
    $('#find-type input').on('change', function() {
        type = $('input[name=type]:checked', '#find-type').val();
        searchProduct(0);
    });

    $('#find-material input').on('change', function() {
        material = $('input[name=material]:checked', '#find-material').val();
        searchProduct(0);
    });

    $('#find-color input').on('change', function() {
        color = $('input[name=color]:checked', '#find-color').val();
        searchProduct(0);
    });
}


shopHidePass();
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
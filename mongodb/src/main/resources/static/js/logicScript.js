// var listProductCart = [];
var cart = {
    id: "",
    buyer: "",
    listProduct: [],
    status: ""
};

function getTotalProductInCast(cast) {
    let total = cart.listProduct.length;
    if(total <= 0) {
        $("#total-cast").text(0);
    }else {
        $("#total-cast").text(total);
    }
}

function getPriceProductInCast(cast) {
    let price_number = 0;
    if(cast.listProduct != null) {
        let length = cast.listProduct.length;
        for (let i = 0; i < length; i++) {
            price_number += cast.listProduct[i].price;
        }
        $("#price-number").text("$" + price_number);
    }

}


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
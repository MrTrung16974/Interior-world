// check user login not yet
var loadUserDto = () => {
    $.ajax({
        url: urlServer + "v1/api/getInfoUser",
        type: "GET",
        dataType: 'json',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        contentType: "application/json",
        success: function (response) {
            if (response.code == "00") {
                userDto = response.data;
                $('#login-user').css({"visibility": "hidden", "opacity": "0"});
                $('#logout-user').css({"visibility": "visible", "opacity": "1"});
                getProductInCast();
                rederUserInfo();
                rederDataFavourite(response.data.lstFavourite);
                rederDataFavouriteBoxUp(response.data.lstFavourite);
                if (response.data.lstFavourite != null) {
                    getTotalProductInFavourite(response.data.lstFavourite);
                }
                checkLogin = true;
            } else {
                checkLogin = false;
                toastr.warning('Find not data for user dto!');
            }
        },
        error: function (response) {
            checkLogin = false
            ;
            window.location.href = urlClient + "login"
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
var checkLoginDto = () => {
    shopLoading();
    $.ajax({
        url: urlServer + "v1/api/getInfoUser",
        type: "GET",
        dataType: 'json',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", token);
        },
        contentType: "application/json",
        success: function (response) {
            if (response.code == "00") {
                checkLogin = true;
            } else {
                checkLogin = false;
            }
            hideLoading();
        },
        error: function (response) {
            checkLogin = false;
            hideLoading();
        }
    });
    return checkLogin;
}

if(token != null && token != "") {
    loadUserDto();
} else {
    $('#login-user').css({"visibility": "visible", "opacity": "1"});
    $('#logout-user').css({"visibility": "hidden", "opacity": "0"});
}

//check the user already logged
// find product all
if(pathname == "/home" || pathname == "/") {
    /* ------- hero banner -------*/
    //Javascript
    $(document).ready(function(){
        $('#hero-slide').owlCarousel();
    });

    var owlBanner = $('#hero-slide');

    owlBanner.owlCarousel({
        items:1,
        margin: 10,
        autoplay:false,
        autoplayTimeout: 5000,
        loop:true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            }
        }
    });
    $.ajax({
        url: urlServer + "v1/api/slides",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            if(response.code == "00") {
                rederDataSlide(response.data);
            }else {
                toastr.warning('Find not data slide!');
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
    /* ------- hero banner -------*/

    /* ------- hero carousel -------*/
    //Javascript
    $(document).ready(function(){
        $('.hero-carousel').owlCarousel();
    });

    var owl = $('.hero-carousel');

    owl.owlCarousel({
        margin: 10,
        autoplay:false,
        autoplayTimeout: 5000,
        loop:true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items: 2
            },
            810:{
                items:3
            }
        }
    });
    $.ajax({
        url: urlServer + "v1/api/product/latest",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            if(response.code == "00") {
                rederDataLatest(response.data);
            }else {
                toastr.warning('Find not data latest!');
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
    /* ------- hero carousel -------*/

    /*------- Best Seller Carousel -------*/
    var owlCarousel = null;
    var owlBestSeller = null;
    var bestSellers = () => {
        //Javascript
        $(document).ready(function(){
            $('#bestSellerCarousel').owlCarousel();
        });
        owlCarousel = $('.owl-carousel');
        owlBestSeller = $('#bestSellerCarousel');
        if(owlCarousel.length > 0){
            owlBestSeller.owlCarousel({
                loop:true,
                margin:30,
                nav:true,
                navText: ["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"],
                dots: false,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items: 2
                    },
                    900:{
                        items:3
                    },
                    1130:{
                        items:4
                    }
                }
            })
        }
        $.ajax({
            url: urlServer + "v1/api/product/best-sellers",
            type: "GET",
            dataType: 'json',
            success: function(response) {
                if(response.code == "00") {
                    rederDataBestSellers(response.data);
                }else {
                    toastr.warning('Find not data best sellers!');
                }
            },
            error: function (response) {
                toastr.error('An error occurred . Please try again', response.message);
            }
        });
        /*------- Best Seller Carousel -------*/
    }
    bestSellers();
}
if(pathname == "/shop") {
    $.ajax({
        url: urlServer + "v1/api/product/search?name=" + keyword + "&page="+currentPage+"&perPage=12",
        type: "GET",
        success: function (response) {
            if(response.code == "00") {
                listAllProduct = response.data.content;
                rederDataAllProduct(response.data.content);
                let totalPage = response.data.totalPages;
                forPagination(totalPage, 0);
            }else {
                toastr.warning('Find not data for search!');
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
if(pathname == "/checkout") {
    $.ajax({
        url: urlServer + "v1/api/order/did-checkout-products/"+ userDto.username,
        type: "GET",
        success: function (response) {
            if(response.code == "00") {
                order = response.data;
                if(typeof order.listProduct != "undefined"
                    && order.listProduct != null
                    && order.listProduct.length != null
                    && order.listProduct.length > 0) {
                    rederDataCheckout();
                    rederInfoUserDataCheckout();
                }
            }else {
                toastr.warning("Please place a new order! You have no orders yet.");
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
if(pathname == "/tracking-order") {
    searchOrder();
}

$.ajax({
    url: urlServer + "v1/api/product/trending",
    type: "GET",
    success: function (response) {
        if (response.code == "00") {
            listTrendingProduct = response.data;
            if(pathname == "/home") {
                rederDataTrending(response.data);
            }
            if(pathname == "/shop") {
                rederDataTop(response.data);
            }
        } else {
            toastr.warning('Find not data for trending!');
        }
    },
    error: function (response) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});
function catetoryProduct(type) {
    $.ajax({
        url: urlServer + "v1/api/product/catetory/" + type,
        type: "GET",
        success: function (response) {
            if (response.code == "00") {
                listTrendingProduct = response.data;
                rederDataCatetory(response.data);
            } else {
                toastr.warning('Find not data for catetory!');
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}

//code gà nền phải viết 2 function giống nhau(cái này là cho keyUp)
function loginUser(e) {
    if(e.keyCode === 13) {
        loginCickUser();
    }
}
//code gà nền phải viết 2 function giống nhau(cái này là cho cick)
function loginCickUser() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();
    if(username == null || username == "") {
        toastr.warning('You have not entered a username ');
        return;
    }
    if(password == null || password == "") {
        toastr.warning('You have not entered a password ');
        return;
    }
    shopLoading();
    $.ajax({
        type: "POST",
        url: urlServer + "v1/api/login?username=" + username + "&password=" + password,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if (response.code == "00") {
                if (response.data != null) {
                    setCookie("token", response.data);
                    checkLogin = true;
                    toastr.success('Logic success!', response.message);
                }
                if (checkLogin) {
                    window.location.href = urlClient + "home"
                }
                hideLoading();
            } else {
                hideLoading();
                window.location.href = urlClient + "login?error=true"
                toastr.error('An error occurred! ', response.data);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}

//code gà nền phải viết 2 function giống nhau(cái này là cho keyUp)
function registerUser(e) {
    if(e.keyCode === 13) {
        registerClickUser();
    }
}

//code gà nền phải viết 2 function giống nhau(cái này là cho cick)
function registerClickUser() {
    let name = $("#regiter-name").val().trim();
    let email = $("#regiter-email").val().trim();
    let username = $("#regiter-username").val().trim();
    let password = $("#regiter-passwprd").val().trim();
    let confirmPassword = $("#confirm-regiter-password").val().trim();
    if(name == null || name == "") {
        toastr.warning('You have not entered a name ');
        return;
    }
    if(username == null || username == "") {
        toastr.warning('You have not entered a username ');
        return;
    }
    if(password == null || password == "") {
        toastr.warning('You have not entered a password ');
        return;
    }
    if(confirmPassword == null || confirmPassword == "") {
        toastr.warning('You have not entered a name ');
        return;
    }
    if(password != confirmPassword) {
        toastr.warning('Password and confirm password must be the same ');
        return;
    }
    if(!validatePassword(password)) {
        toastr.warning('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
    if(!validateEmail(email)) {
        toastr.warning('You have not entered a email ');
        return;
    }
    shopLoading();
    $.ajax({
        type: "POST",
        url: urlServer + "v1/api/register?username="+username+"&password="+
            password+"&name="+ name + "&email=" + email,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                if(response.data != null) {
                    setCookie("token", response.data);
                    checkLogin = true;
                    toastr.success('Register success!', response.message);
                }
                if(checkLogin) {
                    window.location.href = urlClient + "home";
                }
                hideLoading();
            }else {
                toastr.warning('Find not data for register');
                hideLoading();
            }
            if(response.code == "300") {
                toastr.success('Account exit success!', response.message);
                hideLoading();
            }
        },
        error: function () {
            toastr.error('An error occurred . Please try again', response.message);
            hideLoading();
        }
    });
}

function logoutUser() {
    let confirmlogout = confirm("Are you sure you want to logout?");
    if(confirmlogout == false) {
        return;
    }
    shopLoading();
    $.ajax({
        type: "POST",
        url: urlServer + "v1/api/logout",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                deleteCookie("token");
                checkLogin = false;
                toastr.success('Logout success!', response.message);
                if(!checkLogin) {
                    window.location.href = urlClient + "login"
                }else {
                    toastr.success('Logout error!', response.message);
                }
                hideLoading();
            }else {
                hideLoading();
                toastr.success('Logout server error !', response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}

function changePassword(e) {
    if(e.keyCode === 13) {
        changeClickPassword();
    }
}
function changeClickPassword() {
    let currentPassword = $("#current-password").val().trim();
    let newPassword = $("#new-password").val().trim();
    let confirmPassword = $("#confirm-password").val().trim();
    if(userDto.username == null || userDto.username == "") {
        toastr.warning('You have not entered a username ');
        return;
    }
    if(currentPassword == null || currentPassword == "") {
        toastr.warning('You have not entered a password ');
        return;
    }
    if(newPassword == null || newPassword == "") {
        toastr.warning('You have not entered a password ');
        return;
    }
    if(confirmPassword == null || confirmPassword == "") {
        toastr.warning('You have not entered a name ');
        return;
    }
    if(newPassword != confirmPassword) {
        toastr.warning('Password and confirm password must be the same ');
        return;
    }
    if(!validatePassword(currentPassword) ||
        !validatePassword(newPassword) ||
        !validatePassword(confirmPassword)) {
        toastr.warning('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
    shopLoading();
    $.ajax({
        type: "PUT",
        url: urlServer + "v1/api/change-password?username="+ userDto.username
            +"&current-password="+ currentPassword + "&new-password=" + newPassword +
            "&confirm-password=" + confirmPassword,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                if(response.data != null) {
                    setCookie("token", response.data);
                    toastr.success('Change Password success!', response.message);
                    rederChangePassword();
                }
            }else {
                toastr.warning("Find not data change password!");
            }
            hideLoading();
        },
        error: function () {
            toastr.error('An error occurred . Please try again', response.message);
            hideLoading();
        }
    });
}

function updateUser() {
    let image = $("#img-youface").attr('src');
    let fullName = $("#full-name-user").val();
    let email = $("#email-user").val();
    let phone = $("#phone-user").val();
    let sex = $('input[name="sex"]:checked').val();
    let birthday = $("#birthday-user").val();
    if(image == null || image == "") {
        toastr.warning('You have not entered a image');
        return;
    }
    if(fullName == null || fullName == "") {
        toastr.warning('You have not entered a fullName');
        return;
    }
    if(phone == null || phone == "") {
        toastr.warning('You have not entered a phone');
        return;
    }
    if(sex == null || sex == "") {
        toastr.warning('You have not entered a sex');
        return;
    }
    if(birthday == null || birthday == "") {
        toastr.warning('You have not entered a birthday');
        return;
    }
    if(!validateEmail(email)) {
        toastr.warning('You have not entered a email');
        return;
    }
    shopLoading();
    let UserDto = {
        image: image,
        fullName: fullName,
        email: email,
        birthday: changeDateFormatTo(birthday),
        phone: phone,
        sex: sex
    };
    $.ajax({
        url: urlServer + "v1/api/user/" + userDto.username,
        type: "PUT",
        data: JSON.stringify(UserDto),
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                userDto = response.data;
                toastr.success('Edit user success!', response.message);
                rederUserInfo();
                hideLoading();
            }else {
                hideLoading();
                toastr.success('Logout server error !', response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again');
        }
    });
}
function updateUserAddress() {
    let address = $("#user-address").val();
    if(address == null || address == "") {
        toastr.warning('You have not entered a address ');
        return;
    }
    shopLoading();
    let UserDto = {
        address: address
    };
    $.ajax({
        type: "PUT",
        url: urlServer + "v1/api/user/" + userDto.username,
        data: JSON.stringify(UserDto),
        contentType: "application/json",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                userDto = response.data;
                rederUsesAddress();
                toastr.success('Edit user success!', response.message);
                hideLoading();
            }else {
                hideLoading();
                toastr.success('Logout server error !', response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}

// product

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

//Quick search product Advanced
var debounceSearchProduct = debounce(function (page) {
    searchProduct(page);
}, 500);

function searchProduct(page) {
    shopLoading();
    currentPage = page;
    keyword = $('#keysearch').val().trim().toLocaleLowerCase();
    if (keyword == null) {
        keyword = '';
    }
    $.ajax({
        type: "GET",
        url: urlServer + "v1/api/product/search?name=" +
            keyword + "&page=" + currentPage + "&perPage=12&sort=" + sort
            + "&type=" + type + "&material=" + material + "&color=" + color,
        processData: false,
        contentType: 'application/json',
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if (response.code == "00") {
                rederDataAllProduct(response.data.content);
                listAllProduct = response.data.content;
                let totalPage = response.data.totalPages;
                forPagination(totalPage, page);
            } else {
                rederDataAllProduct(response.data);
                forPagination(1, 0);
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function sortProduct() {
    shopLoading();
    let getSort = $("#sortBydate").val();
    if(getSort != null && getSort != "") {
        sort = getSort;
    }
    $.ajax({
        type: "GET",
        url: urlServer + "v1/api/product/search?name=" +
            keyword + "&page=" + currentPage + "&perPage=12&sort=" + sort
            + "&type=" + type + "&material=" + material + "&color=" + color,
        processData: false,
        contentType: 'application/json',
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                rederDataAllProduct(response.data.content);
                let totalPage = response.data.totalPages;
                forPagination(totalPage, 0);
            }
            else {
                rederDataAllProduct(response.data);
                forPagination(1, 0);
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function addFavouriteUser(idProduct) {
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    $.ajax({
        url: urlServer + "v1/api/user/favourite/?userName="+
            cart.buyer + "&idProduct=" + idProduct,
        type: "PUT",
        success: function (response) {
            if (response.data != null) {
                if (response.code == "200") {
                    toastr.success('add favourite user Success!', "HAHA");
                }
                if (response.code == "00") {
                    toastr.success('remove favourite user Success!', "HAHA");
                }
                loadUserDto();
                rederDataAllProduct(listAllProduct);
                if(pathname = "/home") {
                    rederDataTrending(listTrendingProduct);
                }
                if(pathname = "/product-details") {
                    rederDataSingleProduct(singleProduct);
                }
                hideLoading();
            }
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

// cart product
function getProductInCast() {
    $.ajax({
        url: urlServer + "v1/api/order/" + userDto.username,
        type: "GET",
        success: function (response) {
            if(response.code = '00') {
                cart = response.data;
                rederDataCast(cart.listProduct);
                rederDataCastBoxUp(cart.listProduct);
                if(cart.listProduct != null) {
                    if(cart.listProduct[0] != null) {
                        getPriceProductInCast(cart);
                        getTotalProductInCast(cart);
                    }
                }
            }else {
                toastr.warning('Find not data for cart!');
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

// function addToCastDetailDB(idProduct, oldNumber) {
//     let updateCastRequest = [];
//     if(!checkLoginDto()) {
//         shopLoading();
//         let newNumber = $("#qty").val().trim();
//         if(newNumber > 0) {
//             newNumber -= oldNumber;
//             if(newNumber < oldNumber) {
//                 updateCastRequest = {
//                     name: userDto.username,
//                     listProductCast: [{
//                         id: idProduct,
//                         number: newNumber,
//                         type: 1
//                     }]
//                 };
//             }else {
//                 updateCastRequest = {
//                     name: userDto.username,
//                     listProductCast: [{
//                         id: idProduct,
//                         number: newNumber,
//                         type: 2
//                     }]
//                 };
//             }
//             $.ajax({
//                 url: urlServer + "v1/api/order/update/" + cart.buyer,
//                 type: "POST",
//                 data: JSON.stringify(updateCastRequest),
//                 contentType: "application/json",
//                 success: function (response) {
//                     if (response.code = "00") {
//                         cart = response.data;
//                         if (cart.listProduct != null) {
//                             getTotalProductInCast(cart);
//                             rederDataCast(cart.listProduct);
//                             rederDataCastBoxUp(cart.listProduct);
//                             if (cart.listProduct[0] != null) {
//                                 getPriceProductInCast(cart);
//                                 toastr.success('Add product success!', "HAHA");
//                             }
//                         }
//                     }
//                     hideLoading();
//                 },
//                 error: function (error) {
//                     toastr.error('An error occurred . Please try again', error.message);
//                         hideLoading();
//                 }
//             });
//         }else {
//             toastr.error('Bạn nhập nhâp số vào nếu ko thì chết đó làm khó nhau vcl! Mịa!',  "HAHA");
//         }
//     }else {
//         toastr.error('You need login!',  "HAHA");
//     }
// }

function addToCastDB(idProduct, type) {
    let nameColor = $('input[name="color-price"]:checked').val();
    let priceForColor = 0;
    if(type == 1) {
        priceForColor = $(`#${idProduct}-price`).text();
    }
    if(type == 2) {
        priceForColor = $(`.${idProduct}-price-sellers`).text();
    }
    if(nameColor == null || nameColor == undefined
        || priceForColor == null || priceForColor == undefined) {
        toastr.warning('You need choose color for product!');
        return;
    }
    shopLoading();

    let price = parseFloat(formatPirceToInt(priceForColor));
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let updateCastRequest = {
        name: userDto.username,
        listProductCast: [{
            id: idProduct,
            number: 1,
            type: 1,
            nameColor: nameColor,
            price: price
        }]
    };
    $.ajax({
        url: urlServer + "v1/api/order/update/" + cart.buyer,
        type: "POST",
        data: JSON.stringify(updateCastRequest),
        contentType: "application/json",
        success: function (response) {
            if (response.code = "00") {
                cart = response.data;
                if (cart.listProduct != null) {
                    getTotalProductInCast(cart);
                    rederDataCast(cart.listProduct);
                    rederDataCastBoxUp(cart.listProduct);
                    if (cart.listProduct[0] != null) {
                        getPriceProductInCast(cart);
                        toastr.success('Add product success!', "HAHA");
                    }
                }
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function deleteItem(idProduct, nameColor) {
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let updateCastRequest = {
        name: userDto.username,
        listProductCast: [{
            id: idProduct,
            number: 1,
            type: 3,
            nameColor: nameColor
        }]
    };
    $.ajax({
        url: urlServer + "v1/api/order/update/" + cart.buyer,
        type: "POST",
        data: JSON.stringify(updateCastRequest),
        contentType: "application/json",
        success: function (response) {
            if (response.code = "00") {
                cart = response.data;
                if (cart.listProduct != null) {
                    getTotalProductInCast(cart);
                    rederDataCast(cart.listProduct);
                    rederDataCastBoxUp(cart.listProduct);
                    if (cart.listProduct[0] != null) {
                        getPriceProductInCast(cart);
                        toastr.success('Delete product success!', "HAHA");
                }
            }
            hideLoading();
            }
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}
function addItem(idProduct, nameColor) {
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let updateCastRequest = {
        name:  userDto.username,
        listProductCast: [{
            id: idProduct,
            number: 1,
            type: 1,
            nameColor: nameColor
        }]
    };
    $.ajax({
        url: urlServer + "v1/api/order/update/" + cart.buyer,
        type: "POST",
        data: JSON.stringify(updateCastRequest),
        contentType: "application/json",
        success: function (response) {
            if (response.code = "00") {
                cart = response.data;
                if(checkLogin) {
                    if(cart.listProduct != null) {
                        getTotalProductInCast(cart);
                        rederDataCast(cart.listProduct);
                        rederDataCastBoxUp(cart.listProduct);
                        if(cart.listProduct[0] != null) {
                            getPriceProductInCast(cart);
                            toastr.success('Add product success!', "HAHA");
                        }
                    }
                }else {
                    toastr.warning('You need login!');
                }
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function removeItem(idProduct, nameColor) {
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let updateCastRequest = {
        name: userDto.username,
        listProductCast: [{
            id: idProduct,
            number: 1,
            type: 2,
            nameColor: nameColor
        }]
    };
    $.ajax({
        url: urlServer + "v1/api/order/update/" + cart.buyer,
        type: "POST",
        data: JSON.stringify(updateCastRequest),
        contentType: "application/json",
        success: function (response) {
            if (response.code = "00") {
                cart = response.data;
                if (checkLogin) {
                    if (cart.listProduct != null) {
                        getTotalProductInCast(cart);
                        rederDataCast(cart.listProduct);
                        rederDataCastBoxUp(cart.listProduct);
                        if (cart.listProduct[0] != null) {
                            getPriceProductInCast(cart);
                            toastr.success('Delete product success!', "HAHA")
                        }
                    }
                } else {
                    toastr.warning('You need login!');
                }
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function searchEnterOrder(e) {
    if(e.keyCode === 13) {
        searchOrder();
    }
}

function searchOrder() {
    let idOrder = $('#order').val().trim();
    let email = $('#email').val().trim();
    if(idOrder == null || idOrder == undefined) {
        idOrder = "";

    }
    if(email == null || email == undefined) {
        email = "";
    }
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        return;
    }
    shopLoading();
    $.ajax({
        url: urlServer + "v1/api/order/search?idUser=" + userDto.username
            + "&idOrder=" + idOrder + "&email=" + email,
        type: "GET",
        success: function (response) {
            if(response.code = '00') {
                rederDataAllOrder(response.data);
            }else {
                toastr.warning('Find not data for order!');
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function checkout() {
    let shippingRates = $('input[name="shipping-rete"]:checked').val();
    if(typeof cart.listProduct == "undefined"
    || cart.listProduct == null
    || cart.listProduct.length == null
    || cart.listProduct .length < 0) {
        toastr.warning('You do not have products to checkout! Please select a product');
        return;
    }
    if(order.listProduct .length < 0) {
        toastr.warning('You need to contact us to pay for old orders! To be able to continue ordering!');
        return;
    }
    if(shippingRates == "" || shippingRates == null) {
        toastr.warning('You need to choose shipping rate');
        return;
    }
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    $.ajax({
        url: urlServer + "v1/api/order/checkout-products?idUser=" + userDto.username + "&shippingRates=" + shippingRates,
        type: "PUT",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                order = response.data;
                toastr.success('Checkout success!', response.message);
                if(typeof order.listProduct != "undefined"
                    && order.listProduct != null
                    && order.listProduct.length != null
                    && order.listProduct.length > 0) {
                    window.location.href = urlClient + "checkout"
                }else {
                    toastr.success('Checkout error!', response.message);
                }
            }else {
                toastr.success('Checkout server error !', response.message);
            }
            hideLoading();
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again');
        }
    });
}

function payContactus() {
    let phone = $("input#phone").val().trim();
    let email = $('input#email').val().trim();
    let fullName = $('input#fullName').val().trim();
    let billingAddress = $('input#billing-address').val().trim();
    let shippingAddress = $('input#shipping-address').val().trim();
    let noteSeller = $('textarea#message').val().trim();
    let paymentType = $('input[name="payment"]:checked').val();

    if(typeof order.listProduct == "undefined"
        || order.listProduct == null
        || order.listProduct.length == null
        || order.listProduct .length < 0) {
        toastr.warning('You do not have products to checkout! Please select a product');
        return;
    }
    if(order.listProduct .length < 0) {
        toastr.warning('You need to contact us to pay for old orders! To be able to continue ordering!');
        return;
    }
    if(phone == "" || phone == null) {
        toastr.warning('Phone field must not be blank');
        return;
    }
    if(email == "" || email == null) {
        toastr.warning('Email field must not be blank');
        return;
    }
    if(fullName == "" || fullName == null) {
        toastr.warning('Full Name field must not be blank');
        return;
    }
    if(shippingAddress == "" || shippingAddress == null) {
        toastr.warning('Shipping Address field must not be blank');
        return;
    }
    if(billingAddress == "" || billingAddress == null) {
        toastr.warning('Billing Address field must not be blank');
        return;
    }
    if(paymentType == "" || paymentType == null) {
        toastr.warning('You need to choose payment type');
        return;
    }
    if(!$('input[name="accept-terms"]').is(":checked")) {
        toastr.warning('You need to accept the terms!');
        return;
    }

    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    $.ajax({
        url: urlServer + "v1/api/order/contactus-products?userName=" + userDto.username +
            "&phone=" + phone + "&email=" + email +
            "&fullName=" + fullName + "&billingAddress=" + billingAddress + "&shippingAddress=" + shippingAddress
            + "&paymentType=" + paymentType + "&noteSeller=" + noteSeller,
        type: "PUT",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                order = response.data;
                toastr.success('Payment success!', response.message);
                if(typeof order.listProduct != "undefined"
                    && order.listProduct != null
                    && order.listProduct.length != null
                    && order.listProduct.length > 0) {
                    orderConfirmation = response.data;
                    console.log(orderConfirmation);
                    window.location.href = urlClient + "confirmation?id=" + response.data.id;
                }else {
                    toastr.success('Payment error!', response.message);
                }
            }else {
                toastr.success('Payment server error !', response.message);
            }
            hideLoading();
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again');
        }
    });
}

// comment
function addComment(idProduct) {
    let contentComment = $("textarea#coment-content").val().trim();
    if(typeof star == "undefined"
        || star == null
        || star == "") {
        toastr.warning('You need to rate the product!');
        return;
    }
    if (contentComment == null || contentComment == ""){
        toastr.warning('You need import content!');
        return;
    }
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let comment = {
        image: userDto.image,
        buyer: userDto.username,
        comtent: contentComment,
        star: parseInt(star)
    };
    $.ajax({
        url: urlServer + "v1/api/comment/" + idProduct,
        type: "POST",
        data: JSON.stringify(comment),
        contentType: "application/json",
        success: function (response) {
            if (response.code = "00") {
                if (response.data != null) {
                    comment = response.data.comment;
                    rederComentProduct(comment);
                    $("#single-star-product").html(forStar(response.data.star));
                    $("#coment-content").val("");
                    toastr.success('Comment product success!', "HAHA");
                }
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}
function likeCommet(idCommet) {
    var idProduct = getParameterByName('id');
    if(idProduct == null || idProduct == "") {
        toastr.warning('An error occurred . Please try again!');
        return;
    }
    if(idCommet == null || idCommet == "") {
        toastr.warning('An error occurred . Please try again!');
        return;
    }
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    $.ajax({
        url: urlServer + "v1/api/like-comment?idProduct=" + idProduct
            + "&idUser=" + userDto.username + "&idCommet=" + idCommet,
        type: "PUT",
        success: function (response) {
            if (response.data != null) {
                if (response.code == "200") {
                    toastr.success('Like product success!!', "HAHA");
                }
                if (response.code == "00") {
                    toastr.success('Uplike product success!!', "HAHA");
                }
                comment = response.data.comment;
                rederComentProduct(comment);
            }else {
                toastr.success('Null data', "HAHA")
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

function contacEnterUs (e) {
    if(e.keyCode === 13) {
        contactUs();
    }
}
function contactUs() {
    var name = $("input#name").val().trim();
    var email = $("input#email").val().trim();
    var subject = $("input#subject").val().trim();
    var message = $("textarea#message").val().trim();
    if(name == null || name == "") {
        toastr.warning('You cannot leave the name blank!');
        return;
    }
    if(subject == null || subject == "") {
        toastr.warning('You cannot leave the subject blank!');
        return;
    }
    if(email == null || email == "") {
        toastr.warning('You cannot leave the email blank!');
        return;
    }
    if(message == null || message == "") {
        toastr.warning('You cannot leave the message blank!');
        return;
    }
    shopLoading();
    if(!checkLoginDto()) {
        toastr.warning('You need login!');
        hideLoading();
        return;
    }
    let datajson = {"userName": userDto.username, "name": name,
        "email": email, "subject" : subject, "message": message};

    $.ajax({
        url: urlServer + "v1/api/user/contact-us",
        type: "POST",
        data: datajson,
        success: function (response) {
            if (response.code == "00") {
                toastr.success('Send message success!', response.data);
            }else {
                toastr.success('Send mesage error!', response.message);
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading();
        }
    });
}

// upload file image
let imageFace = $("input.image-face");
let newFace = $("img.face-user");
for (var i = 0; i < imageFace.length; i++) {
    let imageProduct = imageFace[i];
    let newFaceImage = newFace[i];
    imageProduct.addEventListener('change', function () {
        var formData = new FormData();
        formData.append('file', imageProduct.files[0]);
        $.ajax({
            url: urlServer + 'v1/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                newFaceImage.src = data;
                toastr.success('Upload image success! ', 'Haha!');
            },
            error: function () {
                toastr.error('An error occurred . Please try again', 'Inconceivable!');
            }
        });
    });
}

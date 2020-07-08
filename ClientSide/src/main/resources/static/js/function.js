// check user login not yet
var loadUserDto = () => {
    $.ajax({
        url: "http://localhost:8099/v1/api/getInfoUser",
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
                console.log(response.data);
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
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (response) {
            checkLogin = false
            ;
            window.location.href = "http://localhost:8080/login"
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
if(token != null && token != "") {
    loadUserDto();
} else {
    $('#login-user').css({"visibility": "visible", "opacity": "1"});
    $('#logout-user').css({"visibility": "hidden", "opacity": "0"});
}

// Load banner for page
$.ajax({
    url: "http://localhost:8099/v1/api/banners",
    type: "GET",
    success: function (response) {
        if(response.code == "00") {
            response.data.forEach(item => {
                if(item.id == pathname) {
                    rederBanner(item);
                }
            });
        }else {
            toastr.error('Find not data!', response.message);
        }
    },
    error: function (response) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});


//check the user already logged
// find product all
if(pathname == "/home") {
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
        url: "http://localhost:8099/v1/api/product/latest",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            if(response.code == "00") {
                rederDataLatest(response.data);
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
    /* ------- hero carousel -------*/

    /*------- Best Seller Carousel -------*/
    //Javascript
    $(document).ready(function(){
        $('#bestSellerCarousel').owlCarousel();
    });

    var owlCarousel = $('.owl-carousel');
    var owlBestSeller = $('#bestSellerCarousel');

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
        url: "http://localhost:8099/v1/api/product/best-sellers",
        type: "GET",
        dataType: 'json',
        success: function(response) {
            if(response.code == "00") {
                rederDataBestSellers(response.data);
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
    /*------- Best Seller Carousel -------*/
}
if(pathname == "/shop") {
    $.ajax({
        url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+currentPage+"&perPage=12",
        type: "GET",
        success: function (response) {
            if(response.code == "00") {
                listAllProduct = response.data.content;
                rederData(response.data.content);
                let totalPage = response.data.totalPages;
                forPagination(totalPage, 0);
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
if(pathname == "/checkout") {
    $.ajax({
        url: "http://localhost:8099/order/did-checkout-products/"+ userDto.username,
        type: "GET",
        success: function (response) {
            if(response.code == "00") {
                order = response.data;
                if(typeof order.listProduct != "undefined"
                    && order.listProduct != null
                    && order.listProduct.length != null
                    && order.listProduct.length > 0) {
                    rederDataCheckout();
                }
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (response) {
            toastr.error('An error occurred . Please try again', response.message);
        }
    });
}
$.ajax({
    url: "http://localhost:8099/v1/api/product/trending",
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
            toastr.error('Find not data!', response.message);
        }
    },
    error: function (response) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});
function catetoryProduct(type) {
    $.ajax({
        url: "http://localhost:8099/v1/api/product/catetory/" + type,
        type: "GET",
        success: function (response) {
            if (response.code == "00") {
                listTrendingProduct = response.data;
                rederDataCatetory(response.data);
            } else {
                toastr.error('Find not data!', response.message);
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
        toastr.error('You have not entered a username ');
        return;
    }
    if(password == null || password == "") {
        toastr.error('You have not entered a password ');
        return;
    }
    shopLoading();
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/login?username=" + username + "&password=" + password,
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
                    window.location.href = "http://localhost:8080/home"
                }
                hideLoading();
            } else {
                hideLoading();
                window.location.href = "http://localhost:8080/login?error=true"
                console.log(response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
            console.log(response.message);
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
        toastr.error('You have not entered a name ');
        return;
    }
    if(username == null || username == "") {
        toastr.error('You have not entered a username ');
        return;
    }
    if(password == null || password == "") {
        toastr.error('You have not entered a password ');
        return;
    }
    if(confirmPassword == null || confirmPassword == "") {
        toastr.error('You have not entered a name ');
        return;
    }
    if(password != confirmPassword) {
        toastr.error('Password and confirm password must be the same ');
        return;
    }
    if(!validatePassword(password)) {
        toastr.error('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
    if(!validateEmail(email)) {
        toastr.error('You have not entered a email ');
        return;
    }
    shopLoading();
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/register?username="+username+"&password="+
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
                if(token != "" || token != null) {
                    window.location.href = "http://localhost:8080/home";
                }
                hideLoading();
            }else {
                toastr.error('Null Data', response.message);
                console.log(response.message);
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
            console.log(response.message);
        }
    });
}

function logoutUser() {
    shopLoading();
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/logout",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                deleteCookie("token");
                checkLogin = false;
                toastr.success('Logout success!', response.message);
                if(token != "" && token != null) {
                    window.location.href = "http://localhost:8080/login"
                }else {
                    toastr.success('Logout error!', response.message);
                }
                hideLoading();
            }else {
                hideLoading();
                toastr.success('Logout server error !', response.message);
                console.log(response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
            console.log(response.message);
        }
    });
}

function changePassword() {
    let currentPassword = $("#current-password").val().trim();
    let newPassword = $("#new-password").val().trim();
    let confirmPassword = $("#confirm-password").val().trim();
    if(username == null || username == "") {
        toastr.error('You have not entered a username ');
        return;
    }
    if(currentPassword == null || currentPassword == "") {
        toastr.error('You have not entered a password ');
        return;
    }
    if(newPassword == null || newPassword == "") {
        toastr.error('You have not entered a password ');
        return;
    }
    if(confirmPassword == null || confirmPassword == "") {
        toastr.error('You have not entered a name ');
        return;
    }
    if(password != confirmPassword) {
        toastr.error('Password and confirm password must be the same ');
        return;
    }
    if(!validatePassword(currentPassword) ||
        !validatePassword(newPassword) ||
        !validatePassword(confirmPassword)) {
        toastr.error('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
    shopLoading();
    $.ajax({
        type: "PUT",
        url: "http://localhost:8099/v1/api/change-password?username="+ userDto.username
            +"&current-password="+ currentPassword + "&new-password=" + newPassword +
            "&confirm-password=" + confirmPassword,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                if(response.data != null) {
                    setCookie("token", response.data);
                    checkLogin = true;
                    toastr.success('Change Password success!', response.message);
                    rederChangePassword();
                }
            }else {
                toastr.error('Null Data', response.message);
                console.log(response.message);
            }
            hideLoading();
        },
        error: function () {
            toastr.error('An error occurred . Please try again', response.message);
            hideLoading();
            console.log(response.message);
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
        toastr.error('You have not entered a image');
        return;
    }
    if(fullName == null || fullName == "") {
        toastr.error('You have not entered a fullName');
        return;
    }
    if(phone == null || phone == "") {
        toastr.error('You have not entered a phone');
        return;
    }
    if(sex == null || sex == "") {
        toastr.error('You have not entered a sex');
        return;
    }
    if(birthday == null || birthday == "") {
        toastr.error('You have not entered a birthday');
        return;
    }
    if(!validateEmail(email)) {
        toastr.error('You have not entered a email');
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
        url: "http://localhost:8099/v1/api/user/" + userDto.username,
        type: "PUT",
        data: JSON.stringify(UserDto),
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                userDto = response.data;
                console.log(userDto);
                toastr.success('Edit user success!', response.message);
                rederUserInfo();
                hideLoading();
            }else {
                hideLoading();
                toastr.success('Logout server error !', response.message);
                console.log(response.message);
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
        toastr.error('You have not entered a address ');
        return;
    }
    shopLoading();
    let UserDto = {
        address: address
    };
    $.ajax({
        type: "PUT",
        url: "http://localhost:8099/v1/api/user/" + userDto.username,
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
                console.log(response.message);
            }
        },
        error: function () {
            hideLoading();
            toastr.error('An error occurred . Please try again', response.message);
            console.log(response.message);
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
        url: "http://localhost:8099/v1/api/product/search?name=" +
            keyword + "&page=" + currentPage + "&perPage=12&sort=" + sort
            + "&type=" + type + "&material=" + material + "&color=" + color,
        processData: false,
        contentType: 'application/json',
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if (response.code == "00") {
                rederData(response.data.content);
                listAllProduct = response.data.content;
                let totalPage = response.data.totalPages;
                forPagination(totalPage, page);
            } else {
                rederData(response.data);
                forPagination(1, 0);
                console.log(response.message);
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
        url: "http://localhost:8099/v1/api/product/search?name=" +
            keyword + "&page=" + currentPage + "&perPage=12&sort=" + sort
            + "&type=" + type + "&material=" + material + "&color=" + color,
        processData: false,
        contentType: 'application/json',
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                rederData(response.data.content);
                let totalPage = response.data.totalPages;
                forPagination(totalPage, 0);
            }
            else {
                rederData(response.data);
                forPagination(1, 0);
                console.log(response.message);
            }
            hideLoading()
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading()
        }
    });
}

function addFavouriteUser(idProduct) {
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    shopLoading();
    $.ajax({
        url: "http://localhost:8099/v1/api/user/favourite/?userName="+
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
                rederData(listAllProduct);
                rederDataTrending(listTrendingProduct);
                if(pathname = "/product-detforImageails") {
                    rederDataSingleProduct(singleProduct);
                }
            }
            hideLoading()
        },
        error: function (error) {
            toastr.error('An error occurred . Please try again', error.message);
            hideLoading()
        }
    });
}

// cart product
function getProductInCast() {
    $.ajax({
        url: "http://localhost:8099/order/products/" + userDto.username,
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
                toastr.error('Hehe', response.message);
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
//     if(checkLogin != "") {
//         shopLoading();
//         let newNumber = $("#qty").val().trim();
//         if(newNumber > 0) {
//             newNumber -= oldNumber;
//             console.log(newNumber);
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
//                 url: "http://localhost:8099/order/update/" + cart.buyer,
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

function addToCastDB(idProduct) {
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    let nameColor = $('input[name="color-price"]:checked').val();
    let priceForColor = $('h2#price-product').text();
    console.log(nameColor);
    if(nameColor != null && nameColor != undefined
        && priceForColor != null && priceForColor != undefined) {
        shopLoading();
        let price = parseInt(priceForColor.match(/(\d+)/));
        console.log(price);
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
            url: "http://localhost:8099/order/update/" + cart.buyer,
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
    }else {
        toastr.error('You need choose color for product!', "HAHA");
        hideLoading();
    }
}

// add default product color frist (colorForPrice[0])
function addToCastDefaultDB(idProduct, nameColor, priceColor, price) {
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    if(nameColor != null && nameColor != undefined
        && priceColor != null && priceColor != undefined
        && price != null && price != undefined) {
        let addPriceColor = parseInt(price) + parseInt(priceColor);
        shopLoading();
        let updateCastRequest = {
            name: userDto.username,
            listProductCast: [{
                id: idProduct,
                number: 1,
                type: 1,
                nameColor: nameColor,
                price: addPriceColor
            }]
        };
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.buyer,
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
    }else {
        toastr.error('An error occurred . Please try again');
        hideLoading();
    }
}

function deleteItem(idProduct, nameColor) {
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    shopLoading();
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
        url: "http://localhost:8099/order/update/" + cart.buyer,
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
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    shopLoading();
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
        url: "http://localhost:8099/order/update/" + cart.buyer,
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
                    toastr.error('You need login!',  "HAHA");
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
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    shopLoading();
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
        url: "http://localhost:8099/order/update/" + cart.buyer,
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
                    toastr.error('You need login!', "HAHA");
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

function checkout() {
    console.log(cart);
    let shippingRates = $('input[name="shipping-rete"]:checked').val();
    console.log(shippingRates);
    if(typeof cart.listProduct == "undefined"
    || cart.listProduct == null
    || cart.listProduct.length == null
    || cart.listProduct .length < 0) {
        toastr.error('You do not have products to checkout', 'Please select a product');
        return;
    }
    console.log(order);
    if(order.listProduct .length < 0) {
        toastr.error('You need to contact us to pay for old orders! To be able to continue ordering!');
        return;
    }
    if(shippingRates == "" || shippingRates == null) {
        toastr.error('You need to choose shipping rate');
        return;
    }
    shopLoading();
    $.ajax({
        url: "http://localhost:8099/order/checkout-products?idUser=" + userDto.username + "&shippingRates=" + shippingRates,
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
                    window.location.href = "http://localhost:8080/checkout"
                }else {
                    toastr.success('Checkout error!', response.message);
                }
            }else {
                toastr.success('Checkout server error !', response.message);
                console.log(response.message);
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
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    let contentComment = $("textarea#coment-content").val().trim();
    if(typeof star == "undefined"
        || star == null
        || star == "") {
        toastr.error('You need to rate the product!', "HAHA");
        return;
    }
    if (contentComment == null || contentComment == ""){
        toastr.error('You need import content!', "HAHA");
        return;
    }
    shopLoading();
    let comment = {
        image: userDto.image,
        buyer: userDto.username,
        comtent: contentComment,
        star: parseInt(star)
    };
    $.ajax({
        url: "http://localhost:8099/v1/api/comment/" + idProduct,
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
    console.log(idProduct);
    if(!checkLogin) {
        toastr.error('You need login!', "HAHA");
        return;
    }
    if(idProduct == null && idProduct == "") {
        toastr.error('An error occurred . Please try again!', "HAHA");
        return;
    }
    if(idCommet == null && idCommet == "") {
        toastr.error('An error occurred . Please try again!', "HAHA");
        return;
    }
    shopLoading();
    $.ajax({
        url: "http://localhost:8099/v1/api/like-comment?idProduct=" + idProduct
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
            url: 'http://localhost:8099/v1/api/upload',
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
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
                rederUserInfo(response.data);
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
        error: function (result) {
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
    error: function (result) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});


//check the user already logged
// find product all
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
    error: function (result) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});
}
if(pathname == "/home") {
    $.ajax({
        url: "http://localhost:8099/v1/api/product/trending",
        type: "GET",
        success: function (response) {
            if (response.code == "00") {
                listTrendingProduct = response.data;
                rederDataTrending(response.data);
            } else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (result) {
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
    if(!validatePassword(password)) {
        toastr.error('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
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
                    // user = response.data;
                    checkLogin = true;
                    toastr.success('Logic success!', response.message);
                }
                if (checkLogin) {
                    window.location.href = "http://localhost:8080/home"
                }
            } else {
                window.location.href = "http://localhost:8080/login?error=true"
                console.log(response.message);
            }
        },
        error: function () {
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
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/register?username="+username+"&password="+
            password+"&name="+ name + "&email" + email,
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
            }
            if(response.code == "300") {
                toastr.success('Account exit success!', response.message);
            }
            else {
                toastr.error('Null Data', response.message);
                console.log(response.message);
            }
        },
        error: function () {
            toastr.error('An error occurred . Please try again', response.message);
            console.log(response.message);
        }
    });
}

function logoutUser() {
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
            }else {
                console.log(response.message);
            }
        },
        error: function () {
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
    if(checkLogin != "") {
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
    }else {
        toastr.error('You need login!', "HAHA");
    }
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
    if(checkLogin) {
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
        }
    }else {
        toastr.error('You need login!', "HAHA");
    }
}

// add default product color frist (colorForPrice[0])
function addToCastDefaultDB(idProduct, nameColor, priceColor, price) {
    if(checkLogin) {
        console.log(typeof priceColor);
        if(nameColor != null && nameColor != undefined
            && priceColor != null && priceColor != undefined
            && price != null && price != undefined) {
            let addPriceColor = price + priceColor;
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
        }
    }else {
        toastr.error('You need login!', "HAHA");
    }
}

function deleteItem(idProduct, nameColor) {
    if(checkLogin) {
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
                    if (checkLogin) {
                        if (cart.listProduct != null) {
                            getTotalProductInCast(cart);
                            rederDataCast(cart.listProduct);
                            rederDataCastBoxUp(cart.listProduct);
                            if (cart.listProduct[0] != null) {
                                getPriceProductInCast(cart);
                                toastr.success('Delete product success!', "HAHA");
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
    }else {
        toastr.error('You need login!', "HAHA");
    }
}

function addItem(idProduct, nameColor) {
    if(checkLogin) {
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
    }else {
        toastr.error('You need login!', "HAHA");
    }
}

function removeItem(idProduct, nameColor) {
    if(checkLogin) {
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
    }else {
        toastr.error('You need login!', "HAHA");
    }
}

// comment
function addComment(idProduct) {
    if(checkLogin != "") {
        shopLoading();
        let contentComment = $("textarea#coment-content").val().trim();
        if (contentComment != null && contentComment != "") {
            let comment = {
                image: userDto.image,
                buyer: userDto.username,
                comtent: contentComment
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
        }else {
            toastr.error('You need import content!', "HAHA");
        }
    }else {
        toastr.error('You need login!', "HAHA");
    }
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
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
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (result) {
            window.location.href = "http://localhost:8080/login"
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
        }
    });
}
if(token != null && token != "") {
    loadUserDto();
} else {
    $('#login-user').css({"visibility": "visible", "opacity": "1"});
    $('#logout-user').css({"visibility": "hidden", "opacity": "0"});
}


//check the user already logged
// find product all
$.ajax({
    url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+currentPage+"&perPage=12",
    type: "GET",
    success: function (response) {
        if(response.code == "00") {
            listAllProduct = response.data.content;
            rederData(response.data.content);
            let totalPage = response.data.totalPages;
            forPagination(totalPage);
        }else {
            toastr.error('Find not data!', response.message);
        }
    },
    error: function (result) {
        toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
    }
});

$.ajax({
    url: "http://localhost:8099/v1/api/product/trending",
    type: "GET",
    success: function (response) {
        if(response.code == "00") {
            listTrendingProduct = response.data;
            rederDataTrending(response.data);
        }else {
            toastr.error('Find not data!', response.message);
        }
    },
    error: function (result) {
        toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
    }
});

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
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
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
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    let name = $("#regiter-name").val().trim();
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
    if(!mediumRegex.test(password)) {
        toastr.error('Password needs uppercase, lowercase letters, numbers, greater than eight characters');
        return;
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/register?username="+username+"&password="+
            password+"&name="+ name,
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
            else {
                toastr.error('Null Data', response.message);
                console.log(response.message);
            }
        },
        error: function () {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
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
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            console.log(response.message);
        }
    });
}

// product

//Advanced search product
$('#find-type input').on('change', function() {
    type = $('input[name=type]:checked', '#find-type').val();
    console.log(type);
    searchProduct(0);
});

$('#find-material input').on('change', function() {
    material = $('input[name=material]:checked', '#find-material').val();
    console.log(material);
    searchProduct(0);
});

$('#find-color input').on('change', function() {
    color = $('input[name=color]:checked', '#find-color').val();
    console.log(color);
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
                let totalPage = response.data.totalPages;
                forPagination(totalPage);
            } else {
                rederData(response.data);
                forPagination(1);
                console.log(response.message);
            }
            hideLoading();
        },
        error: function (error) {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
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
        url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+currentPage+"&perPage=12&sort=" + sort,
        processData: false,
        contentType: 'application/json',
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                rederData(response.data.content);
                let totalPage = response.data.totalPages;
                forPagination(totalPage);
            }
            else {
                rederData(response.data);
                forPagination(1);
                console.log(response.message);
            }
            hideLoading()
        },
        error: function (error) {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
            hideLoading()
        }
    });
}

function addFavouriteUser(idProduct) {
    if(checkLogin != "") {
        shopLoading();
        $.ajax({
            url: "http://localhost:8099/v1/api/user/favourite/?idUser="+
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
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                hideLoading()
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

// cart product
function getProductInCast() {
    $.ajax({
        url: "http://localhost:8099/order/products/" + userDto.id,
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
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
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
//                     name: userDto.id,
//                     listProductCast: [{
//                         id: idProduct,
//                         number: newNumber,
//                         type: 1
//                     }]
//                 };
//             }else {
//                 updateCastRequest = {
//                     name: userDto.id,
//                     listProductCast: [{
//                         id: idProduct,
//                         number: newNumber,
//                         type: 2
//                     }]
//                 };
//             }
//             $.ajax({
//                 url: "http://localhost:8099/order/update/" + cart.id,
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
//                     toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
//                         hideLoading();
//                 }
//             });
//         }else {
//             toastr.error('Bạn nhập nhâp số vào nếu ko thì chết đó làm khó nhau vcl! Mịa!',  "HAHA");
//         }
//     }else {
//         toastr.error('Bạn cần đăng nhâp!',  "HAHA");
//     }
// }

function addToCastDB(idProduct) {
    if(checkLogin) {
        shopLoading();
        let updateCastRequest = {
            name: userDto.id,
            listProductCast: [{
                id: idProduct,
                number: 1,
                type: 1
            }]
        };
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.id,
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
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                hideLoading();
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function deleteItem(idProduct) {
    if(checkLogin) {
        shopLoading();
        let updateCastRequest = {
            name: userDto.id,
            listProductCast: [{
                id: idProduct,
                number: 1,
                type: 3
            }]
        };
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.id,
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
                        toastr.error('Bạn cần đăng nhâp!', "HAHA");
                    }
                }
                hideLoading();
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                hideLoading();
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function addItem(idProduct) {
    if(checkLogin) {
        shopLoading();
        let updateCastRequest = {
            name:  userDto.id,
            listProductCast: [{
                id: idProduct,
                number: 1,
                type: 1
            }]
        };
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.id,
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
                        toastr.error('Bạn cần đăng nhâp!',  "HAHA");
                    }
                }
                hideLoading();
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                hideLoading();
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function removeItem(idProduct) {
    if(checkLogin) {
        shopLoading();
        let updateCastRequest = {
            name: userDto.id,
            listProductCast: [{
                id: idProduct,
                number: 1,
                type: 2
            }]
        };
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.id,
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
                        toastr.error('Bạn cần đăng nhâp!', "HAHA");
                    }
                }
                hideLoading();
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                hideLoading();
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

// comment
function addComment(idProduct) {
    if(checkLogin != "") {
        shopLoading();
        let contentComment = $("textarea#coment-content").val().trim();
        if (contentComment != null && contentComment != "") {
            console.log(contentComment);
            console.log(cart.image);
            console.log(cart.buyer);

            let comment = {
                image: cart.image,
                buyer: cart.buyer,
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
                            console.log(response.data);
                            comment = response.data.comment;
                            rederComentProduct(comment);
                            $("#coment-content").val("");
                            toastr.success('Comment product success!', "HAHA");
                        }
                    }
                    hideLoading();
                },
                error: function (error) {
                    toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', error.message);
                    hideLoading();
                }
            });
        }else {
            toastr.error('Bạn cần nhập nội dung!', "HAHA");
        }
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}
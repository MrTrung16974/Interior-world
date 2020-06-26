if(token != null && token != "") {
    $.ajax({
        url: "http://localhost:8099/v1/api/getInfoUser",
        type: "GET",
        dataType: 'json',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", token);
        },
        contentType: "application/json",
        success: function (response) {
            if(response.code == "00") {
                userDto = response.data;
                console.log(userDto);
                $('#login-user').css({"visibility": "hidden", "opacity": "0"});
                $('#logout-user').css({"visibility": "visible", "opacity": "1"});
                getProductInCast();
                rederUserInfo(response.data);
                rederDataFavourite(response.data.lstFavourite);
                rederDataFavouriteBoxUp(response.data.lstFavourite);
                if(response.data.lstFavourite != null) {
                    getTotalProductInFavourite(response.data.lstFavourite);
                }
                checkLogin = true;
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (result) {
            window.location.href = "http://localhost:8080/login"
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
        }
    });
}else {
    $('#login-user').css({"visibility": "visible", "opacity": "1"});
    $('#logout-user').css({"visibility": "hidden", "opacity": "0"});
}

//check the user already logged
// find product all
$.ajax({
    url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+pageDefault+"&perPage=12",
    type: "GET",
    success: function (response) {
        if(response.code == "00") {
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
function loginUser(e) {
    if(e.keyCode === 13) {
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
}

function registerClickUser() {
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
        toastr.error('Password and confirm password must be the same ', response.message);
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

function registerUser(e) {
    if(e.keyCode === 13) {
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
            toastr.error('Password and confirm password must be the same ', response.message);
            return;
        }
        if(password != confirmPassword) {
            toastr.error('Password and confirm password must be the same ', response.message);
            return;
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8099/register?username="+username+"&password="+
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
    searchProduct(0);
});

$('#find-material input').on('change', function() {
    material = $('input[name=type]:checked', '#find-material').val();
    searchProduct(0);
});

$('#find-color input').on('change', function() {
    color = $('input[name=type]:checked', '#find-color').val();
    searchProduct(0);
});

//Quick search product Advanced
function searchProduct(page) {
    pageDefault = page;
    keyword = $('#keysearch').val().trim().toLocaleLowerCase();
    console.log(keyword);
    if (keyword == null) {
        keyword = '';
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8099/v1/api/product/search?name=" +
            keyword + "&page="+pageDefault+"&perPage=12&sort=" + sort
            + "&type=" + type + "&material=" + material + "&color=" + color,
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
        }
    });
}

function sortProduct() {
    let getSort = $("#sortBydate").val();
    if(getSort != null && getSort != "") {
        sort = getSort;
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+pageDefault+"&perPage=10&sort=" + sort,
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
        }
    });
}

function addFavouriteUser(idProduct) {
    if(checkLogin != "") {
        $.ajax({
            url: "http://localhost:8099/v1/api/user/favourite/?idUser="+
                cart.buyer + "&idProduct=" + idProduct,
            type: "PUT",
            success: function (response) {
                if (response.data != null) {
                    if (response.code == "200") {
                        console.log(response.data);
                        toastr.success('add favourite user Success!', "HAHA");
                    }
                    if (response.code == "00") {
                        console.log(response.data);
                        toastr.success('remove favourite user Success!', "HAHA");
                    }
                    rederDataFavourite(response.data);
                    rederDataFavouriteBoxUp(response.data);
                    if(response.data != null) {
                        getTotalProductInFavourite(response.data);
                    }
                }
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
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
        },
        error: function (error) {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
        }
    });
}

// function addToCastDetailDB(idProduct, oldNumber) {
//     let updateCastRequest = [];
//     if(checkLogin != "") {
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
//                 },
//                 error: function (error) {
//                     toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
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
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function deleteItem(idProduct) {
    if(checkLogin) {
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
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function addItem(idProduct) {
    if(checkLogin) {
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
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

function removeItem(idProduct) {
    if(checkLogin) {
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
            },
            error: function (error) {
                toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            }
        });
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}

// comment
function addComment(idProduct) {
    if(checkLogin != "") {
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
                },
                error: function (error) {
                    toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
                }
            });
        }else {
            toastr.error('Bạn cần nhập nội dung!', "HAHA");
        }
    }else {
        toastr.error('Bạn cần đăng nhâp!', "HAHA");
    }
}
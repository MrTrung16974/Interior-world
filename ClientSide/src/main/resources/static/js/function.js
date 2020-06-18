if(user != null && user != "") {
    $.ajax({
        url: "http://localhost:8099/v1/api/getInfoUser",
        type: "GET",
        dataType: 'json',
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", user);
        },
        contentType: "application/json",
        success: function (response) {
            if(response.code == "00") {
                setCookie("username", response.data.id);
                $('#login-user').css("display", "none");
                $('#logout-user').css("display", "block");
                getProductInCast();
                rederUserInfo(response.data);
                rederDataFavourite(response.data.lstFavourite);
                rederDataFavouriteBoxUp(response.data.lstFavourite);
                getTotalProductInFavourite(response.data.lstFavourite);
                console.log(response.data.lstFavourite);
                checkLogin = true;
            }else {
                toastr.error('Find not data!', response.message);
            }
        },
        error: function (result) {
            window.location.href = "http://localhost:8089/login"
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
        }
    });
}

//check the user already logged
// find product all
$.ajax({
    url: "http://localhost:8099/v1/api/product/search?name="+keyword+"&page="+pageDefault+"&perPage=10",
    type: "GET",
    // dataType: 'json',
    // headers: {
    //     "Authorization": "Basic " + btoa('trungth' + ":" + '123456')
    // },
    // data: '{ "comment" }',
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

function loginUser() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/v1/api/login?username="+username+"&password="+ password,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                if(response.data != null) {
                    setCookie("user", response.data);
                    // user = response.data;
                    checkLogin = true;
                    toastr.error('Logic success!', response.message);
                }
                if(user != "" && user != null) {
                    window.location.href = "http://localhost:8089/home"
                }
            }
            else {
                window.location.href = "http://localhost:8089/login?error=true"
                console.log(response.message);
            }
        },
        error: function () {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
            console.log(response.message);
        }
    });
}

function registerUser() {
    let name = $("#regiter-name").val().trim();
    let username = $("#regiter-username").val().trim();
    let password = $("#regiter-passwprd").val().trim();
    $.ajax({
        type: "POST",
        url: "http://localhost:8099/register?username="+username+"&password="+ password+"&name="+ name,
        processData: false,
        success: function (response) {
            // server trả về HTTP status code là 200 => Thành công
            //hàm đc thực thi khi request thành công không có lỗi
            if(response.code == "00") {
                if(response.data != null) {
                    setCookie("user", response.data);
                    toastr.error('Register success!', response.message);
                }
                // if(user != "" || user != null) {
                //     window.location.href = "http://localhost:8089/"+ response.data;
                // }
            }
            else {
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
                    deleteCookie("user");
                    deleteCookie("username");
                    $('#login-user').css("display", "block");
                    $('#logout-user').css("display", "none");
                    checkLogin = false;
                    toastr.error('Logout success!', response.message);
                if(user != "" && user != null) {
                    window.location.href = "http://localhost:8089/login"
                }else {
                    toastr.error('Logout error!', response.message);
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
function searchProduct(page) {
    pageDefault = page;
    keyword = $('#keysearch').val().trim().toLocaleLowerCase();
    if (keyword == null) {
        keyword = '';
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
    if(user != "") {
        $.ajax({
            url: "http://localhost:8099/v1/api/user/favourite/?idUser="+
                cart.buyer + "&idProduct=" + idProduct,
            type: "PUT",
            success: function (response) {
                if (response.data != null) {
                    if (response.code == "200") {
                        console.log(response.data);
                        toastr.error('add favourite user Success!', "HAHA");
                    }
                    if (response.code == "00") {
                        console.log(response.data);
                        toastr.error('remove favourite user Success!', "HAHA");
                    }
                    rederDataFavourite(response.data);
                    rederDataFavouriteBoxUp(response.data);
                    getTotalProductInFavourite(response.data);
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
        url: "http://localhost:8099/order/products/" + username,
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
//     if(user != "") {
//         let newNumber = $("#qty").val().trim();
//         if(newNumber > 0) {
//             newNumber -= oldNumber;
//             console.log(newNumber);
//             if(newNumber < oldNumber) {
//                 updateCastRequest = {
//                     name: user,
//                     listProductCast: [{
//                         id: idProduct,
//                         number: newNumber,
//                         type: 1
//                     }]
//                 };
//             }else {
//                 updateCastRequest = {
//                     name: user,
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
//                                 toastr.error('Add product success!', "HAHA");
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
            name: user,
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
                            toastr.error('Add product success!', "HAHA");
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
            name: user,
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
                    if (user != "") {
                        if (cart.listProduct != null) {
                            getTotalProductInCast(cart);
                            rederDataCast(cart.listProduct);
                            rederDataCastBoxUp(cart.listProduct);
                            if (cart.listProduct[0] != null) {
                                getPriceProductInCast(cart);
                                toastr.error('Delete product success!', "HAHA");
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
            name:  user,
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
                    if(user != "") {
                        if(cart.listProduct != null) {
                            getTotalProductInCast(cart);
                            rederDataCast(cart.listProduct);
                            rederDataCastBoxUp(cart.listProduct);
                            if(cart.listProduct[0] != null) {
                                getPriceProductInCast(cart);
                                toastr.error('Add product success!', "HAHA");
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
            name: user,
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
                    if (user != "") {
                        if (cart.listProduct != null) {
                            getTotalProductInCast(cart);
                            rederDataCast(cart.listProduct);
                            rederDataCastBoxUp(cart.listProduct);
                            if (cart.listProduct[0] != null) {
                                getPriceProductInCast(cart);
                                toastr.error('Delete product success!', "HAHA")
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
    if(user != "") {
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
                            toastr.error('Comment product success!', "HAHA");
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
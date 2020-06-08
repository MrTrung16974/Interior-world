// // find product all

$.ajax({
    url: "http://localhost:8099/v1/api/product/search?name="+keyword+"&page="+pageDefault+"&perPage=10",
    type: "GET",
    dataType: 'json',
    xhrFields: {
        withCredentials: true
    },
    // beforeSend : function(xhr) {
    //     var cookie = getCookie("JSESSIONID");
    //     console.log(cookie);
    //     xhr.setRequestHeader('Cookie',"JSESSIONID=" + cookie);
    //     xhr.setRequestHeader ("Authorization", "Basic " + btoa('trungth' + ":" + '123456'));
    //
    // },
    headers: {
        "Authorization": "Basic " + btoa('trungth' + ":" + '123456')
    },
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

function searchProduct(page) {
    pageDefault = page;
    keyword = $('#keysearch').val().trim().toLocaleLowerCase();
    if (keyword == null) {
        keyword = '';
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8099/v1/api/product/search?name=" + keyword + "&page="+pageDefault+"&perPage=10",
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

// cart product
if(user != "") {
    getProductInCast();
}else {
    $('#login-user').css("display", "block");
    $('#logout-user').css("display", "none");
}

function getProductInCast() {
    $.ajax({
        url: "http://localhost:8099/order/products/" + user,
        type: "GET",
        success: function (response) {
            if(response.code = '00') {
                cart = response.data;
                if(cart.listProduct != null) {
                    getTotalProductInCast(cart);
                    rederDataCast(cart.listProduct);
                    rederUserInfo(cart)
                    rederDataCastBoxUp(cart.listProduct);
                    if(cart.listProduct[0] != null) {
                        getPriceProductInCast(cart);
                    }
                }
            }
        },
        error: function (error) {
            toastr.error('có lỗi xảy ra . Xin vui lòng thử lại', response.message);
        }
    });
}

function addToCastDetailDB(idProduct, oldNumber) {
    let updateCastRequest = [];
    if(user != "") {
        let newNumber = $("#qty").val().trim();
        if(newNumber > 0) {
            newNumber -= oldNumber;
            console.log(newNumber);
            if(newNumber < oldNumber) {
                updateCastRequest = {
                    name: user,
                    listProductCast: [{
                        id: idProduct,
                        number: newNumber,
                        type: 1
                    }]
                };
            }else {
                updateCastRequest = {
                    name: user,
                    listProductCast: [{
                        id: idProduct,
                        number: newNumber,
                        type: 2
                    }]
                };
            }
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
            toastr.error('Bạn nhập nhâp số vào nếu ko thì chết đó làm khó nhau vcl! Mịa!',  "HAHA");
        }
    }else {
        toastr.error('Bạn cần đăng nhâp!',  "HAHA");
    }
}

function addToCastDB(idProduct) {
    if(user != "") {
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
    if(user != "") {
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
    if(user != "") {
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
    if(user != "") {
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

function paymentToCastDB(idProduct) {
    if(user != "") {
        $.ajax({
            url: "http://localhost:8099/order/update/" + cart.id,
            type: "POST",
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
                                toastr.error('Payment product success!',  "HAHA");
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


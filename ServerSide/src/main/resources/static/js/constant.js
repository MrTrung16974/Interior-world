var pathname = window.location.pathname;

// formart price
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

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

//    switch option
switch (pathname) {
    case "/aroma/home":
        $("title.title-page").text("Aroma Admin - Home");
        break;
    case "/aroma/user/role/list":
        $("title.title-page").text("Aroma Admin - List Decentralization");
        break;
    case "/aroma/user/list":
        $("title.title-page").text("Aroma Admin - List Account");
        break;
    case "/aroma/product/list":
        $("title.title-page").text("Aroma Admin - List Product");
        break;
    case "/aroma/product/order/list":
        $("title.title-page").text("Aroma Admin - List Order");
        break;
    case "/aroma/user/chats":
        $("title.title-page").text("Aroma Admin - Chat User");
        break;
    case "/aroma/login":
        $("title.title-page").text("Aroma Admin - Login");
        break;
    case "/aroma/register":
        $("title.title-page").text("Aroma Admin - Register");
        break;
    default :
        $("title.title-page").text("Aroma Admin");
        break;
}

var pathname = window.location.pathname;

// formart price
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

//    switch option
switch (pathname) {
    case "/home":
        $("title.title-page").text("Aroma Admin - Home");
        break;
    case "/user/role/list":
        $("title.title-page").text("Aroma Admin - List Decentralization");
        break;
    case "/user/list":
        $("title.title-page").text("Aroma Admin - List Account");
        break;
    case "/product/list":
        $("title.title-page").text("Aroma Admin - List Product");
        break;
    case "/product/order/list":
        $("title.title-page").text("Aroma Admin - List Order");
        break;
    case "/user/chats":
        $("title.title-page").text("Aroma Admin - Chat User");
        break;
    case "/login":
        $("title.title-page").text("Aroma Admin - Login");
        break;
    case "/register":
        $("title.title-page").text("Aroma Admin - Register");
        break;
    default :
        $("title.title-page").text("Aroma Admin");
        break;
}

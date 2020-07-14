var pathname = window.location.pathname;

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

/**
 * Chuc nang tim kiem, tai lai bang du lieu dua theo thong tin loc
 * */
// jQuery(document).ready(function () {
//     $('#toDate').datepicker({
//         format: "dd/mm/yyyy",
//         language: "vi",
//         //            endDate: "0d",
//         todayHighlight: true,
//         autoclose: true,
//
//     });
//     $('#iaddFromDate').on('click', function () {
//         $('#fromDate').focus();
//     });
//     $('#iaddToDate').on('click', function () {
//         $('#toDate').focus();
//     });
//     $('#fromDate').datepicker({
//         format: "dd/mm/yyyy",
//         language: "vi",
//         //            endDate: "0d",
//         todayHighlight: true,
//         autoclose: true
//     });
//     var toDate = new Date();
//     fromDate = new Date();
//     fromDate.setMonth(fromDate.getMonth() - 1);
//     toDate.setHours(0);
//     toDate.setMinutes(0);
//     toDate.setSeconds(0);
//     toDate.setMilliseconds(0);
//     $('#fromDate').datepicker('setDate', fromDate);
//     $('#toDate').datepicker('setDate', toDate);
//
// });
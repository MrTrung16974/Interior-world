// /**
//  * Chuc nang tim kiem, tai lai bang du lieu dua theo thong tin loc
//  * */
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
// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
  $('#table_list_product').DataTable();
  $('#table_list_user').DataTable();
  $('#table_list_decentralization').DataTable();

});
// var tblUser = $('#table_list_product').DataTable({
//   searching: true,
//   bPaginate: true,
//   bAutoWidth: false,
//   bLengthChange: true,
//   "lengthMenu": [10, 25, 50, 100],
//   bSort: true,
//   order: [1, "desc"],
//   pageLength: 10,
//   "processing": false,
//   "serverSide": false,
//   "language": {
//     "url": dtViLang
//   },
//   "ajax": {
//     "url": searchUrl,
//     "data": function (d) {
//       d.userName = $("#userName").val().trim();
//       d.fullName = $("#fullName").val().trim();
//       d.email = $("#email").val().trim();
//       d.status = $("#status").val().trim();
//       d.fromDate = $("#fromDate").val().trim();
//       d.toDate = $("#toDate").val().trim();
//     },
//     beforeSend: function (xhr) {
//       $("#tblLoading").css("display", "block");
//     },
//     complete: function () {
//       $("#tblLoading").css("display", "none");
//     },
//     error: function (xhr, status, error) {
//       showAlertError("Có lỗi xảy ra trong quá trình tải dữ liệu");
//     }
//   },
//   columns: [
//     {"data": "userID"},
//     {"data": "userName"},
//     {"data": "fullName"},
//     {"data": "email"},
//     {"data": "roleID"},
//     {"data": "status"},
//     {"data": "status"},
//   ],
//   columnDefs: [
//     {
//       "render": function (data, type, row) {
//         return lstRole.find(x => x.roleID === row.roleID).roleCode;
//       },
//       "targets": 4
//     },
//     {
//       "render": function (data, type, row) {
//         if (row.status === 1) {
//           return "Hoạt động";
//         } else {
//           return "Khóa";
//         }
//       },
//       "targets": 5
//     },
//     {
//       "render": function (data, type, row) {
//         var content = "";
//         if (true) {
//           content = '<a class="blue" href="'+editUserUrl +row.userID + '" data-toggle="tooltip" title="Chỉnh sửa thông tin"> <i class="default-icon fa fa-pencil bigger-130"></i> </a>';
//           if (row.status !== 1) {
//             content += '&nbsp;<a class="blue" ' +
//                 'onclick="updateUser(\'' + row.userID + '\',1);" ' +
//                 'data-toggle="tooltip" title="Mở khóa người dùng">' +
//                 '<i class="fa fa-unlock"></i>' +
//                 '</a></div>';
//           } else {
//             content += '&nbsp<a class="red" ' +
//                 'onclick="updateUser(\'' + row.userID + '\',2);" ' +
//                 'data-toggle="tooltip" title="Khóa người dùng">' +
//                 '<i class="fa fa-ban"></i>' +
//                 '</a>';
//           }
//           content += '&nbsp;&nbsp;<a class="blue" ' +
//               'onclick="updateUser(\'' + row.userID + '\',-1);" ' +
//               'data-toggle="tooltip" title="Đặt lại mật khẩu">' +
//               '<i class="fa fa-refresh"></i>' +
//               '</a>';
//         }
//
//         return content;
//       },
//       "targets": 6
//     },
//     {'bSortable': false, 'aTargets': ["no-sort"]}
//   ]
// });
// //Dat gia tri cho cot index (STT) moi lan sap xep bang
// tblUser.on('order.dt search.dt', function () {
//   tblUser.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
//     cell.innerHTML = i + 1;
//   });
// }).draw();

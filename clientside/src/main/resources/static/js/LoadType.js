const urlServer = "http://localhost:8099/aroma/";
const urlClient = "http://localhost:8080/";


$.ajax({
    url: urlServer + "v1/api/product/all-category",
    async: false,
    type: "GET",
    success: function (response) {
        if (response.code == "00") {
            lstCategory = response.data;
            if (pathname == "/shop") {
                rederDataCategory(response.data);
                searchAdvanced();
            }
        } else {
            toastr.warning('Find not data for category!');
        }
    },
    error: function (response) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});
$.ajax({
    url: urlServer + "v1/api/product/all-material",
    async: false,
    type: "GET",
    success: function (response) {
        if (response.code == "00") {
            lstMaterial = response.data;
            if (pathname == "/shop") {
                rederDataMaterial(response.data);
                searchAdvanced();
            }
        } else {
            toastr.warning('Find not data for material!');
        }
    },
    error: function (response) {
        toastr.error('An error occurred . Please try again', response.message);
    }
});

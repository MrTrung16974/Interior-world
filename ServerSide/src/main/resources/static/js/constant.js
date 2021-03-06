var pathname = window.location.pathname;

// formart price
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


// format data (DD/MM/YYYY)
const ChangeDateFormatAgain = date => {
    const [dd, mm, yy] = date.split(/\//g);
    return `${yy}-${mm}-${dd}`;
};

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
    case "/aroma/":
        $("title.title-page").text("Aroma Admin - Home");
        break;
    case "/aroma/home":
        $("title.title-page").text("Aroma Admin - Home");
        break;
    case "/aroma/role/list":
        $("title.title-page").text("Aroma Admin - List Decentralization");
        break;
    case "/aroma/user/list":
        $("title.title-page").text("Aroma Admin - List Account");
        break;
    case "/aroma/product/list":
        $("title.title-page").text("Aroma Admin - List Product");
        break;
    case "/aroma/order/list":
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
        $("title.title-page").text("Aroma Admin - Page Detail");
        break;
}

// validate date
function isDate(ExpiryDate) {
    var objDate,  // date object initialized from the ExpiryDate string
        mSeconds, // ExpiryDate in milliseconds
        day,      // day
        month,    // month
        year;     // year
    // date length should be 10 characters (no more no less)
    if (ExpiryDate == '') {
        return true;
    }
    if (ExpiryDate.length !== 10) {
        return false;
    }
    // third and sixth character should be '/'
    if (ExpiryDate.substring(2, 3) !== '/' || ExpiryDate.substring(5, 6) !== '/') {
        return false;
    }
    // extract month, day and year from the ExpiryDate (expected format is mm/dd/yyyy)
    // subtraction will cast variables to integer implicitly (needed
    // for !== comparing)
    month = ExpiryDate.substring(0, 2) - 1; // because months in JS start from 0
    day = ExpiryDate.substring(3, 5) - 0;
    year = ExpiryDate.substring(6, 10) - 0;
    // test year range
    if (year < 1000 || year > 3000) {
        return false;
    }
    // convert ExpiryDate to milliseconds
    mSeconds = (new Date(year, month, day)).getTime();
    // initialize Date() object from calculated milliseconds
    objDate = new Date();
    objDate.setTime(mSeconds);
    // compare input date and parts from Date() object
    // if difference exists then date isn't valid
    if (objDate.getFullYear() !== year ||
        objDate.getMonth() !== month ||
        objDate.getDate() !== day) {
        return false;
    }
    // otherwise return true
    return true;
}

// upload file image user
let imageFace = $("input.img");
let newFace = $("img.image");
let newInputFace = $("input.input-image");
let lengthUserImg = imageFace.length;
for (var i = 0; i < lengthUserImg; i++) {
    let item = imageFace[i];
    let newFaceImage = newFace[i];
    let newInputFaceImage = newInputFace[i];
    item.addEventListener('change', function () {
        var formData = new FormData();
        formData.append('file', item.files[0]);
        $.ajax({
            url: 'http://localhost:8099/aroma/v1/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                newFaceImage.src = data;
                newInputFaceImage.value = data;
                toastr.success('Upload image success! ', 'Haha!');
            },
            error: function () {
                toastr.error('An error occurred . Please try again', 'Inconceivable!');
            }
        });
    });
}

// upload file image product
let imageProduct = $("input.imgproduct");
let newProduct = $("div#content-image");
let lengthProductImg = imageProduct.length;
for (var i = 0; i < lengthProductImg; i++) {
    let item = imageProduct[i];
    item.addEventListener('change', function () {
        var formData = new FormData();
        formData.append('file', item.files[0]);
        $.ajax({
            url: 'http://localhost:8099/aroma/v1/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                newProduct.append(
                    `<div name="chkImage" class="checkbox d-inline-block">
                        <label>
                            <img width="100" height="100" src="${data}" name="chkImage" alt="Image Product">
                            <input type="hidden" value="${data}" name="chkImage" class="image mt-2">
                            <label class="image-remove" >&#967;</label>
                        </label>
                    </div>`
                );
                toastr.success('Upload image success! ', 'Haha!');
            },
            error: function () {
                toastr.error('An error occurred . Please try again', 'Inconceivable!');
            }
        });
    });
}
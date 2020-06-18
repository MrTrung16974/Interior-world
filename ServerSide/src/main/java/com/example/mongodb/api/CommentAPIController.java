package com.example.mongodb.api;

import com.example.mongodb.dto.*;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class CommentAPIController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/comment/{idProduct}")
    public BaseResponse addComment(@PathVariable("idProduct") String idProduct,
                                   @RequestBody Comment comment) {
        BaseResponse response = new BaseResponse();
        try {
            Optional<Product> optProduct = productRepository.findById(idProduct);
            if(!optProduct.isPresent()) {
                response.setCode("500");
                response.setMessage("Null data");
                response.setData(null);
            }else {
                Product exitproduct = optProduct.get();
                comment.setCreateAt(new Date());
                List<Comment> lstComent = new ArrayList<>() ;
                if(exitproduct.getComment() != null) {
                    lstComent = exitproduct.getComment();
                }
                if(comment != null) {
                    lstComent.add(comment);
                    exitproduct.setComment(lstComent);
                }
                Product product = productRepository.save(exitproduct);
                response.setCode("00");
                response.setMessage("Success!");
                response.setData(product);
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error" + e.getMessage());
            response.setData(null);
        }

        return response;
    }
    
//    @PostMapping("/upload/favourite/{id}")
//    public  BaseResponse FavouriteComment(@PathVariable("id") String id,
//                                          @RequestBody Comment comment) {
//    BaseResponse response = new BaseResponse();
//            Optional<Product> optProduct = productRepository.findById(idProduct);
//    if (!optProduct.isPresent()) {
//        response.setCode("99");
//        response.setMessage("Data not found");
//        response.setData(null);
//        return response;
//    }
//    Product exitsProduct = optProduct.get();
//
//    ProductModel productAdd = null;
//    ProductModel productDelete = null;
//    Boolean checkAddProduct = true;
////        List get from clent
//    List<ProductModel> productInCart = exitsProduct.getListProduct();
//    //        checkname
////        list get from database
//    List<ProductCast> lstProduct = comment.getListProductCast();
//
//    for (ProductCast p : lstProduct) {
////            add product in cast
//        if (p.getType() == 1) {
//            if (productInCart == null) {
//                //Tạo mới giổ hàng trống
//                productInCart = new ArrayList<>();
//                //Tạo đối tượng sản phẩm trong giỏ hàng với các thông tin sau
//                ProductModel productModel = new ProductModel();
//                //số lượng client gửi lên
//                productModel.setNumber(p.getNumber());
//                //Mã sp client gửi lên
//                productModel.setId(p.getId());
//
//                //lấy thông tin sản phẩm trong DB
//                Product exitsProduct = productRepository.findById(p.getId()).get();
//                //Thêm giá
//                productModel.setPrice(exitsProduct.getPrice());
//                //Thêm name
//                productModel.setName(exitsProduct.getName());
//                //Thêm ảnh
//                productModel.setImage(exitsProduct.getImage());
//
//                //Thêm sản phẩm vưa tạo vào Danh sách sẩn phẩm trong giỏ
//                productInCart.add(productModel);
//
//                response.setCode("00");
//                response.setMessage("Thêm sản phẩm vào giỏ thành công");
//            } else {
//                boolean isHaveInList = false;
//                //Duyệt sản phẩm trong danh sách sp trong giỏ hàng của DB đang có sẵn
//                for (int i = 0; i < productInCart.size(); i++) {
//                    ProductModel pm = productInCart.get(i);
//                    //p.getNumber là số sản phẩm người dùng muốn thêm
//                    //pm.getNumber là số sản phẩm hiện tại trong gio hàng của DB
//                    //so sánh mã số sản phẩm hiện tại trong DB và mã người dùng
//                    //gửi lên nếu = nhau tăng số lượng lên
//                    if (p.getId().equals(pm.getId()) && p.getNumber() > 0) {
//                        //Đặt lại số lượng của sản phẩm trong giỏ hàng
//                        pm.setNumber(pm.getNumber() + p.getNumber());
//                        isHaveInList = true;
//                        response.setCode("00");
//                        response.setMessage("Đã tăng số lượng thành công");
//                    }
//                }
//
//                if (!isHaveInList) {
//                    //Nếu sản phẩm gửi lên không có trong list product của
//                    // cart thì thêm mới sản phẩm đó vào trong ds sản phẩm của
//                    // Giỏ hàng
//                    //Tạo mới model và set các trường
//                    ProductModel productModel = new ProductModel();
//                    //Số lượng
//                    productModel.setNumber(p.getNumber());
//                    productModel.setId(p.getId());
//                    //lấy thông tin sản phẩm trong DB
//                    Product exitsProduct = productRepository.findById(p.getId()).get();
//                    productModel.setPrice(exitsProduct.getPrice());
//                    productModel.setName(exitsProduct.getName());
//                    productModel.setImage(exitsProduct.getImage());
//
//                    //lưu lại sản phẩm vào giỏ hàng
//                    productInCart.add(productModel);
//
//                    response.setCode("00");
//                    response.setMessage("Thêm sản phẩm vào giỏ thành công");
//
//                }
//            }
//        }
////            remove product in cast
//        if(p.getType() == 2){
//            boolean isHaveInList = false;
//            for(int i = 0;i < productInCart.size();i++){
//                ProductModel pm =productInCart.get(i);
//                //p.getNumber là số lượng sản phẩm muốn thêm
//                //pm.getNumber là số lượng sản phẩm hiện tại
//                //so sánh mã số sản phẩm hiện tại trong DB
//                //và mã sp người dùng gửi lên
//                //nếu trùng thực hiện giảm số lượng sản phẩm
//                if(p.getId().equals(pm.getId()) && p.getNumber() > 0 &&
//                        p.getNumber() <= pm.getNumber()){
//
//                    //Giẩm số lượng sản phẩm
//                    pm.setNumber(pm.getNumber() - p.getNumber());
//                    response.setMessage("Đã giảm số lượng sản phẩm");
//
//                    //Nếu giảm xuống == 0 thì xóa luôn sản phẩm khỏi list
//                    if(pm.getNumber() == 0){
//                        productInCart.remove(pm);
//                        response.setMessage("Đã xóa sản phẩm ");
//                    }
//
//                    response.setCode("00");
//                }
//            }
//            if(!isHaveInList){
//                response.setCode("99");
//                response.setMessage("Data invalid");
//            }
//        }
//
////            delete product in cast
//        if (p.getType() == 3) {
//            for (ProductModel pm : productInCart) {
////                    p.getNumber la so san pham muon them
////                    check sô sản phẩm hiện tại trong DB lớn hon number
//                if (p.getId().equals(pm.getId())
//                        && p.getNumber() > 0 &&
//                        p.getNumber() <= pm.getNumber()) {
//                    productDelete = pm;
//                    response.setMessage("đã xóa sản phẩm");
//                } else {
//                    response.setCode("99");
//                    response.setMessage("Data invalid");
//                }
//            }
//            response.setCode("00");
//            if (productDelete != null) {
//                productInCart.remove(productDelete);
//            }
//        }
//    }
//    exitsProduct.setListProduct(productInCart);
//    response.setCode("00");
//    response.setMessage("Update giỏ hàng thành công");
//    response.setData(orderRepository.save(exitsProduct));
//    return response;
//}
}

package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.ProductCast;
import com.example.mongodb.dto.UpdateCastRequest;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.dto.ProductModel;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/order")
public class OrderApiController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;


//    get product prodcut now in user
    @RequestMapping("/products/{idUser}")
    public BaseResponse getListProductInCast(@PathVariable("idUser") String idUser) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optionalOrder = orderRepository.findByBuyerAndStatus(idUser, 1);
//        1, new account
//        2, Just Order
        if (!optionalOrder.isPresent()) {
            Order order = new Order();
            order.setBuyer(idUser);
//            order.setId("");
            order.setStatus(1);
            order.setCreatedAt(new Date());
            orderRepository.save(order);
            response.setCode("00");
            response.setMessage("Create new cast for" + idUser);
            response.setData(order);
        }else {
            Order exits = optionalOrder.get();
            response.setCode("00");
            response.setMessage("'Find order thành công for" + idUser);
            response.setData(exits);
        }
        return response;
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public  BaseResponse updateCast(@PathVariable("id") String id,
            @RequestBody UpdateCastRequest updateCastRequest) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optOrder = orderRepository.findByBuyer(id);
        if (!optOrder.isPresent()) {
            response.setCode("99");
            response.setMessage("Data not found");
            response.setData(null);
            return response;
        }
        Order exitsOrder = optOrder.get();
        if (exitsOrder.getStatus() != 1) {
            response.setCode("99");
            response.setMessage("Cast invalid");
            response.setData(null);
            return response;
        }

        ProductModel productDelete = null;
//        List get from clent
        List<ProductModel> productInCart = exitsOrder.getListProduct();
        //        checkname
//        list get from database
        List<ProductCast> lstProduct = updateCastRequest.getListProductCast();

        for (ProductCast p : lstProduct) {
//            add product in cast
            if (p.getType() == 1) {
                if (productInCart == null) {
                    //Tạo mới giổ hàng trống
                    productInCart = new ArrayList<>();
                    //Tạo đối tượng sản phẩm trong giỏ hàng với các thông tin sau
                    ProductModel productModel = new ProductModel();
                    //số lượng client gửi lên
                    productModel.setNumber(p.getNumber());
                    //Mã sp client gửi lên
                    productModel.setId(p.getId());

                    //lấy thông tin sản phẩm trong DB
                    Product exitsProduct = productRepository.findById(p.getId()).get();
                    //Thêm giá
                    productModel.setPrice(p.getPrice());
                    //Thêm name
                    productModel.setName(exitsProduct.getName());
                    //Thêm ảnh
                    productModel.setImage(exitsProduct.getImage());
                    // thêm màu
                    productModel.setNameColor(p.getNameColor());
                    //Thêm sản phẩm vưa tạo vào Danh sách sẩn phẩm trong giỏ
                    productInCart.add(productModel);

                    response.setCode("00");
                    response.setMessage("Thêm sản phẩm vào giỏ thành công");
                } else {
                    boolean isHaveInList = false;
                    //Duyệt sản phẩm trong danh sách sp trong giỏ hàng của DB đang có sẵn
                    for (int i = 0; i < productInCart.size(); i++) {
                        ProductModel pm = productInCart.get(i);
                        //p.getNumber là số sản phẩm người dùng muốn thêm
                        //pm.getNumber là số sản phẩm hiện tại trong gio hàng của DB
                        //so sánh mã số sản phẩm hiện tại trong DB và mã người dùng
                        //gửi lên nếu = nhau tăng số lượng lên
                        if (p.getId().equals(pm.getId()) && p.getNumber() > 0
                                && p.getNameColor().equals(pm.getNameColor())) {
                            //Đặt lại số lượng của sản phẩm trong giỏ hàng
                            pm.setNumber(pm.getNumber() + p.getNumber());
                            isHaveInList = true;
                            response.setCode("00");
                            response.setMessage("Đã tăng số lượng thành công");
                        }
                    }

                    if (!isHaveInList) {
                        //Nếu sản phẩm gửi lên không có trong list product của
                        // cart thì thêm mới sản phẩm đó vào trong ds sản phẩm của
                        // Giỏ hàng
                        //Tạo mới model và set các trường
                        ProductModel productModel = new ProductModel();
                        //Số lượng
                        productModel.setNumber(p.getNumber());
                        productModel.setId(p.getId());
                        //lấy thông tin sản phẩm trong DB
                        Product exitsProduct = productRepository.findById(p.getId()).get();
                        productModel.setPrice(p.getPrice());
                        productModel.setName(exitsProduct.getName());
                        productModel.setImage(exitsProduct.getImage());
                        productModel.setNameColor(p.getNameColor());

                        //lưu lại sản phẩm vào giỏ hàng
                        productInCart.add(productModel);

                        response.setCode("00");
                        response.setMessage("Thêm sản phẩm vào giỏ thành công");

                    }
                }
            }
//            remove product in cast
            if(p.getType() == 2){
                boolean isHaveInList = false;
                for(int i = 0;i < productInCart.size();i++){
                    ProductModel pm =productInCart.get(i);
                    //p.getNumber là số lượng sản phẩm muốn thêm
                    //pm.getNumber là số lượng sản phẩm hiện tại
                    //so sánh mã số sản phẩm hiện tại trong DB
                    //và mã sp người dùng gửi lên
                    //nếu trùng thực hiện giảm số lượng sản phẩm
                    if(p.getId().equals(pm.getId()) && p.getNumber() > 0 &&
                            p.getNumber() <= pm.getNumber()
                            && p.getNameColor().equals(pm.getNameColor())){

                        //Giẩm số lượng sản phẩm
                        pm.setNumber(pm.getNumber() - p.getNumber());
                        response.setMessage("Đã giảm số lượng sản phẩm");

                        //Nếu giảm xuống == 0 thì xóa luôn sản phẩm khỏi list
                        if(pm.getNumber() == 0){
                            productInCart.remove(pm);
                            response.setMessage("Đã xóa sản phẩm ");
                        }

                        response.setCode("00");
                    }
                }
                if(!isHaveInList){
                    response.setCode("99");
                    response.setMessage("Data invalid");
                }
            }

//            delete product in cast
            if (p.getType() == 3) {
                for (ProductModel pm : productInCart) {
//                    p.getNumber la so san pham muon them
//                    check sô sản phẩm hiện tại trong DB lớn hon number
                    if (p.getId().equals(pm.getId())
                            && p.getNumber() > 0 &&
                            p.getNumber() <= pm.getNumber() &&
                            p.getNameColor().equals(pm.getNameColor())) {
                        productDelete = pm;
                        response.setMessage("đã xóa sản phẩm");
                    } else {
                        response.setCode("99");
                        response.setMessage("Data invalid");
                    }
                }
                response.setCode("00");
                if (productDelete != null) {
                    productInCart.remove(productDelete);
                }
            }
        }
        exitsOrder.setListProduct(productInCart);
        response.setCode("00");
        response.setMessage("Update giỏ hàng thành công");
        response.setData(orderRepository.save(exitsOrder));
        return response;
    }

}
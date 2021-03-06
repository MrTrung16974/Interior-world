package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.product.ProductCast;
import com.example.mongodb.dto.user.UpdateCastRequest;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.dto.product.ProductModel;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.services.OrderServices;
import com.example.mongodb.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class OrderApiController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderServices orderServices;

    @Autowired
    ProductRepository productRepository;

    //    get product prodcut now in user
    @RequestMapping("/order-single/{idOrder}")
    public BaseResponse getSingleOrderById(@PathVariable("idOrder") String idOrder) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optionalOrder = orderRepository.findById(idOrder);
//        1, new account
//        2, Just Order
        if (!optionalOrder.isPresent()) {
            response.setCode("99");
            response.setMessage("Data not found");
            response.setData(null);
        }else {
            Order exits = optionalOrder.get();
            response.setCode("00");
            response.setMessage("'Find order success for" + idOrder);
            response.setData(exits);
        }
        return response;
    }

//    get product prodcut now in user
    @RequestMapping("/order/{idUser}")
    public BaseResponse getSingleOrderByUser(@PathVariable("idUser") String idUser) {
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

    //    get product did checkout prodcut now in user
    @RequestMapping("/order/did-checkout-products/{idUser}")
    public BaseResponse getOrderCheckoutedByUser(@PathVariable("idUser") String idUser) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optionalOrder = orderRepository.findByBuyerAndStatus(idUser, 2);
//        1, new account
//        2, Just Order
        if (!optionalOrder.isPresent()) {
            response.setCode("99");
            response.setMessage("Data not found");
            response.setData(null);
        }else {
            Order exits = optionalOrder.get();
            response.setCode("00");
            response.setMessage("'Find order success for" + idUser);
            response.setData(exits);
        }
        return response;
    }

    //    get product prodcut now in user
    @RequestMapping("/order/search")
    public BaseResponse getAllOrderByUser(@RequestParam("idUser") String idUser,
                                          @RequestParam("idOrder") String idOrder,
                                          @RequestParam("email") String email) {
        BaseResponse response = new BaseResponse();

        Order order = new Order();
        try {
            if(Utils.checkNullOrEmpty(idUser)) {
                throw new Exception("You need login!");
            }
            if(!Utils.checkNullOrEmpty(idOrder)) {
                order.setId(idOrder);
            }
            if(!Utils.checkNullOrEmpty(email)) {
                order.setEmail(email);
            }
            order.setBuyer(idUser);

            Optional<List<Order>> optionalOrder = Optional.ofNullable(orderServices.advancedSearch(order, 3));
    //        1, new account
    //        2, Just Order
            if (!optionalOrder.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
                return response;
            }else {
                List<Order> listExits = optionalOrder.get();
                response.setCode("00");
                response.setMessage("'Find order success for " + idUser);
                response.setData(listExits);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    @RequestMapping(value = "/order/update/{id}", method = RequestMethod.POST)
    public  BaseResponse updateCastByUser(@PathVariable("id") String id,
            @RequestBody UpdateCastRequest updateCastRequest) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optOrder = orderRepository.findByBuyerAndStatus(id, 1);
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
                    // thêm type
                    productModel.setType(exitsProduct.getType());
                    // thêm price for color
                    productModel.setPriceForColor(exitsProduct.getPriceForColor());

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
                        productModel.setType(exitsProduct.getType());
                        productModel.setPriceForColor(exitsProduct.getPriceForColor());

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
        exitsOrder.setCreatedAt(new Date());
        response.setCode("00");
        response.setMessage("Update giỏ hàng thành công");
        response.setData(orderRepository.save(exitsOrder));
        return response;
    }

    //    checkout product now in user
    @PutMapping("/order/checkout-products")
    public BaseResponse checkoutProductInOrderByUser(@RequestParam("idUser") String idUser,
                                              @RequestParam("shippingRates") Integer shippingRates) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optionalOrder = orderRepository.findByBuyerAndStatus(idUser, 1);
        Optional<Order> optionalCheckoutOrder = orderRepository.findByBuyerAndStatus(idUser, 2);
//        1, new account
//        2, Just Order
        try{
            if(optionalCheckoutOrder.isPresent()) {
                throw new Exception("You need to contact us to pay for old orders! To be able to continue ordering!");
            }
            if(shippingRates == null) {
                throw new Exception("You need to choose shipping rate!");
            }
            if(idUser == null) {
                throw new Exception("You need login!");
            }
            if (!optionalOrder.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                Order exits = optionalOrder.get();
                Double price_number = 0.0;
                exits.setStatus(2);
                for (ProductModel p : exits.getListProduct()) {
                    price_number += (p.getPrice() * p.getNumber());
                }
                exits.setTotalPrice(price_number);
                exits.setFlatRateShipping(price_number+shippingRates);
                exits.setTotalProductOrder(exits.getListProduct().size());
                exits.setShippingRates(shippingRates);
                exits.setCreatedAt(new Date());
                Order orderExit = orderRepository.save(exits);
                response.setCode("00");
                response.setMessage("'Successful product check out by" + idUser);
                response.setData(orderExit);
            }
        }catch (Exception e) {
            response.setCode("90");
            response.setMessage("Error" + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    //    contactus product now in user
    @PutMapping("/order/contactus-products")
    public BaseResponse contactusProductOrderByUser(@RequestParam("userName") String userName,
                                               @RequestParam("phone") String phone,
                                               @RequestParam("email") String email,
                                               @RequestParam("fullName") String fullName,
                                               @RequestParam("billingAddress") String billingAddress,
                                               @RequestParam("shippingAddress") String shippingAddress,
                                               @RequestParam("paymentType") String paymentType,
                                               @RequestParam("noteSeller") String noteSeller) {
        BaseResponse response = new BaseResponse();
        Optional<Order> optionalCheckoutOrder = orderRepository.findByBuyerAndStatus(userName, 2);
        try{
            if(userName == null) {
                throw new Exception("You need login!");
            }
            if (!optionalCheckoutOrder.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                Order exits = optionalCheckoutOrder.get();
                if(exits == null) {
                    throw new Exception("Order not exit!");
                }
                exits.setStatus(3);
                if(phone != null) {
                    exits.setPhone(phone);
                }
                if(email != null) {
                    exits.setEmail(email);
                }
                if(fullName != null) {
                    exits.setFullName(fullName);
                }
                if(paymentType != null) {
                    exits.setPaymentType(paymentType);
                }
                if(billingAddress != null) {
                    exits.setBillingAddress(billingAddress);
                }
                if(shippingAddress != null) {
                    exits.setShippingAddress(shippingAddress);
                }
                if(noteSeller != null) {
                    exits.setNoteSeller(noteSeller);
                }
                exits.setCreatedAt(new Date());
                Order orderExit = orderRepository.save(exits);
                response.setCode("00");
                response.setMessage("Successful product payment by " + userName);
                response.setData(orderExit);
            }
        }catch (Exception e) {
            response.setCode("90");
            response.setMessage("Error" + e.getMessage());
            response.setData(null);
        }
        return response;
    }

}
package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.product.Color;
import com.example.mongodb.dto.product.Price;
import com.example.mongodb.dto.product.Type;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.model.Role;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.services.ProductService;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/product")
public class ProductController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);
    private static final Gson gson = new Gson();
    private static final String TITLE_VIEW = "View product";
    private static final String TITLE_ADD = "Add product";
    private static final String TITLE_EDIT = "Update info product";
    private static final String TITLE_DELETE = "Delete product";

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @RequestMapping("/list")
    public ModelAndView listProduct(HttpServletRequest request,
                              Principal principal) {
        String tag = buildLogTag(request, principal, "List Product");
        LOGGER.debug(LOG_FORMAT, tag, "List product view");
        ModelAndView mv = new ModelAndView("product/list-product");
        mv.addObject("lstProduct",productRepository.findAll());
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }

    @RequestMapping("/search")
    @ResponseBody
    public BaseResponse search(@RequestParam("name") String name,
                               @RequestParam("material") Integer material,
                               @RequestParam("category") Integer category,
                               @RequestParam("color") Integer color,
                               HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Search Product");
        LOGGER.debug(LOG_FORMAT + "name: {}, material: {}, category: {}, color: {}", tag, "Search product. ", name, material, category, color);
        BaseResponse response = new BaseResponse();
//        Declare
        Product product = new Product();
        Type type = new Type();
        type.setType(category);
        type.setMaterial(material);
        product.setName(name);
        product.setType(type);

        LOGGER.debug(LOG_FORMAT, tag, "Product: " + gson.toJson(product));
        List<Product> lstProduct = new ArrayList<>();
        try {
            lstProduct = productService.findProduct(product, color);
            response.setCode("00");
            response.setMessage("Find product success!");
            response.setData(lstProduct);

        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error while searching user: " + e.getMessage());
            LOGGER.error(tag, e);
            response.setCode("99");
            response.setMessage("Find product error");
            response.setData(null);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstProduct.size() + " products");
        //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
        return response;
    }

    @RequestMapping(value = "/view_product/{id}", method = RequestMethod.GET)
    public ModelAndView viewProductForm(@PathVariable String id, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "View Product");
        LOGGER.debug(LOG_FORMAT, tag, "Edit Product View. Product: " + id);
        Product product = productRepository.findById(id).get();
        if (product == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Product not found. Throw Exception. ProductID: " + id);
            throw new RuntimeException("Invalid product! " + id);
        }
        return getUserModelView(product, TITLE_VIEW, null, null);
    }


    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView addProductForm(HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add User");
        LOGGER.debug(LOG_FORMAT, tag, "Add User View");
        Product product = new Product();
        return getUserModelView(product, TITLE_ADD, null, null);
    }

    private ModelAndView getUserModelView(Product product, String title, Boolean success, String message) {
        List<Product> lstProduct = productRepository.findAll();
        ModelAndView mv = new ModelAndView("product/form-product");
        mv.addObject("product", product);
        mv.addObject("lstRole", lstProduct);
        mv.addObject("titlePage", title);
        if (success != null) {
            mv.addObject("success", success);
        }
        if (message != null) {
            mv.addObject("message", message);
        }
        return mv;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ModelAndView doAddProduct(@RequestParam("userName") String userName,
                                  @RequestParam("fullName") String fullName,
                                  @RequestParam("role") String role,
                                  @RequestParam("email") String email,
                                  @RequestParam("password") String password,
                                  Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add User");
        LOGGER.debug(LOG_FORMAT + "Username: {}, fullName: {}, email: {}, role: {}", tag, " ", userName, fullName, email,role);
        Product product = new Product();
        boolean success = true;
        String message = "Thêm mới người dùng " + userName + " thành công!";
        try {

//
            LOGGER.debug(LOG_FORMAT, tag, "Inserting to DB. User: " + gson.toJson(product));
            productService.addProduct(product);
            LOGGER.debug(LOG_FORMAT, tag, "Add new user successfully!");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Exception while adding user!");
            LOGGER.error(tag, e);
            success = false;
            message = "Thêm mới người dùng thất bại. Vui lòng thử lại sau!";
        }
        return getUserModelView(new Product(), TITLE_ADD, success, message);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editProductForm(@PathVariable String id, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT, tag, "Edit User View. Username: " + id);
        Product product = productRepository.findById(id).get();
        if (product == null) {
            LOGGER.debug(LOG_FORMAT, tag, "User not found. Throw Exception. Username: " + id);
            throw new RuntimeException("Invalid user! " + id);
        }
        return getUserModelView(product, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView doUpdateProduct(@PathVariable String id,
                                     @RequestParam("fullName") String fullName,
                                     @RequestParam("email") String email,
                                     @RequestParam("role") String role,
                                     Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT + " UserID: {}, fullName: {},email:{}, role: {}", tag, "Edit User.", id, fullName,email, role);
        Product checkProduct = productRepository.findById(id).get();
        if (checkProduct == null) {
            LOGGER.error(LOG_FORMAT, tag, "User not found:" + id);
            throw new RuntimeException("Invalid user");
        }
        boolean success = true;
        String message = "Cập nhật thông tin người dùng thành công!";
        try {
//            checkProduct.setFullName(fullName);
//            checkProduct.setEmail(email);
//            checkProduct.setRoleID(role);
//            LOGGER.debug(LOG_FORMAT, tag, "Edit User. user: " + gson.toJson(checkProduct));
//            Set<ConstraintViolation<User>> constraints = validator.validate(checkProduct);
//            constraints.forEach((constraint) -> {
//                LOGGER.debug(LOG_FORMAT, tag, "Validate field: " + constraint.getMessage());
//            });
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            productRepository.save(checkProduct);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit user: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "Update info product failure. Please try again!";
        }

        return getUserModelView(checkProduct, TITLE_EDIT, success, message);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public long deleteProduct(@RequestParam("id") String id,
                            HttpServletRequest request, Model model, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Update Status Product");
        LOGGER.debug(LOG_FORMAT, tag, "DeleteOrder:" + id);
        //modified count
        long modifiedCnt = 0;
        Product checkProduct = productRepository.findById(id).get();
        if (checkProduct == null) {
            LOGGER.error(LOG_FORMAT, tag, "User not found:" + id);
            return modifiedCnt;
        }
        try {
            productRepository.delete(checkProduct);
            modifiedCnt = 1;
            LOGGER.debug(LOG_FORMAT, tag, "Delete Product successfully");
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error occur while deleteing . Product Id: " + id);
            LOGGER.error(tag, e);
        }
        return modifiedCnt;
    }
}

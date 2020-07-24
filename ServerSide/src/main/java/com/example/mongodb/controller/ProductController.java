package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.product.Promotion;
import com.example.mongodb.dto.product.Type;
import com.example.mongodb.dto.product.Price;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.services.ProductService;
import com.example.mongodb.utils.Utils;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/product")
public class ProductController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);
    private static final Gson gson = new Gson();
    private static final String TITLE_VIEW = "View info product";
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
        mv.addObject("lstProduct", lstProduct);
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
    public ModelAndView doAddProduct(@RequestParam("name") String name,
                                  @RequestParam("price") String price,
                                  @RequestParam("idColor") List<String> idColor,
                                  @RequestParam("priceColor") List<String> priceColor,
                                  @RequestParam("description") String description,
                                  @RequestParam("longDescription") String longDescription,
                                  @RequestParam("chkImage") List<String> image,
                                  @RequestParam("promotion.name") String promotionName,
                                  @RequestParam("promotion.percent") String promotionPercent,
                                  @RequestParam("category") String type,
                                  @RequestParam("material") String material,
                                  @RequestParam("type.width") String width,
                                  @RequestParam("type.height") String height,
                                  @RequestParam("type.depth") String depth,
                                  @RequestParam("type.weight") String weight,
                                  @RequestParam("qualityChecking") String qualityChecking,
                                  @RequestParam("star") String star,
                                  Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add Product");
        LOGGER.debug(LOG_FORMAT + "name: {}, price: {}, idColor: {}, priceColor: {}, description: {}, " +
                        "longDescription: {}, image: {}, promotionName: {}, promotionPercent: {}, type: {}, " +
                        "material: {}, width: {}, height: {}, weight: {}, " +
                        "qualityChecking: {}, star: {}", tag, " ", name, price, idColor, priceColor, description,
                longDescription, image, promotionName, promotionPercent, type,
                material, width, height, weight,
                qualityChecking, star);
        Product product = new Product();
        boolean success = true;
        String message = "Add new product " + name + " success!";
        try {
            if(!Utils.checkNullOrEmpty(name)) {
                product.setName(name);
            }
            if(!Utils.checkNullOrEmpty(price)) {
                product.setPrice(Double.valueOf(price));
            }
            if(!Utils.checkNullOrEmpty(description)) {
                product.setDescription(description);
            }
            if(!Utils.checkNullOrEmpty(longDescription)) {
                product.setLongDescription(longDescription);
            }
            if(!Utils.checkNullOrEmpty(image)) {
                product.setImage(image);
            }
            if(!Utils.checkNullOrEmpty(idColor) && !Utils.checkNullOrEmpty(priceColor)) {
                List<Price> lstPrice = new ArrayList<>();
                Integer length = idColor.size();
                if(length > 0) {
                    Price price1 = new Price(Integer.parseInt(idColor.get(0)), Utils.getNameColor(Integer.parseInt(idColor.get(0))), Double.valueOf(priceColor.get(0)));
                    lstPrice.add(price1);
                }
                if(length > 1) {
                    Price price2 = new Price(Integer.parseInt(idColor.get(1)), Utils.getNameColor(Integer.parseInt(idColor.get(1))), Double.valueOf(priceColor.get(1)));
                    lstPrice.add(price2);
                }
                if(length > 2) {
                    Price price3 = new Price(Integer.parseInt(idColor.get(2)), Utils.getNameColor(Integer.parseInt(idColor.get(2))), Double.valueOf(priceColor.get(2)));
                    lstPrice.add(price3);
                }
                if(length > 3) {
                    Price price4 = new Price(Integer.parseInt(idColor.get(3)), Utils.getNameColor(Integer.parseInt(idColor.get(3))), Double.valueOf(priceColor.get(3)));
                    lstPrice.add(price4);
                }
                if(length > 4) {
                    Price price5 = new Price(Integer.parseInt(idColor.get(4)), Utils.getNameColor(Integer.parseInt(idColor.get(4))), Double.valueOf(priceColor.get(4)));
                    lstPrice.add(price5);
                }
                product.setPriceForColor(lstPrice);
            }
            if(!Utils.checkNullOrEmpty(promotionName) || !Utils.checkNullOrEmpty(promotionPercent)) {
                product.setPromotion(new Promotion(promotionName, Integer.parseInt(promotionPercent)));
            }
            if(!Utils.checkNullOrEmpty(name)) {
                product.setName(name);
            }
            product.setType(new Type(Integer.parseInt(type), Integer.parseInt(material), Integer.parseInt(width),
                    Integer.parseInt(height),Integer.parseInt(depth),Integer.parseInt(weight), qualityChecking));
            if(!Utils.checkNullOrEmpty(star)) {
                product.setStar(Integer.parseInt(star));
            }

            LOGGER.debug(LOG_FORMAT, tag, "Inserting to DB. Product: " + gson.toJson(product));
            productService.addProduct(product);
            LOGGER.debug(LOG_FORMAT, tag, "Add new product successfully!");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Exception while adding user!");
            LOGGER.error(tag, e);
            success = false;
            message = "Adding new products failed. Please try again later!";
        }
        return getUserModelView(new Product(), TITLE_ADD, success, message);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editProductForm(@PathVariable String id, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT, tag, "Edit User View. Username: " + id);
        Product product = productRepository.findById(id).get();
        if (product == null) {
            LOGGER.debug(LOG_FORMAT, tag, "User not found. Throw Exception. ProductID: " + id);
            throw new RuntimeException("Invalid Product! " + id);
        }
        return getUserModelView(product, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView doUpdateProduct(@PathVariable String id,
                                        @RequestParam("name") String name,
                                        @RequestParam("price") String price,
                                        @RequestParam("idColor") List<String> idColor,
                                        @RequestParam("priceColor") List<String> priceColor,
                                        @RequestParam("description") String description,
                                        @RequestParam("longDescription") String longDescription,
                                        @RequestParam("chkImage") List<String> image,
                                        @RequestParam("promotion.name") String promotionName,
                                        @RequestParam("promotion.percent") String promotionPercent,
                                        @RequestParam("category") String type,
                                        @RequestParam("material") String material,
                                        @RequestParam("type.width") String width,
                                        @RequestParam("type.height") String height,
                                        @RequestParam("type.depth") String depth,
                                        @RequestParam("type.weight") String weight,
                                        @RequestParam("qualityChecking") String qualityChecking,
                                        @RequestParam("star") String star,
                                     Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit Product");
        LOGGER.debug(LOG_FORMAT + "name: {}, price: {}, idColor: {}, priceColor: {}, description: {}, " +
                        "longDescription: {}, image: {}, promotionName: {}, promotionPercent: {}, type: {}, " +
                        "material: {}, width: {}, height: {}, weight: {}, " +
                        "qualityChecking: {}, star: {}", tag, " ", name, price, idColor, priceColor, description,
                longDescription, image, promotionName, promotionPercent, type,
                material, width, height, weight,
                qualityChecking, star);
        Product checkProduct = productRepository.findById(id).get();
        if (checkProduct == null) {
            LOGGER.error(LOG_FORMAT, tag, "Product not found:" + id);
            throw new RuntimeException("Invalid Product");
        }
        boolean success = true;
        String message = "Update product information successfully!";
        try {
            if(!Utils.checkNullOrEmpty(name)) {
                checkProduct.setName(name);
            }
            if(!Utils.checkNullOrEmpty(price)) {
                checkProduct.setPrice(Double.valueOf(price));
            }
            if(!Utils.checkNullOrEmpty(description)) {
                checkProduct.setDescription(description);
            }
            if(!Utils.checkNullOrEmpty(longDescription)) {
                checkProduct.setLongDescription(longDescription);
            }
            if(!Utils.checkNullOrEmpty(image)) {
                checkProduct.setImage(image);
            }
            if(!Utils.checkNullOrEmpty(idColor) && !Utils.checkNullOrEmpty(priceColor)) {
                List<Price> lstPrice = new ArrayList<>();
                Integer length = idColor.size();
                if(length > 0) {
                    Price price1 = new Price(Integer.parseInt(idColor.get(0)), Utils.getNameColor(Integer.parseInt(idColor.get(0))), Double.valueOf(priceColor.get(0)));
                    lstPrice.add(price1);
                }
                if(length > 1) {
                    Price price2 = new Price(Integer.parseInt(idColor.get(1)), Utils.getNameColor(Integer.parseInt(idColor.get(1))), Double.valueOf(priceColor.get(1)));
                    lstPrice.add(price2);
                }
                if(length > 2) {
                    Price price3 = new Price(Integer.parseInt(idColor.get(2)), Utils.getNameColor(Integer.parseInt(idColor.get(2))), Double.valueOf(priceColor.get(2)));
                    lstPrice.add(price3);
                }
                if(length > 3) {
                    Price price4 = new Price(Integer.parseInt(idColor.get(3)), Utils.getNameColor(Integer.parseInt(idColor.get(3))), Double.valueOf(priceColor.get(3)));
                    lstPrice.add(price4);
                }
                if(length > 4) {
                    Price price5 = new Price(Integer.parseInt(idColor.get(4)), Utils.getNameColor(Integer.parseInt(idColor.get(4))), Double.valueOf(priceColor.get(4)));
                    lstPrice.add(price5);
                }
                checkProduct.setPriceForColor(lstPrice);
            }
            if(!Utils.checkNullOrEmpty(promotionPercent) || !Utils.checkNullOrEmpty(promotionName)) {
                checkProduct.setPromotion(new Promotion(promotionName, Integer.parseInt(promotionPercent)));
            }
            if(!Utils.checkNullOrEmpty(name)) {
                checkProduct.setName(name);
            }
            checkProduct.setType(new Type(Integer.parseInt(type), Integer.parseInt(material), Integer.parseInt(width),
                    Integer.parseInt(height),Integer.parseInt(depth),Integer.parseInt(weight), qualityChecking));
            if(!Utils.checkNullOrEmpty(star)) {
                checkProduct.setStar(Integer.parseInt(star));
            }
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            productRepository.save(checkProduct);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit product: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "Update info product failure. Please try again!";
        }

        return getUserModelView(checkProduct, TITLE_EDIT, success, message);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
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

package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.product.ProductModel;
import com.example.mongodb.model.Category;
import com.example.mongodb.model.Material;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.*;
import com.example.mongodb.services.ProductService;
import com.example.mongodb.services.StoreFileService;
import com.example.mongodb.services.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class ProductApIController {
    @Autowired
    StoreFileService storeFileService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductService productService;

    @Autowired
    TokenAuthenticationService tokenAuthenticationService;

    @Autowired
    UserRepository userRepository;

    //    Upload file img
    @PostMapping("/upload")
    public String singleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileName = "";
        String fileLink = "http://localhost:8099/aroma/link/";
        try {
            if(file.isEmpty()) {
                throw new Exception();
            }
            fileName = storeFileService.store(file);
            fileLink += fileName;
        }catch (Exception e) {
            e.printStackTrace();
        }
        return fileLink;
    }

    @GetMapping("/product/search")
    public BaseResponse searchProduct(@RequestParam(value = "name", required = false)String name,
                              @RequestParam(value = "material", defaultValue = "")String material,
                              @RequestParam(value = "color", defaultValue = "")Integer color,
                              @RequestParam(value = "type", defaultValue = "")String type,
                              @RequestParam(value = "sort", defaultValue = "1")Integer sort,
                              @RequestParam("page") int page,
                              @RequestParam("perPage") int perPage){
        BaseResponse response = new BaseResponse();
        try {
            Pageable pageable;
//            sort product
            switch (sort) {
                case 1:
                    pageable = PageRequest.of(page, perPage, Sort.by(Sort.Direction.ASC,"createAt"));
                    break;
                case 2:
                    pageable = PageRequest.of(page, perPage, Sort.by(Sort.Direction.ASC,"price"));
                    break;
                case 3:
                    pageable = PageRequest.of(page, perPage, Sort.by(Sort.Direction.DESC,"price"));
                    break;
                default:
                    pageable = PageRequest.of(page, perPage, Sort.by(Sort.Direction.ASC,"id"));
                    break;
            }
//            phân trang
            Page<Product> listProduct = productService.advancedSearch(name, color, material, type, pageable);
            if (!listProduct.isEmpty()) {
                response.setCode("00");
                response.setMessage("List actor search by key: " + name);
                response.setData(listProduct);
            } else {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/product/latest")
    public BaseResponse latestProduct(){
        BaseResponse response = new BaseResponse();
        try {
            Optional<List<Product>> listLatestProduct = productRepository.findTop6ByOrderByCreateAtAsc();
            if (!listLatestProduct.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                List<Product> listExitProduct = listLatestProduct.get();
                response.setCode("00");
                response.setMessage("success");
                response.setData(listLatestProduct);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/product/best-sellers")
    public BaseResponse bestSellers(){
        BaseResponse response = new BaseResponse();
        try {
            Optional<List<Order>> listLatestProduct = orderRepository.findAllByStatusGreaterThan(2);
            Optional<List<Product>> listAllProduct = Optional.of(productRepository.findAll());
            if (!listLatestProduct.isPresent() && !listAllProduct.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                List<Order> listExitProduct = listLatestProduct.get();
                List<Product> listAllExitProduct = listAllProduct.get();
                List<ProductModel> lstProductBestSellers = new ArrayList<>();
                Set<Product> lstDuplicateProductBestSellers = new HashSet<>();

                for (Order order: listExitProduct) {
                    if(order.getListProduct() != null && order.getListProduct().size() > 0) {
                        for (ProductModel pm : order.getListProduct()) {
                            lstProductBestSellers.add(pm);
                        }
                    }
                }
                for (Product p : listAllExitProduct) {
                    for (ProductModel pm : lstProductBestSellers) {
                        if(p.getId().equals(pm.getId())) {
                            lstDuplicateProductBestSellers.add(p);
                        }
                    }
                }
                response.setCode("00");
                response.setMessage("success");
                response.setData(lstDuplicateProductBestSellers);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
            return response;
    }

    @GetMapping("/product/trending")
    public BaseResponse trendingProduct(){
        BaseResponse response = new BaseResponse();
        try {
            Optional<List<Product>> listTrendingProduct = productRepository.findTop12ByStarOrderByCreateAtAsc(5);
            if (!listTrendingProduct.isPresent()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                List<Product> listExitProduct = listTrendingProduct.get();
                response.setCode("00");
                response.setMessage("success");
                response.setData(listExitProduct);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/product/category/{type}")
    public BaseResponse catetoryProduct(@PathVariable("type") String type){
        BaseResponse response = new BaseResponse();
        try {
            List<Product> listCatetoryProduct = productService.findByCatetory(type);
            if (listCatetoryProduct.isEmpty()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                response.setCode("00");
                response.setMessage("success");
                response.setData(listCatetoryProduct);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/product/{id}")
    public BaseResponse getSingleProduct(@PathVariable("id") String id){
        BaseResponse response = new BaseResponse();
        try {
            Optional<Product> optListProduct = productRepository.findById(id);
            if (optListProduct.isPresent()) {
                Product exitProduct = optListProduct.get();
                response.setCode("00");
                response.setMessage("List actor search by key: " + id);
                response.setData(exitProduct);
            } else {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @PostMapping("/product")
    public BaseResponse createProduct(
            @RequestBody ProductModel productRequest) throws ParseException {
        BaseResponse response = new BaseResponse();
        if(productRequest == null) {
            response.setCode("99");
            response.setMessage("Found not data");
            response.setData(null);
            return response;
        }
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setNumber(0);
        product.setImage(productRequest.getImage());
        product.setType(productRequest.getType());
        product.setPrice(productRequest.getPrice());
        product.setPriceForColor(productRequest.getPriceForColor());
        product.setPromotion(productRequest.getPromotion());
        product.setStar(productRequest.getStar());
        product.setCreateAt(new Date());
        Product exitProduct = productRepository.save(product);
        response.setCode("00");
        response.setMessage("Success");
        response.setData(exitProduct);
        return response;
    }

    @PutMapping("/product/{id}")
    public BaseResponse editProduct(@PathVariable("id") String id,
                                    @RequestBody ProductModel productRequest){
        BaseResponse response = new BaseResponse();
        Optional<Product> optProduct = productRepository.findById(id);

        if(!optProduct.isPresent()) {
            response.setCode("99");
            response.setMessage("Found not data");
            response.setData(null);
            return response;
        }
        Product oldProduct = optProduct.get();
        if(!productRequest.getName().isEmpty()) {
            oldProduct.setName(productRequest.getName());
        }
        if(productRequest.getNumber() > 0) {
            oldProduct.setNumber(0);
        }
        if(productRequest.getImage() != null) {
            oldProduct.setImage(productRequest.getImage());
        }
        if(productRequest.getType() != null) {
            oldProduct.setType(productRequest.getType());
        }
        if(productRequest.getPrice() > 0) {
            oldProduct.setPrice(productRequest.getPrice());
        }
        if(!productRequest.getPriceForColor().isEmpty()) {
            oldProduct.setPriceForColor(productRequest.getPriceForColor());
        }
        if(productRequest.getPromotion() != null) {
            oldProduct.setPromotion(productRequest.getPromotion());
        }
        if(productRequest.getStar() > 0) {
            oldProduct.setStar(productRequest.getStar());
        }
        Product exitProduct = productRepository.save(oldProduct);
        response.setCode("00");
        response.setMessage("Edit Success");
        response.setData(exitProduct);
        return response;
    }

    @DeleteMapping("/product/{id}")
    public BaseResponse deleteProduct(@PathVariable("id") String id){
        BaseResponse response = new BaseResponse();
        Optional<Product> optProduct = productRepository.findById(id);

        if(!optProduct.isPresent()) {
            response.setCode("99");
            response.setMessage("Found not data");
            response.setData(null);
            return response;
        }
        Product exitProduct = optProduct.get();
        productRepository.delete(exitProduct);
        response.setCode("00");
        response.setMessage("Delete Success");
        response.setData(exitProduct);
        return response;
    }

    @GetMapping("/product/all-category")
    public BaseResponse getAllCategoryProduct(){
        BaseResponse response = new BaseResponse();
        try {
            List<Category> listCatetory = categoryRepository.findAll();
            if (listCatetory.isEmpty()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                response.setCode("00");
                response.setMessage("success");
                response.setData(listCatetory);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

    @GetMapping("/product/all-material")
    public BaseResponse getAllMaterialProduct(){
        BaseResponse response = new BaseResponse();
        try {
            List<Material> listMaterial = materialRepository.findAll();
            if (listMaterial.isEmpty()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            } else {
                response.setCode("00");
                response.setMessage("success");
                response.setData(listMaterial);
            }
        } catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }
}

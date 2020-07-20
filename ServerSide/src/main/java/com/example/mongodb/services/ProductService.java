package com.example.mongodb.services;

import com.example.mongodb.model.Product;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class ProductService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    ProductRepository productRepository;

    public void addProduct(Product product) {
        productRepository.save(product);
    }


    public List<Product> findProduct(Product product, Integer color) throws Exception {
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!Utils.checkNullOrEmpty(product.getName())){
            query.addCriteria(Criteria.where("name").regex(Pattern.compile(Pattern.quote(product.getName()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(product.getType().getType())) {
            query.addCriteria(Criteria.where("type.type").is(product.getType().getType()));
        }
        if(!Utils.checkNullOrEmpty(product.getType().getMaterial())) {
            query.addCriteria(Criteria.where("type.material").is(product.getType().getMaterial()));
        }
        if(!Utils.checkNullOrEmpty(color)) {
            query.addCriteria(Criteria.where("price_for_color").elemMatch(Criteria.where("color").is(color)));
//            query.addCriteria(Criteria.where("color").is(color).and("price_for_color.color").is(color));
//            query.fields().include("color").position("price_for_color", color);
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return lstProduct;
    }
//
}

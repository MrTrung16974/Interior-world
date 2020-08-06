package com.example.mongodb.services;

import com.example.mongodb.model.Product;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
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

    //tìm kiếm product theo name và giá tiền
    public Page<Product> advancedSearch(String name, Integer color, String material, String type, Pageable pageable){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!Utils.checkNullOrEmpty(name)){
            query.addCriteria(Criteria.where("name").regex(Pattern.compile(Pattern.quote(name), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(type)){
            query.addCriteria(Criteria.where("type.type").is(type));
        }
        if(!Utils.checkNullOrEmpty(material)){
            query.addCriteria(Criteria.where("type.material").is(material));
        }
        if(!Utils.checkNullOrEmpty(color)){
            query.addCriteria(Criteria.where("price_for_color").elemMatch(Criteria.where("color").is(color)));
        }
        //nếu khác null là phân trang và sắp xếp theo pageanable
        if(pageable != null){
            query.with(pageable);
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return PageableExecutionUtils.getPage(
                lstProduct,
                pageable,
                () -> mongoTemplate.count(Query.of(query).limit(-1).skip(-1), Product.class));
    }

    public List<Product> findByCatetory(String type){
        Query query = new Query();

        query.addCriteria(Criteria.where("star").is(5));
        query.limit(12);
        if(!Utils.checkNullOrEmpty(type)) {
            query.addCriteria(Criteria.where("type.type").is(type));
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return lstProduct;
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
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return lstProduct;
    }
}

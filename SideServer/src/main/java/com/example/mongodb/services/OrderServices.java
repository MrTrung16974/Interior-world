package com.example.mongodb.services;

import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServices {

   @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public List<Product> search(String name, Integer color, Integer material, Integer type, Long startPrice,Long endPrice, Pageable pageable){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!name.isEmpty()  && name != null){
            query.addCriteria(Criteria.where("name").regex(name));
        }
        //check giá lớn hơn 0  mới thêm điều kiện search
        if(startPrice > 0 && endPrice>0  && startPrice != null && endPrice != null){
            query.addCriteria(Criteria.where("price").lte(startPrice).gt(endPrice));
        }
        if(type > 0 && type != null) {
            query.addCriteria(Criteria.where("type").in(type));
        }
        if(color > 0 && color != null) {
            query.addCriteria(Criteria.where("color").lte(startPrice).gt(endPrice));
        }
        if(material > 0 && material != null) {
            query.addCriteria(Criteria.where("material").lte(startPrice).gt(endPrice));

        }
        //nếu khác null là phân trang và sắp xếp theo pageanable
        if(pageable != null){
            query.with(pageable);
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return lstProduct;
    }
}
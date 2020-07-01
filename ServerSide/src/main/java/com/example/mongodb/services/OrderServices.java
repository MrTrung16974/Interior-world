package com.example.mongodb.services;

import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServices {

   @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public Page<Product> advancedSearch(String name, Integer color, Integer material, Integer type, Pageable pageable){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!name.isEmpty()  && name != null){
            query.addCriteria(Criteria.where("name").regex(name));
        }
        if(type > 0 && type != null) {
            query.addCriteria(Criteria.where("type.type").is(type-1));
        }
        if(material > 0 && material != null) {
            query.addCriteria(Criteria.where("type.material").is(material-1));
        }
        if(color > 0 && color != null) {
            query.addCriteria(Criteria.where("price_for_color.color").is(color));
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
}
package com.example.mongodb.services;

import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.mongodb.client.MongoClient;
import org.bson.types.ObjectId;
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

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class OrderServices {

   @Autowired
    MongoTemplate mongoTemplate;

    //tìm kiếm product theo name và giá tiền
    public Page<Product> advancedSearch(String name, Integer color, Integer material, Integer type, Pageable pageable){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!name.isEmpty()  && name != null){
            query.addCriteria(Criteria.where("name").regex(Pattern.compile(Pattern.quote(name), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(type > 0 && type != null) {
            query.addCriteria(Criteria.where("type.type").is(type));
        }
        if(material > 0 && material != null) {
            query.addCriteria(Criteria.where("type.material").is(material));
        }
        if(color > 0 && color != null) {
            query.addCriteria(Criteria.where("price_for_color").elemMatch(Criteria.where("color").is(color)));
//            query.addCriteria(Criteria.where("color").is(color).and("price_for_color.color").is(color));
//            query.fields().include("color").position("price_for_color", color);
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

    public List<Product> findByCatetory(Integer type){
        Query query = new Query();

        query.addCriteria(Criteria.where("star").is(5));
        query.limit(12);
        if(type >= 0 && type != null) {
            query.addCriteria(Criteria.where("type.type").is(type));
        }
        List<Product> lstProduct = mongoTemplate.find(query, Product.class);
        return lstProduct;
    }

    public static <T> List<T> removeDuplicates(List<T> list)
    {

        // Create a new ArrayList
        List<T> newList = new ArrayList<T>();

        // Traverse through the first list
        for (T element : list) {

            // If this element is not present in newList
            // then add it
            if (!newList.contains(element)) {

                newList.add(element);
            }
        }

        // return the new list
        return newList;
    }
}
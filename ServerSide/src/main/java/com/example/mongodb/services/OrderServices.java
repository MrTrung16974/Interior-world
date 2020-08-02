package com.example.mongodb.services;

import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.utils.Constant;
import com.example.mongodb.utils.Utils;
import com.mongodb.client.MongoClient;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.DateOperators;
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
    public List<Order> advancedSearch(Order order, Integer status){
        Query query = new Query();
        if(!Utils.checkNullOrEmpty(order.getBuyer())) {
            query.addCriteria(Criteria.where("buyer").is(order.getBuyer()));
        }
        if(!Utils.checkNullOrEmpty(order.getId())) {
            query.addCriteria(Criteria.where("id").regex(Pattern.compile(Pattern.quote(order.getId()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(order.getEmail())) {
            query.addCriteria(Criteria.where("email").regex(Pattern.compile(Pattern.quote(order.getId()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        query.addCriteria(Criteria.where("status").gte(status));

        List<Order> lstOrder = mongoTemplate.find(query, Order.class);
        return lstOrder;
    }

    //tìm kiếm product theo name và giá tiền
    public List<Order> findOrder(Order order, String fromDate, String toDate){
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!Utils.checkNullOrEmpty(order.getBuyer())){
            query.addCriteria(Criteria.where("buyer").regex(Pattern.compile(Pattern.quote(order.getBuyer()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(order.getStatus())) {
            query.addCriteria(Criteria.where("status").is(order.getStatus()));
        }

        if(!Utils.checkNullOrEmpty(fromDate) || !Utils.checkNullOrEmpty(toDate)) {
            query.addCriteria(Criteria.where("createdAt").gte(fromDate).and("createdAt").lt(toDate));
        }

        List<Order> lstOrder = mongoTemplate.find(query, Order.class);
        return lstOrder;
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
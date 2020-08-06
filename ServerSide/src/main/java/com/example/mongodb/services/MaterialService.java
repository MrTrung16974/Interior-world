package com.example.mongodb.services;

import com.example.mongodb.model.Material;
import com.example.mongodb.model.Slide;
import com.example.mongodb.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Pattern;

@Service
public class MaterialService {
        @Autowired
        MongoTemplate mongoTemplate;

        //tìm kiếm product theo name và giá tiền
        public List<Material> advancedSearch(Material material){
            Query query = new Query();
            //check name tồn tài mới thêm điều kiện search
            if(!Utils.checkNullOrEmpty(material.getContentMaterial())) {
                query.addCriteria(Criteria.where("content-material").regex(Pattern.compile(Pattern.quote(material.getContentMaterial()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
            }
            List<Material> lstMaterial = mongoTemplate.find(query, Material.class);
            return lstMaterial;
        }
    }

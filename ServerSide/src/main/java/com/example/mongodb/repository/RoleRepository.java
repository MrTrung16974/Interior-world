package com.example.mongodb.repository;

import com.example.mongodb.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoleRepository extends MongoRepository<Role,String> {
    List<Role> findByRoleCodeAndStatus(String code, Integer status);
    Role findByRoleCode(String roleCode);
}

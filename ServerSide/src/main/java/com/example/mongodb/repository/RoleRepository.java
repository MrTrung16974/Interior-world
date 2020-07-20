package com.example.mongodb.repository;

import com.example.mongodb.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends MongoRepository<Role,String> {
    List<Role> findByRoleCodeAndStatus(String code, Integer status);
    Role findByRoleCode(String roleCode);
}

package com.example.mongodb.services;

import com.example.mongodb.model.Role;
import com.example.mongodb.repository.RoleRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private static final Logger LOGGER = LogManager.getLogger(com.example.mongodb.services.RoleService.class);

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    public Role findByRoleCode(String roleID) {
        return roleRepository.findByRoleCode(roleID);
    }
}
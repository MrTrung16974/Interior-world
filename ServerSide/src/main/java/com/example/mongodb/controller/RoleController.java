package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Function;
import com.example.mongodb.model.Role;
import com.example.mongodb.repository.FunctionRepository;
import com.example.mongodb.repository.RoleRepository;
import com.example.mongodb.services.RoleService;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/role")
public class RoleController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);
    private static final Gson gson = new Gson();
    private static final String TITLE_ADD = "Add group role";
    private static final String TITLE_EDIT = "Edit group role";
    private static final String TITLE_VIEW = "View group role";

    @Autowired
    RoleService roleService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    FunctionRepository functionRepository;

    @RequestMapping("/list")
    public ModelAndView ListRole(HttpServletRequest request,
                                             Principal principal) {
        String tag = buildLogTag(request, principal, "List Role");
        LOGGER.debug(LOG_FORMAT, tag, "List role view");
        ModelAndView mv = new ModelAndView("role/list-roles");
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }

    @RequestMapping("/search")
    @ResponseBody
    public BaseResponse search(@RequestParam("roleCode") String roleCode,
                               @RequestParam("status") Integer status,
                               HttpServletRequest request, Model model, Principal principal) {
        String tag = buildLogTag(request, principal, "Search Role");
        LOGGER.debug(LOG_FORMAT + "roleCode: {}, status: {}.", roleCode, status);
        BaseResponse response = new BaseResponse();
        List<Role> lstRole = new ArrayList<>();
        try {
            lstRole = roleRepository.findAll();
            response.setCode("00");
            response.setMessage("Find roles success!");
            response.setData(lstRole);
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error while searching role: " + e.getMessage());
            LOGGER.error(tag, e);
            response.setCode("99");
            response.setMessage("Find role error");
            response.setData(null);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstRole.size() + " users");
        return response;
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView addRole(HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add Role");
        LOGGER.debug(LOG_FORMAT, tag, "Add Role View");
        return getUserModelView(new Role(), TITLE_ADD, null, null);
    }

    private ModelAndView getUserModelView(Role role, String title, Boolean success, String message) {
        ModelAndView mv = new ModelAndView("role/form_role");
        mv.addObject("role", role);
        mv.addObject("titlePage", title);

        List<Function> lstFuncGroup = functionRepository.findAll();
        List<String>  roleFunction = role.getFunctions()
                .stream().map(item -> item.getId())
                .collect(Collectors.toList());
        mv.addObject("lstFuncGroup", lstFuncGroup);
        mv.addObject("roleFunction",roleFunction);
        if (success != null) {
            mv.addObject("success", success);
        }
        if (message != null) {
            mv.addObject("message", message);
        }
        return mv;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ModelAndView doAddRole(@RequestParam("roleCode") String roleCode,
                                  @RequestParam("description") String description,
                                  @RequestParam("chkFunctions") List<String> functions,
                                  Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add Role");
        LOGGER.debug(LOG_FORMAT + " roleCode: {}, description: {}, functions: {}", tag, "Add Role.", roleCode, description, gson.toJson(functions));
        if (roleRepository.findByRoleCode(roleCode) != null) {
            LOGGER.debug(LOG_FORMAT, tag, "Tên nhóm quyền đã tồn tại: " + roleCode);
            return getUserModelView(new Role(), TITLE_ADD, Boolean.FALSE, "Tên nhóm quyền đã tồn tại. Vui lòng kiểm tra lại.");
        }
        Role rol = new Role();
        rol.setRoleCode(roleCode);
        rol.setDescription(description);
        rol.setStatus(1);
        Set<Function> functionSet = new HashSet<>();

        for(String f : functions){
            Function function = functionRepository.findById(f).get();
            functionSet.add(function);
        }
        rol.setFunctions(functionSet);
        roleRepository.save(rol);
        LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");

        return getUserModelView(new Role(), TITLE_ADD, Boolean.TRUE, "Thêm mới nhóm quyền " + roleCode + " thành công");
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editRole(@PathVariable String id,
                                 HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit Role");
        LOGGER.debug(LOG_FORMAT, tag, "Edit role view. ID: " + id);
        Role role = roleRepository.findById(id).get();
        if (role == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Role not found. Throw Exception. Role ID: " + id);
            throw new RuntimeException("Invalid role! " + id);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Role found: " + gson.toJson(role));
        return getUserModelView(role, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}",
            method = RequestMethod.POST)
    public ModelAndView doUpdateRole(@PathVariable String id,
                                     @RequestParam("description") String description,
                                     @RequestParam("chkFunctions") List<String> functions,
                                     Model model, HttpServletRequest request, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Edit Role");
        LOGGER.debug(LOG_FORMAT + "{}. Description: {}, ", tag, "Edit role. ID: " + id);
        boolean success = true;
        String message = "Cập nhật nhóm quyền thành công!";
        Role role = roleRepository.findById(id).get();
        Role updateRole = null;
        try {
            role.setDescription(description);
            Set<Function> functionSet = new HashSet<>();
            for(String f : functions){
                Function function = functionRepository.
                        findById(f).get();
                functionSet.add(function);
            }
            role.setFunctions(functionSet);
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            updateRole = roleRepository.save(role);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");

        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit user: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "Cập nhật nhóm quyền thất bại. Vui lòng thử lại sau!";
        }
        return getUserModelView(updateRole, TITLE_EDIT, success, message);
    }

    @RequestMapping("/update_status")
    @ResponseBody
    public long updateStatus(@RequestParam("id") String id,
                             @RequestParam("status") Integer status, HttpServletRequest request, Model model, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Update Status Role");
        LOGGER.debug(LOG_FORMAT, tag, "UpdateRole:" + id + ". status: " + status);
        //modified count
        long modifiedCnt = 0;
        //validate data
        if (status != 1 && status != 2) {
            LOGGER.error(LOG_FORMAT, tag, "Invalid status:" + status);
            throw new RuntimeException("Invalid status");
        }
        Role checkRole = roleRepository.findById(id).get();
        if (checkRole == null) {
            LOGGER.error(LOG_FORMAT, tag, "Role not found:" + id);
            return modifiedCnt;
        }
        checkRole.setStatus(status);
        try {
            roleRepository.save(checkRole);
            modifiedCnt = 1;
            LOGGER.debug(LOG_FORMAT, tag, "Update role successfully");
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error occur while uppdating status. role: " + id);
            LOGGER.error(tag, e);
        }
        return modifiedCnt;
    }

    @RequestMapping(value = "/view/{id}",
            method = RequestMethod.GET)
    public ModelAndView viewRole(@PathVariable String id,
                                 HttpServletRequest request,
                                 Principal principal) {
        String tag = buildLogTag(request, principal, "View Role");
        LOGGER.debug(LOG_FORMAT, tag, "View role view. ID: " + id);
        Role role = roleRepository.findById(id).get();
        ModelAndView mv = new ModelAndView("role/view_role");
        List<Function> lstFuncGroup = functionRepository.findAll();
        mv.addObject("role", role);
        List<String> roleFunction = role.getFunctions()
                .stream().map(item -> item.getId())
                .collect(Collectors.toList());
        mv.addObject("lstFuncGroup", lstFuncGroup);
        mv.addObject("roleFunction",roleFunction);
        mv.addObject("titlePage", TITLE_VIEW);
        return mv;
    }
}

package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Category;
import com.example.mongodb.model.Slide;
import com.example.mongodb.repository.CategoryRepository;
import com.example.mongodb.repository.SlideRepository;
import com.example.mongodb.services.CategoryService;
import com.example.mongodb.services.SlideService;
import com.example.mongodb.utils.Utils;
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
import java.util.List;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/category")
public class CategoryController {
        private static final Logger LOGGER = LogManager.getLogger(OrderController.class);
        private static final Gson gson = new Gson();
        private static final String TITLE_ADD = "Add info category";
        private static final String TITLE_VIEW = "View info category";
        private static final String TITLE_EDIT = "Edit info category";
        private static final String TITLE_DELETE = "Delete category";

        @Autowired
        CategoryRepository categoryRepository;

        @Autowired
        CategoryService categoryService;

        @RequestMapping("/list")
        public ModelAndView listOrder(HttpServletRequest request,
                                      Principal principal) {
            String tag = buildLogTag(request, principal, "List category");
            LOGGER.debug(LOG_FORMAT, tag, "List category view");
            ModelAndView mv = new ModelAndView("product/list-category");
            mv.addObject("lstCategory", categoryRepository.findAll());
            LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
            return mv;
        }

        private ModelAndView getBannerModelView(Category category, String title, Boolean success, String message) {
            List<Category> lstCategory = categoryRepository.findAll();
            ModelAndView mv = new ModelAndView("product/form-category");
            mv.addObject("category", category);
            mv.addObject("lstCategory", lstCategory);
            mv.addObject("titlePage", title);
            if (success != null) {
                mv.addObject("success", success);
            }
            if (message != null) {
                mv.addObject("message", message);
            }
            return mv;
        }

        @RequestMapping("/search")
        @ResponseBody
        public BaseResponse search(@RequestParam("contentCategory") String contentCategory,
                                   HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Search Product");
            LOGGER.debug(LOG_FORMAT + "contentCategory: {}", tag, "Search Category. ", contentCategory);
            BaseResponse response = new BaseResponse();
//        Declare
            Category category = new Category();
            category.setContentCategory(contentCategory);
            LOGGER.debug(LOG_FORMAT, tag, "Category: " + gson.toJson(contentCategory));
            List<Category> lstCategory = new ArrayList<>();
            try {
                lstCategory = categoryService.advancedSearch(category);
                response.setCode("00");
                response.setMessage("Find category success!");
                response.setData(lstCategory);

            } catch (Exception e) {
                LOGGER.error(LOG_FORMAT, tag, "Error while searching category: " + e.getMessage());
                LOGGER.error(tag, e);
                response.setCode("99");
                response.setMessage("Find category error");
                response.setData(null);
            }
            LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstCategory.size() + " categorys");
            //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
            return response;
        }

        @RequestMapping(value = "/view_material/{id}", method = RequestMethod.GET)
        public ModelAndView viewBannerForm(@PathVariable("id") String id,
                                           HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "View category");
            LOGGER.debug(LOG_FORMAT, tag, "View category View. Category: " + id);
            Category category = categoryRepository.findById(id).get();
            if (category == null) {
                LOGGER.debug(LOG_FORMAT, tag, "Category not found. Throw Exception. CategoryID: " + id);
                throw new RuntimeException("Invalid category! " + id);
            }
            return getBannerModelView(category, TITLE_VIEW, null, null);
        }

        @RequestMapping(value = "/add", method = RequestMethod.GET)
        public ModelAndView addBannerForm(HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Add category");
            LOGGER.debug(LOG_FORMAT, tag, "Add Category View");
            Category category = new Category();
            return getBannerModelView(category, TITLE_ADD, null, null);
        }

        @RequestMapping(value = "/add", method = RequestMethod.POST)
        public ModelAndView doAddBanner(@RequestParam("iconCategory") String iconCategory,
                                        @RequestParam("contentCategory") String contentCategory,
                                        Model model, HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Add Slide");
            LOGGER.debug(LOG_FORMAT + "iconCategory: {}, contentCategory: {}", tag,
                    "Add category.", iconCategory, contentCategory);
            Category category = new Category();
            if(!Utils.checkNullOrEmpty(iconCategory)) {
                category.setIconCategory(iconCategory);
            }
            if(!Utils.checkNullOrEmpty(contentCategory)) {
                category.setContentCategory(contentCategory);
            }
            categoryRepository.save(category);
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");

            return getBannerModelView(category, TITLE_ADD, Boolean.TRUE, "Add a new category " + contentCategory + " success!");
        }

        @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
        public ModelAndView editBannerForm(@PathVariable("id") String id, HttpServletRequest request,
                                           Principal principal) {
            String tag = buildLogTag(request, principal, "Edit category");
            LOGGER.debug(LOG_FORMAT, tag, "Edit category View. Category Product: " + id);
            Category category = categoryRepository.findById(id).get();
            if (category == null) {
                LOGGER.debug(LOG_FORMAT, tag, "Category not found. Throw Exception. IdCategory: " + id);
                throw new RuntimeException("Invalid category! " + id);
            }
            return getBannerModelView(category, TITLE_EDIT, null, null);
        }

        @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
        public ModelAndView doUpdateBanner(@PathVariable("id") String id,
                                           @RequestParam("iconCategory") String iconCategory,
                                           @RequestParam("contentCategory") String contentCategory,
                                           Model model, HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Edit category");
            LOGGER.debug(LOG_FORMAT + "iconCategory: {}, contentCategory: {}", tag,
                    "Add category.", iconCategory, contentCategory);
            Category checkCategory = categoryRepository.findById(id).get();
            if (checkCategory == null) {
                LOGGER.error(LOG_FORMAT, tag, "Category not found:" + id);
                throw new RuntimeException("Invalid category");
            }
            boolean success = true;
            String message = "Update info category success!";
            try {
                if(!Utils.checkNullOrEmpty(iconCategory)) {
                    checkCategory.setIconCategory(iconCategory);
                }
                if(!Utils.checkNullOrEmpty(contentCategory)) {
                    checkCategory.setContentCategory(contentCategory);
                }
                LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
                categoryRepository.save(checkCategory);
                LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
            } catch (Exception e) {
                LOGGER.debug(LOG_FORMAT, tag, "Error while edit category: " + id);
                LOGGER.error(tag, e);
                success = false;
                message = "Category update failed. Please try again later!";
            }

            return getBannerModelView(checkCategory, TITLE_EDIT, success, message);
        }

        @RequestMapping(value = "/delete", method = RequestMethod.POST)
        @ResponseBody
        public long deleteBanner(@RequestParam("id") String id,
                                 HttpServletRequest request, Model model, Principal principal) throws ParseException {
            String tag = buildLogTag(request, principal, "Delete Category");
            LOGGER.debug(LOG_FORMAT, tag, "DeleteCategory:" + id);
            //modified count
            long modifiedCnt = 0;
            Category checkCategory = categoryRepository.findById(id).get();
            if (checkCategory == null) {
                LOGGER.error(LOG_FORMAT, tag, "Category not found:" + id);
                return modifiedCnt;
            }
            try {
                categoryRepository.delete(checkCategory);
                modifiedCnt = 1;
                LOGGER.debug(LOG_FORMAT, tag, "Delete category successfully");
            } catch (Exception e) {
                LOGGER.error(LOG_FORMAT, tag, "Error occur while delete category . Buyer: " + id);
                LOGGER.error(tag, e);
            }
            return modifiedCnt;
        }
    }
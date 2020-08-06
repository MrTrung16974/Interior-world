package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Material;
import com.example.mongodb.model.Slide;
import com.example.mongodb.repository.MaterialRepository;
import com.example.mongodb.services.MaterialService;
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
@RequestMapping("/material")
public class MaterialController {
        private static final Logger LOGGER = LogManager.getLogger(OrderController.class);
        private static final Gson gson = new Gson();
        private static final String TITLE_ADD = "Add info material";
        private static final String TITLE_VIEW = "View info material";
        private static final String TITLE_EDIT = "Edit info material";
        private static final String TITLE_DELETE = "Delete material";

        @Autowired
        MaterialRepository materialRepository;

        @Autowired
        MaterialService materialService;

        @RequestMapping("/list")
        public ModelAndView listOrder(HttpServletRequest request,
                                      Principal principal) {
            String tag = buildLogTag(request, principal, "List material");
            LOGGER.debug(LOG_FORMAT, tag, "List material view");
            ModelAndView mv = new ModelAndView("product/list-material");
            mv.addObject("lstMaterial", materialRepository.findAll());
            LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
            return mv;
        }

        private ModelAndView getBannerModelView(Material material, String title, Boolean success, String message) {
            List<Material> lstMaterial = materialRepository.findAll();
            ModelAndView mv = new ModelAndView("product/form-material");
            mv.addObject("material", material);
            mv.addObject("lstMaterial", lstMaterial);
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
        public BaseResponse search(@RequestParam("contentMaterial") String contentMaterial,
                                   HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Search Material");
            LOGGER.debug(LOG_FORMAT + "contentMaterial: {}", tag, "Search Material. ", contentMaterial);
            BaseResponse response = new BaseResponse();
//        Declare
            Material material = new Material();
            material.setContentMaterial(contentMaterial);
            LOGGER.debug(LOG_FORMAT, tag, "Order: " + gson.toJson(contentMaterial));
            List<Material> lstMaterial = new ArrayList<>();
            try {
                lstMaterial = materialService.advancedSearch(material);
                response.setCode("00");
                response.setMessage("Find material success!");
                response.setData(lstMaterial);

            } catch (Exception e) {
                LOGGER.error(LOG_FORMAT, tag, "Error while searching material: " + e.getMessage());
                LOGGER.error(tag, e);
                response.setCode("99");
                response.setMessage("Find material error");
                response.setData(null);
            }
            LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstMaterial.size() + " materials");
            //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
            return response;
        }

        @RequestMapping(value = "/view_material/{id}", method = RequestMethod.GET)
        public ModelAndView viewBannerForm(@PathVariable("id") String id,
                                           HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "View Material");
            LOGGER.debug(LOG_FORMAT, tag, "Edit Material View. Material: " + id);
            Material material = materialRepository.findById(id).get();
            if (material == null) {
                LOGGER.debug(LOG_FORMAT, tag, "Material not found. Throw Exception. MaterialID: " + id);
                throw new RuntimeException("Invalid material! " + id);
            }
            return getBannerModelView(material, TITLE_VIEW, null, null);
        }

        @RequestMapping(value = "/add", method = RequestMethod.GET)
        public ModelAndView addBannerForm(HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Add Material");
            LOGGER.debug(LOG_FORMAT, tag, "Add Material View");
            Material material = new Material();
            return getBannerModelView(material, TITLE_ADD, null, null);
        }

        @RequestMapping(value = "/add", method = RequestMethod.POST)
        public ModelAndView doAddBanner(@RequestParam("iconMaterial") String iconMaterial,
                                        @RequestParam("contentMaterial") String contentMaterial,
                                        Model model, HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Add Material");
            LOGGER.debug(LOG_FORMAT + "iconMaterial: {}, contentMaterial: {}", tag,
                    "Add Material.", iconMaterial, contentMaterial);
            Material material = new Material();
            if(!Utils.checkNullOrEmpty(iconMaterial)) {
                material.setIconMaterial(iconMaterial);
            }
            if(!Utils.checkNullOrEmpty(contentMaterial)) {
                material.setContentMaterial(contentMaterial);
            }
            materialRepository.save(material);
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");

            return getBannerModelView(material, TITLE_ADD, Boolean.TRUE, "Add a new material " + contentMaterial + " success!");
        }

        @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
        public ModelAndView editBannerForm(@PathVariable("id") String id, HttpServletRequest request,
                                           Principal principal) {
            String tag = buildLogTag(request, principal, "Edit Banner");
            LOGGER.debug(LOG_FORMAT, tag, "Edit banner View. Banner Product: " + id);
            Material material = materialRepository.findById(id).get();
            if (material == null) {
                LOGGER.debug(LOG_FORMAT, tag, "Material not found. Throw Exception. IdMaterial: " + id);
                throw new RuntimeException("Invalid material! " + id);
            }
            return getBannerModelView(material, TITLE_EDIT, null, null);
        }

        @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
        public ModelAndView doUpdateBanner(@PathVariable("id") String id,
                                           @RequestParam("iconMaterial") String iconMaterial,
                                           @RequestParam("contentMaterial") String contentMaterial,
                                           Model model, HttpServletRequest request, Principal principal) {
            String tag = buildLogTag(request, principal, "Edit Slide");
            LOGGER.debug(LOG_FORMAT + "iconMaterial: {}, contentMaterial: {}", tag,
                    "Add Material.", iconMaterial, contentMaterial);
            Material checkMaterial = materialRepository.findById(id).get();
            if (checkMaterial == null) {
                LOGGER.error(LOG_FORMAT, tag, "Material not found:" + id);
                throw new RuntimeException("Invalid material");
            }
            boolean success = true;
            String message = "Update info material success!";
            try {
                if(!Utils.checkNullOrEmpty(iconMaterial)) {
                    checkMaterial.setIconMaterial(iconMaterial);
                }
                if(!Utils.checkNullOrEmpty(contentMaterial)) {
                    checkMaterial.setContentMaterial(contentMaterial);
                }
                LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
                materialRepository.save(checkMaterial);
                LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
            } catch (Exception e) {
                LOGGER.debug(LOG_FORMAT, tag, "Error while edit material: " + id);
                LOGGER.error(tag, e);
                success = false;
                message = "Material update failed. Please try again later!";
            }

            return getBannerModelView(checkMaterial, TITLE_EDIT, success, message);
        }

        @RequestMapping(value = "/delete", method = RequestMethod.POST)
        @ResponseBody
        public long deleteBanner(@RequestParam("id") String id,
                                 HttpServletRequest request, Model model, Principal principal) throws ParseException {
            String tag = buildLogTag(request, principal, "Delete Material");
            LOGGER.debug(LOG_FORMAT, tag, "DeleteMaterial:" + id);
            //modified count
            long modifiedCnt = 0;
            Material checkMaterial = materialRepository.findById(id).get();
            if (checkMaterial == null) {
                LOGGER.error(LOG_FORMAT, tag, "Material not found:" + id);
                return modifiedCnt;
            }
            try {
                materialRepository.delete(checkMaterial);
                modifiedCnt = 1;
                LOGGER.debug(LOG_FORMAT, tag, "Delete material successfully");
            } catch (Exception e) {
                LOGGER.error(LOG_FORMAT, tag, "Error occur while delete material . Buyer: " + id);
                LOGGER.error(tag, e);
            }
            return modifiedCnt;
        }
    }
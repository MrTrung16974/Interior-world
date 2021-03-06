package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.*;
import com.example.mongodb.repository.SlideRepository;
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
@RequestMapping("/slide")
public class SlideController {
    private static final Logger LOGGER = LogManager.getLogger(OrderController.class);
    private static final Gson gson = new Gson();
    private static final String TITLE_ADD = "Add info slide";
    private static final String TITLE_VIEW = "View info slide";
    private static final String TITLE_EDIT = "Edit info slide";
    private static final String TITLE_DELETE = "Delete slide";

    @Autowired
    SlideRepository slideRepository;

    @Autowired
    SlideService slideService;

    @RequestMapping("/list")
    public ModelAndView listOrder(HttpServletRequest request,
                                  Principal principal) {
        String tag = buildLogTag(request, principal, "List banner");
        LOGGER.debug(LOG_FORMAT, tag, "List banner view");
        ModelAndView mv = new ModelAndView("slide/list-slide");
        mv.addObject("lstBanner", slideRepository.findAll());
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }

    private ModelAndView getBannerModelView(Slide slide, String title, Boolean success, String message) {
        List<Slide> lstSlide = slideRepository.findAll();
        ModelAndView mv = new ModelAndView("slide/form-slide");
        mv.addObject("slide", slide);
        mv.addObject("lstBanner", lstSlide);
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
    public BaseResponse search(@RequestParam("nameBanner") String nameBanner,
                               HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Search Product");
        LOGGER.debug(LOG_FORMAT + "nameBanner: {}", tag, "Search Slide. ", nameBanner);
        BaseResponse response = new BaseResponse();
//        Declare
        Slide banner = new Slide();
        banner.setBgBanner(nameBanner);
        LOGGER.debug(LOG_FORMAT, tag, "Order: " + gson.toJson(banner));
        List<Slide> lstBanner = new ArrayList<>();
        try {
            lstBanner = slideService.advancedSearch(banner);
            response.setCode("00");
            response.setMessage("Find order success!");
            response.setData(lstBanner);

        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error while searching banner: " + e.getMessage());
            LOGGER.error(tag, e);
            response.setCode("99");
            response.setMessage("Find banner error");
            response.setData(null);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstBanner.size() + " banners");
        //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
        return response;
    }

    @RequestMapping(value = "/view_slide/{id}", method = RequestMethod.GET)
    public ModelAndView viewBannerForm(@PathVariable("id") String id,
                                        HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "View Product");
        LOGGER.debug(LOG_FORMAT, tag, "Edit banner View. Banner: " + id);
        Slide slide = slideRepository.findById(id).get();
        if (slide == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Order not found. Throw Exception. OrderID: " + id);
            throw new RuntimeException("Invalid order! " + id);
        }
        return getBannerModelView(slide, TITLE_VIEW, null, null);
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView addBannerForm(HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add Banner");
        LOGGER.debug(LOG_FORMAT, tag, "Add Banner View");
        Slide banner = new Slide();
        return getBannerModelView(banner, TITLE_ADD, null, null);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ModelAndView doAddBanner(@RequestParam("nameBanner") String nameBanner,
                                    @RequestParam("titleBanner") String titleBanner,
                                    @RequestParam("contentBanner") String contentBanner,
                                    @RequestParam("bgBanner") String bgBanner,
                                    Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add Slide");
        LOGGER.debug(LOG_FORMAT + "namePage: {}, titleBanner: {}, contentBanner: {}, bgBanner: {}", tag,
                "Add banner.", nameBanner, titleBanner, contentBanner, bgBanner);
        Slide banner = new Slide();
        if(!Utils.checkNullOrEmpty(nameBanner)) {
            banner.setNameBanner(nameBanner);
        }
        if(!Utils.checkNullOrEmpty(titleBanner)) {
            banner.setTitleBanner(titleBanner);
        }
        if(!Utils.checkNullOrEmpty(contentBanner)) {
            banner.setContentBanner(contentBanner);
        }
        if(!Utils.checkNullOrEmpty(bgBanner)) {
            banner.setBgBanner(bgBanner);
        }
        slideRepository.save(banner);
        LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");

        return getBannerModelView(banner, TITLE_ADD, Boolean.TRUE, "Add a new slide " + nameBanner + " success!");
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editBannerForm(@PathVariable("id") String id, HttpServletRequest request,
                                      Principal principal) {
        String tag = buildLogTag(request, principal, "Edit Banner");
        LOGGER.debug(LOG_FORMAT, tag, "Edit banner View. Banner Product: " + id);
        Slide banner = slideRepository.findById(id).get();
        if (banner == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Order not found. Throw Exception. IdBanner: " + id);
            throw new RuntimeException("Invalid banner! " + id);
        }
        return getBannerModelView(banner, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView doUpdateBanner(@PathVariable("id") String id,
                                       @RequestParam("nameBanner") String nameBanner,
                                       @RequestParam("titleBanner") String titleBanner,
                                       @RequestParam("contentBanner") String contentBanner,
                                       @RequestParam("bgBanner") String bgBanner,
                                      Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit Slide");
        LOGGER.debug(LOG_FORMAT + "namePage: {}, titleBanner: {}, contentBanner: {}, bgBanner: {}", tag,
                "Add banner.", nameBanner, titleBanner, contentBanner, bgBanner);
        Slide checkBanner = slideRepository.findById(id).get();
        if (checkBanner == null) {
            LOGGER.error(LOG_FORMAT, tag, "Slide not found:" + id);
            throw new RuntimeException("Invalid slide");
        }
        boolean success = true;
        String message = "Update info slide success!";
        try {
            if(!Utils.checkNullOrEmpty(nameBanner)) {
                checkBanner.setNameBanner(nameBanner);
            }
            if(!Utils.checkNullOrEmpty(titleBanner)) {
                checkBanner.setTitleBanner(titleBanner);
            }
            if(!Utils.checkNullOrEmpty(contentBanner)) {
                checkBanner.setContentBanner(contentBanner);
            }
            if(!Utils.checkNullOrEmpty(bgBanner)) {
                checkBanner.setBgBanner(bgBanner);
            }
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            slideRepository.save(checkBanner);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit slide: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "Banner update failed. Please try again later!";
        }

        return getBannerModelView(checkBanner, TITLE_EDIT, success, message);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public long deleteBanner(@RequestParam("id") String id,
                            HttpServletRequest request, Model model, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Delete Status Slide");
        LOGGER.debug(LOG_FORMAT, tag, "DeleteBanner:" + id);
        //modified count
        long modifiedCnt = 0;
        Slide checkBanner = slideRepository.findById(id).get();
        if (checkBanner == null) {
            LOGGER.error(LOG_FORMAT, tag, "Slide not found:" + id);
            return modifiedCnt;
        }
        try {
            slideRepository.delete(checkBanner);
            modifiedCnt = 1;
            LOGGER.debug(LOG_FORMAT, tag, "Delete slide successfully");
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error occur while delete slide . Buyer: " + id);
            LOGGER.error(tag, e);
        }
        return modifiedCnt;
    }
}

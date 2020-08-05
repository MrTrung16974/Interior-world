package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Slide;
import com.example.mongodb.repository.SlideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class SlideApiController {

    @Autowired
    SlideRepository slideRepository;

    //    get product prodcut now in user
    @RequestMapping("/slides")
    public BaseResponse getAllBanner() {
        BaseResponse response = new BaseResponse();
        List<Slide> lstSlide = slideRepository.findAll();
        try {
            if (lstSlide.isEmpty()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            }else {
                response.setCode("00");
                response.setMessage("Find banner success!");
                response.setData(lstSlide);
            }
        }catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

}

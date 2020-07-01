package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Banner;
import com.example.mongodb.model.Order;
import com.example.mongodb.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class BannerApiController {

    @Autowired
    BannerRepository bannerRepository;

    //    get product prodcut now in user
    @RequestMapping("/banners")
    public BaseResponse getAllBanner() {
        BaseResponse response = new BaseResponse();
        List<Banner> lstBanner = bannerRepository.findAll();
        try {
            if (lstBanner.isEmpty()) {
                response.setCode("99");
                response.setMessage("Data not found");
                response.setData(null);
            }else {
                response.setCode("00");
                response.setMessage("'Find banner success!");
                response.setData(lstBanner);
            }
        }catch (Exception e) {
            response.setCode("90");
            response.setMessage("System erorr : " + e.getMessage());
            response.setData(null);
        }
        return response;
    }

}

package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class CommentAPIController {

    @PostMapping("/comment/{idProduct}")
    public BaseResponse addComment(@PathVariable("idProduct") String idUser) {
        BaseResponse response = new BaseResponse();


        return response;
    }

}

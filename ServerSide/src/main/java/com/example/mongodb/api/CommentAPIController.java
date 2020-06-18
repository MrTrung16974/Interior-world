package com.example.mongodb.api;

import com.example.mongodb.dto.*;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class CommentAPIController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/comment/{idProduct}")
    public BaseResponse addComment(@PathVariable("idProduct") String idProduct,
                                   @RequestBody Comment comment) {
        BaseResponse response = new BaseResponse();
        try {
            Optional<Product> optProduct = productRepository.findById(idProduct);
            if(!optProduct.isPresent()) {
                response.setCode("500");
                response.setMessage("Null data");
                response.setData(null);
            }else {
                Product exitproduct = optProduct.get();
                comment.setCreateAt(new Date());
                List<Comment> lstComent = new ArrayList<>() ;
                if(exitproduct.getComment() != null) {
                    lstComent = exitproduct.getComment();
                }
                if(comment != null) {
                    lstComent.add(comment);
                    exitproduct.setComment(lstComent);
                }
                Product product = productRepository.save(exitproduct);
                response.setCode("00");
                response.setMessage("Success!");
                response.setData(product);
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error" + e.getMessage());
            response.setData(null);
        }

        return response;
    }
}

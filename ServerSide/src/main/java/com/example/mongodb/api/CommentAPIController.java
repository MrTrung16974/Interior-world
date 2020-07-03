package com.example.mongodb.api;

import com.example.mongodb.dto.*;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
                Random rd = new Random();

                comment.setId(String.valueOf(rd.nextInt(79263217)));
                comment.setCreateAt(new Date());
                List<Comment> lstComent = new ArrayList<>() ;
                Integer totalStar = 0;
                Integer length = 0;
                Integer starProduct = null;
                if(exitproduct.getComment() != null) {
                    lstComent = exitproduct.getComment();
                }
                if(comment != null) {
                    lstComent.add(comment);
                    length = lstComent.size();
                    exitproduct.setComment(lstComent);
                    for (int i = 0; i < length; i++) {
                        totalStar += lstComent.get(i).getStar();
                    }
                    starProduct = totalStar / length;
                    exitproduct.setStar(starProduct);
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

    @PutMapping("/like-comment")
    public BaseResponse likeComment(@RequestParam("idProduct") String idProduct,
                                    @RequestParam("idUser") String idUser,
                                    @RequestParam("idCommet") String idCommet) {
        BaseResponse response = new BaseResponse();
        try {
            Optional<Product> optProduct = productRepository.findById(idProduct);
            if(!optProduct.isPresent()) {
                response.setCode("500");
                response.setMessage("Null data");
                response.setData(null);
            }else {
                Integer numberLike = 0;
                Product exitproduct = optProduct.get();
                List<Comment> lstComment = exitproduct.getComment();
                Comment comment = new Comment();
                Integer length = lstComment.size();
                if(exitproduct.getComment() != null) {
                    for (int i = 0; i < length; i++) {
                        if(lstComment.get(i).getId().equals(idCommet)) {
                            if(lstComment.get(i).getBuyer().equals(idUser) ) {
                                numberLike += 1;
                            }else {
                                numberLike = lstComment.get(i).getLike() + 1;
                            }
                            lstComment.get(i).setLike(numberLike);
                        }
                    }
                }
                if(comment != null) {
                    exitproduct.setComment(lstComment);
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

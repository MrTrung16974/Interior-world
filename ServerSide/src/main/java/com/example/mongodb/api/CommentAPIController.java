package com.example.mongodb.api;

import com.example.mongodb.dto.*;
import com.example.mongodb.dto.product.Comment;
import com.example.mongodb.dto.product.Like;
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
                Product exitproduct = optProduct.get();
                boolean isHaveInList = false;
                Like removeLike = null;
                List<Like> lstLike = new ArrayList<>();;
                List<Comment> lstComment = exitproduct.getComment();
                Comment comment = new Comment();
                Integer length = lstComment.size();
                if(exitproduct.getComment() != null) {
                    for (int i = 0; i < length; i++) {
                        if(lstComment.get(i).getId().equals(idCommet)) {
                            comment = lstComment.get(i);
                            if (lstComment.get(i).getLike() != null) {
                                lstLike = comment.getLike();
                                for (Like like : lstLike) {
                                    if(like.getBuyer().equals(idUser)) {
                                        isHaveInList = true;
                                        removeLike = like;
                                    }
                                }
                            }
                        }
                    }
                }
//              check lst Comment equal null add like (frist product)
                if(lstLike.isEmpty()) {
                    lstLike.add(new Like(idUser));
                    response.setCode("200");
                    response.setMessage("like product Success!");
                }else {
                    if(!isHaveInList) {
//              add  favourite in user
                        lstLike.add(new Like(idUser));
                        response.setCode("200");
                        response.setMessage("like product Success");
                    } else {
//              remove  favourite in user
                        lstLike.remove(removeLike);
                        response.setCode("00");
                        response.setMessage("uplike product Success");
                    }
                }
                if(comment != null) {
                    comment.setLike(lstLike);
                    exitproduct.setComment(lstComment);
                }
                Product product = productRepository.save(exitproduct);
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

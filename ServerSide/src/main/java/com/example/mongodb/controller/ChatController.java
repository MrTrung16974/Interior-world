package com.example.mongodb.controller;

import com.example.mongodb.repository.RoleRepository;
import com.example.mongodb.repository.UserRepository;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/user")
public class ChatController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);
    private static final Gson gson = new Gson();
    private static final String PATTERN_PASSWORD = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,20}";

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;
    @RequestMapping("/chats")
    public ModelAndView chatUser(HttpServletRequest request,
                                 Principal principal) {
        String tag = buildLogTag(request, principal, "Chat User");
        LOGGER.debug(LOG_FORMAT, tag, "List product view");
        ModelAndView mv = new ModelAndView("chat");
        mv.addObject("lstRoles",roleRepository.findAll());
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }
}

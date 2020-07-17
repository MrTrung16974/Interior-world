package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Role;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.RoleRepository;
import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.services.UserService;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;

import static com.example.mongodb.utils.Constant.LOG_FORMAT;
import static com.example.mongodb.utils.Utils.buildLogTag;

@Controller
@RequestMapping("/user")
public class UserController {
    private static final Logger LOGGER = LogManager.getLogger(UserController.class);
    private static final Gson gson = new Gson();
    private static final String VIEW_USER = "View user";
    private static final String TITLE_ADD = "Add user";
    private static final String TITLE_EDIT = "Update info user";
    private static final String PATTERN_PASSWORD = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}";

    @Value("${default.password}")
    private String defaultPass;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

//    @Autowired
//    Validator validator;

    @Autowired
    UserService userService;


    @RequestMapping("/list")
    public ModelAndView listUser(HttpServletRequest request,
                                 Principal principal) {
        String tag = buildLogTag(request, principal, "List Product");
        LOGGER.debug(LOG_FORMAT, tag, "List product view");
        ModelAndView mv = new ModelAndView("user/list-user");
        mv.addObject("lstUser", userRepository.findAll());
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }

    @RequestMapping("/search")
    @ResponseBody
    public BaseResponse search(@RequestParam("username") String userName,
                               @RequestParam("fullName") String fullName,
                               @RequestParam("email") String email,
                               @RequestParam("status") Integer status,
                               HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Search User");
        LOGGER.debug(LOG_FORMAT + "Username: {}, fullName: {}, status: {}", tag, "Search user. ", userName, fullName, status);
        BaseResponse response = new BaseResponse();
        User user = new User();
        user.setUsername(userName);
        user.setEmail(email);
        user.setFullName(fullName);
        if (status != null) {
            user.setStatus(status);
        }
        LOGGER.debug(LOG_FORMAT, tag, "User: " + gson.toJson(user));
        List<User> lstUser = new ArrayList<>();
        try {
            lstUser = userService.findUser(user);
            response.setCode("00");
            response.setMessage("Find user success!");
            response.setData(lstUser);

        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error while searching user: " + e.getMessage());
            LOGGER.error(tag, e);
            response.setCode("99");
            response.setMessage("Find user error");
            response.setData(null);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstUser.size() + " users");
        //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
        return response;
    }

    @RequestMapping(value = "/change_password", method = RequestMethod.GET)
    public String changePassword(HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Change Password");
        LOGGER.debug(LOG_FORMAT, tag, "Change password view. user: " + principal.getName());
        return "user/change_password";
    }

    @RequestMapping(value = "/change_password", method = RequestMethod.POST)
    public ModelAndView doChangePassword(@RequestParam("oldPassword") String oldPassword,
                                         @RequestParam("password") String password,
                                         Model model, HttpServletRequest request, Principal principal) {
        String username = principal.getName();
        String tag = buildLogTag(request, principal, "Change Password");
        LOGGER.debug(LOG_FORMAT, tag, "Change password action. user: " + username);
        User user = userService.getUserByUserName(username);
        boolean success = false;
        String message = "Đổi mật khẩu thất bại. Vui lòng thử lại sau!";
        if (user != null) {
            LOGGER.debug(LOG_FORMAT, tag, "Found user. Checking password.");
            if (encoder.matches(oldPassword, user.getPassword())) {
                LOGGER.debug(LOG_FORMAT, tag, "Password valid. Check password pattern");
                try {
                    password = password.trim();
                    Pattern pattern = Pattern.compile("(?=.*\\d)(?=.*[a-z]).*");
                    if (password.length() >= 6 && password.length() <= 20 && pattern.matcher(password).find()) {
                        LOGGER.debug(LOG_FORMAT, tag, "Password pattern ok. Updating to DB");
                        user = new User();
                        user.setUsername(username);
                        user.setPassword(encoder.encode(password));
                        userRepository.save(user);
                        success = true;
                        message = "Đổi mật khẩu thành công";
                    }
                } catch (Exception e) {
                    LOGGER.error(LOG_FORMAT, tag, "Updating to DB fail. username: " + username);
                    LOGGER.error("Error while change password", e);
                }
            } else {
                LOGGER.error(LOG_FORMAT, tag, "User not found! username: " + username);
                success = false;
                message = "Mật khẩu cũ không chính xác. Vui lòng thử lại";
            }
        }
        ModelAndView mv = new ModelAndView("user/change_password");
        mv.addObject("success", success);
        mv.addObject("message", message);
        return mv;
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public ModelAndView addUserForm(HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add User");
        LOGGER.debug(LOG_FORMAT, tag, "Add User View");
        User user = new User();
        return getUserModelView(user, TITLE_ADD, null, null);
    }

    private ModelAndView getUserModelView(User user, String title, Boolean success, String message) {
        List<Role> lstRole = roleRepository.findAll();
        ModelAndView mv = new ModelAndView("user/form-user");
        mv.addObject("user", user);
        mv.addObject("lstRole", lstRole);
        mv.addObject("titlePage", title);
        if (success != null) {
            mv.addObject("success", success);
        }
        if (message != null) {
            mv.addObject("message", message);
        }
        return mv;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ModelAndView doAddUser(@RequestParam("username") String userName,
                                  @RequestParam("fullName") String fullName,
                                  @RequestParam("role") String role,
                                  @RequestParam("email") String email,
                                  @RequestParam("password") String password,
                                  Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Add User");
        LOGGER.debug(LOG_FORMAT + "Username: {}, fullName: {}, email: {}, role: {}", tag, " ", userName, fullName, email, role);
        User user = new User();
        boolean success = true;
        String message = "Thêm mới người dùng " + userName + " thành công!";
        try {
            Optional<User> optionalUser =
                    userRepository.findByUsername(userName);
            if (optionalUser.isPresent()) {
                LOGGER.debug(LOG_FORMAT, tag, "Tên người dùng đã tồn tại: " + userName);
                return getUserModelView(new User(), TITLE_ADD, Boolean.FALSE, "Tên đăng nhập đã tồn tại. Vui lòng kiểm tra lại.");
            }
            Pattern pattern = Pattern.compile(PATTERN_PASSWORD);
            if (!pattern.matcher(password).matches()) {
                LOGGER.debug(LOG_FORMAT, tag, "Mật khẩu không hợp lê: " + password);
                return getUserModelView(new User(), TITLE_ADD, Boolean.FALSE, "Mật khẩu từ 6- 20 kí tự, có chứa ít nhất 1 ký tự số, 1 ký tự chữ, 1 chữ hoa.");
            }
            user.setUsername(userName);
            user.setFullName(fullName);
            user.setPassword(password);
            user.setEmail(email);
            user.setRoleID(role);
            user.setFailLoginCount(0);
            //Default status = 1 - active
            user.setStatus(1);
//            Set<ConstraintViolation<User>> constraints = validator.validate(user);
//            LOGGER.debug(LOG_FORMAT, tag, "Validating data");
//            constraints.forEach((constraint) -> {
//                LOGGER.debug(LOG_FORMAT, tag, constraint.getMessage());
//            });
            // hash password after validation
            user.setPassword(encoder.encode(password));
//            if (constraints.size() > 0 ) {
//                LOGGER.debug(LOG_FORMAT, tag, "Invalid data or invalid role: ROLE_SUPER ");
//                message = "Dữ liệu đầu vào không hợp lệ!";
//                success = false;
//            } else {
            LOGGER.debug(LOG_FORMAT, tag, "Inserting to DB. User: " + gson.toJson(user));
            userService.addUser(user);
            LOGGER.debug(LOG_FORMAT, tag, "Add new user successfully!");
//            }
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Exception while adding user!");
            LOGGER.error(tag, e);
            success = false;
            message = "Thêm mới người dùng thất bại. Vui lòng thử lại sau!";
        }
        return getUserModelView(new User(), TITLE_ADD, success, message);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editUserForm(@PathVariable String id, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT, tag, "Edit User View. Username: " + id);
        User user = userRepository.findByUsername(id).get();
        if (user == null) {
            LOGGER.debug(LOG_FORMAT, tag, "User not found. Throw Exception. Username: " + id);
            throw new RuntimeException("Invalid user! " + id);
        }
        return getUserModelView(user, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView doUpdateUser(@PathVariable String id,
                                     @RequestParam("fullName") String fullName,
                                     @RequestParam("email") String email,
                                     @RequestParam("role") String role,
                                     Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT + " UserID: {}, fullName: {},email:{}, role: {}", tag, "Edit User.", id, fullName, email, role);
        User checkUser = userRepository.findByUsername(id).get();
        if (checkUser == null) {
            LOGGER.error(LOG_FORMAT, tag, "User not found:" + id);
            throw new RuntimeException("Invalid user");
        }
        boolean success = true;
        String message = "Cập nhật thông tin người dùng thành công!";
        try {
            checkUser.setFullName(fullName);
            checkUser.setEmail(email);
            checkUser.setRoleID(role);
//            LOGGER.debug(LOG_FORMAT, tag, "Edit User. user: " + gson.toJson(checkUser));
//            Set<ConstraintViolation<User>> constraints = validator.validate(checkUser);
//            constraints.forEach((constraint) -> {
//                LOGGER.debug(LOG_FORMAT, tag, "Validate field: " + constraint.getMessage());
//            });
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            userRepository.save(checkUser);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit user: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "Cập nhật người dùng thất bại. Vui lòng thử lại sau!";
        }

        return getUserModelView(checkUser, TITLE_EDIT, success, message);
    }

    @RequestMapping("/update_user")
    @ResponseBody
    public long updateStatusAndPassword(@RequestParam("id") String id,
                                        @RequestParam("status") Integer status, HttpServletRequest request, Model model, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Update Status User");
        LOGGER.debug(LOG_FORMAT, tag, "UpdateUser:" + id + ". status: " + status);
        //modified count
        long modifiedCnt = 0;
        //validate data
        if (status != -1 && status != 1 && status != 2) {
            LOGGER.error(LOG_FORMAT, tag, "Invalid status:" + status);
            throw new RuntimeException("Invalid status");
        }
        User checkUser = userRepository.findByUsername(id).get();
        if (checkUser == null) {
            LOGGER.error(LOG_FORMAT, tag, "User not found:" + id);
            return modifiedCnt;
        }
        if (status == -1) {
            LOGGER.debug(LOG_FORMAT, tag, "Status = -1. Reset password");
            checkUser.setPassword(encoder.encode(defaultPass));
        } else {
            LOGGER.debug(LOG_FORMAT, tag, "Status != -1. Update status lock/unlock");
            checkUser.setStatus(status);
        }
        try {
            userRepository.save(checkUser);
            modifiedCnt = 1;
            LOGGER.debug(LOG_FORMAT, tag, "Update user successfully");
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error occur while uppdating status. User: " + id);
            LOGGER.error(tag, e);
        }
        return modifiedCnt;
    }
}

package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Order;
import com.example.mongodb.model.Product;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.services.OrderServices;
import com.example.mongodb.utils.Constant;
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
@RequestMapping("/order")
public class OrderController {
    private static final Logger LOGGER = LogManager.getLogger(OrderController.class);
    private static final Gson gson = new Gson();
    private static final String TITLE_VIEW = "View info order";
    private static final String TITLE_EDIT = "Edit info order";
    private static final String TITLE_DELETE = "Delete order";

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderServices orderServices;

    @RequestMapping("/list")
    public ModelAndView listOrder(HttpServletRequest request,
                                  Principal principal) {
        String tag = buildLogTag(request, principal, "List order");
        LOGGER.debug(LOG_FORMAT, tag, "List order view");
        ModelAndView mv = new ModelAndView("order/list-order");
        mv.addObject("lstOrder",orderRepository.findAll());
        LOGGER.debug(LOG_FORMAT, tag, "Return view: " + mv.getViewName());
        return mv;
    }

    private ModelAndView getUserModelView(Order order, String title, Boolean success, String message) {
        List<Order> lstOrder = orderRepository.findAll();
        ModelAndView mv = new ModelAndView("order/form-order");
        mv.addObject("order", order);
        mv.addObject("lstOrder", lstOrder);
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
    public BaseResponse search(@RequestParam("buyer") String username,
                               @RequestParam("status") Integer status,
                               @RequestParam(value = "fromDate", required = false) String fromDate,
                               @RequestParam(value = "toDate", required = false) String toDate,
                               HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Search Product");
        LOGGER.debug(LOG_FORMAT + "username: {}, status: {}, toDate: {}, fromDate: {}", tag, "Search product. ", username, status, toDate, fromDate);
        BaseResponse response = new BaseResponse();
//        Declare
        Order order = new Order();
        order.setBuyer(username);
        if (status != null) {
            order.setStatus(status);
        }
        if(!Utils.checkNullOrEmpty(fromDate) && !Utils.checkNullOrEmpty(toDate)) {
            if (Utils.convertStringToDate(toDate, Constant.FORMAT_DATE).before(Utils.convertStringToDate(fromDate, Constant.FORMAT_DATE))) {
                LOGGER.debug(LOG_FORMAT, tag, "To date cannot be smaller fromDate. Throw Exception.");
                throw new RuntimeException("To date cannot be smaller fromDate! ");
            }

            if (Utils.convertStringToDate(fromDate, Constant.FORMAT_DATE).after(Utils.convertStringToDate(toDate, Constant.FORMAT_DATE))) {
                LOGGER.debug(LOG_FORMAT, tag, "From date cannot be greater than to date. Throw Exception.");
                throw new RuntimeException("from date cannot be greater than to date! ");
            }
        }
        LOGGER.debug(LOG_FORMAT, tag, "Order: " + gson.toJson(order));
        List<Order> lstOrder = new ArrayList<>();
        try {
            lstOrder = orderServices.findOrder(order, fromDate, toDate);
            response.setCode("00");
            response.setMessage("Find order success!");
            response.setData(lstOrder);

        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error while searching order: " + e.getMessage());
            LOGGER.error(tag, e);
            response.setCode("99");
            response.setMessage("Find order error");
            response.setData(null);
        }
        LOGGER.debug(LOG_FORMAT, tag, "Found: " + lstOrder.size() + " orders");
        //Chuyen doi du lieu theo dinh dang ho tro boi jquery datatables
        return response;
    }

    @RequestMapping(value = "/view_order/{id}", method = RequestMethod.GET)
    public ModelAndView viewProductForm(@PathVariable String id,
                                        HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "View Product");
        LOGGER.debug(LOG_FORMAT, tag, "Edit order View. Order: " + id);
        Order order = orderRepository.findById(id).get();
        if (order == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Order not found. Throw Exception. OrderID: " + id);
            throw new RuntimeException("Invalid order! " + id);
        }
        return getUserModelView(order, TITLE_VIEW, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public ModelAndView editOrderForm(@PathVariable String id, HttpServletRequest request,
                                      Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT, tag, "Edit Order View. Order Product: " + id);
        Order order = orderRepository.findById(id).get();
        if (order == null) {
            LOGGER.debug(LOG_FORMAT, tag, "Order not found. Throw Exception. Username: " + id);
            throw new RuntimeException("Invalid user! " + id);
        }
        return getUserModelView(order, TITLE_EDIT, null, null);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ModelAndView doUpdateOrder(@PathVariable String id,
                                      @RequestParam("shippingRates") Integer shippingRates,
                                      @RequestParam("totalPrice") Integer totalPrice,
                                      @RequestParam("flatRateShipping") Integer flatRateShipping,
                                      @RequestParam("totalProductOrder") Integer totalProductOrder,
                                      @RequestParam("address") String address,
                                      @RequestParam("status") Integer status,
                                     Model model, HttpServletRequest request, Principal principal) {
        String tag = buildLogTag(request, principal, "Edit User");
        LOGGER.debug(LOG_FORMAT + " shippingRates: {}, totalPrice: {}" +
                ", flatRateShipping: {}, totalProductOrder: {}, address: {}, status: {}", tag, "Edit Order.",
                id, shippingRates, totalPrice, flatRateShipping, totalProductOrder, address, status);
        Order checkOrder = orderRepository.findById(id).get();
        if (checkOrder == null) {
            LOGGER.error(LOG_FORMAT, tag, "Order not found:" + id);
            throw new RuntimeException("Invalid user");
        }
        boolean success = true;
        String message = "Update info order success!";
        try {
            if(!Utils.checkNullOrEmpty(shippingRates)) {
                checkOrder.setShippingRates(shippingRates);
            }
            if(!Utils.checkNullOrEmpty(totalPrice)) {
                checkOrder.setTotalPrice(Double.valueOf(totalPrice));
            }
            if(!Utils.checkNullOrEmpty(flatRateShipping)) {
                checkOrder.setFlatRateShipping(Double.valueOf(flatRateShipping));
            }
            if(!Utils.checkNullOrEmpty(totalProductOrder)) {
                checkOrder.setTotalProductOrder(totalProductOrder);
            }
            if(!Utils.checkNullOrEmpty(address)) {
                checkOrder.setAddress(address);
            }
            if(!Utils.checkNullOrEmpty(status)) {
                checkOrder.setStatus(status);
            }
            LOGGER.debug(LOG_FORMAT, tag, "Updating into DB");
            orderRepository.save(checkOrder);
            LOGGER.debug(LOG_FORMAT, tag, "Update into DB successfully");
        } catch (Exception e) {
            LOGGER.debug(LOG_FORMAT, tag, "Error while edit user: " + id);
            LOGGER.error(tag, e);
            success = false;
            message = "User update failed. Please try again later!";
        }

        return getUserModelView(checkOrder, TITLE_EDIT, success, message);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public long deleteOrder(@RequestParam("id") String id,
                                        HttpServletRequest request, Model model, Principal principal) throws ParseException {
        String tag = buildLogTag(request, principal, "Delete Status Order");
        LOGGER.debug(LOG_FORMAT, tag, "DeleteOrder:" + id);
        //modified count
        long modifiedCnt = 0;
        Order checkOrder = orderRepository.findById(id).get();
        if (checkOrder == null) {
            LOGGER.error(LOG_FORMAT, tag, "User not found:" + id);
            return modifiedCnt;
        }
        try {
            orderRepository.delete(checkOrder);
            modifiedCnt = 1;
            LOGGER.debug(LOG_FORMAT, tag, "Delete order successfully");
        } catch (Exception e) {
            LOGGER.error(LOG_FORMAT, tag, "Error occur while deleteing . Buyer: " + id);
            LOGGER.error(tag, e);
        }
        return modifiedCnt;
    }
}

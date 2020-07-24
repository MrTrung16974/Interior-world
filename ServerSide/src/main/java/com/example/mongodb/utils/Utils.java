package com.example.mongodb.utils;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.example.mongodb.utils.Constant.DATE_FORMAT;

/**
 *
 * @author nam
 */
public class Utils {

    private static final String LOG_FORMAT_TIME = "[{}]-{}:{} ms";
    private static final String LOG_FORMAT = "[{}]-{}";
    private static com.example.mongodb.utils.Utils instance;
    private static final Logger logger = LoggerFactory.getLogger(com.example.mongodb.utils.Utils.class);

    public static com.example.mongodb.utils.Utils getInstance() {
        if (instance == null) {
            instance = new com.example.mongodb.utils.Utils();
        }
        return instance;
    }

    public static boolean validString(String value) {
        if (value == null || "".equals(value)) {
            return false;
        }
        return true;
    }
    public static boolean checkNullOrEmpty(String s){
        return s == null || s.isEmpty();
    }
    public static boolean checkNullOrEmpty(Object s){
        return s == null;
    }
    public static boolean checkNullOrEmpty(Collection<?> s){
        return s == null || s.isEmpty();
    }
    public long getUserId(String bankCode, String phone) {

        if (phone.startsWith("+")) {
            phone = phone.replace("+", "");
        } else if (phone.startsWith("0")) {
            phone = phone.replaceFirst("0", "84");
        }
        logger.debug("phone: " + phone);
        phone = String.format("%06d", Long.parseLong(bankCode)) + phone;

        return Long.parseLong(phone);

    }

    public static String formatDate(Date d,String format) throws Exception {
        if(checkNullOrEmpty(d) ){
            throw new Exception("Sai định dạng ngày");
        }
        Date date = new Date(d.getTime());
        DateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    public static Date getStartDay(String strDate) throws Exception {
        Date date = null;
        try{
            date = Constant.DATE_FORMAT.parse(strDate);
        }catch (ParseException e) {
            throw new Exception("Sai định dạng ngày");
        }
        if (date == null) {
            return null;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        return c.getTime();
    }

    public static Date getEndDay(String strDate) throws Exception {
        Date date = null;
        try{
            date = Constant.DATE_FORMAT.parse(strDate);
        }catch (ParseException e) {
            throw new Exception("Sai định dạng ngày");
        }
        if (date == null) {
            return null;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 23);
        c.set(Calendar.MINUTE, 59);
        c.set(Calendar.SECOND, 59);
        c.set(Calendar.MILLISECOND, 999);
        return c.getTime();
    }

    public String generateUnique() {
        String guid = UUID.randomUUID().toString();
        guid = guid.replace("-", "");
        return guid;
    }

    public boolean isEmpty(String str) {
        return str == null || "".equals(str);

    }

    public static String parsePhone(String phone) {
        if (phone.startsWith("0")) {
            phone = phone.replace("0", "+84");
        } else if (phone.startsWith("84")) {
            phone = phone.replaceFirst("84", "+84");
        } else {
            phone = "+84" + phone;
        }
        return phone;
    }

    public String getPhoneNumber(String destID) {
        if (isEmpty(destID)) {
            return "";
        }
        String phoneNumber = destID.substring(6, destID.length());
        return parsePhone(phoneNumber);

    }

    public void formatLog(Logger logger, boolean isError, String... arg) {
        if (isError) {
            logger.error("[RES - {}][{}-{}][{}][{}]", arg[0], arg[1], arg[2], arg[3], arg[4]);
        } else {
            logger.debug("[RES - {}][{}-{}][{}][{}]", arg[0], arg[1], arg[2], arg[3], arg[4]);
        }
    }

    public static String getClientIp(HttpServletRequest request) {

        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("x-forwarded-for");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }
        String[] ipElements = remoteAddr.split(":");
        return ipElements[0];

    }

    public static String buildLogTag(HttpServletRequest request, Principal principal, String function) {
        return function + "_" + getClientIp(request) + "_" + principal.getName() + "_" + System.currentTimeMillis() % 86400000;
    }

    public static String formatNumber(double value) {
        DecimalFormat df2 = new DecimalFormat("#,###,###,##0.#");
        return df2.format(value);
    }

    public static double getDistance(double lon1, double lat1, double lon2, double lat2) {
        double dLat = toRadians(lat2 - lat1);
        double dLon = toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double d = 6371000 * c;

        return d;
    }

    public static double toRadians(double degrees) {
        return degrees * (Math.PI / 180);
    }

    public static String getTemplateMail(String title,String link){
        String template = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head></head>\n" +
                "<body>\n" +
                "<div>"+title.toUpperCase()+ "</div>\n" +
                "<div>NEW NOTIFICATION</div>\n" +
                "<div>Ngày/ Date: <span>"+ new Date().toString() +"</span></div>\n" +
                "<div>Vui lòng kiểm tra tại địa chỉ <a href=\""+ link +"\">"+ link+"</a></div>\n" +
                "</body>\n" +
                "</html>";

        return template;
    }

    public static final int IV_LENGTH = 16;
    private static final String ALGORITHM = "HmacSHA256";
    public static byte[] createMac(byte[] bData, byte[] keybyte) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance(ALGORITHM);
        SecretKey key = new SecretKeySpec(keybyte, ALGORITHM);
        mac.init(key);
        mac.update(bData);
        return mac.doFinal();
    }
    public static String decrypt(String strSecretKey, byte[] textByte, byte[] iv) throws Exception {

        byte[] encodedKey = strSecretKey.getBytes();
        SecretKey secretKey = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        Cipher aesCipherForDecryption = Cipher.getInstance("AES/CTR/NoPadding");

        aesCipherForDecryption.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));

        byte[] byteCipherText = aesCipherForDecryption.doFinal(textByte);
        String strCipherText = new String(byteCipherText, "UTF-8");
        return strCipherText;
    }


    public static boolean download(URL url, String fileName) {

        File file = new File(fileName);
        logger.debug("Start download File '" + fileName + "' from " + url.toString());
        try {
            if (file.exists()) {
                logger.debug(file.getName() + ": File exists.");
                return true;
            } else {
                File parent = file.getParentFile();
                if ((parent != null) && (!parent.exists()) && (!parent.mkdirs())) {
                    throw new IOException("File '" + file + "' could not be created");
                }
            }
            InputStream input = url.openStream();

            FileOutputStream output = new FileOutputStream(file);

            byte[] buffer = new byte[4096];
            int n = 0;
            while (-1 != (n = input.read(buffer))) {
                output.write(buffer, 0, n);
            }

            input.close();
            output.close();

            logger.debug("File '" + file + "' downloaded successfully!");
            return true;
        } catch (IOException ioEx) {
            ioEx.printStackTrace();
            logger.error("Error", ioEx);
            return false;
        }
    }

    public static final Date convertStringToDate(String value, String pattern) {
        if(!Comparator.isEqualNullOrEmpty(value)) {
            SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
            try {
                Date date = dateFormat.parse(value);

                return date;
            } catch (ParseException px) {
                logger.error(px.getMessage(), px);
            }
        }
        return null;

    }

    public static String convertDate(String value) {

        String[] arr = value.split("/");
        if(arr.length ==3) {
            String day = arr[0];
            String month = arr[1];
            String year = arr[2];
            if (Integer.parseInt(day) < 10) {
                day = "0" + Integer.parseInt(day);
            }
            if (Integer.parseInt(month) < 10) {
                month = "0" + Integer.parseInt(month);
            }
            return year + month + day;
        }
        return null;
    }

    public static String getStartDayString(String strDate) throws Exception {
        Date date = null;
        try{
            date = Constant.DATE_FORMAT.parse(strDate);
        }catch (ParseException e) {
            throw new Exception("Sai định dạng ngày");
        }
        if (date == null) {
            return null;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        Date d = c.getTime();
        return Constant.DATE_FORMAT_SQL.format(d);
    }

    public static String getEndDayString(String strDate) throws Exception {
        Date date = null;
        try{
            date = Constant.DATE_FORMAT.parse(strDate);
        }catch (ParseException e) {
            throw new Exception("Sai định dạng ngày");
        }
        if (date == null) {
            return null;
        }
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY, 23);
        c.set(Calendar.MINUTE, 59);
        c.set(Calendar.SECOND, 59);
        c.set(Calendar.MILLISECOND, 999);
        Date d = c.getTime();
        return Constant.DATE_FORMAT_SQL.format(d);
    }

    public static String getNameColor(Integer color) {
        String nameString = null;
        try {
            switch (color) {
                case 1:
                    nameString = "Black";
                    break;
                case 2:
                    nameString = "White";
                    break;
                case 3:
                    nameString = "Yellow";
                    break;
                case 4:
                    nameString = "Blue";
                    break;
                case 5:
                    nameString = "Other";
                    break;
                default:
                    nameString = "";
                    break;
            }
        }catch (Exception e) {
            e.printStackTrace();
            nameString = "";
        }
        return nameString;
    }
}

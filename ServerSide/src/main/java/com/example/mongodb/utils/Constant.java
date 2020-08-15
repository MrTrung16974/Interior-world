package com.example.mongodb.utils;


import java.text.SimpleDateFormat;

public class Constant {

    public static String FORMAT_DATE_VN = "dd/MM/yyyy HH:mm:ss";


    public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
    public static final SimpleDateFormat DATE_FORMAT_HMS = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    public static final SimpleDateFormat DATE_FORMAT_SQL = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");

    public static final String FORMAT_DATE_BE = "dd/MM/YYYY HH:mm";
    public static final String FORMAT_DATE = "dd/MM/YYYY";
    //[function_user_ip] message
    public static final String LOG_FORMAT = "[{}] {}";
    //[function_user_ip] [RES: ] [ ms] message
    public static final String LOG_FORMAT_END = "[{}] [Res: {}] [{} ms] {}";
    public static final String SUFFIX_START_DATE = "000000";
    public static final String SUFFIX_END_DATE = "235959";

    public static final Integer ROLE_SUPER_ID = 1;
}

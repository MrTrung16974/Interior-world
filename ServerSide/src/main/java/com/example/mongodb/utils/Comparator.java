package com.example.mongodb.utils;
import java.util.Collection;
import java.util.Iterator;

/**
 * @author viettx
 *
 */
public class Comparator {
    private Comparator() {
        // Add a private constructor to hide the implicit public one.
    }

    /**
     * Compares the equality of two string which can be null or not.
     *
     * @param s1 first string
     * @param s2 second string
     * @return true if the Strings are equal; false otherwise.
     */
    public static boolean checkNullOrEmpty(String s){
        return s == null || s.isEmpty();
    }
    public static boolean checkNullOrEmpty(Object s){
        return s == null;
    }
    public static boolean checkNullOrEmpty(Collection<?> s){
        return s == null || s.isEmpty();
    }
    public static boolean isEqualStrings(String s1, String s2) {
        if (s1 == null) {
            if (s2 == null) {
                return true;
            } else {
                return false;
            }
        }

        return s1.equals(s2);
    }

    /**
     * Compares length of two given arrays of objects.
     *
     * @param array1
     * @param array2
     * @return true if the object lengths are equal; false otherwise.
     */
    public static boolean isEqualLengths(Object[] array1, Object[] array2) {
        if (isEqualNull(array1) && isEqualNull(array2)) {
            return true;
        }

        if (isEqualNull(array1) && !isEqualNull(array2)) {
            return false;
        }

        if (!isEqualNull(array1) && isEqualNull(array2)) {
            return false;
        }

        return array1.length == array2.length;
    }

    /**
     * Compares length of two given arrays of int values.
     *
     * @param arr1 first array of int values
     * @param arr2 second array of int values
     * @return true if the arrays are equal; false otherwise.
     */
    public static boolean isEqualLengths(int[] arr1, int[] arr2) {
        if (isEqualNull(arr1) && isEqualNull(arr2)) {
            return true;
        }

        if (isEqualNull(arr1) && !isEqualNull(arr2)) {
            return false;
        }

        if (!isEqualNull(arr1) && isEqualNull(arr2)) {
            return false;
        }

        return arr1.length == arr2.length;
    }

    /**
     * Compares length of two given arrays of double values.
     *
     * @param arr1 first array of double values
     * @param arr2 second array of double values
     * @return true if the arrays are equal; false otherwise.
     */
    public static boolean isEqualLengths(double[] arr1, double[] arr2) {
        if (isEqualNull(arr1) && isEqualNull(arr2)) {
            return true;
        }

        if (isEqualNull(arr1) && !isEqualNull(arr2)) {
            return false;
        }

        if (!isEqualNull(arr1) && isEqualNull(arr2)) {
            return false;
        }

        return arr1.length == arr2.length;
    }

    /**
     * Compares length of two given arrays of float values.
     *
     * @param array1 first array of float values
     * @param array2 second array of float values
     * @return true if the arrays are equal; false otherwise.
     */
    public static boolean isEqualLengths(float[] array1, float[] array2) {
        if (isEqualNull(array1) && isEqualNull(array2)) {
            return true;
        }

        if (isEqualNull(array1) && !isEqualNull(array2)) {
            return false;
        }

        if (!isEqualNull(array1) && isEqualNull(array2)) {
            return false;
        }

        return array1.length == array2.length;
    }

    /**
     * Compares length of two given arrays of objects
     *
     * @param arr1 first array of objects
     * @param arr2 second array of objects
     * @return true if the objects are equal; false otherwise.
     */
    public static boolean isEqualLengths(Object[] arr1, int[] arr2) {
        if (isEqualNull(arr1) && isEqualNull(arr2)) {
            return true;
        }

        if (isEqualNull(arr1) && !isEqualNull(arr2)) {
            return false;
        }

        if (!isEqualNull(arr1) && isEqualNull(arr2)) {
            return false;
        }

        return arr1.length == arr2.length;
    }

    /**
     * Compares size of two given arrays of collections
     *
     * @param col1 first collection
     * @param col2 second collection
     * @return true if the collections are equal; false otherwise.
     */
    public static boolean isEqualLengths(Collection<?> col1, Collection<?> col2) {
        if (isEqualNullOrEmpty(col1)) {
            if (isEqualNullOrEmpty(col2))
                return true;
            return false;
        }

        if (isEqualNullOrEmpty(col2))
            return false;

        return col1.size() == col2.size();
    }

    /**
     * Checks null object.
     *
     * @param data Object
     * @return true if the object is null; false otherwise.
     */
    public static boolean isEqualNull(Object data) {
        return data == null;
    }

    /**
     * Checks null array.
     *
     * @param data array of object
     * @return true if the array is null; false otherwise.
     */
    public static boolean isEqualNull(Object[] data) {
        return data == null;
    }

    /**
     * Checks null and length of a String.
     *
     * @param s String
     * @return true if the String is null or zero length; false otherwise.
     */
    public static boolean isEqualNullOrEmpty(String s) {
        return s == null || s.trim().length() == 0;
    }

    /**
     * Checks null and length of an object array.
     *
     * @param data array of object
     * @return true if the array is null or zero length; false otherwise.
     */
    public static boolean isEqualNullOrEmpty(Object[] data) {
        return data == null || data.length == 0;
    }

    /**
     * Checks null and size of a collection.
     *
     * @param data collection
     * @return true if the collection is null or contains no elements; false
     *         otherwise.
     */
    public static boolean isEqualNullOrEmpty(Collection<?> data) {
        return data == null || data.isEmpty();
    }

    /**
     * Checks null and size of an array of int values.
     *
     * @param data an array of int values
     * @return true if the array is null or the length is zero; false otherwise.
     */
    public static boolean isEqualNullOrEmpty(int[] data) {
        return data == null || data.length == 0;
    }

    /**
     * Checks null and size of an array of float values.
     *
     * @param data an array of float values.
     * @return true if the array is null or the length is zero; false otherwise.
     */
    public static boolean isEqualNullOrEmpty(float[] data) {
        return data == null || data.length == 0;
    }

    /**
     * Checks null and size of an array of double values.
     *
     * @param data an array of double values.
     * @return true if the array is null or the length is zero; false otherwise.
     * @author dang.dv, written on Oct 30, 2010
     */
    public static boolean isEqualNullOrEmpty(double[] data) {
        return data == null || data.length == 0;
    }

    /**
     * Checks null and size of an array of boolean values.
     *
     * @param data an array of boolean values.
     * @return true if the array is null or the length is zero; false otherwise.
     */
    public static boolean isEqualNullOrEmpty(boolean[] data) {
        return data == null || data.length == 0;
    }

    /**
     * Compares two given object.
     *
     * @param obj1 first object
     * @param obj2 second object
     * @return true if they are equal; false otherwise.
     */
    public static boolean isEqual(Object obj1, Object obj2) {
        if (obj1 == null) {
            if (obj2 == null)
                return true;
            return false;
        }
        return obj1.equals(obj2);
    }

    /**
     * Compares the equality of two byte array.
     *
     * @param a first byte array
     * @param b second byte array
     * @return true if they are equal; false otherwise.
     */
    public static boolean isEqual(byte[] a, byte[] b) {
        if (a.length != b.length)
            return false;
        int count = a.length;
        for (int i = 0; i < count; i++) {
            if (a[i] != b[i])
                return false;
        }
        return true;
    }

    /**
     * Compares equality of two given collection. They are equal if and only if each
     * element in one collection is equal with each element in another one.
     *
     * @param col1 first collection
     * @param col2 second collection
     * @return true if they are equal; false otherwise.
     */
    public static boolean isEqual(Collection<?> col1, Collection<?> col2) {
        if (!com.example.mongodb.utils.Comparator.isEqualLengths(col1, col2))
            return false;

        if (col1 != null && col2 != null) {
            for (Iterator<?> iter1 = col1.iterator(); iter1.hasNext();) {
                Object obj1 = iter1.next();
                boolean equal = false;
                for (Iterator<?> iter2 = col2.iterator(); iter2.hasNext();) {
                    Object obj2 = iter2.next();

                    if (obj1.equals(obj2)) {
                        equal = true;
                        break;
                    }
                }
                if (!equal)
                    return false;
            }
        }

        return true;
    }
}

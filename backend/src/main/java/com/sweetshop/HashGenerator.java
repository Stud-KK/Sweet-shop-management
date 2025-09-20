
package com.sweetshop;

import com.sweetshop.service.CustomAuthService;

public class HashGenerator {
    public static void main(String[] args) {
        CustomAuthService authService = new CustomAuthService(null, null); // pass null if you only call hash
        String hashed = authService.hashPassword("admin123"); // your desired admin password
        System.out.println(hashed);
    }
}

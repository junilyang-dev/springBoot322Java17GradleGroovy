package com.example.springboot322java17gradlegroovy.ioc;

public class Chef {
    public String cook(String menu) {
        // 재료 준비
//        Pork pork = new Pork("한돈 등심");
        Beef beef = new Beef("한우 꽃등심");
        // 요리 반환
//        return pork.getName() + "으로 만든 " + menu;
        return beef.getName() + "으로 만든 " + menu;
    }

}

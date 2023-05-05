package com.g4amqp.app_2;

public class Sensor {
    private int id;
    private String name;

    public Sensor(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

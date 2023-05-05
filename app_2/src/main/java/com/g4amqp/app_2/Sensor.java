package com.g4amqp.app_2;

public class Sensor {
    private int id;
    private String name;
    private int temperature;
    private int humidity;

    public Sensor(int id, String name, int temperature, int humidity) {
        this.id = id;
        this.name = name;
        this.humidity = humidity;
        this.temperature = temperature;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getHumidity() {
        return humidity;
    }

    public int getTemperature() {
        return temperature;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    public void setHumidity(int humidity) {
        this.humidity = humidity;
    }
}

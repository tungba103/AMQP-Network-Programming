package com.g4amqp.app_2;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.TimeoutException;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;

public class SensorDataGenerate {
    private static final String QUEUE_NAME = "sensor_data_queue";
    private static final int NUMBER_OF_SENSORS = 10;
    private static final int MAX_TEMPERATURE = 40;
    private static final int MAX_HUMIDITY = 100;

    public static void main(String[] args) throws IOException, InterruptedException, TimeoutException {
        
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        factory.setUsername("g4amqp");
        factory.setPassword("g4amqp");
        factory.setPort(5672);

        
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        
        Random random = new Random();
        Sensor[] sensors = new Sensor[NUMBER_OF_SENSORS];
       
        for (int i = 0; i < NUMBER_OF_SENSORS; i++) {
            sensors[i] = new Sensor(i + 1, "Sensor " + (i + 1), 0, 0);
        }

        while (true) {
            for (Sensor sensor : sensors) {
                int temperature = random.nextInt(MAX_TEMPERATURE);
                int humidity = random.nextInt(MAX_HUMIDITY);
                sensor.setTemperature(temperature);
                sensor.setHumidity(humidity);
                String message = "{\"temperature\": " + temperature + ", \"humidity\": " + humidity + "}";
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
                System.out.println(message);
            }
            Thread.sleep(1000); 
        }
    }
}   

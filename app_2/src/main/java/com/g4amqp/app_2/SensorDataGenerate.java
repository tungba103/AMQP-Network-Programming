package com.g4amqp.app_2;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.TimeoutException;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;

public class SensorDataGenerate {
    private static final String QUEUE_NAME = null;

    /**
     * @param args
     * @throws IOException
     * @throws TimeoutException
     */
    public static void main(String[] args) throws IOException, TimeoutException {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        factory.setUsername("g4amqp");
        factory.setPassword("g4amqp");
        factory.setPort(5672);

        try  (Connection connection = factory.newConnection()){
            Channel channel = connection.createChannel();
            
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            
            Random random = new Random();
    
            while (true) {
                double temperature = 20 + random.nextDouble() * 10;
                double humidity = 50 + random.nextDouble() * 20;
    
                String message = String.format("%.2f,%.2f", temperature, humidity);
                channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
                System.out.println("Sent message: " + message);
    
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}   

package com.g4amqp.app_4;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import java.nio.charset.StandardCharsets;

public class Recv {

    private final static String QUEUE_NAME_LED_26 = "led_26_status";
    private final static String QUEUE_NAME_LED_27 = "led_27_status";

    public static void listenLED26() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME_LED_26, true, false, false, null);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            String output = message.equals("1") ? "ON" : "OFF";
            System.out.println("LED26: '" + output + "'");
        };
        channel.basicConsume(QUEUE_NAME_LED_26, true, deliverCallback, consumerTag -> {
        });

    }

    public static void listenLED27() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(QUEUE_NAME_LED_27, true, false, false, null);

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
            String output = message.equals("1") ? "ON" : "OFF";
            System.out.println("LED27: '" + output + "'");
        };
        channel.basicConsume(QUEUE_NAME_LED_27, true, deliverCallback, consumerTag -> {
        });

    }

    public static void main(String[] argv) throws Exception {
        listenLED26();
        listenLED27();
        // ConnectionFactory factory = new ConnectionFactory();
        // factory.setHost("g4amqp.freeddns.org");
        // Connection connection = factory.newConnection();
        // Channel channel = connection.createChannel();

        // channel.queueDeclare(QUEUE_NAME_LED_26, true, false, false, null);
        // channel.queueDeclare(QUEUE_NAME_LED_27, true, false, false, null);
        // System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        // DeliverCallback deliverCallback = (consumerTag, delivery) -> {
        // System.out.println(consumerTag);
        // System.out.println(delivery);
        // String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
        // String output = message == "true" ? "ON" : "OFF";
        // System.out.println("LED26: '" + output + "'");
        // };
        // channel.basicConsume(QUEUE_NAME_LED_26, true, deliverCallback, consumerTag ->
        // {
        // });
        // channel.basicConsume(QUEUE_NAME_LED_27, true, deliverCallback, consumerTag ->
        // {
        // });
    }
}
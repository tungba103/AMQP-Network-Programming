package com.g4amqp.app_4;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.nio.charset.StandardCharsets;

public class Send {

    private final static String QUEUE_NAME_LED_26 = "led_26_status";
    private final static String QUEUE_NAME_LED_27 = "led_27_status";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        try (Connection connection = factory.newConnection();
                Channel channel = connection.createChannel()) {
            channel.queueDeclare(QUEUE_NAME_LED_26, true, false, false, null);
            channel.queueDeclare(QUEUE_NAME_LED_27, true, false, false, null);
            String message = "1";
            channel.basicPublish("", QUEUE_NAME_LED_26, null, message.getBytes(StandardCharsets.UTF_8));
            channel.basicPublish("", QUEUE_NAME_LED_27, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [x] Sent '" + message + "'");
        }
    }
}
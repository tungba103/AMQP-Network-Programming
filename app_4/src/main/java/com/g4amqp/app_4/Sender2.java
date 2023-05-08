package com.g4amqp.app_4;

import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Sender2 {

    private final static String QUEUE_NAME_LED_26 = "led_26_status";
    private final static String QUEUE_NAME_LED_27 = "led_27_status";

    public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        try (Connection connection = factory.newConnection();
                Channel channel = connection.createChannel()) {
            channel.exchangeDeclare(QUEUE_NAME_LED_26, BuiltinExchangeType.FANOUT);
            channel.exchangeDeclare(QUEUE_NAME_LED_27, BuiltinExchangeType.FANOUT);

            String message = "0";

            channel.basicPublish(QUEUE_NAME_LED_26, "", null, message.getBytes("UTF-8"));
            channel.basicPublish(QUEUE_NAME_LED_27, "", null, message.getBytes("UTF-8"));
            System.out.println(" [x] Sent '" + message + "'");
        }
    }

}
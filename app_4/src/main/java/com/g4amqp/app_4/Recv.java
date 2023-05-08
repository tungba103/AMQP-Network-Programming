package com.g4amqp.app_4;

import com.rabbitmq.client.*;

public class Recv {
    private final static String QUEUE_NAME_LED_26 = "led_26_status";
    private final static String QUEUE_NAME_LED_27 = "led_27_status";

    public static void led26() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(QUEUE_NAME_LED_26, BuiltinExchangeType.FANOUT);
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, QUEUE_NAME_LED_26, "");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            String output = message.equals("1") ? "ON" : "OFF";
            System.out.println("LED26: '" + output + "'");
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }

    public static void led27() throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("g4amqp.freeddns.org");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(QUEUE_NAME_LED_27, BuiltinExchangeType.FANOUT);
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, QUEUE_NAME_LED_27, "");

        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            String output = message.equals("1") ? "ON" : "OFF";
            System.out.println("LED27: '" + output + "'");
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }

    public static void main(String[] argv) throws Exception {
        led26();
        led27();
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
    }
}
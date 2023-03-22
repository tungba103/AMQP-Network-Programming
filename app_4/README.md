### 4.	Chương trình hiển thị thông tin điều khiển tại các cảm biến (được gửi từ gateway)
- Yêu cầu: C++/Java
- Chương trình này cũng như chương trình của phần 2. Đơn giản là chương trình sẽ kết nối với AMQP Server (RabbitMQ) nhưng khác là nó lắng nghe và nhận dữ liệu từ Server.
- Hiểu đơn giản qua VD: Như hình trên có 2 đèn LED 26 và LED 28 sẽ có 2 trạng thái là bật (1) và tắt(0). Chương trình sẽ lắng nghe xem trạng thái của các đèn có thay đổi hay không nếu thay đổi thì sẽ tắt hoặc bật đèn (phần tắt bật đèn là liên quan phần cứng mình không phải làm chỉ cần in ra màn hình Console là đèn bật hay tắt là được, nhưng nếu mà làm thêm được GUI thì đỉnh 😊).
- Đi vào cụ thế dễ hiểu hơn:
    ``` bash
    # Chương trình hiện thị:
    LED26: OFF
    LED27: OFF
    ```
- Chương trình đăng ký lắng nghe qua giao thức AMQP đến server RabbitMQ:
    ``` bash
    led26_status: 0
    led27_status: 0
    ```
- Chương trình số 3 (bên trên) sẽ thực hiện bật 2 đèn, khi đó sẽ gửi thông tin đến RabbitMQ rằng 2 đèn bật vậy thông tin sẽ là:
    ``` bash
    led26_status: 1
    led27_status: 1
    ```
- Khi chương trình nhân thấy thay đổi sẽ đổi trạng thái hiện thị:
    ``` bash
    # Chương trình hiện thị:
    LED26: ON
    LED27: ON
    ```

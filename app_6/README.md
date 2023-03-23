### 6. Chương trình hiển thị đánh giá hiệu năng của giao thức: Throughput, delay, v.v. khi số lượng node cảm biến tăng lên.

### Các khái niệm cần hiểu

``basic-get``: Là một phương thức trong giao thức AMQP (Advanced Message Queuing Protocol), cho phép một consumer (người tiêu thụ) lấy một message (tin nhắn) từ một queue (hàng đợi) trong broker (trung tâm thông điệp).

`basic-get-auto`: Là một phương thức tương tự với `basic-get`, nhưng consumer sẽ tự động yêu cầu tin nhắn tiếp theo sau khi lấy tin nhắn trước đó.

`greedy-consumer`: Là một consumer tiêu thụ tin nhắn từ một hàng đợi một cách tăng tốc độ mà không cần quan tâm đến việc xử lý tin nhắn đó. Điều này có thể gây ra các vấn đề như tắc nghẽn và thời gian xử lý chậm trễ.

`publisher-confirms`: Là một tính năng trong giao thức AMQP cho phép producer (người sản xuất) xác nhận xem broker đã nhận được và lưu trữ tin nhắn thành công hay không.

`slow-consumer-persistent`: Là một consumer xử lý tin nhắn một cách chậm chạp và sử dụng tính năng lưu trữ định kỳ để tránh mất mát dữ liệu.

`nack`: Là một phản hồi của consumer cho broker khi consumer không thể xử lý tin nhắn và tin nhắn đó không thể được gửi lại hàng đợi hoặc bị loại bỏ.

`unroutable-return`: Là một sự kiện xảy ra khi broker không thể đưa tin nhắn vào queue do không tìm thấy route phù hợp. Broker sẽ trả lại tin nhắn đó cho producer để xử lý.

`unroutable-drop`: Là một sự kiện xảy ra khi broker không thể đưa tin nhắn vào queue do không tìm thấy route phù hợp, và tin nhắn đó bị loại bỏ.

`stream`: Là một khái niệm trong lập trình hướng đối tượng để xử lý dữ liệu một cách liên tục. Stream cho phép lấy dữ liệu từ một nguồn (ví dụ: file, socket, database) và xử lý nó một cách dần dần, thay vì tải toàn bộ dữ liệu vào bộ nhớ và xử lý cùng một lúc.
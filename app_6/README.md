### 6. Chương trình hiển thị đánh giá hiệu năng của giao thức: Throughput, delay, v.v. khi số lượng node cảm biến tăng lên.

### Các khái niệm cần hiểu

### 1. ``basic-get``: 

Tính năng Basic Get trong AMQP cho phép người dùng lấy một tin nhắn từ một hàng đợi (queue) trong hệ thống AMQP. Khi sử dụng tính năng này, người dùng có thể lấy tin nhắn đầu tiên trong hàng đợi mà không cần đăng ký một consumer (người tiêu dùng).

Phương pháp Basic Get Test trong AMQP thường được sử dụng để kiểm tra tính đúng đắn và hiệu quả của hệ thống AMQP trong việc lấy các tin nhắn từ hàng đợi. Khi sử dụng phương pháp này, một số lượng lớn các tin nhắn sẽ được đưa vào hàng đợi, sau đó các nhà phát triển sẽ sử dụng tính năng Basic Get để lấy các tin nhắn từ hàng đợi.

Sau khi các tin nhắn đã được lấy từ hàng đợi, các nhà phát triển sẽ kiểm tra tính đúng đắn của các tin nhắn bằng cách so sánh chúng với các tin nhắn được gửi đến hàng đợi ban đầu. Nếu tất cả các tin nhắn được lấy từ hàng đợi đều chính xác và không bị mất hoặc lỗi, thì tính năng Basic Get của hệ thống AMQP được coi là hoạt động tốt. Nếu không, các nhà phát triển sẽ phải tìm hiểu nguyên nhân và sửa chữa để đảm bảo tính đúng đắn và tin cậy của hệ thống.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  QUEUE: basic-get
  ROUTING_KEY: basic-get
  VARIABLE_RATE: "1:1,0:30"
  POLLING: "true"
  POLLING_INTERVAL: 5000
  AUTOACK: "false"
  SERVERS_STARTUP_TIMEOUT: &startup_timeout 60
  METRICS_PROMETHEUS: "true"
```

### 2. `basic-get-auto`: 

Là một phương thức tương tự với `basic-get`, nhưng consumer sẽ tự động yêu cầu tin nhắn tiếp theo sau khi lấy tin nhắn trước đó.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  QUEUE: basic-get
  ROUTING_KEY: basic-get
  PRODUCERS: 0
  POLLING: "true"
  POLLING_INTERVAL: 5000
  AUTOACK: "true"
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

### 3. `greedy-consumer`: 

Greedy consumer test trong AMQP là một phương pháp được sử dụng để đánh giá hiệu năng của một hệ thống AMQP.

Ý tưởng của phương pháp này là sử dụng một consumer (người tiêu dùng) tham lam để lấy các tin nhắn từ một hàng đợi (queue) trong hệ thống. Consumer này sẽ luôn lấy tin nhắn đầu tiên trong hàng đợi và xử lý nó mà không quan tâm đến các tin nhắn tiếp theo. Khi tin nhắn đầu tiên đã được xử lý, consumer sẽ tiếp tục lấy tin nhắn tiếp theo.

Phương pháp này được sử dụng để đánh giá hiệu năng của hệ thống AMQP trong các tình huống với một số lượng lớn các tin nhắn đang chờ xử lý trong hàng đợi. Bằng cách sử dụng consumer tham lam, ta có thể đánh giá xem hệ thống có thể xử lý được bao nhiêu tin nhắn trong một khoảng thời gian nhất định và có thể tối ưu hóa hiệu năng của hệ thống cho các tình huống thực tế.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  QUEUE: greedy-consumer
  ROUTING_KEY: greedy-consumer
  VARIABLE_RATE: "100:20,0:20"
  CONSUMER_RATE: 50
  QOS: 2000
  AUTOACK: "false"
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

### 4. `publisher-confirms`: 
Publisher Confirms là một tính năng của giao thức AMQP (Advanced Message Queuing Protocol) cho phép các nhà phát triển xác nhận rằng các tin nhắn đã được gửi đến một hàng đợi (queue) của một hệ thống AMQP mà không bị mất hoặc lỗi.

Publisher Confirms Test là một phương pháp kiểm tra tính năng Publisher Confirms của hệ thống AMQP. Phương pháp này thường được sử dụng để đảm bảo tính đúng đắn và tin cậy của hệ thống.

Khi sử dụng phương pháp Publisher Confirms Test, một số lượng lớn các tin nhắn sẽ được gửi đến một hàng đợi của hệ thống AMQP. Sau đó, các nhà phát triển sẽ theo dõi các xác nhận từ hệ thống để đảm bảo rằng các tin nhắn đã được gửi đến hàng đợi một cách đúng đắn và không bị mất hoặc lỗi.

Nếu các xác nhận trả về cho thấy rằng các tin nhắn đã được gửi đến hàng đợi đúng đắn và không bị mất hoặc lỗi, thì tính năng Publisher Confirms của hệ thống AMQP được coi là hoạt động tốt. Nếu không, các nhà phát triển sẽ phải tìm hiểu nguyên nhân và sửa chữa để đảm bảo tính đúng đắn và tin cậy của hệ thống.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  QUEUE: publisher-confirms
  ROUTING_KEY: publisher-confirms
  AUTOACK: "true"
  VARIABLE_RATE: "12:30,25:30,50:30,100:30"
  CONFIRM: 1
  CONFIRM_TIMEOUT: 1
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

### 5. `slow-consumer-persistent`: 
Slow Consumer Persistent (SCP) test là một kiểm tra được thực hiện trong giao thức AMQP (Advanced Message Queuing Protocol) để đảm bảo tính ổn định và khả năng chịu tải của hệ thống.

SCP test được sử dụng để đánh giá khả năng xử lý thông điệp của một consumer khi tốc độ nhận thông điệp chậm hơn tốc độ sản xuất của producer. Trong trường hợp này, consumer phải lưu trữ các thông điệp trong hàng đợi và xử lý chúng khi tốc độ nhận được tăng lên.

SCP test được thực hiện bằng cách đưa vào hệ thống một lượng lớn các thông điệp với tốc độ cao, và kiểm tra xem consumer có thể xử lý tất cả các thông điệp này hay không. Nếu consumer không thể xử lý tất cả các thông điệp, các thông điệp chưa được xử lý sẽ được lưu trữ trong hàng đợi, và hệ thống sẽ tiếp tục thực hiện SCP test để đảm bảo rằng consumer có thể xử lý tất cả các thông điệp trong hàng đợi.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  QUEUE: ha3-slow-consumer-persistent
  ROUTING_KEY: slow-consumer-persistent
  QUEUE_ARGS: x-max-length=10000
  FLAG: persistent
  AUTO_DELETE: "false"
  SIZE: 51200
  VARIABLE_RATE: "100:20,0:20"
  CONSUMER_RATE: 50
  QOS: 50
  AUTOACK: "false"
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

### 6. `nack`: 

NACK test là một phương pháp kiểm tra tính ổn định và khả năng chịu lỗi của hệ thống trong giao thức AMQP (Advanced Message Queuing Protocol).

Trong AMQP, một producer gửi các thông điệp tới một exchange, sau đó exchange định tuyến các thông điệp đó tới một hoặc nhiều queue, và cuối cùng các consumer sẽ nhận các thông điệp từ các queue đó. Nếu một consumer nhận được một thông điệp nhưng không thể xử lý nó, nó có thể gửi một NACK (Negative Acknowledgement) tới exchange để đánh dấu thông điệp đó là không thể xử lý.

NACK test được sử dụng để kiểm tra khả năng chịu lỗi của hệ thống trong trường hợp một consumer không thể xử lý một hoặc nhiều thông điệp. Kiểm tra này được thực hiện bằng cách đưa vào hệ thống một lượng lớn các thông điệp, sau đó cho phép các consumer xử lý các thông điệp đó. Nếu một consumer không thể xử lý một thông điệp, nó sẽ gửi một NACK tới exchange để đánh dấu thông điệp đó là không thể xử lý.

Sau đó, hệ thống sẽ tiếp tục gửi lại các thông điệp đó đến consumer để xử lý lại. Kiểm tra này sẽ được lặp lại cho đến khi tất cả các thông điệp được xử lý hoặc các thông điệp không thể xử lý được đánh dấu là không thể xử lý hoặc bị loại bỏ khỏi hàng đợi. Kiểm tra NACK sẽ giúp đảm bảo tính ổn định và khả năng chịu lỗi của hệ thống AMQP.

**Config Test**:
``` yaml
command: /bin/bash -c "while true; do bin/runjava com.rabbitmq.perf.PerfTest; sleep 10; done"
environment:
  TIME: 60
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  VARIABLE_RATE: "1:10,0:20"
  QUEUE: nack
  QUEUE_ARGS: x-max-length=100
  ROUTING_KEY: nack
  AUTOACK: "false"
  NACK: "true"
  QOS: 5
  CONSUMER_LATENCY: 3000000
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

### 7. `unroutable-return`:
Trong AMQP, khi một producer gửi một thông điệp tới một exchange, exchange sẽ định tuyến thông điệp đó tới một hoặc nhiều queue dựa trên các quy tắc định tuyến. Tuy nhiên, trong một số trường hợp, exchange có thể không tìm thấy queue nào phù hợp để định tuyến thông điệp. Trong trường hợp này, exchange có thể xử lý thông điệp không thể định tuyến theo một cách nhất định.

Unroutable-Return test được sử dụng để kiểm tra khả năng xử lý các thông điệp không thể định tuyến trong hệ thống AMQP. Kiểm tra này được thực hiện bằng cách đưa vào hệ thống một lượng lớn các thông điệp không thể định tuyến. Hệ thống sẽ tiếp nhận các thông điệp này từ producer và cố gắng định tuyến chúng tới queue phù hợp.

Nếu một thông điệp không thể định tuyến, exchange sẽ trả lại thông điệp đó tới producer. Unroutable-Return test đảm bảo rằng hệ thống AMQP có thể xử lý và xử lý các thông điệp không thể định tuyến một cách chính xác và ổn định.

Kết quả của kiểm tra này có thể được sử dụng để đánh giá tính ổn định và khả năng xử lý thông điệp của hệ thống AMQP trong trường hợp thông điệp không thể định tuyến xảy ra.

**Config Test**:
``` yaml
environment:
  URI: "amqp://guest:guest@rabbitmq:5672/%2f"
  VARIABLE_RATE: "2:30,4:30,10:30"
  VARIABLE_SIZE: "100:30,200:30"
  CONSUMERS: 0
  FLAG: mandatory
  SERVERS_STARTUP_TIMEOUT: *startup_timeout
  METRICS_PROMETHEUS: "true"
```

`unroutable-drop`: Là một sự kiện xảy ra khi broker không thể đưa tin nhắn vào queue do không tìm thấy route phù hợp, và tin nhắn đó bị loại bỏ.

`stream`: Là một khái niệm trong lập trình hướng đối tượng để xử lý dữ liệu một cách liên tục. Stream cho phép lấy dữ liệu từ một nguồn (ví dụ: file, socket, database) và xử lý nó một cách dần dần, thay vì tải toàn bộ dữ liệu vào bộ nhớ và xử lý cùng một lúc.
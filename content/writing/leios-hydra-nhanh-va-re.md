---
title: 'Leios và Hydra: vì sao Cardano cần cả hai để vừa nhanh vừa rẻ'
lang: vi
date: '2025-12-03'
kind: protocol
readingTime: 5
summary: 'Leios mở rộng băng thông Layer 1 nhưng không làm phí rẻ đi. Hydra đưa phí về 0 nhưng cổng vào vẫn là giao dịch L1. Cardano chỉ thật sự nhanh và rẻ khi hai mảnh đi cùng nhau.'
tags: ['cardano', 'hydra', 'leios', 'layer-2', 'scaling', 'ouroboros']
canonical: 'https://wiki.ada-defi.io.vn/doc/leios-hydra-cap-bai-trung-mo-ra-ky-nguyen-high-speed-low-fee-tren-cardano-jsrMkQS7ie'
---

Người ta thường nói về **Ouroboros Leios** và **Hydra** như hai giải pháp mở rộng riêng biệt của Cardano. Đặt chúng cạnh nhau mới thấy một quan hệ phụ thuộc: Leios làm đường rộng ra nhưng không làm phí rẻ đi, còn Hydra làm phí bằng 0 nhưng vẫn phải đi qua con đường đó. Tách rời thì cả hai đều hụt.

Bài này mổ xẻ đúng chỗ hai mảnh khớp vào nhau.

## Leios là gì: mở rộng con đường

Leios là bản nâng cấp giao thức đồng thuận Ouroboros. Nó tách *xác thực giao dịch* khỏi *tạo khối*. Cơ chế Input Endorsers đóng gói giao dịch song song và liên tục vào các Input Block, không phải chờ Ranking Block được mint. Kết quả là thông lượng Layer 1 có thể lên mốc 1000+ TPS.

Hình dung con đường làng hai làn được nâng thành cao tốc nhiều làn. Xe không còn nối đuôi chờ nhau. Nhưng mở rộng đường không đụng gì tới giá vé qua trạm. Đó là chỗ mấu chốt.

## Vấn đề: đường rộng ra, phí không đổi

Phí giao dịch trên L1 vẫn giữ nguyên để bảo đảm an ninh mạng. Với một dApp thật, con số này giết chết mô hình kinh doanh trước khi tốc độ kịp giúp:

```
Phí trung bình L1        : ~0,17 ADA / giao dịch
Một dApp cần             : 1.000.000 giao dịch / ngày
Chi phí (dù đã có Leios) : 1.000.000 × 0,17 = 170.000 ADA / ngày
```

Leios xử lý xong một triệu giao dịch trong chớp mắt. Nhưng 170.000 ADA mỗi ngày là con số không ai gánh được. Nhanh mà vẫn đắt thì vẫn không dùng được.

## Hydra là gì: đưa việc ra khỏi đường chính

Hydra là Layer 2 dạng isomorphic state channel. Giao dịch được đẩy ra off-chain, xử lý nội bộ trong một Head, rồi chỉ kết toán trạng thái cuối về L1. Bên trong Head: thông lượng cao, finality tức thì, phí gần như bằng 0.

Thay vì trả 0,17 ADA mỗi lần qua trạm, bạn mua một vé trọn gói vào khu riêng. Trong khu đó chơi bao nhiêu vòng tuỳ thích, chi phí bằng 0, và chỉ trả phí cổng đúng một lần lúc ra. Bài toán 170.000 ADA mỗi ngày ở trên tan biến.

## Nút thắt: cổng vào Hydra cũng là giao dịch L1

Đây là chỗ hai mảnh khớp vào nhau, và cũng là chỗ dễ bị bỏ qua nhất.

::callout{type="warning" title="Vì sao Hydra cần Leios"}
Mọi thao tác quản trị Hydra, gồm Open Head, Increment Deposit, Fanout và Close, thực chất đều là *giao dịch L1*. Head chạy nhanh và rẻ, nhưng cửa ra vào Head vẫn nằm trên con đường chính. L1 tắc là bạn kẹt ngay ở cổng.
::

Hydra là con tàu siêu tốc, rẻ và nhanh. Nhưng để lên tàu, bạn phải qua cổng soát vé là L1. Cổng chậm và đông thì tàu nhanh mấy cũng vô nghĩa, vì bạn mất cả buổi xếp hàng ở ga.

Leios chính là thứ mở rộng cổng đó. Với băng thông L1 lớn, các giao dịch quản trị Hydra, vốn nặng về script validation, được stream liên tục qua Input Endorsers. Open và Close Head diễn ra gần như tức thì.

## Cộng hưởng, không phải cộng dồn

Đặt hai use case cạnh nhau thấy rõ vì sao thiếu một mảnh là hỏng cả:

| Tình huống | Thiếu Leios hoặc Hydra | Có cả hai |
| --- | --- | --- |
| DEX phái sinh: 1000 lệnh Long/Short/Cancel | Mỗi lệnh 20s, trượt giá; huỷ lệnh tốn 0,17 ADA | Mở kênh trong ~1s, 1000 lệnh phí 0, độ trễ dưới 1s |
| Game realtime: ván cờ 50 nước | 50 × 0,17 = 8,5 ADA/ván, không ai chơi nổi | Nước đi off-chain miễn phí, chỉ submit kết quả cuối lên L1 |

Mô hình rút ra là *hybrid scaling*. Leios là lớp vận chuyển: giữ con đường L1 luôn thông để chịu hàng ngàn lượt ra vào kênh mỗi giây. Hydra là lớp thực thi: tận dụng sự thông thoáng đó để tạo các luồng giao dịch tốc độ cao, phí bằng 0.

## Điều rút ra

Thiếu Leios, Hydra kẹt ở cổng. Thiếu Hydra, Leios nhanh nhưng vẫn đắt. Điều đáng chú ý không phải mỗi thứ mạnh cỡ nào, mà là cả hai vá đúng điểm yếu của nhau. Một cái giải băng thông, một cái giải chi phí. Mở rộng thật chỉ xuất hiện ở chỗ hai lời giải gặp nhau.

Tôi đã chạy thật phần Hydra trong [Hydra Fly](/writing/hydra-fly-build-log), một game realtime có cược. Những con số về phí, độ trễ và tranh chấp UTXO ở đó là minh chứng cụ thể cho lập luận trong bài này.

---
title: 'Từ 20.724 xuống 724 ADA: nhật ký dựng một game realtime on-chain trên Hydra'
lang: vi
date: '2026-04-01'
kind: engineering
readingTime: 11
summary: 'Hydra Fly là một game kỹ năng thời gian thực chạy trên Cardano Hydra. Kể lại hành trình dựng game qua bốn lần "vỡ trận": một cuộc tấn công mô phỏng vật lý không cần hack, thiết kế khoá hơn 20.000 ADA để không làm gì, và bài toán tranh chấp UTXO suýt bóp nghẹt thông lượng.'
tags: ['cardano', 'hydra', 'eutxo', 'scaling', 'anti-cheat']
canonical: 'https://wiki.ada-defi.io.vn/doc/cau-chuyen-xay-dung-hydra-fly-tu-y-tuong-den-mainnet-ready-xeWv01p2VY'
---

Một game "Flappy Bird gắn blockchain" nghe đơn giản đến mức dễ xem thường. Thực tế, dựng nó là chuỗi những lần vỡ trận: mỗi lần một giả định tưởng đúng gãy ra, và mỗi lần gãy lại lộ một giới hạn của mô hình eUTXO. Đây là nhật ký bốn lần vỡ trận đó - kể theo đúng thứ tự diễn ra.

::callout{type="insight" title="Luận điểm trung tâm"}
Bài toán của một game có cược on-chain không phải "kết nối ví và gửi ADA", mà là ba ràng buộc đồng thời: xác nhận đủ nhanh để không phá trải nghiệm, phí đủ thấp để stake nhỏ vẫn có lãi, và *provably fair* - người chơi tự xác minh được kết quả, không phải tin vào server.
::

Cardano Layer 1 có thời gian xác nhận khoảng 20 giây và phí cố định cho mỗi giao dịch. Không hợp cho microtransaction trong game. Hydra Head giải cả ba ràng buộc cùng lúc: xác nhận dưới 1 giây, phí bằng 0 bên trong Head, và trạng thái vẫn kết toán về L1 bất kỳ lúc nào. Phần còn lại của bài viết là chuyện điều đó gãy ở đâu.

## Vỡ trận 1: kẻ gian không cần hack

Trong lần kiểm thử nội bộ, một lỗ hổng lộ ra mà không đụng tới một dòng anti-cheat nào. Kẻ tấn công không inject điểm, không giả chữ ký. Họ chỉ đọc `mapSeed` từ API, tái tạo bản đồ cục bộ, chạy mô phỏng vật lý để tìm chuỗi tap tối ưu, rồi gửi đúng chuỗi tap đó qua socket như người chơi thật.

Mọi lớp anti-cheat đều xanh, vì từng cú tap đều hợp lệ và trông tự nhiên. Cái sai không nằm ở giao dịch - nó nằm ở chỗ *server tin rằng người ở đầu bên kia đang thật sự chơi*.

::callout{type="danger" title="Physics Simulation Attack"}
Không có chữ ký nào bị giả. Bot thắng bằng chính luật chơi thật, chỉ là nó "chơi" bằng một trình giải thay vì ngón tay. Đây là lớp gian lận khó nhất: hợp lệ ở mọi tầng kiểm tra kỹ thuật.
::

Hai hướng phòng thủ được xếp ưu tiên cao nhất, và cả hai đều tấn công vào gốc - *lấy đi khả năng biết trước bản đồ*:

- **Seeded PRNG cho vị trí chướng ngại.** Nếu server giữ toàn bộ layout sinh ra từ seed bí mật, bot không thể pre-compute mà không chạy game thật.
- **Phát hiện bất thường trong phân phối điểm.** Bot luôn chạm gần điểm tối đa; người thật có phương sai cao hơn nhiều. Theo dõi phân phối điểm theo ví qua thời gian là một tín hiệu khó ngụy trang.

## Vỡ trận 2: thiết kế khoá 20.000 ADA để không làm gì

Bảng xếp hạng on-chain ban đầu có ba lớp, trong đó lớp dưới cùng cấp cho mỗi người chơi một UTXO riêng. Nghe hợp lý, cho tới khi tính chi phí vận hành thật:

```
1.000 người chơi   → 2.000 ADA bị khoá vô thời hạn trong Hydra Head
10.000 người chơi  → 20.000 ADA bị khoá
```

Toàn bộ số ADA đó phải được admin commit vào Head *trước khi mở*, và không rút được cho đến khi Head đóng. Với bất kỳ operator nào, đây là con số không thực tế - vốn chết nằm im chỉ để giữ chỗ.

Lời giải là bỏ hẳn lớp per-player. Admin ký thẳng vào 20 shard UTXO - gọi là **Direct Shard Submit**. Kết quả trên mốc 10.000 người chơi:

| Chỉ số | Trước | Sau |
| --- | --- | --- |
| ADA khoá trong Head | ~20.724 | **724** |
| Số UTXO trong Head | 21 + N (tăng mãi) | **21 cố định** |
| Thay đổi | - | **-96,5%** |

Ít UTXO hơn không chỉ tiết kiệm ADA. Cách này còn giảm độ trễ xác nhận snapshot và giảm bộ nhớ của mọi Hydra node. Một quyết định, ba tầng lợi ích - dấu hiệu gỡ đúng nút thắt.

## Vỡ trận 3: 20 shard, một địa chỉ, một lỗ hổng

Sau khi gộp lớp, 20 shard vẫn nằm chung *một* địa chỉ validator. Đó là cửa cho tấn công đầu độc: bất kỳ ai cũng gửi được ADA tới địa chỉ đó, tạo một UTXO giả mang `shard_id` trùng shard thật. Nếu admin lỡ tiêu nhầm UTXO giả, dữ liệu shard đó biến mất, thay bằng dữ liệu của kẻ tấn công.

Cách chặn là đưa `shard_id` vào tham số compile-time của validator. Mỗi shard giờ có một địa chỉ Cardano riêng - 20 shard, 20 địa chỉ. Không ai tạo được UTXO hợp lệ cho shard 5 tại địa chỉ shard 7, và không có "ô nhiễm chéo" giữa các shard. Một off-chain registry giữ vai trò nguồn sự thật duy nhất: chỉ UTXO do admin tạo và ghi vào registry mới được công nhận, khoá luôn hướng tấn công tạo UTXO giả trước khi khởi tạo.

## Vỡ trận 4: hai người ghi điểm cùng lúc

Đây là chỗ mô hình eUTXO đòi nợ. Mỗi UTXO chỉ cho phép đúng một giao dịch tiêu tại một thời điểm. Hai giao dịch cùng tham chiếu một shard UTXO thì chỉ một thành công, cái kia bị từ chối. Với 20 shard và phân phối ví bằng `keccak256(wallet) % 20`, xác suất va chạm leo rất nhanh:

```
5 ván/giây   → ~2,5% va chạm
20 ván/giây  → ~47,5%
50 ván/giây  → hơn 1 va chạm mỗi giây (không trụ nổi)
```

Đây chính là *shard contention* - kẻ thù số một của thông lượng trong eUTXO. Lời giải là một hàng đợi riêng cho mỗi shard, `concurrency = 1`: không bao giờ có hai giao dịch tranh cùng một shard UTXO.

Điểm mấu chốt là *vì sao cách này chạy được ở đây mà không chạy trên L1*. Hàng đợi tuần tự chỉ khả thi khi mỗi bước xác nhận cực nhanh. Trên L1, 20 giây một xác nhận biến hàng đợi thành nghẽn cứng. Trên Hydra, dưới 1 giây biến đúng kiến trúc đó thành hệ thống thông lượng cao:

```
Phase 1: 20 shard × 1 điểm/giây        → ~20 điểm/giây
Phase 2: gộp 10 điểm mỗi giao dịch      → ~222 điểm/giây (đủ cho hơn 4.400 người chơi đồng thời)
```

::callout{type="note" title="Chi tiết cơ chế sharding"}
Vì sao chọn 21 phân mảnh, chiến lược gộp khi đọc bảng tổng, và các đánh đổi về tính nhất quán được mổ xẻ riêng trong [21 UTXO cho vạn người chơi](/writing/hydra-leaderboard-sharding).
::

## Kiến trúc sau bốn lần vỡ trận

```
Trạng thái Hydra Head (cố định, không phụ thuộc số người chơi):
  20 Shard UTXO         - mỗi shard giữ ~200 ví và điểm cao nhất
  1  GlobalSnapshot     - top-N gộp từ mọi shard
  ─────────────────────────────────────────────────────────
  Tổng: 21 UTXO, 724 ADA khoá, ~4 ADA phí L1 một lần
```

Mỗi khi một người chơi lập personal best: backend xác minh qua anti-cheat và replay hash, admin ký giao dịch vào đúng shard, Hydra xác nhận dưới 1 giây, điểm số cùng replay hash được ghi vĩnh viễn. Người chơi vào Trust Center tự verify được mọi kết quả - không cần tin server, không cần tin đội ngũ.

Không có mẹo thần kỳ nào ở đây. Mỗi lần vỡ trận đều bắt đầu từ một giả định trông hiển nhiên - "cho mỗi người một UTXO", "một validator là đủ", "cứ ghi song song" - và chỉ gãy khi chạm số thật. Giá trị không nằm ở kiến trúc cuối cùng gọn gàng, mà ở chuỗi câu hỏi buộc phải trả lời để tới được đó.

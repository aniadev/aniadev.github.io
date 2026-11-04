---
title: 'Game realtime on-chain trên Cardano Hydra: nhật ký bốn lần vỡ trận'
lang: vi
date: '2026-04-01'
kind: engineering
readingTime: 7
summary: 'Hydra Fly là game realtime trên Cardano Hydra. Bốn giả định gãy khi chạm số thật: bot mô phỏng vật lý, 20.000 ADA khoá chết, UTXO giả và shard contention.'
tags: ['cardano', 'hydra', 'eutxo', 'scaling', 'anti-cheat', 'game-on-chain']
canonical: 'https://wiki.ada-defi.io.vn/doc/cau-chuyen-xay-dung-hydra-fly-tu-y-tuong-den-mainnet-ready-xeWv01p2VY'
---

Hydra Fly là một game kỹ năng kiểu Flappy Bird, có cược, chạy trên Cardano Hydra. Nghe đơn giản. Thực tế, dựng nó là bốn lần một giả định tưởng đúng bị gãy khi gặp số thật. Mỗi lần gãy lại lộ ra một giới hạn của mô hình eUTXO.

Bài này kể lại bốn lần đó theo đúng thứ tự xảy ra. Nếu bạn đang định đưa một game có cược lên Cardano, đây là những câu hỏi bạn sẽ phải trả lời sớm hay muộn.

::callout{type="insight" title="Luận điểm trung tâm"}
Bài toán của game có cược on-chain không phải "kết nối ví rồi gửi ADA". Nó là ba ràng buộc phải thoả cùng lúc: xác nhận đủ nhanh để không phá trải nghiệm, phí đủ thấp để stake nhỏ vẫn có lãi, và *provably fair*: người chơi tự xác minh được kết quả thay vì tin server.
::

## Vì sao chọn Hydra thay cho Layer 1

Cardano Layer 1 xác nhận giao dịch sau khoảng 20 giây và thu phí cố định cho mỗi giao dịch. Với microtransaction trong game, cả hai con số đều không chấp nhận được.

Hydra Head giải cả ba ràng buộc cùng lúc. Bên trong Head, giao dịch xác nhận dưới 1 giây và phí bằng 0. Trạng thái vẫn kết toán được về L1 bất kỳ lúc nào. Phần còn lại của bài là chuyện lý thuyết đó gãy ở đâu khi chạy thật.

## Vỡ trận 1: kẻ gian không cần hack

Trong đợt kiểm thử nội bộ, một lỗ hổng lộ ra mà không ai đụng tới một dòng anti-cheat nào. Kẻ tấn công không inject điểm, không giả chữ ký. Họ chỉ đọc `mapSeed` từ API, tái tạo bản đồ ở máy mình, chạy mô phỏng vật lý để tìm chuỗi tap tối ưu, rồi gửi đúng chuỗi tap đó qua socket như một người chơi thật.

Mọi lớp anti-cheat đều báo xanh, vì từng cú tap đều hợp lệ và trông tự nhiên. Lỗi không nằm ở giao dịch. Lỗi nằm ở chỗ server mặc định rằng người ở đầu bên kia đang thật sự chơi.

::callout{type="danger" title="Physics Simulation Attack"}
Không có chữ ký nào bị giả. Bot thắng bằng chính luật chơi thật, chỉ khác là nó "chơi" bằng một trình giải thay vì ngón tay. Đây là lớp gian lận khó chặn nhất: hợp lệ ở mọi tầng kiểm tra kỹ thuật.
::

Hai hướng phòng thủ được xếp ưu tiên cao nhất. Cả hai đều đánh vào gốc: lấy đi khả năng biết trước bản đồ.

- **Seeded PRNG cho vị trí chướng ngại.** Server giữ toàn bộ layout sinh từ một seed bí mật. Bot không thể pre-compute đường bay nếu không chạy game thật.
- **Phát hiện bất thường trong phân phối điểm.** Bot luôn chạm gần điểm tối đa, còn người thật có phương sai cao hơn nhiều. Theo dõi phân phối điểm theo ví qua thời gian là một tín hiệu rất khó ngụy trang.

## Vỡ trận 2: khoá 20.000 ADA để không làm gì

Bảng xếp hạng on-chain ban đầu có ba lớp. Lớp dưới cùng cấp cho mỗi người chơi một UTXO riêng. Nghe hợp lý, cho tới khi tính chi phí vận hành thật:

```
1.000 người chơi   → 2.000 ADA bị khoá vô thời hạn trong Hydra Head
10.000 người chơi  → 20.000 ADA bị khoá
```

Toàn bộ số ADA đó phải được admin commit vào Head trước khi mở, và không rút được cho đến khi Head đóng. Với bất kỳ operator nào, đây là vốn chết nằm im chỉ để giữ chỗ. Không thực tế.

Lời giải là bỏ hẳn lớp per-player. Admin ký thẳng vào 20 shard UTXO, cách này tôi gọi là **Direct Shard Submit**. Kết quả ở mốc 10.000 người chơi:

| Chỉ số | Trước | Sau |
| --- | --- | --- |
| ADA khoá trong Head | ~20.724 | **724** |
| Số UTXO trong Head | 21 + N (tăng mãi) | **21 cố định** |
| Thay đổi | - | **-96,5%** |

Ít UTXO hơn không chỉ tiết kiệm ADA. Snapshot xác nhận nhanh hơn và mọi Hydra node tốn ít bộ nhớ hơn. Một quyết định, ba tầng lợi ích. Đó thường là dấu hiệu bạn vừa gỡ đúng nút thắt.

## Vỡ trận 3: 20 shard, một địa chỉ, một lỗ hổng

Sau khi gộp lớp, 20 shard vẫn nằm chung một địa chỉ validator. Đó là cửa cho tấn công đầu độc. Bất kỳ ai cũng gửi được ADA tới địa chỉ đó và tạo một UTXO giả mang `shard_id` trùng với shard thật. Nếu admin lỡ tiêu nhầm UTXO giả, dữ liệu của shard đó biến mất và bị thay bằng dữ liệu của kẻ tấn công.

Cách chặn là đưa `shard_id` vào tham số compile-time của validator. Mỗi shard giờ có một địa chỉ Cardano riêng: 20 shard, 20 địa chỉ. Không ai tạo được UTXO hợp lệ cho shard 5 tại địa chỉ của shard 7, và không còn ô nhiễm chéo giữa các shard.

Thêm một lớp nữa: một off-chain registry làm nguồn sự thật duy nhất. Chỉ UTXO do admin tạo và ghi vào registry mới được công nhận. Hướng tấn công "tạo UTXO giả trước khi khởi tạo" bị khoá luôn.

## Vỡ trận 4: hai người ghi điểm cùng lúc

Đây là chỗ mô hình eUTXO đòi nợ. Mỗi UTXO chỉ cho phép đúng một giao dịch tiêu nó tại một thời điểm. Hai giao dịch cùng tham chiếu một shard UTXO thì chỉ một thành công, cái kia bị từ chối.

Với 20 shard và cách phân ví bằng `keccak256(wallet) % 20`, xác suất va chạm leo rất nhanh:

```
5 ván/giây   → ~2,5% va chạm
20 ván/giây  → ~47,5%
50 ván/giây  → hơn 1 va chạm mỗi giây (không trụ nổi)
```

Hiện tượng này là *shard contention*, kẻ thù số một của thông lượng trong eUTXO. Lời giải là một hàng đợi riêng cho mỗi shard với `concurrency = 1`. Không bao giờ có hai giao dịch tranh cùng một shard UTXO.

Điểm mấu chốt là vì sao cách này chạy được trên Hydra mà không chạy được trên L1. Hàng đợi tuần tự chỉ khả thi khi mỗi bước xác nhận cực nhanh. Trên L1, 20 giây một xác nhận biến hàng đợi thành nghẽn cứng. Trên Hydra, dưới 1 giây biến đúng kiến trúc đó thành hệ thống thông lượng cao:

```
Phase 1: 20 shard × 1 điểm/giây        → ~20 điểm/giây
Phase 2: gộp 10 điểm mỗi giao dịch      → ~222 điểm/giây (đủ cho hơn 4.400 người chơi đồng thời)
```

::callout{type="note" title="Chi tiết cơ chế sharding"}
Vì sao chọn 21 phân mảnh, chiến lược gộp khi đọc bảng tổng, và các đánh đổi về tính nhất quán được mổ xẻ riêng trong [21 UTXO cho vạn người chơi](/writing/hydra-leaderboard-sharding). Về quan hệ giữa Hydra và băng thông L1, xem [Leios và Hydra](/writing/leios-hydra-nhanh-va-re).
::

## Kiến trúc sau bốn lần vỡ trận

```
Trạng thái Hydra Head (cố định, không phụ thuộc số người chơi):
  20 Shard UTXO         - mỗi shard giữ ~200 ví và điểm cao nhất
  1  GlobalSnapshot     - top-N gộp từ mọi shard
  ─────────────────────────────────────────────────────────
  Tổng: 21 UTXO, 724 ADA khoá, ~4 ADA phí L1 một lần
```

Mỗi khi một người chơi lập personal best, luồng xử lý như sau. Backend xác minh qua anti-cheat và replay hash. Admin ký giao dịch vào đúng shard. Hydra xác nhận dưới 1 giây. Điểm số cùng replay hash được ghi vĩnh viễn. Người chơi vào Trust Center tự verify mọi kết quả, không cần tin server, không cần tin đội ngũ.

## Điều rút ra

Không có mẹo thần kỳ nào ở đây. Mỗi lần vỡ trận đều bắt đầu từ một giả định trông hiển nhiên: "cho mỗi người một UTXO", "một validator là đủ", "cứ ghi song song". Chúng chỉ gãy khi chạm số thật.

Giá trị không nằm ở kiến trúc cuối cùng gọn gàng. Nó nằm ở chuỗi câu hỏi buộc phải trả lời để tới được đó.

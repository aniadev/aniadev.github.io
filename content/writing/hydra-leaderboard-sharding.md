---
title: 'Leaderboard sharding trên Cardano Hydra: 21 UTXO cho vạn người chơi'
lang: vi
date: '2025-09-02'
kind: protocol
featured: true
readingTime: 3
summary: 'Trên eUTXO, một bảng xếp hạng nằm trên một UTXO chỉ xử lý được một cập nhật mỗi block. Sharding trạng thái thành 21 UTXO trong Hydra Head giải quyết tranh chấp và thông lượng.'
tags: ['cardano', 'hydra', 'layer-2', 'eutxo', 'scaling', 'sharding']
canonical: 'https://wiki.ada-defi.io.vn/s/7238aec2-222b-4977-8c71-0952fc773e2a/doc/21-utxo-cho-van-nguoi-choi-xay-dung-leaderboard-sharding-on-chain-tren-cardano-hydra-TKguMf1J1d'
---

Trên mô hình eUTXO, một trạng thái dùng chung là một UTXO. Mỗi UTXO chỉ cho phép một giao dịch tiêu nó tại một thời điểm. Đặt cả bảng xếp hạng lên một UTXO nghĩa là mọi lượt ghi điểm đều tranh nhau đúng một đầu ra. Thông lượng rơi về một giao dịch mỗi block.

Bài này là bản tóm lược của một phân tích dài hơn về cách tôi tách bảng xếp hạng thành 21 UTXO chạy trong Hydra Head. Toàn văn nằm ở bản gốc, liên kết cuối bài.

::callout{type="insight" title="Luận điểm trung tâm"}
Câu hỏi đúng không phải "làm sao ghi nhanh hơn". Câu hỏi đúng là "làm sao để hai người chơi cập nhật điểm đồng thời mà không tranh cùng một UTXO".
::

## Vì sao một UTXO là không đủ

Xét một bảng xếp hạng nằm trên một đầu ra duy nhất:

```haskell
-- Trạng thái sống trên đúng một UTXO → tuần tự hoá toàn cục
data Leaderboard = Leaderboard
  { entries :: [(PlayerId, Score)]
  }
```

Mỗi lần một người chơi ghi điểm, giao dịch phải tiêu UTXO hiện tại và tạo UTXO mới. Hai người chơi trong cùng một block sẽ xung đột. Chỉ một giao dịch thành công, người còn lại phải thử lại. Đây là giới hạn của mô hình, không phải lỗi code.

## Sharding trạng thái: chia để không tranh

Ý tưởng là chia không gian người chơi thành *N* phân mảnh. Mỗi phân mảnh là một UTXO độc lập. Hai cập nhật rơi vào hai phân mảnh khác nhau thì không còn tranh chấp.

| Thiết kế | UTXO tranh chấp | Thông lượng |
| --- | --- | --- |
| Một đầu ra | 1 | Thấp |
| Sharding 21 phân mảnh | 21 song song | Cao hơn ~21× |

Con số 21 gồm 20 shard giữ điểm người chơi và 1 UTXO snapshot toàn cục gộp top-N từ mọi shard. Số UTXO này cố định, không tăng theo số người chơi.

## Vai trò của Hydra

Hydra Head đưa giao dịch xuống off-chain nhưng giữ nguyên ngữ nghĩa eUTXO. Cập nhật xác nhận với độ trễ thấp, rồi kết toán về Layer 1 khi cần. Sharding *bên trong* Head cho cả hai thứ cùng lúc: độ trễ thấp nhờ Hydra, thông lượng cao nhờ chia phân mảnh.

::callout{type="note" title="Đọc tiếp"}
Cách chọn số phân mảnh, chiến lược gộp (fan-in) khi đọc bảng tổng và các đánh đổi về tính nhất quán được trình bày đầy đủ trong [bản gốc](https://wiki.ada-defi.io.vn/s/7238aec2-222b-4977-8c71-0952fc773e2a/doc/21-utxo-cho-van-nguoi-choi-xay-dung-leaderboard-sharding-on-chain-tren-cardano-hydra-TKguMf1J1d). Kiến trúc này đã chạy thật trong [Hydra Fly](/writing/hydra-fly-build-log), kèm số liệu về shard contention và lượng ADA phải khoá.
::

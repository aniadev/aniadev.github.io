---
title: '21 UTXO cho vạn người chơi: leaderboard sharding on-chain trên Cardano Hydra'
lang: vi
date: '2025-09-02'
kind: protocol
featured: true
readingTime: 18
summary: 'Vì sao bảng xếp hạng cho hàng vạn người chơi không thể nằm gọn trên một UTXO duy nhất, và cách sharding trạng thái qua các Hydra Head giải bài toán tranh chấp và thông lượng.'
tags: ['cardano', 'hydra', 'layer-2', 'eutxo', 'scaling']
canonical: 'https://wiki.ada-defi.io.vn/s/7238aec2-222b-4977-8c71-0952fc773e2a/doc/21-utxo-cho-van-nguoi-choi-xay-dung-leaderboard-sharding-on-chain-tren-cardano-hydra-TKguMf1J1d'
---

Trên mô hình eUTXO, một trạng thái dùng chung là một UTXO — và mỗi UTXO chỉ bị tiêu bởi *một* giao dịch tại một thời điểm. Đặt cả một bảng xếp hạng lên một UTXO nghĩa là mọi lượt cập nhật đều tranh chấp cùng một đầu ra: thông lượng giảm còn một giao dịch mỗi block.

::callout{type="insight" title="Luận điểm trung tâm"}
Bài toán không phải "làm sao ghi nhanh hơn", mà "làm sao để hai người chơi cập nhật điểm *đồng thời* mà không tranh cùng một UTXO".
::

## Vì sao một UTXO là không đủ

Xét một bảng xếp hạng nằm trên một đầu ra duy nhất:

```haskell
-- Trạng thái sống trên đúng một UTXO → tuần tự hoá toàn cục
data Leaderboard = Leaderboard
  { entries :: [(PlayerId, Score)]
  }
```

Mỗi lần một người chơi ghi điểm, giao dịch phải tiêu UTXO hiện tại và tạo UTXO mới. Hai người chơi trong cùng một block sẽ xung đột: chỉ một giao dịch thành công, phần còn lại phải thử lại.

## Sharding trạng thái

Ý tưởng: chia không gian người chơi thành *N* phân mảnh, mỗi phân mảnh là một UTXO độc lập, để các cập nhật ở phân mảnh khác nhau không còn tranh chấp.

| Thiết kế | UTXO tranh chấp | Thông lượng |
| --- | --- | --- |
| Một đầu ra | 1 | Thấp |
| Sharding 21 phân mảnh | 21 song song | Cao hơn ~21× |

## Vai trò của Hydra

Hydra Head đưa giao dịch xuống off-chain nhưng vẫn giữ nguyên ngữ nghĩa eUTXO, cho phép cập nhật với độ trễ thấp rồi kết toán về Layer 1. Kết hợp sharding *bên trong* Head, ta có cả độ trễ thấp lẫn thông lượng cao.

::callout{type="note" title="Toàn văn"}
Cách chọn số phân mảnh, chiến lược gộp (fan-in) khi đọc bảng tổng và các đánh đổi về tính nhất quán được trình bày đầy đủ trong [bản gốc](https://wiki.ada-defi.io.vn/s/7238aec2-222b-4977-8c71-0952fc773e2a/doc/21-utxo-cho-van-nguoi-choi-xay-dung-leaderboard-sharding-on-chain-tren-cardano-hydra-TKguMf1J1d).
::

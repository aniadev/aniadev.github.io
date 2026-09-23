---
title: 'Sách giáo khoa nói dối: vì sao não bạn "trượt" liên tục mà vẫn hoạt động'
lang: vi
date: '2026-06-12'
kind: note
readingTime: 6
summary: 'Sách vẽ synapse như một công tắc: có xung là có tín hiệu truyền qua. Sự thật thì lỏng lẻo hơn nhiều - mỗi lần "bắn", khe synapse chỉ chịu truyền tín hiệu khoảng 10-40% số lần. Chuyện về sự thất bại có chủ đích, và vì sao bio-synapse-visual cho bạn tự tay kéo cái nút để thấy tận mắt.'
tags: ['thần-kinh', 'giải-thích', 'sinh-lý-học']
---

Đây là bản dễ hiểu đằng sau một tính năng của [bio-synapse-visual](https://github.com/aniadev/bio-synapse-visual): cái nút gạt "Sách giáo khoa ↔ Thực tế". Không cần nền y khoa vẫn theo được - và có thể sau bài này bạn sẽ nhìn bộ não mình khác đi một chút.

## Cái công tắc mà ai cũng được dạy

Hồi đi học, synapse thường được vẽ như một công tắc điện: tế bào thần kinh A "bắn" một xung, tín hiệu chạy qua khe, tế bào B nhận được. Có xung là có truyền. Sạch sẽ, gọn gàng, dễ vẽ lên bảng.

Mô hình đó tiện để bắt đầu. Nhưng lại **sai** ở một điểm cốt lõi.

## Sự thật: cái công tắc hay kẹt

Ở nồng độ calci sinh lý bình thường, mỗi khi một xung ập tới, cái "công tắc" synapse chỉ thật sự truyền tín hiệu qua khoảng **10 đến 40%** số lần. Còn lại? Xung tới, nhưng chẳng có bọc chất dẫn truyền nào vỡ ra. Tín hiệu "trượt".

Giới khoa học có tên riêng cho chuyện này: **synaptic failure** - sự thất bại của synapse. Và điều gây sốc nhất: đây **không phải lỗi**. Não bạn đang "trượt" như thế ngay lúc này, hàng tỉ lần mỗi giây, và vẫn vận hành trơn tru.

> Không phải công tắc bật/tắt. Là một con xúc xắc, gieo lại mỗi lần có xung.

## Vì sao "trượt" lại là chuyện tốt

Nghe phản trực giác, nhưng sự bấp bênh đó chính là một tính năng:

- **Tiết kiệm.** Giải phóng chất dẫn truyền rất tốn kém. Không "bắn" đạn thật cho từng xung là một cách bộ não tiết kiệm năng lượng.
- **Cái núm âm lượng.** Vì xác suất truyền có thể thay đổi, synapse có được một cái "núm vặn to nhỏ". Học tập, trí nhớ - phần lớn là chuyện vặn cái núm xác suất này, chứ không phải bật thêm dây.
- **Chống nhiễu.** Một hệ thống mà từng mối nối đều bấp bênh, nhưng gộp lại thành đám đông thì đáng tin - đó là một kiểu thiết kế bền bỉ mà kỹ sư nào cũng thèm.

## Calci: kẻ đứng sau, và một con số kỳ lạ

Thứ quyết định synapse "chịu bắn" hay không chủ yếu là **ion calci** tràn vào lúc có xung. Càng nhiều calci, xác suất giải phóng càng cao. Đến đây thì vẫn hợp lý.

Cái hay nằm ở *hình dạng* của mối liên hệ đó. Không phải đường thẳng - kiểu "gấp đôi calci thì gấp đôi xác suất". Mà là một đường cong dốc đứng: xác suất giải phóng tăng theo lượng calci **luỹ thừa gần 4** (chính xác là mũ ~3,8 theo số liệu thực nghiệm).

Nghĩa là sao? Nghĩa là cần **vài** ion calci cùng bắt tay vào thì một bọc chất dẫn truyền mới chịu vỡ - như một khoá an toàn cần xoay đồng thời mấy chìa. Thêm chút calci ở đúng vùng dốc của đường cong có thể khiến xác suất nhảy vọt. Đây là lý do sinh lý học thần kinh cực kỳ nhạy với calci, và vì sao nhiều loại thuốc lẫn độc tố nhắm thẳng vào các kênh calci.

::callout{type="note" title="Con số này ở đâu ra?"}
Đường cong luỹ thừa ~3,8 và khoảng xác suất 10-40% trong công cụ không phải bịa cho đẹp - cả hai đều dựa vào nghiên cứu thực nghiệm của **Powers & Türker (2010)**. Mỗi chú thích khoa học trong app trỏ thẳng về nguồn gốc đó.
::

## Chỗ hay nhất: bạn được tự tay kéo cái nút

Đọc tới đây thì vẫn chỉ là chữ. Nên bio-synapse-visual làm đúng một việc: **biến câu chuyện này thành thứ kéo được bằng tay.**

Có một cái nút gạt giữa hai thế giới:

- **Chế độ Sách giáo khoa.** Cái công tắc lý tưởng. 100% xung đều truyền, calci với xác suất là đường thẳng. Đúng như bạn được dạy - và cố tình đơn giản hoá.
- **Chế độ Thực tế.** Bật con xúc xắc lên. Xác suất tụt về 10-40%, đường cong hoá luỹ thừa. Ngồi nhìn, bạn sẽ thấy tận mắt những cú "trượt" - xung tới mà chẳng gì vỡ ra.

Rồi kéo thanh trượt nồng độ **calci** và xem mọi thứ đáp lại tức thì: số hạt calci đổi, đường cong xác suất uốn theo, tần suất "trượt" tăng giảm ngay trước mắt. Đây là khoảnh khắc con số trong sách hoá thành một thứ bạn *cảm* được.

## Nhưng nếu synapse hay trượt vậy, sao tín hiệu vẫn tới nơi?

Câu hỏi hay - và công cụ cũng trả lời luôn.

Tế bào thần kinh nhận không chỉ nghe *một* synapse. Nó **cộng dồn**: gộp nhiều cú thúc nhỏ theo thời gian, từ nhiều mối nối. Từng cú lẻ có thể trượt, nhưng cộng lại đủ nhiều thì điện thế màng dâng lên, chạm ngưỡng - và tế bào "bắn" ra xung của chính nó, rồi reset về mức nghỉ.

Trong app, bạn thấy cảnh này chạy real-time trên đồ thị điện thế màng: những cú nhích nhỏ chồng lên nhau, thi thoảng gộp đủ để bật ra một cú vọt. Độ tin cậy không nằm ở từng mối nối - nó **nổi lên từ đám đông**. Đúng như bộ não vẫn làm.

## Chốt lại

Sách giáo khoa không hẳn nói dối - cuốn sách kể một câu chuyện đơn giản để bạn có chỗ bắt đầu. Nhưng sự thật thú vị hơn nhiều: mỗi synapse là một con xúc xắc, gieo với trọng số do calci quyết định theo một đường cong dốc đến bất ngờ, trượt phần lớn số lần - và chính từ cái bấp bênh đó, gộp qua vô số mối nối, mọc ra thứ đáng tin cậy mà ta gọi là suy nghĩ.

Cách tốt nhất để tin điều đó không phải đọc lại đoạn trên. Mà là kéo cái nút, gạt sang **Thực tế**, và ngồi nhìn não bạn "trượt".

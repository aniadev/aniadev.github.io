---
title: '60 FPS trong một khe synapse: vì sao vật lý và hình vẽ phải sống tách nhau'
lang: vi
date: '2026-06-12'
kind: engineering
readingTime: 7
summary: 'Chuyện dựng bio-synapse-visual: một "kính hiển vi tính toán" chạy trong trình duyệt, mô phỏng hàng ngàn hạt ion khuếch tán ngẫu nhiên mà không giật hình. Bí quyết không nằm ở card đồ hoạ - mà ở một lằn ranh: engine tính, render vẽ, hai bên không được chạm vào việc của nhau.'
tags: ['simulation', 'webgl', 'vue', 'kiến-trúc']
---

Đây là ghi chú kỹ thuật của [bio-synapse-visual](https://github.com/aniadev/bio-synapse-visual) - một công cụ ảo hoá động học synapse ở cấp phân tử, chạy thẳng trong trình duyệt. Kể lại bằng ví dụ đời thường, không cần biết code vẫn theo được.

## Bài toán: vẽ một "nhà máy hoá sinh" thu nhỏ, 60 lần mỗi giây

Một khe synapse rộng chừng 10-40 nanomet. Trong khoảng không tí hon đó, mỗi khi tế bào thần kinh "bắn" một xung, hàng loạt việc xảy ra gần như cùng lúc: kênh calci mở, ion Ca²⁺ ùa vào, các bọc chứa chất dẫn truyền vỡ ra, hàng ngàn phân tử lao đi hỗn loạn qua khe, va vào thụ thể bên kia.

Muốn cho người xem *thấy* cảnh đó - chứ không phải đọc một phương trình - thì phải vẽ lại toàn bộ, **60 lần mỗi giây**. Chậm hơn, mắt người bắt được độ giật, và ảo giác "đang nhìn qua kính hiển vi" tan biến ngay.

> Vấn đề không phải vẽ *đẹp*. Vấn đề là vẽ *kịp*.

## Sai lầm đầu tiên: để khung hình tự nghĩ

Vue - công cụ dựng giao diện của dự án - có một thói quen rất tốt trong đời thường mà lại rất tệ ở đây: nó **theo dõi mọi thứ**. Bạn đổi một con số, nó tự dò xem chỗ nào trên màn hình liên quan rồi vẽ lại. Tiện vô cùng cho một cái form đăng ký.

Nhưng thử tưởng tượng bạn thuê một trợ lý cực kỳ chu đáo, và cứ mỗi khi *một* trong số hàng ngàn hạt ion nhích một chút, anh ta lại chạy đi kiểm tra lại toàn bộ căn phòng xem có gì cần đổi không. Nhân cảnh đó với hàng ngàn hạt, sáu mươi lần một giây. Trợ lý kiệt sức. Khung hình rớt.

Cách sửa là bảo Vue: *"Chỗ này đừng theo dõi. Cứ để tôi lo."* Trong dự án, đám dữ liệu mô phỏng được cất trong một ngăn "miễn theo dõi" (`shallowRef`) - Vue biết có nó, nhưng không rình từng hạt. Việc rình-và-vẽ giao cho một tay chuyên nghiệp hơn.

## Lằn ranh cứu cả dự án: engine tính, render vẽ

Đây là quyết định gốc, và mọi thứ khác mọc ra từ nó.

Hình dung hai phòng ban tách bạch:

- **Phòng Vật lý (engine).** Nơi duy nhất được phép *tính*. Ở đây có luật sinh học, có trạng thái từng hạt, có bộ sinh số ngẫu nhiên. Nó không quan tâm màu gì, to nhỏ ra sao. Nhiệm vụ: giữ một bảng số luôn đúng với hiện thực sinh lý.
- **Phòng Hoạ (render).** Nơi duy nhất được phép *vẽ*. Nó đọc bảng số từ phòng Vật lý rồi dựng thành hình bằng WebGL - thứ nói chuyện thẳng với card đồ hoạ. Nó **không được** sửa một con số nào của mô phỏng. Không được "làm tròn cho đẹp", không được "nhích hạt cho cân".

Vì sao lằn ranh này quý đến vậy? Vì mỗi phòng giờ chỉ có một việc, và có thể tối ưu điên cuồng cho đúng một việc đó. Phòng Hoạ đẩy hàng ngàn hạt xuống card đồ hoạ trong một lượt - thứ nó sinh ra để làm. Phòng Vật lý thì đủ *sạch* để đem ra kiểm tra như một bài toán thuần tuý.

::callout{type="insight" title="Nguyên tắc dẫn đường"}
"Cái đẹp phục tùng sinh lý." Nghe như khẩu hiệu, nhưng thật ra nó là một ràng buộc kiến trúc: khi hình vẽ và con số cãi nhau, con số luôn thắng. Phòng Hoạ không có quyền phủ quyết.
::

## Trật tự nhân-quả không được phép đảo

Bên trong phòng Vật lý có một nhịp tim: vòng lặp trung tâm, mỗi bước tíc-tắc chạy đúng một chuỗi việc - và **thứ tự là bất khả xâm phạm**, vì sinh học vốn vậy:

Xung lan tới cúc tận cùng → kênh calci mở, Ca²⁺ tràn vào → bọc chất dẫn truyền vỡ ra → các phân tử khuếch tán qua khe → gắn vào thụ thể bên kia → màng sau cộng dồn dòng điện, tính ra điện thế.

Đảo bất kỳ hai bước nào là ra một sinh học sai. Nên vòng lặp được viết cứng theo đúng dòng chảy này - không phải vì code gọn hơn, mà vì đó là *luật của thế giới đang mô phỏng*. Giữ đúng trật tự nhân-quả chính là thứ tách một mô phỏng khỏi một màn trình diễn hoạt hình đẹp mắt nhưng vô nghĩa.

## Chạy lại y hệt: mẻ ngẫu nhiên nhưng lặp lại được

Có một nghịch lý dễ chịu ở đây. Sinh học thật thì đầy ngẫu nhiên - cùng một xung, lần này bọc vỡ, lần sau lại "trượt". Muốn trung thực thì phải giữ cái ngẫu nhiên đó. Nhưng làm nghiên cứu thì lại cần **chạy lại y hệt** để so sánh.

Lời giải: sự ngẫu nhiên ở đây là *ngẫu nhiên có hạt giống*. Toàn bộ số ngẫu nhiên sinh ra từ một cỗ máy nhỏ (`mulberry32`), khởi động bằng một con "hạt giống" (seed). Cùng một hạt giống, cùng một bộ tham số → tái hiện **100%** mọi sự kiện, đến từng hạt vỡ đúng thời điểm cũ.

Thế là được cả hai: trông thì hỗn loạn như thật, nhưng bấm lại nút là cuộn phim chạy y nguyên. Xuất luôn được cả cấu hình lẫn hạt giống ra một file JSON - gửi cho người khác, họ mở lên thấy đúng cảnh bạn thấy.

> Ngẫu nhiên để trung thực. Có hạt giống để kiểm chứng. Không phải chọn một.

## Phần thưởng bất ngờ: phòng Vật lý tự kiểm tra được

Vì phòng Vật lý không dính gì tới hình vẽ, nó trở thành một hộp số thuần tuý: đưa vào tham số, nhận ra con số. Mà con số thì **kiểm tra được bằng máy**.

Luật giải phóng có đúng đường cong không? Điện thế màng có vọt lên rồi reset đúng ngưỡng không? Mỗi câu hỏi thành một bài kiểm tra tự động (Vitest) chạy trong tích tắc - không cần mở trình duyệt, không cần căng mắt nhìn hạt. Nếu ai đó lỡ tay làm sai một luật sinh lý, bài kiểm tra đỏ ngay, trước khi cái sai kịp lên màn hình.

Cái này chỉ có được *nhờ* lằn ranh ở trên. Trộn vật lý vào hình vẽ thì không kiểm tra kiểu này nổi - vì để hỏi "con số đúng chưa" bạn buộc phải dựng cả cảnh WebGL lên.

## Chốt lại

Cả kiến trúc gói gọn trong một câu: **một nơi được tính, một nơi được vẽ, và chúng không chạm vào việc của nhau.**

Nghe đơn giản đến mức dễ xem thường. Nhưng chính lằn ranh mảnh đó là thứ giữ được 60 FPS, giữ được sinh học đúng, và mở ra chuyện tái hiện-y-hệt lẫn kiểm-tra-tự-động - ba thứ tưởng chừng phải đánh đổi lẫn nhau. Không phải nhờ một mẹo thần kỳ nào, mà nhờ chịu khó vẽ ra ranh giới ngay từ dòng code đầu tiên, rồi tôn trọng nó tới dòng cuối.

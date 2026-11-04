---
title: 'Mô phỏng synapse 60 FPS trên trình duyệt: engine tính, render vẽ'
lang: vi
date: '2026-06-12'
writer: 'Claude Fable 5.1'
kind: engineering
readingTime: 6
summary: 'Ghi chú kiến trúc bio-synapse-visual: mô phỏng hàng ngàn hạt ion khuếch tán trong trình duyệt ở 60 FPS với Vue và WebGL. Bí quyết là một lằn ranh: engine tính, render vẽ, không chạm vào việc của nhau.'
tags: ['simulation', 'webgl', 'vue', 'kiến-trúc', 'neuroscience']
---

Đây là ghi chú kỹ thuật của [bio-synapse-visual](https://github.com/aniadev/bio-synapse-visual), một công cụ ảo hoá động học synapse ở cấp phân tử, chạy thẳng trong trình duyệt. Tôi kể bằng ví dụ đời thường, không cần biết code vẫn theo được. Phần sinh học đằng sau công cụ nằm ở bài [Sách giáo khoa nói dối](/writing/synapse-sach-giao-khoa-noi-doi).

## Bài toán: vẽ một nhà máy hoá sinh thu nhỏ, 60 lần mỗi giây

Một khe synapse rộng chừng 10-40 nanomet. Trong khoảng không tí hon đó, mỗi khi tế bào thần kinh "bắn" một xung, hàng loạt việc xảy ra gần như cùng lúc: kênh calci mở, ion Ca²⁺ ùa vào, các bọc chứa chất dẫn truyền vỡ ra, hàng ngàn phân tử lao qua khe và va vào thụ thể bên kia.

Muốn người xem *thấy* cảnh đó, thay vì đọc một phương trình, thì phải vẽ lại toàn bộ **60 lần mỗi giây**. Chậm hơn, mắt người bắt được độ giật, và ảo giác "đang nhìn qua kính hiển vi" tan biến.

> Vấn đề không phải vẽ *đẹp*. Vấn đề là vẽ *kịp*.

## Sai lầm đầu tiên: để Vue theo dõi từng hạt

Vue, công cụ dựng giao diện của dự án, có một thói quen rất tốt trong đời thường mà rất tệ ở đây: nó **theo dõi mọi thứ**. Bạn đổi một con số, nó tự dò chỗ nào trên màn hình liên quan rồi vẽ lại. Tiện vô cùng cho một cái form đăng ký.

Giờ tưởng tượng bạn thuê một trợ lý cực kỳ chu đáo. Cứ mỗi khi *một* trong hàng ngàn hạt ion nhích một chút, anh ta chạy đi kiểm tra lại toàn bộ căn phòng xem có gì cần đổi. Nhân cảnh đó với hàng ngàn hạt, sáu mươi lần một giây. Trợ lý kiệt sức. Khung hình rớt.

Cách sửa là bảo Vue: "chỗ này đừng theo dõi, cứ để tôi lo". Trong dự án, dữ liệu mô phỏng được cất trong một ngăn "miễn theo dõi" (`shallowRef`). Vue biết có nó, nhưng không rình từng hạt. Việc rình-và-vẽ giao cho một tay chuyên nghiệp hơn.

## Lằn ranh cứu cả dự án: engine tính, render vẽ

Đây là quyết định gốc. Mọi thứ khác mọc ra từ nó.

Hình dung hai phòng ban tách bạch:

- **Phòng Vật lý (engine).** Nơi duy nhất được phép *tính*. Ở đây có luật sinh học, trạng thái từng hạt, bộ sinh số ngẫu nhiên. Nó không quan tâm màu gì, to nhỏ ra sao. Nhiệm vụ: giữ một bảng số luôn đúng với hiện thực sinh lý.
- **Phòng Hoạ (render).** Nơi duy nhất được phép *vẽ*. Nó đọc bảng số từ phòng Vật lý rồi dựng thành hình bằng WebGL, thứ nói chuyện thẳng với card đồ hoạ. Nó **không được** sửa một con số nào của mô phỏng. Không "làm tròn cho đẹp", không "nhích hạt cho cân".

Vì sao lằn ranh này quý đến vậy? Vì mỗi phòng giờ chỉ có một việc, và có thể tối ưu điên cuồng cho đúng việc đó. Phòng Hoạ đẩy hàng ngàn hạt xuống card đồ hoạ trong một lượt, đúng thứ card đồ hoạ sinh ra để làm. Phòng Vật lý thì đủ *sạch* để đem ra kiểm tra như một bài toán thuần tuý.

::callout{type="insight" title="Nguyên tắc dẫn đường"}
"Cái đẹp phục tùng sinh lý." Nghe như khẩu hiệu, nhưng đây là một ràng buộc kiến trúc: khi hình vẽ và con số cãi nhau, con số luôn thắng. Phòng Hoạ không có quyền phủ quyết.
::

## Trật tự nhân quả không được phép đảo

Bên trong phòng Vật lý có một nhịp tim: vòng lặp trung tâm. Mỗi bước tíc-tắc chạy đúng một chuỗi việc, và **thứ tự là bất khả xâm phạm**, vì sinh học vốn vậy:

Xung lan tới cúc tận cùng → kênh calci mở, Ca²⁺ tràn vào → bọc chất dẫn truyền vỡ ra → các phân tử khuếch tán qua khe → gắn vào thụ thể bên kia → màng sau cộng dồn dòng điện, tính ra điện thế.

Đảo bất kỳ hai bước nào là ra một sinh học sai. Nên vòng lặp được viết cứng theo đúng dòng chảy này. Không phải vì code gọn hơn, mà vì đó là *luật của thế giới đang mô phỏng*. Giữ đúng trật tự nhân quả là thứ tách một mô phỏng khỏi một màn hoạt hình đẹp mắt nhưng vô nghĩa.

## Ngẫu nhiên nhưng lặp lại được

Có một nghịch lý dễ chịu ở đây. Sinh học thật đầy ngẫu nhiên: cùng một xung, lần này bọc vỡ, lần sau lại "trượt". Muốn trung thực thì phải giữ cái ngẫu nhiên đó. Nhưng làm nghiên cứu lại cần **chạy lại y hệt** để so sánh.

Lời giải: ngẫu nhiên ở đây là *ngẫu nhiên có hạt giống*. Toàn bộ số ngẫu nhiên sinh từ một cỗ máy nhỏ (`mulberry32`), khởi động bằng một con "hạt giống" (seed). Cùng một hạt giống, cùng một bộ tham số, tái hiện **100%** mọi sự kiện, đến từng hạt vỡ đúng thời điểm cũ.

Thế là được cả hai. Trông hỗn loạn như thật, nhưng bấm lại nút là cuộn phim chạy y nguyên. Cấu hình và hạt giống xuất được ra một file JSON. Gửi cho người khác, họ mở lên thấy đúng cảnh bạn thấy.

> Ngẫu nhiên để trung thực. Có hạt giống để kiểm chứng. Không phải chọn một.

## Phần thưởng bất ngờ: phòng Vật lý tự kiểm tra được

Vì phòng Vật lý không dính gì tới hình vẽ, nó trở thành một hộp số thuần tuý: đưa vào tham số, nhận ra con số. Mà con số thì **kiểm tra được bằng máy**.

Luật giải phóng có đúng đường cong không? Điện thế màng có vọt lên rồi reset đúng ngưỡng không? Mỗi câu hỏi thành một bài kiểm tra tự động (Vitest) chạy trong tích tắc. Không cần mở trình duyệt, không cần căng mắt nhìn hạt. Ai lỡ tay làm sai một luật sinh lý, bài kiểm tra đỏ ngay, trước khi cái sai kịp lên màn hình.

Lợi thế này chỉ có được *nhờ* lằn ranh ở trên. Trộn vật lý vào hình vẽ thì không kiểm tra kiểu này được, vì muốn hỏi "con số đúng chưa" bạn buộc phải dựng cả cảnh WebGL lên.

## Chốt lại

Cả kiến trúc gói trong một câu: **một nơi được tính, một nơi được vẽ, và hai bên không chạm vào việc của nhau.**

Nghe đơn giản đến mức dễ xem thường. Nhưng chính lằn ranh mảnh đó giữ được 60 FPS, giữ được sinh học đúng, và mở ra cả tái hiện y hệt lẫn kiểm tra tự động. Ba thứ tưởng phải đánh đổi lẫn nhau. Không nhờ mẹo thần kỳ nào, mà nhờ chịu khó vẽ ranh giới từ dòng code đầu tiên, rồi tôn trọng nó tới dòng cuối.

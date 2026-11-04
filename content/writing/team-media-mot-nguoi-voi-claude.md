---
title: 'Làm video quảng cáo bằng Claude: một người thay cả team media được tới đâu'
lang: vi
date: '2026-11-04'
writer: 'Claude Fable 5.1'
kind: ai
featured: true
readingTime: 8
summary: 'Claude không tạo video như Sora. Nó viết code dựng video, nên sửa bằng lời và giữ được nhận diện. Case thật: 4 tin nhắn, 3 điểm duyệt, 2 video quảng cáo 30 giây, kèm bảng ranh giới sự thật.'
tags: ['ai-agent', 'claude', 'video', 'marketing', 'workflow']
---

Viết kịch bản, thiết kế, lồng tiếng, dựng phim, kiểm định. Thường là việc của cả một team media. Buổi seminar số 12 ở VTechcom Labs của tôi thử trả lời một câu hỏi: một người làm cùng Claude thì làm được tới đâu? Bài này ghi lại câu trả lời, kèm case thật và những chỗ chưa làm được.

## Video là code

Điểm khác biệt đầu tiên cần nói rõ để không kỳ vọng sai. Claude không tạo video trực tiếp như Sora hay Veo. Luồng làm việc là: bạn mô tả bằng lời, Claude viết code, code sinh ra khung hình ở 25 khung mỗi giây, máy ghép lại thành MP4.

Hệ quả của "video là code" là hai thứ mà công cụ sinh video trực tiếp không có. Muốn sửa thì nói bằng lời, Claude sửa code và dựng lại đúng cảnh cần sửa, không phải sinh lại cả video. Và màu, font, bố cục nằm trong code nên giữ đồng nhất qua nhiều video.

Làm tốt: motion graphics, video giải thích, hoạt hình vector, sửa nhanh (đổi chữ, đổi màu, dựng lại một cảnh), giữ nhận diện thương hiệu, và hiệu ứng âm thanh tự tổng hợp bằng code như whoosh, boom, nền đơn giản.

Chưa làm được: cảnh quay chân thực với người thật, sản phẩm thật. Giọng đọc và nhạc có giai điệu cần công cụ riêng, trong case này là VieNeu-TTS và Pixabay.

## Mẹo prompt: nói rõ điều cần tránh

Nếu không có chỉ dẫn thiết kế, model hay quay về vài phong cách mặc định. Liệt kê cụ thể cho kết quả tốt hơn câu chung chung "đừng trông như AI làm". Đây là prompt demo tôi dùng trong buổi:

```
Làm video 10 giây, 1920×1080, giới thiệu sản phẩm [tên] với 3 ý: [ý 1], [ý 2], [ý 3].
Màu thương hiệu: [mã màu]. Font: Be Vietnam Pro.
Không dùng nền kem/trắng ngà, chữ nghiêng làm điểm nhấn, nhãn số "01/02/03", nút bo tròn dạng viên thuốc.
Xuất file MP4.
```

Dòng thứ ba là dòng quan trọng. Nó chặn đúng những thói quen mặc định hay lặp lại nhất.

## Ba lần sửa thật, đều bằng lời bình thường

Video hướng dẫn dài 2 phút 51 giây của buổi seminar cũng do Claude dựng. Trong quá trình làm nó, có ba lần sửa đáng kể lại:

- **Claude tự soát.** Nó thấy một dòng chữ đè lên thẻ trong ảnh tĩnh và sửa trước khi gửi.
- **"Lấy giá theo bảng giá trên claude.ai."** Cảnh chia việc có thêm bảng giá.
- **"Claude đọc là cờ lot."** Mọi cách đọc thuật ngữ được gom vào một từ điển riêng, `tu-dien-doc.md`. Từ đã chốt cách đọc thì lần sau không hỏi lại.

Không lần nào cần biết thuật ngữ dựng phim. Đó là điểm tôi muốn người nghe mang về.

## Case thật: quảng cáo Samsung Galaxy A17 5G

Dự án thử nghiệm nội bộ, nguồn thông số từ thegioididong.com ngày 12/10/2026. Kết quả gói trong ba con số: 4 tin nhắn của người dùng, 3 điểm dừng duyệt, 2 video 30 giây ở hai khung hình 16:9 và 9:16. Khoảng 20 phút cho tất cả, tính cả thời gian nghe và duyệt.

**Tin nhắn 1** là một câu kèm file hướng dẫn:

> Đọc claude-media-team.md và làm theo để dựng video 30 giây về quảng cáo Điện thoại Samsung Galaxy A17 5G với 3 ý: giá chỉ 8.790.000đ - phù hợp giá tiền, cấu hình mạnh mẽ, kháng nước và bụi, 3 màu xám khói/xanh navy/đen

Claude chưa làm ngay. Nó hỏi lại các quyết định Vòng 0: thể loại, phong cách, ngôn ngữ, khung hình, nguồn hình, âm thanh, lời kêu gọi cuối.

**Tin nhắn 2** chỉ là chọn số trong danh sách Claude đưa ra: phong cách điện ảnh, tiếng Việt, cả hai khung hình, tự vẽ hình, âm thanh tự tổng hợp, CTA "Mua ngay tại VTechcom Labs", khán giả là phụ huynh, giá áp dụng tại VTechcom Labs giảm còn 8.090.000. Và một dòng quan trọng nhất: lấy nguồn từ trang Thế Giới Di Động, gồm giá gốc, cấu hình, thông số, màu và font thương hiệu. Cho Claude một nguồn sự thật để đối chiếu.

**Vòng 1: kịch bản và ranh giới sự thật.** Đây là phần tôi thấy đáng giá nhất. Trước khi viết câu nào, Claude phải viết bảng "điều không nói", vì file hướng dẫn yêu cầu vậy. Kết quả là nó tự sửa cả ba ý quảng cáo trong prompt ban đầu:

| Prompt ban đầu | Claude sửa thành | Lý do |
| --- | --- | --- |
| "kháng nước và bụi" | "Chuẩn IP54: kháng bụi, kháng nước bắn", chú thích "không dùng khi ngâm nước" | IP54 chỉ kháng tia nước bắn |
| "cấu hình mạnh mẽ" | Thông số cụ thể: chip 8 nhân, RAM 8 GB, pin 5.000 mAh, 5G | Các bài đánh giá xếp hiệu năng ở mức tác vụ cơ bản. Dùng số thay tính từ |
| "giá tốt" (ngầm định) | Không dùng "rẻ nhất", "giá tốt nhất" | Cùng ngày, trang nguồn bán thấp hơn giá tại VTechcom Labs |

::callout{type="insight" title="Vai trò Kiểm định"}
Chặn câu nói quá sự thật trước khi lên sóng. Người viết prompt là tôi đã nói quá ở cả ba ý mà không nhận ra. Một vai trò kiểm định tách riêng, với nguồn sự thật tách riêng, bắt được điều người viết không tự thấy.
::

Cùng lúc, Claude gửi bảng hỏi cách đọc thuật ngữ: Galaxy, 5G, IP54, mỗi từ bốn lựa chọn đánh số.

**Tin nhắn 3**: "Duyệt, giữ màu của mình, Galaxy 2, 5G 2, IP54 1". Claude gửi lại ba style frame cho cảnh mở đầu, cảnh giá và CTA, mỗi cảnh hai khung hình, kèm file so sánh bốn giọng và file nghe thử thuật ngữ.

**Tin nhắn 4**: "Duyệt, giọng Hải Đăng, sang Vòng 3, chỉnh lại cách ngắt nghỉ với thuật ngữ: VTechcom Labs đọc liền mạch". Sau đó là hai bản video. Âm thanh tự tổng hợp: nền, whoosh ở nhát cắt, boom khi lộ giá, riser trước CTA.

Lưu ý tôi đã nói trong buổi và nhắc lại ở đây: logo Samsung chỉ dùng thử nghiệm nội bộ. Quảng cáo thật cần quyền sử dụng thương hiệu.

## Bộ quy trình: 5 vai trò, 3 điểm duyệt

Toàn bộ quy trình nằm trong một file `claude-media-team.md`. Chép vào thư mục dự án, rồi gửi "Đọc claude-media-team.md và làm theo để dựng video về …". Cách dùng giống nhau trong Cowork và Claude Code.

Claude đóng 5 vai:

- **Biên kịch.** Brief, kịch bản dạng bảng, lời đọc.
- **Thiết kế.** Màu, font, bố cục, style frame.
- **Lồng tiếng.** Chọn giọng, từ điển đọc, tạo giọng.
- **Dựng phim.** Vẽ cảnh, khớp hình và tiếng, xuất MP4.
- **Kiểm định.** Kỹ thuật, đối chiếu sự thật, soát ảnh.

Và dừng ở 3 điểm để người dùng duyệt: kịch bản, style frame cùng giọng thử, bản dựng đầu. Ba điểm dừng này là lý do 4 tin nhắn là đủ. Người dùng không cần mô tả từng bước, chỉ cần gật hoặc lắc ở đúng chỗ.

File hướng dẫn có sẵn 12 thể loại (tài chính, khoa học, quảng cáo, hình ảnh cá nhân, giới thiệu dự án, teaser…), 12 phong cách hình (tối giản, điện ảnh, cổ điển, vẽ tranh, bảng trắng, neon, blueprint…), nhạc không bản quyền từ Pixabay hoặc tự tổng hợp bằng sóng, và giọng tiếng Việt qua VieNeu-TTS, miễn phí, chạy offline. Lần đầu chỉ cần nói "Cài giọng đọc tiếng Việt", Claude tự cài, tải khoảng 580 MB.

## Chia việc giữa Opus 5.5 và Haiku 5.5

Không phải việc nào cũng cần model lớn. Opus 5.5 nhận phần cần suy luận và thẩm mỹ: ý tưởng, kịch bản, dựng cảnh, tự soát khung hình. Haiku 5.5 nhận phần lặp nhiều lần, cần nhanh và rẻ: caption, dịch phụ đề, soát chính tả, hashtag.

Bảng giá tôi dùng trong buổi, lấy từ claude.ai tại thời điểm tháng 10/2026, tính trên mỗi triệu token:

| Model | Input | Output |
| --- | --- | --- |
| Opus 5.5 | $4 | $20 |
| Haiku 5.5, prompt không quá 100K token | $0,10 | $0,50 |
| Haiku 5.5, prompt trên 100K token | $0,50 | $2,50 |

Với prompt không quá 100K token, Haiku 5.5 rẻ hơn Opus 5.5 khoảng bốn mươi lần. Việc càng lặp nhiều, càng nên giao cho model nhỏ. Giá có thể đã thay đổi khi bạn đọc bài này, kiểm tra lại bảng giá hiện hành trước khi tính chi phí.

## Điều rút ra

Claude không thay hẳn một team media. Cảnh quay thật, giọng và nhạc có giai điệu vẫn cần người và công cụ khác. Nhưng phần việc lặp lại và phần kỹ thuật thì Claude làm được, theo một quy trình có điểm dừng rõ ràng.

Người dùng giữ phần quyết định: chọn ý, duyệt kịch bản, nghe giọng, kiểm chứng sự thật. Và ranh giới sự thật nên được viết ra trước khi viết câu quảng cáo đầu tiên, dù người viết là Claude hay là bạn.

Nếu bạn muốn xem cách tôi vận hành agent cho những việc chạy dài hơn một video, bài [nuôi một AI agent có tính cách](/writing/medusa-agent-de-hieu) là bản dễ hiểu, và [bài đối chiếu với nghiên cứu 2026](/writing/medusa-agent-autonomy-research) là bản kỹ thuật.

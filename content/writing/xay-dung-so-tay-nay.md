---
title: 'Trang này do AI Agent dựng, tôi lo đúng 1% còn lại'
lang: vi
date: '2026-07-12'
kind: note
readingTime: 4
featured: true
summary: 'Chuyện cuối tuần rảnh: tôi để AI Agent dựng gần như cả trang này, còn tôi ngồi review với chỉnh câu chữ. Hé lộ hậu trường xíu nè.'
tags: ['nuxt', 'ai-agent', 'meta']
---

Hê lô ae, là tôi Ania đây :)))

Cuối tuần rảnh quá, tôi quyết định dựng cái trang này làm profile cá nhân. Mà thú thật luôn: phần lớn code ở đây không phải tôi gõ. Tôi ngồi chỉ đạo, AI Agent gõ. Ước chừng tôi đóng góp đúng... 1%. Cái 1% đó là gì thì lát kể.

## AI làm gần hết, thật

Tôi mở một AI Agent lên, bảo nó: "dựng cho tôi trang profile tĩnh, tối giản, song ngữ Việt - Anh, deploy lên GitHub Pages". Rồi tôi đi pha cà phê. Lúc quay lại thì bộ khung đã gần xong:

| Tầng | Nó chọn giúp |
| --- | --- |
| Framework | Nuxt 4 (tĩnh, prerender) |
| Nội dung | Nuxt Content + MDC |
| Giao diện | Tailwind CSS v4 |
| Icon + chữ | Iconify, Space Grotesk, Inter, JetBrains Mono (bundle cục bộ hết) |

Tôi gần như không phải mở tài liệu của thư viện nào. Chỗ nào sai thì tôi chỉ, nó sửa. Vòng lặp cứ thế chạy tới khi ưng mắt.

::callout{type="insight" title="1% của tôi nằm ở đâu"}
Không nằm ở số dòng code, mà ở chỗ *biết mình muốn gì*: chọn phong cách, bỏ cái thừa, và nói "không" đúng lúc. AI gõ nhanh thật, nhưng gu thì vẫn phải là của mình.
::

## Còn mấy bài viết thì sao?

À cái này quan trọng nè. Những bài trong trang không phải AI viết hết đâu nhé. Tôi đọc rất kỹ, sửa lại câu chữ, cắt chỗ tối nghĩa, thêm vào chỗ tôi thật sự nghĩ. AI cho tôi bản nháp nhanh, còn giọng văn cuối cùng là tôi ngồi gọt, hmmhm.

Nói kiểu khác: AI là cái máy gõ siêu nhanh, còn tôi là ông biên tập khó tính ngồi cạnh.

## Viết cái gì, cho ai đọc

Đa số bài ở đây là bài kỹ thuật. Thường là tôi đang làm gì đó trong công việc, hoặc vớ được một chủ đề hay hay, thế là lên idea rồi ngồi viết.

Nhưng mà - gần như bài nào tôi cũng cố để lại một phiên bản dễ hiểu cho ae non-tech nữa. Biết đâu bạn ghé vào chỉ vì tò mò tác giả là ai (là tôi nè \:v), hoặc thấy chủ đề đang hot mà lười ngồi "làm toán" với "vẽ đồ thị". Kiểu "má ơi, đọc cái blog giải trí thôi mà cũng bắt hiểu vector à \:v".

Nên yên tâm nha: chỗ nào nặng đô, tôi sẽ cố kể lại bằng tiếng người. Ai thích đào sâu thì có phần kỹ thuật đầy đủ, ai chỉ muốn nắm ý thì đọc bản nhẹ là đủ vui.

## Vì sao tĩnh, vì sao đơn giản

Tôi muốn cái trang này sống lâu. Không backend, không database, không có gì phải bảo trì hàng tháng. Chỉ là HTML tĩnh nằm trên GitHub Pages - mười năm nữa mở lại vẫn chạy, không sợ kiểu "lâu ngày không đụng tới nên hỏng".

Song ngữ cũng làm cho nhẹ nhàng: mỗi bài tự khai báo ngôn ngữ của mình, giao diện đọc cookie rồi hiện đúng bài đúng thứ tiếng. Không dịch máy, không nhân đôi đường dẫn.

Vậy đó. Một buổi cuối tuần, một con AI Agent chăm chỉ, cộng thêm 1% công "chọn gu" của tôi. Cảm ơn ae đã đọc tới đây :)))

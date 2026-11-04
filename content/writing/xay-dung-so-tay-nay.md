---
title: 'Dựng blog cá nhân bằng AI agent với Nuxt 4: tôi lo đúng 1% còn lại'
lang: vi
date: '2026-07-12'
kind: note
readingTime: 3
summary: 'Chuyện một cuối tuần rảnh: tôi để AI agent dựng gần như toàn bộ trang này bằng Nuxt 4, Nuxt Content và Tailwind v4, còn tôi ngồi review và chỉnh câu chữ. Hậu trường, và 1% của tôi nằm ở đâu.'
tags: ['nuxt', 'ai-agent', 'meta']
---

Chào bạn, tôi là Ania.

Cuối tuần rảnh, tôi quyết định dựng trang này làm profile cá nhân. Thú thật luôn: phần lớn code ở đây không phải tôi gõ. Tôi chỉ đạo, AI agent gõ. Ước chừng tôi đóng góp đúng 1%. Cái 1% đó là gì, lát tôi kể.

## AI làm gần hết, thật

Tôi mở một AI agent lên và bảo nó: "dựng cho tôi trang profile tĩnh, tối giản, song ngữ Việt - Anh, deploy lên GitHub Pages". Rồi tôi đi pha cà phê. Lúc quay lại, bộ khung đã gần xong:

| Tầng | Nó chọn giúp |
| --- | --- |
| Framework | Nuxt 4 (tĩnh, prerender) |
| Nội dung | Nuxt Content + MDC |
| Giao diện | Tailwind CSS v4 |
| Icon + chữ | Iconify, Space Grotesk, Inter, JetBrains Mono (bundle cục bộ hết) |

Tôi gần như không phải mở tài liệu của thư viện nào. Chỗ nào sai thì tôi chỉ, nó sửa. Vòng lặp cứ thế chạy tới khi ưng mắt.

::callout{type="insight" title="1% của tôi nằm ở đâu"}
Không nằm ở số dòng code. Nó nằm ở chỗ *biết mình muốn gì*: chọn phong cách, bỏ cái thừa, và nói "không" đúng lúc. AI gõ nhanh thật, nhưng gu vẫn phải là của mình.
::

## Còn các bài viết thì sao?

Phần này quan trọng. Các bài trong trang không phải AI viết hết. Tôi đọc rất kỹ, sửa lại câu chữ, cắt chỗ tối nghĩa, thêm vào chỗ tôi thật sự nghĩ. AI cho tôi bản nháp nhanh. Giọng văn cuối cùng là tôi ngồi gọt.

Nói cách khác: AI là cái máy gõ siêu nhanh, còn tôi là ông biên tập khó tính ngồi cạnh.

## Viết cái gì, cho ai đọc

Đa số bài ở đây là bài kỹ thuật: Cardano, Hydra, AI agent, bảo mật. Thường là tôi đang làm gì đó trong công việc, hoặc vớ được một chủ đề hay, thế là ngồi viết.

Nhưng gần như bài nào tôi cũng cố để lại một phiên bản dễ hiểu cho bạn đọc không làm kỹ thuật. Biết đâu bạn ghé vào chỉ vì tò mò tác giả là ai, hoặc thấy chủ đề đang hot mà không muốn ngồi "làm toán" với "vẽ đồ thị". Đọc một blog cho vui mà bị bắt hiểu vector thì cũng mệt.

Nên yên tâm: chỗ nào nặng, tôi sẽ cố kể lại bằng tiếng người. Ai thích đào sâu thì có bản kỹ thuật đầy đủ. Ai chỉ muốn nắm ý thì đọc bản nhẹ là đủ.

## Vì sao tĩnh, vì sao đơn giản

Tôi muốn trang này sống lâu. Không backend, không database, không có gì phải bảo trì hàng tháng. Chỉ là HTML tĩnh nằm trên GitHub Pages. Mười năm nữa mở lại vẫn chạy, không sợ kiểu "lâu ngày không đụng tới nên hỏng".

Song ngữ cũng làm cho nhẹ. Mỗi bài tự khai báo ngôn ngữ của mình, giao diện đọc cookie rồi hiện đúng bài đúng thứ tiếng. Không dịch máy, không nhân đôi đường dẫn.

Vậy đó. Một buổi cuối tuần, một AI agent chăm chỉ, cộng thêm 1% công "chọn gu" của tôi. Cảm ơn bạn đã đọc tới đây.

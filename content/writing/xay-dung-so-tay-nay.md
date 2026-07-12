---
title: 'Ghi chú kỹ thuật: sổ tay này được dựng thế nào'
lang: vi
date: '2026-07-10'
kind: engineering
readingTime: 4
summary: 'Vài dòng về công nghệ đằng sau trang này - Nuxt, Nuxt Content, và một hệ thống chữ tối giản theo phong cách Thụy Sĩ - cùng ý tưởng mà nó xoay quanh.'
tags: ['nuxt', 'design', 'meta']
---

Trang này là một cuốn sổ tay, không phải một bảng tin. Nó xoay quanh đúng một mô-típ: **bút toán sổ cái** - một khoá ánh xạ tới một giá trị, đúng hình dạng của một đầu ra eUTXO. Trang chủ trình bày danh tính dưới dạng những dòng sổ cái; mỗi mục đều có một dải nhãn chữ monospace chạy dọc lề trái.

## Công nghệ

Bản dựng được giữ nhỏ gọn và tĩnh một cách có chủ đích.

| Tầng | Lựa chọn |
| --- | --- |
| Framework | Nuxt 4 (tĩnh, prerender) |
| Nội dung | Nuxt Content + MDC |
| Giao diện | Token Tailwind CSS v4 |
| Icon | Iconify (đóng gói cục bộ) |
| Chữ | Space Grotesk · Inter · JetBrains Mono |

## Bài viết là Markdown

Mỗi bài là một tệp Markdown với frontmatter có kiểu. Các khối chú thích dùng MDC:

```md
::callout{type="danger" title="Nguyên nhân gốc"}
Vụ tấn công không cần tới lỗi giao thức - chỉ một giả định sai khi tích hợp là đã đủ.
::
```

Kết quả hiển thị:

::callout{type="danger" title="Nguyên nhân gốc"}
Vụ tấn công không cần tới lỗi giao thức - chỉ một giả định sai khi tích hợp là đã đủ.
::

::callout{type="insight" title="Vì sao tĩnh"}
Một cuốn sổ tay nên sống lâu hơn công cụ tạo ra nó. HTML prerender trên GitHub Pages không có runtime để hỏng theo thời gian.
::

## Song ngữ ngay từ đầu

Mỗi bài tự khai báo `lang`. Giao diện đọc ngôn ngữ đã lưu trong cookie và chỉ hiển thị các bài khớp ngôn ngữ đó - không nhân đôi route, không dịch máy.

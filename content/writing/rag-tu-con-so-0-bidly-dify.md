---
title: 'RAG từ con số 0: dựng chatbot hỏi đáp tài liệu trên Dify và những lỗi thật'
lang: vi
date: '2026-11-03'
writer: 'Claude Fable 5.1'
kind: ai
featured: true
readingTime: 13
summary: 'Embedding, chunk, retrieval và cách LLM dùng chunk, kể qua chatbot Bidly dựng trên Dify. Hai lỗi thật: delimiter chunk bị đảo chỗ và reranker trả về rỗng vì không đi cặp với embedding.'
tags: ['rag', 'dify', 'embedding', 'llm', 'ai-agent', 'chatbot']
---

Bài này viết lại từ một buổi seminar nội bộ tôi trình bày ở Vtechcom. Mục tiêu của buổi đó: đi từ con số 0 tới một chatbot hỏi đáp về Bidly, phần mềm quản lý đấu thầu của team, dựng trên Dify. Không cần biết trước về AI. Mọi lỗi trong bài đều là lỗi team đã gặp thật.

## Vì sao LLM cần RAG

Hỏi một LLM "Ai được quyết Go/No-Go trong Bidly?", nó sẽ trả lời theo kiểu CRM nói chung. Nghe rất hợp lý, nhưng có thể sai vai trò, sai quy trình, sai tên nút. LLM chỉ biết những gì có trong dữ liệu lúc train. Bidly là phần mềm của mình, nó chưa từng đọc. Nguy hiểm ở chỗ nó trả lời rất tự tin.

Có hai cách cho LLM "biết" Bidly. Fine-tune: dạy lại model, tốn tiền, và mỗi lần tài liệu đổi lại phải dạy lại. Cách thứ hai: mỗi lần có câu hỏi, tìm đúng đoạn tài liệu liên quan rồi nhét vào prompt. Đó là RAG, Retrieval-Augmented Generation: tìm trước, sinh câu trả lời sau.

::callout{type="insight" title="Nhớ một câu thôi"}
RAG là đi thi được mở tài liệu. LLM là thí sinh giỏi diễn đạt nhưng không thuộc bài. Retrieval là người chạy đi tìm đúng trang sách đặt lên bàn. Người tìm đưa nhầm trang thì thí sinh vẫn viết rất hay, nhưng sai. Chất lượng chatbot phụ thuộc phần lớn vào khâu *tìm*, không phải vào LLM xịn tới đâu.
::

RAG có hai pha, dùng chung một embedding model:

```
Lúc nạp (làm một lần, tài liệu đổi thì làm lại):
  Tài liệu → Chunk → Embedding → Vector DB

Lúc hỏi (chạy lại với mỗi câu hỏi):
  Câu hỏi → Embedding → Tìm Top K → LLM + chunk → Câu trả lời
```

Đổi embedding model là phải nạp lại toàn bộ tài liệu. Chọn kỹ ngay từ đầu.

## Embedding: biến câu chữ thành toạ độ

Máy tính không hiểu chữ. Embedding model nhận một đoạn chữ và trả ra một dãy hàng trăm đến hàng nghìn con số, gọi là vector. Model được huấn luyện sao cho những câu cùng nghĩa cho ra vector gần nhau. "Làm sao nộp bản final?" và "cách submit final version" viết khác hẳn nhau, nhưng vector nằm sát nhau. "Quên mật khẩu" và "reset password" cũng vậy. Ctrl+F không bao giờ làm được điều đó.

Độ "gần" đo bằng cosine similarity, tức góc giữa hai vector. Cùng hướng thì điểm gần 1, cùng nghĩa. Vuông góc thì gần 0, không liên quan. Khi có câu hỏi, hệ thống tính điểm này với mọi đoạn trong kho rồi lấy K đoạn điểm cao nhất. Đó là *Top K*, con số bạn sẽ thấy trong màn hình Dify.

Ba điều người mới hay hiểu nhầm:

- **Embedding không trả lời.** Nó chỉ đo nghĩa để tìm tài liệu. Viết câu trả lời là việc của LLM. Hai model khác nhau, chọn ở hai chỗ khác nhau trong Dify.
- **Đổi model là nạp lại hết.** Vector của hai model khác nhau không so với nhau được, như hai bản đồ khác hệ toạ độ.
- **Phải hiểu tiếng Việt.** Chọn model đa ngôn ngữ. Bidly dùng `gemini-embedding-2-preview`, đa ngôn ngữ và đa phương thức. Chữ "đa phương thức" này sẽ gây ra một sự cố ở phần retrieval.

## Ingest: garbage in, garbage out

Nạp tài liệu vào Dify đi qua năm bước: parse (đọc chữ từ PDF, DOCX, Markdown), clean (gộp khoảng trắng, bỏ header footer lặp), chunk (cắt thành đoạn nhỏ), embed (mỗi đoạn thành một vector), store (lưu vector kèm metadata để còn trích nguồn). Bạn chỉ bấm upload, nhưng bước nào cũng có thể hỏng. PDF scan là ảnh, không có chữ. Bảng biểu hay vỡ cột.

Chatbot trả lời tệ thường do nạp tài liệu tệ, không phải do LLM tệ.

Với Bidly, team không ném user guide cũ vào. User guide đã lệch so với code: menu quản trị đã dời vào Cài đặt, thiếu màn Houselink. Chatbot trả lời theo tài liệu sai còn tệ hơn không có chatbot. Thay vào đó, team viết lại 11 file Markdown từ mã nguồn và tài liệu trong repo, chia theo chủ đề: tổng quan, thuật ngữ, vòng đời cơ hội S0 đến S8, vai trò và phân quyền, hướng dẫn theo màn hình, tác vụ từng bước, báo giá, nhập tiền, cấu hình theo ngành, FAQ, giới hạn hiện tại. Cố ý không chứa mật khẩu, tài khoản demo, biến môi trường. Cái gì đã vào Knowledge thì coi như chatbot có thể nói ra.

Bốn nguyên tắc viết tài liệu cho máy đọc, ngược với thói quen viết cho người:

- **Mỗi mục `##` tự đủ nghĩa.** Nhắc lại chủ ngữ, không viết "như trên". Máy nhận từng mẩu rời, mẩu nào ghi "như trên" là mất nghĩa.
- **Tiêu đề là câu người dùng gõ.** "Làm sao nộp bản final?" dễ khớp hơn "Quy trình nộp hồ sơ", vì tiêu đề nằm trong chunk và kéo vector về gần câu hỏi.
- **Có cả tên Việt lẫn mã.** "S4, Đang đấu thầu", "BD_DIRECTOR", "Tender Room". Người hỏi kiểu nào cũng khớp.
- **Cố ý lặp điều quan trọng.** Luật chuyển giai đoạn có ở cả file vòng đời, phân quyền và FAQ. Viết cho người thì lặp là dở. Viết cho RAG thì lặp là bảo hiểm.

## Chunk: lỗi thật đầu tiên

Phải cắt tài liệu vì hai lý do. Prompt có giới hạn và mỗi chữ đều tốn tiền, không thể nhét cả ~134 KB tài liệu Bidly vào mỗi câu hỏi. Lý do tinh tế hơn: mỗi chunk chỉ có đúng một vector. Chunk vừa nói về báo giá, vừa về phân quyền, vừa về Tender Room thì vector là trung bình của ba chủ đề, không đủ gần câu hỏi nào để được chọn.

Trade-off cốt lõi: chunk nhỏ tìm trúng nhưng thiếu ngữ cảnh, chunk lớn đủ ngữ cảnh nhưng khó tìm. Dify cho ba chế độ. General: chunk dùng để tìm cũng là chunk đưa cho LLM. Q&A: index theo câu hỏi, trả về câu trả lời đi kèm, hợp với FAQ có sẵn. Parent-Child: tìm bằng child nhỏ cho chính xác, đưa parent lớn cho LLM đọc cho đủ ngữ cảnh. Bidly chọn Parent-Child vì 11 file đều chia mục `##` rõ ràng.

Chọn đúng mode chưa đủ. Lần đầu cấu hình, team đặt hai delimiter ngược chỗ:

| Tham số | Ban đầu | Sửa lại |
| --- | --- | --- |
| Parent · delimiter | `\n\n` (đoạn văn) | `\n##` (mục) |
| Parent · tối đa | 1024 ký tự | 2500 ký tự |
| Child · delimiter | `\n##` (mục) | `\n` (từng dòng) |
| Child · tối đa | 512 ký tự | 400 ký tự |

Parent cắt theo đoạn văn nên một mục `##` vỡ thành nhiều mẩu rời. Mẩu sau mất tiêu đề, mất chủ ngữ. Preview file tổng quan ra 12 chunk, có chunk chỉ 105 ký tự, đọc riêng không hiểu đang nói về cái gì. Sửa lại: parent cắt theo `\n##` để mỗi mục là một parent, mục dài nhất khoảng 2.270 ký tự nên đặt tối đa 2500. Child cắt theo `\n` để mỗi dòng, mỗi bullet, mỗi bước là một child.

::callout{type="warning" title="Bài học"}
Luôn bấm Preview trước khi Save. Mở vài chunk ra đọc thử. Nếu chính mình đọc không hiểu thì LLM cũng không hiểu.
::

## Retrieval: lỗi thật thứ hai

Một câu hỏi đi qua sáu bước: embed câu hỏi bằng đúng model lúc nạp, tìm Top K chunk, rerank, lọc ngưỡng điểm, rồi LLM mới đọc chunk trong prompt và viết câu trả lời. LLM chỉ xuất hiện ở bước cuối. Năm bước đầu quyết định nó được đọc cái gì.

Có ba kiểu tìm. Vector hiểu đồng nghĩa và cách hỏi khác nhau, nhưng yếu với mã, tên riêng, con số: "S4" và "BD_DIRECTOR" không có "nghĩa" rõ ràng như câu văn. Full-text khớp chính xác từ và mã, nhưng không biết "duyệt tham gia thầu" với "Go/No-Go" là một, và tách từ tiếng Việt khó hơn tiếng Anh. Hybrid chạy cả hai rồi trộn. Bidly đặt trọng số 0,7 cho nghĩa, 0,3 cho từ khoá. Tài liệu nhiều mã và thuật ngữ thì Hybrid là mặc định an toàn.

Ba thông số trong Retrieval Setting của Dify quyết định LLM đọc gì:

- **Top K.** Thấp quá thì thiếu ý, cao quá thì loãng và tốn tiền. Với Parent-Child, mỗi kết quả đã là một mục đầy đủ nên Bidly đề xuất 4.
- **Rerank model.** Đọc từng cặp câu hỏi và chunk rồi chấm lại. Chậm hơn cosine nhưng chính xác hơn. Bidly dùng `jina-reranker-m0`.
- **Score Threshold.** Bỏ chunk dưới ngưỡng. Đặt cao quá là loại sạch cả kết quả đúng. Bidly đang tắt, bật lại sau khi test.

Sự cố diễn ra theo thứ tự này. Team thêm rerank `jina-reranker-v3` với threshold 0,7. Test câu "bidly" trên node Knowledge Retrieval: kết quả rỗng. Nghĩ do ngưỡng cao, tắt threshold: vẫn rỗng. Đổi sang `jina-reranker-m0`: có kết quả ngay.

Manh mối nằm ở chữ "đa phương thức". Embedding `gemini-embedding-2-preview` là model đa phương thức, và Dify cảnh báo nên chọn rerank đa phương thức khi embedding đa phương thức. v3 chỉ đọc chữ, m0 thì đa phương thức và đa ngôn ngữ. Cơ chế chính xác vì sao v3 ra rỗng thì team chưa xác định. Điều chắc chắn là quan sát: đổi sang reranker cùng loại với embedding thì chạy.

Hai bài học: embedding và reranker là một cặp, chọn cùng lúc. Và node Knowledge Retrieval trong workflow có retrieval setting riêng, sửa ở KB Settings chưa chắc đã đủ. Ngoài lề, ngưỡng 0,7 cũng quá cao với dữ liệu này.

## LLM dùng chunk: prompt buộc bám tài liệu

Bước cuối, LLM nhận prompt gồm ba phần: luật chơi (system prompt), các chunk tìm được, và câu hỏi. Chunk là trang sách trên bàn, system prompt là quy chế phòng thi. Luật quan trọng nhất trong system prompt của Bidly:

> Chỉ trả lời dựa trên ngữ cảnh được cung cấp từ Knowledge Base. Nếu ngữ cảnh không có thông tin, nói rõ là tài liệu chưa đề cập và gợi ý hỏi quản trị viên hệ thống. Không tự bịa tính năng, nút bấm hay con số.

Khi retrieval trượt, LLM vẫn viết ra một câu trả lời rất trơn tru. Không cấm thì nó bịa.

## Ba kiến trúc Bidly đã đi qua

Bản đơn giản nhất là chatflow 4 node: Start, Knowledge Retrieval, LLM, Answer. Một lần gọi LLM mỗi câu. Hai lỗi thật ở node Answer: in cả `reasoning_content` nên người dùng thấy model "độc thoại nội tâm", và gắn cùng một biến hai lần nên câu trả lời bị lặp.

Bản 4 node tìm đúng một lần bằng nguyên văn câu hỏi. Câu hai ý hoặc câu hỏi nối tiếp kiểu "thế còn vai BD?" dễ trượt. Bidly đã đi qua ba phiên bản:

| Kiến trúc | LLM call · câu chào | LLM call · câu cần KB | Câu nhiều ý, hỏi nối tiếp |
| --- | --- | --- | --- |
| Chatflow 4 node | 1 | 1 | Tìm một lần, nguyên văn câu hỏi |
| LLM → Question Classifier → Agent hoặc LLM chitchat | 3 | ≥ 4 | Agent tách ý, tìm lại |
| Start → Agent → Answer (hiện tại) | 1 | ≥ 2 | Agent tách ý, tìm lại |

Bản hiện tại bọc Knowledge Retrieval vào một workflow riêng, publish thành tool, cắm vào Agent. Phải bọc vì node Agent không nhận Knowledge Base trực tiếp làm tool. Agent đọc câu hỏi, quyết định có cần tra không, tự viết câu truy vấn, nhận chunk, chưa đủ thì tra lại với từ khoá khác, rồi mới trả lời. Câu chào thì trả lời thẳng.

Bỏ tầng phân loại giảm từ ít nhất 4 xuống ít nhất 2 lần gọi LLM. Cái giá: Agent tự phân loại nên có thể bỏ qua tool rồi trả lời theo kiến thức chung. Chặn bằng instruction "mọi câu liên quan Bidly bắt buộc gọi tool, khi phân vân thì coi là liên quan", và bằng bộ test. Một lưu ý vận hành: đổi rerank hay Top K trong workflow tool thì phải Publish lại tool.

Quy tắc chọn: bắt đầu bằng cấu trúc đơn giản nhất. Chỉ nâng lên khi bộ test cho thấy nó trượt ở loại câu hỏi người dùng thật hay hỏi.

## Kiểm thử hai lớp

Chatbot trả lời sai có thể do hai tầng: tìm sai chunk, hoặc tìm đúng mà Agent dùng sai. Chỉ chat thử rồi nhìn câu trả lời cuối thì không biết lỗi ở tầng nào. Nên tách ra.

**Hit test** kiểm khâu tìm, không có LLM tham gia. Gõ câu hỏi vào Retrieval Testing của Knowledge, nhìn danh sách chunk trả về kèm tên file và điểm. Chuẩn bị trước "file kỳ vọng" cho từng câu. Đạt khi 1 đến 2 kết quả đầu thuộc file đó. Điểm chỉ để xếp hạng trong cùng một câu, không so giữa các câu. Không thấy file đúng ở đâu thì tài liệu thiếu hoặc chunk vỡ. Thấy nhưng xếp thấp thì chỉnh Hybrid, rerank.

**Test Agent** chấm hành vi, không chấm câu trả lời hay dở. "Chào bạn" và "thời tiết hôm nay" không được gọi tool. "S4 là gì" ngắn và mơ hồ nhưng bắt buộc gọi tool. Câu Go/No-Go hai ý phải tách thành hai truy vấn. Câu nối tiếp "vai nào làm được?" phải viết lại thành "vai nào được nộp bản final" dựa vào lịch sử. Câu bẫy "Bidly có tích hợp SAP không?" thì retrieval vẫn trả chunk lạc đề vì threshold đang tắt, và Agent phải nhận ra chunk không nói gì về SAP rồi trả lời "tài liệu chưa đề cập". Khâu tìm không bao giờ tự nói "không có". Người chặn bịa là Agent.

Trượt ở lớp nào thì sửa ở lớp đó. Hit test trượt thì sửa tài liệu hoặc retrieval. Test Agent trượt thì sửa instruction hoặc mô tả tool, không sửa Knowledge.

## Bot trả lời sai? Kiểm tra theo thứ tự này

Thứ tự đi từ gốc lên ngọn, đúng thứ tự dữ liệu chảy:

1. Tài liệu có thật sự nói tới điều đó không?
2. Chunk có giữ tiêu đề, chủ ngữ? Xem Preview.
3. Retrieval Testing có ra đúng chunk?
4. Top K, ngưỡng điểm có loại mất chunk đúng?
5. Embedding và reranker có đi cặp?
6. Prompt có buộc chỉ dựa vào tài liệu?

Phản xạ thường thấy là "bot ngu quá, đổi model xịn hơn". Hầu như luôn sai chỗ. Cả hai lỗi lớn của Bidly, chunk vỡ và reranker trả rỗng, đều nằm ở bước 2 và 5. Đổi LLM không cứu được gì. Đổi LLM xịn hơn là bước cuối cùng, không phải đầu tiên.

## Bài tập nâng cao: agent-loop

Agent-loop là vòng Nghĩ, Gọi tool, Quan sát lặp lại cho tới khi đủ thông tin. Đó là ý tưởng của ReAct. Bước hay bị bỏ qua nhất: vòng lặp chỉ biết "chưa tìm ra" khi tool nói ra được điều đó. Bidly tắt Score Threshold nên tool luôn trả về Top K chunk kể cả khi lạc đề, Agent không bao giờ thấy kết quả rỗng. Hai cách tạo tín hiệu: bật lại threshold khoảng 0,3 đến 0,4 sau khi chạy hit test, hoặc thêm node Template trả chữ "KHÔNG TÌM THẤY" khi danh sách rỗng.

Rồi đổi Strategy của Agent sang ReAct, đặt Maximum iterations = 3 để chặn lặp vô hạn, thêm instruction: kết quả rỗng thì đổi từ khoá, tên Việt sang mã và ngược lại, rồi gọi lại. Nhưng FunctionCalling hiện tại cũng gọi tool nhiều lần được. Khác biệt của ReAct là vòng suy nghĩ hiện rõ trong log và chạy được với model không hỗ trợ function calling, đổi lại thường tốn token hơn. Chạy cùng bộ test Agent trên cả hai strategy rồi so số liệu. ReAct không mặc định tốt hơn.

Nếu bạn quan tâm tới việc nuôi agent chạy dài hạn hơn một chatbot hỏi đáp, [bài về persona, bộ nhớ và guardrails của medusa-ai](/writing/medusa-agent-autonomy-research) là bước tiếp theo.

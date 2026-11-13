# Kết quả kiểm tra prototype

Ngày kiểm tra: **13/11/2026**. Môi trường lần chạy gần nhất: Windows, Node.js 24.22.1, Microsoft Edge 157.0.4341.46 headless; mở trực tiếp `prototype/index.html` bằng `file://`.

**Kết quả thực tế: 35/35 kiểm tra trình duyệt đạt**, không ghi nhận exception JavaScript trong các luồng đã kiểm tra. Kiểm tra cú pháp `node --check prototype/app.js`, `node --check checks/browser-check.mjs` và `git diff --check` đều thành công.

Đây là kiểm tra prototype chạy theo kịch bản cố định, không phải đánh giá model AI, buổi demo với giảng viên hoặc kết quả dịch vụ gửi TA thật.

| # | Kiểm tra đã chạy | Kết quả |
|---|---|---|
| 1 | Fixture ban đầu có hạn 23:59 và hàng chờ rỗng | Pass |
| 2 | Ca khái niệm dẫn §3.1/§3.2, không chờ người | Pass |
| 3 | Yêu cầu ban đầu và lượt hỏi tiếp đều chỉ gợi ý bước đầu, không mở đáp số hoặc nhận xét hộ | Pass |
| 4 | Ẩn/hiện lại phản hồi kèm giới hạn không thu hồi nội dung đã đọc | Pass |
| 5 | Có thể sửa câu hỏi và mở §3.2 cùng trạng thái, hạn nộp trong dữ liệu B | Pass |
| 6 | Bản nháp chỉnh sửa được, cho xem đoạn nguồn sẽ gửi và chưa tạo yêu cầu trước xác nhận | Pass |
| 7 | Bỏ bản nháp giữ hàng chờ rỗng | Pass |
| 8 | Mở đúng đoạn nguồn đáng ngờ, có cảnh báo và học viên không được đăng FAQ | Pass |
| 9 | Lỗi gửi giữ nháp, không tạo yêu cầu hoặc báo thành công | Pass |
| 10 | Xác nhận gửi thành công mới tạo mã yêu cầu | Pass |
| 11 | Màn hình TA nhận đúng nội dung đã gửi, nguồn và nút đăng bị khóa | Pass |
| 12 | Sửa nội dung đã duyệt hủy checkbox và quyền xuất bản | Pass |
| 13 | TA duyệt mới đăng, không đăng lặp bằng nút đã khóa | Pass |
| 14 | Lưu phản hồi sau khi đăng không mở lại quyền đăng trùng FAQ | Pass |
| 15 | Học viên chỉ thấy phản hồi TA đã duyệt. Bản đang sửa chưa lưu vẫn ở góc nhìn TA | Pass |
| 16 | Gỡ FAQ được, không hứa thu hồi nội dung đã đọc | Pass |
| 17 | Đề xuất FAQ từ ca bình thường vẫn phải đợi TA duyệt | Pass |
| 18 | Lỗi gửi hỗ trợ bài đang mở giữ nguyên nháp. Gửi lại thành công đưa đúng nội dung tới TA, yêu cầu không có nút xuất bản FAQ | Pass |
| 19 | Sửa nháp đề xuất FAQ thành yêu cầu bài 3 không vượt cổng xuất bản | Pass |
| 20 | Báo lỗi nguồn mở từ sidebar chuyển đúng §3.3 | Pass |
| 21 | “Slide 12” không bị biến thành nguồn trích dẫn giả | Pass |
| 22 | Hạn bài 3 lấy từ B, không bịa hàm Excel | Pass |
| 23 | Hỏi buổi 4 chỉ nêu đúng đề cương, không giảng học liệu chưa mở | Pass |
| 24 | p-value thuộc buổi 7 chưa mở | Pass |
| 25 | Bài tập 2 đã có đáp án được giải thích đầy đủ | Pass |
| 26 | Học viên tự chê không nhận phán xét năng lực | Pass |
| 27 | Không tự khuyên xóa giá trị 45 chỉ vì là ngoại lai | Pass |
| 28 | Yêu cầu bỏ qua quy tắc không mở đáp án bài đang mở | Pass |
| 29 | Câu không nhận diện được đi nhánh thiếu căn cứ | Pass |
| 30 | Xin gia hạn giữ nguyên hạn Bài 3 và hướng học viên liên hệ giảng viên | Pass |
| 31 | Câu hỏi mơ hồ về “độ lệch” nhận câu hỏi làm rõ trước khi chọn nguồn | Pass |
| 32 | Màn hình học viên không tràn ngang tại 390px | Pass |
| 33 | Hộp thoại xác nhận vừa màn hình 390px | Pass |
| 34 | Màn hình TA không tràn ngang tại 390px | Pass |
| 35 | Không có runtime exception JavaScript trong lượt chạy | Pass |

Script tái lập: [browser-check.mjs](browser-check.mjs). Hướng dẫn khởi động Chrome kiểm tra trong [prototype/README.md](../prototype/README.md). Bộ kiểm tra tạo hai ảnh:

- [Học viên duyệt câu hỏi](../prototype/screenshots/01-hoc-vien-duyet-cau-hoi.png).
- [TA kiểm tra nguồn và duyệt FAQ](../prototype/screenshots/02-ta-kiem-tra-nguon-va-duyet-faq.png).

Giới hạn: không bao phủ mọi câu nhập tự do, tải đồng thời, xác thực quyền TA, dịch vụ mạng thật, hoặc tất cả trình duyệt. Hai màn hình được kiểm tra ở 1440px và 390px; kiểm tra bố cục di động xác nhận không tràn ngang, không thay thế kiểm tra khả dụng với người dùng thật.

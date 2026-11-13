# Khoảng Học — prototype T2

## Mở bản mẫu

1. Tải repo về hoặc clone repo.
2. Mở `index.html` trong thư mục này bằng trình duyệt. Giữ `app.js` và `styles.css` cùng thư mục.
3. Không cần cài thư viện, đăng nhập, API key hoặc kết nối mạng.

Nếu muốn dùng HTTP, từ gốc repo chạy `python3 -m http.server 8080` rồi mở `http://localhost:8080/prototype/`.

## Điều gì được mô phỏng?

- Thời điểm tình huống: **22:30 ngày 13/11/2026**, giờ Việt Nam. Bài tập 3 đang mở đến 23:59; TA trực 08:00–22:00.
- Dữ liệu A/B của T2 nhúng trong `app.js`. §3.3 cố ý giữ nguyên câu sai của đề để minh họa cách xử lý học liệu đáng ngờ.
- Trả lời theo nhánh/từ khóa, không có model AI. Ô nhập tự do có nhánh an toàn khi không đủ căn cứ; không bảo đảm hiểu mọi câu lạ.
- Gửi TA, nhận phản hồi, duyệt và đăng FAQ chỉ đổi dữ liệu trên trình duyệt. Không có email, tin nhắn hay giao dịch gửi ra ngoài.
- Hàng chờ và FAQ dùng `localStorage`; nếu trình duyệt chặn storage thì chỉ dùng trong phiên. Hai máy không đồng bộ.
- Tab TA là đóng vai để demo, không phải cơ chế phân quyền. Checkbox duyệt thể hiện bước ra quyết định của người phụ trách.

## Demo ca K-A: bài đang mở

1. Bấm **Xin xác nhận bài 3**. Chỉ vào số **1**: trạng thái bài và giới hạn. Đọc phản hồi: chỉ bước đầu, không xác nhận đáp số hoặc viết nhận xét hộ.
2. Bấm **Đọc nguyên văn nguồn** tại số **2** để thấy §3.2.
3. Thử hỏi thêm “Xác nhận đáp số giúp em”; giới hạn vẫn giữ trong ca bài đang mở.
4. Thử **Ẩn phản hồi → Hiện lại** hoặc **Sửa câu hỏi**. Ẩn không thu hồi được nội dung đã đọc.
5. Bấm **Soạn câu hỏi gửi TA**, số **3**. Sửa nội dung, bỏ nháp để thấy chưa có yêu cầu, hoặc xác nhận để tạo hàng chờ.
6. Mở **Điều khiển bản mẫu**, bật **Mô phỏng lỗi gửi TA** rồi thử gửi: nháp vẫn còn, không hiện đã gửi. Tắt tùy chọn rồi gửi lại để tạo yêu cầu.

## Demo ca K-B: tài liệu sai, FAQ cần người duyệt

1. Bấm **Tài liệu có câu sai**. Đọc cảnh báo số **4**, mở §3.3 ở số **2**; AI không khẳng định câu “luôn nhỏ hơn” đúng.
2. **Soạn câu hỏi gửi TA → sửa → xác nhận**. Kiểm tra tab TA tăng số yêu cầu. Trước xác nhận/hủy/lỗi thì không tăng.
3. Bấm **Góc nhìn TA**, chọn yêu cầu. Xem đúng câu hỏi đã gửi và đoạn nguồn cần kiểm tra.
4. Nhập một phản hồi đóng vai, ví dụ:

   > Theo §3.3, độ lệch chuẩn là căn bậc hai của phương sai và có cùng đơn vị với dữ liệu. Không dùng câu “luôn nhỏ hơn” để kết luận. Giảng viên cần xem lại câu đó trong tài liệu. Đây là phản hồi TA mô phỏng, không phải tài liệu gốc đã được sửa.

5. Chọn checkbox xác nhận đã kiểm tra; thử sửa một chữ để thấy phê duyệt bị hủy. Chọn lại rồi bấm **Duyệt và đăng FAQ**, số **5**.
6. FAQ xuất hiện bên phải. Quay lại **Học viên** để thấy phản hồi. **Gỡ FAQ đã đăng** để xem cảnh báo rằng gỡ không thu hồi được nội dung đã đọc.

## Ca bình thường và ca lạ

- **Hỏi khái niệm**: giải thích trung vị/trung bình với §3.1/§3.2; không chờ TA. Có thể đề xuất FAQ nhưng vẫn phải được TA duyệt.
- **Nguồn không tồn tại**: không bịa “slide 12”, cho sửa câu hỏi.
- Thử “Hạn nộp bài 3 và hàm Excel là gì?”: hạn lấy từ B, không đoán hàm không có trong nguồn.
- Thử “Giảng p-value”: chỉ nói buổi 7 theo đề cương, không bịa tài liệu chưa mở.
- Thử “Giải thích bài tập 2”: được giải thích đáp án đã công bố, khác bài tập 3 đang mở.
- Câu không nhận diện được: chưa đủ căn cứ, sửa câu hỏi hoặc soạn gửi TA. Đây là giới hạn định tuyến tĩnh, không phải kiểm định năng lực AI.

**Reset:** Điều khiển bản mẫu → Xóa dữ liệu bản mẫu. Reset xóa hàng chờ, FAQ và hội thoại cục bộ.

## Ảnh bài nộp

- [01-hoc-vien-duyet-cau-hoi.png](screenshots/01-hoc-vien-duyet-cau-hoi.png): số 1, 2, 3, giới hạn bài mở và bản nháp chỉnh sửa được.
- [02-ta-kiem-tra-nguon-va-duyet-faq.png](screenshots/02-ta-kiem-tra-nguon-va-duyet-faq.png): số 2, 4, 5, nguồn đáng ngờ và cổng duyệt FAQ.

Các huy hiệu 1–5 đối chiếu với `spec.md` §3.4/§5.1. Ảnh chụp từ giao diện hoạt động, không phải ảnh dựng.

## Chạy lại kiểm tra trình duyệt (tùy chọn)

Bộ kiểm tra cần Node.js từ 22 và Chrome hỗ trợ headless. Không cần `npm install`. Ví dụ trên macOS, mở Chrome test trong một terminal riêng:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-first-run \
  --remote-debugging-address=127.0.0.1 --remote-debugging-port=9235 \
  --user-data-dir=/private/tmp/lab5-chrome-test about:blank
```

Từ gốc repo, terminal khác chạy:

```sh
node --check prototype/app.js
LAB5_CDP_PORT=9235 node checks/browser-check.mjs
```

Script thao tác trang test, xóa dữ liệu demo tại đầu/cuối và xuất lại hai ảnh. Đóng Chrome test bằng `Ctrl+C` sau khi hoàn tất. Chỉ dùng profile tạm riêng cho bước kiểm tra này.

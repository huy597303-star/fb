# Shop Clone Tự Động (Next.js + Supabase + Vercel)

Dự án web shop bán tài khoản tự động (Serverless & Jamstack) sẵn sàng deploy lên Vercel hoàn toàn miễn phí.

## Cấu trúc dự án

- `schema.sql`: Script tạo database trên Supabase.
- `.env.local.example`: Mẫu file chứa biến môi trường.
- `app/page.js`: Trang chủ bán hàng.
- `app/api/buy/route.js`: API mua hàng serverless.
- `lib/supabase.js`: Cấu hình kết nối Supabase Client.

## Hướng dẫn cài đặt & Deploy

1. **Khởi tạo Database**: Copy nội dung trong `schema.sql` và chạy trong **SQL Editor** trên [Supabase](https://supabase.com).
2. **Deploy lên Vercel**:
   - Giải nén mã nguồn, push toàn bộ folder lên **GitHub**.
   - Vào [Vercel](https://vercel.com), chọn **Add New Project** và import từ GitHub.
   - Thêm các **Environment Variables**:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
   - Bấm **Deploy**.

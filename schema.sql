-- Bảng tài khoản người dùng & Số dư
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  balance NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng danh mục sản phẩm (VD: Clone FB 2FA, Gmail Cổ...)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT
);

-- Bảng lưu trữ danh sách Clone
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  data TEXT NOT NULL, -- Định dạng: UID|Pass|2FA|Cookie
  is_sold BOOLEAN DEFAULT FALSE,
  sold_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng đơn hàng
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  category_id INT REFERENCES categories(id),
  item_data TEXT NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
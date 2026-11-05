import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { categoryId, userId } = await req.json();

    // 1. Kiểm tra sản phẩm trong kho còn trống không
    const { data: item, error: itemError } = await supabaseAdmin
      .from('items')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_sold', false)
      .limit(1)
      .single();

    if (itemError || !item) {
      return NextResponse.json({ success: false, message: 'Hết hàng!' }, { status: 400 });
    }

    // 2. Đánh dấu tài khoản đã bán
    await supabaseAdmin
      .from('items')
      .update({ is_sold: true, sold_to: userId || null })
      .eq('id', item.id);

    // 3. Ghi log đơn hàng
    await supabaseAdmin.from('orders').insert([
      {
        user_id: userId || null,
        category_id: categoryId,
        item_data: item.data,
        price: item.price || 0,
      },
    ]);

    return NextResponse.json({ success: true, data: item.data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

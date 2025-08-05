import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    // Создаем клиент Supabase, который может работать в серверных компонентах
    const supabase = createRouteHandlerClient({ cookies });
    // Обмениваем полученный код на сессию пользователя
    await supabase.auth.exchangeCodeForSession(code);
  }

  // После успешного обмена кода, перенаправляем пользователя на главную страницу.
  // Ваш middleware (если он есть) затем перехватит его и направит куда нужно (например, в /dashboard).
  return NextResponse.redirect(requestUrl.origin);
}

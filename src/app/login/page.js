'use client';

import { createClient } from '@/lib/supabase/client';
import Link from 'next/link'; // <--- 1. ДОБАВЬТЕ ЭТОТ ИМПОРТ
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Error logging in: ' + error.message);
      return;
    }
    
    router.refresh();
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        {/* Поля для email и пароля остаются без изменений */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }} // <-- изменил отступ
          />
        </div>

        {/* --- 2. ДОБАВЬТЕ ЭТОТ БЛОК КОДА --- */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Link href="/forgot-password" style={{ color: 'blue', textDecoration: 'underline', fontSize: '14px' }}>
            Забыли пароль?
          </Link>
        </div>
        {/* ------------------------------------ */}

        <button type="submit" style={{ width: '100%', padding: '10px', background: 'green', color: 'white', border: 'none', borderRadius: '4px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}

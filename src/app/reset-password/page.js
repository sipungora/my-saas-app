'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError('Ошибка при обновлении пароля: ' + error.message);
    } else {
      setMessage('Пароль успешно обновлен! Вы будете перенаправлены на страницу входа.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Установите новый пароль</h1>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="password">Новый пароль:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Подтвердите новый пароль:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'purple', color: 'white', border: 'none', borderRadius: '4px' }}>
          Обновить пароль
        </button>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

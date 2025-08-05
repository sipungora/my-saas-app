'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // URL, куда перейдет пользователь после клика в письме
    });

    if (error) {
      setError('Ошибка: ' + error.message);
    } else {
      setMessage('Проверьте вашу почту. Мы отправили ссылку для сброса пароля.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Восстановление пароля</h1>
      <p>Введите ваш email, и мы пришлем вам ссылку для сброса пароля.</p>
      <form onSubmit={handlePasswordReset}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
          Отправить
        </button>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

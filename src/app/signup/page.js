// В самом верху файла обязательно укажите, что это клиентский компонент
'use client';

// Импортируем нужные инструменты из React
import { useState } from 'react';
// Импортируем наш клиент Supabase, который мы создали ранее
import { supabase } from '@/lib/supabaseClient';

// Это и есть наш компонент страницы
export default function SignUpPage() {
  // Создаем "состояния" для хранения email и пароля, которые вводит пользователь
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Эта функция будет вызываться при нажатии на кнопку "Create Account"
  const handleSignUp = async (e) => {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    e.preventDefault();

    try {
      // Вызываем функцию регистрации из библиотеки Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      // Если Supabase вернул ошибку, показываем ее в консоли
      if (error) {
        console.error('Error signing up:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }
      
      // Если все прошло успешно
      alert('Account created! Please check your email to confirm your registration.');

    } catch (error) {
      console.error('Unexpected error:', error.message);
    }
  };

  // Это JSX-разметка, которая описывает, как выглядит страница
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Create an Account</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Обновляем email при вводе
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
            onChange={(e) => setPassword(e.target.value)} // Обновляем пароль при вводе
            required
            style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
          Create Account
        </button>
      </form>
    </div>
  );
}
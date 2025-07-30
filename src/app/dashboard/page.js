// Эта страница не требует 'use client', так как она простая
export default function DashboardPage() {
    return (
      <div style={{ padding: '50px' }}>
        <h1>Добро пожаловать на вашу панель управления!</h1>
        <p>Эта страница доступна только авторизованным пользователям.</p>
      </div>
    );
  }
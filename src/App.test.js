import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

test('Başlık doğru şekilde görüntüleniyor', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByRole('heading', {
    name: /Alışkanlıklarınızı Takip Edin, Hedeflerinize Ulaşın/i
  });
  expect(headerElement).toBeInTheDocument();
});

test('Giriş formu alanları mevcut', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const emailInput = screen.getByPlaceholderText('ornek@email.com');
  const passwordInput = screen.getByPlaceholderText('********');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test('Kayıt formuna geçiş yapılabiliyor', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const registerLink = screen.getByText('Hesabın yok mu? Kayıt ol');

  fireEvent.click(registerLink);

  const registerTitle = screen.getByRole('heading', {
    name: 'Kayıt Ol'
  });
  expect(registerTitle).toBeInTheDocument();
});

test('Boş form kontrolü çalışıyor', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Giriş formundaki input'ları bul
  const emailInput = screen.getByPlaceholderText('ornek@email.com');
  const passwordInput = screen.getByPlaceholderText('********');

  // Input'ların required özelliğini kontrol et
  expect(emailInput).toHaveAttribute('required');
  expect(passwordInput).toHaveAttribute('required');
});

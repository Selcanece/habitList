import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailed } from '../features/authSlice';

const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(loginFailed('Şifreler eşleşmiyor'));
            return;
        }

        // Normalde bir API çağrısı yapılır, şimdilik local kayıt yapıyoruz
        const userData = {
            email,
            name,
            premium: false,
            joinDate: new Date().toISOString()
        };

        // Local storage'a kullanıcı bilgilerini kaydedelim
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            dispatch(loginFailed('Bu e-posta adresi zaten kayıtlı'));
            return;
        }

        users.push({ ...userData, password }); // Gerçek uygulamada şifre asla plain text saklanmaz
        localStorage.setItem('users', JSON.stringify(users));

        dispatch(loginSuccess(userData));
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Kayıt Ol</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Ad Soyad
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ad Soyad"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        E-posta
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="ornek@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Şifre
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="********"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Şifre Tekrar
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Kayıt Ol
                </button>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Zaten hesabın var mı? Giriş yap
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register; 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailed } from '../features/authSlice';

const Login = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Local storage'dan kullanıcıları al
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const { password: _, ...userData } = user;
            dispatch(loginSuccess(userData));
        } else {
            dispatch(loginFailed('E-posta veya şifre hatalı'));
        }
    };

    return (
        <div className="w-full max-w-md px-4 sm:px-0">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">Giriş Yap</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            E-posta
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
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
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition duration-200 text-base"
                    >
                        Giriş Yap
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-blue-500 hover:text-blue-700 text-sm sm:text-base"
                        >
                            Hesabın yok mu? Kayıt ol
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 
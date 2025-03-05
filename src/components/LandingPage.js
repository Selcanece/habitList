import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-xl font-bold text-blue-600">Alışkanlık Takipçisi</div>
                        <div className="space-x-4">
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-gray-600 hover:text-blue-600"
                            >
                                Giriş Yap
                            </button>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Ücretsiz Başla
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">
                            Alışkanlıklarınızı Takip Edin, Hedeflerinize Ulaşın
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Günlük ve haftalık alışkanlıklarınızı kolayca takip edin,
                            gelişiminizi görün ve daha iyi bir yaşam için adım atın.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Ücretsiz hesap ile sınırsız alışkanlık takibi</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Günlük ve haftalık hedefler</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Detaylı istatistikler ve raporlar</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {showLogin ? (
                            <Login onSwitchToRegister={() => setShowLogin(false)} />
                        ) : (
                            <Register onSwitchToLogin={() => setShowLogin(true)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 
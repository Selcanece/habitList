import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:gap-0">
                        <div className="text-xl font-bold text-blue-600">Alışkanlık Takipçisi</div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-gray-600 hover:text-blue-600 w-full sm:w-auto text-center"
                            >
                                Giriş Yap
                            </button>
                            <button
                                onClick={() => setShowLogin(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                            >
                                Ücretsiz Başla
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                            Alışkanlıklarınızı Takip Edin, Hedeflerinize Ulaşın
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                            Günlük ve haftalık alışkanlıklarınızı kolayca takip edin,
                            gelişiminizi görün ve daha iyi bir yaşam için adım atın.
                        </p>
                        <div className="space-y-4 text-left">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm sm:text-base">Ücretsiz hesap ile sınırsız alışkanlık takibi</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm sm:text-base">Günlük ve haftalık hedefler</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm sm:text-base">Detaylı istatistikler ve raporlar</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 md:mt-0">
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
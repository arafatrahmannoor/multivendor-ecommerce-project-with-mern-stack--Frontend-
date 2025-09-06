
import useTheme from "../hooks/useTheme";

const Home = () => {
    const { theme } = useTheme();
    return (
        <div className={`min-h-screen transition-colors relative overflow-hidden ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
            {/* Decorative gradients */}
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
                <div className={`h-[18rem] w-[36rem] blur-3xl ${theme === 'dark' ? 'bg-indigo-800/20' : 'bg-indigo-300/30'}`}></div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-20">
                <div className="grid md:grid-cols-2 items-center gap-10">
                    <div className="text-center md:text-left">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-4 ${theme === 'dark' ? 'bg-indigo-900/40 text-indigo-200' : 'bg-indigo-100 text-indigo-700'}`}>Your trusted marketplace</span>
                        <h1 className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Discover, shop, and save with E‑Shop
                        </h1>
                        <p className={`text-lg sm:text-xl mb-10 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Find products you’ll love with great deals and fast checkout.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
                            <a href="/products" className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                                Browse Products
                            </a>
                            <a href="/signup" className={`inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'}`}>
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Right illustration */}
                    <div className="relative hidden md:block">
                        <div className={`absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-800/30' : 'bg-purple-300/40'}`}></div>
                        <div className={`rounded-2xl border shadow-sm p-6 ${theme === 'dark' ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-200'}`}>
                            <div className="grid grid-cols-3 gap-4">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className={`aspect-square rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} grid place-items-center text-2xl`}>
                                        🛒
                                    </div>
                                ))}
                            </div>
                            <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Thousands of items across categories.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
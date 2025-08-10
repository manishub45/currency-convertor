import { useState, useEffect, useCallback } from 'react';
import { InputBox } from './Components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(1); // Set default amount to 1
    const [from, setFrom] = useState(() => localStorage.getItem("fromCurrency") || "usd");
    const [to, setTo] = useState(() => localStorage.getItem("toCurrency") || "inr");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [themeMode, setThemeMode] = useState('light'); // State for dark mode theme

    const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo);

    // FEATURE 1: Dark/Light Mode Logic
    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.classList.remove('light', 'dark');
        htmlElement.classList.add(themeMode);
    }, [themeMode]);


    // FEATURE 2: Debouncing Logic
    useEffect(() => {
        // Convert 500ms after the user stops typing
        const debounceTimeout = setTimeout(() => {
            if (currencyInfo[to]) {
                setConvertedAmount(amount * currencyInfo[to]);
            }
        }, 500);

        // Clear the previous timeout if the user types again within 500ms
        return () => clearTimeout(debounceTimeout);

    }, [amount, from, to, currencyInfo]);


    // FEATURE 3: Optimize functions with useCallback
    const swap = useCallback(() => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    }, [amount, convertedAmount, to, from]);


    // Logic for local storage
    useEffect(() => {
        localStorage.setItem("fromCurrency", from);
        localStorage.setItem("toCurrency", to);
    }, [from, to]);


    return (
        <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-gray-300 dark:bg-gray-900">
            
            {/* Dark Mode Toggle Button */}
            <div className="absolute top-5 right-5">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-400"
                >
                    {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
            </div>

            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 dark:bg-black/30">
                    
                    {/* Show loading message while fetching data */}
                    {loading && <p className="text-black text-center text-lg dark:text-white">Loading...</p>}
                    
                    {/* Show error message if fetch fails */}
                    {error && <p className="text-red-200 bg-red-800 p-3 rounded-md text-center text-lg">{error}</p>}
                    
                    {/* Show the form only when not loading and no error */}
                    {!loading && !error && (
                         <form onSubmit={(e) => e.preventDefault()}>
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setFrom(currency)}
                                    selectCurrency={from}
                                    onAmountChange={(newAmount) => setAmount(newAmount)}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setTo(currency)}
                                    selectCurrency={to}
                                    amountDisable
                                />
                            </div>
                            
                            {/* FEATURE 4: 1-Unit Conversion Rate Display */}
                            <div className="text-center my-2 text-sm text-black dark:text-gray-300">
                                1 {from.toUpperCase()} = {(currencyInfo[to] || 0).toFixed(4)} {to.toUpperCase()}
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                                Convert {from.toUpperCase()} to {to.toUpperCase()}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
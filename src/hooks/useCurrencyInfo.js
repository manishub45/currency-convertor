import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    // Teen states: data, loading, aur error ke liye
    const [data, setData] = useState({}); 
    const [loading, setLoading] = useState(true); // Shuru me loading true rahegi
    const [error, setError] = useState(null); // Shuru me koi error nahi

    useEffect(() => {
        // Har baar currency badalne par, loading true aur error null set kar denge
        setLoading(true);
        setError(null);

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                // Agar API se response theek nahi mila to error throw karenge
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((resp) => {
                setData(resp[currency]); // setData(res[currency]); // API response se, current currency ka data nikaal kar state mein save karna.
            })
            .catch((err) => {
                // Agar fetch me koi bhi error aayi to use yahan set karenge
                setError("Could not fetch the currency data. Please try again later.");
            })
            .finally(() => {
                // Chahe success ho ya error, aakhir me loading false ho jayegi
                setLoading(false);
            });
            
    }, [currency]);

    // Ab hum data, loading, aur error teeno ko return kar rahe hain
    return { data, loading, error };
}

export default useCurrencyInfo;
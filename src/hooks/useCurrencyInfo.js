import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    // States for data, loading, and error
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [error, setError] = useState(null); // No error initially

    useEffect(() => {
        // Reset loading and error states on every currency change
        setLoading(true);
        setError(null);

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                // If the network response is not ok, throw an error
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((resp) => {
                // Extract and set the data for the selected currency from the API response.
                setData(resp[currency]);
            })
            .catch((err) => {
                // Catch any errors during fetch and set the error state
                setError("Could not fetch the currency data. Please try again later.");
            })
            .finally(() => {
                // Finally, set loading to false regardless of success or error
                setLoading(false);
            });
            
    }, [currency]);

    // Return all three states: data, loading, and error
    return { data, loading, error };
}

export default useCurrencyInfo;
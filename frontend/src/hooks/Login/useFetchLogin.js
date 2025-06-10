const useFetchLogin = () => {
    const ApiUrl = 'http://localhost:5000/api/login';

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            return data; // Return the response data
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // Propagate the error
        }
    }
    return { handleLogin };
}

export default useFetchLogin;
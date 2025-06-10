const useFetchRegister = () => {
    const ApiUrl = 'http://localhost:5000/api/register';

    const handleRegister = async (name, lastname, email, password, birthday, dui, address) => {
        try {
            const response = await fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify({ name, lastname, email, password, birthday, dui, address }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            return data; // Return the response data
        } catch (error) {
            console.error('Error during registration:', error);
            throw error; // Propagate the error
        }
    }
    return { handleRegister };
}

export default useFetchRegister;

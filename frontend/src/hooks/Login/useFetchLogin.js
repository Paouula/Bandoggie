const useFetchLogin = () => {
    const ApiUrl = 'http://localhost:4000/api/login';

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Removemos el toast de aquí para evitar conflictos
            // El toast se manejará desde el componente Login
            console.log('Login successful, data:', data); // Para debugging
            return data;
        } catch (error) {
            console.error('Login error in hook:', error); // Para debugging
            throw error;
        }
    }
    
    return { handleLogin };
}

export default useFetchLogin;
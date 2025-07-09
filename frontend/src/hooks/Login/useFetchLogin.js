import { toast } from 'react-hot-toast';

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
                toast.error(data.message || 'Login failed');
                throw new Error(data.message || 'Login failed');
            }

            toast.success('Sesión iniciada correctamente');
            return data;
        } catch (error) {
            toast.error(error.message || 'Error during login');
            throw error;
        }
    }
    return { handleLogin };
}

export default useFetchLogin;
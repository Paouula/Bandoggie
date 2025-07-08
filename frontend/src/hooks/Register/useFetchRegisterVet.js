import { toast } from 'react-hot-toast';

const useFetchRegisterVet = () => {
    const ApiUrl = 'http://localhost:4000/api/registerVet';

    const handleRegister = async(nameVet, email, password, locationVet, nitVet) => {
        try {
            const response = await fetch(ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ nameVet, email, password, locationVet, nitVet }),
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

    const verifyEmail = async (verificationCode) => {
        try {
            const response = await fetch(`${ApiUrl}/verifyCodeEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ verificationCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Email verification failed');
            }

            return data;
            
        } catch (error) {
            toast.error(error.message || 'Error during email verification');
        }
    }
    return { handleRegister, verifyEmail };
}

export default useFetchRegisterVet;
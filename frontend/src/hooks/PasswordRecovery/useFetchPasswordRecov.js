import { toast } from 'react-hot-toast';

const useFetchPasswordRecovery = () => {
    const ApiUrl = 'http://localhost:4000/api/passwordRecovery';

    const handleRequest = async ( email ) => {
        try {
            const response = await fetch(`${ApiUrl}/requestCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Request failed');
                throw new Error(data.message || 'Request failed');
            }

            toast.success('Se ha enviado el código correctamente');
            return data;

        } catch (error) {
            throw error;
        }
    }

    const handleVerify = async ( code ) => {
        try {
            const response = await fetch(`${ApiUrl}/verifyCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ code }),
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

    const handleNewPass = async ( newPassword ) => {
        try {
            const response = await fetch(`${ApiUrl}/newPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al actualizar la contraseña');
            }

            return data;

        } catch (error) {
            toast.error(error.message || 'Error al actualizar la contraseña');        
        }
    }
    return { handleRequest, handleVerify, handleNewPass }
}

export default useFetchPasswordRecovery;
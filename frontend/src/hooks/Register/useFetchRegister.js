import { toast } from 'react-hot-toast';

const useFetchRegister = () => {
    const ApiUrl = 'http://localhost:4000/api/register';

    const handleRegister = async (name, email, phone, birthday, password, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('birthday', birthday);
            formData.append('password', password);
            if (image) {
                formData.append('image', image);
            }
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }
            const response = await fetch(ApiUrl, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return data;
        } catch (error) {
            toast.error(error.message || 'Error during registration');
           
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

export default useFetchRegister;

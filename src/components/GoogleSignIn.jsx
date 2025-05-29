import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { showSuccessToast } from '@/lib/toast';

const GoogleSignIn = () => {
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const { email, given_name, family_name } = decoded;

            // Call your backend API
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signUpwithGoogle`, {
                email,
                firstName: given_name,
                lastName: family_name,
            });

            console.log('User logged in:', res.data);
            localStorage.setItem("user_data", JSON.stringify(res?.data?.data));
            localStorage.setItem("userAccessToken", JSON.stringify(res?.data?.accessToken));
            showSuccessToast(res?.data?.msg || "Signin Successfully!");
            // Optionally: Store token, redirect, etc.

        } catch (error) {
            console.error('Google Login Error:', error);
            showErrorToast(error.res?.data?.msg || error.response?.data?.msg || "Signup Failed!");
        }
    };

    return (
        <div className='google_lwb_btn d-flex justify-content-center w-100'>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log('Login Failed')}
                width={"900px"}
                shape='pill'
                theme='outline'
                context='signin'
            />
        </div>
    );
};

export default GoogleSignIn;
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      text="signin_with"
      onSuccess={async (res) => {
        try {
          // res.credential is the ID token from Google
          await dispatch(googleAuth(res.credential));
          navigate('/dashboard'); // redirect after success
        } catch (err) {
          alert('Google login failed');
        }
      }}
      onError={() => alert('Google login failed')}
    />
  );
}

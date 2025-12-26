import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function GoogleRegisterBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      text="signup_with"
      onSuccess={async (res) => {
        await dispatch(googleAuth(res.credential));
        navigate('/dashboard'); // redirect after success
      }}
      onError={() => alert('Google login failed')}
    />
  );
}

import { useAuth } from "../context/AuthContext";

const GoogleLoginButton = () => {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        await googleLogin(response.credential);
      }
    });

    google.accounts.id.prompt();
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full border border-border py-3 rounded mt-2"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;

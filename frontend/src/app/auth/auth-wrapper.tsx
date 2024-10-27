import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode; // Specify children prop type
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default AuthWrapper;

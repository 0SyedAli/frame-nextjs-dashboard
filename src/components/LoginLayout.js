"use client";

const LoginLayout = ({ children }) => {
  return (
    <div className="login-layout">
      <div className="login-wrapper">{children}</div>
    </div>
  );
};

export default LoginLayout;
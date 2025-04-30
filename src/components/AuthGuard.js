"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token && !user) {
      // Redirect to login if token is not found
      router.replace("/auth/signin");
    }
  }, [router]);

  // Render children if authenticated
  return <>{children}</>;
};

export default AuthGuard;
  
// authenticate with jwt library

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import jwtDecode from "jwt-decode";

// const AuthGuard = ({ children }) => {
//   const router = useRouter();

//   const isTokenExpired = (token) => {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Convert to seconds
//       return decodedToken.exp < currentTime;
//     } catch (error) {
//       return true; // Treat invalid tokens as expired
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token || isTokenExpired(token)) {
//       // Redirect to login if token is not found or expired
//       router.replace("/login");
//     }
//   }, [router]);

//   // Render children if authenticated
//   return <>{children}</>;
// };

// export default AuthGuard;

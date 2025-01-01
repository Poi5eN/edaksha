import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = Cookies.get('token');
            const storedRole = sessionStorage.getItem('userRole');

            if (token && storedRole) {
                setIsAuthenticated(true);
                setUserRole(storedRole);
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
            }
        };

        checkAuth();

         const handleStorageChange = (e) => {
            if (e.key === 'logout') {
                handleLogout();
            }
        };

       window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        sessionStorage.clear();
        localStorage.setItem('logout', Date.now().toString());
        setIsAuthenticated(false);
        setUserRole(null);
    };
    
    const handleLogin = () => {
       setIsAuthenticated(true);
      const storedRole = sessionStorage.getItem('userRole');
      setUserRole(storedRole);
   }


    const ProtectedRouteComponent = ({ children }) => {
        if(!isAuthenticated){
            return navigate('/login')
        }

        return children;
    };



  const value = {
    isAuthenticated,
    userRole,
    login: handleLogin,
    logout: handleLogout,
    ProtectedRoute: ProtectedRouteComponent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check authentication status on mount and when localStorage changes
//     const checkAuth = () => {
//       const token = Cookies.get('token');
//       const storedRole = sessionStorage.getItem('userRole');
      
//       if (token && storedRole) {
//         setIsAuthenticated(true);
//         setUserRole(storedRole);
//       } else {
//         setIsAuthenticated(false);
//         setUserRole(null);
//       }
//     };

//     // Initial check
//     checkAuth();

//     // Listen for storage events (when other tabs modify storage)
//     const handleStorageChange = (e) => {
//       if (e.key === 'logout') {
//         handleLogout();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [navigate]);

//   const handleLogout = () => {
//     // Clear all auth data
//     Cookies.remove('token');
//     sessionStorage.clear();
//     localStorage.setItem('logout', Date.now().toString());
//     setIsAuthenticated(false);
//     setUserRole(null);
//     navigate('/login');
//   };

//   // Protected Route HOC
//   const ProtectedRoute = ({ children }) => {
//     const token = Cookies.get('token');
//     const storedRole = sessionStorage.getItem('userRole');

//     useEffect(() => {
//       if (!token || !storedRole) {
//         navigate('/login');
//       }
//     }, []);

//     return token && storedRole ? children : null;
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       isAuthenticated, 
//       userRole,
//       logout: handleLogout,
//       ProtectedRoute 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "admin1234") {
      const admin = { role: "admin" };
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return "/admin/dashboard";
    }
    if (email === "customer@gmail.com" && password === "customer1234") {
      const customer = { role: "customer" };
      setUser(customer);
      localStorage.setItem("user", JSON.stringify(customer));
      return "/customers/dashboard";
    }
    alert("Invalid credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

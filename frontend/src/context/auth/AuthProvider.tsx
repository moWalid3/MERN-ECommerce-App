import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import type { ILoginForm, IRegisterForm } from "../../types/Auth";
import { BASE_URL } from "../../constants/baseUrl";

const AuthProvider = (props: PropsWithChildren) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const register = async (formData: IRegisterForm) => {
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      return await handleFetchResult(res, formData);
    } catch (error) {
      console.error(error);
      return ["Something wrong in the server! Please try again later"];
    }
  };

  const login = async (formData: ILoginForm) => {
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      return await handleFetchResult(res, formData);
    } catch (error) {
      console.error(error);
      return ["Something wrong in the server! Please try again later"];
    }
  };

  const handleFetchResult = async (
    res: Response,
    formData: IRegisterForm | ILoginForm
  ) => {
    const data = await res.json();

    if (res.ok) {
      setToken(data.token);
      setUsername(formData.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", formData.email);
      return null;
    }

    const errorsMsg: string[] = [];

    if (res.status === 400) {
      data.error.details.map((err: { msg: string }) => errorsMsg.push(err.msg));
      return errorsMsg;
    }

    errorsMsg.push(data.message);
    return errorsMsg;
  };

  return (
    <AuthContext.Provider value={{ token, username, login, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

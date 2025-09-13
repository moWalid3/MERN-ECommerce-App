import { createContext, useContext } from "react";
import type { ILoginForm, IRegisterForm } from "../../types/Auth";

interface IAuthContext {
  username: string | null;
  token: string | null;
  login: (formData: ILoginForm) => Promise<string[] | null>;
  register: (formData: IRegisterForm) => Promise<string[] | null>;
}

export const AuthContext = createContext<IAuthContext>({
  username: null,
  token: null,
  login: async () => null,
  register: async () => null,
});

export const useAuth = () => useContext(AuthContext);

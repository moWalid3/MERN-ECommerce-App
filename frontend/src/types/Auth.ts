export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
  error: {details: IErrorDetails}[];
}

interface IErrorDetails {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

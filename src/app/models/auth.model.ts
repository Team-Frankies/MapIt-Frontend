export interface AuthLogin {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface AuthRegister {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirm: string;
}

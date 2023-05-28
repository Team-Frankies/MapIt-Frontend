export interface AuthLogin {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface UserUpdateProfile {
  firstname: string;
  lastname: string;
  password: string;
  newpassword: string;
}

export interface Comment {
  writenBy: string;
  placeId: string;
  content: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRegister {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirm: string;
}

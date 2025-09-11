import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface registerDto {
  name: string;
  email: string;
  password: string;
}

interface loginDto {
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: registerDto) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exists!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({ name, email, password: hashedPassword });
  await newUser.save();
  return { data: generateJWT({ name, email }), statusCode: 200 };
};

export const login = async ({ email, password }: loginDto) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (!passwordMatch) {
    return { data: "Incorrect email or password!", statusCode: 400 };
  }

  return { data: generateJWT({ name: findUser.name, email }), statusCode: 200 };
};

const generateJWT = (data: { name: string; email: string }) => {
  return jwt.sign(data, "SKLJ*Jfjasi2ojf@#r21iojr12kljjk@fks");
};

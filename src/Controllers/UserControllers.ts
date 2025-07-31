import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/Prismadb";
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utils/PasswordUtils";
import { plainToClass } from "class-transformer";
import { CreateUserInput } from "../@types/User.dto";
import { validate } from "class-validator";

export const UserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    if (user) {
      const validation = await ValidatePassword(
        password,
        user.password,
        user.salt
        
      );
      if (validation) {
        const signature = await GenerateSignature({
          id: user.id,
          email: user.email,
          verified: user.verified,
        });
        return res.status(200).json({
          msg: "success logged in",
          email: user.email,
          verified: user.verified,
          token: signature,
          isAdmin: user.isAdmin,
        });
      } else {
        return res.status(401).json({
          msg: "Invalid email or password",
        });
      }
    }
    return res.status(401).json({
      msg: "Invalid email or password",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};

export const UserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userInputs = plainToClass(CreateUserInput, req.body);
  const validationError = await validate(userInputs, {
    validationError: { target: true },
  });
  if (validationError.length > 0) {
    return res.status(401).json({
      msg: validationError[0].constraints.isLength,
    });
  }

  const { email, password } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(401).json({
        msg: `User with email ${email} already exists`,
      });
    }
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);
    const user = await prisma.users.create({
      data: {
        email: email,
        password: userPassword,
        salt: salt,
        updatedAt: new Date(),
      },
    });
    return res.status(200).json({
      ...user,
      msg: "successfully registered",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'secret';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 400 });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  const token = jwt.sign({ id: user.id,name:user.name, role: user.role }, secret, { expiresIn: '1h' });
  return NextResponse.json({ token, user });
}

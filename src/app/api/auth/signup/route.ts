import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || 'secret';

export async function POST(req: NextRequest) {
  const { name, email, password, phone, role } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return NextResponse.json({ message: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  const token = jwt.sign({ id: user.id,name:user.name, role: user.role }, secret, { expiresIn: '1h' });
  return NextResponse.json({ token, user });
}

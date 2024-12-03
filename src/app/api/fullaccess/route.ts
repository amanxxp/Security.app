import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../middleware/auth';

export async function GET(req: NextRequest) {
  
  const validRoles = ['ADMIN'];

  const authResult = await auth(req, validRoles);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { role } = authResult;

  return NextResponse.json({ message: `Access granted as ${role}, you have full access` });
}

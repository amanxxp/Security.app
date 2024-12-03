import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export async function auth(req: NextRequest, validRoles: string[]) {

  console.log('Request Headers:', req.headers);

  // Extract the token from the Authorization header
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { message: 'Unauthorized: No token provided or invalid format' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded: any = jwt.verify(token, secret);
    const role = decoded.role;

    // Validate role
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json({ message: 'Forbidden: Access denied' }, { status: 403 });
    }

    // Return the role for further use
    return { role };
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
  }
}

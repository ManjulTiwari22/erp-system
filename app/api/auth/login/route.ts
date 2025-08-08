import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Demo authentication - replace with real authentication logic
    if (username === 'admin' && password === 'password') {
      const user = {
        id: 1,
        username: 'admin',
        email: 'admin@company.com',
        role: 'administrator'
      }

      const token = 'demo-jwt-token-' + Date.now()

      return NextResponse.json({
        success: true,
        token,
        user
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // All available modules in the system
    const allModules = [
      "CRM",
      "Proposal + Estimation",
      "BD+Marketing",
      "After Sales",
      "IT",
      "HR",
      "Facility/Admin",
      "QMS",
      "Management",
      "Process",
      "PV",
      "Piping",
      "Electrical & Automation",
      "Instrumentation & Control",
      "Structural",
      "Civil",
      "Accounts",
      "Contract",
      "Asset Management",
      "Import + Export",
      "Project Management",
      "Production",
      "Logistics and Dispatch",
      "Proc-Metal",
      "Proc-BOI",
      "Proc-Works",
      "QC",
      "Store (MRR/MIR/ Inventory)",
      "User management",
      "Customization"
    ];

    // Define multiple users with role-based module access
    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'password', // Store hashed in real apps
        email: 'admin@company.com',
        role: 'administrator',
        modules: allModules // Admin gets all modules
      },
      {
        id: 2,
        username: 'user1',
        password: 'password1',
        email: 'user1@company.com',
        role: 'regular',
        modules: ["IT"], // User1 only gets IT
        department: 'IT' 
      },
      {
        id: 3,
        username: 'user2',
        password: 'password2',
        email: 'user2@company.com',
        role: 'regular',
        modules: ["F&A"] // Example: user2 has CRM and HR
      }
    ];

    // Find the user by username
    const user = users.find(u => u.username === username);

    // Check if user exists and password matches
    if (user && user.password === password) {
      const token = 'demo-jwt-token-' + Date.now();
      return NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          modules: user.modules
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

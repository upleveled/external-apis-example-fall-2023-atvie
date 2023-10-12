import { NextResponse } from 'next/server';

// Export functions for each method to implement
export function GET(): NextResponse<{ sessions: string }> {
  return NextResponse.json({
    sessions: '/api/sessions',
  });
}

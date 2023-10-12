import { NextResponse } from 'next/server';

type StripeResponse = {
  sessions: string;
};

// Export functions for each method to implement
export function GET(): NextResponse<StripeResponse> {
  return NextResponse.json({
    sessions: '/api/sessions',
  });
}

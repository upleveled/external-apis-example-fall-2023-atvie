import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { stripeClient } from '../../../utils/stripe';

// create the shape of the body as a zod schema
const sessionSchema = z.object({
  price: z.string(),
  quantity: z.number(),
});

type SessionResponseBody =
  | { session: Stripe.Checkout.Session }
  | { error: string };

// Export functions for each method to implement
export async function POST(
  request: NextRequest,
): Promise<NextResponse<SessionResponseBody>> {
  const body = await request.json();

  // Check if the inputs are valid
  const result = sessionSchema.safeParse(body);

  // return an error if is not valid
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'The product data provided is invalid',
      },
      { status: 400 },
    );
  }

  const session = await stripeClient.checkout.sessions.create({
    // replace the url with the domain once the app is deployed
    success_url: 'http://localhost:3000/success',
    line_items: [{ price: body.price, quantity: body.quantity || 1 }],
    mode: body.quantity ? 'payment' : 'subscription',
  });

  return NextResponse.json({
    session: session,
  });
}

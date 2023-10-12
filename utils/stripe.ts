import Stripe from 'stripe';

// Authenticate with my API key
export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

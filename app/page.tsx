import { stripeClient } from '../utils/stripe';
import Products from './Products';

export default async function HomePage() {
  const tablet = await stripeClient.products.retrieve(process.env.TABLET_ID!, {
    expand: ['default_price'],
  });

  const magazine = await stripeClient.products.retrieve(
    process.env.MAGAZINE_ID!,
    {
      expand: ['default_price'],
    },
  );

  console.log('tablet', tablet);
  console.log('magazine', magazine);

  return <Products tablet={tablet} magazine={magazine} />;
}

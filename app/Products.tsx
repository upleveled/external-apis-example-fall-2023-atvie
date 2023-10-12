'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Stripe from 'stripe';

type Props = { tablet: Stripe.Product; magazine: Stripe.Product };

export default function Products(props: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  async function createSession(priceId: string, productQuantity?: number) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        price: priceId,
        quantity: productQuantity,
      }),
    });

    const data = await response.json();

    // we should check for errors

    router.push(data.session.url);
  }

  return (
    <>
      <div>
        <h2>{props.magazine.name}</h2>
        <Image
          src={props.magazine.images[0]!}
          alt={`image of a ${props.magazine.name}`}
          width="100"
          height="100"
        />
        <div>description:{props.magazine.description}</div>
        <button
          onClick={() =>
            createSession((props.magazine.default_price as Stripe.Price).id)
          }
        >
          buy for €{' '}
          {(props.magazine.default_price as Stripe.Price).unit_amount! / 100}
        </button>
      </div>
      <div>
        <h2>{props.tablet.name}</h2>
        <Image
          src={props.tablet.images[0]!}
          alt={`image of a ${props.magazine.name}`}
          width="100"
          height="100"
        />
        <div>description:{props.tablet.description}</div>
        <div>
          <input
            min={1}
            type="number"
            value={quantity.toString()}
            onChange={(event) => setQuantity(Number(event.currentTarget.value))}
          />
          <br />
          <button
            onClick={() =>
              createSession(
                (props.tablet.default_price as Stripe.Price).id,
                quantity,
              )
            }
          >
            buy for €{' '}
            {((props.tablet.default_price as Stripe.Price).unit_amount! *
              quantity) /
              100}
          </button>
        </div>
      </div>
    </>
  );
}

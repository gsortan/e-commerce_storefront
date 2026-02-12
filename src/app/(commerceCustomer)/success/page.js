import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function SuccessPage({ searchParams }) {
  const params = await searchParams;
  const sessionId = params.session_id;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });

  const total = session.amount_total / 100;
  const currency = session.currency.toUpperCase();

  const addr = session.customer_details.address;
  const shipName = session.customer_details.name;

  const items = session.line_items.data;

  return (
    <main className="bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b bg-green-50">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order placed!
            </h1>
            <p className="text-sm text-gray-700 mt-1">
              Thank you! We’ve received your payment.
            </p>
          </div>

          <div className="px-6 py-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order total</span>
              <span className="font-semibold text-gray-900">
                {currency} ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-900">
                {session.customer_details?.email ?? "—"}
              </span>
            </div>
          </div>

          {addr && (
            <div className="px-6 py-5 border-t bg-gray-50">
              <p className="text-sm font-semibold text-gray-900">Ship to:</p>
              <div className="mt-2 text-sm text-gray-700 leading-6">
                <p className="font-medium text-gray-900">{shipName}</p>
                <p>
                  {addr.line1}
                  {addr.line2 && `, ${addr.line2}`}
                </p>
                <p>
                  {addr.city}, {addr.state} {addr.postal_code}
                </p>
                <p>{addr.country}</p>
              </div>
            </div>
          )}

          <div className="px-6 py-5 border-t">
            <ul className="divide-y divide-gray-200">
              {items.map((li) => {
                const product = li.price.product;
                const name = product.name;
                const unit = li.price.unit_amount / 100;
                const qty = li.quantity;
                const imageUrl = li.price.product.images?.[0];

                return (
                  <li
                    key={li.id}
                    className="py-4 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="h-32 w-32 mx-auto">
                      <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col sm:flex-row justify-between gap-2">
                      <div className="text-center sm:text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {name}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          ${unit.toFixed(2)} × {qty}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-semibold text-gray-900">
                          ${(unit * qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

# CardifyHub
Run `npm install` then `npm run dev`.

Copy `.env.local.example` to `.env.local`. Add Firebase Admin credentials, Shopify app credentials and `NEXT_PUBLIC_APP_URL`.

Enable Firebase Email/Password and Google Auth. Create Firestore.

Shopify redirect URL:
`https://YOUR-DOMAIN.com/api/shopify/callback`

Shopify scopes: `read_orders,read_products,read_inventory`.

For Vercel, add every `.env.local` variable under Project Settings > Environment Variables. Never commit `.env.local`.

This starter uses Shopify GraphQL Admin API. WooCommerce credentials are submitted to a server route and are not returned to the browser. For a high-scale production service, encrypt customer WooCommerce secrets or use a dedicated secrets manager.

Before public launch add Firestore/App Check, rate limiting, audit logging, robust OAuth state storage, encryption, pagination, retries and a real email provider/cron.

import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRzVW6dMr/i5O2\n5E/8WqKI5oW8tJTRC4qKu7kI6SREUT8mf+sAXhze+1qJCko9v9xuq/5AzstNhfzC\na7vB92yiTd30lmmP40Y+oqQfzbE87KkCE4TM9hAM5AHUqqNUKwsgudBQ7AQ8MSe/\nPYCNdPChqL0Xx1tSuolDnsoHmun4IszNzeO61tb9NCx8nde7a3I25qNv2WdK2x+a\nDiy2xvLk53Gyp8KRLZWddLpe2R5OT2PfpcmnMI7daBLcg4snGDKEWJxfiMmlYBIT\ncnj9Zn/J72/L7/VXBdBPcBg+H1Y8tAhtrrFwn4czZbLPLFPp632RF7ZngxMF2N4m\nod1eHI8jAgMBAAECggEAVWLU16ht79guG5rLJOD8UmxDlLwH7xZb4b+p/ILqZDWO\n1ovsKD+lT2kL/UcnVP9PZulv9o9TNa9o4fW3uicJWvsG8OMAfnOYpKhL1LfBwRJu\nbG5mN4aTnLN1PUjfZUOJaV3GdxC/XoIA87fDqI6l2p1SrClSNRa/A7rN7Y9yVq6R\n31jC1DpC45pZwySSs1uDOgPilL0yvdeCVKmw13gC1bMNbY/oDfHVos4HhzNZdd+h\nqTe46Dbois5vHYfYH4TwBMf/zRQJjL5k6IM/cXqCskoqL9wCU6yfdjJkHsMMEVh8\nx18b8l6m3MwM9FCPXJwMPckGw1ttp+buNOadWDNhgQKBgQD69OBLihYWrmZG66ng\nr1oPZMVBesiXu/8Y7pgqSXSIPLZEy6bvUxONst+CGQmO2/LJeRjJh1qpRYt919Bz\nvGLQ3wpLbA0NWV/ZV0d/4ErtOZZNKPNMJaS/RLqZYk/ypNN+9VwEM3oFMRZFSaum\nJoN+7XadokclWmT29eSitZSSowKBgQDWBLoSPz6xmHYIt/XfKJwqgnnyQ+yUMdRU\n6QMZPCOPwq23brvIE6zb3FLY3gtUaGwWyTkeUejYbrOHIDA3w1g0Y7fvfke2tBJJ\nyCPGbM3nlX+wttLtbWodt7PzuKCdhINHHcSRMG7i6PBlhxm+kBPYtbp1cHV0Cr6i\n1y7RY+xZgQKBgCDINjiH7ETAOWoQRNut7FTQdBgOov93NmaaXFRBzjAxxhmMhN0E\nfCxpblr/TElWIAwDfqJsxQIRrJwewgMsW7gvOpgJoFbbEvNAPH3O3drJSAICVG3h\nCPlXUAzTU+A9ecc+4+tEki71b5RTgFGu/ERrXrBOz35opYHBM0Gx+JuDAoGAEDoR\nhZqn/T0rDeQszzu8A3kbF+RQhrf0em+kXYByzc6b70GFGVlsjMr6uRi00TSNpXii\nTQs21VonYIJvRXsZL/ezlYQEmfSzQkbbd4r+XaW3JcXm3juihRhNm5gPDYJjlbvL\nEJsUfT3eJESHDizMZGz68zaQoTjDVYNtOFEUNYECgYBrFCPSyg57LYTyZ8Pb+o9u\n6s9O8scmFIrZOfBODBvnJM9kUEtaB2UU5ybZOVi21se/uCpD5a0SZCOJosQShEws\nqKzMudfPUGIRbQv90oIgT1NyIlCjUBNZH2JwV7PvXgBtKd4MqADm/aUhHhd+YE+F\nuporcWDNqKN3ucKLmtWXyQ==\n-----END PRIVATE KEY-----\n",
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

const initApp = () => {
  return initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];

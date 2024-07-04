// types
import type { APIRoute } from "astro";
// firebase server auth
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const result = await auth.verifyIdToken(idToken);
    console.log(result);
  } catch (error: any) {
    return new Response(JSON.stringify(error), { status: 500 });
  }

  const oneDay = 60 * 60 * 24 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: oneDay,
  });

  cookies.set("__session", sessionCookie, {
    path: "/",
  });

  return redirect("/");
};

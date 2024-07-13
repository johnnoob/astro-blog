// types
import type { APIRoute } from "astro";
// firebase server auth
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
// astro db
import { db, eq, User } from "astro:db";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const auth = getAuth(app);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response("No token found", { status: 401 });
  }

  try {
    const result = await auth.verifyIdToken(idToken);
    const foundUser = await db
      .select()
      .from(User)
      .where(eq(User.id, result.uid));
    if (
      foundUser.length === 0 &&
      result.uid &&
      result.name &&
      result.email &&
      result.picture
    ) {
      await db.insert(User).values({
        id: result.uid,
        name: result.name,
        email: result.email,
        pictureUrl: result.picture,
      });
    }
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

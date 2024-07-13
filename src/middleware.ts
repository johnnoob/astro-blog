import { defineMiddleware } from "astro:middleware";
// firebase server auth
import { app } from "./firebase/server";
import { getAuth } from "firebase-admin/auth";
// astro db
import { db, User, eq } from "astro:db";

type UserIdentity = "guest" | "member" | "admin";

export const onRequest = defineMiddleware(async (context, next) => {
  const auth = getAuth(app);
  const sessionCookies = context.cookies.get("__session")?.value;
  if (sessionCookies) {
    const decodedCookies = await auth.verifySessionCookie(sessionCookies);
    if (decodedCookies) {
      const foundUser = await db
        .select()
        .from(User)
        .where(eq(User.id, decodedCookies.uid));
      if (foundUser.length > 0) {
        context.locals.user = {
          id: foundUser[0].id,
          name: foundUser[0].name,
          picture: foundUser[0].pictureUrl,
          email: foundUser[0].email,
          identity: foundUser[0].identity as UserIdentity,
        };
      }
    }
  }

  //   const currentUser = projectAuth.currentUser;
  //   const { pathname } = context.url;

  //   if (
  //     !currentUser &&
  //     pathname !== "/new" &&
  //     pathname !== "/login" &&
  //     context.request.method === "GET"
  //   ) {
  //     return context.redirect("/login");
  //   }

  //   if (currentUser) {
  //     context.locals.userEmail = currentUser.email;
  //   }

  //   if (currentUser && (pathname === "/new" || pathname === "/login")) {
  //     return context.redirect("/");
  //   }

  return next();
});

import { defineMiddleware } from "astro:middleware";
// firebase server auth
import { app } from "./firebase/server";
import { getAuth } from "firebase-admin/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const auth = getAuth(app);
  const sessionCookies = context.cookies.get("__session")?.value;

  if (sessionCookies) {
    const decodedCookies = await auth.verifySessionCookie(sessionCookies);
    if (decodedCookies) {
      context.locals.user = {
        id: decodedCookies.uid,
        name: decodedCookies.name,
        picture: decodedCookies.picture,
        email: decodedCookies.email,
      };
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

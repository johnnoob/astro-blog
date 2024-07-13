/// <reference path="../.astro/actions.d.ts" />
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      id: string;
      name: string;
      picture: string | undefined;
      email: string | undefined;
      identity: "guest" | "member" | "admin";
    };
  }
}

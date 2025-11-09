"use server";

import { cookies } from "next/headers";

async function setCookie({
  httpOnly = false,
  name,
  value,
  secure = false,
}: {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
}) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: name,
    value: value,
    httpOnly: httpOnly,
    secure: secure,
  });
}

async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name);
}

export { setCookie, deleteCookie, getCookie };

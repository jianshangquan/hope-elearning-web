"use server";

import { getSession } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function createCategory(body: object) {
  const session = await getSession();

  const url = `${API_URL}/admin/categories`;

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  revalidatePath("/admin/categories");

  return (await resp.json()) as number;
}

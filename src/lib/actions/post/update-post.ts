"use server";

import { getSession } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function updatePost(body: any) {
  const session = await getSession();

  const url = `${API_URL}/admin/posts`;

  const resp = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Cookie: session.cookie,
      "Content-Type": "application/json",
    },
  });

  await validateResponse(resp);

  revalidatePath(`/admin/posts/${body.id}`);

  // return (await resp.json()) as Post;
}

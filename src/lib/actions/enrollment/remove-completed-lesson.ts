"use server";

import { getSession } from "@/lib/auth";
import { API_URL_LOCAL } from "@/lib/constants";
import { validateResponse } from "@/lib/validate-response";
import { revalidatePath } from "next/cache";

export async function removeCompletedLesson(courseId: string, lessonId: string, revalidate?: string) {
  const session = await getSession();

  const url = `${API_URL_LOCAL}/enrollments/${courseId}/completed/${lessonId}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: session.cookie,
    },
  });

  await validateResponse(resp);

  if (revalidate) {
    revalidatePath(revalidate);
  }
}

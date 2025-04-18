"use server";

import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState =
  | {
      error?: string;
    }
  | undefined;

export default async function approveSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const jobid = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    await prisma.job.update({
      where: {
        id: jobid,
      },
      data: {
        approved: true,
      },
    });

    revalidatePath(`/`);
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      error: message,
    };
  }
}

export async function deleteJob(prevState: FormState, formData: FormData) {
  try {
    const jobid = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobid,
      },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: {
        id: jobid,
      },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      error: message,
    };
  }

  redirect("/admin");
}

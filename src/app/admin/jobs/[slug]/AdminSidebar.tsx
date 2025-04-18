"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@/generated/prisma";

import approveSubmission, { deleteJob } from "./actions";
import { useActionState } from "react";

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className="w-[200px] flex flex-none flex-row md:flex-col items-center gap-2 md:items-stretch">
      {job.approved ? (
        <span className="text-center font-semibold text-green-500">
          Approved
        </span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

interface AdminButtonProps {
  jobId: number;
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useActionState(approveSubmission, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" defaultValue={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useActionState(deleteJob, undefined);
  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" defaultValue={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

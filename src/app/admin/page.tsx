import Joblistitem from "@/components/Joblistitem";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default async function AdminPage() {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });

  return (
    <main className="max-w-5xl m-auto my-10 space-y-10 px-3">
      <H1 className="text-center">Admin Dashboard</H1>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">Unapproved Jobs:</h2>
        {unapprovedJobs &&
          unapprovedJobs.map((job) => (
            <Link key={job.id} href={`/admin/jobs/${job.slug}`}>
              <Joblistitem job={job} />
            </Link>
          ))}

        {unapprovedJobs.length === 0 && (
          <p className="text-muted-foreground">Currently no unapproved jobs.</p>
        )}
      </section>

      <SignOutButton>Signout</SignOutButton>
    </main>
  );
}

import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} Jobs`
    : type
      ? `${type} Developer Jobs`
      : remote
        ? "Remote Developer jobs"
        : "All Developer Jobs";
  const titleSuffix = location ? `in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q, type, location, remote } = await searchParams;
  return {
    title: {
      default: getTitle({ q, type, location, remote: remote === "true" }),
      template: "%s | Flow Jobs",
    },
    description: "Find your dream developer jobs.",
  };
}

export default async function Home({ searchParams }: PageProps) {
  const currSearchParams = await searchParams;
  const q = currSearchParams.q || "";
  const location = currSearchParams.location || "";
  const remote = currSearchParams.remote || "";
  const type = currSearchParams.type || "";
  const page = currSearchParams.page || "";

  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4 ">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}

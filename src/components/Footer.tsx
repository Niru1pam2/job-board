import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl m-auto space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Flow Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href={"/about"} className="hover:underline">
              About us
            </Link>
            <Link href={"/contact"} className="hover:underline">
              Contact
            </Link>
            <Link href={"/terms"} className="hover:underline">
              Terms of Service
            </Link>
            <Link href={"/privacy"} className="hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="text-center text-muted-foreground">
            ©{new Date().getFullYear()} Flow Jobs, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

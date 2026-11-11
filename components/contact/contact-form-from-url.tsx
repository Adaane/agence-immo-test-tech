"use client";

import { useSearchParams } from "next/navigation";
import {
  type ContactSubject,
  resolveContactSubject,
} from "@/lib/contact/subject";
import { ContactForm } from "./contact-form";

/** Contact form prefilled from the `?bien=` parameter set by a Fiche. */
export function ContactFormFromUrl({
  subjects,
}: {
  subjects: readonly ContactSubject[];
}) {
  const subject = resolveContactSubject(
    useSearchParams().get("bien"),
    subjects,
  );
  // Remount when the subject changes so the defaults apply.
  return <ContactForm key={subject?.id ?? "general"} subject={subject} />;
}

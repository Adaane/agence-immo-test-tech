"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormEvent,
  type ReactNode,
  startTransition,
  useActionState,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  type ContactFieldName,
  type ContactInput,
  contactSchema,
  initialContactState,
  REQUEST_TYPE_LABELS,
  REQUEST_TYPES,
} from "@/lib/contact/schema";
import type { ContactSubject } from "@/lib/contact/subject";
import { CITIES, CITY_LABELS } from "@/lib/properties/schema";
import { cn } from "@/lib/utils";

const DEFAULT_VALUES: ContactInput = {
  name: "",
  email: "",
  phone: "",
  city: "" as ContactInput["city"],
  requestType: "" as ContactInput["requestType"],
  message: "",
  consent: false as unknown as true,
  propertyId: "",
  website: "",
};

const defaultValuesFor = (subject?: ContactSubject): ContactInput =>
  subject
    ? {
        ...DEFAULT_VALUES,
        city: subject.city,
        requestType: "acheter",
        message: `Je souhaite organiser une visite du bien « ${subject.title} ».`,
        propertyId: subject.id,
      }
    : DEFAULT_VALUES;

const fieldClass =
  "h-auto border-0 border-b border-input bg-transparent px-0 py-2.5 text-base focus-visible:border-ink focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0";

function FormField({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="eyebrow text-stone">
        {label}
        {hint ? (
          <span className="ml-2 tracking-normal normal-case">{hint}</span>
        ) : null}
      </label>
      {children}
      <p id={`${id}-error`} className="min-h-5 text-sm text-destructive">
        {error}
      </p>
    </div>
  );
}

export function ContactForm({ subject }: { subject?: ContactSubject }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValuesFor(subject),
  });

  const errorFor = (field: ContactFieldName) =>
    errors[field]?.message ?? state.fieldErrors?.[field];

  const ariaFor = (field: ContactFieldName) => {
    const invalid = Boolean(errorFor(field));
    return {
      "aria-invalid": invalid,
      "aria-describedby": invalid ? `contact-${field}-error` : undefined,
    };
  };

  // Validate on the client first; the Server Action validates again.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(() => {
      const form = formRef.current;
      if (!form) return;
      startTransition(() => formAction(new FormData(form)));
    })(event);
  };

  if (state.status === "success") {
    return (
      <output className="block border border-line bg-paper px-8 py-14">
        <span className="eyebrow block text-bronze-deep">Demande envoyée</span>
        <span className="mt-4 block max-w-lg font-display text-3xl font-light">
          {state.message}
        </span>
      </output>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-x-10 gap-y-4 md:grid-cols-2"
    >
      {subject ? (
        <p className="border-l border-bronze pl-4 md:col-span-2">
          <span className="eyebrow block text-stone">Demande concernant</span>
          <span className="font-display text-2xl font-light">
            {subject.title}
          </span>
        </p>
      ) : null}
      <input type="hidden" {...register("propertyId")} />
      <FormField id="contact-name" label="Nom" error={errorFor("name")}>
        <Input
          id="contact-name"
          autoComplete="name"
          className={fieldClass}
          {...ariaFor("name")}
          {...register("name")}
        />
      </FormField>
      <FormField id="contact-email" label="E-mail" error={errorFor("email")}>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          {...ariaFor("email")}
          {...register("email")}
        />
      </FormField>
      <FormField
        id="contact-phone"
        label="Téléphone"
        hint="(facultatif)"
        error={errorFor("phone")}
      >
        <Input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          {...ariaFor("phone")}
          {...register("phone")}
        />
      </FormField>
      <FormField
        id="contact-city"
        label="Ville concernée"
        error={errorFor("city")}
      >
        <select
          id="contact-city"
          className={cn(fieldClass, "appearance-none outline-none")}
          {...ariaFor("city")}
          {...register("city")}
        >
          <option value="" disabled>
            Choisir
          </option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {CITY_LABELS[city]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        id="contact-requestType"
        label="Votre projet"
        error={errorFor("requestType")}
        className="md:col-span-2"
      >
        <select
          id="contact-requestType"
          className={cn(fieldClass, "appearance-none outline-none")}
          {...ariaFor("requestType")}
          {...register("requestType")}
        >
          <option value="" disabled>
            Choisir
          </option>
          {REQUEST_TYPES.map((type) => (
            <option key={type} value={type}>
              {REQUEST_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        id="contact-message"
        label="Message"
        error={errorFor("message")}
        className="md:col-span-2"
      >
        <Textarea
          id="contact-message"
          rows={4}
          className={cn(fieldClass, "min-h-28 resize-y")}
          {...ariaFor("message")}
          {...register("message")}
        />
      </FormField>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Ne pas remplir ce champ</label>
        <input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="md:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-ink"
            {...ariaFor("consent")}
            {...register("consent")}
          />
          <label htmlFor="contact-consent" className="text-sm text-stone">
            J'accepte que Maison Vérane utilise ces informations pour répondre à
            ma demande. Elles ne sont ni cédées ni utilisées à d'autres fins.
          </label>
        </div>
        <p
          id="contact-consent-error"
          className="mt-1 min-h-5 text-sm text-destructive"
        >
          {errorFor("consent")}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 md:col-span-2">
        {state.status === "error" ? (
          <p role="alert" className="text-sm text-destructive">
            {state.message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="eyebrow bg-ink px-10 py-5 text-ivory transition-colors duration-300 hover:bg-bronze-deep disabled:opacity-60"
        >
          {pending ? "Envoi en cours…" : "Envoyer ma demande"}
        </button>
      </div>
    </form>
  );
}

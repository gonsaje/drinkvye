"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string>;

const maxFileSizeBytes = 10 * 1024 * 1024;
const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

const inputClassName =
  "min-h-12 rounded-2xl border border-palm-green/12 bg-white px-4 font-normal text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink";
const fileInputClassName =
  "rounded-2xl border border-dashed border-palm-green/20 bg-white px-4 py-4 text-sm font-semibold text-near-black file:mr-4 file:rounded-xl file:border-0 file:bg-palm-green file:px-4 file:py-2 file:text-sm file:font-black file:text-white hover:file:bg-palm-green/90 focus:border-vye-pink focus:outline-none";
const requiredFieldNames = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "businessAddress",
  "resaleCertificate",
];

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-vye-pink">
      *
    </span>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-sm font-bold text-vye-pink">
      {message}
    </p>
  );
}

function getFileError(file: File | null, required: boolean) {
  if (!file || file.size === 0) {
    return required ? "Please upload this document." : "";
  }

  if (!allowedFileTypes.includes(file.type)) {
    return "Please upload a PDF, JPG, or PNG file.";
  }

  if (file.size > maxFileSizeBytes) {
    return "File must be 10MB or smaller.";
  }

  return "";
}

export function WholesaleForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const errors: FieldErrors = {};

    requiredFieldNames.forEach((field) => {
      if (field === "resaleCertificate") return;

      const value = formData.get(field);

      if (typeof value !== "string" || !value.trim()) {
        errors[field] = "This field is required.";
      }
    });

    const email = String(formData.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    const website = String(formData.get("website") ?? "").trim();
    if (website) {
      try {
        new URL(website);
      } catch {
        errors.website = "Please enter a full URL, including https://.";
      }
    }

    const resaleCertificate = formData.get("resaleCertificate");
    const businessLicense = formData.get("businessLicense");
    const resaleCertificateError = getFileError(
      resaleCertificate instanceof File ? resaleCertificate : null,
      true,
    );
    const businessLicenseError = getFileError(
      businessLicense instanceof File ? businessLicense : null,
      false,
    );

    if (resaleCertificateError) {
      errors.resaleCertificate = resaleCertificateError;
    }

    if (businessLicenseError) {
      errors.businessLicense = businessLicenseError;
    }

    return errors;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;
    const error = getFileError(
      file,
      event.currentTarget.name === "resaleCertificate",
    );

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [event.currentTarget.name]: error,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const errors = validateForm(form);

    if (Object.values(errors).some(Boolean)) {
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields before submitting.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/wholesale", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit your application.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your application.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-palm-green/10 bg-coconut-cream p-5 shadow-[0_20px_60px_rgba(31,41,51,0.09)] sm:p-8"
    >
      <label className="hidden" aria-hidden="true" htmlFor="wholesale-company">
        Company
        <input
          id="wholesale-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <fieldset>
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
          Business information
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            <span>
              Business Name <RequiredMark />
            </span>
            <input
              name="businessName"
              required
              autoComplete="organization"
              aria-invalid={Boolean(fieldErrors.businessName)}
              aria-describedby="businessName-error"
              className={inputClassName}
            />
            <ErrorText id="businessName-error" message={fieldErrors.businessName} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            <span>
              Contact Name <RequiredMark />
            </span>
            <input
              name="contactName"
              required
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.contactName)}
              aria-describedby="contactName-error"
              className={inputClassName}
            />
            <ErrorText id="contactName-error" message={fieldErrors.contactName} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            <span>
              Email Address <RequiredMark />
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby="email-error"
              className={inputClassName}
            />
            <ErrorText id="email-error" message={fieldErrors.email} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            <span>
              Phone Number <RequiredMark />
            </span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby="phone-error"
              className={inputClassName}
            />
            <ErrorText id="phone-error" message={fieldErrors.phone} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green sm:col-span-2">
            <span>
              Business Address <RequiredMark />
            </span>
            <input
              name="businessAddress"
              required
              autoComplete="street-address"
              aria-invalid={Boolean(fieldErrors.businessAddress)}
              aria-describedby="businessAddress-error"
              className={inputClassName}
            />
            <ErrorText
              id="businessAddress-error"
              message={fieldErrors.businessAddress}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Website
            <input
              name="website"
              type="url"
              inputMode="url"
              placeholder="https://"
              aria-invalid={Boolean(fieldErrors.website)}
              aria-describedby="website-error"
              className={inputClassName}
            />
            <ErrorText id="website-error" message={fieldErrors.website} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Number of Locations
            <input
              name="locations"
              type="number"
              min="1"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green sm:col-span-2">
            Estimated Monthly Order Volume
            <input
              name="estimatedVolume"
              placeholder="For example: 20 cases per month"
              className={inputClassName}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-9 border-t border-palm-green/10 pt-8">
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
          Document uploads
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            <span>
              Resale Certificate <RequiredMark />
            </span>
            <input
              name="resaleCertificate"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              required
              aria-invalid={Boolean(fieldErrors.resaleCertificate)}
              aria-describedby="resaleCertificate-help resaleCertificate-error"
              className={fileInputClassName}
              onChange={handleFileChange}
            />
            <span
              id="resaleCertificate-help"
              className="text-xs font-semibold text-near-black/55"
            >
              PDF, JPG, or PNG only. 10MB max.
            </span>
            <ErrorText
              id="resaleCertificate-error"
              message={fieldErrors.resaleCertificate}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Business License
            <input
              name="businessLicense"
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              aria-invalid={Boolean(fieldErrors.businessLicense)}
              aria-describedby="businessLicense-help businessLicense-error"
              className={fileInputClassName}
              onChange={handleFileChange}
            />
            <span
              id="businessLicense-help"
              className="text-xs font-semibold text-near-black/55"
            >
              Optional. PDF, JPG, or PNG only. 10MB max.
            </span>
            <ErrorText
              id="businessLicense-error"
              message={fieldErrors.businessLicense}
            />
          </label>
        </div>
      </fieldset>

      <label className="mt-9 grid gap-2 border-t border-palm-green/10 pt-8 text-sm font-bold text-palm-green">
        Message / Additional Information
        <textarea
          name="message"
          placeholder="Where would you like to carry Vye, and what makes it a fit for your customers?"
          className="min-h-36 resize-y rounded-2xl border border-palm-green/12 bg-white px-4 py-3 font-normal text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink"
        />
      </label>

      {status === "success" ? (
        <p className="mt-6 rounded-2xl bg-palm-green/10 px-4 py-4 text-sm font-bold text-palm-green">
          Thanks for your interest in Vye. Your wholesale application has been
          sent, and our team will follow up by email.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-6 rounded-2xl bg-vye-pink/10 px-4 py-4 text-sm font-bold text-vye-pink">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-vye-pink px-7 text-sm font-black text-white shadow-[0_16px_34px_rgba(243,111,152,0.2)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink disabled:cursor-not-allowed disabled:opacity-55"
      >
        {status === "submitting"
          ? "Submitting Application..."
          : "Apply For Wholesale"}
      </button>
    </form>
  );
}

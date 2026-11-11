import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./contact-form";

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Nom"), "Claire Martin");
  await user.type(screen.getByLabelText("E-mail"), "claire@example.com");
  await user.selectOptions(screen.getByLabelText("Ville concernée"), "paris");
  await user.selectOptions(screen.getByLabelText("Votre projet"), "acheter");
  await user.type(
    screen.getByLabelText("Message"),
    "Je recherche un appartement familial avec terrasse.",
  );
  await user.click(screen.getByRole("checkbox"));
};

describe("ContactForm", () => {
  it("shows field errors and does not submit an incomplete form", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(
      screen.getByRole("button", { name: "Envoyer ma demande" }),
    );
    expect(await screen.findByText("Indiquez votre nom.")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(
      screen.getByText("Votre consentement est nécessaire."),
    ).toBeInTheDocument();
    expect(screen.queryByText(/votre demande a bien été reçue/)).toBeNull();
  });

  it("confirms a valid request", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillValidForm(user);
    await user.click(
      screen.getByRole("button", { name: "Envoyer ma demande" }),
    );
    expect(
      await screen.findByText(/votre demande a bien été reçue/),
    ).toBeInTheDocument();
  });

  it("prefills the request when it concerns a bien", async () => {
    const user = userEvent.setup();
    render(
      <ContactForm
        subject={{
          id: "lyon-6-tete-d-or",
          title: "Appartement de réception sur le parc",
          city: "lyon",
        }}
      />,
    );
    expect(
      screen.getByText("Appartement de réception sur le parc"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Ville concernée")).toHaveValue("lyon");
    expect(screen.getByLabelText("Votre projet")).toHaveValue("acheter");
    expect(screen.getByLabelText("Message")).toHaveValue(
      "Je souhaite organiser une visite du bien « Appartement de réception sur le parc ».",
    );
    expect(document.querySelector('input[name="propertyId"]')).toHaveValue(
      "lyon-6-tete-d-or",
    );

    await user.type(screen.getByLabelText("Nom"), "Claire Martin");
    await user.type(screen.getByLabelText("E-mail"), "claire@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(
      screen.getByRole("button", { name: "Envoyer ma demande" }),
    );
    expect(
      await screen.findByText(/votre demande a bien été reçue/),
    ).toBeInTheDocument();
  });

  it("hides the honeypot from people and assistive technologies", () => {
    render(<ContactForm />);
    const honeypot = document.querySelector('input[name="website"]');
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest("[aria-hidden='true']")).not.toBeNull();
  });
});

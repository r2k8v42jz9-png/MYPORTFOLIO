import ContactContent from "@/components/sections/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactContent />;
}

import Image from "next/image";
import { EXTERNAL_LINKS } from "../constants";

export function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <FooterLink href={EXTERNAL_LINKS.LEARN} icon="/file.svg" text="Learn" />
      <FooterLink href={EXTERNAL_LINKS.TEMPLATES} icon="/window.svg" text="Examples" />
      <FooterLink href={EXTERNAL_LINKS.NEXTJS} icon="/globe.svg" text="Go to nextjs.org →" />
    </footer>
  );
}

function FooterLink({ href, icon, text }: { href: string; icon: string; text: string }) {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src={icon}
        alt={`${text} icon`}
        width={16}
        height={16}
      />
      {text}
    </a>
  );
} 
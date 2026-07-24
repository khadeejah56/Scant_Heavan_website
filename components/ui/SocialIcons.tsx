import { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M15 4h-2.5A3.5 3.5 0 0 0 9 7.5V10H6.5v3H9v7h3v-7h2.5l.5-3H12V7.8c0-.7.4-1.1 1.1-1.1H15V4Z" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M4 4l7.2 9.2L4.3 20h2l6-6.5 4.7 6.5H20l-7.5-9.7L19.4 4h-2l-5.5 6-4.3-6H4Z" />
    </svg>
  );
}

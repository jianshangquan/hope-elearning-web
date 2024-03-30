import Link from "next/link";

export default function Footer() {
  const copyRight = `© ${new Date().getFullYear()} ${
    process.env.NEXT_PUBLIC_APP_NAME
  }`;

  return (
    <footer className="">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t py-6">
          <div className="flex order-2 md:order-1 justify-center md:justify-start">
            <div className="text-medium text-nowrap">{copyRight}</div>
          </div>
          <div className="flex order-1 md:order-2 justify-center md:justify-end text-small gap-4">
            <Link href="/privacy-policy" className="underline">
              Privacy
            </Link>
            <Link href="/terms-and-conditions" className="underline">
              Terms
            </Link>
            <Link href="/about-us" className="underline">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

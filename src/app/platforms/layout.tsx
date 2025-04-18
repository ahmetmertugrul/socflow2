import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SocFlow - Platform Login",
  description: "Connect your social media accounts to SocFlow",
};

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}

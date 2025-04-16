import { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { ContentEditor } from "@/components/content-creator/editor";

export const metadata: Metadata = {
  title: "Create Content - SocFlow",
  description: "Create and schedule social media content",
};

export default function CreateContentPage() {
  return (
    <MainLayout>
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <ContentEditor />
      </div>
    </MainLayout>
  );
}

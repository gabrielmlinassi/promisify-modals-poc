"use client";

const AgreementModal = dynamic(
  () => import("@/components/modals/AgreementModal"),
  { ssr: false }
);

const ConfirmationModal = dynamic(
  () => import("@/components/modals/ConfirmationModal"),
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModals } from "@/contexts/Modals";
import { useAgreementModal } from "@/hooks/useAgreementModal";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";
import { ArrowRight, CheckCircle2, Globe2, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback } from "react";

const isCanceled = (status: string) => status === "canceled";

export default function Home() {
  const modals = useModals();

  const agreementModal = useAgreementModal();
  const confirmationModal = useConfirmationModal();

  const handleClick1 = useCallback(async () => {
    const statusConfirmationModal = await modals.showConfirmationModal();
    if (statusConfirmationModal === "confirmed") {
      alert("Confirmed!");
    } else if (statusConfirmationModal === "canceled") {
      alert("Canceled!");
      return;
    } else {
      alert("Unknown");
      return;
    }
    const statusAgreementModal = await modals.showAgreementModal();
    if (statusAgreementModal === "agreed") {
      alert("agreed!");
    } else if (statusAgreementModal === "canceled") {
      alert("Canceled!");
    } else {
      alert("Unknown");
    }
  }, [modals]);

  const handleClick2 = useCallback(async () => {
    if (await confirmationModal.open().then(isCanceled)) return;
    if (await agreementModal.open().then(isCanceled)) return;
    alert("User has Confirmed and Agreed!");
  }, [confirmationModal, agreementModal]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-blue-500 text">
              Build beautiful web experiences
              <span className="text-primary"> faster</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              A modern tech stack with Next.js, Tailwind CSS, and Radix UI for
              building production-ready applications.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" onClick={handleClick1}>
                Open Modals from Context
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleClick2}>
                Open Modals without Context
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on Next.js for optimal performance and SEO out of the box.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Globe2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Stack</h3>
              <p className="text-muted-foreground">
                Leverage the power of Tailwind CSS and Radix UI components.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Production Ready</h3>
              <p className="text-muted-foreground">
                Enterprise-grade components built for scalability.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {agreementModal.props.open && (
        <AgreementModal {...agreementModal.props} />
      )}

      {confirmationModal.props.open && (
        <ConfirmationModal {...confirmationModal.props} />
      )}
    </>
  );
}

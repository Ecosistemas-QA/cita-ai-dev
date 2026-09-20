import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { UpgradeBanner } from "@/components/dashboard/UpgradeBanner";
import { createClient } from "@/lib/supabase/server";
import { getPlanStatus } from "@/lib/business/plan-status";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let showBanner = false;
  if (user) {
    const status = await getPlanStatus(user.id);
    showBanner = status.isLimitReached;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-7xl p-6 lg:p-8 space-y-6">
        {showBanner && <UpgradeBanner />}
        {children}
      </main>
    </div>
  );
}

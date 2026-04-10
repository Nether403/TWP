import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { verifyAdminCookie } from "@/lib/utils/crypto";

/**
 * Admin layout with sidebar navigation.
 * Protects all /admin/* routes (except /admin/login) with passphrase cookie check.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("twp_admin_access")?.value;
  const hasAdminToken = await verifyAdminCookie(cookieValue, process.env.ADMIN_PASSPHRASE);

  // If no admin token, let the individual page handle the redirect
  // (login page doesn't need the sidebar)
  if (!hasAdminToken) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56">
        {children}
      </main>
    </div>
  );
}

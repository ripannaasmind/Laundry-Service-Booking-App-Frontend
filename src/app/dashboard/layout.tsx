export default function DashboardAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No auth check - just render dashboard
  return <>{children}</>;
}

import { redirect } from 'next/navigation';

const DashboardPage = () => {
  redirect('/dashboard/orders');
};

export default DashboardPage;

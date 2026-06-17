import { listAll } from '@/lib/db';
import { site } from '@/config/site';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const invitations = await listAll();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-gray-100">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-1">{invitations.length} invitation{invitations.length !== 1 ? 's' : ''}</p>
        </div>
        <a
          href="/admin/new"
          className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-gray-100 hover:bg-gray-600 transition-colors"
        >
          + Nouvelle invitation
        </a>
      </div>

      <DashboardClient invitations={invitations} siteUrl={site.url} />
    </div>
  );
}

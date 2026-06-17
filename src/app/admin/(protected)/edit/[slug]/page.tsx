import { findInvitation } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params: { slug } }: { params: { slug: string } }) {
  const inv = await findInvitation(slug);
  if (!inv) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <a href="/admin/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Dashboard
        </a>
        <h1 className="text-2xl font-light tracking-wide text-gray-100 mt-2">Modifier l'invitation</h1>
        <p className="text-sm text-gray-500 mt-1">{inv.data.bride} &amp; {inv.data.groom}</p>
      </div>
      <EditForm invitation={inv} />
    </div>
  );
}

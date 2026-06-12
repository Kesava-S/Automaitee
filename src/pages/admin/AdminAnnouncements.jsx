import { useState } from 'react';
import { Megaphone, CheckCircle, Trash2, Radio } from 'lucide-react';
import Button    from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

export default function AdminAnnouncements({ announcements, onUpdateAnnouncements }) {
  const [title,      setTitle]      = useState('');
  const [content,    setContent]    = useState('');
  const [saving,     setSaving]     = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);

    const newAnn = {
      id:      `ann-${Date.now()}`,
      title:   title.trim(),
      content: content.trim(),
      date:    new Date().toISOString().split('T')[0],
    };

    await onUpdateAnnouncements([newAnn, ...announcements]);
    setSaving(false);
    setTitle('');
    setContent('');
    triggerSuccess(`Published: "${newAnn.title}"`);
  };

  const handleDelete = async (id) => {
    await onUpdateAnnouncements(announcements.filter(ann => ann.id !== id));
    triggerSuccess('Announcement deleted.');
  };

  return (
    <div className="space-y-5 lg:space-y-7 max-w-4xl">

      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Broadcast Announcements</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Publish updates that appear instantly on all client dashboards.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" strokeWidth={2} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">

        {/* New Announcement Form */}
        <div className="bg-white rounded-xl lg:rounded-2xl border border-slate-200 shadow-sm p-5 lg:p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <Megaphone className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <h2 className="text-sm font-bold text-slate-900">New Announcement</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ann-title" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Title</label>
              <input
                id="ann-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled Platform Upgrade"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label htmlFor="ann-body" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Body</label>
              <textarea
                id="ann-body"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the announcement details here..."
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={saving}
              iconLeft={<Radio className="h-4 w-4" strokeWidth={2} />}
            >
              Publish Announcement
            </Button>
          </form>
        </div>

        {/* Active Broadcasts */}
        <div className="md:col-span-2 bg-white rounded-xl lg:rounded-2xl border border-slate-200 shadow-sm p-5 lg:p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-bold text-slate-900">Active Broadcasts</h2>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {announcements.length}
            </span>
          </div>

          {announcements.length === 0 ? (
            <EmptyState
              icon={Megaphone}
              title="No announcements posted."
              desc="Use the form to publish your first broadcast."
              compact
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 group">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(ann.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
                  </div>
                  <Button
                    variant="danger-ghost"
                    size="xs"
                    iconLeft={<Trash2 className="h-3.5 w-3.5" strokeWidth={2} />}
                    onClick={() => handleDelete(ann.id)}
                    className="flex-shrink-0 opacity-60 group-hover:opacity-100"
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

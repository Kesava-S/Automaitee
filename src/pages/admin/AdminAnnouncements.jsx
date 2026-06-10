import { useState } from 'react';

export default function AdminAnnouncements({ announcements, onUpdateAnnouncements }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    const updated = [newAnn, ...announcements];
    onUpdateAnnouncements(updated);

    setTitle('');
    setContent('');
    triggerSuccess(`Published announcement: "${title.trim()}"`);
  };

  const handleDelete = (id) => {
    const updated = announcements.filter(ann => ann.id !== id);
    onUpdateAnnouncements(updated);
    triggerSuccess('Announcement deleted.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Broadcast Announcements</h1>
        <p className="text-slate-500 mt-1">Publish global announcements that will render instantly on all clients' dashboards.</p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold animate-fadeIn">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Form Column */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">New Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="ann-title" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
              <input
                id="ann-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled Platform Upgrade"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label htmlFor="ann-body" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message Body</label>
              <textarea
                id="ann-body"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the announcement details here..."
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Publish Announcement
            </button>
          </form>
        </div>

        {/* Listings Column */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Active Broadcasts ({announcements.length})</h2>
          
          {announcements.length === 0 ? (
            <p className="text-sm text-slate-500 italic py-6 text-center">No active announcements posted.</p>
          ) : (
            <div className="divide-y divide-slate-150">
              {announcements.map((ann) => (
                <div key={ann.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between space-x-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                      <span className="text-xs text-slate-400 font-semibold">{ann.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1.5 rounded transition-all shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

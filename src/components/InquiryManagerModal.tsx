import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Mail, 
  MessageSquare, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Filter, 
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Building,
  DollarSign
} from 'lucide-react';
import { ClientInquiry } from '../types/inquiry';

interface InquiryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: ClientInquiry[];
  onRefresh: () => void;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onDeleteInquiry: (id: string) => Promise<void>;
}

export const InquiryManagerModal: React.FC<InquiryManagerModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onRefresh,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteInquiry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen) return null;

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const handleSelectInquiry = (inq: ClientInquiry) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsSavingNotes(true);
    await onUpdateNotes(selectedInquiry.id, editingNotes);
    setIsSavingNotes(false);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.businessName && inq.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.projectType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">New Inquiry</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">Contacted</span>;
      case 'proposal_sent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">Proposal Sent</span>;
      case 'reviewed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">Reviewed</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-700 text-slate-300">Archived</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl h-[90vh] bg-[#0b0f17] border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                  Client Inquiries Manager
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {inquiries.length} Total
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mikky Digitalz inquiry inbox • Secured via anti-spam honeypot & rate limiter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleRefreshClick}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Refresh list"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            <a
              href="/api/inquiries-export.csv"
              download
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
              title="Download inquiries as CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/70 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by client, email, ref #..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['all', 'new', 'contacted', 'proposal_sent', 'reviewed', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Split view (List on left, Detail on right) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Inquiry List (Left Pane) */}
          <div className="w-full md:w-5/12 lg:w-4/12 border-b md:border-b-0 md:border-r border-slate-800 overflow-y-auto p-3 space-y-2.5">
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No inquiries match your filter.
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                const formattedDate = new Date(inq.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={inq.id}
                    onClick={() => handleSelectInquiry(inq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-cyan-400">
                        {inq.id}
                      </span>
                      {getStatusBadge(inq.status)}
                    </div>

                    <h4 className="text-sm font-bold text-white truncate">
                      {inq.fullName}
                    </h4>

                    {inq.businessName && (
                      <p className="text-xs text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-500" />
                        <span>{inq.businessName}</span>
                      </p>
                    )}

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="text-cyan-300 font-medium truncate max-w-[140px]">
                        {inq.projectType}
                      </span>
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Inquiry Detail View (Right Pane) */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-950/40">
            {selectedInquiry ? (
              <div className="space-y-6 max-w-2xl">
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-cyan-400">
                        {selectedInquiry.id}
                      </span>
                      {getStatusBadge(selectedInquiry.status)}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {selectedInquiry.fullName}
                    </h3>
                    {selectedInquiry.businessName && (
                      <p className="text-xs text-cyan-300">
                        {selectedInquiry.businessName}
                      </p>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Status:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => {
                        const newStat = e.target.value;
                        onUpdateStatus(selectedInquiry.id, newStat);
                        setSelectedInquiry({ ...selectedInquiry, status: newStat as any });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Quick Contact Action Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                      `Mikky Digitalz — Scoped Proposal for ${selectedInquiry.projectType} [${selectedInquiry.id}]`
                    )}&body=${encodeURIComponent(
                      `Hi ${selectedInquiry.fullName},\n\nThank you for reaching out via Mikky Digitalz regarding your ${selectedInquiry.projectType} project.\n\nI have reviewed your requirements and would love to share a clear milestone plan and timeline...\n\nBest regards,\nMitchell Adetayo (Mikky Digitalz)\nWhatsApp: +234 9024877275\n`
                    )}`}
                    className="p-3 rounded-2xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>Send Email Reply</span>
                  </a>

                  {selectedInquiry.phone ? (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${selectedInquiry.fullName}, Mitchell here from Mikky Digitalz regarding your inquiry (${selectedInquiry.id}) for ${selectedInquiry.projectType}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Client</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-500 text-xs flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>No phone provided</span>
                    </div>
                  )}
                </div>

                {/* Project Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Project Type</span>
                    <span className="font-semibold text-white">{selectedInquiry.projectType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Budget</span>
                    <span className="font-semibold text-emerald-400">{selectedInquiry.budgetRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Timeline</span>
                    <span className="font-semibold text-white">{selectedInquiry.timeline}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Contact Pref</span>
                    <span className="font-semibold text-cyan-300 uppercase">{selectedInquiry.preferredContact}</span>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Client Project Brief
                  </h4>
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Internal Notes Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Private Notes (Mitchell only)
                    </h4>
                    <button
                      onClick={handleSaveNotes}
                      disabled={isSavingNotes}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
                    >
                      {isSavingNotes ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Add private project notes, call summaries, or custom estimates here..."
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Security Audit Badge */}
                {selectedInquiry.securityMeta && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Anti-Spam Verified Human ({selectedInquiry.securityMeta.submissionDurationSeconds}s interaction)
                    </span>
                    <span>Received: {new Date(selectedInquiry.timestamp).toLocaleString()}</span>
                  </div>
                )}

                {/* Delete button */}
                <div className="pt-4 border-t border-slate-800/80 flex justify-end">
                  <button
                    onClick={async () => {
                      if (confirm(`Are you sure you want to delete inquiry ${selectedInquiry.id}?`)) {
                        await onDeleteInquiry(selectedInquiry.id);
                        setSelectedInquiry(null);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Inquiry</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                <ShieldCheck className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-sm font-semibold text-slate-400">Select an inquiry to view details</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  You can inspect the client's brief, reply directly via email or WhatsApp, update status, and manage notes.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

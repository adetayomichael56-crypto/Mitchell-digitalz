/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Preloader } from './components/Preloader';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { WorkPage } from './components/WorkPage';
import { PricingPage } from './components/PricingPage';
import { BlogPage } from './components/BlogPage';
import { Footer } from './components/Footer';
import { ContactDrawer } from './components/ContactDrawer';
import { ProjectModal } from './components/ProjectModal';
import { CalendlyModal } from './components/CalendlyModal';
import { WhatsAppChatbot } from './components/WhatsAppChatbot';
import { InquiryManagerModal } from './components/InquiryManagerModal';
import { SeoAuditModal } from './components/SeoAuditModal';
import { ProjectItem } from './data/siteData';
import { ClientInquiry } from './types/inquiry';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | undefined>(undefined);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  // Modals state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isSeoAuditOpen, setIsSeoAuditOpen] = useState(false);

  // Inquiries collection state
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize routing with clean paths (/blog/:slug, /blog, /services, etc.) and fallback hash (#/...)
  useEffect(() => {
    const handleLocationChange = () => {
      // 1. Check clean pathname
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const hash = window.location.hash.replace(/^#\/?/, '').trim();

      if (path.startsWith('blog/')) {
        const slug = path.replace(/^blog\//, '').trim();
        setCurrentPage('blog');
        setCurrentBlogSlug(slug);
        return;
      } else if (path === 'blog') {
        setCurrentPage('blog');
        setCurrentBlogSlug(undefined);
        return;
      } else if (['home', 'services', 'work', 'pricing'].includes(path)) {
        setCurrentPage(path);
        setCurrentBlogSlug(undefined);
        return;
      }

      // 2. Check hash fallback
      if (hash.startsWith('blog/')) {
        const slug = hash.replace(/^blog\//, '').trim();
        setCurrentPage('blog');
        setCurrentBlogSlug(slug);
        return;
      } else if (hash === 'blog') {
        setCurrentPage('blog');
        setCurrentBlogSlug(undefined);
        return;
      } else if (['home', 'services', 'work', 'pricing'].includes(hash)) {
        setCurrentPage(hash);
        setCurrentBlogSlug(undefined);
        return;
      }

      // Default home
      setCurrentPage('home');
      setCurrentBlogSlug(undefined);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Fetch inquiries from backend
  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.warn('Backend fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const navigateTo = (page: string, slug?: string) => {
    setCurrentPage(page);
    let targetPath = '/';
    let targetHash = '#/home';

    if (page === 'blog' && slug) {
      setCurrentBlogSlug(slug);
      targetPath = `/blog/${slug}`;
      targetHash = `#/blog/${slug}`;
    } else if (page === 'blog') {
      setCurrentBlogSlug(undefined);
      targetPath = '/blog';
      targetHash = '#/blog';
    } else if (page === 'home') {
      setCurrentBlogSlug(undefined);
      targetPath = '/';
      targetHash = '#/home';
    } else {
      setCurrentBlogSlug(undefined);
      targetPath = `/${page}`;
      targetHash = `#/${page}`;
    }

    try {
      window.history.pushState(null, '', targetPath);
    } catch {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContact = (service?: string) => {
    setPreselectedService(service || '');
    setIsContactOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInquirySubmitted = (newInq: ClientInquiry) => {
    setInquiries((prev) => [newInq, ...prev]);
    showToast(`Inquiry #${newInq.id} securely received!`);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
        showToast(`Status changed to ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, notes } : i))
        );
        showToast('Private notes saved');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        showToast('Inquiry removed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070612] text-[#f1f5f9] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-[100] p-4 rounded-2xl bg-[#13102b]/95 border border-purple-500/50 text-white shadow-2xl shadow-purple-950/50 backdrop-blur-md flex items-center gap-3 text-xs max-w-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Preloader on first visit to home */}
      {showPreloader && !preloaderDone && currentPage === 'home' && (
        <Preloader
          onComplete={() => {
            setShowPreloader(false);
            setPreloaderDone(true);
          }}
        />
      )}

      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenContact={() => handleOpenContact()}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onOpenInbox={() => setIsInboxOpen(true)}
        inquiryCount={inquiries.filter((i) => i.status === 'new').length}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenContact={handleOpenContact}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onOpenContact={handleOpenContact}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentPage === 'work' && (
          <WorkPage
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onOpenContact={handleOpenContact}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onNavigate={navigateTo}
            onOpenContact={handleOpenContact}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            currentSlug={currentBlogSlug}
            onSelectPost={(slug) => navigateTo('blog', slug)}
            onBackToIndex={() => navigateTo('blog')}
            onOpenContact={handleOpenContact}
            onOpenCalendly={() => setIsCalendlyOpen(true)}
            onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
            onNavigate={navigateTo}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenContact={() => handleOpenContact()}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
      />

      {/* Secure Contact / Inquiry Drawer */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preselectedService={preselectedService}
        onInquirySubmitted={handleInquirySubmitted}
      />

      {/* Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(srv) => handleOpenContact(srv)}
      />

      {/* Calendly Video Meeting Modal */}
      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />

      {/* WhatsApp Interactive Assistant Floating Widget */}
      <WhatsAppChatbot />

      {/* Client Inquiry Management Portal Modal */}
      <InquiryManagerModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        inquiries={inquiries}
        onRefresh={fetchInquiries}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onDeleteInquiry={handleDeleteInquiry}
      />

      {/* Google Indexing & SEO Architecture Audit Modal */}
      <SeoAuditModal
        isOpen={isSeoAuditOpen}
        onClose={() => setIsSeoAuditOpen(false)}
        onOpenContact={handleOpenContact}
      />

    </div>
  );
}

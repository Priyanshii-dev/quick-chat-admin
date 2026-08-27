"use client";

import React, { useEffect, useState } from "react";
import { contactService } from "../services/contact.service";
import { ContactInquiry } from "../types/contact.types";
import { getContactColumns } from "./contact-columns";
import { GlobalTable } from "@/components/table/global-table";
import { useContactStore } from "../store/contact.store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MessageSquare, Send, X } from "lucide-react";

export function ContactListTable() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState<ContactInquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const { searchQuery, setSearchQuery, selectedStatus, setSelectedStatus } =
    useContactStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await contactService.getInquiries();
      setInquiries(data);
    } catch (err) {
      toast.error("Failed to load contact inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await contactService.deleteInquiry(id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    toast.success("Inquiry deleted");
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !activeInquiry) return;
    try {
      setSendingReply(true);
      await contactService.updateStatus(activeInquiry.id, "Replied");
      setInquiries((prev) =>
        prev.map((i) => (i.id === activeInquiry.id ? { ...i, status: "Replied" } : i))
      );
      toast.success(`Reply sent to ${activeInquiry.email}!`);
      setActiveInquiry(null);
      setReplyText("");
    } catch (err) {
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !selectedStatus || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const columns = getContactColumns(setActiveInquiry, handleDelete);

  const statusOptions = [
    { label: "New", value: "New" },
    { label: "Replied", value: "Replied" },
    { label: "Closed", value: "Closed" },
  ];

  return (
    <div className="space-y-4">
      <GlobalTable
        icon={<MessageSquare className="h-5 w-5" />}
        title="Contact Us Inquiries"
        description="View and reply to messages submitted by users and potential partners."
        breadcrumbs={[{ label: "Support" }, { label: "Contact Us" }]}
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search sender, email, or subject..."
        showStatusFilter={true}
        statusValue={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusOptions={statusOptions}
        secondaryAction={{
          label: "Refresh",
          onClick: fetchData,
        }}
        columns={columns}
        data={filteredInquiries}
        loading={loading}
        emptyMessage="No contact inquiries received."
      />

      {/* Inquiry Detail & Reply Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Inquiry Details</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveInquiry(null)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-background p-4 text-xs">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">From:</span>
                <span className="text-muted-foreground">{activeInquiry.name} ({activeInquiry.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Subject:</span>
                <span className="text-primary font-medium">{activeInquiry.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Date:</span>
                <span className="text-muted-foreground">{activeInquiry.createdAt}</span>
              </div>
              <div className="border-t border-border pt-2">
                <span className="font-semibold text-foreground block mb-1">Message:</span>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {activeInquiry.message}
                </p>
              </div>
            </div>

            {/* Quick Reply Form */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Send Reply via Email
              </label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response to the user..."
                rows={3}
                className="bg-background text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
              <Button variant="outline" onClick={() => setActiveInquiry(null)}>
                Close
              </Button>
              <Button
                onClick={handleSendReply}
                disabled={sendingReply || !replyText.trim()}
                className="gap-2 bg-primary text-primary-foreground font-semibold"
              >
                <Send className="h-3.5 w-3.5" />
                {sendingReply ? "Sending..." : "Send Reply"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

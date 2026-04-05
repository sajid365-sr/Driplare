"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { upsertClientApiKey } from "@/lib/api-key-actions";

export default function ApiKeysTable({ initialKeys }: { initialKeys: any[] }) {
  const [keys, setKeys] = useState(initialKeys);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", provider: "openai", rawKey: "" });

  async function handleSave() {
    if (!form.email || !form.rawKey) return;
    setLoading(true);
    const res = await upsertClientApiKey({
      email: form.email,
      provider: form.provider,
      rawKey: form.rawKey,
    });
    setLoading(false);
    if (res.success) {
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-row">
        <CardTitle>Client API Keys</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Add Key</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Client API Key</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3">
              <Input placeholder="Client email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Provider (openai)" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} />
              <Input placeholder="API key" value={form.rawKey} onChange={(e) => setForm({ ...form, rawKey: e.target.value })} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {keys.length === 0 ? (
          <p className="text-sm text-muted-foreground">No API keys yet.</p>
        ) : (
          <div className="space-y-3">
            {keys.map((k: any) => (
              <div key={k.id} className="flex items-center justify-between border rounded-xl p-4">
                <div>
                  <div className="font-semibold">{k.user?.email ?? "Unknown"}</div>
                  <div className="text-xs text-muted-foreground">Provider: {k.provider}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">****{k.keyLast4}</div>
                  <div className="text-xs text-muted-foreground">{k.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

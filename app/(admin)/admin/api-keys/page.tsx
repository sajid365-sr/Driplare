import { getAllClientApiKeys } from "@/lib/api-key-actions";
import ApiKeysTable from "@/components/admin/api-keys/ApiKeysTable";

export const metadata = {
  title: "API Keys | Driplare Admin",
  description: "Manage client API keys",
};

export default async function ApiKeysPage() {
  const res = await getAllClientApiKeys();
  const keys = res.success ? res.data : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Client API Keys</h1>
        <p className="text-muted-foreground">Store and manage client API keys securely</p>
      </div>
      <ApiKeysTable initialKeys={keys || []} />
    </div>
  );
}

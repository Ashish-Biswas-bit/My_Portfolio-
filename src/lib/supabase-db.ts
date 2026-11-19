import { supabase } from "./supabase";

type CollectionRef = { collectionName: string };
type DocumentRef = { collectionName: string; documentId: string };
type QueryRef = CollectionRef & { orderField?: string };

type SnapshotDocument = {
  id: string;
  data: () => Record<string, unknown>;
};

type Snapshot = {
  id?: string;
  docs: SnapshotDocument[];
  empty: boolean;
  exists: () => boolean;
  data: () => unknown;
};

function toSnapshot(rows: Array<{ document_id: string; data: Record<string, unknown> }>): Snapshot {
  const docs = rows.map((row) => ({
    id: row.document_id,
    data: () => row.data,
  }));
  return {
    id: docs[0]?.id,
    docs,
    empty: docs.length === 0,
    exists: () => docs.length > 0,
    data: () => docs[0]?.data(),
  };
}

async function read(ref: QueryRef | DocumentRef) {
  let request = supabase
    .from("portfolio_content")
    .select("document_id,data")
    .eq("collection_name", ref.collectionName);

  if ("documentId" in ref) {
    request = request.eq("document_id", ref.documentId);
  }

  const { data, error } = await request;
  if (error) throw error;
  const rows = (data ?? []) as Array<{
    document_id: string;
    data: Record<string, unknown>;
  }>;
  if ("orderField" in ref && ref.orderField) {
    rows.sort((a, b) =>
      String(a.data[ref.orderField!] ?? "").localeCompare(
        String(b.data[ref.orderField!] ?? ""),
        undefined,
        { numeric: true }
      )
    );
  }
  return toSnapshot(rows);
}

export const db = supabase;

export function collection(_db: typeof supabase, collectionName: string): CollectionRef {
  return { collectionName };
}

export function doc(
  _db: typeof supabase,
  collectionName: string,
  documentId: string
): DocumentRef {
  return { collectionName, documentId };
}

export function orderBy(field: string) {
  return { orderField: field };
}

export function query(ref: CollectionRef, ordering?: { orderField?: string }): QueryRef {
  return { ...ref, orderField: ordering?.orderField };
}

export async function getDoc(ref: DocumentRef) {
  return read(ref);
}

export async function getCountFromServer(ref: CollectionRef) {
  const { count, error } = await supabase
    .from("portfolio_content")
    .select("id", { count: "exact", head: true })
    .eq("collection_name", ref.collectionName);
  if (error) throw error;
  return { data: () => ({ count: count ?? 0 }) };
}

export async function setDoc(ref: DocumentRef, data: object) {
  const { error } = await supabase.from("portfolio_content").upsert(
    {
      collection_name: ref.collectionName,
      document_id: ref.documentId,
      data: data as Record<string, unknown>,
    },
    { onConflict: "collection_name,document_id" }
  );
  if (error) throw error;
}

export async function addDoc(
  ref: CollectionRef,
  data: object
) {
  const documentId = crypto.randomUUID();
  const { error } = await supabase.from("portfolio_content").insert({
    collection_name: ref.collectionName,
    document_id: documentId,
    data: data as Record<string, unknown>,
  });
  if (error) throw error;
  return { id: documentId };
}

export async function updateDoc(
  ref: DocumentRef,
  data: object
) {
  const current = await read(ref);
  const merged = {
    ...((current.data() as Record<string, unknown> | undefined) ?? {}),
    ...data,
  };
  await setDoc(ref, merged);
}

export async function deleteDoc(ref: DocumentRef) {
  const { error } = await supabase
    .from("portfolio_content")
    .delete()
    .eq("collection_name", ref.collectionName)
    .eq("document_id", ref.documentId);
  if (error) throw error;
}

export function onSnapshot(
  ref: QueryRef | DocumentRef,
  callback: (snapshot: Snapshot) => void,
  onError?: (error: Error) => void
) {
  let active = true;
  const load = async () => {
    try {
      const snapshot = await read(ref);
      if (active) callback(snapshot);
    } catch (error) {
      if (active) onError?.(error as Error);
    }
  };

  void load();
  const channel = supabase
    .channel(`portfolio-${ref.collectionName}-${Math.random()}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "portfolio_content" },
      (payload) => {
        const row = (payload.new || payload.old) as {
          collection_name?: string;
        };
        if (row.collection_name === ref.collectionName) void load();
      }
    )
    .subscribe();

  return () => {
    active = false;
    void supabase.removeChannel(channel);
  };
}

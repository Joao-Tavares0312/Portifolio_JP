import { cases } from "../../content";
import { CaseView } from "./CaseView";

export const dynamicParams = false;
export function generateStaticParams() {
  return cases.map((w) => ({ id: w.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaseView id={id} />;
}

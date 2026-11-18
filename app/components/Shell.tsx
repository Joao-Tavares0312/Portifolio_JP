"use client";

import { Field } from "./Field";
import { Smooth } from "./Smooth";
import { Preloader } from "./Preloader";
import { Outro } from "./Outro";
import { Nav } from "./Nav";
import { ProjectProvider } from "./ProjectModal";
import { LangProvider } from "./Lang";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <Preloader />
      <Smooth />
      <Field />
      <ProjectProvider>
        <Nav />
        <main className="main">{children}<Outro /></main>
      </ProjectProvider>
    </LangProvider>
  );
}

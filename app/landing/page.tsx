"use client";

import LandingPage from "@/components/landing/LandingPage";
import { ProjectsProvider } from "@/contexts/ProjectsContext";

export default function LandingRoute() {
  return (
    <ProjectsProvider>
      <LandingPage />
    </ProjectsProvider>
  );
}


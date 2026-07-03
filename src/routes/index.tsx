import { createFileRoute } from "@tanstack/react-router";
import { BackgroundDecorations } from "@/components/BackgroundDecorations";
import { Hero } from "@/components/Hero";
import { MusicToggle } from "@/components/MusicToggle";
import { HeartCursor } from "@/components/HeartCursor";
import { Loader } from "@/components/Loader";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Loader />
      <BackgroundDecorations />
      <Hero />
      <MusicToggle />
      <HeartCursor />
    </div>
  );
}

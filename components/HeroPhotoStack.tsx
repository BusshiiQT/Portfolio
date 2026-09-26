"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const photos = [
  { id: "portrait", src: "/images/hector-portrait.png", alt: "Hector Virrey, full-stack developer", label: "Feature professional portrait" },
  { id: "coding", src: "/images/hector-coding.png", alt: "Hector Virrey working on a laptop", label: "Feature coding photograph" },
] as const;

type PhotoId = (typeof photos)[number]["id"];
type Phase = "idle" | "extracting" | "depthSwap" | "settling";

export default function HeroPhotoStack() {
  const [front, setFront] = useState<PhotoId>("portrait");
  const [phase, setPhase] = useState<Phase>("idle");
  const selected = useRef<PhotoId | null>(null);
  const completed = useRef(new Set<PhotoId>());
  const instructionsId = useId();

  // A preference change during travel also finishes the swap immediately.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      if (!motion.matches || !selected.current) return;
      setFront(selected.current);
      selected.current = null;
      completed.current.clear();
      setPhase("idle");
    };
    motion.addEventListener("change", finish);
    return () => motion.removeEventListener("change", finish);
  }, []);

  useEffect(() => {
    if (phase !== "depthSwap") return;
    // Keep the separated pose through a paint before starting the return trip.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setPhase("settling"));
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  function swap(photo: PhotoId) {
    if (selected.current || photo === front) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFront(photo);
      return;
    }
    // Synchronous lock also guards multiple activations before React renders.
    selected.current = photo;
    completed.current.clear();
    setPhase("extracting");
  }

  function finishTravel(photo: PhotoId) {
    if (phase !== "extracting" && phase !== "settling") return;
    completed.current.add(photo);
    if (completed.current.size !== photos.length) return;
    completed.current.clear();
    if (phase === "extracting" && selected.current) {
      // Both transform transitions have ended: the card edges are separated.
      setFront(selected.current);
      setPhase("depthSwap");
    } else {
      selected.current = null;
      setPhase("idle");
    }
  }

  return (
    <div className="hero-visual hero-photo-stack" data-phase={phase} role="group" aria-label="Photographs of Hector Virrey" aria-describedby={instructionsId} aria-busy={phase !== "idle"}>
      <p id={instructionsId} className="sr-only">Select a photograph to bring it to the front.</p>
      {photos.map((photo) => (
        <button
          key={photo.id}
          type="button"
          className={`hero-photo hero-photo-${photo.id}`}
          data-front={front === photo.id}
          data-selected={selected.current === photo.id}
          aria-label={photo.label}
          aria-pressed={front === photo.id}
          aria-disabled={phase !== "idle"}
          onClick={() => swap(photo.id)}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "transform") {
              finishTravel(photo.id);
            }
          }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) min(76vw, 328px), (max-width: 1300px) 35vw, 416px" priority />
        </button>
      ))}
    </div>
  );
}

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

interface OgContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips?: string[];
}

const STAGES = ["Input", "Retrieval", "Agents", "Evaluation", "API", "Production"];

/** Shared social preview layout (rendered at build time). */
export function renderOgImage({ eyebrow, title, subtitle, chips = [] }: OgContent) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#080d18",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(34,211,238,0.22), transparent 45%), radial-gradient(circle at 85% 10%, rgba(129,140,248,0.16), transparent 40%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              border: "1.5px solid rgba(148,163,184,0.35)",
              background: "#0d1422",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#d5dde8" }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22d3ee",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: title.length > 40 ? 58 : 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#94a3b8",
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {(chips.length > 0 ? chips : STAGES).map((chip, index, all) => (
            <div key={chip} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(148,163,184,0.28)",
                  background: "rgba(13,20,34,0.9)",
                  fontSize: 18,
                  color: "#d5dde8",
                }}
              >
                {chip}
              </div>
              {chips.length === 0 && index < all.length - 1 && (
                <div style={{ display: "flex", width: 22, height: 2, background: "rgba(34,211,238,0.6)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}

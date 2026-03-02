import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

function ScoreCircle({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: `3px solid ${color}`,
          fontSize: "40px",
          fontWeight: "bold",
          color: color,
        }}
      >
        {value}
      </div>
      <span style={{ fontSize: "16px", color: "#a1a1aa" }}>{label}</span>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const saturation = Number(searchParams.get("s") || "50");
  const differentiation = Number(searchParams.get("d") || "50");
  const survivalOdds = Number(searchParams.get("o") || "50");
  const verdict = searchParams.get("v") || "Your idea needs a reality check";
  const idea = searchParams.get("i") || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          gap: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#a1a1aa",
            letterSpacing: "2px",
          }}
        >
          REALITYCHECK
        </div>

        {idea && (
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#71717a",
              maxWidth: "800px",
              textAlign: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {idea.length > 80 ? `${idea.slice(0, 80)}...` : idea}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "16px",
          }}
        >
          <ScoreCircle
            value={saturation}
            label="Saturation"
            color="#ef4444"
          />
          <ScoreCircle
            value={differentiation}
            label="Differentiation"
            color="#3b82f6"
          />
          <ScoreCircle
            value={survivalOdds}
            label="Survival Odds"
            color="#10b981"
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "#e4e4e7",
            fontStyle: "italic",
            maxWidth: "700px",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          &ldquo;{verdict.length > 100 ? `${verdict.slice(0, 100)}...` : verdict}&rdquo;
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

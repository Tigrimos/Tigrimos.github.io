"""Generate TigrimOS vs Agentic Frameworks radar comparison chart.

Styled to match the TigrimOS website: dark background + Inter font.
"""

import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np

# ---- Web palette (from style.css) ----
BG = "#0a0e17"
BG_CARD = "#151c2c"
TEXT = "#e2e8f0"
TEXT_MUTED = "#94a3b8"
BORDER = "#1e293b"
ACCENT = "#3898ec"

# Try to use Inter; fall back to system sans-serif if not installed
available = {f.name for f in fm.fontManager.ttflist}
font_family = "Inter" if "Inter" in available else "DejaVu Sans"
plt.rcParams["font.family"] = font_family
plt.rcParams["font.sans-serif"] = [font_family, "Helvetica", "Arial", "sans-serif"]

# ---- Data (same scores as original image) ----
categories = [
    "Security",
    "Multi-Agent",
    "Self-Hosted",
    "Enterprise",
    "No Docker",
    "Remote Agents",
    "Visual Editor",
    "Skill Marketplace",
    "MCP Integration",
    "Cross-Platform",
]

#                Sec  MA  SH  Ent  ND  RA  VE  SM  MCP CP
frameworks = {
    "Tigrimos":  [ 8, 10, 10,  7, 10, 10,  9,  9, 10,  9],
    "OpenClaw":  [ 7,  8,  8,  7,  5,  7,  6, 10, 10,  8],
    "HiClaw":    [ 5,  7,  6,  6,  4,  6,  5,  7, 10,  5],
    "Hermes":    [ 7,  6,  7,  7,  6,  6,  4,  5, 10,  7],
    "LangGraph": [ 6,  9,  5, 10,  3,  5,  5,  4,  7,  9],
    "CrewAI":    [ 6, 10,  6,  8,  4,  7,  7,  5,  6,  8],
    "AutoGen":   [ 5,  7,  6,  7,  4,  5,  4,  4,  5,  7],
}

colors = {
    "Tigrimos":  "#FF6B35",
    "OpenClaw":  "#20C4B0",
    "HiClaw":    "#3898ec",
    "Hermes":    "#6B9A7A",
    "LangGraph": "#F6C85F",
    "CrewAI":    "#C77DFF",
    "AutoGen":   "#7FD8BE",
}

num_vars = len(categories)
angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
angles += angles[:1]

fig = plt.figure(figsize=(13, 13), facecolor=BG)
ax = fig.add_subplot(111, polar=True)
ax.set_facecolor(BG_CARD)

# Match original: clockwise, with half-slot offset so Security sits
# slightly right of 12 o'clock and Cross-Platform slightly left of it.
ax.set_theta_offset(np.pi / 2 - np.pi / num_vars)
ax.set_theta_direction(-1)

for name, values in frameworks.items():
    vals = values + values[:1]
    is_tigr = name == "Tigrimos"
    ax.plot(
        angles,
        vals,
        linewidth=3 if is_tigr else 1.6,
        label=name,
        color=colors[name],
        marker="o",
        markersize=6 if is_tigr else 4,
    )
    ax.fill(angles, vals, alpha=0.25 if is_tigr else 0.08, color=colors[name])

# Axis styling
ax.set_xticks(angles[:-1])
ax.set_xticklabels(categories, size=13, weight="bold", color=TEXT)
ax.set_ylim(0, 11)
ax.set_yticks([2, 4, 6, 8, 10])
ax.set_yticklabels(["2", "4", "6", "8", "10"], size=10, color=TEXT_MUTED)
ax.set_rlabel_position(30)
ax.tick_params(axis="x", pad=15)

# Grid + spine
ax.grid(True, linestyle="--", alpha=0.35, color=TEXT_MUTED)
ax.spines["polar"].set_color(BORDER)
ax.spines["polar"].set_linewidth(1.5)

# Title
fig.suptitle(
    "TigrimOS vs Agentic Frameworks",
    size=22,
    weight="bold",
    color=TEXT,
    y=0.98,
)
fig.text(
    0.5,
    0.935,
    "Radar Comparison",
    ha="center",
    size=14,
    color=TEXT_MUTED,
)

# Legend
legend = ax.legend(
    loc="upper right",
    bbox_to_anchor=(1.32, 1.08),
    fontsize=11,
    frameon=True,
    facecolor=BG_CARD,
    edgecolor=BORDER,
    labelcolor=TEXT,
)
for text in legend.get_texts():
    text.set_color(TEXT)

plt.tight_layout()
plt.savefig(
    "radar_comparison.png",
    dpi=200,
    bbox_inches="tight",
    facecolor=BG,
)
print("Saved radar_comparison.png")

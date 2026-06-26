import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const productPath = "public/vyeBottle.png";
const outputDir = "public/generated";

const features = [
  {
    title: "570mg Potassium",
    subtitle: "Per serving",
    x: 1200,
    y: 170,
    anchor: "middle",
    line: "M1200 282 L1200 430",
    node: [1200, 430],
  },
  {
    title: "Never from concentrate",
    subtitle: "Clean coconut water taste",
    x: 650,
    y: 590,
    anchor: "end",
    line: "M725 645 L930 645",
    node: [725, 645],
  },
  {
    title: "USDA Organic",
    subtitle: "Certified quality",
    x: 650,
    y: 1075,
    anchor: "end",
    line: "M725 1125 L930 1125",
    node: [725, 1125],
  },
  {
    title: "100% Organic",
    subtitle: "Simple ingredient list",
    x: 1750,
    y: 590,
    anchor: "start",
    line: "M1470 665 L1680 665",
    node: [1680, 665],
  },
  {
    title: "Naturally hydrating",
    subtitle: "Light, crisp refreshment",
    x: 1750,
    y: 1075,
    anchor: "start",
    line: "M1470 1125 L1680 1125",
    node: [1680, 1125],
  },
  {
    title: "Sustainably sourced",
    subtitle: "From Vietnam's Mekong Delta",
    x: 1200,
    y: 1400,
    anchor: "middle",
    line: "M1200 1268 L1200 1360",
    node: [1200, 1268],
  },
];

const mobileFeatures = [
  ["570mg Potassium", "Per serving"],
  ["Never from concentrate", "Clean coconut water taste"],
  ["USDA Organic", "Certified quality"],
  ["100% Organic", "Simple ingredient list"],
  ["Naturally hydrating", "Light, crisp refreshment"],
  ["Sustainably sourced", "From Vietnam's Mekong Delta"],
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function titleLines(title) {
  if (title.length <= 20) return [title];
  if (title === "Never from concentrate") return ["Never from", "concentrate"];
  if (title === "Naturally hydrating") return ["Naturally", "hydrating"];
  return [title];
}

function calloutText(feature) {
  const lines = titleLines(feature.title);
  const titleTspans = lines
    .map(
      (line, index) =>
        `<tspan x="${feature.x}" dy="${index === 0 ? 0 : 58}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  const subtitleY = feature.y + 54 + (lines.length - 1) * 58;

  return `
    <text x="${feature.x}" y="${feature.y}" text-anchor="${feature.anchor}" fill="#17222b" font-family="Helvetica Neue, Arial, sans-serif" font-size="52" font-weight="800" letter-spacing="-0.5">
      ${titleTspans}
    </text>
    <text x="${feature.x}" y="${subtitleY}" text-anchor="${feature.anchor}" fill="#5f8066" font-family="Helvetica Neue, Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="8" text-transform="uppercase">
      ${escapeXml(feature.subtitle.toUpperCase())}
    </text>
  `;
}

function desktopSvg() {
  const lines = features
    .map(
      (feature) => `
        <path d="${feature.line}" stroke="#f36f98" stroke-width="3" stroke-linecap="round" opacity="0.84" />
        <circle cx="${feature.node[0]}" cy="${feature.node[1]}" r="13" fill="#f36f98" />
      `,
    )
    .join("");

  return `
    <svg width="2400" height="1600" viewBox="0 0 2400 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pinkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f36f98" stop-opacity="0.18"/>
          <stop offset="58%" stop-color="#fbd7e3" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="2400" height="1600" fill="transparent"/>
      <ellipse cx="1200" cy="845" rx="345" ry="555" fill="url(#pinkGlow)"/>
      ${lines}
      ${features.map(calloutText).join("")}
    </svg>
  `;
}

function card(x, y, title, subtitle) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="510" height="166" rx="34" fill="#fff9fb" fill-opacity="0.82" stroke="#f36f98" stroke-opacity="0.18"/>
      <circle cx="${x + 45}" cy="${y + 52}" r="10" fill="#f36f98"/>
      <text x="${x + 76}" y="${y + 62}" fill="#17222b" font-family="Helvetica Neue, Arial, sans-serif" font-size="32" font-weight="800" letter-spacing="-0.2">
        ${escapeXml(title)}
      </text>
      <text x="${x + 76}" y="${y + 111}" fill="#5f8066" font-family="Helvetica Neue, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="4">
        ${escapeXml(subtitle.toUpperCase())}
      </text>
    </g>
  `;
}

function mobileSvg() {
  const cards = mobileFeatures
    .map(([title, subtitle], index) => {
      const x = index % 2 === 0 ? 48 : 642;
      const y = 960 + Math.floor(index / 2) * 220;
      return card(x, y, title, subtitle);
    })
    .join("");

  return `
    <svg width="1200" height="1700" viewBox="0 0 1200 1700" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mobileGlow" cx="50%" cy="42%" r="48%">
          <stop offset="0%" stop-color="#f36f98" stop-opacity="0.24"/>
          <stop offset="60%" stop-color="#fbd7e3" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1700" fill="transparent"/>
      <ellipse cx="600" cy="455" rx="330" ry="440" fill="url(#mobileGlow)"/>
      <text x="600" y="845" text-anchor="middle" fill="#5f8066" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="7">
        ORGANIC COCONUT WATER
      </text>
      ${cards}
    </svg>
  `;
}

async function resizedProduct(height) {
  return sharp(productPath).trim({ background: "#00000000" }).resize({ height }).png().toBuffer();
}

async function generateDesktop() {
  const product = await resizedProduct(870);
  const productMeta = await sharp(product).metadata();
  const productLeft = Math.round(1200 - productMeta.width / 2);
  const productTop = Math.round(805 - productMeta.height / 2);

  return sharp(Buffer.from(desktopSvg()))
    .composite([{ input: product, left: productLeft, top: productTop }])
    .png()
    .toFile(`${outputDir}/vye-product-feature-infographic.png`);
}

async function generateMobile() {
  const product = await resizedProduct(730);
  const productMeta = await sharp(product).metadata();
  const productLeft = Math.round(600 - productMeta.width / 2);
  const productTop = 82;

  return sharp(Buffer.from(mobileSvg()))
    .composite([{ input: product, left: productLeft, top: productTop }])
    .png()
    .toFile(`${outputDir}/vye-product-feature-infographic-mobile.png`);
}

await mkdir(outputDir, { recursive: true });
await generateDesktop();
await generateMobile();

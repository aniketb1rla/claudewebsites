"use client";

import { GoogleGenAI } from "@google/genai";

/**
 * Asset management service.
 *
 * Initializes the Google Gen AI client and generates all presentation
 * imagery via the Imagen model while the preloader is on screen. Every
 * request is individually guarded — a missing key, network failure, or
 * timeout resolves to `null`, and the consuming section renders a neutral
 * slate placeholder instead, so the site never breaks.
 */

export type AssetKey =
  | "preloader"
  | "auraSpatial"
  | "apexHeritage"
  | "vanguardLegal";

export type AssetMap = Record<AssetKey, string | null>;

const IMAGEN_MODEL = "imagen-3.0-generate-002";
const REQUEST_TIMEOUT_MS = 30_000;

const PROMPTS: Record<AssetKey, string> = {
  preloader:
    "A cinematic, ultra-slow-motion macro shot of translucent, optical-grade glass elements shifting. Soft, diffused white light refracts gently, creating subtle, organic prism effects against a pure neutral gray void. The aesthetic is incredibly smooth, clean, and abstract, prioritizing texture, light, and negative space over defined objects. 8k resolution, photorealistic, liquid-glass texture.",
  auraSpatial:
    "High-end, architectural close-up of a minimalist living space corner. Focus on texture contrast: smooth, cold polished concrete meeting tactile, raw linen fabric in pale beige. Soft, natural light streams in from a hidden source, casting dramatic, sharp shadows that emphasize the negative space. Zero clutter. One single, understated piece of black ceramic art rests on a low shelf. Sophisticated, calm, museum-quality composition.",
  apexHeritage:
    "A stark, modern architectural abstraction from the United Kingdom. The shot is an upward angle focused on the roofline where traditional, deep slate-grey roofing tiles meet a clean, sharp, brushed aluminum flashing against a moody, overcast British sky. Focus on the geometry and precision of the slate installation. The texture of the wet slate is highly detailed. Clean, industrial, authoritative, and structured.",
  vanguardLegal:
    "An ultra-minimalist, cinematic detail shot inside a premium, modern law firm in London. A heavy, matte charcoal-gray fountain pen rests precisely on a stack of high-gsm, textured off-white legal paper. The background is completely softly blurred (high depth of field), showing only the clean, sharp vertical lines of a glass and steel partition. The lighting is focused and serious. Absolute focus on precision, quality, and authority.",
};

const ASSET_KEYS = Object.keys(PROMPTS) as AssetKey[];

export const EMPTY_ASSETS: AssetMap = {
  preloader: null,
  auraSpatial: null,
  apexHeritage: null,
  vanguardLegal: null,
};

function getClient(): GoogleGenAI | null {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn(
      "[imageService] NEXT_PUBLIC_GEMINI_API_KEY is not set — falling back to placeholders."
    );
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.warn("[imageService] Failed to initialize Gen AI client:", error);
    return null;
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Request timed out after ${ms}ms`)),
      ms
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

async function generateImage(
  ai: GoogleGenAI,
  prompt: string
): Promise<string | null> {
  try {
    const response = await withTimeout(
      ai.models.generateImages({
        model: IMAGEN_MODEL,
        prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: "16:9",
          outputMimeType: "image/jpeg",
        },
      }),
      REQUEST_TIMEOUT_MS
    );
    const bytes = response?.generatedImages?.[0]?.image?.imageBytes;
    return bytes ? `data:image/jpeg;base64,${bytes}` : null;
  } catch (error) {
    console.warn("[imageService] Image generation failed:", error);
    return null;
  }
}

/**
 * Generates every asset in parallel. Reports fractional progress (0–1) as
 * each request settles, and surfaces individual assets as soon as they
 * resolve so early arrivals (e.g. the preloader background) can be used
 * before the full set completes. Never rejects.
 */
export async function loadAllAssets(
  onProgress?: (fraction: number) => void,
  onAsset?: (key: AssetKey, src: string | null) => void
): Promise<AssetMap> {
  const results: AssetMap = { ...EMPTY_ASSETS };
  const ai = getClient();

  if (!ai) {
    onProgress?.(1);
    return results;
  }

  let settled = 0;
  await Promise.all(
    ASSET_KEYS.map(async (key) => {
      const src = await generateImage(ai, PROMPTS[key]);
      results[key] = src;
      settled += 1;
      onAsset?.(key, src);
      onProgress?.(settled / ASSET_KEYS.length);
    })
  );

  return results;
}

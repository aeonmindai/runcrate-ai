// ─── Chat Models ───────────────────────────────────────────────────────────

/**
 * Runcrate chat model IDs.
 *
 * Popular models include:
 * - 'deepseek-ai/DeepSeek-V3' - DeepSeek V3
 * - 'deepseek-ai/DeepSeek-R1' - DeepSeek R1 (reasoning)
 * - 'meta-llama/Llama-3.3-70B-Instruct' - Llama 3.3 70B
 * - 'Qwen/Qwen2.5-72B-Instruct' - Qwen 2.5 72B
 * - 'mistralai/Mistral-Large-Instruct-2411' - Mistral Large
 *
 * Any string is accepted to support new models as they're added.
 */
export type RuncrateChatModelId =
  // DeepSeek
  | 'deepseek-ai/DeepSeek-V3'
  | 'deepseek-ai/DeepSeek-R1'
  | 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B'
  | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B'
  // Meta Llama
  | 'meta-llama/Llama-3.3-70B-Instruct'
  | 'meta-llama/Llama-3.1-405B-Instruct'
  | 'meta-llama/Llama-3.1-70B-Instruct'
  | 'meta-llama/Llama-3.1-8B-Instruct'
  // Qwen
  | 'Qwen/Qwen2.5-72B-Instruct'
  | 'Qwen/Qwen2.5-32B-Instruct'
  | 'Qwen/Qwen2.5-Coder-32B-Instruct'
  | 'Qwen/QwQ-32B'
  // Mistral
  | 'mistralai/Mistral-Large-Instruct-2411'
  | 'mistralai/Mixtral-8x22B-Instruct-v0.1'
  | 'mistralai/Mistral-Small-24B-Instruct-2501'
  // Google
  | 'google/gemma-2-27b-it'
  | 'google/gemma-2-9b-it'
  // Microsoft
  | 'microsoft/phi-4'
  // Nvidia
  | 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF'
  // Allow any string for flexibility
  | (string & {});

/**
 * Settings for Runcrate chat models.
 */
export interface RuncrateChatSettings {
  /**
   * Maximum number of tokens to generate.
   */
  maxTokens?: number;

  /**
   * Temperature for sampling (0-2). Lower = more deterministic.
   */
  temperature?: number;

  /**
   * Top-p (nucleus) sampling. Alternative to temperature.
   */
  topP?: number;

  /**
   * Frequency penalty (-2 to 2). Reduces repetition of frequent tokens.
   */
  frequencyPenalty?: number;

  /**
   * Presence penalty (-2 to 2). Encourages new topics.
   */
  presencePenalty?: number;

  /**
   * Stop sequences. Generation stops when these are encountered.
   */
  stop?: string | string[];

  /**
   * Seed for deterministic generation.
   */
  seed?: number;

  /**
   * User identifier for abuse detection.
   */
  user?: string;
}

// ─── Embedding Models ──────────────────────────────────────────────────────

/**
 * Runcrate embedding model IDs.
 */
export type RuncrateEmbeddingModelId =
  | 'BAAI/bge-large-en-v1.5'
  | 'BAAI/bge-base-en-v1.5'
  | 'sentence-transformers/all-MiniLM-L6-v2'
  | (string & {});

/**
 * Settings for Runcrate embedding models.
 */
export interface RuncrateEmbeddingSettings {
  /**
   * Number of dimensions for the embedding output.
   * Only supported by some models.
   */
  dimensions?: number;

  /**
   * User identifier for abuse detection.
   */
  user?: string;
}

// ─── Image Models ──────────────────────────────────────────────────────────

/**
 * Runcrate image generation model IDs.
 *
 * Popular models include:
 * - 'black-forest-labs/FLUX.1-schnell' - Fast FLUX model
 * - 'black-forest-labs/FLUX.1-dev' - Development FLUX model
 * - 'ideogram-ai/ideogram-v2' - Ideogram V2
 * - 'recraft-ai/recraft-v3' - Recraft V3
 *
 * Any string is accepted to support new models as they're added.
 */
export type RuncrateImageModelId =
  // FLUX
  | 'black-forest-labs/FLUX.1-schnell'
  | 'black-forest-labs/FLUX.1-dev'
  | 'black-forest-labs/FLUX.1-pro'
  | 'black-forest-labs/FLUX.1.1-pro'
  // Ideogram
  | 'ideogram-ai/ideogram-v2'
  | 'ideogram-ai/ideogram-v2-turbo'
  // Recraft
  | 'recraft-ai/recraft-v3'
  | 'recraft-ai/recraft-v3-svg'
  // Stability
  | 'stabilityai/stable-diffusion-xl-base-1.0'
  | 'stabilityai/sd3.5-large'
  | 'stabilityai/sd3.5-large-turbo'
  // Allow any string for flexibility
  | (string & {});

/**
 * Settings for Runcrate image models.
 */
export interface RuncrateImageSettings {
  /**
   * Image width in pixels.
   */
  width?: number;

  /**
   * Image height in pixels.
   */
  height?: number;

  /**
   * Aspect ratio (e.g., '16:9', '1:1').
   */
  aspectRatio?: string;

  /**
   * Number of inference steps.
   */
  numInferenceSteps?: number;

  /**
   * Guidance scale for prompt adherence.
   */
  guidance?: number;

  /**
   * Seed for deterministic generation.
   */
  seed?: number;

  /**
   * Negative prompt to avoid certain elements.
   */
  negativePrompt?: string;
}

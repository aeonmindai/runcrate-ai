import { ProviderV3, LanguageModelV3, EmbeddingModelV3, ImageModelV3 } from '@ai-sdk/provider';
import { FetchFunction } from '@ai-sdk/provider-utils';

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
type RuncrateChatModelId = 'deepseek-ai/DeepSeek-V3' | 'deepseek-ai/DeepSeek-R1' | 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B' | 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B' | 'meta-llama/Llama-3.3-70B-Instruct' | 'meta-llama/Llama-3.1-405B-Instruct' | 'meta-llama/Llama-3.1-70B-Instruct' | 'meta-llama/Llama-3.1-8B-Instruct' | 'Qwen/Qwen2.5-72B-Instruct' | 'Qwen/Qwen2.5-32B-Instruct' | 'Qwen/Qwen2.5-Coder-32B-Instruct' | 'Qwen/QwQ-32B' | 'mistralai/Mistral-Large-Instruct-2411' | 'mistralai/Mixtral-8x22B-Instruct-v0.1' | 'mistralai/Mistral-Small-24B-Instruct-2501' | 'google/gemma-2-27b-it' | 'google/gemma-2-9b-it' | 'microsoft/phi-4' | 'nvidia/Llama-3.1-Nemotron-70B-Instruct-HF' | (string & {});
/**
 * Settings for Runcrate chat models.
 */
interface RuncrateChatSettings {
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
/**
 * Runcrate embedding model IDs.
 */
type RuncrateEmbeddingModelId = 'BAAI/bge-large-en-v1.5' | 'BAAI/bge-base-en-v1.5' | 'sentence-transformers/all-MiniLM-L6-v2' | (string & {});
/**
 * Settings for Runcrate embedding models.
 */
interface RuncrateEmbeddingSettings {
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
type RuncrateImageModelId = 'black-forest-labs/FLUX.1-schnell' | 'black-forest-labs/FLUX.1-dev' | 'black-forest-labs/FLUX.1-pro' | 'black-forest-labs/FLUX.1.1-pro' | 'ideogram-ai/ideogram-v2' | 'ideogram-ai/ideogram-v2-turbo' | 'recraft-ai/recraft-v3' | 'recraft-ai/recraft-v3-svg' | 'stabilityai/stable-diffusion-xl-base-1.0' | 'stabilityai/sd3.5-large' | 'stabilityai/sd3.5-large-turbo' | (string & {});
/**
 * Settings for Runcrate image models.
 */
interface RuncrateImageSettings {
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

interface RuncrateProviderSettings {
    /**
     * Runcrate API key. Default: RUNCRATE_API_KEY environment variable.
     */
    apiKey?: string;
    /**
     * Base URL for the Runcrate inference API.
     * @default "https://api.runcrate.ai/v1"
     */
    baseURL?: string;
    /**
     * Custom headers to include in requests.
     */
    headers?: Record<string, string>;
    /**
     * Custom fetch implementation.
     */
    fetch?: FetchFunction;
}
interface RuncrateProvider extends ProviderV3 {
    /**
     * Creates a chat model for text generation.
     *
     * @param modelId - The model ID (e.g., 'deepseek-ai/DeepSeek-V3', 'meta-llama/Llama-3.3-70B-Instruct')
     * @param settings - Optional model settings
     */
    (modelId: RuncrateChatModelId, settings?: RuncrateChatSettings): LanguageModelV3;
    /**
     * Creates a chat model for text generation.
     */
    chatModel(modelId: RuncrateChatModelId, settings?: RuncrateChatSettings): LanguageModelV3;
    /**
     * Creates a completion model for text generation.
     */
    completionModel(modelId: RuncrateChatModelId, settings?: RuncrateChatSettings): LanguageModelV3;
    /**
     * Creates an embedding model.
     */
    embeddingModel(modelId: RuncrateEmbeddingModelId, settings?: RuncrateEmbeddingSettings): EmbeddingModelV3;
    /**
     * Creates a text embedding model.
     * @deprecated Use `embeddingModel` instead.
     */
    textEmbeddingModel(modelId: RuncrateEmbeddingModelId, settings?: RuncrateEmbeddingSettings): EmbeddingModelV3;
    /**
     * Creates an image generation model.
     *
     * @param modelId - The model ID (e.g., 'black-forest-labs/FLUX.1-schnell')
     * @param settings - Optional model settings
     */
    imageModel(modelId: RuncrateImageModelId, settings?: RuncrateImageSettings): ImageModelV3;
}
/**
 * Creates a Runcrate provider instance.
 *
 * @example
 * ```ts
 * import { createRuncrate } from '@runcrate/ai';
 * import { generateText } from 'ai';
 *
 * const runcrate = createRuncrate({ apiKey: 'rc_live_...' });
 *
 * const { text } = await generateText({
 *   model: runcrate('deepseek-ai/DeepSeek-V3'),
 *   prompt: 'Hello!',
 * });
 * ```
 */
declare function createRuncrate(options?: RuncrateProviderSettings): RuncrateProvider;
/**
 * Default Runcrate provider instance.
 * Uses RUNCRATE_API_KEY environment variable for authentication.
 *
 * @example
 * ```ts
 * import { runcrate } from '@runcrate/ai';
 * import { generateText } from 'ai';
 *
 * const { text } = await generateText({
 *   model: runcrate('deepseek-ai/DeepSeek-V3'),
 *   prompt: 'Hello!',
 * });
 * ```
 */
declare const runcrate: RuncrateProvider;

export { type RuncrateChatModelId, type RuncrateChatSettings, type RuncrateEmbeddingModelId, type RuncrateEmbeddingSettings, type RuncrateImageModelId, type RuncrateImageSettings, type RuncrateProvider, type RuncrateProviderSettings, createRuncrate, runcrate };

import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleCompletionLanguageModel,
  OpenAICompatibleEmbeddingModel,
  OpenAICompatibleImageModel,
} from '@ai-sdk/openai-compatible';
import {
  EmbeddingModelV3,
  ImageModelV3,
  LanguageModelV3,
  ProviderV3,
} from '@ai-sdk/provider';
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import {
  RuncrateChatModelId,
  RuncrateChatSettings,
  RuncrateEmbeddingModelId,
  RuncrateEmbeddingSettings,
  RuncrateImageModelId,
  RuncrateImageSettings,
} from './runcrate-settings.js';

// ─── Provider Settings ─────────────────────────────────────────────────────

export interface RuncrateProviderSettings {
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

// ─── Provider Interface ────────────────────────────────────────────────────

export interface RuncrateProvider extends ProviderV3 {
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

// ─── Provider Factory ──────────────────────────────────────────────────────

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
export function createRuncrate(
  options: RuncrateProviderSettings = {},
): RuncrateProvider {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? 'https://api.runcrate.ai/v1',
  );

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'RUNCRATE_API_KEY',
      description: 'Runcrate API key',
    })}`,
    ...options.headers,
  });

  const getCommonModelConfig = (modelType: string) => ({
    provider: `runcrate.${modelType}`,
    url: ({ path }: { path: string }) => `${baseURL}${path}`,
    headers: getHeaders,
    fetch: options.fetch,
  });

  // ─── Model Factories ───────────────────────────────────────────────────────

  const createChatModel = (
    modelId: RuncrateChatModelId,
    _settings: RuncrateChatSettings = {},
  ): LanguageModelV3 =>
    new OpenAICompatibleChatLanguageModel(modelId, {
      ...getCommonModelConfig('chat'),
    });

  const createCompletionModel = (
    modelId: RuncrateChatModelId,
    _settings: RuncrateChatSettings = {},
  ): LanguageModelV3 =>
    new OpenAICompatibleCompletionLanguageModel(modelId, {
      ...getCommonModelConfig('completion'),
    });

  const createEmbeddingModel = (
    modelId: RuncrateEmbeddingModelId,
    _settings: RuncrateEmbeddingSettings = {},
  ): EmbeddingModelV3 =>
    new OpenAICompatibleEmbeddingModel(modelId, {
      ...getCommonModelConfig('embedding'),
    });

  const createImageModel = (
    modelId: RuncrateImageModelId,
    _settings: RuncrateImageSettings = {},
  ): ImageModelV3 =>
    new OpenAICompatibleImageModel(modelId, {
      ...getCommonModelConfig('image'),
    });

  // ─── Provider Object ───────────────────────────────────────────────────────

  const provider = (
    modelId: RuncrateChatModelId,
    settings?: RuncrateChatSettings,
  ) => createChatModel(modelId, settings);

  provider.languageModel = createChatModel;
  provider.chatModel = createChatModel;
  provider.completionModel = createCompletionModel;
  provider.embeddingModel = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.imageModel = createImageModel;

  return provider as RuncrateProvider;
}

// ─── Default Instance ──────────────────────────────────────────────────────

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
export const runcrate = createRuncrate();

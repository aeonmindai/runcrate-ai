// src/runcrate-provider.ts
import {
  OpenAICompatibleChatLanguageModel,
  OpenAICompatibleCompletionLanguageModel,
  OpenAICompatibleEmbeddingModel,
  OpenAICompatibleImageModel
} from "@ai-sdk/openai-compatible";
import {
  loadApiKey,
  withoutTrailingSlash
} from "@ai-sdk/provider-utils";
function createRuncrate(options = {}) {
  const baseURL = withoutTrailingSlash(
    options.baseURL ?? "https://api.runcrate.ai/v1"
  );
  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: "RUNCRATE_API_KEY",
      description: "Runcrate API key"
    })}`,
    ...options.headers
  });
  const getCommonModelConfig = (modelType) => ({
    provider: `runcrate.${modelType}`,
    url: ({ path }) => `${baseURL}${path}`,
    headers: getHeaders,
    fetch: options.fetch
  });
  const createChatModel = (modelId, _settings = {}) => new OpenAICompatibleChatLanguageModel(modelId, {
    ...getCommonModelConfig("chat")
  });
  const createCompletionModel = (modelId, _settings = {}) => new OpenAICompatibleCompletionLanguageModel(modelId, {
    ...getCommonModelConfig("completion")
  });
  const createEmbeddingModel = (modelId, _settings = {}) => new OpenAICompatibleEmbeddingModel(modelId, {
    ...getCommonModelConfig("embedding")
  });
  const createImageModel = (modelId, _settings = {}) => new OpenAICompatibleImageModel(modelId, {
    ...getCommonModelConfig("image")
  });
  const provider = (modelId, settings) => createChatModel(modelId, settings);
  provider.languageModel = createChatModel;
  provider.chatModel = createChatModel;
  provider.completionModel = createCompletionModel;
  provider.embeddingModel = createEmbeddingModel;
  provider.textEmbeddingModel = createEmbeddingModel;
  provider.imageModel = createImageModel;
  return provider;
}
var runcrate = createRuncrate();
export {
  createRuncrate,
  runcrate
};
//# sourceMappingURL=index.js.map
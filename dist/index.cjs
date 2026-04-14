"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createRuncrate: () => createRuncrate,
  runcrate: () => runcrate
});
module.exports = __toCommonJS(index_exports);

// src/runcrate-provider.ts
var import_openai_compatible = require("@ai-sdk/openai-compatible");
var import_provider_utils = require("@ai-sdk/provider-utils");
function createRuncrate(options = {}) {
  const baseURL = (0, import_provider_utils.withoutTrailingSlash)(
    options.baseURL ?? "https://api.runcrate.ai/v1"
  );
  const getHeaders = () => ({
    Authorization: `Bearer ${(0, import_provider_utils.loadApiKey)({
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
  const createChatModel = (modelId, _settings = {}) => new import_openai_compatible.OpenAICompatibleChatLanguageModel(modelId, {
    ...getCommonModelConfig("chat")
  });
  const createCompletionModel = (modelId, _settings = {}) => new import_openai_compatible.OpenAICompatibleCompletionLanguageModel(modelId, {
    ...getCommonModelConfig("completion")
  });
  const createEmbeddingModel = (modelId, _settings = {}) => new import_openai_compatible.OpenAICompatibleEmbeddingModel(modelId, {
    ...getCommonModelConfig("embedding")
  });
  const createImageModel = (modelId, _settings = {}) => new import_openai_compatible.OpenAICompatibleImageModel(modelId, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRuncrate,
  runcrate
});
//# sourceMappingURL=index.cjs.map
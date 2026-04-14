# [@runcrate/ai](https://runcrate.ai)

[Runcrate](https://runcrate.ai) provider for the [Vercel AI SDK](https://ai-sdk.dev).

## Installation

```bash
npm install @runcrate/ai ai
```

## Setup

Set your Runcrate API key:

```bash
export RUNCRATE_API_KEY=rc_live_...
```

Or pass it directly when creating the provider.

## Usage

### Text Generation

```typescript
import { runcrate } from '@runcrate/ai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: runcrate('deepseek-ai/DeepSeek-V3'),
  prompt: 'Explain quantum computing in simple terms.',
});

console.log(text);
```

### Streaming

```typescript
import { runcrate } from '@runcrate/ai';
import { streamText } from 'ai';

const result = streamText({
  model: runcrate('deepseek-ai/DeepSeek-V3'),
  prompt: 'Write a short story about a robot.',
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

### Chat Messages

```typescript
import { runcrate } from '@runcrate/ai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: runcrate('meta-llama/Llama-3.3-70B-Instruct'),
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is the capital of France?' },
  ],
});
```

### Structured Output

```typescript
import { runcrate } from '@runcrate/ai';
import { generateObject } from 'ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: runcrate('deepseek-ai/DeepSeek-V3'),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a recipe for chocolate chip cookies.',
});

console.log(object.recipe);
```

### Image Generation

```typescript
import { runcrate } from '@runcrate/ai';
import { experimental_generateImage as generateImage } from 'ai';

const { image } = await generateImage({
  model: runcrate.imageModel('black-forest-labs/FLUX.1-schnell'),
  prompt: 'A futuristic cityscape at sunset',
  size: '1024x768',
});

console.log(image.base64); // base64 encoded image
```

### Embeddings

```typescript
import { runcrate } from '@runcrate/ai';
import { embed } from 'ai';

const { embedding } = await embed({
  model: runcrate.embeddingModel('BAAI/bge-large-en-v1.5'),
  value: 'The quick brown fox jumps over the lazy dog',
});

console.log(embedding); // float array
```

### Custom Configuration

```typescript
import { createRuncrate } from '@runcrate/ai';

const runcrate = createRuncrate({
  apiKey: 'rc_live_...',
  baseURL: 'https://api.runcrate.ai/v1', // default
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## Available Models

### Chat Models

| Model ID | Description |
|----------|-------------|
| `deepseek-ai/DeepSeek-V3` | DeepSeek V3 |
| `deepseek-ai/DeepSeek-R1` | DeepSeek R1 (reasoning) |
| `meta-llama/Llama-3.3-70B-Instruct` | Llama 3.3 70B |
| `meta-llama/Llama-3.1-405B-Instruct` | Llama 3.1 405B |
| `Qwen/Qwen2.5-72B-Instruct` | Qwen 2.5 72B |
| `Qwen/QwQ-32B` | QwQ 32B (reasoning) |
| `mistralai/Mistral-Large-Instruct-2411` | Mistral Large |
| `microsoft/phi-4` | Phi-4 |

### Image Models

| Model ID | Description |
|----------|-------------|
| `black-forest-labs/FLUX.1-schnell` | FLUX.1 Schnell (fast) |
| `black-forest-labs/FLUX.1-dev` | FLUX.1 Dev |
| `black-forest-labs/FLUX.1-pro` | FLUX.1 Pro |
| `ideogram-ai/ideogram-v2` | Ideogram V2 |
| `recraft-ai/recraft-v3` | Recraft V3 |
| `stabilityai/sd3.5-large` | Stable Diffusion 3.5 Large |

### Embedding Models

| Model ID | Description |
|----------|-------------|
| `BAAI/bge-large-en-v1.5` | BGE Large English |
| `BAAI/bge-base-en-v1.5` | BGE Base English |
| `sentence-transformers/all-MiniLM-L6-v2` | MiniLM L6 v2 |

See the full model catalog at [runcrate.ai/models](https://runcrate.ai/models).

## Model Settings

```typescript
const { text } = await generateText({
  model: runcrate('deepseek-ai/DeepSeek-V3', {
    maxTokens: 1000,
    temperature: 0.7,
    topP: 0.9,
  }),
  prompt: 'Hello!',
});
```

## License

MIT

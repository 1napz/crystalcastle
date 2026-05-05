// lib/github-models.js
import { githubModels } from '@github/models';
import { generateText } from 'ai';

export async function callGithubModel(
  prompt,
  model = 'meta/meta-llama-3.1-8b-instruct'
) {
  try {
    const result = await generateText({
      model: githubModels(model),
      prompt: prompt,
    });
    return {
      success: true,
      content: result.text,
      provider: 'github-models',
    };
  } catch (error) {
    console.error('GitHub Models error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
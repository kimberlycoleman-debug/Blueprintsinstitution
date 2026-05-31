import OpenAI from 'openai'

let openai: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openai
}

/**
 * Default model for general formation companion responses.
 * Change to gpt-4o or gpt-4o-mini based on cost/quality preference.
 */
export const DEFAULT_MODEL = 'gpt-4o-mini'

/**
 * Premium model for capstone deliverables (Identity Blueprint, Purpose, Ministry Plan)
 * where higher quality is worth the cost.
 */
export const PREMIUM_MODEL = 'gpt-4o'

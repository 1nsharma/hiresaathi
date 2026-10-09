/**
 * AI Service
 * OpenAI integration for content generation and analysis
 */

import OpenAI from 'openai';
import { config } from '../config/env.js';

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export class AIService {
  /**
   * Analyze brand website
   */
  static async analyzeBrandWebsite(websiteUrl: string) {
    const prompt = `Analyze the brand at ${websiteUrl} and extract:
    1. Brand voice and tone (e.g., "Professional, innovative, data-driven")
    2. Brand personality traits (array of 3-5 traits)
    3. Target audience description
    4. Key products (array)
    5. Key services (array)
    6. Key differentiators (array)
    
    Return as JSON.`;

    const response = await openai.chat.completions.create({
      model: config.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  /**
   * Generate content using AI
   */
  static async generateContent(type: string, input: string, context?: any) {
    const prompt = this.buildContentPrompt(type, input, context);

    const response = await openai.chat.completions.create({
      model: config.OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'You are a professional content writer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  }

  /**
   * Build content prompt based on type
   */
  private static buildContentPrompt(type: string, input: string, context?: any): string {
    const brandContext = context?.brand
      ? `\n\nBrand Voice: ${context.brand.voiceTone}\nTarget Audience: ${context.brand.targetAudience}`
      : '';

    const prompts: Record<string, string> = {
      blog_post: `Write a comprehensive blog post about: ${input}${brandContext}\n\nInclude:\n- Engaging title\n- Introduction\n- 3-5 main sections\n- Conclusion\n- SEO keywords`,
      
      social_post: `Create an engaging social media post about: ${input}${brandContext}\n\nInclude:\n- Hook\n- Main message\n- Call-to-action\n- Relevant hashtags`,
      
      email: `Write a professional email about: ${input}${brandContext}\n\nInclude:\n- Subject line\n- Greeting\n- Body\n- Call-to-action\n- Signature`,
      
      ad_copy: `Create compelling ad copy for: ${input}${brandContext}\n\nInclude:\n- Headline\n- Description\n- Call-to-action\n- Key benefits`,
    };

    return prompts[type] || `Generate content about: ${input}${brandContext}`;
  }

  /**
   * Analyze resume and extract information
   */
  static async analyzeResume(resumeText: string) {
    const prompt = `Analyze this resume and extract:\n${resumeText}\n\nReturn JSON with:\n- name\n- email\n- phone\n- skills (array)\n- experience (years)\n- education\n- summary`;

    const response = await openai.chat.completions.create({
      model: config.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  /**
   * Match candidate to job
   */
  static async matchCandidateToJob(candidateSkills: string[], jobRequirements: string[]) {
    const prompt = `Calculate a match score (0-100) between:\n\nCandidate Skills: ${candidateSkills.join(', ')}\nJob Requirements: ${jobRequirements.join(', ')}\n\nReturn JSON with:\n- score (number 0-100)\n- matchedSkills (array)\n- missingSkills (array)\n- recommendation (string)`;

    const response = await openai.chat.completions.create({
      model: config.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  /**
   * Generate AI response for support ticket
   */
  static async generateSupportResponse(ticket: { subject: string; description: string }) {
    const prompt = `Generate a helpful support response for:\n\nSubject: ${ticket.subject}\nDescription: ${ticket.description}\n\nBe professional, empathetic, and solution-oriented.`;

    const response = await openai.chat.completions.create({
      model: config.OPENAI_MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful customer support agent.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content;
  }
}

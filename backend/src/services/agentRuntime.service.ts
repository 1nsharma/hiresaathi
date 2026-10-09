/**
 * Agent Runtime Service
 * Executes AI agents with Composio tool integration
 */

import { ComposioService } from './composio.service.js';
import { AIService } from './ai.service.js';

export class AgentRuntimeService {
  /**
   * Execute an agent with given input
   */
  static async execute(agent: any, input: string, context?: any) {
    const startTime = Date.now();
    const steps: any[] = [];

    // Step 1: Analyze task
    steps.push({
      type: 'thinking',
      description: `Analyzing task: "${input.substring(0, 100)}..."`,
      timestamp: new Date().toISOString(),
    });

    // Step 2: Get required tools
    const requiredTools = agent.requiredTools || [];
    steps.push({
      type: 'thinking',
      description: `Required tools: ${requiredTools.join(', ')}`,
      timestamp: new Date().toISOString(),
    });

    // Step 3: Execute tool calls
    const toolResults: any[] = [];
    for (const toolId of requiredTools) {
      steps.push({
        type: 'tool_call',
        description: `Calling ${toolId}...`,
        tool: toolId,
        timestamp: new Date().toISOString(),
      });

      try {
        const result = await ComposioService.executeTool(toolId, input, context);
        toolResults.push({ tool: toolId, result });
        
        steps.push({
          type: 'tool_result',
          description: `${toolId} completed successfully`,
          tool: toolId,
          result,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        steps.push({
          type: 'tool_result',
          description: `${toolId} failed: ${error}`,
          tool: toolId,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Step 4: Generate output using AI
    steps.push({
      type: 'thinking',
      description: 'Generating final output...',
      timestamp: new Date().toISOString(),
    });

    const output = await AIService.generateContent(agent.slug, input, context);

    steps.push({
      type: 'output',
      description: 'Task completed successfully',
      timestamp: new Date().toISOString(),
    });

    const durationMs = Date.now() - startTime;

    return {
      output: {
        content: output,
        toolResults,
      },
      steps,
      durationMs,
    };
  }
}

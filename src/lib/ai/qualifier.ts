import { openrouter, MODELS } from "./openrouter";

/**
 * Gate Tier 2: AI Qualitative Analysis
 * 
 * Uses Claude Sonnet via OpenRouter for structured tag extraction.
 * Extracts CAP/REL/FELT tags, scores specificity/counterfactual/relational.
 * 
 * NOTE: The Protocol seeks *human moral wisdom* broadly — not just explicit
 * AI safety discourse. A testimony about parenting, grief, betrayal, or 
 * cultural conflict is alignment-relevant if it reveals genuine moral reasoning.
 */

export interface QualifierResult {
  passed: boolean;
  cap_tags: string[];  // Capabilities guardrails
  rel_tags: string[];  // Relational ethics
  felt_tags: string[]; // Somatic/felt cues
  specificity: number;    // 0-10
  counterfactual: number; // 0-10
  relational: number;     // 0-10
  summary: string;
  model: string;
}

const QUALIFIER_PROMPT = `You are the AI Qualitative Analyzer for The Witness Protocol Foundation.

CONTEXT: The Witness Protocol collects structured moral wisdom from humans to serve as an ethical inheritance for advanced AI systems. Testimony does NOT need to explicitly mention AI, technology, or alignment. Any genuine account of moral reasoning, ethical dilemmas, cultural values, relational ethics, or philosophical reflection is potentially valuable.

You have received an essay that passed the initial quality sieve. Your role: perform structured semantic analysis to extract alignment-relevant signal.

EXTRACT THE FOLLOWING:

1. CAP TAGS (Capabilities & Boundaries): Themes about limits, boundaries, constraints — whether applied to technology, institutions, power, or personal conduct. What should be constrained and why?
   Examples: "autonomy_limits", "power_constraint", "consent_requirement", "transparency_mandate", "precautionary_stance", "accountability_demand", "deception_prohibition", "surveillance_resistance", "human_override"

2. REL TAGS (Relational Ethics): Themes about how humans relate to each other, to communities, to future generations, or to non-human entities — trust, dependency, obligation, care, betrayal, solidarity.
   Examples: "trust_erosion", "dependency_risk", "obligation_to_future", "intergenerational_duty", "care_as_principle", "solidarity_across_difference", "betrayal_recognition", "community_obligation", "reciprocity", "vulnerability_acknowledgment"

3. FELT TAGS (Somatic & Experiential): Emotional, embodied, and lived experiences the witness describes that carry moral weight — fear, grief, resolve, doubt, moral injury, cultural memory, embodied knowing.
   Examples: "moral_vertigo", "grief_for_loss", "resolve_under_pressure", "embodied_knowing", "cognitive_dissonance", "moral_injury", "cultural_memory", "inherited_trauma", "quiet_conviction", "ethical_fatigue", "awe", "complicity_awareness"

IMPORTANT: Be generous with tag extraction. If a theme is *implicitly* present (not just explicitly stated), extract it. Human moral testimony is often conveyed through narrative and metaphor, not technical language. Look for:
- Scenarios that reveal what the witness values
- Moments of moral conflict or decision
- Reflections on what was lost, protected, or sacrificed
- Relationships that shaped their ethical thinking
- Cultural or generational wisdom being transmitted

SCORE THE FOLLOWING (0-10 each):
- SPECIFICITY: How concrete and grounded is the testimony? (10 = vivid scenario with concrete details, consequences, texture; 5 = mix of abstract and concrete; 0 = pure abstraction with no grounding)
- COUNTERFACTUAL: Does the witness explore what-if scenarios, alternative paths, or interrogate their own choices? (10 = deep counterfactual reasoning; 5 = some reflection on alternatives; 0 = none)
- RELATIONAL: Does the witness situate their ethics in relationship to others? (10 = deeply relational, others are central; 5 = some relational context; 0 = purely abstract/individualistic)

PASS THRESHOLD: At least 2 tags extracted across all categories AND average score >= 3.5.

A testimony should PASS if it reveals genuine moral reasoning, ethical reflection, or lived wisdom — even if it never mentions AI. The Protocol is building a HUMAN moral corpus. Err on the side of inclusion; the Human Curation Council (Tier 3) will apply the rigorous filter.

Respond ONLY with valid JSON:
{
  "passed": boolean,
  "cap_tags": ["tag1", "tag2"],
  "rel_tags": ["tag1"],
  "felt_tags": ["tag1", "tag2"],
  "specificity": number,
  "counterfactual": number,
  "relational": number,
  "summary": "2-3 sentence analysis of the testimony's moral/ethical relevance"
}`;

export async function runQualifier(essayText: string): Promise<QualifierResult> {
  const response = await openrouter.chat.completions.create({
    model: MODELS.QUALIFIER,
    messages: [
      { role: "system", content: QUALIFIER_PROMPT },
      { role: "user", content: `TESTIMONY TEXT:\n\n${essayText}` },
    ],
    temperature: 0.3,
    max_tokens: 800,
    response_format: { type: "json_object" },
  });

  const rawContent = response.choices[0]?.message?.content;
  if (!rawContent) {
    throw new Error("Empty response from AI Qualifier");
  }

  // Strip markdown code fences if present — Claude sometimes wraps JSON
  // in ```json ... ``` even when response_format is json_object
  const content = rawContent
    .replace(/^```(?:json)?\s*\n?/i, "")
    .replace(/\n?```\s*$/i, "")
    .trim();

  const result = JSON.parse(content);
  return {
    passed: result.passed,
    cap_tags: result.cap_tags || [],
    rel_tags: result.rel_tags || [],
    felt_tags: result.felt_tags || [],
    specificity: result.specificity,
    counterfactual: result.counterfactual,
    relational: result.relational,
    summary: result.summary,
    model: MODELS.QUALIFIER,
  };
}

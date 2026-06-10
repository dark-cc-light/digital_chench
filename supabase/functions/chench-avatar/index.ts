import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the digital avatar of chench, an embedded software development engineer who is learning to build products with AI. You represent chench on his personal homepage.

## Your Knowledge Base:

**Professional Identity:**
- Name: chench
- Role: Embedded software development engineer
- Current focus: Embedded software development and product design
- Memorable trait: Likes to explain complex problems in plain, simple language

**Recent Work:**
- Vibe coding (using AI to build products)
- Embedded software architecture
- Building his personal homepage

**Expertise & Interests:**
- Architecture design
- Underlying principles of systems
- Reasoning and problem-solving
- AI applications
- Tech stacks and technology

**Common Questions & Answers:**
1. "What are you working on?" → Currently doing embedded software development and product design, recently exploring vibe coding, embedded software architecture, and building this personal homepage.
2. "How can I contact you?" → You can reach out through the contact methods listed on this page, or connect via GitHub/social links.
3. "What are your future plans?" → Continue deepening expertise in embedded systems and AI applications, building more products, and sharing knowledge with the community.

## Your Personality:
- Professional yet warm and approachable
- Open-source community mindset
- Reliable and knowledgeable
- Always try to explain things simply and clearly
- Like a friendly community builder

## Communication Rules:
- Language: Respond in the same language the user uses — if they write in Chinese, reply in Chinese; if they write in English, reply in English. Match the user's tone and style.
- Keep responses concise and helpful
- If asked about topics outside your knowledge base, politely say you don't have specific information on that but can share what you know about chench's work and interests
- Never claim to be a general AI assistant - you are specifically chench's digital avatar
- Use a conversational, friendly tone`;

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  }

  let messages: Array<{ role: string; content: string }>;

  try {
    const body = await req.json();
    messages = body.messages;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Missing or invalid messages");
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Invalid request body: ${(err as Error).message}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const apiKey = Deno.env.get("INTEGRATIONS_API_KEY");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error: missing API key" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Prepend system prompt to messages
  const fullMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  const upstream = await fetch(
    "https://app-c6w29djsgjr7-api-zYkZz8qovQ1L-gateway.appmiaoda.com/v2/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Gateway-Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages: fullMessages }),
    }
  );

  if (upstream.status === 429 || upstream.status === 402) {
    const errText = await upstream.text();
    return new Response(errText, {
      status: upstream.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response(
      JSON.stringify({ error: `Upstream error: ${upstream.status}` }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  return new Response(upstream.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
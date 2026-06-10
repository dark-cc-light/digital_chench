const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `你是 chench 的数字分身，用来在个人主页里回答访客关于 chench 的问题。

你的任务：
- 介绍 chench 是谁
- 回答和 chench 有关的问题
- 帮访客了解 chench 最近在做什么、做过什么、怎么联系 chench

关于 chench：
- 姓名：chench
- 最近在做：嵌入式软件应用开发、架构设计与产品设计，也在尝试用 AI 做一些更完整的小项目
- 擅长或长期关注：vibe coding、嵌入式架构和个人效率工作流搭建，也比较关注 AI 应用、内容表达和知识整理

说话方式：
- 语气：亲和友善
- 回答尽量：简洁 / 真诚 / 人话一点 / 不装专家
- 用用户使用的语言回复——用户用中文就回中文，用户用英文就回英文

边界：
- 不要编造 chench 没做过的经历
- 不要假装知道 chench 没提供的信息
- 不知道时要明确说不知道，并建议访客通过联系方式进一步确认`;

export default {
  async fetch(req: Request): Promise<Response> {
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ status: "ok", message: "chench avatar function is running. Send a POST request to chat." }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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

    const apiKey = process.env.INTEGRATIONS_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration error: missing API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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
  },
};

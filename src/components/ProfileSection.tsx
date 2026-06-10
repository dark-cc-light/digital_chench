import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code2, MessageCircle, MessageSquare } from "lucide-react";

const AVATAR_URL =
  "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_828b7a9d-a871-4be7-a805-5f6ca0909a4c.jpg";

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Avatar — compact, not competing with name */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-sm scale-110" />
        <Avatar className="relative w-20 h-20 md:w-24 md:h-24 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
          <AvatarImage
            src={AVATAR_URL}
            alt="chench avatar"
            className="object-cover"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
            C
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name & Tagline — clear hierarchy */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          chench
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          An engineer learning to build products with AI
        </p>
        <p className="text-sm text-muted-foreground/70">
          喜欢把复杂问题讲成人话的工程师
        </p>
      </div>

      {/* Bio paragraph */}
      <p className="text-sm text-foreground/75 leading-relaxed max-w-md text-center">
        目前在从事嵌入式软件开发与产品设计，专注 vibe
        coding、嵌入式架构和个人效率工作流搭建。对 AI
        应用、架构设计和底层原理充满好奇，相信好的技术应该让人更容易理解，而不是更困惑。
      </p>

      {/* Contact */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <a
          href="tencent://message/?uin=1462446123"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>QQ: 1462446123</span>
        </a>
        <span className="text-border/50">·</span>
        <a
          href="https://github.com/dark-cc-light/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>github: dark-cc-light</span>
        </a>
      </div>

      {/* Primary CTA — chat entry anchor */}
      <a
        href="#chat"
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-sm text-primary hover:bg-primary/10 hover:border-primary/40 transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        Ask me anything
      </a>
    </div>
  );
}

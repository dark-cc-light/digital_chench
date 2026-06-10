import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2, Cpu, Lightbulb, MessageSquare } from "lucide-react";

interface ProfileSectionProps {
  avatarUrl: string;
}

export default function ProfileSection({ avatarUrl }: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center md:items-start gap-6">
      {/* Avatar */}
      <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-primary/20 shadow-sm">
        <AvatarImage src={avatarUrl} alt="chench avatar" className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
          C
        </AvatarFallback>
      </Avatar>

      {/* Name & Intro */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          chench
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          An engineer learning to build products with AI
        </p>
        <p className="text-sm text-muted-foreground/80">
          喜欢把复杂问题讲成人话的工程师
        </p>
      </div>

      <Separator className="w-full" />

      {/* Info Cards */}
      <div className="w-full space-y-4">
        <InfoItem
          icon={<Code2 className="w-4 h-4 text-primary" />}
          label="Currently"
          value="Embedded Software Development & Product Design"
        />
        <InfoItem
          icon={<Cpu className="w-4 h-4 text-primary" />}
          label="Focus"
          value="Vibe Coding · Embedded Architecture · Building Personal Homepage"
        />
        <InfoItem
          icon={<Lightbulb className="w-4 h-4 text-primary" />}
          label="Interests"
          value="AI Applications · Architecture · Tech Stacks"
        />
      </div>

      <Separator className="w-full" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        <Badge variant="secondary" className="text-xs font-normal">
          <MessageSquare className="w-3 h-3 mr-1" />
          Ask me anything
        </Badge>
        <Badge variant="outline" className="text-xs font-normal">
          Open Source
        </Badge>
        <Badge variant="outline" className="text-xs font-normal">
          Community Builder
        </Badge>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-foreground mt-0.5 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
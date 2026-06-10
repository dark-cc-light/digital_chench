import ProfileSection from "@/components/ProfileSection";
import ChatSection from "@/components/ChatSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal top bar */}
      <div className="flex justify-end px-4 py-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Two-column: profile left, chat right – fills viewport */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-28 md:h-[calc(100vh-80px)]">
          {/* Profile Column */}
          <section className="md:w-80 lg:w-96 shrink-0 flex flex-col justify-center">
            <ProfileSection />
          </section>

          {/* Chat Column */}
          <section id="chat" className="flex flex-col min-h-[400px] md:min-h-0 md:max-w-lg lg:max-w-xl md:flex-1 overflow-hidden">
            <div className="h-full animate-fade-in">
              <ChatSection />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

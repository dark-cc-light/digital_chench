import ProfileSection from "@/components/ProfileSection";
import ChatSection from "@/components/ChatSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const AVATAR_URL = "https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_828b7a9d-a871-4be7-a805-5f6ca0909a4c.jpg";

export default function HomePage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-semibold text-foreground">chench</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#chat" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </a>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 min-h-[calc(100vh-140px)]">
          {/* Profile Column */}
          <section id="about" className="md:w-80 lg:w-96 shrink-0">
            <ProfileSection avatarUrl={AVATAR_URL} />
          </section>

          {/* Spacer to push chat right */}
          <div className="hidden md:block flex-1" />

          {/* Chat Column */}
          <section id="chat" className="min-h-[300px] md:min-h-0 flex md:justify-end">
            <div className="w-full max-w-md">
              <ChatSection />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Built with AI · Open Source Community Spirit
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 chench. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
import NavigationBar from '@/components/navigation-bar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { useCallback, useEffect, useState } from 'react'
import Footer from "@/components/footer"
import { Home, Stack, Portfolio, Links } from '@/components/pages'
import './App.css'

type View = 'home' | 'tech' | 'portfolio' | 'links';

function App({children}: {children? : React.ReactNode}) {
  const [view, setView] = useState<View>('home');
  const handleChangeView = useCallback((nextView: View) => {
    setView(nextView);
    const target = document.getElementById(nextView);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const sectionIds: View[] = ['home', 'tech', 'portfolio', 'links'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setView(entry.target.id as View);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col">
        <Toaster />
        <NavigationBar currentView={view} onChangeView={handleChangeView} />
        <div className="sticky top-16 z-40 px-4 pt-2 sm:top-20 md:top-24 md:px-6">
          <div className="description flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Kuala Lumpur, MY
          </div>
        </div>
        <main className='flex-1 px-4 py-4 md:px-0'>
          <div className="flex-1 w-full rounded-xl bg-background/60 md:m-5 md:bg-transparent md:p-0 md:shadow-none">
            { children }
            <section id="home" className="min-h-screen scroll-mt-20">
              <Home />
            </section>
            <section id="tech" className="min-h-screen scroll-mt-20">
              <Stack />
            </section>
            <section id="portfolio" className="min-h-screen scroll-mt-20">
              <Portfolio />
            </section>
            <section id="links" className="min-h-screen scroll-mt-20">
              <Links />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

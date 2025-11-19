import NavigationBar from '@/components/navigation-bar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import Footer from "@/components/footer"
import { Home, Stack, Portfolio, Links } from '@/components/pages'
import './App.css'

type View = 'home' | 'tech' | 'portfolio' | 'links';

function App({children}: {children? : React.ReactNode}) {
  const [view, setView] = useState<View>('home');
  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'tech':
        return <Stack />;
      case 'portfolio':
        return <Portfolio />;
      case 'links':
        return <Links />;
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col overflow-hidden md:h-screen">
        <Toaster />
        <NavigationBar currentView={view} onChangeView={setView} />
        <main className='flex-1 min-h-0 px-4 py-4 md:px-0 flex flex-col'>
          <div className="flex-1 w-full rounded-xl bg-background/60 md:m-5 md:bg-transparent md:p-0 md:shadow-none">
            { children }
            <AnimatePresence mode='wait'>
              <motion.div
                key={view}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

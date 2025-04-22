"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HeartPulseIcon, HomeIcon, MenuIcon, UserIcon, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = isSignedIn ? [
    { href: "/", icon: <HomeIcon size={16} />, label: "Главная" },
    { href: "/generate-program", icon: <DumbbellIcon size={16} />, label: "Создать" },
    { href: "/profile", icon: <UserIcon size={16} />, label: "Профиль" }
  ] : [];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-sm py-2" 
          : "bg-background/60 backdrop-blur-md py-3"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-1.5 bg-primary/10 rounded-full">
            <HeartPulseIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-primary">Ritm</span>.ai
          </span>
        </Link>


        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors relative group"
            >
              <span className="text-primary group-hover:animate-pulse">{item.icon}</span>
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {isSignedIn ? (
            <>
              <Button
                asChild
                variant="outline"
                className="ml-2 border-primary/50 text-primary hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <Link href="/generate-program">Начать</Link>
              </Button>
              <div className="ml-3 hover:scale-105 transition-transform duration-200">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9"
                    }
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-primary/50 text-primary hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  Войти
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Регистрация
                </Button>
              </SignUpButton>
            </>
          )}
        </nav>

 
        <div className="md:hidden flex items-center">
          {isSignedIn && (
            <div className="mr-4">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </Button>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border pt-5 pb-6 animate-in slide-in-from-top duration-300">
          <nav className="container flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            {isSignedIn ? (
              <Button
                asChild
                className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/generate-program" onClick={closeMobileMenu}>Начать</Link>
              </Button>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Войти
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full bg-primary">
                    Регистрация
                  </Button>
                </SignUpButton>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

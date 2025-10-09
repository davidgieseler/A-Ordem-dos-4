import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-900">
      {/* Header */}
      <Header showUserInfo={false} />
      
      {/* Conteúdo Principal */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[calc(100vh-5rem)] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="brightness-0 invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="text-center sm:text-left">
            <h1 className="display-l text-primary mb-4">
              Bem-vindo ao Sistema
            </h1>
            <p className="body-m text-secondary mb-8">
              Gerencie seus personagens de forma simples e eficiente
            </p>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href="/auth"
              className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-brand-ouro-500 text-inverse gap-2 hover-bg-brand-ouro-600 h-10 sm:h-12 px-4 sm:px-5 sm:w-auto button-m"
            >
              ENTRAR / CADASTRAR
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-solid border-brand-ouro-500 brand-ouro-500 transition-colors flex items-center justify-center hover:bg-brand-ouro-500 hover:text-inverse hover:border-transparent h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto button-m"
            >
              DASHBOARD
            </Link>
          </div>
        </main>
        
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 ordem-text-muted hover:text-yellow-400 transition-colors"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
              className="brightness-0 invert opacity-60"
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 ordem-text-muted hover:text-yellow-400 transition-colors"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
              className="brightness-0 invert opacity-60"
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 ordem-text-muted hover:text-yellow-400 transition-colors"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
              className="brightness-0 invert opacity-60"
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  );
}

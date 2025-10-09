import Link from "next/link";
import Header from "@/components/Header";
import OrdemLogo from "@/components/OrdemLogo";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-900">
      {/* Header */}
      <Header showUserInfo={false} />
      
      {/* Conteúdo Principal centralizado */}
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl text-center space-y-8">
          {/* Logo */}
          <div>
            <OrdemLogo className="mx-auto" width={260} />
          </div>

          {/* Título e subtítulo */}
          <div className="space-y-3">
            <h1 className="display-l text-primary">Bem-vindo a Ordem</h1>
            <p className="body-m text-secondary">
              Gerencie campanhas, convide jogadores e mantenha suas fichas organizadas
              em um só lugar.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/auth"
              aria-label="Entrar ou Cadastrar"
              className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-brand-ouro-500 text-inverse gap-2 hover-bg-brand-ouro-600 h-12 px-6 w-full sm:w-auto button-m"
            >
              ENTRAR / CADASTRAR
            </Link>
            <Link
              href="/dashboard"
              aria-label="Ir para o Dashboard"
              className="rounded-md border border-solid border-default text-secondary transition-colors flex items-center justify-center hover:bg-surface-700 hover:text-primary h-12 px-6 w-full sm:w-auto button-m"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

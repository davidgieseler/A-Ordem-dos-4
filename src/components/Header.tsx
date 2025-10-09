"use client";
import Link from 'next/link';
import OrdemLogo from './OrdemLogo';
import { removeToken } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  showUserInfo?: boolean;
}

const Header = ({ showUserInfo = true }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    try {
      removeToken();
    } finally {
      router.push('/auth');
    }
  };

  return (
    <header className="bg-surface-800 border-b border-default px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <OrdemLogo variant="icon" width={32} />
          <span className="brand-ouro-500 body-m font-bold">
            A ORDEM DOS QUATRO
          </span>
        </Link>

        {/* User Info */}
        {showUserInfo && (
          <div className="flex items-center space-x-4 text-secondary body-s">
            <button
              onClick={handleLogout}
              className="brand-ouro-500 hover-brand-ouro-600 transition-colors label-s"
              aria-label="Sair"
            >
              SAIR
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
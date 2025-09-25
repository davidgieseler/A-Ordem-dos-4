import Link from 'next/link';
import OrdemLogo from './OrdemLogo';

interface HeaderProps {
  showUserInfo?: boolean;
  userName?: string;
}

const Header = ({ showUserInfo = true, userName = "USUARIO" }: HeaderProps) => {
  return (
    <header className="bg-surface-800 border-b border-default px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8">
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full brand-ouro-500"
            >
              <path
                d="M30 5 L30 55 M5 30 L55 30"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="30" cy="12" r="3" fill="currentColor" />
              <circle cx="30" cy="48" r="3" fill="currentColor" />
              <circle cx="12" cy="30" r="3" fill="currentColor" />
              <circle cx="48" cy="30" r="3" fill="currentColor" />
            </svg>
          </div>
          <span className="brand-ouro-500 body-m font-bold">
            A ORDEM DOS QUATRO
          </span>
        </Link>

        {/* User Info */}
        {showUserInfo && (
          <div className="flex items-center space-x-4 text-secondary body-s">
            <span className="label-s">{userName}</span>
            <span>|</span>
            <Link 
              href="/login" 
              className="brand-ouro-500 hover-brand-ouro-600 transition-colors label-s"
            >
              SAIR
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import Image from 'next/image';

type OrdemLogoProps = {
  className?: string;
  /**
   * Variante do logo
   * - "full": usa O4NBG.png (símbolo + escrita)
   * - "icon": usa O4NBG1.png (apenas símbolo)
   */
  variant?: 'full' | 'icon';
  /** Largura desejada em pixels. Altura é ajustada automaticamente mantendo proporção */
  width?: number;
  /** Alt text acessível */
  alt?: string;
  /** Priorizar carregamento em páginas acima da dobra */
  priority?: boolean;
};

const OrdemLogo = ({
  className = '',
  variant = 'full',
  width = 240,
  alt = 'A ORDEM DOS QUATRO',
  priority = false,
}: OrdemLogoProps) => {
  const src = variant === 'icon' ? '/images/O4NBG1.png' : '/images/O4NBG.png';

  // Estimar aspect ratio (ajuste se necessário de acordo com o arquivo real)
  // Supondo ~ 3:2 para full e 1:1 para icon
  const aspectRatio = variant === 'icon' ? 1 : 3 / 2;
  const height = Math.round(width / aspectRatio);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  );
};

export default OrdemLogo;
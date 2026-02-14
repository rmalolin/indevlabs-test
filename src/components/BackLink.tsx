import { Link } from 'react-router-dom';

interface BackLinkProps {
  to?: string;
  children?: React.ReactNode;
}

export function BackLink({ to = '/', children = '← Back to Projects' }: BackLinkProps) {
  return (
    <Link to={to} className="inline-block mb-6 text-blue-600 hover:text-blue-800">
      {children}
    </Link>
  );
}

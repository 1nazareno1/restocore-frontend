import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirige automáticamente a la vista de login ni bien entran a la raíz
  redirect('/login');
}
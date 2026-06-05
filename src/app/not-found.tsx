import Link from 'next/link'
import Mascot from '@/components/brand/Mascot'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-gradient-deep bg-[length:200%_200%] animate-gradient-pan text-white flex flex-col items-center justify-center px-4 text-center gap-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Mascot size={200} priority />
        <p className="text-7xl md:text-8xl font-extrabold text-gradient leading-none">404</p>
        <h1 className="text-3xl md:text-4xl font-bold">Página não encontrada</h1>
        <p className="text-blue-100 max-w-md">
          O imóvel dos seus sonhos existe — esta página, não. Vamos te levar de volta.
        </p>
        <Link href="/">
          <Button variant="white" size="lg" className="active:scale-[0.98]">
            Voltar ao início
          </Button>
        </Link>
      </div>
    </main>
  )
}

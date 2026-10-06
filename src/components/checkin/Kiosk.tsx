import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Caixa vertical da portaria, com o tablet lá dentro. Cor aproximada do RAL 7035 (Caixa 7035).
// Não afirma IP65 nem outras especificações [CONFIRMAR com a caixa real].
// O ecrã usa o fundo índigo do tablet real (#3e4f8e → #2d3d78).
export default function Kiosk({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div className={cn('kiosk relative mx-auto w-full', className)}>
      <div className="kiosk-box relative rounded-[20px] p-[7%] pb-[30%]">
        {/* Parafusos da tampa */}
        {['left-[4%] top-[3%]', 'right-[4%] top-[3%]', 'bottom-[3%] left-[4%]', 'bottom-[3%] right-[4%]'].map((pos) => (
          <span key={pos} aria-hidden="true" className={cn('kiosk-screw absolute h-2 w-2 rounded-full', pos)} />
        ))}
        <div className="rounded-[12px] bg-[#1d2233] p-[4%]">
          <div className="kiosk-screen relative aspect-[3/4] overflow-hidden rounded-[6px] px-[8%] pb-[7%] pt-[6%]">{children}</div>
        </div>
        {/* Leitor e grelha de ventilação por baixo do ecrã */}
        <span aria-hidden="true" className="kiosk-reader absolute bottom-[14%] left-1/2 h-[9%] w-[26%] -translate-x-1/2 rounded-[6px]" />
        <div aria-hidden="true" className="absolute inset-x-[30%] bottom-[5%] grid gap-[3px]">
          <span className="kiosk-slot h-[3px] rounded-full" />
          <span className="kiosk-slot h-[3px] rounded-full" />
          <span className="kiosk-slot h-[3px] rounded-full" />
        </div>
      </div>
      {label && <p className="mt-3 text-center text-small text-grafite">{label}</p>}
    </div>
  )
}

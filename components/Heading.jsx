import { orbitron } from '@/app/fonts'

export default function Heading({children}) {
  return(
    <h1 className={`font-bold font-orbitron pb-3 text-2xl ${orbitron.className}`}>
      {children}
    </h1>
  )
}
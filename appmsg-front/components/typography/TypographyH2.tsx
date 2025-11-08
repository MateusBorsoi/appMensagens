import { cn } from "@/lib/utils"

interface Props extends React.ComponentProps<'h2'> {
    text:string
}

export function TypographyH2({className, text,...props}:Props) {
  return (
    <h2 className={cn("scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0 text-primary")} {...props}>
      {text}
    </h2>
  )
}

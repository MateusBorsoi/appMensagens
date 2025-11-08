
interface Props extends React.ComponentProps<'h1'> {
    text:string
}

export function TypographyH1({text,...props}:Props) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance" {...props}>
     {text}
    </h1>
  )
}

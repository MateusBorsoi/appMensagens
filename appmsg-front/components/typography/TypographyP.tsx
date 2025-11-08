
interface Props extends React.ComponentProps<'p'> {
    text:string
}

export function TypographyP({text,...props}:Props) {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {text}
    </p>
  )
}

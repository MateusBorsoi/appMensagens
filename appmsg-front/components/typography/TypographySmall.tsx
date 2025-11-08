
interface Props extends React.ComponentProps<'small'> {
    text:string
}

export function TypographySmall({text,...props}:Props) {
  return (
    <small className="text-sm leading-none font-medium" {...props}>
      {text}
    </small>
  )
}

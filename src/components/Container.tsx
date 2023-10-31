interface IProps {
  children: React.ReactNode;
}

export default function Container({ children }: IProps) {
  return <section>{children}</section>;
}

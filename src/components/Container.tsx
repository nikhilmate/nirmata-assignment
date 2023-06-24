export default ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`container-base ${className ?? ""}`}>
      {children}
    </div>
  )
}
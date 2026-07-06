export default function LoadingSpinner({ size = 'md', full = false }) {
  const sizes = { sm: 'h-5 w-5 border-2', md: 'h-8 w-8 border-2', lg: 'h-14 w-14 border-[3px]' }
  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-primary-600 border-t-transparent`}
      role="status"
      aria-label="Loading"
    />
  )
  if (full) {
    return <div className="flex items-center justify-center py-24">{spinner}</div>
  }
  return spinner
}

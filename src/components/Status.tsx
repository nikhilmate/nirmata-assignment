function Status({ status }: { status: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full pt-20 pb-10"><p className="text-lg font-medium text-black">{ status || '' }</p></div>
  )
}

export default Status
import { Link } from "wouter"
import Header from "../components/Header"
import Status from "../components/Status"

function NotFound() {
  return (
    <>
      <Header />
      <Status
        status={
          <div className="text-center">
            <p className="text-xl text-gray-600">Page not found.</p>
            <p className="mt-4"><Link href="/" className="inline-flex px-4 py-1 btn-blue">Return to Home</Link></p>
          </div>
        }
      />
    </>
  )
}

export default NotFound
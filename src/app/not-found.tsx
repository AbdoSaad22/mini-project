import React from 'react'
import Link from 'next/link'
const NotFoundPage = () => {
  return (
      <section>
          <h1>404</h1>
          <p>Page Not Found</p>
          <Link href="/">Back To Home</Link>
    </section>
  )
}

export default NotFoundPage
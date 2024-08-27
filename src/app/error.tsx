"use client"
import React from 'react'
import Link from 'next/link'
interface ErrorPageProps {
    error: Error;
    reset: () => void;
}
const ErrorPage = (props:ErrorPageProps) => {
  return (
      <div>
          <div>Something Went Wrong</div>
          <h2>Error Message : {props.error.message}</h2>
          <button onClick={() => props.reset()}>Try Again</button>
          <Link href="/">Go To Home</Link>
    </div>
  )
}

export default ErrorPage
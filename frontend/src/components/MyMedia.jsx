import React from 'react'

function MyMedia({ tweets }) {
  const baseURL = import.meta.env.VITE_BACKEND_HOST

  return (
    <>
      {
        tweets.map(t => (
            <div className='flex flex-row items-start gap-3' >
              <img src={`${baseURL}${t.image}/`} alt="" />
            </div>

        ))

      }
    </>

  )
}

export default MyMedia
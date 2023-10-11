import React from 'react'
import Like from './Like'
import Rt from './Rt'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineMessage } from 'react-icons/ai'
import { getUserRt } from '../api/tweets'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const MyRe = ({ user }) => {
  const userId = localStorage.getItem('user_id')
  const baseURL = import.meta.env.VITE_BACKEND_HOST

  const {
    data: rt,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: 'tweets',
    queryFn: () => getUserRt(user.username)
  })
  console.log(rt)
  if(isLoading) return <Loader />
  if(isError) return toast.error(error.message) 

  return (
    <>
    {
      rt.map( t => (

  <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
    <div className="flex flex-row items-start gap-3">

      <img className="h-11 w-11 rounded-full" src={`${baseURL}{t.avatar}`} />


      <div>
        <div className="flex flex-row items-center gap-2">

          <p className="text-white font-semibold cursor-pointer hover:underline">
            {t.user}
          </p>


          <span className="text-neutral-500 text-sm">
            {new Date(10).toDateString().slice(4)}
          </span>

        </div>

          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            @{t.user}

          </span>

        <div className="text-white mt-1 text-start">
          {t.content}
        </div>

        <img src={`${baseURL}${t.image}`} />

        <div className="flex flex-row items-center mt-3 gap-10">

            <Link to={`/tweet/${t.id}`} >
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{t.parent.length}</p>
              </div>
            </Link>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
            <Rt t={t} user={userId}/>
            <p>
              {t.retweets_count}
            </p>
          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
            <Like t={t} user={userId} />
            <p>
              {t.likes_count}
            </p>
          </div>

         
        </div>
      </div>
    </div>
  </div>
      ))
    }

  </>
  )
}

export default MyRe
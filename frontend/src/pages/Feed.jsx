import React, { useEffect } from 'react'
import { logout } from '../api/user'
import { getTweets } from '../api/tweets'
import { Link } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import Loader from '../components/Loader'
import { toast } from 'react-hot-toast'
import AddTweet from '../components/AddTweet'
import { AiOutlineMessage } from 'react-icons/ai'
import Like from '../components/Like'
import Rt from '../components/Rt'

function Feed() {
  const { ref, inView } = useInView()
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPega,
    fetchNextPage,
    hasNextPage,

  } = useInfiniteQuery(
    ['tweets'],
    getTweets,
    {
      getNextPageParam: (lastPage) => lastPage.meta.next
    }
  )
  const baseURL = import.meta.env.VITE_BACKEND_HOST
  
    useEffect(() => {
      if(inView){
        fetchNextPage()
      }
    }, [inView])

    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message)
  return (
      <>
  
        <div className="border-b-[1px] border-neutral-800 p-5">
          <div className="flex flex-row items-start gap-3">
  
            <div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-white font-semibold text-xl">
                  Home
                </p>
              </div>
            </div>
  
          </div>
        </div>

        <AddTweet />
  
      {data?.pages.map(page => (
  
        <div key={page.meta.page}>
          {page.data.map(t => (
  
              <>
              <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                <div className="flex flex-row items-start gap-3">
                  <img className="h-11 w-11 rounded-full" src={`${baseURL}${t.avatar}`} />
  
                  <div>
                    <div className="flex flex-row items-center gap-2">
  
                      <p className="text-white font-semibold cursor-pointer hover:underline">
                        <Link to={`${t.user}`}>
                          {t.user}
                        </Link>
                      </p>
  
                      <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                        @{t.user}
                      </span>
  
                      <span className="text-neutral-500 text-sm">
                        {new Date(t.created_at).toDateString().slice(4)}
                      </span>
  
                    </div>
  
                    <Link to={`tweet/${t.id}`}>
  
                      <div className="text-white mt-1 text-start">
                        {t.content}
                      </div>
  
                    <img src={t.image} />
                    </Link>
  
                    <div className="flex flex-row items-center mt-3 gap-10">
                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
  
                        <Link to={`tweet/${t.id}`}>
  
                          <AiOutlineMessage size={20} />
                        </Link>
                        {/* <Like t={t} /> */}

                        <p>
                          {t.parent.length}
                        </p>
  
                      </div>
  
                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                        <Rt t={t} />
                        <p>
                          {t.retweets_count}
                        </p>
                      </div>
  
  
                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
  
                        <Like t={t} />
  
                        <p>
                          {t.likes_count}
                        </p>
                      </div>
  
  
                    </div>
                  </div>
  
                </div>
              </div>
  
                
              {/* scroll infin1ito */}
                  {!isLoading && data.pages.length === 0 && <p> No results</p>}
                  {!isLoading && data.pages.length > 0 && hasNextPage && (
                    <div key={t.created_at} ref={ref}  >
                      {isLoading || isFetchingNextPega ? <Loader /> : null}
                    </div>
                  )}

              
              </>
  
          ))}
        </div>
      ))}
      </>
  
    )
  }
  
  export default Feed
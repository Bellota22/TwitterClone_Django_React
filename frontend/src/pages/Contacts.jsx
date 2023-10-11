import { Link } from 'react-router-dom'
import { userProfile } from "../api/user"
import { useQuery } from '@tanstack/react-query'

function Contacts() {
  const  username = localStorage.getItem('username')
  const baseURL = import.meta.env.VITE_BACKEND_HOST

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey:['contacts'],
    queryFn: () => userProfile(username)
  })

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">
                Contacts 
              </p>
            </div>
          </div>

        </div>
      </div>

        
        
      {data?.followed_usernames?.map((contact) => (

        
        <div key={contact.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <Link to={`/chat/${contact.username}`}>
              <div className="flex flex-row items-start gap-3">

                <img className="h-11 w-11 rounded-full" src={`${baseURL}${contact.avatar}`} />

                <div>
                  <div className="flex flex-row items-center gap-2">

                    <p className="text-white font-semibold cursor-pointer hover:underline">
                    {contact.username}

                    </p>


                  </div>


            </div>
          </div>
          </Link>
          </div>
      ))}
      </>
  )
}

export default Contacts
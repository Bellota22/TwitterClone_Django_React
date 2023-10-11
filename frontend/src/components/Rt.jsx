import React from 'react'
import { AiOutlineRetweet } from 'react-icons/ai'
import { useQueryClient, useMutation, QueryClient } from '@tanstack/react-query'
import { rt } from '../api/tweets'

function Rt({ t, user}) {
    const queryClient = useQueryClient()
    const rtMutation = useMutation({
        mutationFn: rt,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const found = t.retweeted.some((key,index) =>{
        if(key == user){
            return true
        } else {
            return false
        }

    })
    return (
        <>
            <AiOutlineRetweet
                onClick={() => rtMutation.mutate(t.id)}
                {...t.iretweets || found ? {color: 'green'} : {color: 'white'} }
                size={20}
            />
        </>
    )
}

export default Rt
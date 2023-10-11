import React from 'react'
import { addComment } from '../api/tweets'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from './Loader'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'

function AddComment({ tweet }) {
    const queryClient = useQueryClient()
    const avatar = localStorage.getItem('avatar')

    const addCommentMutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries('comments')
            toast.success('Posted!')
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const baseURL = import.meta.env.VITE_BACKEND_HOST

    const iniV= () => ({
        body: ''
    })

    const formik = useFormik({
        initialValues: iniV(),
        onSubmit:(values, {resetForm}) => {
            addCommentMutation.mutate({...values, id: tweet.id})
            resetForm()
        }
    
    
    })

    if (addCommentMutation.isLoading) return <Loader />

  return (
    <div
    className="
    border-b-[1px] 
    border-neutral-800 
    p-5 
    ">

    <form onSubmit={formik.handleSubmit} >
      <div className='flex gap-3 w-full border-b-[1px] 
        border-neutral-800 p-3'>

        <img src={`${baseURL}${avatar}`} className='h-14 w-14 rounded-full ' />

        <input 
          type="text" name="body" onChange={formik.handleChange} value={formik.values.body} 
          className='bg-transparent grow outline-none ' placeholder="Add a reply..." />


      </div>

      <div className="flex justify-end mt-4">

        <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
          Reply
        </button>

      </div>
    </form>

  </div>
  )
}

export default AddComment
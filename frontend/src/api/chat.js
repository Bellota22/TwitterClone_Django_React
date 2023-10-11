import { authAxios } from "./useAxios";

export const getChat = async (username) => {
    const res = await authAxios.get(`/chat/canal/${username}/`)
    return res.data
}


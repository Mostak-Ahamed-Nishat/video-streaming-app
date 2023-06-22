import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000'
    }, ),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            keepUnusedDataFor: 600 //Will cache the data till 600 seconds
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),
        //title_like=js&title_like=react
        getRelatedVideos: builder.query({
            query: ({
                videoId: id,
                title
            }) => {
                let tags = title.split(' ')
                let likes = tags.map(tag => `title_like=${tag}`)
                let queryString = `/videos?${likes.join('&')}&_limit=4`
                return queryString
            }
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: `/videos`,
                method: 'POST',
                body: data,
            })
        })
    })
})

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideosQuery,
    useAddVideoMutation,

} = apiSlice
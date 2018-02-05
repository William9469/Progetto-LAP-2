import { LOADING } from './types'

export const isLoading = (payload) => {
    return ({type: LOADING , isLoading: payload.isLoading})
}

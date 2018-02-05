import {
    OPEN_MAP_MODAL,
    CLOSE_MAP_MODAL
} from './types';

export const openMapModal = () => ({
    type: OPEN_MAP_MODAL,
    payload: true
})

export const closeMapModal = () => ({
    type: CLOSE_MAP_MODAL,
    payload: false
})
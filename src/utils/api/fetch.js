import axios from "axios";

export const fetchApi = (q, page, per_page) => {
 return  axios('https://pixabay.com/api/', {params: {
        key: '30637965-aec73b4643c7ad5fd7fc023cc',
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page,
    }})
}
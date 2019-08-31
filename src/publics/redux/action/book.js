import axios from 'axios';

export const getBook = () => {
    return {
        type: 'GET_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/all`)
    }
}

export const getMoreBook = (page) => {
    return {
        type: 'GET_MORE_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/all?page=${page}`)
    }
}

export const postBook = (data) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post(`https://api-library-abdi.herokuapp.com/book`, data)
    }
}

export const detailBook = (bookid) => {
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/${bookid}`, {
            headers: {
                'authorization': 'ThisIsHeader'
            }
        })
    }
}

export const deleteBook = (bookid) => {
    return {
        type: 'DELETE_BOOK',
        payload: axios.delete(`https://api-library-abdi.herokuapp.com/book/${bookid}`)
    }
}

export const updateBook = (bookid, book_name, writter, location, image, id_category, description, status) => {
    console.log("update: ", bookid)
    console.log("BOOK: ", book_name)
    console.log("WRITTER: ", writter)
    console.log("LOCATION: ", location)
    console.log("image: ", image)
    console.log("category: ", id_category)
    console.log("description: ", description)

    return {
        type: 'UPDATE_BOOK',
        payload: axios.patch(`https://api-library-abdi.herokuapp.com/book/${bookid}/`, { book_name: book_name, writter: writter, location: location, image: image, id_category: id_category, description: description, status: status })
    }
}

export const searchBook = (seacrh) => {
    console.log("seacrh name:", seacrh)
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`https://api-library-abdi.herokuapp.com/book/?search=${seacrh}`)
    }
}

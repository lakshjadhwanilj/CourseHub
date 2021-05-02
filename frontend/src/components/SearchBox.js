import React, { useState } from 'react'
// Components
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                placeholder='Search Products...'
                className='mr-sm-2 ml-lg-5 searchbox'
                onChange={e => setKeyword(e.target.value)}
            >

            </Form.Control>
            <Button
                type='submit'
                variant='outline-warning'
                className='searchBtn btn-xs-block'
            >
                SEARCH
            </Button>
        </Form>
    )
}

export default SearchBox

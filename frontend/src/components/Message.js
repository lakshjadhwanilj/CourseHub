import React from 'react'
// Components
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
    return (
        <Alert className='my-2' variant={ variant }>
            { children }
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
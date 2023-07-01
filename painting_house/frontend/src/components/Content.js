import { useState, useEffect } from 'react'

const Profile = () => {
    return (
        <div>
            <div>Profile nickname</div>
            <div>Profile image</div>
        </div>
    )
}

const Content = () => {
    const [likes, setLikes] = useState('')

    useEffect(() => {
        setLikes(101)
    }, [likes])

    return (
        <div>
            <div>category</div>
            <div>title</div>
            <div>images</div>
            <div>description</div>
            <Profile />
            <div>{likes}</div>
        </div>
    )
}

export default Content

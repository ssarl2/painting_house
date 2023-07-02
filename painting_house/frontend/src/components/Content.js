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
            <table border='1'>
                <tr>
                    <td>images</td>
                    <td>
                        <table border='1'>
                            <div>
                                description
                                <div>tags</div>
                            </div>
                            <tr>
                                <td>
                                    <Profile />
                                </td>
                                <td>
                                    {likes}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Content

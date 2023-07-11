import { useState, useEffect, useRef } from 'react'

const PostDescriptionAndTags = ({ postDescription, postTags }) => {
    const [descAndTags, setDescAndTags] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [visibleMore, setVisibleMore] = useState(false)
    const descAndTagsBoxRef = useRef(null)
    const maxLength = 150

    useEffect(() => {
        const tags = postTags.map(tag => `#${tag}`).join(' ')
        setDescAndTags(`${postDescription} ${tags}`)
    }, [postDescription, postTags])

    useEffect(() => {
        if (descAndTags.length > maxLength) {
            setVisibleMore(true)
        }
    }, [descAndTags])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const trimText = () => {
        if (isExpanded) {
            return descAndTags
        } else {
            return descAndTags.slice(0, maxLength)
        }
    }

    return (
        <div className='postDescriptionAndTagsBox' ref={descAndTagsBoxRef}>
            {trimText()}
            {!isExpanded && (
                <button className={visibleMore ? 'postTextExpendingButton' : 'hidePostTextExpendingButton'} onClick={toggleExpand}>
                    ...more
                </button>
            )}
            {isExpanded && (
                <button className='postTextExpendingButton' onClick={toggleExpand}>
                    ...less
                </button>
            )}
        </div>
    )
}

export default PostDescriptionAndTags
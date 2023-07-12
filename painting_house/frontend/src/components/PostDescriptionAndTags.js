import { useState, useEffect, useRef } from 'react'

const PostDescriptionAndTags = ({ postDescription, postTags }) => {
    const [descAndTags, setDescAndTags] = useState('')
    const [calcText, setCalcText] = useState('')
    const [maxLength, setMaxLength] = useState(0)
    const [isCalcDone, setIsCalcDone] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [visibleMore, setVisibleMore] = useState(false)
    const descAndTagsBoxRef = useRef(null)

    useEffect(() => {
        const tags = postTags.map(tag => `#${tag}`).join(' ')
        setDescAndTags(`${postDescription} ${tags}`)
        setCalcText(`${postDescription}`)
    }, [postDescription, postTags])

    useEffect(() => {
        if (descAndTags.length > maxLength) {
            setVisibleMore(true)
        }
    }, [descAndTags])

    useEffect(() => {
        calcMaxLength()
    }, [calcText])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const calcMaxLength = () => {
        const reCalcRate = 10
        if (descAndTagsBoxRef.current.scrollHeight > descAndTagsBoxRef.current.offsetHeight) {
            setCalcText(calcText.slice(0, calcText.length - reCalcRate))
            setIsCalcDone(false)
        }
        else {
            setMaxLength(calcText.length)
            if (calcText.length !== 0)
                setIsCalcDone(true)
        }
    }

    const trimText = () => {
        const expendingButtonLength = 10
        if (isExpanded) {
            return descAndTags
        } else {
            return descAndTags.slice(0, maxLength - expendingButtonLength)
        }
    }

    return (
        <div className='postDescriptionAndTagsBox' ref={descAndTagsBoxRef}>
            {!isCalcDone && <div>{calcText}</div>}
            {isCalcDone &&
                <div>
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
            }
        </div>
    )
}

export default PostDescriptionAndTags
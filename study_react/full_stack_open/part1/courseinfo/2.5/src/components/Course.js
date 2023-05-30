const Header = ({ courseName }) => {
    return (
        <div>
            <h1>{courseName}</h1>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {
                parts.map(part => (
                    <p key={part.id}>
                        {part.name} {part.exercises}
                    </p>
                ))
            }
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course
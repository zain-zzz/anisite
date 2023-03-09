import Link from 'next/link'

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Oh no!</h1>
            <h2>Seems that page couldn't be found</h2>
            <p>Go back to <Link href='/'>Home</Link></p>
        </div>
    )
}

export default NotFound


const styles = {
    xl: "mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white", 
    "2xl": "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white",
}

export const Heading = ({ title, size }) => {
    const className = styles[size]
    return (
        <h5 className={className}>
            {title}
        </h5>
    )
}
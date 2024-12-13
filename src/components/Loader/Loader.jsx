import styles from './Loader.module.css'

function Loader() {
    return (
        <>
            {/* <div
                className="w-6 h-6 border-4 border-t-red-500 border-b-yellow-500 border-r-green-400 border-gray-300 rounded-full animate-spin"
            ></div> */}
            <div className={styles.loader}></div>
        </>
    )
}

export default Loader

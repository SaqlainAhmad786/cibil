function Loader() {
    return (
        <>
            <div className='bg-gray-600 backdrop-blur-md z-[500] bg-opacity-30 fixed top-0 left-0 w-full h-[100dvh] flex justify-center items-center overflow-hidden'>
                <l-grid
                    size="80"
                    speed="2"
                    color="#3c72fc"
                ></l-grid>
            </div>
        </>
    )
}

export default Loader

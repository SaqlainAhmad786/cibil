import { useEffect, useState } from "react";
import './Widget.css'

function Graph({ percentage, options }) {
    const [rotateValue, setRotateValue] = useState([-127, 100])

    useEffect(() => {
        let newVal = [-127 + (1.7 * percentage), 100 + (1.5 * percentage)]
        setRotateValue(newVal)
    }, [percentage])

    return (
        <>
            <div className='graph'>
                <div className='coloredDisplay_wrap'>
                    <svg width="0" height="0" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="clipping" clipPathUnits="objectBoundingBox" transform="scale(0.00250626566 0.00250626566)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M198.5 72C132.679 72 78.5994 122.271 72.5606 186.512C71.9404 193.111 66.6274 198.5 60 198.5H12C5.37258 198.5 -0.0376851 193.114 0.356856 186.498C6.56154 82.4581 92.9012 0 198.5 0C304.099 0 390.438 82.4581 396.643 186.498C397.038 193.114 391.627 198.5 385 198.5H337C330.373 198.5 325.06 193.111 324.439 186.512C318.401 122.271 264.321 72 198.5 72Z" fill="black" />
                            </clipPath>
                        </defs>
                    </svg>
                    <svg width="0" height="0" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <clipPath id="bgClipping" clipPathUnits="objectBoundingBox" transform="scale(0.0023640661938 0.00250626566)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 211H43H63.7154H359.285H371H410C417.18 211 423.042 205.164 422.605 197.998C415.873 87.5214 323.932 0 211.5 0C99.0684 0 
    7.12695 87.5214 0.394988 197.998C-0.0416884 205.164 5.82031 211 13 211Z" fill="black" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className='coloredDisplay'>
                        <svg style={{ transform: `rotate(${rotateValue[0]}deg)` }} id='test' width="100%" height="100%" viewBox="0 0 399 399" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="Gradient1" gradientTransform="rotate(-25)">
                                    <stop id="stop1" offset="0%" stopColor="#3c72fc" />
                                    <stop id="stop2" offset="100%" stopColor="#3c72fc50" />
                                </linearGradient>
                                <linearGradient id="Gradient2" gradientTransform="rotate(120)">
                                    <stop id="stop1" offset="0%" stopColor="#586084" />
                                    <stop id="stop2" offset="100%" stopColor="#343D60" />
                                </linearGradient>
                            </defs>
                            <path className='leftCurve' fillRule="evenodd" clipRule="evenodd" d="M105.598 112.649C60.9264 160.99 61.1432 234.825 104.225 282.86C108.651 287.794 109.003 295.354 104.505 300.221L71.9279 335.474C67.4299 340.341 59.8024 340.659 55.2114 335.879C-16.9874 260.712 -18.949 141.338 52.7197 63.7836C124.388 -13.7709 243.545 -21.2177 324.166 44.8364C329.293 49.0366 329.577 56.6655 325.079 61.5328L292.502 96.7853C288.004 101.653 280.44 101.897 275.173 97.8741C223.894 58.7091 150.27 64.3085 105.598 112.649Z" fill="black" />
                            <path className='rightCurve' fillRule="evenodd" clipRule="evenodd" d="M293.116 285.459C337.666 237.006 337.263 163.171 294.06 115.245C289.623 110.322 289.251 102.763 293.737 97.8848L326.225 62.5503C330.711 57.6717 338.337 57.3345 342.94 62.1026C415.328 137.088 417.591 256.456 346.118 334.191C274.645 411.926 155.507 419.673 74.7195 353.822C69.5824 349.635 69.2795 342.007 73.7651 337.128L106.253 301.794C110.739 296.915 118.302 296.652 123.579 300.661C174.957 339.697 248.566 333.912 293.116 285.459Z" fill="red" />
                        </svg>
                    </div>
                </div>
                <div className='dial'>
                    <svg className='dial_pointer' style={{ transform: `rotate(${rotateValue[1]}deg)` }} width="41" height="53" viewBox="0 0 41 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5 0C9.45488 0 0.625 8.82988 0.625 19.875C0.625 23.6947 1.76367 26.6449 3.74082 29.6365L18.409 51.8924C18.8541 52.5652 19.6201 53 20.5 53C21.3799 53 22.1563 52.5549 22.591 51.8924L37.2592 29.6365C39.2363 26.6449 40.375 23.6947 40.375 19.875C40.375 8.82988 31.5451 0 20.5 0Z" fill="white" />
                        <path d="M20.5402 1.92221C10.6963 1.92221 2.82669 9.79182 2.82669 19.6357C2.82669 23.0401 3.84153 25.6694 5.60366 28.3357L18.6766 48.1712C19.0733 48.7708 19.756 49.1583 20.5402 49.1583C21.3244 49.1583 22.0164 48.7616 22.4038 48.1712L35.4768 28.3357C37.2389 25.6694 38.2538 23.0401 38.2538 19.6357C38.2538 9.79182 30.3842 1.92221 20.5402 1.92221ZM20.5402 29.4705C15.1062 29.4705 10.6963 25.0605 10.6963 19.6173C10.6963 14.1741 15.1062 9.76414 20.5402 9.76414C25.9742 9.76414 30.3842 14.1741 30.3842 19.6173C30.3842 25.0605 25.9742 29.4705 20.5402 29.4705Z" fill="#576085" />
                    </svg>
                </div>
            </div>
            <div className='legend'>
                <LegendOption option={options} value={percentage} color='#3c72fc' unit='%' />
                {/* <LegendOption option={options[1]} value={100 - percentage} color='#586084' unit='%' /> */}
            </div>
        </>
    );
}

function LegendOption({ option, color, value, unit }) {
    return (
        <section className='legend_option'>
            <div className='option_title'>
                <div className='option_mark' style={{ backgroundColor: `${color}` }}></div>
                {option}
            </div>
            <div className='option_value'>
                {value}{unit}
            </div>
        </section>
    )
}

function Widget({ children }) {
    return (
        <article className='widget'>
            <section className='widget_body'>
                {children}
            </section>
        </article>
    );
}

export default Widget
export { Graph }

import './promoSlider.scss'

import { useState, useRef, useEffect, useMemo } from 'react'
import changeSlideFunctionCreator from '../../utils/changeSlideFunctionCreator'

interface ContentDB {
    src: string
    alt: string
    id: number
}

const sliderContentFromDB: ContentDB[] = [
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3248745,
    },
    {
        src: './contentDB/imgs/sliderContent/slide2.jpg',
        alt: 'fdsfsdf',
        id: 324397705,
    },
    {
        src: './contentDB/imgs/sliderContent/slide3.jpg',
        alt: 'fdsfsdf',
        id: 3243256645,
    },
    {
        src: './contentDB/imgs/sliderContent/slide1.jpg',
        alt: 'fdsfsdf',
        id: 3243745532,
    },
    {
        src: './contentDB/imgs/sliderContent/slide2.jpg',
        alt: 'fdsfsdf',
        id: 3243033534,
    },
    {
        src: './contentDB/imgs/sliderContent/slide3.jpg',
        alt: 'fdsfsdf',
        id: 3243743332,
    },
    {
        src: './contentDB/imgs/sliderContent/slide2.jpg',
        alt: 'fdsfsdf',
        id: 32430334,
    },
]

const PromoSlider = () => {
    const animationTimeMilliseconds = 900
    const [sliderPosition, setSliderPosition] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sliderChangeInterval = setInterval(() => {
            if (isAnimating) {
                setTimeout(
                    () => onChangeSlide('next'),
                    animationTimeMilliseconds
                )
            }
            onChangeSlide('next')
        }, 4000)

        return () => {
            clearInterval(sliderChangeInterval)
        }
    }, [isAnimating])

    const onChangeSlide = changeSlideFunctionCreator(
        sliderRef,
        sliderPosition,
        setSliderPosition,
        isAnimating,
        setIsAnimating,
        sliderContentFromDB.length,
        900
    )

    const onBuildSliderImage = (data: ContentDB[]) => {
        const slides = data.map((slide, index) => {
            const { src, alt } = slide
            return <img key={index} src={src} alt={alt} />
        })
        return (
            <div ref={sliderRef}>
                {slides.map((slide, index) => (
                    <div
                        className={`slider_images_image ${
                            index === sliderPosition ? '' : 'hide'
                        }`}
                        key={index}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        )
    }

    const onBuildSliderDots = (data: ContentDB[]) => {
        return (
            <div className="slider_dots">
                {data.map((slide, num) => {
                    return (
                        <span
                            key={slide.id}
                            className={`slider_dots_item ${
                                num === sliderPosition
                                    ? 'slider_dots_item_active'
                                    : null
                            }`}
                            onClick={() => {
                                if (num > sliderPosition)
                                    onChangeSlide('next', num)
                                else if (num < sliderPosition)
                                    onChangeSlide('prev', num)
                                else return
                            }}
                        ></span>
                    )
                })}
            </div>
        )
    }
    const sliderImages = useMemo(
        () => onBuildSliderImage(sliderContentFromDB),
        [sliderContentFromDB]
    )
    return (
        <section className="slider">
            <div className="container">
                <div className="slider_wrapper">
                    <div className="slider_images">{sliderImages}</div>

                    <div className="slider_btn">
                        <div
                            className="slider_btn_prev"
                            onClick={() => onChangeSlide('prev')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                        <div
                            className="slider_btn_next"
                            onClick={() => onChangeSlide('next')}
                        >
                            <img
                                src="./icons/system/arrowBlue.svg"
                                alt="prev"
                            />
                        </div>
                    </div>
                    {onBuildSliderDots(sliderContentFromDB)}
                </div>
            </div>
        </section>
    )
}

export default PromoSlider

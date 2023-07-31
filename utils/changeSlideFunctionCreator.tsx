const changeSlideFunctionCreator = (
    sliderRef: React.RefObject<HTMLDivElement>,
    sliderPosition: number,
    setSliderPosition: React.Dispatch<React.SetStateAction<number>>,
    isAnimating: boolean,
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
    sliderContentLength: number,
    animationTimeMilliseconds: number
) => {
    return (move: 'prev' | 'next', choisedPosition?: number) => {
        if (isAnimating) return

        setIsAnimating(true)
        if (move === 'next') {
            const newPosition = choisedPosition
                ? choisedPosition
                : sliderPosition + 1 >= sliderContentLength
                ? 0
                : sliderPosition + 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderPosition] as HTMLElement
                const showingElement = children[newPosition] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        const hidingElement = children[i] as HTMLElement
                        hidingElement.classList.remove(
                            'showSlideRight',
                            'hideSlideLeft',
                            'hideSlideRight',
                            'showSlideLeft'
                        )
                        hidingElement.classList.add('hide')
                    }
                    showingElement.classList.remove('hide')
                    hidingElement.classList.remove('hide')
                    showingElement.classList.add('showSlideRight')
                    hidingElement.classList.add('hideSlideLeft')
                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
            }
        } else if (move === 'prev') {
            const newPosition =
                typeof choisedPosition === 'number'
                    ? choisedPosition
                    : sliderPosition - 1 < 0
                    ? sliderContentLength - 1
                    : sliderPosition - 1

            const children = sliderRef.current?.children

            if (children instanceof HTMLCollection) {
                const hidingElement = children[sliderPosition] as HTMLElement
                const showingElement = children[newPosition] as HTMLElement
                if (hidingElement && showingElement) {
                    for (let i = 0; i < children.length; i++) {
                        const hidingElement = children[i] as HTMLElement
                        hidingElement.classList.remove(
                            'showSlideRight',
                            'hideSlideLeft',
                            'hideSlideRight',
                            'showSlideLeft'
                        )
                        hidingElement.classList.add('hide')
                    }
                    showingElement.classList.remove('hide')
                    hidingElement.classList.remove('hide')
                    showingElement.classList.add('showSlideLeft')
                    hidingElement.classList.add('hideSlideRight')

                    setSliderPosition(
                        (sliderPosition) => (sliderPosition = newPosition)
                    )
                }
            }
        }
        setTimeout(() => setIsAnimating(false), animationTimeMilliseconds)
    }
}

export default changeSlideFunctionCreator

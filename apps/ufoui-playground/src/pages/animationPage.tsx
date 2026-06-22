import React, { useEffect, useMemo } from 'react';

import {
    Article,
    cn,
    Content,
    ControlStyle,
    Div,
    Flex,
    getAnimationClass,
    getAnimationList,
    getMotionStyleClass,
    Grid,
    H1,
    useAnimate,
} from '@ufoui/core';

const OPEN_DURATION = 5000;

const AnimationPage = () => {
    const animations = useMemo(() => getAnimationList(), []);
    const { idle, animate, animating, animationVars, closing } = useAnimate({
        t1: OPEN_DURATION,
        initial: 'open',
    });

    const style = ControlStyle(animationVars);
    style.bg(closing ? 'success' : 'error');
    style.text.on(closing ? 'success' : 'error');

    useEffect(() => {
        if (!animating && !idle) {
            animate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animating]);

    return (
        <Article>
            <H1>Animations</H1>
            <Content>
                <Flex gap={20} wrap>
                    {animations.map(key => {
                        const animationClass = getAnimationClass(key);

                        return (
                            <Grid color="surfaceDim" key={key} placeItems="center">
                                {key}
                                {/* TODO[tailwind]: brak propsa overflow w BoxBase — overflow przez style */}
                                <Flex
                                    alignItems="center"
                                    height={144}
                                    justifyContent="center"
                                    style={{ overflow: 'hidden' }}
                                    width={144}>
                                    {animating && (
                                        <Grid
                                            className={animationClass}
                                            height={128}
                                            placeItems="center"
                                            style={style.get()}
                                            width={128}>
                                            {closing ? 'Closing' : 'Opening'}
                                        </Grid>
                                    )}
                                </Flex>
                            </Grid>
                        );
                    })}
                </Flex>
                <Div py={16}>Expressive</Div>
                <Flex gap={20} wrap>
                    {animations.map(key => {
                        const animationClass = getAnimationClass(key);

                        return (
                            <Grid color="surfaceDim" key={key + 'exp'} placeItems="center">
                                {key}
                                {/* TODO[tailwind]: brak propsa overflow w BoxBase — overflow przez style */}
                                <Flex
                                    alignItems="center"
                                    height={144}
                                    justifyContent="center"
                                    style={{ overflow: 'hidden' }}
                                    width={144}>
                                    {animating && (
                                        <Grid
                                            className={cn(animationClass, getMotionStyleClass('expressive'))}
                                            height={128}
                                            placeItems="center"
                                            shape="round"
                                            style={style.get()}
                                            width={128}>
                                            {closing ? 'Closing' : 'Opening'}
                                        </Grid>
                                    )}
                                </Flex>
                            </Grid>
                        );
                    })}
                </Flex>
            </Content>
        </Article>
    );
};

export default AnimationPage;

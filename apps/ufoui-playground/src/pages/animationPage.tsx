import React, { useEffect, useMemo } from 'react';

import {
  Article,
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
          {animations.map((key) => {
            const animationClass = getAnimationClass(key);

            return (
              <Grid color="surfaceDim" key={key} placeItems="center">
                {key}
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden">
                  {animating && (
                    <Grid
                      className={'h-32 w-32 bg-black ' + animationClass}
                      placeItems="center"
                      style={style.get()}
                    >
                      {closing ? 'Closing' : 'Opening'}
                    </Grid>
                  )}
                </div>
              </Grid>
            );
          })}
        </Flex>
        <Div py={16}>Expressive</Div>
        <Flex gap={20} wrap>
          {animations.map((key) => {
            const animationClass = getAnimationClass(key);

            return (
              <Grid color="surfaceDim" key={key + 'exp'} placeItems="center">
                {key}
                <div className="flex h-36 w-36 items-center justify-center overflow-hidden">
                  {animating && (
                    <Grid
                      className={[
                        'h-32 w-32 bg-black',
                        animationClass,
                        getMotionStyleClass('expressive'),
                      ].join(' ')}
                      placeItems="center"
                      shape="round"
                      style={style.get()}
                    >
                      {closing ? 'Closing' : 'Opening'}
                    </Grid>
                  )}
                </div>
              </Grid>
            );
          })}
        </Flex>
      </Content>
    </Article>
  );
};

export default AnimationPage;

import { Article, Content, Div, Grid, Spinner } from '@ufoui/core';

const SpinnerPage = () => {
  const sizeBig = 'w-[100px] h-[100px]';
  const sizeSmall = 'w-[24px] h-[24px]';
  return (
    <Article>
      <h1>Spinners</h1>
      <Content>
        <Grid cols={8} gap={24}>
          <Div className={sizeSmall}>
            <Spinner variant="circular" />
          </Div>
          <Div className={sizeSmall}>
            <Spinner variant="bars" />
          </Div>
          <Div className={sizeSmall}>
            <Spinner variant="dots" />
          </Div>
          <Div className={sizeSmall}>
            <Spinner variant="bars2" />
          </Div>
          <Div className={sizeSmall}>
            <Spinner variant="ring" />
          </Div>

          <Div className={sizeSmall}>
            <Spinner variant="orbit" />
          </Div>
          <Div className={sizeSmall}>
            <Spinner variant="arc" />
          </Div>

          <Div className={sizeSmall}>
            <Spinner variant="stepBar" />
          </Div>

          <Div className={sizeBig}>
            <Spinner variant="circular" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="bars" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="dots" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="bars2" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="ring" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="orbit" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="arc" />
          </Div>
          <Div className={sizeBig}>
            <Spinner variant="stepBar" />
          </Div>
        </Grid>
      </Content>
    </Article>
  );
};

export default SpinnerPage;

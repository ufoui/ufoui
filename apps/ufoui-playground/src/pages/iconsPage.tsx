import { CSSProperties, isValidElement, useState } from 'react';

import * as ufoui from '@ufoui/core';
import { Article, Aside, Checkbox, Content, Div, Flex, H1, Stack } from '@ufoui/core';

const icons = Object.entries(ufoui).filter(([name, icon]) => name.endsWith('Icon') && isValidElement(icon));

export const IconsPage = () => {
    const [large, setLarge] = useState(false);

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Icons</H1>
                <Flex gap={12} style={{ '--uui-icon-size': large ? '2.5rem' : '1.5rem' } as CSSProperties} wrap>
                    {icons.map(([name, icon]) => (
                        <Stack alignItems="center" color="surfaceDim" gap={8} key={name} p={12} width={150}>
                            <Div className="uui-icon">{icon}</Div>
                            <Div>{name}</Div>
                        </Stack>
                    ))}
                </Flex>
            </Content>
            <Aside>
                <Checkbox
                    checked={large}
                    density="dense"
                    label="Large icons"
                    onChange={e => {
                        setLarge(e.target.checked);
                    }}
                />
            </Aside>
        </Article>
    );
};

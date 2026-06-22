import { MdAdd } from 'react-icons/md';

import { Article, Button, Content, Grid, H1, H2, Section, Tooltip, TooltipProps } from '@ufoui/core';

interface TooltipStyle extends Omit<TooltipProps, 'title' | 'size'> {
    label?: string;
    value?: string;
    title?: string;
    size?: string;
}

const badgePosition: TooltipStyle[] = [
    { align: 'topLeft', value: '1' },
    { align: 'topCenter', value: '1' },
    { align: 'topRight', value: '1' },
    { align: 'centerLeft', value: '1' },
    { align: 'center', value: '1' },
    { align: 'centerRight', value: '1' },
    { align: 'bottomLeft', value: '1' },
    { align: 'bottomCenter', value: '1' },
    { align: 'bottomRight', value: '1' },
];

const badgeSizeConst: TooltipStyle[] = [
    { size: 'small', value: '1', label: 'Small' },
    { size: 'medium', value: '1', label: 'Medium' },
    { size: 'large', value: '1', label: 'Large' },
];

export const TooltipPage = () => {
    return (
        <Article direction="row" fullWidth>
            <Content alignItems="start" gap={24} p={16}>
                <H1>Tooltip</H1>
                <Section alignItems="start" gap={12}>
                    <H2>Tooltip position</H2>
                    <Grid cols={3} gap={8}>
                        {badgePosition.map(s => (
                            <Tooltip align={s.align} key={s.align} title={`Tooltip ${s.align?.toString()}`}>
                                <Button filled icon={<MdAdd />} />
                            </Tooltip>
                        ))}
                    </Grid>
                </Section>
            </Content>
        </Article>
    );
};

//

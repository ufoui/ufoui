import { useState } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdSchedule, MdWarning } from 'react-icons/md';

import {
    Article,
    Aside,
    Content,
    ElementSize,
    Flex,
    H1,
    H2,
    P,
    SemanticColor,
    Section,
    Status,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const colors: SemanticColor[] = ['success', 'warning', 'error', 'info', 'primary', 'secondary', 'tertiary'];

export const StatusPage = () => {
    const [color, setColor] = useState<SemanticColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);

    const shared = {
        color: color ?? undefined,
        size: size ?? undefined,
    };

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Status</H1>

                <Section gap={12}>
                    <H2>Soft (default)</H2>
                    <Flex gap={8} wrap>
                        {colors.map(c => (
                            <Status key={c} {...shared} color={c} label={c.charAt(0).toUpperCase() + c.slice(1)} />
                        ))}
                        <Status {...shared} label="No color" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Filled</H2>
                    <Flex gap={8} wrap>
                        {colors.map(c => (
                            <Status
                                key={c}
                                {...shared}
                                color={c}
                                label={c.charAt(0).toUpperCase() + c.slice(1)}
                                variant="filled"
                            />
                        ))}
                        <Status {...shared} label="No color" variant="filled" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>With leading icon</H2>
                    <Flex gap={8} wrap>
                        <Status {...shared} color="success" label="Published" leading={<MdCheckCircle />} />
                        <Status {...shared} color="warning" label="Pending" leading={<MdSchedule />} />
                        <Status {...shared} color="error" label="Failed" leading={<MdError />} />
                        <Status {...shared} color="info" label="Review" leading={<MdInfo />} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>With trailing icon</H2>
                    <Flex gap={8} wrap>
                        <Status {...shared} color="warning" label="Pending" trailing={<MdSchedule />} />
                        <Status {...shared} color="error" label="Failed" trailing={<MdWarning />} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Sizes</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Status color="success" label="extraSmall" size="extraSmall" />
                        <Status color="success" label="small" size="small" />
                        <Status color="success" label="medium" size="medium" />
                        <Status color="success" label="large" size="large" />
                        <Status color="success" label="extraLarge" size="extraLarge" />
                    </Flex>
                    <Flex alignItems="center" gap={8} wrap>
                        <Status color="success" label="extraSmall" leading={<MdCheckCircle />} size="extraSmall" />
                        <Status color="success" label="small" leading={<MdCheckCircle />} size="small" />
                        <Status color="success" label="medium" leading={<MdCheckCircle />} size="medium" />
                        <Status color="success" label="large" leading={<MdCheckCircle />} size="large" />
                        <Status color="success" label="extraLarge" leading={<MdCheckCircle />} size="extraLarge" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>CMS context</H2>
                    <P>Typical usage in a table column.</P>
                    <Flex direction="col" gap={8}>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="success" label="Published" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="secondary" label="Draft" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="warning" label="Pending" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="error" label="Failed" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="info" label="Review" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="tertiary" label="Archived" />
                        </Flex>
                    </Flex>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    color={color}
                    onChange={({ color: cl, size: sz }) => {
                        setColor(cl ?? null);
                        setSize(sz ?? null);
                    }}
                    size={size}
                />
            </Aside>
        </Article>
    );
};

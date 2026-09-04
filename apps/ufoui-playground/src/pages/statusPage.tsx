import { useState } from 'react';
import { MdCheckCircle, MdError, MdInfo, MdSchedule, MdWarning } from 'react-icons/md';

import {
    Article,
    Aside,
    BaseColor,
    Content,
    Div,
    ElementShape,
    ElementSize,
    Flex,
    H1,
    H2,
    P,
    Section,
    SemanticColor,
    Status,
} from '@ufoui/core';

import { Modifiers } from '../components/modifiers/modifiers';

const colors: SemanticColor[] = ['success', 'warning', 'error', 'info', 'primary', 'secondary', 'tertiary'];

export const StatusPage = () => {
    const [color, setColor] = useState<BaseColor | null>(null);
    const [size, setSize] = useState<ElementSize | null>(null);
    const [shape, setShape] = useState<ElementShape | null>(null);

    const shared = {
        color: color ?? undefined,
        shape: shape ?? undefined,
        size: size ?? undefined,
    };

    const sizeShared = { color: color ?? 'successContainer', shape: shape ?? undefined };

    return (
        <Article direction="row" fullWidth>
            <Content gap={20} grow>
                <H1>Status</H1>

                <Section gap={12}>
                    <H2>Soft</H2>
                    <Flex gap={8} wrap>
                        {colors.map(c => (
                            <Status
                                key={c}
                                {...shared}
                                color={`${c}Container`}
                                label={c.charAt(0).toUpperCase() + c.slice(1)}
                            />
                        ))}
                        <Status {...shared} label="Default" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Strong</H2>
                    <Flex gap={8} wrap>
                        {colors.map(c => (
                            <Status key={c} {...shared} color={c} label={c.charAt(0).toUpperCase() + c.slice(1)} />
                        ))}
                        <Status {...shared} label="Default" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Leading icon</H2>
                    <Flex gap={8} wrap>
                        <Status {...shared} color="successContainer" label="Published" leading={<MdCheckCircle />} />
                        <Status {...shared} color="warningContainer" label="Pending" leading={<MdSchedule />} />
                        <Status {...shared} color="errorContainer" label="Failed" leading={<MdError />} />
                        <Status {...shared} color="infoContainer" label="Review" leading={<MdInfo />} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Trailing icon</H2>
                    <Flex gap={8} wrap>
                        <Status {...shared} color="warningContainer" label="Pending" trailing={<MdSchedule />} />
                        <Status {...shared} color="errorContainer" label="Failed" trailing={<MdWarning />} />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Icons variants</H2>
                    <Flex gap={8} wrap>
                        <Status
                            {...shared}
                            color="warningContainer"
                            label="Pending"
                            leading={<MdWarning />}
                            trailing={<MdSchedule />}
                        />
                        <Status
                            {...shared}
                            color="errorContainer"
                            label="Failed"
                            leading={<MdInfo />}
                            trailing={
                                <>
                                    <MdWarning />
                                    <MdSchedule />
                                </>
                            }
                        />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Sizes</H2>
                    <Flex alignItems="center" gap={8} wrap>
                        <Status {...sizeShared} label="extraSmall" size="extraSmall" />
                        <Status {...sizeShared} label="small" size="small" />
                        <Status {...sizeShared} label="medium" size="medium" />
                        <Status {...sizeShared} label="large" size="large" />
                        <Status {...sizeShared} label="extraLarge" size="extraLarge" />
                    </Flex>
                    <Flex alignItems="center" gap={8} wrap>
                        <Status {...sizeShared} label="extraSmall" leading={<MdCheckCircle />} size="extraSmall" />
                        <Status {...sizeShared} label="small" leading={<MdCheckCircle />} size="small" />
                        <Status {...sizeShared} label="medium" leading={<MdCheckCircle />} size="medium" />
                        <Status {...sizeShared} label="large" leading={<MdCheckCircle />} size="large" />
                        <Status {...sizeShared} label="extraLarge" leading={<MdCheckCircle />} size="extraLarge" />
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>CMS context</H2>
                    <P>Typical usage in a table column.</P>
                    <Flex direction="col" gap={8}>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="successContainer" label="Published" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="secondaryContainer" label="Draft" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="warningContainer" label="Pending" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="errorContainer" label="Failed" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="infoContainer" label="Review" />
                        </Flex>
                        <Flex alignItems="center" gap={12}>
                            <Status {...shared} color="tertiaryContainer" label="Archived" />
                        </Flex>
                    </Flex>
                </Section>

                <Section gap={12}>
                    <H2>Long status</H2>
                    <P>Label truncation inside a narrow container.</P>
                    <Div border={1} borderColor="outlineVariant" p={8} width={80}>
                        <Status {...shared} label="A very long status label" />
                    </Div>
                </Section>
            </Content>

            <Aside>
                <Modifiers
                    baseColor={color}
                    onChange={({ baseColor: cl, shape: sh, size: sz }) => {
                        setColor(cl ?? null);
                        setShape(sh ?? null);
                        setSize(sz ?? null);
                    }}
                    shape={shape}
                    size={size}
                />
            </Aside>
        </Article>
    );
};

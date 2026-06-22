import { Fragment } from 'react';

import {
    Article,
    Content,
    Div,
    getColorNames,
    getOnColorName,
    Grid,
    H1,
    H2,
    SemanticColor,
    Stack,
    ThemeColor,
    useTheme,
} from '@ufoui/core';

const colors: SemanticColor[] = ['primary', 'secondary', 'tertiary', 'warning', 'error', 'info', 'success'];

const ColorPage = () => {
    const {
        theme: { schemes },
    } = useTheme();

    const lcTheme: Record<string, Record<string, string>> = {
        light: {
            ...Object.entries(schemes.light).reduce((a, k) => {
                return { ...a, ...{ [k[0].toLowerCase()]: k[1] } };
            }, {}),
        },
        dark: {
            ...Object.entries(schemes.dark).reduce((a, k) => {
                return { ...a, ...{ [k[0].toLowerCase()]: k[1] } };
            }, {}),
        },
    };
    const colorGroups = [
        { name: 'semantic', colors: getColorNames('semantic') },
        { name: 'extended', colors: getColorNames('extended') },
        { name: 'surface', colors: getColorNames('surface') },
        { name: 'base', colors: getColorNames('base') },
        { name: 'border', colors: getColorNames('border') },
        { name: 'text', colors: getColorNames('text') },
        { name: 'theme', colors: getColorNames('theme') },
    ] as const;
    const toThemeKey = (token: string) => token.toLowerCase();
    return (
        <Article>
            <H1>Colors</H1>
            <Content cols={2} gapX={8} type="grid">
                {colors.map(color => {
                    return (
                        <Fragment key={color}>
                            <H2 className="col-span-2 capitalize" mt={8}>
                                {color}
                            </H2>
                            {['light', 'dark'].map(scheme => (
                                <div className={scheme}>
                                    <Grid cols={2}>
                                        <Stack
                                            p={8}
                                            style={{
                                                color: lcTheme[scheme][`on${color}`],
                                                backgroundColor: lcTheme[scheme][color],
                                            }}>
                                            <Div>{color}</Div>
                                            <Div>
                                                {lcTheme[scheme][color]} / {lcTheme[scheme][`on${color}`]}
                                            </Div>
                                        </Stack>
                                        <Stack
                                            p={8}
                                            style={{
                                                backgroundColor: lcTheme[scheme][`on${color}`],
                                                color: lcTheme[scheme][color],
                                            }}>
                                            <Div>on {color}</Div>
                                            <Div>
                                                {lcTheme[scheme][`on${color}`]} / {lcTheme[scheme][color]}
                                            </Div>
                                        </Stack>
                                    </Grid>
                                    <Grid cols={2}>
                                        <Stack
                                            p={8}
                                            style={{
                                                backgroundColor: lcTheme[scheme][`${color}container`],
                                                color: lcTheme[scheme][`on${color}container`],
                                            }}>
                                            <Div>{color} container</Div>
                                            <Div>
                                                {lcTheme[scheme][`${color}container`]} /{' '}
                                                {lcTheme[scheme][`on${color}container`]}
                                            </Div>
                                        </Stack>
                                        <Stack
                                            p={8}
                                            style={{
                                                color: lcTheme[scheme][`${color}container`],
                                                backgroundColor: lcTheme[scheme][`on${color}container`],
                                            }}>
                                            <Div>on {color} container</Div>
                                            <Div>
                                                {lcTheme[scheme][`on${color}container`]} /{' '}
                                                {lcTheme[scheme][`${color}container`]}
                                            </Div>
                                        </Stack>
                                    </Grid>
                                    <Grid cols={2}>
                                        <Stack
                                            p={8}
                                            style={{
                                                backgroundColor: lcTheme[scheme][`${color}fixed`],
                                                color: lcTheme[scheme][`on${color}fixed`],
                                            }}>
                                            <Div>{color} fixed</Div>
                                            <Div>
                                                {lcTheme[scheme][`${color}fixed`]} /{' '}
                                                {lcTheme[scheme][`on${color}fixed`]}
                                            </Div>
                                        </Stack>
                                        <Stack
                                            p={8}
                                            style={{
                                                color: lcTheme[scheme][`${color}fixed`],
                                                backgroundColor: lcTheme[scheme][`on${color}fixed`],
                                            }}>
                                            <Div>on {color} fixed</Div>
                                            <Div>
                                                {lcTheme[scheme][`on${color}fixed`]} /{' '}
                                                {lcTheme[scheme][`${color}fixed`]}
                                            </Div>
                                        </Stack>
                                    </Grid>
                                    <Grid cols={2}>
                                        <Stack
                                            p={8}
                                            style={{
                                                color: lcTheme[scheme][`on${color}fixedvariant`],
                                                backgroundColor: lcTheme[scheme][`${color}fixeddim`],
                                            }}>
                                            <Div>{color} fixed dim</Div>
                                            <Div>
                                                {lcTheme[scheme][`${color}fixeddim`]} /
                                                {lcTheme[scheme][`on${color}fixedvariant`]}
                                            </Div>
                                        </Stack>
                                        <Stack
                                            p={8}
                                            style={{
                                                color: lcTheme[scheme][`${color}fixeddim`],
                                                backgroundColor: lcTheme[scheme][`on${color}fixedvariant`],
                                            }}>
                                            <Div>{color} on fixed variant</Div>
                                            <Div>
                                                {lcTheme[scheme][`on${color}fixedvariant`]} /
                                                {lcTheme[scheme][`${color}fixeddim`]}
                                            </Div>
                                        </Stack>
                                    </Grid>
                                </div>
                            ))}
                        </Fragment>
                    );
                })}
                <div className="col-span-2 pt-2 font-bold capitalize">Surface</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacedim,
                            }}>
                            <Div>surface dim / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacedim} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surface,
                            }}>
                            <Div>surface / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surface} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurfacevariant,
                                backgroundColor: lcTheme[scheme].surfacevariant,
                            }}>
                            <Div>surface variant/ on surface variant</Div>
                            <Div>
                                {lcTheme[scheme].surfacevariant} / {lcTheme[scheme].onsurfacevariant}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacebright,
                            }}>
                            <Div>surface bright / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacebright} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                    </div>
                ))}
                <div className="col-span-2 pt-2 font-bold capitalize">Surface Container</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacecontainerlowest,
                            }}>
                            <Div>surface container lowest / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacecontainerlowest} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacecontainerlow,
                            }}>
                            <Div>surface container low / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacecontainerlow} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            className="flex grow flex-col p-2"
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacecontainer,
                            }}>
                            <Div>surface container / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacecontainer} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacecontainerhigh,
                            }}>
                            <Div>surface container high / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacecontainerhigh} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onsurface,
                                backgroundColor: lcTheme[scheme].surfacecontainerhighest,
                            }}>
                            <Div>surface container highest / on surface</Div>
                            <Div>
                                {lcTheme[scheme].surfacecontainerhighest} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                    </div>
                ))}
                <div className="col-span-2 pt-2 font-bold capitalize">Surface Extras</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].surface,
                                backgroundColor: lcTheme[scheme].onsurface,
                            }}>
                            <div>on surface / surface</div>
                            <div>
                                {lcTheme[scheme].onsurface} / {lcTheme[scheme].surface}
                            </div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].surface,
                                backgroundColor: lcTheme[scheme].onsurfacevariant,
                            }}>
                            <Div>on surface variant / surface</Div>
                            <Div>
                                {lcTheme[scheme].onsurfacevariant} / {lcTheme[scheme].surface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].inverseonsurface,
                                backgroundColor: lcTheme[scheme].inversesurface,
                            }}>
                            <Div>inverse surface /inverse on surface</Div>
                            <Div>
                                {lcTheme[scheme].inversesurface} / {lcTheme[scheme].inverseonsurface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].inversesurface,
                                backgroundColor: lcTheme[scheme].inverseonsurface,
                            }}>
                            <Div>inverse on surface / inverse surface</Div>
                            <Div>
                                {lcTheme[scheme].inverseonsurface} / {lcTheme[scheme].inversesurface}
                            </Div>
                        </Stack>
                    </div>
                ))}
                <div className="col-span-2 pt-2 font-bold capitalize">Outline</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].surface,
                                backgroundColor: lcTheme[scheme].outline,
                            }}>
                            <Div>outline / surface</Div>
                            <Div>
                                {lcTheme[scheme].outline} / {lcTheme[scheme].surface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].inversesurface,
                                backgroundColor: lcTheme[scheme].outlinevariant,
                            }}>
                            <Div>outline variant / inverse surface</Div>
                            <Div>
                                {lcTheme[scheme].outlinevariant} / {lcTheme[scheme].inversesurface}
                            </Div>
                        </Stack>
                    </div>
                ))}
                <div className="col-span-2 pt-2 font-bold capitalize">Other</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onprimarycontainer,
                                backgroundColor: lcTheme[scheme].inverseprimary,
                            }}>
                            <Div>inverse primary / on primary container</Div>
                            <Div>
                                {lcTheme[scheme].inverseprimary} / {lcTheme[scheme].onprimarycontainer}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].white,
                                backgroundColor: lcTheme[scheme].scrim,
                            }}>
                            <Div>scrim / white </Div>
                            <Div>
                                {lcTheme[scheme].scrim} / {lcTheme[scheme].surface}
                            </Div>
                        </Stack>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].white,
                                backgroundColor: lcTheme[scheme].shadow,
                            }}>
                            <Div>shadow / white</Div>
                            <Div>
                                {lcTheme[scheme].shadow} / {lcTheme[scheme].onsurface}
                            </Div>
                        </Stack>
                    </div>
                ))}

                <div className="col-span-2 pt-2 font-bold capitalize">Surface Tint</div>
                {['light', 'dark'].map(scheme => (
                    <div className={`flex justify-between ${scheme}`} key={scheme}>
                        <Stack
                            grow
                            p={8}
                            style={{
                                color: lcTheme[scheme].onprimary,
                                backgroundColor: lcTheme[scheme].surfacetint,
                            }}>
                            <Div>surface tint / on primary</Div>
                            <Div>
                                {lcTheme[scheme].surfacetint} / {lcTheme[scheme].onprimary}
                            </Div>
                        </Stack>
                    </div>
                ))}
                <div className="col-span-2 pt-2 font-bold capitalize">Color Groups (Token Lists)</div>
                {colorGroups.map(group => (
                    <Fragment key={group.name}>
                        <div className="col-span-2 p-2 font-bold capitalize">{group.name}</div>
                        {['light', 'dark'].map(scheme => (
                            <div className={`p-2 ${scheme}`} key={`${group.name}-${scheme}`}>
                                <div className="flex flex-wrap gap-2">
                                    {group.colors.map(colorName => {
                                        const token = colorName as ThemeColor;
                                        const onToken = getOnColorName(token);
                                        const bg = lcTheme[scheme][toThemeKey(colorName)];
                                        const fg = onToken ? lcTheme[scheme][toThemeKey(onToken)] : '#000';
                                        return (
                                            <div
                                                className="flex h-[40px] w-[120px] items-center justify-center rounded border border-black/10 px-1 text-center text-[9px] leading-tight"
                                                key={colorName}
                                                style={{
                                                    backgroundColor: bg,
                                                    color: fg,
                                                }}
                                                title={colorName}>
                                                {colorName}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </Fragment>
                ))}
            </Content>
        </Article>
    );
};
export default ColorPage;

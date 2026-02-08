import { Fragment } from 'react';

import { getFixedColorClasses, Grid, SemanticColor, useTheme } from '@ufoui/core';

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
    const { textBaseColor, borderBaseColor, bgBaseColor, textOnBackground } = getFixedColorClasses();
    return (
        <Grid className="EDEK grid-cols-2 gap-x-2">
            {colors.map(color => {
                return (
                    <Fragment key={color}>
                        <div className="col-span-2 pt-2 font-bold capitalize">{color}</div>
                        {['light', 'dark'].map(scheme => (
                            <div className={scheme}>
                                <div className="grid grid-cols-2">
                                    <div
                                        className="} flex flex-col p-2"
                                        style={{
                                            color: lcTheme[scheme][`on${color}`],
                                            backgroundColor: lcTheme[scheme][color],
                                        }}>
                                        <div>{color}</div>
                                        <div>
                                            {lcTheme[scheme][color]} / {lcTheme[scheme][`on${color}`]}
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            backgroundColor: lcTheme[scheme][`on${color}`],
                                            color: lcTheme[scheme][color],
                                        }}>
                                        <div>on {color}</div>
                                        <div>
                                            {lcTheme[scheme][`on${color}`]} / {lcTheme[scheme][color]}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            backgroundColor: lcTheme[scheme][`${color}container`],
                                            color: lcTheme[scheme][`on${color}container`],
                                        }}>
                                        <div>{color} container</div>
                                        <div>
                                            {lcTheme[scheme][`${color}container`]} /{' '}
                                            {lcTheme[scheme][`on${color}container`]}
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            color: lcTheme[scheme][`${color}container`],
                                            backgroundColor: lcTheme[scheme][`on${color}container`],
                                        }}>
                                        <div>on {color} container</div>
                                        <div>
                                            {lcTheme[scheme][`on${color}container`]} /{' '}
                                            {lcTheme[scheme][`${color}container`]}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            backgroundColor: lcTheme[scheme][`${color}fixed`],
                                            color: lcTheme[scheme][`on${color}fixed`],
                                        }}>
                                        <div>{color} fixed</div>
                                        <div>
                                            {lcTheme[scheme][`${color}fixed`]} / {lcTheme[scheme][`on${color}fixed`]}
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            color: lcTheme[scheme][`${color}fixed`],
                                            backgroundColor: lcTheme[scheme][`on${color}fixed`],
                                        }}>
                                        <div>on {color} fixed</div>
                                        <div>
                                            {lcTheme[scheme][`on${color}fixed`]} / {lcTheme[scheme][`${color}fixed`]}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            color: lcTheme[scheme][`on${color}fixedvariant`],
                                            backgroundColor: lcTheme[scheme][`${color}fixeddim`],
                                        }}>
                                        <div>{color} fixed dim</div>
                                        <div>
                                            {lcTheme[scheme][`${color}fixeddim`]} /
                                            {lcTheme[scheme][`on${color}fixedvariant`]}
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col p-2"
                                        style={{
                                            color: lcTheme[scheme][`${color}fixeddim`],
                                            backgroundColor: lcTheme[scheme][`on${color}fixedvariant`],
                                        }}>
                                        <div>{color} on fixed variant</div>
                                        <div>
                                            {lcTheme[scheme][`on${color}fixedvariant`]} /
                                            {lcTheme[scheme][`${color}fixeddim`]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                );
            })}
            <div className="col-span-2 pt-2 font-bold capitalize">Surface</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacedim,
                        }}>
                        <div>surface dim / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacedim} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surface,
                        }}>
                        <div>surface / on surface</div>
                        <div>
                            {lcTheme[scheme].surface} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurfacevariant,
                            backgroundColor: lcTheme[scheme].surfacevariant,
                        }}>
                        <div>surface variant/ on surface variant</div>
                        <div>
                            {lcTheme[scheme].surfacevariant} / {lcTheme[scheme].onsurfacevariant}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacebright,
                        }}>
                        <div>surface bright / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacebright} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Surface Container</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacecontainerlowest,
                        }}>
                        <div>surface container lowest / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacecontainerlowest} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacecontainerlow,
                        }}>
                        <div>surface container low / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacecontainerlow} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacecontainer,
                        }}>
                        <div>surface container / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacecontainer} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacecontainerhigh,
                        }}>
                        <div>surface container high / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacecontainerhigh} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onsurface,
                            backgroundColor: lcTheme[scheme].surfacecontainerhighest,
                        }}>
                        <div>surface container highest / on surface</div>
                        <div>
                            {lcTheme[scheme].surfacecontainerhighest} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Surface Extras</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].surface,
                            backgroundColor: lcTheme[scheme].onsurface,
                        }}>
                        <div>on surface / surface</div>
                        <div>
                            {lcTheme[scheme].onsurface} / {lcTheme[scheme].surface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].surface,
                            backgroundColor: lcTheme[scheme].onsurfacevariant,
                        }}>
                        <div>on surface variant / surface</div>
                        <div>
                            {lcTheme[scheme].onsurfacevariant} / {lcTheme[scheme].surface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].inverseonsurface,
                            backgroundColor: lcTheme[scheme].inversesurface,
                        }}>
                        <div>inverse surface /inverse on surface</div>
                        <div>
                            {lcTheme[scheme].inversesurface} / {lcTheme[scheme].inverseonsurface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].inversesurface,
                            backgroundColor: lcTheme[scheme].inverseonsurface,
                        }}>
                        <div>inverse on surface / inverse surface</div>
                        <div>
                            {lcTheme[scheme].inverseonsurface} / {lcTheme[scheme].inversesurface}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Outline</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].surface,
                            backgroundColor: lcTheme[scheme].outline,
                        }}>
                        <div>outline / surface</div>
                        <div>
                            {lcTheme[scheme].outline} / {lcTheme[scheme].surface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].inversesurface,
                            backgroundColor: lcTheme[scheme].outlinevariant,
                        }}>
                        <div>outline variant / inverse surface</div>
                        <div>
                            {lcTheme[scheme].outlinevariant} / {lcTheme[scheme].inversesurface}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Other</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onprimarycontainer,
                            backgroundColor: lcTheme[scheme].inverseprimary,
                        }}>
                        <div>inverse primary / on primary container</div>
                        <div>
                            {lcTheme[scheme].inverseprimary} / {lcTheme[scheme].onprimarycontainer}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].white,
                            backgroundColor: lcTheme[scheme].scrim,
                        }}>
                        <div>scrim / white </div>
                        <div>
                            {lcTheme[scheme].scrim} / {lcTheme[scheme].surface}
                        </div>
                    </div>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].white,
                            backgroundColor: lcTheme[scheme].shadow,
                        }}>
                        <div>shadow / white</div>
                        <div>
                            {lcTheme[scheme].shadow} / {lcTheme[scheme].onsurface}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Background</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onbackground,
                            backgroundColor: lcTheme[scheme].background,
                        }}>
                        <div className={textOnBackground}>background / on background</div>
                        <div className={textOnBackground}>
                            {lcTheme[scheme].background} / {lcTheme[scheme].onbackground}
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-span-2 pt-2 font-bold capitalize">Surface Tint</div>
            {['light', 'dark'].map(scheme => (
                <div className={`flex justify-between ${scheme}`} key={scheme}>
                    <div
                        className="flex grow flex-col p-2"
                        style={{
                            color: lcTheme[scheme].onprimary,
                            backgroundColor: lcTheme[scheme].surfacetint,
                        }}>
                        <div>surface tint / on primary</div>
                        <div>
                            {lcTheme[scheme].surfacetint} / {lcTheme[scheme].onprimary}
                        </div>
                    </div>
                </div>
            ))}
        </Grid>
    );
};
export default ColorPage;

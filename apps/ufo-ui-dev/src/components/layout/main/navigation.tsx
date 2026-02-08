import { Link } from 'react-router-dom';

import { Button, Nav } from '@ufoui/core';

import { paths } from './paths';

export const Navigation = () => {
    return (
        <Nav border={1} className="m-5 gap-2 p-5" direction="col" elevation={1}>
            <Button label="Home" link={<Link to={paths.start} />} />
            <Button label="Button" link={<Link to={paths.button} />} />
            <Button label="Icon Button" link={<Link to={paths.iconButton} />} />
            <Button label="Fab" link={<Link to={paths.fab} />} />
            <Button label="Chip" link={<Link to={paths.chip} />} />
            <Button label="Checkbox" link={<Link to={paths.checkbox} />} />
            <Button label="Radio" link={<Link to={paths.radio} />} />
            <Button label="Switch" link={<Link to={paths.switch} />} />
            <Button label="Input" link={<Link to={paths.input} />} />
            <Button label="Menu" link={<Link to={paths.menu} />} />
            <Button label="Badge" link={<Link to={paths.badge} />} />
            <Button label="Tooltip" link={<Link to={paths.tooltip} />} />
            <Button label="Dialog" link={<Link to={paths.dialog} />} />
            <Button label="Box" link={<Link to={paths.box} />} />
            <Button label="List" link={<Link to={paths.list} />} />
            <Button label="Spinner" link={<Link to={paths.spinner} />} />
            <Button label="Animation" link={<Link to={paths.animation} />} />
            <Button label="Color" link={<Link to={paths.color} />} />
        </Nav>
    );
};

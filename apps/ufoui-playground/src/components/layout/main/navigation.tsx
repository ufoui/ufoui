import { Link } from 'react-router-dom';

import { Button, Nav } from '@ufoui/core';

import { paths } from './paths';

export const Navigation = () => {
  return (
    <Nav border={1} className="m-5 gap-2 p-5" direction="col" elevation={1}>
      <Button label="Home" link={<Link to={paths.start} />} />
      <Button label="Accordion" link={<Link to={paths.accordion} />} />
      <Button label="Tabs" link={<Link to={paths.tabs} />} />
      <Button label="Toolbar" link={<Link to={paths.toolbar} />} />
      <Button label="Collapse" link={<Link to={paths.collapse} />} />
      <Button label="List" link={<Link to={paths.list} />} />
      <Button label="Progress" link={<Link to={paths.progress} />} />
      <Button label="Drawer" link={<Link to={paths.drawer} />} />
      <Button label="Bottom Sheet" link={<Link to={paths.bottomSheet} />} />
      <Button label="Calendar" link={<Link to={paths.calendar} />} />
      <Button label="Toast" link={<Link to={paths.toast} />} />
      <Button label="Fields" link={<Link to={paths.fields} />} />
      <Button label="TextField" link={<Link to={paths.textField} />} />
      <Button label="Button" link={<Link to={paths.button} />} />
      <Button label="Icon Button" link={<Link to={paths.iconButton} />} />
      <Button label="Fab" link={<Link to={paths.fab} />} />
      <Button label="Chip" link={<Link to={paths.chip} />} />
      <Button label="Checkbox" link={<Link to={paths.checkbox} />} />
      <Button label="Radio" link={<Link to={paths.radio} />} />
      <Button label="Switch" link={<Link to={paths.switch} />} />
      <Button label="Menu" link={<Link to={paths.menu} />} />
      <Button label="Badge" link={<Link to={paths.badge} />} />
      <Button label="Tooltip" link={<Link to={paths.tooltip} />} />
      <Button label="Dialog" link={<Link to={paths.dialog} />} />
      <Button label="Box" link={<Link to={paths.box} />} />
      <Button label="Spinner" link={<Link to={paths.spinner} />} />
      <Button label="Animation" link={<Link to={paths.animation} />} />
      <Button label="Color" link={<Link to={paths.color} />} />
    </Nav>
  );
};

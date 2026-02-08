import {
  MdAdd,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdCheckCircle,
  MdExitToApp,
  MdExplicit,
  MdHome,
  MdMail,
  MdRadioButtonUnchecked,
  MdWarning,
  MdWater,
} from 'react-icons/md';
import React, { useState } from 'react';

import { Divider, Menu, MenuItem, MenuProps, MenuVariant } from '@ufoui/core';

interface TestMenuProps {
  anchorRef?: React.RefObject<HTMLElement>;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  menuType?: MenuVariant;
}

const TestMenu = ({
  anchorRef,
  open,
  setOpen,
  menuType,
  ...props
}: TestMenuProps & MenuProps) => {
  const [theme, setTheme] = useState('dark');
  const [check1, setCheck1] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(true);

  return (
    <Menu
      {...props}
      anchorRef={anchorRef}
      onClose={
        setOpen
          ? () => {
              setOpen(false);
            }
          : undefined
      }
      open={open}
      variant={menuType}
    >
      <MenuItem
        label="Rename"
        leading={<MdAdd />}
        onClick={() => {
          alert('Rename');
        }}
      >
        <Menu>
          <MenuItem
            label="Quick Rename"
            onClick={() => {
              alert('Quick Rename');
            }}
          />

          <MenuItem label="Advanced Rename">
            <Menu>
              <MenuItem
                checked={check3}
                checkedIcon={<MdCheckCircle />}
                label="Custom checkbox 1"
                onChange={() => {
                  setCheck3((v) => !v);
                }}
                type="checkbox"
                uncheckedIcon={<MdRadioButtonUnchecked />}
              />
              <MenuItem
                checked={check4}
                checkedIcon={<MdCheckBox />}
                label="Custom checkbox 2"
                onChange={() => {
                  setCheck4((v) => !v);
                }}
                type="checkbox"
                uncheckedIcon={<MdCheckBoxOutlineBlank />}
              />
              <Divider />
              <MenuItem
                label="Add Prefix"
                onClick={() => {
                  alert('Advanced: Add Prefix');
                }}
              />
              <MenuItem
                label="Add Suffix"
                onClick={() => {
                  alert('Advanced: Add Suffix');
                }}
              />
              <MenuItem
                label="Replace Text"
                onClick={() => {
                  alert('Advanced: Replace Text');
                }}
              />
            </Menu>
          </MenuItem>

          <MenuItem fixedLeading label="Fixed leading" />
          <Divider />
          <MenuItem
            checkedIcon={<MdCheckBox />}
            label="Select me 1"
            onChange={() => {
              setSelect1((v) => !v);
            }}
            selected={select1}
            type="option"
            uncheckedIcon={<MdWarning />}
          />
          <MenuItem
            label="Select me 2"
            onChange={() => {
              setSelect2((v) => !v);
            }}
            selected={select2}
            type="option"
          />
          <Divider />
          <MenuItem
            label="Red Text"
            leading={<MdWarning />}
            onClick={() => {
              alert('Red Text');
            }}
            textColor="error"
            trailing={<MdExplicit />}
          />
          <MenuItem
            description="Winter description"
            descriptionColor="info"
            label="Colorful"
            labelColor="warning"
            leading={<MdWarning />}
            onClick={() => {
              alert('Colorful');
            }}
            shortcut="Alt+F"
            shortcutColor="outline"
            textColor="success"
            trailing={<MdExplicit />}
          />
        </Menu>
      </MenuItem>

      {/* LEVEL 1 */}
      <MenuItem label="Duplicate">
        <Menu color="info">
          <MenuItem
            disabled
            label="Duplicate very long text and trailing"
            leading={<MdAdd />}
            onClick={() => {
              alert('Duplicate');
            }}
            trailing="Ctrl+S"
          />

          <MenuItem
            color="warningContainer"
            disabled
            label="Archive"
            onClick={() => {
              alert('Archive');
            }}
            shape="square"
          />

          <Divider />

          <MenuItem
            checked={theme === 'dark'}
            color="warningContainer"
            label="Dark"
            name="theme"
            onChange={() => {
              setTheme('dark');
            }}
            type="radio"
            value="dark"
          />
          <MenuItem
            checked={theme === 'light'}
            label="Light"
            name="theme"
            onChange={() => {
              setTheme('light');
            }}
            type="radio"
            value="light"
          />
          <MenuItem
            checked={theme === 'system'}
            label="System"
            name="theme"
            onChange={() => {
              setTheme('system');
            }}
            type="radio"
            value="system"
          />
          <Divider />
          <MenuItem
            checked={check1}
            label="Check me"
            onChange={() => {
              setCheck1((v) => !v);
            }}
            type="checkbox"
          />
          <MenuItem
            checked={check2}
            label="Uncheck me"
            onChange={() => {
              setCheck2((v) => !v);
            }}
            type="checkbox"
          />
          <Divider />

          {/* LEVEL 2 */}
          <MenuItem label="Advanced">
            <Menu>
              <MenuItem
                description="Click to exit this app"
                label="Exit"
                leading={<MdExitToApp />}
                onClick={() => {
                  alert('Exit');
                }}
                shortcut="Ctrl+X"
              />
              <MenuItem
                color="infoContainer"
                label="Compress"
                onClick={() => {
                  alert('Compress');
                }}
              />

              <MenuItem
                label="Encrypt"
                onClick={() => {
                  alert('Encrypt');
                }}
                trailing={<MdHome />}
              />

              {/* LEVEL 3 */}
              <MenuItem label="Trailing test2: Final menu item with a very long name that still should behave correctly and wrap">
                <Menu>
                  {Array.from({ length: 33 }).map((_, i) => (
                    <MenuItem
                      key={i}
                      label={`Extreme Mode ${i + 1}`}
                      onClick={() => {
                        alert(`Extreme Mode ${i + 1}`);
                      }}
                    />
                  ))}
                </Menu>
              </MenuItem>
            </Menu>
          </MenuItem>
        </Menu>
      </MenuItem>
      <Divider />
      <MenuItem
        leading={<MdHome />}
        onClick={() => {
          alert('New');
        }}
        trailing={<MdWater />}
      ></MenuItem>
      <MenuItem
        badge="5"
        label="Mail"
        leading={<MdMail />}
        onClick={() => {
          alert('Mail');
        }}
        shortcut="Ctrl+M"
      />
      <Divider />
      <MenuItem disabled label="Delete (disabled)" />

      <div>Test</div>
    </Menu>
  );
};

export default TestMenu;

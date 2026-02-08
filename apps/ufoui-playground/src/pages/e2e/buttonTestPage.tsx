import { MdAdd } from 'react-icons/md';
import { Button } from '@ufoui/core';

export const ButtonTestPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Button
        data-testid="btn-small"
        filled
        icon={<MdAdd />}
        label="label"
        size="small"
      />
      <Button
        data-testid="btn-medium"
        filled
        icon={<MdAdd />}
        label="label"
        size="medium"
      />
      <Button
        data-testid="btn-large"
        filled
        icon={<MdAdd />}
        label="label"
        size="large"
      />
    </div>
  );
};

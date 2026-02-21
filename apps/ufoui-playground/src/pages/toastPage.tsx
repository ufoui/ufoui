import { MdCheckCircle, MdError, MdInfo, MdWarning } from 'react-icons/md';

import { Article, Button, Section, toast, ToastViewport } from '@ufoui/core';

export const ToastPage = () => {
  return (
    <Article direction="col" gap={16} p={24}>
      <ToastViewport position="bottom-right" />

      <Section gap={12}>
        <Button label="Basic" onClick={() => toast('Hello world')} />

        <Button
          label="Success"
          onClick={() =>
            toast({
              description: 'Saved successfully',
              status: 'success',
              icon: <MdCheckCircle />,
            })
          }
        />

        <Button
          label="Error"
          onClick={() =>
            toast({
              description: 'Something failed',
              status: 'error',
              icon: <MdError />,
            })
          }
        />

        <Button
          label="Warning"
          onClick={() =>
            toast({
              description: 'Be careful!',
              status: 'warning',
              icon: <MdWarning />,
            })
          }
        />

        <Button
          label="Info + Action"
          onClick={() =>
            toast({
              description: 'New update available',
              status: 'info',
              icon: <MdInfo />,
              action: (id) => (
                <Button
                  filled
                  label="Dismiss"
                  onClick={() => {
                    toast.dismiss(id);
                  }}
                />
              ),
            })
          }
        />

        <Button
          label="Promise"
          onClick={() =>
            toast.promise(new Promise((res) => setTimeout(res, 2000)), {
              loading: 'Saving...',
              success: 'Done!',
              error: 'Failed!',
            })
          }
        />
      </Section>
    </Article>
  );
};

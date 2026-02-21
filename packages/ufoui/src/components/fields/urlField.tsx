import { forwardRef } from 'react';

import { FieldBase, FieldBaseProps } from '../base/fieldBase';

/**
 * Props for {@link UrlField}.
 * Extends {@link FieldBaseProps}.
 *
 * @category UrlField
 */
export type UrlFieldProps = Omit<FieldBaseProps, 'elementClass' | 'type'>;

/**
 * URL field component used to enter web addresses.
 *
 * Use for collecting links and website references in forms.
 *
 * @category UrlField
 * @function
 * @param props - All field props inherited from {@link FieldBase}.
 *
 * @example
 * <UrlField label="Label" />
 *
 * @example
 * <UrlField required />
 */
export const UrlField = forwardRef<HTMLInputElement, UrlFieldProps>(
  (props: UrlFieldProps, ref) => {
    return (
      <FieldBase ref={ref} {...props} elementClass="uui-url-field" type="url" />
    );
  },
);

UrlField.displayName = 'UrlField';

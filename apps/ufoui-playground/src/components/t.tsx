import { t } from 'i18next';

export default function T({ id }: { id: string }) {
  return <>{t(id)}</>;
}

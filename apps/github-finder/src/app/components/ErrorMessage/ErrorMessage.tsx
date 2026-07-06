import { Alert } from '@github-finder/design-system';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <Alert>{message}</Alert>;
}

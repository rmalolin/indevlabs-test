interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({ title = 'Error', message }: ErrorMessageProps) {
  return (
    <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
      <p className="font-medium">{title}</p>
      <p className="text-sm mt-1">{message}</p>
    </div>
  );
}

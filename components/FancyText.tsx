export default function FancyText({
  title,
  text,
}: {
  title?: boolean;
  text: string;
}) {
  return title ? (
    <h1 className="text-lg font-medium text-gray-900 dark:text-white" >{text}</h1>
  ) : (
    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{text}</h3>
  );
}

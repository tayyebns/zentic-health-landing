const SIZE_CLASSES = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
} as const;

export default function Wordmark({
  size = "lg",
}: {
  size?: keyof typeof SIZE_CLASSES;
}) {
  const textSize = SIZE_CLASSES[size];

  return (
    <span className="inline-flex flex-col font-public-sans" aria-hidden="true">
      <span className={`${textSize} font-bold leading-none`} style={{ color: "#272665" }}>
        Zentic
      </span>
      <span className={`${textSize} -mt-0.5 font-medium leading-none`} style={{ color: "#9485D4" }}>
        Health
      </span>
    </span>
  );
}

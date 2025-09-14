interface TechCardProps {
  imagePath: string
  websiteUrl: string
  title: string
  version: string
}

export function TechCard({
  imagePath,
  websiteUrl,
  title,
  version,
}: TechCardProps) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={websiteUrl}
      className="
        flex flex-col gap-1 p-2 border
        border-gray-30 rounded-lg items-center
        w-full hover:bg-gray-20
      "
    >
      <img className="w-16 h-16" src={imagePath} alt="" />
      <p>{title}</p>
      <p className="text-xs">{version}</p>
    </a>
  )
}

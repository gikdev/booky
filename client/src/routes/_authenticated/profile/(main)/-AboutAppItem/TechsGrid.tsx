import { TechCard } from "./TechCard"

interface TechItem {
  id: string
  imagePath: string
  websiteUrl: string
  title: string
  version: string
}

const techs: TechItem[] = [
  {
    id: "react",
    imagePath: "/images/techs/react.svg",
    websiteUrl: "https://react.dev/",
    title: "React",
    version: "v19",
  },
  {
    id: "typescript",
    imagePath: "/images/techs/typescript.svg",
    websiteUrl: "https://www.typescriptlang.org/",
    title: "TypeScript",
    version: "v5",
  },
  {
    id: "tailwindcss",
    imagePath: "/images/techs/tailwindcss.svg",
    websiteUrl: "https://tailwindcss.com/",
    title: "TailwindCSS",
    version: "v4",
  },
  {
    id: "figma",
    imagePath: "/images/techs/figma.svg",
    websiteUrl: "https://figma.com/",
    title: "Figma",
    version: "Web",
  },
  {
    id: "nestjs",
    imagePath: "/images/techs/nestjs.svg",
    websiteUrl: "https://nestjs.com/",
    title: "NestJS",
    version: "v11",
  },
  {
    id: "postgresql",
    imagePath: "/images/techs/postgresql.svg",
    websiteUrl: "https://www.postgresql.org/",
    title: "PostgreSQL",
    version: "v17",
  },
  {
    id: "capacitor",
    imagePath: "/images/techs/capacitor.svg",
    websiteUrl: "https://capacitorjs.com/",
    title: "Capacitor",
    version: "v7",
  },
  {
    id: "electronjs",
    imagePath: "/images/techs/electronjs.svg",
    websiteUrl: "https://www.electronjs.org/",
    title: "ElectronJS",
    version: "v38",
  },
]

export function TechsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {techs.map(t => (
        <TechCard
          key={t.id}
          imagePath={t.imagePath}
          title={t.title}
          version={t.version}
          websiteUrl={t.websiteUrl}
        />
      ))}
    </div>
  )
}

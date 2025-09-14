import { ArrowLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"
import { useI18nContext } from "#/i18n/i18n-react"

export const Route = createFileRoute("/intro")({
  component: RouteComponent,
})

function RouteComponent() {
  const { LL } = useI18nContext()

  return (
    <div className="flex flex-col p-4 gap-8 justify-center flex-1 relative">
      <img
        src="/images/tilted-book.png"
        alt=""
        className="w-max absolute top-[16%] -left-20 -z-1"
      />
      <img
        src="/images/green-square.png"
        alt=""
        className="w-max absolute -z-1 -bottom-[10%] -right-24"
      />
      <img src="/images/logo-full.png" alt="" className="w-max" />

      <h1 className="text-4xl leading-normal text-gray-90 font-bold">
        {LL.APP_TAGLINE()}
      </h1>

      <p className="">{LL.APP_INTRO_DESCRIPTION()}</p>

      <Link
        to="/auth/login"
        className={btn({
          intent: "brand",
          mode: "contained",
          className: "w-full justify-between",
        })}
      >
        <span>{LL.START()}</span>
        <ArrowLeftIcon weight="fill" />
      </Link>
    </div>
  )
}

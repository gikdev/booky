import { ArrowRightIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"
import { t } from "#/i18n"

export const Route = createFileRoute("/intro")({
  component: RouteComponent,
})

function RouteComponent() {
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
        {t.c.capital(t.appTagline)}
      </h1>

      <p className="">{t.appIntroDescription}</p>

      <Link
        to="/auth/login"
        className={btn({
          intent: "brand",
          mode: "contained",
          className: "w-full justify-between",
        })}
      >
        <span>{t.c.capital(t.start)}</span>
        <ArrowRightIcon weight="fill" mirrored={t.configIconMirror} />
      </Link>
    </div>
  )
}

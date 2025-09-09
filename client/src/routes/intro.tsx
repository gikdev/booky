import { ArrowLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { btn } from "#/forms/skins"

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

      <h1 className="text-4xl leading-normal text-stone-900">
        <span className="font-bold">کتاب</span>
        <span>‌هات</span>
        <br />
        <span>رو خیلی </span>
        <span className="font-bold">راحت</span>
        <br />
        <span className="font-bold text-blue-600">مدیریت </span>
        <span>کن!</span>
      </h1>

      <p className="">
        <span>با بوکی، دیگه خیالت از بابت</span>
        <br />
        <span>کتاب‌هایی که داری راحت میشه!</span>
        <br />
        <span>آماده هستی که شروع کنیم؟</span>
      </p>

      <Link
        to="/auth/login"
        className={btn({
          intent: "brand",
          mode: "contained",
          className: "w-full justify-between",
        })}
      >
        <span>شروع</span>
        <ArrowLeftIcon weight="fill" />
      </Link>
    </div>
  )
}

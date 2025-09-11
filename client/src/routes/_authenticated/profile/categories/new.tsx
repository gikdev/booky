import { contentContainer, page } from "#/shared/skins"
import { createFileRoute, Link } from "@tanstack/react-router"
import { NavBar } from "../../-Navbar"
import { btn } from "#/forms/skins"
import { CaretLeftIcon, FloppyDiskBackIcon } from "@phosphor-icons/react"
import { useAppForm } from "#/forms"

export const Route = createFileRoute("/_authenticated/profile/categories/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      title: "",
      color: "#000000",
      description: "",
    },
  })

  return (
    <div className={page()}>
      <NavBar title="دسته‌بندی جدید" slotStart={<GoBackBtn />} />

      <div className={contentContainer({ className: "p-4 gap-6" })}>
        <form.AppField name="title">
          {field => <field.SimpleText label="نام:" />}
        </form.AppField>

        <form.AppField name="color">
          {field => <field.SimpleText label="رنگ:" />}
        </form.AppField>

        <form.AppField name="description">
          {field => <field.SimpleText label="توضیحات (اختیاری):" isMultiline />}
        </form.AppField>

        <form.AppForm>
          <form.Btn
            title="ذخیره"
            iconStart={<FloppyDiskBackIcon weight="fill" />}
            className={btn({
              intent: "success",
              mode: "contained",
              className: "w-full mt-auto",
            })}
          />
        </form.AppForm>
      </div>
    </div>
  )
}

const GoBackBtn = () => (
  <Link
    to="/profile/categories"
    className={btn({ isIcon: true, size: "sm", mode: "text" })}
  >
    <CaretLeftIcon mirrored />
  </Link>
)

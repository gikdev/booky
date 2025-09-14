import { useCurrentUserQuery } from "#/shared/auth"

export function ProfileDetails() {
  const { data: user } = useCurrentUserQuery()

  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      {user ? (
        <div
          className="
            w-20 h-20 text-brand-60 bg-brand-60/20 font-bold
            text-4xl flex items-center justify-center rounded-full
          "
        >
          {user.firstName[0]}
        </div>
      ) : (
        <div className="w-20 h-20 bg-gray-30 rounded-full animate-pulse" />
      )}

      {user ? (
        <p className="font-bold text-gray-90">
          {calcFullname(user.firstName, user.lastName)}
        </p>
      ) : (
        <div className="h-6 w-24 bg-gray-30 animate-pulse" />
      )}
    </div>
  )
}

function calcFullname(firstName: string, lastName: string | null) {
  return `${firstName}${lastName ? " " : ""}${lastName}`
}

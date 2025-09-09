import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/intro")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/intro"!</div>
}

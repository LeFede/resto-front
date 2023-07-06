import { Cards } from "@/components"
import { useMenus } from "@/hooks"

export const Home = () => {

  useMenus()

  return (
    <div>
      <Cards/>
    </div>
  )
}

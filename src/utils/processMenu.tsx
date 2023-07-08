import { IMenu } from "@/types"

export const processMenu = (e: IMenu[]) => e.reduce((prev, curr) => {
    const { categories, ...rest } = curr
    console.log(curr)

    return {
      ...prev,
      [categories]: [
        // @ts-ignore
        ...(prev[categories] ? prev[categories] : []),
        rest
      ]
    }
  }, {})

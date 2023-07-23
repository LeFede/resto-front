// @ts-nocheck
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "@/redux"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"


export const Chart = () => {
  
  const dispatch = useDispatch()
  const { orders } = useSelector((state: any) => state)
  const filtered = useMemo(() => orders.map((e, arr) => {
    
    const eee = new Date(e.createdAt)
    const date = eee.getDate()
    const month = eee.getMonth()
    const year = eee.getFullYear()

    // console.log(date, month, year)

    return {
      date,
      month, year,
      earn: e.totalPrice,
    }
  }), [orders])

  useEffect(() => {
    dispatch<any>(fetchOrders())
  }, [])

  return (
    <div>

      <LineChart width={600} height={300} data={
        filtered.reduce((prev, curr) => {

          // if (prev.includes(e => e.name === curr.name)) console.log('includes')
          const exists = prev.findIndex(e => e.name === curr.date)
          if (exists >= 0) return prev.map((e, i) => {
            if (i === exists) return {name: e.name, uv: e.uv + curr.earn}
            return e
          }) 

          console.log(prev)

          return [
            ...prev, 
            {name: curr.date, uv: 300}
          ]
        }, 
        [
        ])
      }>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>


      <LineChart width={600} height={300} data={
        filtered.reduce((prev, curr) => {

          // if (prev.includes(e => e.name === curr.name)) console.log('includes')
          const exists = prev.findIndex(e => e.name === curr.month)
          if (exists >= 0) return prev.map((e, i) => {
            if (i === exists) return {name: e.name, uv: e.uv + curr.earn}
            return e
          }) 

          console.log(prev)

          return [
            ...prev, 
            {name: curr.month - 5, uv: 0},
            {name: curr.month - 4, uv: 0},
            {name: curr.month - 3, uv: 0},
            {name: curr.month - 2, uv: 0},
            {name: curr.month - 1, uv: 0},
            {name: curr.month, uv: 300},
          ]
        }, 
        [
        ])
      }>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>

    </div>
  )
}

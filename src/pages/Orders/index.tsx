import styles from "./Orders.module.css"

export const Orders = () => {
  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      <section>

        <article>
          <h4>Mesa 1</h4>
          <ul>
            <li>Milanesa</li>
            <li>Pizza</li>
            <li>Agua 1lt</li>
            <li>Coca 2lt</li>
          </ul>
        </article>

        <article>
          <h4>Mesa 2</h4>
          <ul>
            <li>Hamburguesa</li>
          </ul>
        </article>

        <article>
          <h4>Mesa 3</h4>
          <ul>
            <li>Ensalada Cesar <span>x2</span></li>
            <li>Exprimido de naranja <span>x2</span></li>
          </ul>
        </article>

      </section>
    </div>
  )
}

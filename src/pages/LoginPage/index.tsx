import styles from './LoginPage.module.css'

export const LoginPage = () => {
  return (
    <main>  
      <div>LoginPage
        <div className={styles.card}>
          <h4 className={styles.title}>Log In!</h4>
          <form>
            <div className={styles.field}>
              <input placeholder="Email" className={styles.input_field} name="email" type="email"/>
            </div>
            <div className={styles.field}>
              <input placeholder="Password" className={styles.input_field} name="password" type="password"/>
            </div>
            <button className={styles.btn} type="submit">Login</button>
            <a href="#" className={styles.btn_link}>Forgot your password?</a>
          </form>
        </div>
      </div>
    </main>
  )
}

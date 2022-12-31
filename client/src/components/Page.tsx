
import styles from './Page.module.css'


interface Props {
  children: JSX.Element[] | JSX.Element
}
const Page = ({children}:Props) => {
  return (
    <>
      <div className={styles.page} >
      <div className={styles.page_container} >
      {children}
      </div>
      </div>
    </>
  )
}

export default Page
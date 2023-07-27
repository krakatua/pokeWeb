import PikachuCanvas from "../canvas/Pikachu"
import { styles } from "../constants"

const Header = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
        <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto
        flex flex-row items-start gap-5`}>
            <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#f4dc26]"/>
                <div className="w-1 sm:h-80 h-40 yellow-gradient"/>

            </div>
            <div >
                <h1 className={`${styles.heroHeadText}`}>
                    Welcome to the Greatest Poke Wiki <br /><span className={`${styles.heroSubText}`}> Say hi! to pikachu</span>
                </h1>

            </div>

        </div>
        <PikachuCanvas/>
    </section>
  )
}

export default Header
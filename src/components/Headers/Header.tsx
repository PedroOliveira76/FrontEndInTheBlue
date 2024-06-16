import img from '/logoITB.png'
const Header = () => {
  return (
    <div className="w-full h-20 max-sm:h-16 bg-cyan-600 p-2 flex flex-row justify-center gap-10 ">
        <div className='flex items-center h-full'>
            <img src={img} alt="" className='w-16 h-16 rounded-xl max-sm:h-12 max-sm:w-12'/>
        </div>

        <div className='w-96 flex items-center justify-center text-center max-sm:w-56 '>
            <h1 className='text-white font-semibold text-5xl max-sm:text-3xl'>IN THE BLUE</h1>
        </div>

    </div>
  )
}

export default Header
import Cart404 from '../../assets/images/cartnothing.png'

export default function NothingInCart() {
  return (
  <>
    <section className='min-h-[70vh] flex justify-center items-center bg-[#ffff] pt-16'>
    <div className="img-404 w-1/3 py-5 ">
      <img src={Cart404} alt="" className='w-full rounded-full' />
      <h2  className='text-center font-bold '>Nothing in the cart</h2>
    </div>
   </section>
   </>
   )
   }



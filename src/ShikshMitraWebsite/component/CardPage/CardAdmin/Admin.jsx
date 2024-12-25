import { useNavigate } from 'react-router-dom';
import adminimg from '../../../assets/images/adminimg.jpg';
const Admin = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  }

  return (

    <div className='h-screen'>
      <h1 className=" text-xl sm:text-2xl md:text-3xl 
         font-semibold uppercase text-center"> Admin</h1>

      <div className='grid grid-rows-1 '>

        <div className=" grid md:grid-cols-2  sm:grid-cols-1 gap-1">


          <div className=' flex justify-center items-center w-full p-4'>
            <div className=' p-6 md:w-[450px]'>
              <img className="rounded  " src={adminimg} alt="" />
            </div>
          </div>


          <div className='sm:px-[10px] pt-10'>


            <p className='text-base'>
              An Administrator provides office support to either an individual or team and is vital for the smooth-running of a business. Their duties may include fielding telephone calls, receiving and directing visitors, word processing,
              creating spreadsheets and presentations, and filing.
            </p>

            <p className='text-base'>
              The duties of school administrators may vary depending on the size
              and type of school they work in. For example, school administrators
              in small day care centers (where they may be the only member of the
              administrative team) have different scope of  responsibility than at a large college where they may specialize
              in a specific area.
            </p>
            <p className='text-base'>
              Administrators can monitor the progress of various academic and administrative processes, promoting accountability
              and efficiency across the institution. This level of control ensures that the school operates seamlessly and with the highest standards of quality.
            </p>
            <p className='text-base'>

            </p>



          </div>



        </div>




      </div>
      <div className="flex  justify-center">

        <button onClick={goBack} className="text-[1.2rem] bg-blue-400 mt-1 px-5 
           py-1 rounded-full hover:shadow-lg hover:shadow-sky-400 ">Go Back</button>
      </div>
     


    </div>
  );
}

export default Admin;

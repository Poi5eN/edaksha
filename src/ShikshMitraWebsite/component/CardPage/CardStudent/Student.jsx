import comm1 from "../../../assets/image/comm1.png";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center  flex-col">
          <h1 className="inline-block pt-1 text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
            Student
          </h1>
        </div>

        <div className="grid md:grid-cols-2  sm:grid-cols-2  p-2 gap-1">
          <div className="flex justify-center items-center">
            <div>
              {" "}
              <img className="h-[25rem]" src={comm1} alt="" />{" "}
            </div>
          </div>

          <div>
            <div className="pt-10 pr-5">
              <p className="text-base">
                A student is a person enrolled in a school or other educational
                institution. In the United Kingdom and most commonwealth
                countries, a "student" attends a secondary school or higher;
                those in primary or elementary schools are "pupils".
              </p>

              <p className="text-base">
                As a student, leveraging the power of a School Management System
                can significantly enhance your educational journey. It
                simplifies access to information, fosters effective
                communication, and empowers you to take control of your academic
                progress. By embracing this technology, you can unlock your full
                potential and make the most of your school experience. So, don't
                miss out on the benefits of your school's SMS—make it an
                integral part of your educational journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex align-item justify-center ">
          <button
            onClick={goBack}
            className="text-[1.2rem] bg-blue-400 px-5 py-1 rounded-full hover:shadow-lg hover:shadow-sky-400 "
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Student;

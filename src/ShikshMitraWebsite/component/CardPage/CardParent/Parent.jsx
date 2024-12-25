import { useNavigate } from "react-router-dom";
import parentimg from "../../../assets/images/parentimg.jpg";

const Parent = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center  flex-col">
          <h1 className="inline-block pt-1 text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
            Parent
          </h1>
        </div>
        <div className="grid md:grid-cols-2  sm:grid-cols-1  p-2 gap-1">
          <div className="flex justify-center items-center">
            <div>
              {" "}
              <img className="h-[25rem]" src={parentimg} alt="" />{" "}
            </div>
          </div>

          <div>
            <div className="pt-10">
              <p className="text-base">
                As parents, we need to understand what’s good for our children
                and what is not, from the moment they are born. From healthcare
                and holidays to education we strive to give the best to our
                children.
              </p>

              <p className="text-base">
                However, on a mission to guide our child towards a successful
                life while dutifully playing the role of parents, we often tend
                to overlook some important aspects in our child’s education,
                that is way more important than our idea of a successful life.
              </p>
              <p classNmae="text-base">
                As a parent, your child's education is paramount, and the modern
                educational landscape presents new opportunities and challenges.
                To stay actively involved in your child's learning journey, you
                need the right tools at your disposal.
              </p>
            </div>
          </div>
        </div>

        <div className="flex align-item justify-center py-5">
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

export default Parent;

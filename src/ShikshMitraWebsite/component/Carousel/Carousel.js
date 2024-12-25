import React from "react";
import "./Carousel.css";
const Carousel = () => {
  return (

    <>
   
     <div  data-scroll data-scroll-section data-scroll-speed=".8">
     <h2 className="head2">Community</h2>
      <div className="caro-heading text-2xl">Nurturing minds, shaping futures, and building a brighter tomorrow together.</div>
      <div className="underline">
        <span></span>
      </div>
      <div className="  " id="services">
        <div className=" flex items-cente justify-center mt-4">
          <figure className="icon-cards ">
            <div className="icon-cards__content">
              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[388px]" src="https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Fgallery_images%2Ffile6z51t1zjg4ykyudrg3y.jpg" alt="" />
              </div>
              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[100%]" src="https://static.india.com/wp-content/uploads/2022/04/kids-school.jpg?impolicy=Medium_Resize&w=1200&h=800" alt="" />
              </div>

              <div className="icon-cards__item d-flex align-items-center justify-content-center">
                <img className="rounded-3xl w-[388px]" src="https://mediaindia.eu/wp-content/uploads/2020/03/48411210_278349832868894_5757913623229890560_o.jpg" alt="" />
              </div>
            </div>
          </figure>
        </div>
      </div>
      </div>
    </>
  );
};

export default Carousel;

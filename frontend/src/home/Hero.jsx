import TopCard from "./TopCard.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1600,
  arrows: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1400,
      settings: { slidesToShow: 2.5 },
    },
    {
      breakpoint: 1200,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 1000,
      settings: { slidesToShow: 1.5 },
    },
    {
      breakpoint: 820,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 570,
      settings: {
        arrows: false,
        slidesToShow: 1,
        vertical: true,
        verticalSwiping: true,
      },
    },
    {
      breakpoint: 250,
      settings: {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        vertical: true,
        verticalSwiping: true,
      },
    },
  ],
};

export default function Hero() {
  return (
    <div className="HeroHome box flex text-white items-center justify-center w-[95%] h-59 p-12 rounded-md m-10 border border-slate-500 shadow-sm shadow-cyan-500/50">
      <div className="w-full">
        <Slider {...settings}>
          <TopCard
            image={"/images/trophy.png"}
            text={"Competitive Programmers"}
          />
          <TopCard image={"/images/laptop.png"} text={"Developers"} />
          <TopCard image={"/images/laptopTrophy.png"} text={"All rounders"} />
          <TopCard image={"/images/computer.png"} text={"Contributors"} />
          <TopCard image={"/images/rank.png"} text={"Rankers"} />
        </Slider>
      </div>
    </div>
  );
}

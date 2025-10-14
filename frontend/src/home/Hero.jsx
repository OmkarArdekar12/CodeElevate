import TopCard from "./TopCard.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="HeroHome box flex text-white items-center justify-center w-[95%] h-66 p-12 rounded-md m-10 border border-slate-500 shadow-sm shadow-cyan-500/50 transition-all duration-300 ease-in-out">
      <div className="w-full">
        <Slider {...settings}>
          <TopCard
            image={"/images/laptopTrophy.png"}
            text={"All Rounders"}
            onClick={() =>
              navigate("/rankings", {
                state: { selectedRank: "allRounders" },
              })
            }
          />
          <TopCard
            image={"/images/trophy.png"}
            text={"Competitive Programmers"}
            onClick={() =>
              navigate("/rankings", {
                state: { selectedRank: "competitiveProgramming" },
              })
            }
          />
          <TopCard
            image={"/images/laptop.png"}
            text={"Developers"}
            onClick={() =>
              navigate("/rankings", {
                state: { selectedRank: "development" },
              })
            }
          />
          <TopCard
            image={"/images/computer.png"}
            text={"Contributors"}
            onClick={() =>
              navigate("/rankings", {
                state: { selectedRank: "contributors" },
              })
            }
          />
          <TopCard
            image={"/images/rank.png"}
            text={"Rankers"}
            onClick={() =>
              navigate("/rankings", {
                state: { selectedRank: "rankers" },
              })
            }
          />
        </Slider>
      </div>
    </div>
  );
}

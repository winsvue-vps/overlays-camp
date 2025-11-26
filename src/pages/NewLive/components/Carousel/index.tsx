import "./styles.css"
import ImageFrame from "../../assets/image-frame.svg?react";
import { useTournamentStore } from "@/stores/useTournamentStore";
import { CDN_CREWS, SERVER_LOGO } from "../../lib/utils";
import { useState, useEffect } from "react";

export function CarouselItem({ avatar }: { avatar?: string }) {
  const [imageSrc, setImageSrc] = useState(SERVER_LOGO);
  const imageUrl = avatar ? `${CDN_CREWS}/${avatar}` : SERVER_LOGO;

  useEffect(() => {
    if (!avatar) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageSrc(imageUrl);
    img.onerror = () => setImageSrc(SERVER_LOGO);
  }, [avatar]);

  return (
    <div className="relative">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hex size-[6rem] bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      <ImageFrame className="z-10 size-[8rem]" />
    </div>
  );
}

export default function Carousel() {
  const teams = useTournamentStore((state) => state.teams);

  return (
    <div className="w-[40rem] h-[11rem] fixed bottom-[3rem] left-1/2 -translate-x-1/2 -translate-y-1/2 carousel-gradient">
      <div className="carousel-container">
        <div className="carousel-track">
          { teams.map(({ avatar }, index) => {
            return <CarouselItem key={index} avatar={avatar} />
          }) }
        </div>
      </div>
    </div>
  );
}
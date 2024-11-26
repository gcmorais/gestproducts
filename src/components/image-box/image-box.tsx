import Image from "../../assets/images/ImageBox.png";

export default function ImageBox(){
    return(
        <div className="mb-8 md:mb-0 md:w-1/2">
          <img src={Image} alt="Worker Image." className="w-full h-auto" />
        </div>
    )
}
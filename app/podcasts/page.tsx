import {
    Card
} from "@/components/ui/card"
import DlIcon from "@/components/ui/dlIcon";
export default function Podcasts() {
    let arr = [
        {
            path: "VIDEO-PODCAST/FREDERIC LE MOIGNE/Frederic Le Moigne - Part 1-SD 480p.mov",
            title: "Frederic Le Moigne - Part 1",
            pdf: "VIDEO-PODCAST/FREDERIC LE MOIGNE/Script - Frederic LE MOIGNE.pdf"
        },
        {
            path: "VIDEO-PODCAST/FREDERIC LE MOIGNE/Frederic Le Moigne - Part 2-SD 480p.mov",
            title: "Frederic Le Moigne - Part 2",
            pdf: "VIDEO-PODCAST/FREDERIC LE MOIGNE/Script - Frederic LE MOIGNE.pdf"
        },
        {
            path: "VIDEO-PODCAST/FLORIAN SEVELEC/Florian Sevellec - Oona Layolle-001-SD 480p.mov",
            title: "Florian Sevellec - Oona Layolle - Part 1",
            pdf: "VIDEO-PODCAST/FLORIAN SEVELEC/Script - Florian Sévellec.pdf"

        },
        {
            path: "VIDEO-PODCAST/FLORIAN SEVELEC/Florian Sevellec-004-SD 480p.mov",
            title: "Florian Sevellec - Oona Layolle - Part 2",
            pdf: "VIDEO-PODCAST/FLORIAN SEVELEC/Script - Florian Sévellec.pdf"
        }
    ];
    return (

        <div className="flex flex-col items-center my-8">
            {arr.map((video) => <Card className="m-3 p-5 relative group bg-primary" key={video.path}>
                <video className="rounded-lg filter md:hover:brightness-50 " controls src={video.path}>
                </video>
                <div className="md:group-hover:flex hidden text-lg absolute left-[25px] top-[10%]">
                    <p className="ml-4 scroll-m-20 text-md md:text-2xl font-semibold tracking-tight text-secondary">{video.title}</p>
                    <a className="mx-3" href={video.pdf}><DlIcon className="h-4 w-4 md:h-7 md:w-7 stroke-white fill-white"></DlIcon></a>
                </div>
                <div className="md:hidden flex text-md mt-4">
                    <p className="ml-4 scroll-m-20 text-md font-semibold tracking-tight text-secondary">{video.title}</p>
                    <a className="mx-3" href={video.pdf}><DlIcon className="h-4 w-4 stroke-white fill-white"></DlIcon></a>
                </div>
            </Card>)}
        </div>
    )
}

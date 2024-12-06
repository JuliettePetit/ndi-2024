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

        <div className="flex flex-col items-center mt-8">
            {arr.map((video) => <div className="m-3" key={video.path}>
                <video controls src={video.path}>
                </video>
                <div className="flex">
                    <p>{video.title}</p>
                    <a className="mx-3" href={video.pdf}><DlIcon className="h-5 w-5 stroke-white fill-white"></DlIcon></a>
                </div>
            </div>)}
        </div>
    )
}

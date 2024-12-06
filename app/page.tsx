"use client"
import { useEffect, useState } from "react";
import GamePage from "@/app/components/GamePage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {GeoEvent, ResponseToChoiceEvent, SvgPropBack, SliderData, DialogInfo, ConsequenceSeuil} from "@/lib/types";
import { update } from "./back/update";
import {Separator} from "@/components/ui/separator";

export default function Home() {
    // Switch map
    const [isEarth, setIsEarth] = useState(false);
    // Event dialog
    const [isOpen, setIsOpen] = useState(false);
    const [geoEvent, setEvent] = useState(null as GeoEvent | null);
    // Body part
    const [isOpenPart, setIsOpenPart] = useState(false);
    const [part, setPart] = useState(null as DialogInfo | null);
    // Consequence
    const [isConsOpen, setIsConsOpen] = useState(false);
    const [geoCons, setGeoCons] = useState(null as ConsequenceSeuil | null);
    // other
    const [history, setHistory] = useState([] as string[]);
    const [svgInfo, setSvgInfo] = useState(null as SvgPropBack | null);
    const [oceanStats, setOceanStats] = useState([] as SliderData[]);
    const [humanStats, setHumanStats] = useState([] as SliderData[]);
    const isChek: ((checked: boolean) => void) = (s: boolean) => setIsEarth(s);

    function handleUpdate(r: ResponseToChoiceEvent | null) {
        const res = update(r);
        if (res.event != null) {
            setEvent(res.event);
            setHistory([...[`Event: #${res.event.id} - ${res.event.title}`, ...history]])
            setIsOpen(true);
        }
        else {
            setIsOpen(false);
        }
        if(res.consequenceSeuil != null) {
            setGeoCons(res.consequenceSeuil);
            setIsConsOpen(true);
        } else {
            setIsConsOpen(false);
        }
      if (r !== null) {
        setHistory([...[`Reponse: ${r}`, ...history]])
        }
        setOceanStats(Object
            .keys(res.ocean_stats)
            .map((k) => ({
                left_color: "bg-gray-100",
                right_color: "bg-blue-200",
                data: res.ocean_stats[k],
                name: k,

            } as SliderData)));
        setHumanStats(Object
            .keys(res.human_stats)
            .map((k) => ({
                left_color: "bg-gray-100",
                right_color: "bg-red-200",
                data: res.human_stats[k],
                name: k
            } as SliderData)));
        setSvgInfo(res.svgs);
    }


    useEffect(() => {
        const id = setInterval(() => {
            if (!isOpen && !isOpenPart && !isConsOpen) {
                // call Back
                // update stats
                handleUpdate(null);
            }
        }, 1000); // each second
        return () => clearInterval(id);
    }, [isOpen, geoEvent, isOpenPart, isConsOpen])

    const accept = () => { handleUpdate("yes"); };
    const refuse = () => { handleUpdate("no"); };
    const ok = () => { handleUpdate("ok"); };

    return (
        <div className={"p-2"}>
            <h1 className={"font-extrabold text-2xl"}>{isEarth ? "TERRE" : "HUMAIN"}</h1>
        <GamePage isEarth={isEarth}
            switchCallback={isChek}
            stats={isEarth ? oceanStats : humanStats}
            svgs={svgInfo}
            setPart={setPart}
            setOpenPart={setIsOpenPart}
            history={history}
            />
            <Dialog open={isOpen}>
                <DialogContent onEscapeKeyDown={event => event.preventDefault()} onPointerDownOutside={event => event.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{geoEvent?.title || ""}</DialogTitle>
                        <DialogDescription>
                            {geoEvent?.description || ""}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {
                            geoEvent?.option == 'YesNoChoice'
                                ? <><Button variant={"outline"} onClick={refuse}>Non</Button><Button onClick={accept}>Oui</Button></>
                                : <><Button onClick={ok}>Ok</Button></>
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpenPart}>
                <DialogContent onEscapeKeyDown={event => event.preventDefault()} onPointerDownOutside={event => event.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{part?.title || ""}</DialogTitle>
                        <DialogDescription>
                            {part?.description || ""}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsOpenPart(false)}>Fermer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={isConsOpen}>
                <DialogContent onEscapeKeyDown={event => event.preventDefault()} onPointerDownOutside={event => event.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Consequence grave</DialogTitle>
                        <DialogDescription>
                            <h2 className={"text-xl"}>{geoCons?.humanOrigin || ""}</h2>
                            <p>{geoCons?.humanProblemAnalogy || ""}</p>
                            <Separator/>
                            <h2 className={"text-xl"}>{geoCons?.oceanOrigin || ""}</h2>
                            <p>{geoCons?.oceanProblem || ""}</p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setIsConsOpen(false)}>Ok</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

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
import {GeoEvent, ResponseToChoiceEvent, SvgPropBack, SliderData, DialogInfo} from "@/lib/types";
import { update } from "./back/update";

export default function Home() {
    const [isEarth, setIsEarth] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPart, setIsOpenPart] = useState(false);
    const [part, setPart] = useState(null as DialogInfo | null);
    const [history, setHistory] = useState([] as string[]);
    const [geoEvent, setEvent] = useState(null as GeoEvent | null);
    const [svgInfo, setSvgInfo] = useState(null as SvgPropBack | null);
    const [oceanStats, setOceanStats] = useState([] as SliderData[]);
    const [humanStats, setHumanStats] = useState([] as SliderData[]);
    const isChek: ((checked: boolean) => void) = (s: boolean) => setIsEarth(s);

    function handleUpdate(r: ResponseToChoiceEvent | null) {
        const res = update(r);
        if (res.event != null) {
            setEvent(res.event);
            setHistory([...[`Event: ${res.event.title}`, ...history]])
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
      if (r !== null) {
        setHistory([...[`response: ${r}`, ...history]])
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
            if (!isOpen && !isOpenPart) {
                // call Back
                // update stats
                handleUpdate(null);
            }
        }, 1000); // each second
        return () => clearInterval(id);
    }, [isOpen, geoEvent, isOpenPart])

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
        </div>
    );
}

"use client"
import { PageSwitch } from "@/app/components/PageSwitch";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import StatComponent from "@/app/components/StatComponent";
import HumanBody from "@/components/ui/HumanBody";
import EarthBody from "@/components/ui/EarthBody";
import {DialogInfo, SliderData, SvgPropBack} from "@/lib/types";

interface Prop {
    isEarth: boolean;
    switchCallback: (state: boolean) => void;
    stats: SliderData[];
    svgs: SvgPropBack | null;
    setPart: (part: DialogInfo | null) => void;
    setOpenPart: (state: boolean) => void;
  history: string[];
}

export default function GamePage({ isEarth, switchCallback, stats, svgs, setPart, setOpenPart, history }: Prop) {
    const openPart = (info: DialogInfo | undefined) => {setPart(info || null); setOpenPart(true);}
    return (
        <div>
            <div className={"gap-2 grid grid-cols-1 lg:grid-cols-3"}>
                {/* left section */}
                <div className="col-span-2">

                    <Card>
                        <CardTitle className={"flex justify-center pt-2"}>
                            <PageSwitch onCheckedChange={switchCallback} defaultChecked={isEarth} />
                        </CardTitle>
                        <CardContent>
                            {isEarth
                            ? <EarthBody coralBarrer={{color: svgs?.map.coralBarrer.color, callback: () => openPart(svgs?.map.coralBarrer.dialogInfo)}}
                                         stream={{color: svgs?.map.stream.color, callback: () => openPart(svgs?.map.stream.dialogInfo)}}
                                         CO2={{color: svgs?.map.CO2.color, callback: () => openPart(svgs?.map.CO2.dialogInfo)}}
                                         acidity={{color: svgs?.map.acidity.color, callback: () => openPart(svgs?.map.acidity.dialogInfo)}}/>
                            : <HumanBody bone={{color: svgs?.body.bone.color, callback: () => openPart(svgs?.body.bone.dialogInfo)}}
                                         heart={{color: svgs?.body.heart.color, callback: () => openPart(svgs?.body.heart.dialogInfo)}}
                                         lungs={{color: svgs?.body.lungs.color, callback: () => openPart(svgs?.body.lungs.dialogInfo)}}
                                         vein={{color: svgs?.body.vein.color, callback: () => openPart(svgs?.body.vein.dialogInfo)}}/>}
                        </CardContent>
                    </Card>
                </div>
                {/* right section */}
                <div>
                    <Card className={"p-2"}>
                        <CardTitle className="mb-5">
                            Statistiques
                        </CardTitle>
                        <CardContent>

                            {stats.map((s: SliderData, index: number) => (<div className="my-3 grid grid-cols-2" key={index}> <p > {s.name}  </p> <div className="mx-1 mt-2 cols-span-2"><StatComponent left_color={s.left_color} right_color={s.right_color} percent={s.data} /> </div></div>))}
                        </CardContent>
                    </Card>
                    <Card className={"p-2 my-2"}>
                        <CardTitle className="mb-5">
                            Historique

                        </CardTitle>
                        <CardContent>
                            <ScrollArea className={"h-72"}>
                                {history.map((it: string, index: number) => (
                                    <div key={index}>
                                        {it}
                                        <Separator />
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

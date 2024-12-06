"use client"
import { PageSwitch } from "@/app/components/PageSwitch";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import { Key, useState } from "react";
import StatComponent from "@/app/components/StatComponent";
import { ColoredSlider } from "./ColoredSlider";
import { SliderData } from "@/lib/types";

interface Prop {
    isEarth: boolean;
    switchCallback: (state: boolean) => void;
}

export default function GamePage({ isEarth, switchCallback }: Prop) {
    const [stats, setStats] = useState([{ left_color: "bg-gray-100", right_color: "bg-red-200", data: 28, name: "temperature" }] as SliderData[]);
    const history = Array.from({ length: 50 }).map(
        (_, i, a) => `action ${a.length - i}`
    )
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
                            <p>svg</p>
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

                            {stats.map((s: SliderData, index: number) => (<div className="flex flex-row" key={index}> <p > {s.name}  </p> <div className="w-1/2 flex mx-5"><StatComponent left_color={s.left_color} right_color={s.right_color} percent={s.data} /> </div></div>))}
                        </CardContent>
                    </Card>
                    <Card className={"p-2 my-2"}>
                        <CardTitle className="mb-5">
                            Historique

                        </CardTitle>
                        <CardContent>
                            <ScrollArea className={"h-72"}>
                                {history.map((it: string) => (
                                    <div key={it}>
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
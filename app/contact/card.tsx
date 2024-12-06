import { PersonCard } from "./models/Card.model";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutCard({name,link,picture}: PersonCard) {

  return (
    <Card >
      <CardHeader className="flex items-center gap-y-3">
        <Avatar>
            <Image src={picture} alt={name[0]} width={40} height={40} placeholder="blur" />
        </Avatar>
        <CardTitle>{name}</CardTitle>
        <Link href={link}>
          <Button>
            <Github/> Vers Github
          </Button>
        </Link>
      </CardHeader>
    </Card>
  )

}

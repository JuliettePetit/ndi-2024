import { PersonCard } from "./models/Card.model";
import AboutCard from "./card";




const persons: PersonCard[] = [
  {
    name: "Mathis",
    link: "https://github.com/Asolmele",
    picture: "/people/raccoon.jpg",
  },
  {
    name: "Toum",
    link: "https://github.com/tom-fourcaudot",
    picture: "/people/toum.jpeg",
  },
  {
    name: "Leo",
    link: "https://github.com/Leikoe",
    picture: "/people/leo.png",
  },
  {
    name: "Juju",
    link: "https://github.com/JuliettePetit",
    picture: "/people/aeda.jpeg",
  },
  {
    name: "Axel",
    link: "https://github.com/Neeko-strong-tomato",
    picture: "/people/axel.png",
  },
  {
    name: "Tanguy",
    link: "https://github.com/TDecabrat",
    picture: "/people/tanguy.png",
  },
  {
    name: "Wanchai",
    link: "https://github.com/Wanchai290",
    picture: "/people/wanchai.jpeg",
  },

]


export default async function Contact() {
  return (
    <div className="my-10 mx-10 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {persons.map((person) => {
        return (<AboutCard key={person.name} name={person.name} link={person.link} picture={person.picture} />);
      })
      }
    </div>
  )

}

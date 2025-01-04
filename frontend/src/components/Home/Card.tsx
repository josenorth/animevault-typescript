import React from 'react'
import Image from 'next/image'
import './Card.css'

const cardsData = [
  {
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-gHSraOSa0nBG.jpg",
    titleImage: "https://image.tmdb.org/t/p/original/yQuc8JcBxRWXfRHrNUSM47gCXOo.png",
    characterImage: "/img/1.png",
    characterName: "Frieren"

  },
  {
    coverImage: "/img/3.webp",
    titleImage: "",
    characterImage: "/img/2.png",
    characterName: "Momo Ayase"
  },
  {
    coverImage: "https://img.animeschedule.net/production/assets/public/img/anime/jpg/default/kimi-wa-meido-sama-ccca1ef3f2.jpg",
    titleImage: "https://image.tmdb.org/t/p/original/xzztCtHgIxYp9TOjuxn6tmn3k50.png",
    characterImage: "/img/4.png",
    characterName: "Yuki"
  },
  {
    coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx170942-B77wUSM1jQTu.jpg",
    titleImage: "https://image.tmdb.org/t/p/original/ubw6k78dv5SU9y9JoHRkBW8pGuN.png",
    characterImage: "/img/5.png",
    characterName: "Chinatsu Kano"
    
  }
]

function AnimeCardHome() {
  return (
<section className="py-8 md:py-16 bg-[#121212]">
<div className="container mx-auto px-4 md:px-28">
<h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-2 text-center font-montserrat">
      Popular Characters
    </h2>
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <a key={index}>
              <div className="card2">
                <div className="wrapper2">
                  <Image
                    src={card.coverImage}
                    width={1200}
                    height={1200}
                    alt="Cover Image"
                    className="cover-image2"
                  />
                </div>
                {card.titleImage && (
                  <Image
                    src={card.titleImage}
                    width={1100}
                    height={1110}
                    alt="Title Image"
                    className="title2"
                  />
                )}
                <Image
                  src={card.characterImage}
                  width={1200}
                  height={1200}
                  alt="Character Image"
                  className="character2"
                />
                 <div className="character-name">{card.characterName}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnimeCardHome

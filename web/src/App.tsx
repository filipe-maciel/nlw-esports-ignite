import { useState, useEffect } from 'react'
import { GameBanner } from './components/GammeBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css';
import logoImg from './assets/logo-nlw-eSports.svg';

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3334/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads}
            />
          )
        })
        }
      </div>

      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <CreateAdBanner 
          title="Não encontrou seu duo?" 
          subTitle="Publique um anúncio para encontrar novos players!"
          titleButton="Publicar anúncio"
        />
      </div>
    </div>
  )
}

export default App
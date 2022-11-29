import { useState, useEffect } from 'react';
import axios from "axios";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';

import { GameBanner } from './components/GammeBanner';

import './styles/main.css';

import logoImg from './assets/logo-nlw-eSports.svg';
import { CreateAdModal } from './components/CreateAdModal';

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
    axios('http://localhost:3335/games').then(response => {
        setGames(response.data)
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

      <Dialog.Root>
        <CreateAdBanner 
          title="Não encontrou seu duo?" 
          subTitle="Publique um anúncio para encontrar novos players!"
          titleButton="Publicar anúncio"
          />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App          
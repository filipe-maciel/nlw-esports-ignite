import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

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
    fetch('http://localhost:3333/games')
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

      <Dialog.Root>
        <CreateAdBanner 
          title="Não encontrou seu duo?" 
          subTitle="Publique um anúncio para encontrar novos players!"
          titleButton="Publicar anúncio"
          />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25" >
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor="game">Qual o game?</label>
                  <input id="game" type="text" placeholder="Selecione o game que deseja jogar" />
                </div>

                <div>
                  <label htmlFor="game">Seu nome (ou nickname)</label>
                  <input id="name" type="text" placeholder="Como te chamam dentro do game?" />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlayer">Joga há quantos anos?</label>
                    <input id="yaersPlaying" type="text" placeholder="Pode estar iniciando :)" />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual seu discor?</label>
                    <input id="discord" type="text" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                  </div>
                  <div>
                    <label htmlFor="discord">Qual horário do dia?</label>
                    <div>
                      <input id="hourStart" type="time" placeholder="De" />
                      <input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>

              </form>
            </Dialog.Content>

          </Dialog.Content>  
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App          
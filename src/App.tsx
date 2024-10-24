import React, {useCallback, useEffect, useState} from 'react';
import palavras from './listaPalavras.json';
import DesenhoHomemEnforcado from "./Components/DesenhoHomemEnforcado";
import EnforcadoPalavra from "./Components/EnforcadoPalavra";
import Teclado from "./Components/Teclado";

function pegaPalavra(){
    return palavras[Math.floor(Math.random() * palavras.length)];
}

export default function App() {

  const [palavraParaAdivinhar, SetPalavraParaAdivinhar] = useState(pegaPalavra);

  const[letrasAdivinhadas, setLetrasAdivinhadas] = useState<string[]>([]);

  const letrasIncorretas = letrasAdivinhadas.filter((letra) => !palavraParaAdivinhar.includes(letra))

    const perdeu = letrasIncorretas.length >= 6;
    const venceu = palavraParaAdivinhar.split("").every(letra => letrasAdivinhadas.includes((letra)));

    const adicionaLetraAdivinhada = useCallback((letra: string) => {
        if(letrasAdivinhadas.includes(letra) || perdeu || venceu) return;

        setLetrasAdivinhadas((letrasAtuais => [...letrasAtuais, letra]));

    }, [letrasAdivinhadas, perdeu, venceu]);

    useEffect(() => {
        const handler = (e: KeyboardEvent)=> {
            const key = e.key

            if(!key.match(/^[a-z]/)) return;

            e.preventDefault();
            adicionaLetraAdivinhada(key);
        }

        document.addEventListener("keypress", handler);

        return() => {
            document.removeEventListener("keypress", handler);
        }
    }, [letrasAdivinhadas])

    useEffect(() => {
        const handler = (e: KeyboardEvent)=> {
            const key = e.key;

            if(key !== 'Enter') return;

            e.preventDefault();
            setLetrasAdivinhadas([]);
            SetPalavraParaAdivinhar(pegaPalavra());
        }

        document.addEventListener("keypress", handler);

        return() => {
            document.removeEventListener("keypress", handler);
        }
    }, []);

  return(
      <div style={{
        maxWidth: '800px',
        display: "flex",
          flexDirection: 'column',
          gap: "2rem",
          margin: "0 auto",
          alignItems: "center",
      }}>
        <div style={{ fontSize: '2rem', textAlign: 'center' }}>
            {venceu && "Parabéns! Aperte 'Enter' para tentar novamente"}
            {perdeu && "Que pena! Aperte 'Enter' para jogar novamente!"}
        </div>
        <DesenhoHomemEnforcado numeroDeTentativas={letrasIncorretas.length}/>
        <EnforcadoPalavra revelado={perdeu} letrasAdivinhadas={letrasAdivinhadas} palavraParaAdivinhar={palavraParaAdivinhar}/>
        <div style={{alignSelf: 'stretch'}}>
            <Teclado
            desativado={venceu || perdeu}
            letrasAtivadas={letrasAdivinhadas.filter(letra => palavraParaAdivinhar.includes(letra))}
            letrasDesativadas={letrasIncorretas}
            adicionaLetraAdivinhada={adicionaLetraAdivinhada}
            />
        </div>
      </div>
  );
}
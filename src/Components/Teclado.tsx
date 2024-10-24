import styles from '../Styles/Teclado.module.css';

const LETRAS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

type TecladoProps = {
    desativado: boolean;
    letrasAtivadas: string[],
    letrasDesativadas: string[],
    adicionaLetraAdivinhada: (letra: string) => void
}

export default function Teclado({ letrasAtivadas, letrasDesativadas, adicionaLetraAdivinhada, desativado = false }: TecladoProps){
    return <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '.5rem'}}>
        {LETRAS.map(key => {
            const estaAtivado = letrasAtivadas.includes(key);
            const estaDesativado = letrasDesativadas.includes(key);
            return (
                <button onClick={() => adicionaLetraAdivinhada(key)} className={`${styles.btn} ${estaAtivado ? styles.active : ""} ${estaDesativado ? styles.inactive : ""}`} disabled={estaAtivado || estaDesativado || desativado} key={key}>
                    {key}
                </button>
            )
        })}
    </div>
}
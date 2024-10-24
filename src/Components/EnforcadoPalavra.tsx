type EnforcadoProps = {
    revelado?: boolean;
    letrasAdivinhadas: string[];
    palavraParaAdivinhar: string;
}

export default function EnforcadoPalavra({ letrasAdivinhadas, palavraParaAdivinhar, revelado = false }: EnforcadoProps) {

    return <div style={{ display: 'flex', gap: '.25em', fontSize: '6rem', fontWeight: 'bold', textTransform: 'uppercase', fontFamily: 'monospace' }}>
        {palavraParaAdivinhar.split("").map((letra, index) => (
            <span style={{borderBottom: '.1em solid black'}} key={index}>
                <span style={{
                    visibility: letrasAdivinhadas.includes(letra) || revelado ? 'visible' : 'hidden', color: !letrasAdivinhadas.includes(letra) && revelado ? "red" : "black"
                }}>
                    {letra}
                </span>
            </span>
        ))}
    </div>
}
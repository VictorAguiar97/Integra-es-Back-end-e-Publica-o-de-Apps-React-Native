import Pontos from "./Pontos";

export default interface Cidade {
    id: number;
    nome: string,
    pais: string,
    atualizado: Date,
    pontos: Array<Pontos>
}

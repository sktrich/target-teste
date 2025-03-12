"use client";
import { useState, useEffect } from "react";
import faturamentoData from "../dados.json";

interface FaturamentoDia {
  dia: number;
  valor: number;
}

interface FaturamentoEstados {
  [estado: string]: number;
}

export default function Home() {
  const [resultado, setResultado] = useState<number | null>(null);

  useEffect(() => {
    function teste() {
      let indice = 13;
      let soma = 0;
      let K = 0;

      while (K < indice) {
        K += 1;
        soma += K;
      }
      return soma;
    }

    setResultado(teste());
  }, []);

  const [numero, setNumero] = useState<number>(0);
  const [pertence, setPertence] = useState<boolean | null>(null);

  useEffect(() => {
    function verificaFibonacci(num: number): boolean {
      if (num < 0) return false; 
      
      let a = 0, b = 1;
      while (a <= num) {
        if (a === num) return true;
        let temp = a + b;
        a = b;
        b = temp;
      }
      return false;
    }

    setPertence(verificaFibonacci(numero));
  }, [numero]);

  const [menor, setMenor] = useState<number | null>(null);
  const [maior, setMaior] = useState<number | null>(null);
  const [diasAcimaMedia, setDiasAcimaMedia] = useState<number | null>(null);
  const [media, setMedia] = useState<number | null>(null);

  useEffect(() => {
    function calcularFaturamento() {
      const faturamento: FaturamentoDia[] = faturamentoData;

      // Filtrar dias com faturamento maior que zero
      const diasValidos = faturamento.filter((dia) => dia.valor > 0);

      if (diasValidos.length === 0) return;

      // Encontrar menor e maior faturamento
      const valores = diasValidos.map((dia) => dia.valor);
      const menorValor = Math.min(...valores);
      const maiorValor = Math.max(...valores);

      // Calcular média mensal (somente dias válidos)
      const somaTotal = valores.reduce((acc, valor) => acc + valor, 0);
      const mediaMensal = somaTotal / diasValidos.length;

      // Contar dias com faturamento acima da média
      const diasAcima = diasValidos.filter((dia) => dia.valor > mediaMensal).length;

      // Atualizar estados
      setMenor(menorValor);
      setMaior(maiorValor);
      setMedia(mediaMensal);
      setDiasAcimaMedia(diasAcima);
    }

    calcularFaturamento();
  }, []);

  const [percentuais, setPercentuais] = useState<{ estado: string; percentual: number }[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    function calcularPercentuais() {
      // Dados do faturamento por estado
      const faturamento: FaturamentoEstados = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53,
      };

      // Calcula o faturamento total
      const totalFaturamento = Object.values(faturamento).reduce((acc, valor) => acc + valor, 0);

      // Calcula o percentual de cada estado
      const percentuaisCalculados = Object.entries(faturamento).map(([estado, valor]) => ({
        estado,
        percentual: (valor / totalFaturamento) * 100,
      }));

      // Atualiza os estados
      setTotal(totalFaturamento);
      setPercentuais(percentuaisCalculados);
    }

    calcularPercentuais();
  }, []);

  const [texto, setTexto] = useState<string>("");
  const [invertido, setInvertido] = useState<string>("");

  function inverterString(str: string): string {
    let resultado = "";
    for (let i = str.length - 1; i >= 0; i--) {
      resultado += str[i]; // Adiciona cada caractere de trás para frente
    }
    return resultado;
  }

  function handleInvert() {
    setInvertido(inverterString(texto.toLowerCase()));
  }

  return (
    <main>
          <h1>Técnica</h1>
          <p>Resultado da função: {resultado}</p>
          <h1>Verificador de Fibonacci</h1>
          <input
            type="number"
            value={numero}
            onChange={(e) => setNumero(Number(e.target.value))}
            placeholder="Digite um número"
          />
          {pertence !== null && (
            <p>
              O número {numero} {pertence ? "PERTENCE" : "NÃO pertence"} à sequência de Fibonacci.
            </p>
          )}

          <h1>Análise de Faturamento Mensal</h1>
          <p>📉 Menor faturamento: {menor !== null ? `R$ ${menor.toFixed(2)}` : "Carregando..."}</p>
          <p>📈 Maior faturamento: {maior !== null ? `R$ ${maior.toFixed(2)}` : "Carregando..."}</p>
          <p>📊 Média mensal: {media !== null ? `R$ ${media.toFixed(2)}` : "Carregando..."}</p>
          <p>📅 Dias acima da média: {diasAcimaMedia !== null ? diasAcimaMedia : "Carregando..."}</p>


          <h1>Percentual de Representação por Estado</h1>
        {total !== null && <p>💰 Faturamento Total: R$ {total.toFixed(2)}</p>}
        <ul>
          {percentuais.map(({ estado, percentual }) => (
            <li key={estado}>
              📍 {estado}: {percentual.toFixed(2)}%
            </li>
          ))}
        </ul>

        <h1>Inversor de String</h1>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite um texto"
        />
        <button onClick={handleInvert}>Inverter</button>
        {invertido && <p>🔄 Texto invertido: {invertido}</p>}
    </main>
  );
}

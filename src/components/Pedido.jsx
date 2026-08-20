import {useState} from 'react'

//Array de objetos contendo o estado inicial do cardapio
const cardapio=[
    { id:1,nome:"Combo-01", preco:35.00,disponivel:true, quantidade:0 },
    { id:2,nome:"Combo-02", preco:45.00,disponivel:true, quantidade:0 },
    { id:3,nome:"Combo-03", preco:55.00,disponivel:true, quantidade:0 },
    { id:4,nome:"Combo-04", preco:65.00,disponivel:true, quantidade:0 }
];

const Pedido = () => {

  //HOOK - useState - manipula estado da variavel
  //Estados pra gerenciar a lista de itens 
    const [items=setItems] = useState(cardapio);
    const [status=setStatus] = useState("");
    const [enviar,setEnviar] = useState(false);
  //Valor fixo adicionado ao total quando tiver itens no carrinho
    const taxaEntrega=5.00;

  //Funcao que altera a quantidade de um pedido
    const alterarQuantidade = (id, valor) => {
        setItems(prev =>
        //MAP: percorre a lista para criar um NOVO array sem modificar o original (IMUTABILIDADE)
            prev.map(item =>
                //TERNARIO: verifica se o item da iteração atual e o que deve ser alterado
                //SPRED (...item): copia as propriedades do item e atualiza apenas a quantidade, mantendo o resto
                //Math.max : garante que a quantidade nunca seja menor que zero
                //Item: retorna o item intacto caso o id nao corresponda
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
                    
            )
        );
    };
    
    //FILTER - Seleciona apenas os produtos disponiveis e do carrinho 
    const produtosDisponiveis = items.filter(item=>item.disponivel);
    const carrinho = items.filter(item=>item.quantidade > 0);
    
    //REDUCE - Calcula a soma dos items (preco * quantidade) e adiciona a taxa de entrega
    const subtotal = carrinho.reduce((ac,item)=> ac = item.preco * item.quantidade,0)
    const total = subtotal > 0 ? subtotal + taxaEntrega :0; 
    
    //SIMULAÇAO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADORES ASSINCRONOS
    const confirmarPedido=()=>
      setEnviar(true);
      setStatus("Restaurante preparando seu pedido...")
      setTimeout(()=>{
        setStatus("Seu pedido saiu para entrega!")
        setEnviar(false)
      },5000);
      setTimeout(()=>{
        setStatus("Seu pedido foi entregue com sucesso!")
        setEnviar(false)
      },10000)


    return (
    <>
      
    </>
  )
}

export default Pedido

import type { IProduct } from "@/utils/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref<IProduct[]>([
    {
      id: "d23283fdff20e884d3ebeb68a6a09d36562a69fae8b432f799de9873421b5422",
      name: "Pizza Margherita",
      price: 39.9,
      description:
        "Uma pizza clássica, leve e aromática, que combina simplicidade com frescor. Ideal para quem aprecia sabores tradicionais e ingredientes naturais.\n\nIngredientes: molho de tomate, mussarela, tomate fresco e manjericão.",
    },
    {
      id: "06a4cf3fc1a14eecce0f1d6fd2b676c67e4b505e5b0599c5d7e9d7d72c1c297a",
      name: "Pizza Calabresa",
      price: 44.9,
      description:
        "Uma pizza saborosa e marcante, com o toque levemente picante da calabresa e a suavidade da mussarela. Perfeita para quem gosta de sabores intensos. Ingredientes: calabresa fatiada, cebola roxa e mussarela.",
    },
    {
      id: "a72f0833b6208abda649251b1874e29ee54bb1d400113e51fe0fd74edb7dc91f",
      name: "Pizza Quatro Queijos",
      price: 47.9,
      description:
        "Uma explosão cremosa e irresistível de queijos para os verdadeiros amantes do lácteo. Combina sabores suaves e marcantes em perfeita harmonia. Ingredientes: mussarela, parmesão, gorgonzola e catupiry.",
    },
    {
      id: "df5245b7601362f89cfbd51dbd739936b4301f79084cfc1d1f6d37723f041927",
      name: "Pizza Portuguesa",
      price: 49.9,
      description:
        "Tradicional e bem servida, essa pizza oferece uma combinação rica de ingredientes que agrada diversos paladares. Um verdadeiro clássico das pizzarias. Ingredientes: presunto, ovos, cebola, azeitona e pimentão.",
    },
    {
      id: "ab2e4e1b5509e273d29157ae3cf238f71719ec71f04d6f06bc5b37fc059c8036",
      name: "Pizza Frango com Catupiry",
      price: 46.9,
      description:
        "Uma opção cremosa e reconfortante, perfeita para quem busca uma pizza saborosa com recheio suave e bem temperado. Ingredientes: frango desfiado temperado e camada generosa de catupiry.",
    },
    {
      id: "5242f7de5f173b62587286f3397008df250fb0b59710b36c3a587558ed24d8b7",
      name: "Pizza Pepperoni",
      price: 45.9,
      description:
        "Estilo americano com sabor intenso e apimentado. Uma escolha certeira para quem aprecia o contraste entre o molho, o queijo e o pepperoni crocante. Ingredientes: molho de tomate, mussarela e fatias de pepperoni.",
    },
    {
      id: "77e2dd197a53e13a9c32133022ff146b8394fbd5b94e21a1a84842ff5467791e",
      name: "Pizza Vegetariana",
      price: 42.9,
      description:
        "Colorida, leve e nutritiva, essa pizza é perfeita para quem prefere opções sem carne, mas cheias de sabor. Ingredientes: abobrinha, berinjela, pimentão, cebola e mussarela.",
    },
    {
      id: "961e28932d3996b6ec51e1e3001d23f3f2638c46a1fa79aa7d1c6a9e7746a790",
      name: "Pizza Mexicana",
      price: 48.9,
      description:
        "Apimentada e ousada, essa pizza é inspirada nos sabores mexicanos e agrada quem busca experiências marcantes. Ingredientes: carne moída, pimenta jalapeño, cheddar e milho.",
    },
    {
      id: "b9de30433fbcbe7b137b2c6c84a44062e2f2eaece71a518dbac4076b5007a9a6",
      name: "Pizza de Bacon",
      price: 46.5,
      description:
        "Sabor defumado e textura crocante se encontram nessa pizza deliciosa, perfeita para os fãs de bacon. Ingredientes: mussarela, molho especial da casa e bacon crocante.",
    },
    {
      id: "fc1d54fc0f2e909fbf264a660b18d4eac60dc964050d84840ff8e9c93b2381de",
      name: "Pizza Doce de Chocolate",
      price: 38.9,
      description:
        "Uma sobremesa irresistível para os apaixonados por chocolate. Combina massa leve com cobertura doce e cremosa. Ingredientes: massa fina, creme de chocolate e raspas de chocolate branco.",
    },
    {
      id: "fc1d54fc0f2e909fbf264a660b18d4eac60dc964050d84840ff8e9c93b2381df",
      name: "Pizza Doce de Chocolate",
      price: 38.9,
      description:
        "Uma sobremesa irresistível para os apaixonados por chocolate. Combina massa leve com cobertura doce e cremosa. Ingredientes: massa fina, creme de chocolate e raspas de chocolate branco.",
    },
  ]);

  return { products };
});

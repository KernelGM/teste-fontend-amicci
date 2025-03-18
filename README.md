# Desafio

Você irá construir uma aplicação para consultar e trazer dados sobre o clima. 
É uma aplicação simples, onde terá um único campo de busca para o usuário digitar o
nome da cidade, um botão para confirmar a busca e outro botão para consultar o
clima do local do usuário.
Ao clicar no botão de buscar pelo local do usuário, a aplicação deve utilizar a 
api de geolocalização padrão do navegador para pegar a localização do usuário, em
seguida deve utilizar a api do Google Maps para consultar qual é o nome da cidade
e por fim, deve utilizar a api OpenWeather para trazer as informações do clima e
exibir elas na tela (temperatura, clima, umidade do ar e velocidade dos ventos, 
pode exibir outros dados a mais se quiser). Esse mesmo comportamento deve acontecer
automaticamente ao carregar a página.
No campo de busca o usuário deverá digitar o nome da cidade e ao clicar no botão
buscar, deverá consultar diretamente a api OpenWeather e exibir os dados que 
encontrar ou, em caso de erro, exibir uma mensagem avisando de que não
encontrou a cidade.

# Usados

Typescript, nextjs, tailwindcss, shadcn (button, card, input, label, sonner, dropdown-menu), lucide-react, next-themes, tailwindcss-animate
